import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma.js";

/**
 * Runs `work` at most once per eventId.
 * The "already processed" marker and the work are ONE transaction:
 *  - work throws  -> marker is rolled back too, so the retry queue can try again
 *  - same event arrives twice -> second time the insert does nothing, work is skipped
 */
export const processOnce = async (
  eventId: string,
  work: (tx: Prisma.TransactionClient) => Promise<void>
) => {
  await prisma.$transaction(async (tx) => {
    const marker = await tx.processedEvent.createMany({
      data: [{ eventId }],
      skipDuplicates: true, // INSERT ... ON CONFLICT DO NOTHING
    });
    if (marker.count === 0) return; // already handled
    await work(tx);
  });
};