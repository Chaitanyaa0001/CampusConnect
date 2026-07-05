export interface TokenPayload {
  userId: string;
  email: string;
  username: string;
  type: "access" | "refresh"; 
  exp?: number;
  iat?: number;
}