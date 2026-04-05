export interface TokenPayload {
  userId: string;
  email: string;
  type: "access" | "refresh"; 
}