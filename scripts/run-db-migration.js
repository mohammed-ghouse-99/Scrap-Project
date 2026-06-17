const { Pool, neonConfig } = require("@neondatabase/serverless");
const { PrismaNeon } = require("@prisma/adapter-neon");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const { WebSocket } = require("ws");

dotenv.config();
neonConfig.webSocketConstructor = WebSocket;

const connectionString = process.env.DATABASE_URL?.trim()
  .replace(/^["']|["']$/g, "")
  .split("&channel_binding")[0];

const parsed = new URL(connectionString);
const adapter = new PrismaNeon({
  host: parsed.hostname,
  user: parsed.username,
  password: parsed.password,
  database: parsed.pathname.slice(1),
  port: 5432,
  ssl: true,
});
const prisma = new PrismaClient({ adapter });

const sql = `
CREATE TABLE IF NOT EXISTS "Pickup" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "weight" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Pickup_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Pickup_status_idx" ON "Pickup"("status");
CREATE INDEX IF NOT EXISTS "Pickup_createdAt_idx" ON "Pickup"("createdAt");
`;

async function main() {
  try {
    console.log("Running DDL migration query...");
    await prisma.$executeRawUnsafe(sql);
    console.log("Migration successful: Pickup table has been created.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
