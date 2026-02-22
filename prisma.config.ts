import { config } from "dotenv";
config({ path: ".env.local" });
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // The CLI (e.g. for migrations/db push) needs the direct URL
    // Use process.env directly to avoid crashing if the variable is missing during build
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
  },
});
