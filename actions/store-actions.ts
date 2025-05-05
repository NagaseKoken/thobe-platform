"use server";
import { db } from "@/lib/db";

export async function getAllStores() {
	const stores = await db.store.findMany();
	return stores;
}
type Store = {
	id?: string;
	name: string;
	location: string;
	status: boolean;
	rating: number;
	ownerId: string;
	image?: string;
	created_at: Date;
};
export async function createStores({ data }: { data: Store }) {
	const { name, location, status, rating, ownerId, image } = data;
	const store = await db.store.create({
		data: {
			name,
			location,
			status: Boolean(status), // Ensure boolean conversion
			rating: Number(rating), // Ensure number conversion
			ownerId,
			image: image ?? "",
			created_at: new Date(),
		},
	});
	return store;
}

export async function getStoreOrders(id: string) {
	if (!id) {
		throw new Error("Missing id");
	}
	try {
		const orders = await db.order.findMany({
			where: { storeId: id },
			orderBy: { created_at: "desc" },
			include: { user: true }, // Include user relation for customer name
		});

		return orders;
	} catch (error) {
		console.error("Error fetching orders:", error);
		throw new Error("Failed to fetch orders");
	}
}

export async function getStoreProducts(id: string) {
	if (!id) {
		throw new Error("Missing id");
	}
	try {
		const product = await db.product.findMany({
			where: { storeId: id },
			orderBy: { created_at: "desc" },
		});
		return product;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw new Error("Failed to fetch products");
	}
}

export async function getStoreRequests(id: string) {
	if (!id) {
		throw new Error("Missing id");
	}
	try {
		const orders = await db.request.findMany({
			where: { storeId: id },
			orderBy: { created_at: "desc" },
			include: { user: true }, // Include user relation for customer name
		});
		return orders;
	} catch (error) {
		console.error("Error fetching requests:", error);
		throw new Error("Failed to fetch requests");
	}
}

export async function getStoreById(id: string) {
	if (!id) {
		throw new Error("Missing id");
	}
	try {
		const store = await db.store.findUnique({
			where: { id },
			include: { user: true },
		});
		return store;
	} catch (error) {
		console.error("Error fetching store:", error);
		throw new Error("Failed to fetch store");
	}
}
// export async function getStoreByIdWithProducts(id: string) {
// 	if (!id) {
// 		throw new Error("Missing id");
// 	}
// 	try {
// 		const store = await db.store.findUnique({
// 			where: { id },
// 			include: { owner: true, products: true },
// 		});
// 		return store;
// 	} catch (error) {
// 		console.error("Error fetching store:", error);
// 		throw new Error("Failed to fetch store");
// 	}
// }

export async function updateStore({ store, id }: { store: Store; id: string }) {
	const { name, location, status, rating, ownerId, image } = store;
	if (!id) {
		throw new Error("Missing id");
	}
	try {
		const updated = await db.store.update({
			where: { id },
			data: {
				name,
				location,
				status: Boolean(status), // Ensure boolean conversion
				rating: Number(rating), // Ensure number conversion
				ownerId,
				image: image ?? "",
			},
		});
		return updated;
	} catch (error) {
		console.error("Error updating store:", error);
		throw new Error("Failed to update store");
	}
}

export async function deleteStore(id: string) {
	if (!id) {
		throw new Error("Missing id");
	}
	try {
		const updated = await db.store.delete({
			where: { id },
		});
		return updated;
	} catch (error) {
		console.error("Error deleting store:", error);
		throw new Error("Failed to delete store");
	}
}
