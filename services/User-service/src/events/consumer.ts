import { getChannel } from "../lib/rabbitMq";
import { sendEmailService } from "../services/sendEmail.service";
import { QUEUES } from "./queues";
import { timeoutPromise } from "../utils/timeout";

export const startConsumer = async () => {
  const channel = getChannel();
  // max unacked messages 10 krke bejo taaki ek time pe zyada messages na aaye aur humare service pe load na pade
  channel.prefetch(10);
  await channel.consume(
    QUEUES.EMAIL_QUEUE,async (msg) => {
        if (!msg) {
          console.error("Received null message");
          return;
        }
        try {
          const data = JSON.parse(msg.content.toString());
          console.log("Received message:",data);
          // timeout protection
          await Promise.race([
            sendEmailService(data.email,data.token),
            timeoutPromise(5000)

          ]);
          // success
          channel.ack(msg);
          console.log("Email sent successfully");
        } catch (err) {
          console.log("Consumer Error:",err);
          // send to DLQ
          channel.nack(msg,false,false);
        }
    },
    {
      noAck: false,
    }
  );
  console.log("Email consumer started");
};