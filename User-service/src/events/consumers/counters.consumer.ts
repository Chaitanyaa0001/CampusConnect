import { assertConsumerQueue, consumeEvents, ROUTING_KEY } from "events-sdk";
import type { Prisma } from "../../../generated/prisma/client";
import { processOnce } from "../../worker/Processonce.js";
import { QUEUES } from "../queues.js";
import type { OwnedEvent } from "../../types/events.js";

// One consumer definition per counter. Replaces the three copy-pasted consumer files.
// created -> +1, deleted -> -1 (never below 0).
const COUNTERS = [
  {
    queue: QUEUES.USER_CARPOOL_QUEUE, dlq: QUEUES.USER_CARPOOL_DLQ, dlqKey: "user.carpool.dlq",
    field: "carpoolCount", created: ROUTING_KEY.CARPOOL_CREATED, deleted: ROUTING_KEY.CARPOOL_DELETED,
  },
  {
    queue: QUEUES.USER_PROJECTS_QUEUE, dlq: QUEUES.USER_PROJECTS_DLQ, dlqKey: "user.projects.dlq",
    field: "projectCount", created: ROUTING_KEY.PROJECT_CREATED, deleted: ROUTING_KEY.PROJECT_DELETED,
  },
  {
    queue: QUEUES.USER_LOST_FOUND_QUEUE, dlq: QUEUES.USER_LOST_FOUND_DLQ, dlqKey: "user.lost_found.dlq",
    field: "lostFoundCount", created: ROUTING_KEY.LOST_FOUND_CREATED, deleted: ROUTING_KEY.LOST_FOUND_DELETED,
  },
 
] as const;

export const startCounterConsumers = async () => {
  for (const c of COUNTERS) {
    await assertConsumerQueue({
      queue: c.queue,
      dlq: c.dlq,
      dlqRoutingKey: c.dlqKey,
      routingKeys: [c.created, c.deleted],
      retryDelayMs: 10_000, // gives the profile event time to arrive first
    });

    await consumeEvents<OwnedEvent>(c.queue, async (event, { routingKey }) => {
      const { userId } = event.data;
      if (!userId) throw new Error(`Invalid ${c.field} event: missing userId`);

      const isCreate = routingKey === c.created;
      const isDelete = routingKey === c.deleted;
      if (!isCreate && !isDelete) throw new Error(`Unexpected routing key ${routingKey}`);

      await processOnce(event.eventId, async (tx) => {
        if (isCreate) {
          const data = { [c.field]: { increment: 1 } } as Prisma.UserUpdateManyMutationInput;
          const r = await tx.user.updateMany({ where: { id: userId }, data });
          // The profile is created by a different queue, so this event can arrive first.
          // Throwing rolls the transaction back and sends the event to the retry queue.
          if (r.count === 0) throw new Error(`Profile ${userId} not created yet`);
        } else {
          const data = { [c.field]: { decrement: 1 } } as Prisma.UserUpdateManyMutationInput;
          const where = { id: userId, [c.field]: { gt: 0 } } as Prisma.UserWhereInput;
          await tx.user.updateMany({ where, data }); // floor at 0
        }
      });
    });
  }
};