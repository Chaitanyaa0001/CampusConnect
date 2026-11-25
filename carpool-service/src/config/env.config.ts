import dotenv from "dotenv";
dotenv.config();

const required = (key: string) => {
  const v = process.env[key];
  if (!v) throw new Error(`Missing ${key} environment variable`);
  return v;
};

// Date filters ("rides on 2026-11-10") are evaluated in the campus time zone, not the server's.
const tz = process.env.CAMPUS_TZ_OFFSET ?? "+05:30";
if (!/^[+-]\d{2}:\d{2}$/.test(tz)) throw new Error("CAMPUS_TZ_OFFSET must look like +05:30");

export const env = {
  PORT: Number(required("PORT")),
  NODE_ENV: process.env.NODE_ENV ?? "development",
  DATABASE_URL: required("DATABASE_URL"),
  RABBITMQ_URL: required("RABBITMQ_URL"),
  CLIENT_URL: required("CLIENT_URL"), // used for CORS, no trailing slash
  CAMPUS_TZ_OFFSET: tz,
};