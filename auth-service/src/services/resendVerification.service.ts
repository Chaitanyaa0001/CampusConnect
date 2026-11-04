import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { hashToken } from "../utils/hashPass";

export const resendVerificationService = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.isVerified) return null; // controller still gives the same response

  const verificationToken = crypto.randomBytes(32).toString("hex");
  await prisma.user.update({
    where: { id: user.id },
    data: {
      verificationToken: hashToken(verificationToken),
      verificationTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
    },
  });
  return { email: user.email, verificationToken };
};