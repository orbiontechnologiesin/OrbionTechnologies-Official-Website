import fs from "node:fs";
import path from "node:path";

// Load .env.local if present
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...rest] = trimmed.split("=");
      const val = rest.join("=").replace(/^["']|["']$/g, "");
      process.env[key.trim()] = val;
    }
  }
}

const { GET } = await import("../src/app/api/health/route.ts");

async function main() {
  console.log("Testing GET /api/health with .env.local loaded...");
  const response = await GET();
  const status = response.status;
  const json = await response.json();

  console.log(`HTTP Status: ${status}`);
  console.log("Response Body:", JSON.stringify(json, null, 2));

  if (status === 200 && json.status === "healthy" && json.services?.supabase === "ready") {
    console.log("\n[PASS] Health check endpoint with Supabase verified successfully!");
    process.exit(0);
  } else {
    console.error("\n[FAIL] Unexpected response from health check endpoint.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
