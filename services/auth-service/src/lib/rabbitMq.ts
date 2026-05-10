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
   await channel.assertExchange(EXCHANGE.DEAD_LETTER_EXCHANGE, "topic", {durable: true});

  // email queue ( jo mera email event store krega )
  await channel.assertQueue(QUEUES.EMAIL_QUEUE,{
    durable: true,
    'deadLetterExchange' : EXCHANGE.DEAD_LETTER_EXCHANGE,
    'deadLetterRoutingKey' : ROUTING_KEY.EMAIL_DLQ_KEY
  
  });
  // user queue (jo mera user service ko user data dega to save in user db )
  await channel.assertQueue(QUEUES.USER_QUEUE,{
    durable: true,
    'deadLetterExchange' : EXCHANGE.DEAD_LETTER_EXCHANGE,
    'deadLetterRoutingKey' : ROUTING_KEY.USER_DLQ_KEY
  });

  // DEAD LETTER QUEUE
  // email DLQ 
  await channel.assertQueue(QUEUES.DEAD_LETTER_QUEUE_FOR_EMAIL, {
    durable: true,
  });
  // user DLQ
  await channel.assertQueue(QUEUES.DEAD_LETTER_QUEUE_FOR_USER, {
    durable: true,
  });


  // binding queues to exchange with routing keys
  // email queue 
  await channel.bindQueue(QUEUES.EMAIL_QUEUE, EXCHANGE.AUTH,ROUTING_KEY.EMAIL_VERIFICATION_KEY);
  // user queue 
  await channel.bindQueue(QUEUES.USER_QUEUE, EXCHANGE.AUTH, ROUTING_KEY.USER_CREATED_KEY);
  // dead letter queue 
  await channel.bindQueue(QUEUES.DEAD_LETTER_QUEUE_FOR_EMAIL, EXCHANGE.DEAD_LETTER_EXCHANGE, ROUTING_KEY.EMAIL_DLQ_KEY);
  await channel.bindQueue(QUEUES.DEAD_LETTER_QUEUE_FOR_USER, EXCHANGE.DEAD_LETTER_EXCHANGE, ROUTING_KEY.USER_DLQ_KEY);

  console.log("RabbitMQ connected with Exchange + DLQ");

  return channel;
};

export const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ not connected!");
  }
  return channel;
};