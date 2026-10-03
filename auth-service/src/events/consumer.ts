import {
  assertConsumerQueue,
  consumeEvents,
  ROUTING_KEY,
} from "events-sdk";

import { QUEUES } from "./queues.js";
import { sendEmailService } from "../services/sendEmail.service.js";

import type {EmailVerificationEvent,} from "../types/email.js";

export const startConsumer = async () => {
  await assertConsumerQueue({
    queue: QUEUES.EMAIL_QUEUE,

    dlq:
      QUEUES.DEAD_LETTER_QUEUE_FOR_EMAIL,

    dlqRoutingKey:
      ROUTING_KEY.EMAIL_DLQ,

    routingKeys: [
      ROUTING_KEY.EMAIL_VERIFICATION,
    ],

    retryDelayMs: 5000,
  });

  await consumeEvents<EmailVerificationEvent>(
    QUEUES.EMAIL_QUEUE,

    async ({ data }) => {
      if (!data.email || !data.token) {
        throw new Error(
          "Invalid email verification payload"
        );
      }

      await sendEmailService(
        data.email,
        data.token
      );

      console.log(
        `Email sent successfully to ${data.email}`
      );
    }
  );

  console.log(
    "Email consumer started"
  );
};