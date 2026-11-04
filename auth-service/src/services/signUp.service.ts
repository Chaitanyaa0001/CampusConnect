
import { prisma } from "../lib/prisma";
import { AppError } from "../error/AppError";
import {  hashPassword, hashToken } from "../utils/hashPass";
import crypto from 'crypto'
import { Prisma } from "../generated/prisma/client";


export const signupService = async (email: string, username: string, password: string) => {
  // fast path: reject obvious duplicates BEFORE the expensive bcrypt hash
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
    select: { id: true },
  });
  if (existing) throw new AppError("Email or username already taken", 409);

  const hashed = await hashPassword(password);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashed,
        isVerified: false,
        verificationToken: hashToken(verificationToken),
        verificationTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
    return { user, verificationToken };
  } catch (e) {
    // still needed: two simultaneous signups can both pass the check above
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      throw new AppError("Email or username already taken", 409);
    }
    throw e;
  }
};