"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ComplaintSchema } from "@/schemas";
import { headers } from "next/headers";
import { z } from "zod";

export const createComplaint = async (
	values: z.infer<typeof ComplaintSchema>
) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		throw new Error("User not authenticated");
	}

	const complaint = await db.complaint.create({
		data: {
			userId: session?.user.id!,
			description: values.description,
		},
	});
	return complaint;
};
