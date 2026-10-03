import {
  assertConsumerQueue,
  consumeEvents,
  ROUTING_KEY,
} from "events-sdk";

import { prisma } from "../../lib/prisma.js";
import { QUEUES } from "../queues.js";

import type {
  CarpoolCreatedEvent,
} from "../../types/events.js";

export const startCarpoolConsumer = async () => {
  await assertConsumerQueue({
    queue: QUEUES.USER_CARPOOL_QUEUE,
    dlq: QUEUES.USER_CARPOOL_DLQ,
    dlqRoutingKey: "user.carpool.dlq",
    routingKeys: [
      ROUTING_KEY.CARPOOL_CREATED,
    ],
    retryDelayMs: 5000,
  });

  await consumeEvents<CarpoolCreatedEvent>(
    QUEUES.USER_CARPOOL_QUEUE,

    async ({ data }) => {
      if (!data.userId) {
        throw new Error(
          "Invalid carpool event: missing userId"
        );
      }

      await prisma.user.update({
        where: {
          id: data.userId,
        },
        data: {
          carpoolCount: {
            increment: 1,
          },
        },
      });

      console.log(
        "Carpool count updated successfully"
      );
    }
  );

  console.log("Carpool consumer started");
};