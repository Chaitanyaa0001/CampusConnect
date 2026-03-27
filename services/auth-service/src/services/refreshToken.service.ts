
import { prisma } from "../lib/prisma";
import { AppError } from "../error/AppError";
import { hashToken } from "../utils/hashPass";
import { verifyToken } from "../utils/generateToken";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";

export const refreshTokenService = async (refreshToken: string) => {
  // payload se token nikla 
  const payload = verifyToken(refreshToken);
  // hashkrdiya  
  const hashed = await hashToken(refreshToken);
  // session find kara 
  const session = await prisma.session.findFirst({
    where: {
      userId: payload.userId,
      tokenHash: hashed,
      expiresAt: {
        gt: new Date()
      }
    }
  });

  if (!session) {
    throw new AppError("Invalid session", 401);
  }

  // old session  delete kridya (rotation)
  await prisma.session.delete({
    where: { id: session.id }
  });

  // generate new tokens
  const newAccessToken = generateAccessToken({
    userId: payload.userId,
    email: payload.email,
  });

  const newRefreshToken = generateRefreshToken({
    userId: payload.userId,
    email: payload.email,
  });
  // new refresh token ko hash karidya 
  const newHash = await hashToken(newRefreshToken);
  // or usko db mei update krdiya 
  await prisma.session.create({
    data: {
      userId: payload.userId,
      tokenHash: newHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};