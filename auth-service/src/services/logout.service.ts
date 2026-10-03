// services/logout.service.ts
import { prisma } from "../lib/prisma";
import { hashToken } from "../utils/hashPass";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../utils/generateToken";
import { AppError } from "../error/AppError";

export const logoutService = async (refreshToken: string) => {

  //  delete refresh session
  const hash = await hashToken(refreshToken);
  await prisma.session.deleteMany({
    where: {
      tokenHash: hash,
    },
  });

  return { message: "Logged out successfully" };
};