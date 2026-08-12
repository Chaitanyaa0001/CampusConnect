import amqp from "amqplib";
import { env } from "../config/env.config";
import { EXCHANGE } from "../events/exchange";
import { QUEUES } from "../events/queues";
import { ROUTING_KEY } from "../events/routingKey";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
    const connection = await amqp.connect(env.RABBITMQ_URL);

    channel = await connection.createChannel();

    // Shared Exchange
    await channel.assertExchange(EXCHANGE.AUTH,"topic",{durable: true,});
    //Dead Letter Exchange
    await channel.assertExchange(EXCHANGE.DEAD_LETTER_EXCHANGE,"topic",{durable: true,});

    await channel.assertQueue(QUEUES.CARPOOL_QUEUE, {
        durable: true,
        deadLetterExchange: EXCHANGE.DEAD_LETTER_EXCHANGE,
        deadLetterRoutingKey: ROUTING_KEY.CARPOOL_DLQ_KEY,
    });

    await channel.assertQueue(QUEUES.DEAD_LETTER_QUEUE_FOR_CARPOOL, {
        durable: true,
    });

    await channel.bindQueue(QUEUES.CARPOOL_QUEUE, EXCHANGE.AUTH, ROUTING_KEY.CARPOOL_CREATED_KEY);
    await channel.bindQueue(
        QUEUES.DEAD_LETTER_QUEUE_FOR_CARPOOL,
        EXCHANGE.DEAD_LETTER_EXCHANGE,
        ROUTING_KEY.CARPOOL_DLQ_KEY,
    );
    console.log("RabbitMQ Connected");
    return channel;
};

export const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ not connected");
    }

    return channel;
};