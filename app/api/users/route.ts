// /app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const users = await db.user.findMany()
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const { name, email, password, role } = await req.json()
  const newUser = await db.user.create({
    data: { name, email, password, role },
  })
  return NextResponse.json(newUser, { status: 201 })
}
