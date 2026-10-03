import { EXCHANGE } from "../config/exchange.js";
import { getChannel } from "./connection.js";

export interface ConsumerQueueConfig {
  queue: string;
  dlq: string;
  dlqRoutingKey: string;
  routingKeys: string[];
  retryDelayMs?: number;
}

export const assertConsumerQueue =async (config: ConsumerQueueConfig) => {
    const channel =getChannel();
    const retryQueue =`${config.queue}.retry`;
    // -------------------------
    // DLQ
    // -------------------------
    await channel.assertQueue(config.dlq,{durable: true,});
    await channel.bindQueue(
      config.dlq,
      EXCHANGE.DEAD_LETTER_EXCHANGE,
      config.dlqRoutingKey
    );
    // -------------------------
    // Main queue
    // -------------------------
    await channel.assertQueue(
      config.queue,{durable: true,deadLetterExchange:EXCHANGE.DEAD_LETTER_EXCHANGE,deadLetterRoutingKey:config.dlqRoutingKey,}
    );
    // -------------------------
    // Retry queue
    // -------------------------
    await channel.assertQueue(
      retryQueue,
      {durable: true,messageTtl:config.retryDelayMs ??10_000,
        deadLetterExchange: "",
        deadLetterRoutingKey:config.queue,}
    );
    // -------------------------
    // Event bindings
    // -------------------------
    for (const routingKey of config.routingKeys) {
      await channel.bindQueue(
        config.queue,
        EXCHANGE.EVENTS,
        routingKey
      );
    }
  };