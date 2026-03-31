import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost:5672"
  );

  channel = await connection.createChannel();

  //  MAIN EXCHANGE (topic for flexibility)
  await channel.assertExchange("auth_exchange", "topic", {
    durable: true,
  });

  //  DEAD LETTER EXCHANGE
  await channel.assertExchange("dlx_exchange", "fanout", {
    durable: true,
  });

  // DEAD LETTER QUEUE
  await channel.assertQueue("dead_letter_queue", {
    durable: true,
  });

  await channel.bindQueue("dead_letter_queue", "dlx_exchange", "");

  console.log("✅ RabbitMQ connected with Exchange + DLQ");

  return channel;
};

export const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ not connected!");
  }
  return channel;
};