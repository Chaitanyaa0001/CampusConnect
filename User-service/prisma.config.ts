import { defineConfig } from "prisma/config";
import dotenv from "dotenv";
dotenv.config();

const databaseUrl = process.env.DATABASE_URL ?? "postgresql://user:password@localhost:5432/campusconnect";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
