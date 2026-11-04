import { prisma } from "../lib/prisma";
import { AppError } from "../error/AppError";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";
import { comparePassword, hashToken, DUMMY_HASH } from "../utils/hashPass";

export const signinService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  // always run bcrypt, even if the user does not exist (timing attack)
  const match = await comparePassword(password, user?.password ?? DUMMY_HASH);
  if (!user || !match) throw new AppError("Invalid email or password", 401);

  if (!user.isVerified) throw new AppError("Please verify your email before signing in", 403);

  const accessToken = generateAccessToken({ userId: user.id, email: user.email, username: user.username });
  const refreshToken = generateRefreshToken({ userId: user.id });

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  return { accessToken, refreshToken, user };
};