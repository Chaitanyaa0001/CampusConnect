import * as dotenv from "dotenv";
dotenv.config();

const required = (key: string) => {
  const v = process.env[key];
  if (!v) throw new Error(`Missing ${key} environment variable`);
  return v;
};

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: required("DATABASE_URL"),
  BREVO_API_KEY: required("BREVO_API_KEY"),
  MAIL_FROM_NAME: required("MAIL_FROM_NAME"),
  MAIL_FROM_EMAIL: required("MAIL_FROM_EMAIL"),
  CLIENT_URL: required("CLIENT_URL"),       // e.g. https://campusconnect.app (no trailing slash)
  RABBITMQ_URL: required("RABBITMQ_URL"),
  NODE_ENV: process.env.NODE_ENV ?? "development",
};