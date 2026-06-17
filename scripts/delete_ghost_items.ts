import "dotenv/config";
import { db } from "../src/lib/db";

async function cleanup() {
  try {
    const result = await db.scrapRate.deleteMany({
      where: {
        OR: [
          { name: "" },
          { name: " " },
          { price: 0 }
        ]
      }
    });
    console.log(`Successfully deleted ${result.count} ghost items.`);
  } catch (error) {
    console.error(`Failed to delete items:`, error);
  }
}

cleanup();
