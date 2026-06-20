import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET: Fetch basic info of a pickup for the review page (secure, no phone leaks)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Pickup ID is required" }, { status: 400 });
    }

    const pickup = await db.pickup.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        type: true,
        location: true,
        status: true,
        rating: true,
        feedback: true,
      },
    });

    if (!pickup) {
      return NextResponse.json({ error: "Pickup not found" }, { status: 404 });
    }

    return NextResponse.json(pickup);
  } catch (error: any) {
    console.error("[API/FEEDBACK] Error fetching details:", error);
    return NextResponse.json({ error: "Failed to load details" }, { status: 500 });
  }
}

// POST: Submit rating and optional comment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pickupId, rating, feedback } = body;

    if (!pickupId || typeof pickupId !== "string") {
      return NextResponse.json({ error: "Pickup ID is required" }, { status: 400 });
    }

    if (rating === undefined || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be a number between 1 and 5" }, { status: 400 });
    }

    // Verify pickup exists and is COMPLETED
    const pickup = await db.pickup.findUnique({
      where: { id: pickupId },
    });

    if (!pickup) {
      return NextResponse.json({ error: "Pickup not found" }, { status: 404 });
    }

    if (pickup.status !== "COMPLETED") {
      return NextResponse.json({ error: "Feedback can only be submitted for completed pickups" }, { status: 400 });
    }

    // Save feedback
    const updated = await db.pickup.update({
      where: { id: pickupId },
      data: {
        rating: Math.round(rating),
        feedback: feedback && typeof feedback === "string" ? feedback.trim() : null,
        feedbackAt: new Date(),
      },
    });

    console.log(`[API/FEEDBACK] Successfully recorded review for pickup ${pickupId}. Rating: ${rating}`);
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("[API/FEEDBACK] Error saving feedback:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}
