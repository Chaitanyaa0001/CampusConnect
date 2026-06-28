import { getChannel } from "../lib/rabbitMq.js";
import { prisma } from "../lib/prisma.js";
import { QUEUES } from '../events/queues.js';

export const startConsumer = async () => {
  const channel = getChannel();

  // Process at most 10 unacked messages
  channel.prefetch(10);

  await channel.consume(
    QUEUES.USER_QUEUE,
    async (msg) => {
      if (!msg) {
        console.error("Received null message");
        return;
      }

      try {
        // Parse event payload
        const data = JSON.parse(msg.content.toString());

        console.log("Received User Created Event:", data);

        await prisma.user.upsert({
          where: {
            id: data.id,
          },
          update: {},
          create: {
            id: data.id,
            email: data.email,
            username: data.username,
          },
        });
        channel.ack(msg);
        console.log("User created successfully");
        
      } catch (err) {
        console.error("User Consumer Error:", err);

        // Send failed message to DLQ
        channel.nack(msg, false, false);
      }
    },
    {
      noAck: false,
    }
  );

  console.log("User consumer started");
};