import "dotenv/config";
import { db } from "../src/lib/db";

async function cleanup() {
  console.log("-----------------------------------------");
  console.log("[CLEANUP] Starting data cleanup and image mapping...");

  // 1. Remove unwanted items
  const itemsToRemove = ["Clothes", "Glass"];
  const deleteResult = await db.scrapRate.deleteMany({
    where: {
      name: { in: itemsToRemove }
    }
  });
  console.log(`[CLEANUP] Removed ${deleteResult.count} items (Clothes, Glass).`);

  // 2. Fetch all remaining items
  const allRates = await db.scrapRate.findMany();
  
  // 3. Map items to images based on category or name
  for (const rate of allRates) {
    let imagePath = "/images/warehouse/books.png"; // Default fallback
    
    const name = rate.name.toLowerCase();
    const cat = rate.category.toLowerCase();

    if (cat.includes("metals") || name.includes("copper") || name.includes("iron") || name.includes("aluminium") || name.includes("steel") || name.includes("brass")) {
      imagePath = "/images/scrap/metals.png";
    } else if (cat.includes("appliances") || name.includes("ac") || name.includes("fridge") || name.includes("refrigerator") || name.includes("machine") || name.includes("geyser") || name.includes("fan") || name.includes("microwave")) {
      imagePath = "/images/warehouse/double_door.png";
    } else if (cat.includes("plastic") || name.includes("plastic")) {
      imagePath = "/images/warehouse/plastic.png";
    } else if (cat.includes("paper") || name.includes("news") || name.includes("book") || name.includes("cardboard")) {
      imagePath = "/images/warehouse/books.png";
    }

    await db.scrapRate.update({
      where: { id: rate.id },
      data: { image: imagePath }
    });
  }

  console.log(`[CLEANUP] Successfully mapped images for ${allRates.length} items.`);
  console.log("-----------------------------------------");
}

cleanup().catch(console.error);
