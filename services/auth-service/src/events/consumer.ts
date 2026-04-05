import { getChannel } from "../lib/rabbitMq"
import { sendEmailService } from "../services/sendEmail.service";
import { QUEUES } from "./queues";

export const startConsumer = async () =>{
    const channel = getChannel();
    await channel.consume(QUEUES.EMAIL_QUEUE, async (msg) =>{
        if(!msg){
            console.error("Received null message");
            return;
        }
        try {
            const data  = JSON.parse(msg.content.toString());
            await sendEmailService(data.email, data.token);
             channel.ack(msg);
            console.log("Received message:", data);
        } catch (err) {
            console.error("Error parsing message:", err);
            channel.nack(msg, false, false); // Reject the message and don't requeue
        }
    })
}
