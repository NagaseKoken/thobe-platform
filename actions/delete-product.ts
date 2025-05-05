"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export const deleteProduct = async (productId: string) => {
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
	const product = await db.product.delete({
		where: {
			id: productId,
			storeId: storeId.id,
		},
	});

	return product;
};
