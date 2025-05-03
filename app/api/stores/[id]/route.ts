// /app/api/stores/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const store = await db.store.findUnique({ where: { id: params.id } })
  return store
    ? NextResponse.json(store)
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = await db.store.update({
    where: { id: params.id },
    data,
  })
  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await db.store.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Deleted' })
}
