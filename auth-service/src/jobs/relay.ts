import { publishEvent } from "events-sdk";
import { prisma } from "../lib/prisma";

const BATCH = 20;
const MAX_ATTEMPTS = 10;
const IDLE_MS = 1000;

type Row = { id: string; routingKey: string; payload: unknown; attempts: number };

// Returns how many events were published in this round.
const relayOnce = (): Promise<number> =>
  prisma.$transaction(
    async (tx) => {
      // SKIP LOCKED: several auth-service replicas can run the relay without picking the same rows
      const rows = await tx.$queryRaw<Row[]>`
        SELECT "id", "routingKey", "payload", "attempts"
        FROM "OutboxEvent"
        WHERE "publishedAt" IS NULL AND "attempts" < ${MAX_ATTEMPTS}
        ORDER BY "createdAt" ASC
        LIMIT ${BATCH}
        FOR UPDATE SKIP LOCKED`;

      let published = 0;
      for (const row of rows) {
        try {
          // eventId = outbox row id, so a re-sent event keeps the SAME id and consumers can dedupe.
          // Needs the events-sdk publish.ts change (optional third argument).
          await publishEvent(row.routingKey, row.payload, { eventId: row.id });
          await tx.outboxEvent.update({
            where: { id: row.id },
            data: { publishedAt: new Date() },
          });
          published++;
        } catch (e) {
          await tx.outboxEvent.update({
            where: { id: row.id },
            data: { attempts: { increment: 1 }, lastError: String(e).slice(0, 500) },
          });
          break; // broker is probably down, don't hammer it
        }
      }
      return published;
    },
    { timeout: 15000, maxWait: 5000 }
  );

export const startOutboxRelay = () => {
  let stopped = false;
  let timer: NodeJS.Timeout | undefined;

  const tick = async () => {
    if (stopped) return;
    let sent = 0;
    try {
      sent = await relayOnce();
    } catch (e) {
      console.error("[outbox] relay round failed", e);
    }
    if (stopped) return;
    timer = setTimeout(tick, sent > 0 ? 0 : IDLE_MS); // busy: go again now; idle: wait 1s
  };

  tick();
  return () => {
    stopped = true;
    if (timer) clearTimeout(timer);
  };
};