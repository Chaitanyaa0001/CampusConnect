import { getChannel } from "../lib/rabbitmq";
import { EXCHANGE } from "./exchange";

export const publishEvent = async (routingKey: string, data: object) => {
    const channel = getChannel();

    const published = channel.publish(
        EXCHANGE.AUTH,
        routingKey,
        Buffer.from(JSON.stringify(data)),
        { persistent: true },
    );

    if (!published) {
        throw new Error(`Failed to publish event: ${routingKey}`);
    }

    console.log(`Event published: ${routingKey}`);
};