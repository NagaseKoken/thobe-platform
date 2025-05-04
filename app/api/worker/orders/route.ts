
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true, 
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const formatted = orders.map(order => ({
      id: order.id,
      customer: order.user?.name || "Unknown",
      lastUpdate: order.created_at.toISOString(),
      status: order.status,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error(err);
    return new NextResponse("Error fetching orders", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return new NextResponse("Missing id or status", { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error(err);
    return new NextResponse("Error updating order", { status: 500 });
  }
}
