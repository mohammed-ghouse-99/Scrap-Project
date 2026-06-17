import "dotenv/config";
import { db } from "../src/lib/db";

const rates = [
  // Normal Recyclables
  { name: "Aluminium", category: "Normal Recyclables", price: 112, unit: "kg" },
  { name: "Books", category: "Normal Recyclables", price: 12, unit: "kg" },
  { name: "Plastic", category: "Normal Recyclables", price: 8, unit: "kg" },
  { name: "Glass", category: "Normal Recyclables", price: 2, unit: "kg" },
  { name: "Copper", category: "Normal Recyclables", price: 505, unit: "kg" },
  { name: "Newspaper", category: "Normal Recyclables", price: 15, unit: "kg" },
  { name: "Steel", category: "Normal Recyclables", price: 42, unit: "kg" },
  { name: "Iron", category: "Normal Recyclables", price: 25, unit: "kg" },
  { name: "Clothes", category: "Normal Recyclables", price: 5, unit: "kg" },
  { name: "Cardboard", category: "Normal Recyclables", price: 8, unit: "kg" },
  { name: "Brass", category: "Normal Recyclables", price: 325, unit: "kg" },
  
  // Large Appliances
  { name: "Battery (Inverters)", category: "Large Appliances", price: 81, unit: "kg" },
  { name: "Geyser", category: "Large Appliances", price: 20, unit: "kg" },
  { name: "Gym Equipments", category: "Large Appliances", price: 20, unit: "kg" },
  { name: "AC (1.5 Ton) - Common", category: "Large Appliances", price: 3500, unit: "unit" },
  { name: "AC (2 Ton)", category: "Large Appliances", price: 5600, unit: "unit" },
  { name: "Double Door Fridge", category: "Large Appliances", price: 1350, unit: "unit" },
  { name: "Front Load Washing Machine", category: "Large Appliances", price: 1350, unit: "unit" },
  { name: "Single Door Fridge", category: "Large Appliances", price: 1100, unit: "unit" },
  { name: "UPS", category: "Large Appliances", price: 180, unit: "unit" },
  { name: "Side by Side Fridge", category: "Large Appliances", price: 2700, unit: "unit" },
  { name: "Washing Machine (Top Load)", category: "Large Appliances", price: 1000, unit: "unit" },
  
  // Small Appliances
  { name: "Ceiling Fan / Motor", category: "Small Appliances", price: 35, unit: "kg" },
  { name: "Microwave", category: "Small Appliances", price: 350, unit: "unit" },
  { name: "DVD / E-Waste", category: "Small Appliances", price: 20, unit: "kg" },
];

async function seed() {
  console.log("Seeding scrap rates...");
  for (const rate of rates) {
    await db.scrapRate.upsert({
      where: { name: rate.name },
      update: rate,
      create: rate,
    });
  }
  console.log("Seeding completed!");
}

seed().catch(console.error);
