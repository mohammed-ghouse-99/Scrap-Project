const { PrismaClient } = require("@prisma/client");
const { Pool } = require("@neondatabase/serverless");
const { PrismaNeon } = require("@prisma/adapter-neon");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

const initialRates = [
  { name: "Iron", category: "Metals", price: 28, unit: "kg" },
  { name: "Copper", category: "Metals", price: 550, unit: "kg" },
  { name: "Aluminum", category: "Metals", price: 110, unit: "kg" },
  { name: "Newspaper", category: "Paper", price: 14, unit: "kg" },
  { name: "Cardboard", category: "Paper", price: 6, unit: "kg" },
  { name: "Plastic Bottles (PET)", category: "Plastic", price: 12, unit: "kg" },
  { name: "Glass Bottles", category: "Glass", price: 2, unit: "kg" },
  { name: "E-Waste (Motherboard)", category: "Electronic", price: 250, unit: "pc" },
];

async function main() {
  console.log("Seeding data...");
  for (const rate of initialRates) {
    await prisma.scrapRate.upsert({
      where: { name: rate.name },
      update: rate,
      create: rate,
    });
  }
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
