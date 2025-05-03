import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return new NextResponse("Missing order id", { status: 400 });
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
      return new NextResponse("Order not found", { status: 404 });
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
      id: order.id,
      customer: order.user?.name ?? "Unknown",
      email: order.email ?? order.user?.email ?? "",
      phone: order.phone ?? "",
      orderNumber: order.orderNumber ?? "",
      notes: order.notes ?? "",
      createdAt: order.created_at.toISOString(),
      status: order.status as "In Production" | "Ready for Pickup" | "Picked Up",
      items: order.orderItems.map(item => ({
        id: item.id.toString(),
        name: item.product.name,
        quantity: item.quantity,
        price: parseFloat(item.price.toString()),
        image: item.product.image,
      })),
    };

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Error fetching order details", { status: 500 });
  }
}
