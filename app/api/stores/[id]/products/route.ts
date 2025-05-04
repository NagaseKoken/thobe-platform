import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const products = await db.product.findMany({
      where: { storeId: params.id },
      orderBy: { created_at: 'desc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching orders:', error);

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}