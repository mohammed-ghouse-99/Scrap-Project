import "dotenv/config";
import { db } from "../src/lib/db";

async function cleanup() {
  const namesToDelete = ["Iron", "copper"];
  try {
    const result = await db.scrapRate.deleteMany({
      where: {
        name: { in: namesToDelete }
      }
    });
    console.log(`Successfully deleted ${result.count} items: ${namesToDelete.join(", ")}`);
  } catch (error) {
    console.error(`Failed to delete items:`, error);
  }
}

cleanup();
