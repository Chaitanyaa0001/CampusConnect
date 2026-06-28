import amqp from "amqplib";
import { env } from "../config/env.config.js";
import { EXCHANGE } from "../events/exchange.js";
import { QUEUES } from "../events/queues.js";
import { ROUTING_KEY } from "../events/routingKey.js";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
    const connection = await amqp.connect(env.RABBITMQ_URL);

    channel = await connection.createChannel();

    // Shared Exchange
    await channel.assertExchange(EXCHANGE.AUTH,"topic",{durable: true,});
    //Dead Letter Exchange
    await channel.assertExchange(EXCHANGE.DEAD_LETTER_EXCHANGE,"topic",{durable: true,});


    // Queue jo meri event legi db creatin ki 
    await channel.assertQueue(QUEUES.USER_QUEUE,
      {  durable: true,
        'deadLetterExchange':EXCHANGE.DEAD_LETTER_EXCHANGE,
        'deadLetterRoutingKey':ROUTING_KEY.USER_DLQ_KEY,
      }
    );
    // DLQ
    await channel.assertQueue(QUEUES.DEAD_LETTER_QUEUE_FOR_USER,{durable: true,});
    // Bind Queue
    await channel.bindQueue(QUEUES.USER_QUEUE,EXCHANGE.AUTH,ROUTING_KEY.USER_CREATED_KEY);
    // Bind DLQ
    await channel.bindQueue(QUEUES.DEAD_LETTER_QUEUE_FOR_USER,EXCHANGE.DEAD_LETTER_EXCHANGE,ROUTING_KEY.USER_DLQ_KEY);
    console.log("RabbitMQ Connected");
    return channel;
};

export const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ not connected");
    }

    return channel;
};