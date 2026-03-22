# Club events - Google Sheet

## Live updates

Set `VITE_EVENTS_SHEET_CSV_URL` in `.env` to your sheet's tab URL (with `gid`) or CSV export URL (see the root `README.md`). The app fetches the sheet on every page load, so you can edit the sheet, refresh the browser, and see updates without rebuilding.

Optional: `EVENTS_SHEET_CSV_URL` can use the same value for `npm run sync-events`, which writes `src/content/events.json` as a fallback when the browser cannot reach Google.

## Column reference and images

See the Events section in the repository `README.md`.

## Template

Import `docs/events-sheet-template.csv` into Google Sheets if you want a starter row.
