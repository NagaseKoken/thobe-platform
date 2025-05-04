import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const fabrics = await prisma.product.findMany({ where: { type: 'Fabric' } });
    const products = await prisma.product.findMany({ where: { type: 'Product' } });
    return NextResponse.json({ fabrics, products });
  } catch (err) {
    console.error(err);
    return new NextResponse('Error fetching items', { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, available } = await req.json();
    if (!id || available === undefined) {
      return new NextResponse('Missing id or availability', { status: 400 });
    }
    const updated = await prisma.product.update({
      where: { id },
      data: { available },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return new NextResponse('Error updating availability', { status: 500 });
  }
}
