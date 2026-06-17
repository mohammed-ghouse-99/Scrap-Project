import "dotenv/config";
import { db } from "../src/lib/db";

async function update() {
  const name = "Lightweight Iron";
  const imagePath = "/images/warehouse/iron_light.png";

  try {
    const result = await db.scrapRate.update({
      where: { name: name },
      data: { image: imagePath }
    });
    console.log(`Successfully updated ${name} with image ${imagePath}`);
  } catch (error) {
    console.error(`Failed to update ${name}:`, error);
  }
}

update();
