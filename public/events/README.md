# Club events — Google Sheet

## Live updates (refresh)

Set **`VITE_EVENTS_SHEET_CSV_URL`** in `.env` to your sheet’s **CSV export URL** (see root **`README.md`**). The app fetches the sheet **on every page load** — edit the sheet, refresh the browser, and you see changes without rebuilding.

Optional: **`EVENTS_SHEET_CSV_URL`** (same URL) for `npm run sync-events`, which writes `src/content/events.json` as a fallback when the browser cannot reach Google.

## Column reference & images

See the **Events** section in the repository **`README.md`** (project root).

## Template

Import **`docs/events-sheet-template.csv`** into Google Sheets — see **`docs/GOOGLE_SHEET_TEMPLATE.md`** for upload steps and how to copy the export URL.
