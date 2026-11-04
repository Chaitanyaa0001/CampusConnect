export interface TokenPayload {            // access token
  userId: string; 
  email:string;
  username:string;
  type: "access"; exp?: number; iat?: number;
}
export interface RefreshPayload {          // refresh token: minimal, no PII
  userId: string;
  type: "refresh";
  jti: string;
  exp?: number;
  iat?: number;
}