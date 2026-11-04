import { randomUUID } from "node:crypto";
import { EXCHANGE } from "../config/exchange.js";
import { getChannel } from "./connection.js";
import type { EventEnvelope } from "../types/events.js";

export const publishEvent = async <T>(
  routingKey: string,
  data: T,
  options: { eventId?: string } = {}
): Promise<void> => {
  const channel = getChannel();

  const event: EventEnvelope<T> = {
    eventId: options.eventId ?? randomUUID(),
    occurredAt: new Date().toISOString(),
    data,
  };

  await new Promise<void>((resolve, reject) => {
    channel.publish(
      EXCHANGE.EVENTS,
      routingKey,
      Buffer.from(JSON.stringify(event)),
      { persistent: true, contentType: "application/json", messageId: event.eventId },
      (err) => (err ? reject(err) : resolve())
    );
  });
};