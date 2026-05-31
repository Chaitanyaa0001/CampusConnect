import { start } from 'node:repl';
import app from './app'
import { env } from './config/env.config'
import { connectRabbitMQ } from './lib/rabbitMq';
import { startConsumer } from './events/consumer';



async function startServer() {
  try {
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
