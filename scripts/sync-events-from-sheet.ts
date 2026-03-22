/**
 * Build-time: fetch sheet CSV and write src/content/events.json.
 * Uses the same parser as the browser (src/lib/eventsFromCsv.ts).
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseEventsCsv } from "../src/lib/eventsFromCsv.ts";
import { normalizeEventsSheetCsvUrl } from "../src/lib/eventsSheetUrl.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "src", "content", "events.json");

async function main() {
  const configuredUrl = (process.env.VITE_EVENTS_SHEET_CSV_URL || process.env.EVENTS_SHEET_CSV_URL)?.trim();
  if (!configuredUrl) {
    console.info(
      "[sync-events] VITE_EVENTS_SHEET_CSV_URL / EVENTS_SHEET_CSV_URL not set - skipping (keeping src/content/events.json as-is).",
    );
    process.exit(0);
  }

  const url = normalizeEventsSheetCsvUrl(configuredUrl);
  console.info("[sync-events] Fetching CSV...");
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    console.error(`[sync-events] HTTP ${res.status} ${res.statusText}. Keeping existing events.json.`);
    process.exit(0);
  }

  const body = await res.text();
  const trimmed = body.replace(/^\uFEFF/, "").trimStart();
  if (trimmed.startsWith("<")) {
    console.error(
      "[sync-events] Response looks like HTML, not CSV. Make sure the sheet is viewable and the URL points to the sheet. Keeping existing events.json.",
    );
    process.exit(0);
  }

  let events;
  try {
    events = parseEventsCsv(body);
  } catch (err) {
    console.error(
      "[sync-events] Could not parse CSV (check quotes/commas in the sheet). Keeping existing events.json.",
      err,
    );
    process.exit(0);
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify({ events }, null, 2)}\n`, "utf8");
  console.info(`[sync-events] Wrote ${events.length} event(s) -> ${path.relative(ROOT, OUT)}`);
}

main().catch((err) => {
  console.error("[sync-events]", err);
  process.exit(1);
});
