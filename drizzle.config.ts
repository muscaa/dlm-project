import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: [".env.local", ".env"] });

export default defineConfig({
    out: "./.output/drizzle",
    schema: "./src/lib/server/db/schema",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
