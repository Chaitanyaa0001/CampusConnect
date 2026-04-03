
import { getChannel } from "../lib/rabbitMq";
import { EXCHANGE } from "./exchange";

export const publishEvent = async (
  routingKey: string,
  data: object
) => {
  const channel = getChannel();

  channel.publish(
    EXCHANGE.AUTH,
    routingKey,
    Buffer.from(JSON.stringify(data)),
    { persistent: true }
  );

  console.log(`📤 Event published: ${routingKey}`);
};