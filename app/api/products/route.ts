import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const products = await db.product.findMany()
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const {
    storeId,
    name,
    description,
    price,
    type,
    material,
    image,
    available,
  } = await req.json()

  const newProduct = await db.product.create({
    data: {
      storeId,
      name,
      description,
      price: new db.Decimal(price),
      type,
      material,
      image,
      available,
      created_at: new Date(),
    },
  })

  return NextResponse.json(newProduct, { status: 201 })
}
