import { getChannel } from "../lib/rabbitmq";
import { EXCHANGE } from "./exchange";

export const publishEvent = async (routingKey: string,data: object) => {
    const channel = getChannel();
    const published = channel.publish(EXCHANGE.EVENTS,routingKey,
        Buffer.from(JSON.stringify(data)),
        {
            persistent: true,
            contentType: "application/json",
        }
    );

    if (!published) {
        throw new Error(
            `Failed to publish event: ${routingKey}`
        );
    }

    console.log(`Event published: ${routingKey}`);
};