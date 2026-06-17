const { Pool, neonConfig } = require("@neondatabase/serverless");
const { PrismaNeon } = require("@prisma/adapter-neon");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const { WebSocket } = require("ws");

dotenv.config();
neonConfig.webSocketConstructor = WebSocket;

// Ensure URL is trimmed and sanitized
const connectionString = process.env.DATABASE_URL?.trim()
  .replace(/^["']|["']$/g, "")
  .split("&channel_binding")[0];

console.log("-----------------------------------------");
console.log("DATABASE_URL Debug:");
console.log("Length:", connectionString?.length);
if (connectionString) {
  try {
    const u = new URL(connectionString);
    console.log("Protocol:", u.protocol);
    console.log("Host:", u.host);
    console.log("Pathname:", u.pathname);
    console.log("Search:", u.search);
  } catch (e) {
    console.log("URL is NOT valid according to URL parser:", e.message);
  }
}
console.log("-----------------------------------------");

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

async function test() {
  try {
    console.log("Testing connection with Prisma...");
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("Connection Success!", result);
  } catch (err) {
    console.error("Connection Failed!");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
