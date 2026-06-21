import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rates = await db.scrapRate.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(rates);
  } catch (error: any) {
    console.error("Failed to fetch rates:", error);
    return NextResponse.json({ 
      error: "Failed to fetch rates",
      debug: {
        url_length: process.env.DATABASE_URL?.length || 0,
        env_keys: Object.keys(process.env).filter(k => k.includes("DATABASE")),
        message: error.message
      }
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, category, price, unit, image } = body;

    let rate;
    if (id) {
      rate = await db.scrapRate.update({
        where: { id },
        data: {
          name,
          category,
          price: parseFloat(price),
          unit,
          image: image || null,
          deletedAt: null, // Clear soft-delete state if re-saving
        },
      });
    } else {
      // Avoid uniqueness conflicts by restoring matching soft-deleted item
      const existing = await db.scrapRate.findFirst({
        where: { name }
      });

      if (existing) {
        rate = await db.scrapRate.update({
          where: { id: existing.id },
          data: {
            category,
            price: parseFloat(price),
            unit,
            image: image || null,
            deletedAt: null, // Reactivate
          },
        });
      } else {
        rate = await db.scrapRate.create({
          data: {
            name,
            category,
            price: parseFloat(price),
            unit,
            image: image || null,
          },
        });
      }
    }

    return NextResponse.json(rate);
  } catch (error) {
    console.error("Failed to update rate:", error);
    return NextResponse.json({ error: "Failed to update rate" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Perform soft delete instead of hard delete
    await db.scrapRate.update({
      where: { id: id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete rate:", error);
    return NextResponse.json({ error: "Failed to delete rate" }, { status: 500 });
  }
}
