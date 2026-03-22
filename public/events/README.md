# Club events — Google Sheets (recommended)

Editors work in a **spreadsheet**. The site pulls that data when you **build** (or run `npm run sync-events`) and writes `src/content/events.json` automatically. You never touch JSON by hand unless you want to.

## One-time setup

1. **Create a Google Sheet** with a first row of column headers (see below).
2. **Share** the file: *General access* → **Anyone with the link** → **Viewer** (read-only is enough).
3. **Copy the CSV export URL**:
   - Open the tab you want to use (e.g. “Events”).
   - In the browser address bar, copy the spreadsheet **ID** (long string between `/d/` and `/edit`).
   - Copy the **gid** for that tab: in the URL it looks like `gid=123456789` when the tab is selected.
   - Your URL is:

   `https://docs.google.com/spreadsheets/d/PASTE_SHEET_ID_HERE/export?format=csv&gid=PASTE_GID_HERE`

   Example: first tab often uses `gid=0`, but **always copy from the URL** when the correct tab is open.

4. **Locally**: create a `.env` file in the project root (not committed — see `.gitignore`):

   ```env
   EVENTS_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_ID/export?format=csv&gid=YOUR_GID
   ```

5. Run:

   ```bash
   npm run sync-events
   ```

   Then `npm run dev` or `npm run build`. **`npm run build` already runs `sync-events` first**, so production builds stay in sync with the sheet when `EVENTS_SHEET_CSV_URL` is set (e.g. in CI secrets).

## Column reference

| Column        | Required | Notes |
|---------------|----------|--------|
| **slug**      | yes      | URL segment: `/events/your-slug` — lowercase, no spaces. |
| **title**     | yes      | Event name. |
| **date**      | yes      | `YYYY-MM-DD` (first day). |
| **endDate**   | no       | Last day for multi-day events; leave blank for one day. |
| **time**      | no       | Free text, e.g. `6:30 PM`. |
| **summary**   | yes      | Short line for cards. |
| **description** | yes    | Long text. In Sheets: **Alt+Enter** in a cell for line breaks / paragraphs. |
| **location**  | no       | e.g. `Cox Hall, room 200`. |
| **category**  | yes      | One of: `speakers`, `programs`, `wellness`. |
| **coverImage**| no       | Path under `public/`, e.g. `/events/spring-2025/cover.jpg`. |
| **rsvpUrl**   | no       | Facebook / ticket link (shown while event is upcoming). |
| **gallery**   | no       | See below. |
| **draft**     | no       | Put `yes` to **skip** this row (planning rows). |

Header names are **flexible** (e.g. `Cover`, `RSVP`, `End date` all work).

### Gallery format (one cell)

Separate images with `;;`. Each image: `path|alt text`:

```txt
/events/my-event/1.jpg|Kirtan;;/events/my-event/2.jpg|Dinner
```

Put files in `public/events/my-event/` so those URLs work.

## Past vs upcoming (automatic)

The **last calendar day** of the event is `endDate`, or `date` if `endDate` is empty. After that day, the event shows as **past** — no extra steps.

## Without Google Sheets

If `EVENTS_SHEET_CSV_URL` is **not** set, `npm run sync-events` does nothing and **does not overwrite** `src/content/events.json`, so you can keep editing that file directly.

## Template CSV

See `docs/events-sheet-template.csv` for a starter row you can import into Sheets (*File → Import*).
