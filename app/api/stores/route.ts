// /app/api/stores/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const stores = await db.store.findMany()
  return NextResponse.json(stores)
}

export async function POST(req: NextRequest) {
  const { name, location, status, rating, ownerId } = await req.json()
  const store = await db.store.create({
    data: {
      name,
      location,
      status: Boolean(status), // Ensure boolean conversion
      rating: Number(rating),  // Ensure number conversion
      ownerId,
      created_at: new Date(),
    },
  })
  return NextResponse.json(store, { status: 201 })
}
