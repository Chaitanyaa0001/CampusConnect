import "dotenv/config";
import { env } from "./config/env.config.js";
// use the SDK's own connection: events-sdk's assertConsumerQueue/consumeEvents read the channel
// created by the SDK's connectRabbitMQ. A private lib/rabbitMq.ts would leave them with no channel.
import { connectRabbitMQ, onShutdown } from "events-sdk";
import { startConsumers } from "./events/index.js";
import { prisma } from "./lib/prisma.js";
import { startCleanupJob } from "./worker/cleanup.js";
import app from "./app.js";

async function startServer() {
  try {
    await prisma.$connect();


    await connectRabbitMQ(env.RABBITMQ_URL);
    await startConsumers();
    const cleanup = startCleanupJob();
    
    const server = app.listen(env.PORT, () => {
      console.log(`User service running on port ${env.PORT}`);
    });

    onShutdown([
      () => clearInterval(cleanup),
      () =>
        new Promise<void>((resolve) => {
          server.close(() => resolve());
          server.closeIdleConnections?.();
        }),
      () => prisma.$disconnect(),
    ]);
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
}

startServer();