import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Fetch all pickup requests, sorted newest first
export async function GET() {
  try {
    const pickups = await db.pickup.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(pickups);
  } catch (error: any) {
    console.error("[API/PICKUPS] Error fetching pickups:", error);
    return NextResponse.json({ error: "Failed to fetch pickups" }, { status: 500 });
  }
}

// Create a new pickup request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, location, weight } = body;

    // Strict Input Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
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
