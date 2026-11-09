import "dotenv/config"; // first line: AUTH_CONFIG from @auth-sdk reads process.env the moment it is imported
import app from "./app";
import { env } from "./config/env.config";
import { connectRabbitMQ, onShutdown } from "events-sdk";
import { startConsumer } from "./events/consumer";
import { prisma } from "./lib/prisma.js";
import { startCleanupJob } from "./jobs/cleanup.js";
import { startOutboxRelay } from "./jobs/relay.js";

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    await connectRabbitMQ(env.RABBITMQ_URL);
    await startConsumer(); // ONCE

    const cleanup = startCleanupJob();
    const stopRelay = startOutboxRelay(); // only after RabbitMQ is connected

    const server = app.listen(env.PORT, () => {
      console.log(`Auth service running on port ${env.PORT}`);
    });

    // events-sdk's onShutdown runs these in order, then closes RabbitMQ and exits
    onShutdown([
      () => clearInterval(cleanup),
      () => stopRelay(),
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