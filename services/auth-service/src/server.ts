import { start } from 'node:repl';
import app from './app'
import { env } from './config/env.config'
import { connectRabbitMQ } from './lib/rabbitMq';
import { startConsumer } from './events/consumer';



connectRabbitMQ();
startConsumer();


app.listen(env.PORT, () => {
  console.log(`Auth service running on ports ${env.PORT}`);
});
