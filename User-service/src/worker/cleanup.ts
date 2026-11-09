import { prisma } from "../lib/prisma.js";

// ProcessedEvent only needs to remember events for as long as a redelivery is possible.
export const startCleanupJob = () => {
  const run = async () => {
    try {
      await prisma.processedEvent.deleteMany({
        where: { createdAt: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      });
    } catch (e) {
      console.error("Cleanup failed", e);
    }
  };
  run();
  return setInterval(run, 60 * 60 * 1000);
};