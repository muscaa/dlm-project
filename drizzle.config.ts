import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./.output/drizzle",
    schema: "./src/lib/server/db/schema",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
