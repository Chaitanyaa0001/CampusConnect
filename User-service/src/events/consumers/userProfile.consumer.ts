import { assertConsumerQueue, consumeEvents, ROUTING_KEY } from "events-sdk";
import { prisma } from "../../lib/prisma.js";
import { QUEUES } from "../queues.js";
import type { UserEmailVerifiedEvent } from "../../types/events.js";

export const startUserProfileConsumer = async () => {
  await assertConsumerQueue({
    queue: QUEUES.USER_PROFILE_QUEUE,
    dlq: QUEUES.USER_PROFILE_DLQ,
    dlqRoutingKey: "user.profile.dlq",
    routingKeys: [ROUTING_KEY.USER_EMAIL_VERIFIED],
    retryDelayMs: 5000,
  });

  await consumeEvents<UserEmailVerifiedEvent>(QUEUES.USER_PROFILE_QUEUE, async ({ data }) => {
    if (!data.userId) throw new Error("Invalid user email verified event: missing userId");
    if (!data.email || !data.username) {
      throw new Error("Invalid user email verified event: missing email or username");
    }

    // upsert with an empty update is already idempotent: a duplicate event changes nothing
    await prisma.user.upsert({
      where: { id: data.userId },
      update: {},
      create: { id: data.userId, email: data.email, username: data.username },
    });

    // log the id only: the event contains the user's email
    console.log(`User profile ensured for ${data.userId}`);
  });

  console.log("User profile consumer started");
};