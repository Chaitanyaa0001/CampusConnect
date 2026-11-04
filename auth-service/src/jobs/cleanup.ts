import { prisma } from "../lib/prisma";

// NOTE: every replica runs this. Harmless for now (deletes are idempotent);
// move it to one scheduled task if you run many replicas.
export const startCleanupJob = () => {
  const run = async () => {
    try {
      await prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } });

      // unverified accounts older than 24h free up their email and username
      await prisma.user.deleteMany({
        where: { isVerified: false, createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      });

      // published outbox events older than a day are no longer needed
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