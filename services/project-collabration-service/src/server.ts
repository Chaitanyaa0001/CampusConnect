import { start } from 'node:repl';
import app from './app'
import { env } from './config/env.config'
import { connectRabbitMQ } from './utils/rabbitmq.js';
import { prisma } from './utils/prisma.js';



async function startServer() {
  try {

    await prisma.$connect();
    console.log("Connected to the database successfully.");

    await connectRabbitMQ();  // Wait for RabbitMQ
    
    app.listen(env.PORT, () => {
      console.log(`Project service running on port  ${env.PORT}`);
    });
    
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
} 

startServer();
