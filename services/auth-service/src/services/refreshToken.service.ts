import { prisma } from "../lib/prisma";
import { AppError } from "../error/AppError";
import { hashToken } from "../utils/hashPass";
import { verifyRefreshToken } from "../utils/generateToken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

export const refreshTokenService = async (refreshToken: string) => {
  //  verify refresh token (cokkie se jo token aya usko verify )
  const payload = verifyRefreshToken(refreshToken);

  //  databse ka token hash se match krna hoga (jo token aya usko hash krke database me stored hash se compare krna hoga)
  const hashed = await hashToken(refreshToken);

  //  find session and compare token hash and check expiry
  const session = await prisma.session.findFirst({
    where: {
      userId: payload.userId,
      tokenHash: hashed,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!session) {
    throw new AppError("Invalid session", 401);
  }

  //  delete old session (rotation)
  await prisma.session.delete({
    where: { id: session.id },
  });

  //  generate new tokens
  const newAccessToken = generateAccessToken({
    userId: payload.userId,
    email: payload.email,
  });

  const newRefreshToken = generateRefreshToken({
    userId: payload.userId,
    email: payload.email,
  });

  //  store new refresh token
  const newHash = await hashToken(newRefreshToken);
  
  await prisma.session.create({
    data: {
      userId: payload.userId,
      tokenHash: newHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {accessToken: newAccessToken,refreshToken: newRefreshToken,};
};