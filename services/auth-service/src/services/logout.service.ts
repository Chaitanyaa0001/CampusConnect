// services/logout.service.ts
import { prisma } from "../lib/prisma";
import { hashToken } from "../utils/hashPass";
import { redis } from "../lib/redis.client";
import { publishEvent } from "../events/publisher";
import { ROUTING_KEY } from "../events/routingKey";
import jwt from "jsonwebtoken";

export const logoutService = async (
  accessToken: string,
  refreshToken: string
) => {
  // decode access token (no verify needed here)
  const decoded: any = jwt.decode(accessToken);

  const exp = decoded?.exp;

  // 🧠 blacklist access token in redis
  const ttl = exp - Math.floor(Date.now() / 1000);

  if (ttl > 0) {
    await redis.set(`bl:${accessToken}`, "true", "EX", ttl);
  }

  // delete refresh session
  const hash = await hashToken(refreshToken);

  await prisma.session.deleteMany({
    where: {
      tokenHash: hash,
    },
  });

  // 📡 publish logout event
  await publishEvent(ROUTING_KEY.AUTH_LOGOUT, {
    userId: decoded.userId,
  });

  return { message: "Logged out successfully" };
};