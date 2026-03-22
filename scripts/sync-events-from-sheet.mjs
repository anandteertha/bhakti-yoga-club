/**
 * Pulls a public Google Sheet (CSV export URL) and writes src/content/events.json.
 *
 * Set EVENTS_SHEET_CSV_URL in .env or the environment. If unset, exits 0 without changing files
 * (keeps hand-edited JSON for local work).
 *
 * @see public/events/README.md
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "src", "content", "events.json");

const CATEGORIES = new Set(["speakers", "programs", "wellness"]);

/** Normalize headers: "End Date" / "end_date" → "enddate" */
function normHeader(h) {
  return String(h ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "");
}

const KEY_MAP = new Map([
  ["slug", "slug"],
  ["title", "title"],
  ["date", "date"],
  ["startdate", "date"],
  ["start", "date"],
  ["enddate", "endDate"],
  ["end", "endDate"],
  ["time", "time"],
  ["summary", "summary"],
  ["description", "description"],
  ["details", "description"],
  ["location", "location"],
  ["where", "location"],
  ["category", "category"],
  ["type", "category"],
  ["coverimage", "coverImage"],
  ["cover", "coverImage"],
  ["hero", "coverImage"],
  ["rsvpurl", "rsvpUrl"],
  ["rsvp", "rsvpUrl"],
  ["link", "rsvpUrl"],
  ["gallery", "gallery"],
  ["photos", "gallery"],
  ["draft", "draft"],
  ["skip", "draft"],
  ["ignore", "draft"],
]);

function isDraft(val) {
  const s = String(val ?? "")
    .trim()
    .toLowerCase();
  return s === "yes" || s === "y" || s === "true" || s === "1" || s === "x" || s === "draft";
}

function parseGallery(cell) {
  const raw = String(cell ?? "").trim();
  if (!raw) return [];
  return raw
    .split(/\s*;;\s*/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const pipe = chunk.indexOf("|");
      if (pipe === -1) return { src: chunk, alt: "" };
      return {
        src: chunk.slice(0, pipe).trim(),
        alt: chunk.slice(pipe + 1).trim(),
      };
    });
}

function nullIfEmpty(s) {
  const t = String(s ?? "").trim();
  return t === "" ? null : t;
}

function rowToEvent(row) {
  const obj = {};
  for (const [key, val] of Object.entries(row)) {
    const nk = KEY_MAP.get(normHeader(key));
    if (nk) obj[nk] = val;
  }

  if (isDraft(obj.draft)) return null;

  const slug = String(obj.slug ?? "").trim();
  if (!slug || slug.startsWith("#")) return null;

  const title = String(obj.title ?? "").trim();
  const date = String(obj.date ?? "").trim();
  const summary = String(obj.summary ?? "").trim();
  const description = String(obj.description ?? "").trim();
  const category = String(obj.category ?? "")
    .trim()
    .toLowerCase();

  if (!title || !date || !summary || !description) {
    console.warn(`[sync-events] Skipping row "${slug || "(no slug)"}": missing title, date, summary, or description.`);
    return null;
  }

  if (!CATEGORIES.has(category)) {
    console.warn(`[sync-events] Skipping "${slug}": invalid category "${category}" (use speakers, programs, wellness).`);
    return null;
  }

  return {
    slug,
    title,
    date,
    endDate: nullIfEmpty(obj.endDate),
    time: nullIfEmpty(obj.time),
    summary,
    description,
    location: nullIfEmpty(obj.location),
    category,
    coverImage: nullIfEmpty(obj.coverImage),
    gallery: parseGallery(obj.gallery),
    rsvpUrl: nullIfEmpty(obj.rsvpUrl),
  };
}

async function main() {
  const url = process.env.EVENTS_SHEET_CSV_URL?.trim();
  if (!url) {
    console.info("[sync-events] EVENTS_SHEET_CSV_URL not set — skipping (keeping src/content/events.json as-is).");
    process.exit(0);
  }

  console.info("[sync-events] Fetching CSV…");
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    console.error(`[sync-events] HTTP ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const csv = await res.text();
  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_quotes: true,
    relax_column_count: true,
  });

  const events = [];
  for (const row of records) {
    const ev = rowToEvent(row);
    if (ev) events.push(ev);
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify({ events }, null, 2)}\n`, "utf8");
  console.info(`[sync-events] Wrote ${events.length} event(s) → ${path.relative(ROOT, OUT)}`);
}

main().catch((err) => {
  console.error("[sync-events]", err);
  process.exit(1);
});
