import { getChannel } from "./connection.js";

import type {
  EventEnvelope,
} from "../types/events.js";

export const consumeEvents = async <T>(
  queue: string,
  handler: (
    event: EventEnvelope<T>,
    context: {
      routingKey: string;
    }
  ) => Promise<void>,
  options: {
    maxRetries?: number;
    prefetch?: number;
  } = {}
) => {
  const channel = getChannel();

  const maxRetries =
    options.maxRetries ?? 5;

  await channel.prefetch(
    options.prefetch ?? 10
  );

  await channel.consume(
    queue,

    async (message) => {
      if (!message) {
        return;
      }

      const headers =
        message.properties.headers ?? {};

      const routingKey =
        (headers[
          "x-original-routing-key"
        ] as string) ??
        message.fields.routingKey;

      let event: EventEnvelope<T>;

      // -------------------------
      // Parse event
      // -------------------------

      try {
        event = JSON.parse(
          message.content.toString()
        ) as EventEnvelope<T>;

        if (
          !event.eventId ||
          event.data === undefined
        ) {
          throw new Error(
            "Malformed event"
          );
        }
      } catch (error) {
        console.error(
          `[${queue}] malformed message`,
          error
        );

        channel.nack(
          message,
          false,
          false
        );

        return;
      }

      // -------------------------
      // Handle event
      // -------------------------

      try {
        await handler(
          event,
          {
            routingKey,
          }
        );

        channel.ack(message);

      } catch (error) {
        const retries =
          Number(
            headers["x-retry"] ?? 0
          );

        console.error(
          `[${queue}] handler failed (${retries}/${maxRetries})`,
          error
        );

        // -------------------------
        // Max retries reached
        // -------------------------

        if (retries >= maxRetries) {
          channel.nack(
            message,
            false,
            false
          );

          return;
        }

        // -------------------------
        // Retry
        // -------------------------

        channel.sendToQueue(
          `${queue}.retry`,

          message.content,

          {
            persistent: true,

            contentType:
              "application/json",

            headers: {
              ...headers,

              "x-retry":
                retries + 1,

              "x-original-routing-key":
                routingKey,
            },
          },

          (error) => {
            if (error) {
              channel.nack(
                message,
                false,
                true
              );
            } else {
              channel.ack(message);
            }
          }
        );
      }
    },

    {
      noAck: false,
    }
  );

  console.log(
    `[${queue}] consumer started`
  );
};