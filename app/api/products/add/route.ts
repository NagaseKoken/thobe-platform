// /app/api/products/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import getServerSession from "next-auth";
import authConfig from "@/auth.config";


// GET /api/products
export async function GET() {
  const products = await db.product.findMany();
  return NextResponse.json(products);
}

// POST /api/products
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig) as { user?: { id?: string } } | null;
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const formData = await req.formData();
    const name = formData.get("name")?.toString().trim();
    const price = parseFloat(formData.get("price")?.toString() || "");
    const type = formData.get("fabricType")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const file = formData.get("image") as File;

    // Validate fields
    if (!name || !/^[\p{L}\d\s\-&']{3,50}$/u.test(name)) {
      return NextResponse.json({ error: "Invalid product name" }, { status: 400 });
    }
    if (!price || isNaN(price) || price <= 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }
    if (!type || type.length < 3) {
      return NextResponse.json({ error: "Invalid fabric type" }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "Description too short" }, { status: 400 });
    }
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
    }

    // Find store for authenticated user
    const store = await db.store.findFirst({ where: { ownerId: userId } });
    if (!store) {
      return NextResponse.json({ error: "Store not found for this user" }, { status: 404 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${uuid()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);
    await writeFile(filePath, buffer);

    const product = await db.product.create({
      data: {
        storeId: store.id,
        name,
        description,
        price,
        type,
        material: type,
        image: `/uploads/${fileName}`,
        available: true,
        created_at: new Date(),
      },
    });

    return NextResponse.json({ message: "Product created", product });

  } catch (error) {
    console.error("Product upload failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}