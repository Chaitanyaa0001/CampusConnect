export interface TokenPayload {
    userId: string;
    email: string;
    username: string;
    type: "access" | "refresh";
    iat?: number;
    exp?: number;

}