export interface UserEmailVerifiedEvent {
  userId: string;
  email: string;
  username: string;
}

// carpool / project / lost-and-found / car-rental created and deleted events
export interface OwnedEvent {
  userId: string;
  entityId?: string;
}