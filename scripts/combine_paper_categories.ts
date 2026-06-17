import "dotenv/config";
import { db } from "../src/lib/db";

async function combine() {
  const names = ["Books", "Newspaper"];
  const newCategory = "Paper & Books";

  try {
    const result = await db.scrapRate.updateMany({
      where: {
        name: { in: names }
      },
      data: {
        category: newCategory
      }
    });
    console.log(`Successfully updated ${result.count} items to category ${newCategory}`);
  } catch (error) {
    console.error(`Failed to update items:`, error);
  }
}

combine();
