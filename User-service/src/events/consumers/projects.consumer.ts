import {
  assertConsumerQueue,
  consumeEvents,
  ROUTING_KEY,
} from "events-sdk";

import { prisma } from "../../lib/prisma.js";
import { QUEUES } from "../queues.js";

import type {
  ProjectCreatedEvent,
} from "../../types/events.js";

export const startProjectsConsumer = async () => {
  await assertConsumerQueue({
    queue: QUEUES.USER_PROJECTS_QUEUE,
    dlq: QUEUES.USER_PROJECTS_DLQ,
    dlqRoutingKey: "user.projects.dlq",
    routingKeys: [
      ROUTING_KEY.PROJECT_CREATED,
    ],
    retryDelayMs: 5000,
  });

  await consumeEvents<ProjectCreatedEvent>(
    QUEUES.USER_PROJECTS_QUEUE,

    async ({ data }) => {
      console.log(
        "Received Project Created Event:",
        data
      );

      if (!data.userId) {
        throw new Error(
          "Invalid project event: missing userId"
        );
      }

      await prisma.user.update({
        where: {
          id: data.userId,
        },
        data: {
          projectCount: {
            increment: 1,
          },
        },
      });

      console.log(
        "Project count updated successfully"
      );
    }
  );

  console.log("Project consumer started");
};