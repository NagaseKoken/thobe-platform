"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import { headers } from "next/headers";
import { z } from "zod";

export const addProduct = async (values: z.infer<typeof ProductSchema>) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		throw new Error("User not authenticated");
	}

	const storeId = await db.store.findFirst({
		where: { ownerId: session.user.id! },
		select: { id: true },
	});
	if (!storeId) {
		throw new Error("Store not found");
	}

	const product = await db.product.create({
		data: {
			name: values.name,
			price: values.price,
			type: values.fabricType,
			description: values.description,
			image: values.image ?? "",
			available: true,
			created_at: new Date(),
			storeId: storeId.id,
		},
	});

	return product;
};
