import { start } from 'node:repl';

import { env } from './config/env.config.js';
import { connectRabbitMQ } from './lib/rabbitMq.js';
import { startConsumer } from './events/consumer.js';
import { prisma } from './lib/prisma.js';
import app from './app.js';



async function startServer() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    await connectRabbitMQ();  // Wait for RabbitMQ
    await startConsumer();

    app.listen(env.PORT, () => {
      console.log(`Auth service running on port  ${env.PORT}`);
    });
    
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
} 

startServer();
