import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { WebSocket } from "ws";

// Standard configuration for serverless environments (Node.js)
if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = WebSocket;
}

// Get the URL and clean it
const DATABASE_URL = process.env.DATABASE_URL?.trim().replace(/^["']|["']$/g, "").split("&channel_binding")[0];

// DIAGNOSTIC LOGS: These will print to your terminal
if (typeof window === "undefined") {
  console.log("-----------------------------------------");
  console.log("[DB] Initializing Prisma Client...");
  if (!DATABASE_URL) {
    console.error("[DB] DATABASE_URL is MISSING! Check .env");
  }
}

// Parse components for explicit configuration
// This satisfies TypeScript (Prisma 7 Factory) and Runtime (Driver parsing bug)
const createAdapter = () => {
  try {
    const parsed = new URL(DATABASE_URL!);
    return new PrismaNeon({
      host: parsed.hostname,
      user: parsed.username,
      password: parsed.password,
      database: parsed.pathname.slice(1),
      port: 5432,
      ssl: true,
    });
  } catch (e) {
    // If parsing fails, last resort is connection string
    return new PrismaNeon({ connectionString: DATABASE_URL });
  }
};

const adapter = createAdapter();
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter as any,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

console.log("-----------------------------------------");
