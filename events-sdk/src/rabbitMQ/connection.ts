import amqp from "amqplib";
import type { ConfirmChannel } from "amqplib";

import { EXCHANGE } from "../config/exchange.js";

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

export const connectRabbitMQ = async (
  url: string,
  options: {
    retries?: number;
    delayMs?: number;
  } = {}
): Promise<ConfirmChannel> => {
  const {
    retries = 10,
    delayMs = 3000,
  } = options;

  for (
    let attempt = 1;
    ;
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

      channel =
        await connection.createConfirmChannel();

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