"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas/index";
import { getUserbyEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { redirect } from "next/navigation";

type Role = "ADMIN" | "USER" | "WORKER" | "OWNER";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) return { error: "Invalid fields!" };

	const { email, password, name } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);
	const existingUser = await getUserbyEmail(email);
	const role = "USER"; //

	//check if the user already exists
	if (existingUser) return { error: "Email already in use!" };
	//if not then create the user

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
			role: role, //
		},
	});

	if (role === "USER") {
		return redirect("/home/");
	}
	if (role === "ADMIN") {
		return redirect("/admin/");
	}
	if (role === "WORKER") {
		return redirect("/worker/");
	}
	if (role === "OWNER") {
		return redirect("/owner/");
	}

	// const verificationToken = await generateVerificationToken(email);

	// await sendVerificationEmail(verificationToken.email, verificationToken.token);

	// return { success: "Confirmation email sent!" };
};
