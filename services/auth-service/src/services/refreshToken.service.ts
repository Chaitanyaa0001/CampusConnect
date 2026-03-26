
import { prisma } from "../config/prisma";
import { AppError } from "../error/AppError";
import { verifyToken, generateAccessToken } from "../utils/generateToken";
import { hashToken } from "../utils/hashPass";

export const refreshTokenService = async (refreshToken: string) => {

  const payload = verifyToken(refreshToken);
  
  const hashed = await hashToken(refreshToken);
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashed },
  });

  if (!session) {
    throw new AppError("Invalid session", 401);
  }

  if (session.expiresAt < new Date()) {
    throw new AppError("Session expired", 401);
  }

  const newAccessToken = generateAccessToken({
    userId: payload.userId,
    email: payload.email,
  });

  return { accessToken: newAccessToken };
};