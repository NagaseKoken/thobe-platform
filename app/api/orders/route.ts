import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client"; // ✅ import Prisma type helpers

export async function GET() {
  const orders = await db.order.findMany({
    include: {
      user: true,
    },
    orderBy: { created_at: "desc" },
  });

  type OrderWithUser = Prisma.OrderGetPayload<{
    include: { user: true };
  }>;

  const simplifiedOrders = (orders as OrderWithUser[]).map((order) => ({
    name: order.user?.name ?? "Unknown",
    updated: order.created_at.toISOString(),
    status: order.status,
  }));

  return NextResponse.json(simplifiedOrders);
}