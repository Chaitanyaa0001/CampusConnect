import bcrypt from "bcrypt";
import crypto from "crypto";

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const hashToken = async (token : string) =>{
  return crypto.createHash("sha256").update(token).digest("hex");
}

export const comparePassword = async (
  password: string,
  hash: string
) => {
  return bcrypt.compare(password, hash);
};