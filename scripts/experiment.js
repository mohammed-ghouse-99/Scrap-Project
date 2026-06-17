const { neon, neonConfig } = require("@neondatabase/serverless");
const dotenv = require("dotenv");
const { WebSocket } = require("ws");

dotenv.config();
neonConfig.webSocketConstructor = WebSocket;

const connectionString = process.env.DATABASE_URL?.trim().replace(/^["']|["']$/g, "").split("&channel_binding")[0];

async function experiment() {
  console.log("Testing with neon() function...");
  try {
    const sql = neon(connectionString);
    const result = await sql`SELECT 1 as test`;
    console.log("Success with neon()!", result);
  } catch (err) {
    console.error("Failed with neon()!");
    console.error(err);
  }
}

experiment();
