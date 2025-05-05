import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { openAPI, admin } from "better-auth/plugins";
import { db } from "./db";

export const auth = betterAuth({
	database: prismaAdapter(db, {
		provider: "postgresql",
		usePlural: false,
	}),
	session: {
		expiresIn: 60 * 60 * 24 * 30, // 30 days
		updateAge: 60 * 60 * 24, // 24 hours
		cookieCache: {
			enabled: true,
			maxAge: 60 * 60 * 24 * 30, // 30 days
		},
	},
	plugins: [openAPI(), admin()],
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		autoSignIn: true,
	},
});
