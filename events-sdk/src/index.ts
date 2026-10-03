export {
  EXCHANGE,
} from "./config/exchange.js";

export {
  ROUTING_KEY,
} from "./config/routing.js";

export type {
  EventEnvelope,
  OwnedEntityEventData,
} from "./types/events.js";

export {
  connectRabbitMQ,
  getChannel,
  closeRabbitMQ,
} from "./rabbitMQ/connection.js";

export {
  publishEvent,
} from "./rabbitMQ/publish.js";

export {
  assertConsumerQueue,
} from "./rabbitMQ/queue.js";

export {
  consumeEvents,
} from "./rabbitMQ/consumer.js";

export {
  onShutdown,
} from "./rabbitMQ/shutdown.js";