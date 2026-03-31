import { getChannel } from '../lib/rabbitMq';

export const publishEvent = async (routingKey: string,data: object) => {
  const channel = getChannel();
  channel.publish(
    "auth_exchange",
    routingKey,
    Buffer.from(JSON.stringify(data)),
    { persistent: true }
  );

  console.log(`Event: ${routingKey}`);
};