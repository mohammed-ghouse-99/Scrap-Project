import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Fetch pickup requests with support for search, status filtering, and pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      const searchTrimmed = search.trim();
      where.OR = [
        { name: { contains: searchTrimmed, mode: "insensitive" } },
        { phone: { contains: searchTrimmed, mode: "insensitive" } },
        { location: { contains: searchTrimmed, mode: "insensitive" } },
        { type: { contains: searchTrimmed, mode: "insensitive" } },
      ];
    }

    const [pickups, total] = await Promise.all([
      db.pickup.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.pickup.count({ where }),
    ]);

    return NextResponse.json({
      pickups,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("[API/PICKUPS] Error fetching pickups:", error);
    return NextResponse.json({ error: "Failed to fetch pickups" }, { status: 500 });
  }
}

// Create a new pickup request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, type, location, weight } = body;

    // Strict Input Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || phone.trim() === "") {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }
    if (!type || typeof type !== "string" || type.trim() === "") {
      return NextResponse.json({ error: "Scrap Type is required" }, { status: 400 });
    }
    if (!location || typeof location !== "string" || location.trim() === "") {
      return NextResponse.json({ error: "Location is required" }, { status: 400 });
    }
    if (!weight || typeof weight !== "string" || weight.trim() === "") {
      return NextResponse.json({ error: "Approx Weight is required" }, { status: 400 });
    }

    // Persist to database
    const pickup = await db.pickup.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        type: type.trim(),
        location: location.trim(),
        weight: weight.trim(),
        status: "PENDING",
      },
    });

    console.log(`[API/PICKUPS] Successfully logged pickup request for ${name.trim()} (ID: ${pickup.id})`);

    return NextResponse.json(pickup, { status: 201 });
  } catch (error: any) {
    console.error("[API/PICKUPS] Error recording pickup:", error);
    return NextResponse.json(
      { 
        error: "Failed to record pickup", 
        details: process.env.NODE_ENV === "development" ? error.message : undefined 
      }, 
      { status: 500 }
    );
  }
}

// Update the status of an existing pickup request
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    if (!status || !["PENDING", "COMPLETED", "CANCELLED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updated = await db.pickup.update({
      where: { id },
      data: { status },
    });

    console.log(`[API/PICKUPS] Updated pickup ${id} status to ${status}`);
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("[API/PICKUPS] Error updating pickup status:", error);
    return NextResponse.json({ error: "Failed to update pickup status" }, { status: 500 });
  }
}
