const SECRET = process.env.ADMIN_SECRET || "ms_steel_scrap_super_secret_key_9550";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function createSession(username: string): Promise<string> {
  const exp = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const payload = JSON.stringify({ username, exp });
  const payloadB64 = typeof btoa !== "undefined" ? btoa(payload) : Buffer.from(payload).toString("base64");
  const signature = await sha256(payload + SECRET);
  return `${payloadB64}.${signature}`;
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const payloadStr = typeof atob !== "undefined" ? atob(parts[0]) : Buffer.from(parts[0], "base64").toString("utf8");
    const signature = parts[1];
    const expectedSignature = await sha256(payloadStr + SECRET);
    if (signature !== expectedSignature) return false;
    const payload = JSON.parse(payloadStr);
    if (payload.exp && Date.now() > payload.exp) return false;
    return true;
  } catch (e) {
    return false;
  }
}
