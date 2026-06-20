import "dotenv/config";
import { db } from "../src/lib/db";

async function check() {
  try {
    const pickups = await db.pickup.findMany({
      orderBy: { createdAt: "desc" },
    });
    console.log(JSON.stringify(pickups, null, 2));
  } catch (error) {
    console.error("Failed to fetch pickups:", error);
  }
}

check();
