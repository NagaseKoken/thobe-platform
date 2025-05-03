// /app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface Params { id: string }

export async function GET(
  _req: NextRequest,
  { params }: { params: Params }
) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  })
  return product
    ? NextResponse.json(product)
    : NextResponse.json({ error: 'Product not found' }, { status: 404 })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Params }
) {
  const data = await req.json()

  // If updating price, convert to Decimal
  if (data.price !== undefined) {
    data.price = new db.Decimal(data.price)
  }

  const updated = await db.product.update({
    where: { id: params.id },
    data,
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Params }
) {
  await db.product.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Product deleted' })
}
