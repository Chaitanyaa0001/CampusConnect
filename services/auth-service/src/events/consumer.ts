import { getChannel } from "../lib/rabbitMq"
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
            console.log("Received message:", data);
        } catch (err) {
            console.error("Error parsing message:", err);
        }
    })
}