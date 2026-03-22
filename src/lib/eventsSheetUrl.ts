const PUBLISHED_TO_WEB_RE = /^\/spreadsheets\/d\/e\/([^/]+)\/(pubhtml|pub)(?:\/|$)/i;
/** Standard spreadsheet id in /d/{id}/… (not the published-to-web /d/e/{token}/… form). */
const STANDARD_SHEET_RE = /^\/spreadsheets(?:\/u\/\d+)?\/d\/([^/]+)/i;

function extractGid(url: URL): string | null {
  return url.searchParams.get("gid") ?? url.hash.match(/gid=(\d+)/i)?.[1] ?? null;
}

/**
 * Accept a Google Sheets tab/edit URL, “publish to web” link, or CSV export URL
 * and normalize it to a CSV GET URL the app can fetch.
 * Unknown URLs are returned unchanged.
 */
export function normalizeEventsSheetCsvUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return trimmed;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return trimmed;
  }

  if (url.hostname !== "docs.google.com") {
    return trimmed;
  }

  // App parses CSV text only; `output=xlsx` returns binary — coerce to CSV.
  const outParam = url.searchParams.get("output");
  if (outParam && outParam.toLowerCase() === "xlsx") {
    url.searchParams.set("output", "csv");
  }

  // Published to web: /d/e/{token}/pubhtml (HTML) or /pub — must use output=csv
  const published = url.pathname.match(PUBLISHED_TO_WEB_RE);
  if (published) {
    const token = published[1];
    const out = new URL(`https://docs.google.com/spreadsheets/d/e/${token}/pub`);
    url.searchParams.forEach((v, k) => {
      out.searchParams.set(k, v);
    });
    out.searchParams.set("output", "csv");
    return out.toString();
  }

  const match = url.pathname.match(STANDARD_SHEET_RE);
  if (!match) {
    return trimmed;
  }

  const sheetId = match[1];
  const gid = extractGid(url);
  const exportUrl = new URL(`https://docs.google.com/spreadsheets/d/${sheetId}/export`);
  exportUrl.searchParams.set("format", "csv");
  if (gid) {
    exportUrl.searchParams.set("gid", gid);
  }
  return exportUrl.toString();
}
