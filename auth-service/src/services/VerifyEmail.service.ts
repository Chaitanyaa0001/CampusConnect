import { prisma } from "../lib/prisma";
import { hashToken } from "../utils/hashPass";
import { AppError } from "../error/AppError";
import { ROUTING_KEY } from "events-sdk";

export const verifyEmailService = async (token: string) => {
  const hashed = hashToken(token);

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.findFirst({
      where: { verificationToken: hashed, verificationTokenExpiry: { gt: new Date() } },
    });
    if (!user) throw new AppError("Invalid or expired token", 400);

    // claim the token: if two requests race, only one gets count === 1
    const claimed = await tx.user.updateMany({
      where: { id: user.id, verificationToken: hashed },
      data: { isVerified: true, verificationToken: null, verificationTokenExpiry: null },
    });
    if (claimed.count === 0) throw new AppError("Invalid or expired token", 400);

    // same transaction as the update above: both are saved or neither
    await tx.outboxEvent.create({
      data: {
        routingKey: ROUTING_KEY.USER_EMAIL_VERIFIED,
        payload: { userId: user.id, email: user.email, username: user.username },
      },
    });
  });

  return { message: "Email verified successfully" };
};