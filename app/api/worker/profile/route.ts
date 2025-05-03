
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const profile = await prisma.workerProfile.findFirst();
    if (!profile) {
      return new NextResponse("Not found", { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (err) {
    console.error(err);
    return new NextResponse("Error loading profile", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const updates = await req.json();
    if (!updates.email) {
      return new NextResponse("Missing email", { status: 400 });
    }
    const updated = await prisma.workerProfile.update({
      where: { email: updates.email },
      data: updates,
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return new NextResponse("Error updating profile", { status: 500 });
  }
}
