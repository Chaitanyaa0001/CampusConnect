import * as fs from "fs";

const load = (envVar: string, fallbackPath: string) =>
  fs.readFileSync(process.env[envVar] ?? fallbackPath, "utf-8");

export const PRIVATE_KEY = load("PRIVATE_KEY_PATH", "/run/secrets/private_key");
export const PUBLIC_KEY  = load("PUBLIC_KEY_PATH",  "/run/secrets/public_key");
export const KEY_ID = process.env.JWT_KEY_ID ?? "auth-key-1";