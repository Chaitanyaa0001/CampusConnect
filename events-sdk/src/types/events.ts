export interface EventEnvelope<T = unknown> {
  eventId: string;
  occurredAt: string;
  data: T;
}

export interface OwnedEntityEventData {
  userId: string;
  entityId: string;
}