import amqp from "amqplib";

import { env } from "../config/env.config";
import { EXCHANGE } from "../events/exchange";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
    const connection = await amqp.connect(env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(
        EXCHANGE.EVENTS,
        "topic",
        {
            durable: true,
        }
    );
    await channel.assertExchange(
        EXCHANGE.DEAD_LETTER_EXCHANGE,
        "topic",
        {
            durable: true,
        }
    );
    console.log("Carpool RabbitMQ connected");
    return channel;
};
export const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ not connected");
    }
    return channel;
};