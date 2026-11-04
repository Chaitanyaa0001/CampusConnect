import amqp from "amqplib";
import type { ConfirmChannel } from "amqplib";

import { EXCHANGE } from "../config/exchange.js";

// events-sdk/src/rabbitMQ/connection.ts
// Add right after `channel = await connection.createConfirmChannel();`
//
// Today only the CONNECTION is watched. If just the channel dies (for example a queue declared
// with different arguments, or a double ack, which RabbitMQ answers by closing the channel),
// the connection stays open and the service keeps running with nothing consuming or publishing.

let connection: amqp.ChannelModel | undefined;
let channel: ConfirmChannel | undefined;
let closing = false;

export const getChannel = (): ConfirmChannel => {
  if (!channel) {
    throw new Error(
      "RabbitMQ not connected"
    );
  }

  return channel;
};

export const connectRabbitMQ = async (url: string,options: {retries?: number;delayMs?: number;} = {}): Promise<ConfirmChannel> => {
  const {retries = 10,delayMs = 3000,} = options;
  for (
    let attempt = 1;;
    attempt++
  ) {
    try {
      connection = await amqp.connect(url);

      connection.on(
        "error",
        (error) => {
          console.error(
            "[rabbitmq] connection error",
            error
          );
        }
      );

      connection.on(
        "close",
        () => {
          if (closing) return;

          console.error(
            "[rabbitmq] connection closed unexpectedly"
          );

          process.exit(1);
        }
      );

      channel =  await connection.createConfirmChannel();

        channel.on("error", (error) => {
            console.error("[rabbitmq] channel error", error);
        });

        channel.on("close", () => {
          if (closing) return;
          console.error("[rabbitmq] channel closed unexpectedly");
          process.exit(1);
        });

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

      console.log(
        "[rabbitmq] connected"
      );

      return channel;
    } catch (error) {
      if (attempt >= retries) {
        throw error;
      }

      console.error(
        `[rabbitmq] connection failed (${attempt}/${retries})`
      );

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            delayMs
          )
      );
    }
  }
};
export const closeRabbitMQ =
  async () => {
    closing = true;

    try {
      await channel?.close();
    } catch {}

    try {
      await connection?.close();
    } catch {}
  };