import { prisma } from "../utils/prisma.client.js";

// Published outbox rows are only kept for a day. Unpublished rows are never deleted here.
export const startCleanupJob = () => {
  const run = async () => {
    try {
      await prisma.outboxEvent.deleteMany({
        where: { publishedAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      });
    } catch (e) {
      console.error("Cleanup failed", e);
    }
  };
  run();
  return setInterval(run, 60 * 60 * 1000);
};