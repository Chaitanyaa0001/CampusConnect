import { verifyAccessToken } from "../jwt/verify.js";
import { TokenPayload } from "../types/tokenpayload.js";

type SocketLike = {
  handshake: {
    auth?: { token?: unknown };
    headers: { authorization?: string };
  };
  data: { user?: TokenPayload };
};

const getSocketToken = (socket: SocketLike) => {
  const authToken = socket.handshake.auth?.token;
  const authHeader = socket.handshake.headers.authorization;
  if (typeof authToken === "string") return authToken;
  if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7).trim();
  return undefined;
};

export async function authenticateSocket(socket: SocketLike, next: (error?: Error) => void) {
  const token = getSocketToken(socket);
  if (!token) return next(new Error("Unauthorized"));
  try {
    socket.data.user = await verifyAccessToken(token);
    next();
  } catch (err) {
    // message carries the code so the client can tell "expired" from "invalid"
    next(new Error((err as { code?: string }).code ?? "TOKEN_INVALID"));
  }
}

// Call inside io.on("connection"): drops the socket when its access token expires.
export function disconnectOnExpiry(socket: {
  data: { user?: TokenPayload };
  disconnect: (close?: boolean) => unknown;
  on: (event: "disconnect", cb: () => void) => unknown;
}) {
  const exp = socket.data.user?.exp;
  if (!exp) return;
  const timer = setTimeout(() => socket.disconnect(true), Math.max(exp * 1000 - Date.now(), 0));
  socket.on("disconnect", () => clearTimeout(timer));
}