export interface TokenPayload {
  userId: string;
  email: string;
  username: string;
  type: "access"; // the SDK only ever accepts access tokens
  iat?: number;
  exp?: number;
}