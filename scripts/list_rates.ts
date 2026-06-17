import "dotenv/config";
import { db } from "../src/lib/db";

async function check() {
  try {
    const rates = await db.scrapRate.findMany();
    console.log(JSON.stringify(rates, null, 2));
  } catch (error) {
    console.error("Failed to fetch rates:", error);
  }
}

check();
