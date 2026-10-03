export interface UserEmailVerifiedEvent {
  userId: string;
  email: string;
  username: string;
}
export interface ProjectCreatedEvent {
  userId: string;
}   
export interface LostFoundCreatedEvent {
  userId: string;
}

export interface CarpoolCreatedEvent {
  userId: string;
}