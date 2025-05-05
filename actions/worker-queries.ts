"use server";

import { db } from "@/lib/db";
import { ProfileSchema } from "@/schemas";
import { z } from "zod";

export async function getWorkerProfile() {
	try {
		const profile = await db.workerProfile.findFirst();
		if (!profile) {
			throw new Error("Not found");
		}
		return profile;
	} catch (err) {
		console.error(err);
		throw new Error("Error loading profile");
	}
}

export async function updateWorkerProfileByEmail({
	email,
	data,
}: {
	email: string;
	data: Partial<z.infer<typeof ProfileSchema>>;
}) {
	try {
		if (!email) {
			throw new Error("Missing email");
		}
		const updated = await db.workerProfile.update({
			where: { email: email },
			data: data,
		});
		return updated;
	} catch (err) {
		console.error(err);
		throw new Error("Error updating profile");
	}
}

export async function getProducts() {
	try {
		const products = await db.product.findMany();
		return products;
	} catch (err) {
		console.error(err);
		throw new Error("Error fetching items");
	}
}

export async function updateProductsAvailability({
	id,
	available,
}: {
	id: string;
	available: boolean;
}) {
	try {
		if (!id || available === undefined) {
			throw new Error("Missing id or availability");
		}
		const updated = await db.product.update({
			where: { id },
			data: { available },
		});
		return updated;
	} catch (err) {
		console.error(err);
		throw new Error("Error updating availability");
	}
}

export async function getOrderById(id: string) {
	if (!id) {
		throw new Error("Missing order id");
	}

	try {
		const order = await db.order.findUnique({
			where: { id },
			include: {
				user: true,
				orderItems: { include: { product: true } },
			},
		});

		if (!order) {
			throw new Error("Order not found");
		}

		const result = {
			id: order.id,
			customer: order.user?.name ?? "Unknown",
			email: order.email ?? order.user?.email ?? "",
			phone: order.phone ?? "",
			orderNumber: order.orderNumber ?? "",
			notes: order.notes ?? "",
			createdAt: order.created_at.toISOString(),
			total: parseFloat(order.total.toString()),
			status: order.status as
				| "In Production"
				| "Ready for Pickup"
				| "Picked Up",
			items: order.orderItems.map((item) => ({
				id: item.id.toString(),
				name: item.product.name,
				quantity: item.quantity,
				price: parseFloat(item.price.toString()),
				image: item.product.image,
			})),
		};

		return result;
	} catch (err) {
		console.error(err);
		throw new Error("Error fetching order details");
	}
}
export async function getOrders() {
	try {
		const orders = await db.order.findMany({
			include: {
				user: true,
			},
			orderBy: {
				created_at: "desc",
			},
		});

		const formatted = orders.map((order) => ({
			id: order.id,
			customer: order.user?.name || "Unknown",
			lastUpdate: order.created_at.toISOString(),
			status: order.status,
		}));

		return formatted;
	} catch (err) {
		console.error(err);
		throw new Error("Error fetching orders");
	}
}

export async function updateOrderStatus({
	id,
	status,
}: {
	id: string;
	status: string;
}) {
	try {
		if (!id || !status) {
			throw new Error("Missing id or status");
		}

		const updated = await db.order.update({
			where: { id },
			data: { status },
		});

		return updated;
	} catch (err) {
		console.error(err);
		throw new Error("Error updating order");
	}
}
