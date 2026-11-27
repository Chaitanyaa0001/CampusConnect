import "dotenv/config";
import { env } from "./config/env.config.js";
// the events-sdk connection, not a private lib/rabbitmq.ts: the SDK's publishEvent reads the
// channel created by the SDK's own connectRabbitMQ
import { connectRabbitMQ, onShutdown } from "events-sdk";
import { prisma } from "./utils/prisma.client.js";
import { startOutboxRelay } from "./oubox/relay.js";
import { startCleanupJob } from "./jobs/cleanup.js";
import app from "./app.js";

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    await connectRabbitMQ(env.RABBITMQ_URL);

    const stopRelay = startOutboxRelay(); // only after RabbitMQ is connected
    const cleanup = startCleanupJob();

    const server = app.listen(env.PORT, () => {
      console.log(`Carpool service running on port ${env.PORT}`);
    });

    onShutdown([
      () => stopRelay(),
      () => clearInterval(cleanup),
      () =>
        new Promise<void>((resolve) => {
          server.close(() => resolve());
          server.closeIdleConnections?.();
        }),
      () => prisma.$disconnect(),
    ]);
  } catch (error) {
    console.error("Failed to start carpool service:", error);
    process.exit(1);
  }
}

startServer();