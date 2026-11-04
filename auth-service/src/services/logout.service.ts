import { prisma } from "../lib/prisma";
import { hashToken } from "../utils/hashPass";

export const logoutService = async (refreshToken: string) => {
  await prisma.session.deleteMany({ where: { tokenHash: hashToken(refreshToken) } });
};