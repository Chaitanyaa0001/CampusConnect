import { EXCHANGE } from "../config/exchange.js";
import { getChannel } from "./connection.js";
import type {EventEnvelope,} from "../types/events.js";
export const publishEvent =async <T>(routingKey: string,data: T): Promise<void> => {
    const channel = getChannel();

    const event: EventEnvelope<T> = {eventId:crypto.randomUUID(),occurredAt:new Date().toISOString(),data,};
    channel.publish(
      EXCHANGE.EVENTS,
      routingKey,
      Buffer.from(
        JSON.stringify(event)
      ),
      {
        persistent: true,
        contentType:
          "application/json",
      }
    );
    await channel.waitForConfirms();
  };