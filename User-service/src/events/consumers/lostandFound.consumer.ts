import {
  assertConsumerQueue,
  consumeEvents,
  ROUTING_KEY,
} from "events-sdk";

import { prisma } from "../../lib/prisma.js";
import { QUEUES } from "../queues.js";

import type {LostFoundCreatedEvent,} from "../../types/events.js";

export const startLostAndFoundConsumer = async () => {
  await assertConsumerQueue({
    queue: QUEUES.USER_LOST_FOUND_QUEUE,
    dlq: QUEUES.USER_LOST_FOUND_DLQ,
    dlqRoutingKey: "user.lost_found.dlq",
    routingKeys: [
      ROUTING_KEY.LOST_FOUND_CREATED,
    ],
    retryDelayMs: 5000,
  });

  await consumeEvents<LostFoundCreatedEvent>(
    QUEUES.USER_LOST_FOUND_QUEUE,

    async ({ data }) => {
      console.log(
        "Received Lost and Found Created Event:",
        data
      );

      if (!data.userId) {
        throw new Error(
          "Invalid lost and found event: missing userId"
        );
      }

      await prisma.user.update({
        where: {
          id: data.userId,
        },
        data: {
          lostAndFoundCount: {
            increment: 1,
          },
        },
      });

      console.log(
        "Lost and Found count updated successfully"
      );
    }
  );

  console.log(
    "Lost and Found consumer started"
  );
};