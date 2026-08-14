import { getChannel } from "../lib/rabbitMq.js";
import { prisma } from "../lib/prisma.js";
import { QUEUES } from './queues.js';

export const startConsumer = async () => {
  const channel = getChannel();

  // Process at most 10 unacked messages
  channel.prefetch(10);

  await channel.consume(
    QUEUES.USER_PROFILE_QUEUE,
    async (msg) => {
      if (!msg) {
        console.error("Received null message");
        return;
      }
      try {
        // Parse event payload
        const data = JSON.parse(msg.content.toString());

        console.log("Received User Created Event:", data);

        const userId = data.userId;

        if (!userId) {
          throw new Error("Invalid user created event payload: missing userId");
        }

        await prisma.user.upsert({
          where: {
            id: userId,
          },
          update: {},
          create: {
            id: userId,
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

  await channel.consume(
    QUEUES.CARPOOL_QUEUE,
    async (msg) => {
      if (!msg) {
        console.error("Received null message");
        return;
      }

      try {
        const data = JSON.parse(msg.content.toString());

        console.log("Received Carpool Created Event:", data);

        const userId = data.userId;

        if (!userId) {
          throw new Error("Invalid carpool created event payload: missing userId");
        }

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            carpoolCount: {
              increment: 1,
            },
          },
        });

        channel.ack(msg);
        console.log("Carpool count updated successfully");
      } catch (err) {
        console.error("Carpool Consumer Error:", err);
        channel.nack(msg, false, false);
      }
    },
    {
      noAck: false,
    }
  );

  console.log("User consumer started");
};