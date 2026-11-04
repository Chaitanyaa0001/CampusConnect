import bcrypt from "bcrypt";
import crypto from "crypto";

export const hashPassword = (password: string) => bcrypt.hash(password, 12);
export const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash);

// sync is enough, there's no I/O
export const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

// used so "user not found" costs the same time as "wrong password"
export const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing", 12);