import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getOrderById(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	if (!id) {
		throw new Error("Missing order id");
	}

	try {
		const order = await prisma.order.findUnique({
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
