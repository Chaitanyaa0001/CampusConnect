import { start } from 'node:repl';
import app from './app'
import { env } from './config/env.config'
import { connectRabbitMQ } from './lib/rabbitMq';
import { startConsumer } from './events/consumer';
import { prisma } from './lib/prisma';



async function startServer() {
  try {
    console.log("DATABASE_URL =", env.DATABASE_URL);
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    await connectRabbitMQ();  // Wait for RabbitMQ
    await startConsumer();     // Wait for consumer to start
    
    app.listen(env.PORT, () => {
      console.log(`Auth service running on port  ${env.PORT}`);
    });
    
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
} 

startServer();
