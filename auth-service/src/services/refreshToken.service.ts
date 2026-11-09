import { prisma } from "../lib/prisma";
import { AppError } from "../error/AppError";
import { hashToken } from "../utils/hashPass";
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../utils/generateToken";

export const refreshTokenService = async (token: string) => {
  const payload = verifyRefreshToken(token);
  const hashed = hashToken(token);

  // atomic: only ONE concurrent request can delete the row (count === 1)
  const { count } = await prisma.session.deleteMany({
    where: { userId: payload.userId, tokenHash: hashed, expiresAt: { gt: new Date() } },
  });

  if (count === 0) {
    // valid signature but no session => token already rotated or revoked.
    // Treat as possible theft: kill every session of this user.
    await prisma.session.deleteMany({ where: { userId: payload.userId } });
    throw new AppError("Session invalid, please login again", 401);
  }

  // fresh data from DB, not from the old token
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || !user.isVerified) throw new AppError("Invalid session", 401);

  const accessToken = generateAccessToken({ userId: user.id, email: user.email, username: user.username });
  const refreshToken = generateRefreshToken({ userId: user.id });

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  return { accessToken, refreshToken };
};