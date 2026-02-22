import { config } from "dotenv";
config({ path: ".env.local" });
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // The CLI (e.g. for migrations/db push) needs the direct URL
    url: env("DIRECT_URL"),
  },
});
