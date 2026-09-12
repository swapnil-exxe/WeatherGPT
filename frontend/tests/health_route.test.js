import assert from "node:assert";
import test from "node:test";
import { GET } from "../app/api/system/health/route.ts";

test("GET system health API endpoint returns status ok", async () => {
  const response = await GET();
  const data = await response.json();
  assert.strictEqual(data.status, "ok");
  assert.strictEqual(typeof data.uptime_sec, "number");
});
