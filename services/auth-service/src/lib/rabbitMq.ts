import amqp from "amqplib";
import { EXCHANGE } from "../events/exchange";
import { QUEUES } from "../events/queues";
import { ROUTING_KEY } from "../events/routingKey";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost:5672"
  );

  channel = await connection.createChannel();
  // EXCHANGE
   await channel.assertExchange(EXCHANGE.AUTH, "topic", {durable: true});
   await channel.assertExchange(EXCHANGE.DEAD_LETTER_QUEUE, "fanout", {durable: true});

  // email queue 
  await channel.assertQueue(QUEUES.EMAIL_QUEUE,{
    durable: true,
    'deadLetterExchange': EXCHANGE.DEAD_LETTER_QUEUE,
  });

  // user queue 
  await channel.assertQueue(QUEUES.USER_QUEUE,{
    durable: true,
    deadLetterExchange: EXCHANGE.DEAD_LETTER_QUEUE,
  });
  
  // DEAD LETTER QUEUE
  await channel.assertQueue(QUEUES.DEAD_LETTER_QUEUE, {
    durable: true,
  });
  // binding queues to exchange with routing keys
  await channel.bindQueue(QUEUES.EMAIL_QUEUE, EXCHANGE.AUTH,ROUTING_KEY.AUTH_SIGNUP);
  await channel.bindQueue(QUEUES.USER_QUEUE, EXCHANGE.AUTH, ROUTING_KEY.AUTH_LOGIN);
  await channel.bindQueue(QUEUES.DEAD_LETTER_QUEUE, EXCHANGE.DEAD_LETTER_QUEUE, "");

  console.log("RabbitMQ connected with Exchange + DLQ");

  return channel;
};
export const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ not connected!");
  }
  return channel;
};