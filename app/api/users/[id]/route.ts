// /app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface Params { id: string }

export async function GET(
  _req: NextRequest,
  { params }: { params: Params }
) {
  const user = await db.user.findUnique({ where: { id: params.id }, include: { products: true } })
  return user
    ? NextResponse.json(user)
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Params }
) {
  const data = await req.json()
  const updated = await db.user.update({
    where: { id: params.id },
    data,
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Params }
) {
  await db.user.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Deleted' })
}
