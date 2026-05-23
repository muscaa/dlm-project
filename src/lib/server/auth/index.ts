import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@server/db";
import * as schema from "@server/db/schema/auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [tanstackStartCookies()],
    telemetry: {
        enabled: false,
    },
});
