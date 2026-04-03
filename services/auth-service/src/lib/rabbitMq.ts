import amqp from "amqplib";
import { EXCHANGE } from "../events/exchange";
import { QUEUES } from "../events/queues";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost:5672"
  );

  channel = await connection.createChannel();
  // EXCHANGE
   await channel.assertExchange(EXCHANGE.AUTH, "topic", {durable: true});
   await channel.assertExchange(EXCHANGE.DEAD_LETTER_QUEUE, "fanout", {durable: true});
  // queue 
  
  await channel.assertQueue(QUEUES.EMAIL_QUEUE,{
    durable: true,
    deadLetterExchange: EXCHANGE.DEAD_LETTER_QUEUE,
  });
  //  DEAD LETTER EXCHANGE
  await channel.assertExchange(EXCHANGE.DEAD_LETTER_QUEUE, "fanout", {
    durable: true,
  });

  // DEAD LETTER QUEUE
  await channel.assertQueue(QUEUES.DEAD_LETTER_QUEUE, {
    durable: true,
  });

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