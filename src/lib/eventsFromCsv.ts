import { parse } from "csv-parse/sync";
import type { ClubEventRecord } from "@/types/clubEvent";
import type { EventCategory } from "@/data/pastEvents";

const CATEGORIES = new Set<string>(["speakers", "programs", "wellness"]);

function normHeader(h: string): string {
  return String(h ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "");
}

const KEY_MAP = new Map<string, string>([
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

function isDraft(val: unknown): boolean {
  const s = String(val ?? "")
    .trim()
    .toLowerCase();
  return s === "yes" || s === "y" || s === "true" || s === "1" || s === "x" || s === "draft";
}

function parseGallery(cell: unknown): { src: string; alt: string }[] {
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

function nullIfEmpty(s: unknown): string | null {
  const t = String(s ?? "").trim();
  return t === "" ? null : t;
}

type RowObj = Record<string, string | undefined>;
const HTML_RESPONSE_RE = /^<(?:!doctype|html|head|body)\b/i;

function rowToEvent(row: RowObj): ClubEventRecord | null {
  const obj: Record<string, unknown> = {};
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
    return null;
  }

  if (!CATEGORIES.has(category)) {
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
    category: category as EventCategory,
    coverImage: nullIfEmpty(obj.coverImage),
    gallery: parseGallery(obj.gallery),
    rsvpUrl: nullIfEmpty(obj.rsvpUrl),
  };
}

/**
 * Parse exported Google Sheet CSV into club events (same rules as `npm run sync-events`).
 */
export function parseEventsCsv(csv: string): ClubEventRecord[] {
  const normalized = csv.replace(/^\uFEFF/, "").trimStart();
  if (HTML_RESPONSE_RE.test(normalized)) {
    throw new Error("Expected CSV but received HTML. Make sure the sheet is shared for viewing.");
  }
  const records = parse(normalized, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_quotes: true,
    relax_column_count: true,
  }) as RowObj[];

  const events: ClubEventRecord[] = [];
  for (const row of records) {
    const ev = rowToEvent(row);
    if (ev) events.push(ev);
  }
  return events;
}
