// import amqp from "amqplib";

// import { env } from "../config/env.config.js";
// import { EXCHANGE } from "../events/exchange.js";
// import { ROUTING_KEY } from "../events/routingKey.js";
// import { emitBookingNotification, emitServiceFeed } from "./socket.js";

// let channel: amqp.Channel | undefined;

// export const connectRabbitMQ = async () => {
//     const connection = await amqp.connect(env.RABBITMQ_URL);
//     channel = await connection.createChannel();

//     await channel.assertExchange(EXCHANGE.EVENTS, "topic", { durable: true });
//     await channel.assertExchange(EXCHANGE.DEAD_LETTER, "topic", { durable: true });

//     const queueName = "chat.booking.queue";

//     await channel.assertQueue(queueName, {
//         durable: true,
//         deadLetterExchange: EXCHANGE.DEAD_LETTER,
//         deadLetterRoutingKey: ROUTING_KEY.CHAT_DLQ,
//     });

//     await channel.bindQueue(queueName, EXCHANGE.EVENTS, ROUTING_KEY.BOOKING_CREATED);
//     await channel.bindQueue(queueName, EXCHANGE.EVENTS, ROUTING_KEY.SERVICE_FEED_CREATED);

//     await channel.consume(
//         queueName,
//         async (msg) => {
//             if (!msg) {
//                 return;
//             }

//             try {
//                 const event = JSON.parse(msg.content.toString()) as {
//                     rideId: string;
//                     rideOwnerId: string;
//                     bookerId: string;
//                     bookerName?: string;
//                     rideTitle?: string;
//                     room?: "carpool" | "project" | "lost-found" | "car-rental";
//                     title?: string;
//                     description?: string;
//                 };

//                 if (event.room) {
//                     emitServiceFeed(event.room, {
//                         title: event.title ?? "New update",
//                         description: event.description,
//                         sourceId: event.rideId,
//                     });
//                     channel?.ack(msg);
//                     return;
//                 }

//                 emitBookingNotification(event);
//                 channel?.ack(msg);
//             } catch (error) {
//                 console.error("Chat booking consumer error:", error);
//                 channel?.nack(msg, false, false);
//             }
//         },
//         { noAck: false },
//     );

//     return channel;
// };

// export const getChannel = () => {
//     if (!channel) {
//         throw new Error("RabbitMQ not connected");
//     }

//     return channel;
// };
