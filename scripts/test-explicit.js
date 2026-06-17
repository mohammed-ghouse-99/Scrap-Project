const { Pool, neonConfig } = require("@neondatabase/serverless");
const dotenv = require("dotenv");
const { WebSocket } = require("ws");

dotenv.config();
neonConfig.webSocketConstructor = WebSocket;

const url = process.env.DATABASE_URL?.trim().replace(/^["']|["']$/g, "").split("&channel_binding")[0];
const parsed = new URL(url);

const config = {
  host: parsed.hostname,
  user: parsed.username,
  password: parsed.password,
  database: parsed.pathname.slice(1),
  port: 5432,
  ssl: true,
};

async function testExplicit() {
  console.log("Testing Pool with EXPLICIT config...");
  console.log("Host:", config.host);
  console.log("User:", config.user);
  
  const pool = new Pool(config);
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT 1 as test");
    console.log("Success with EXPLICIT config!", result.rows);
    client.release();
  } catch (err) {
    console.error("Failed with EXPLICIT config!");
    console.error(err);
  } finally {
    await pool.end();
  }
}

testExplicit();
