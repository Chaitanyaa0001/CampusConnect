
import { getChannel } from "../lib/rabbitMq";
import { EXCHANGE } from "./exchange";

export const publishEvent = async (routingKey: string,data: object) => {
  const channel = getChannel();

  const published = await channel.publish(
    EXCHANGE.AUTH,
    routingKey,
    Buffer.from(JSON.stringify(data)),
    { persistent: true }
  );
  if (!published) {
    throw new Error("Failed to publish event");
  }
  console.log(` Event published: ${routingKey}`);
};