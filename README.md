# SEVA Bhakti Yoga Club @ NCSU

Official website for the club - built with [Vite](https://vitejs.dev/), React, TypeScript, and Tailwind CSS.

## Quick start (developers)

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # runs optional sheet -> JSON sync, then TypeScript + Vite build
npm run preview  # preview the production build locally
npm run lint
```

---

## Events: Google Sheet + live refresh (recommended)

Editors maintain a Google Sheet. The website fetches the sheet in the browser whenever someone loads or refreshes a page, so event text and dates can update without a redeploy. Image files still live in `public/`; the sheet only stores paths.

### Environment variables

Copy `.env.example` to `.env` (gitignored).

| Variable | Purpose |
|----------|---------|
| `VITE_EVENTS_SHEET_CSV_URL` | Required for live updates. Paste either the Google Sheet tab URL (with `gid`) or the CSV export URL. The app normalizes Google Sheets links before fetching. |
| `EVENTS_SHEET_CSV_URL` | Optional. Same URL for `npm run sync-events` / `npm run build`, which writes `src/content/events.json` as a fallback bundle when the browser cannot reach Google. Can match `VITE_EVENTS_SHEET_CSV_URL`. |

### One-time setup

1. Create a Google Sheet with a header row. Import `docs/events-sheet-template.csv` via File -> Import if you want a starter.
2. Share the sheet as Anyone with the link -> Viewer.
3. Add your sheet URL to `.env`. You can use either:
   - The sheet tab URL from the browser address bar, for example `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0`
   - Or the direct CSV export URL, for example `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID`

4. Add the variables to `.env`:

   ```env
   VITE_EVENTS_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID
   EVENTS_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID
   ```

5. Run `npm run dev`, open Events, and confirm the sheet data loads. After that, edit the sheet, save, and refresh the browser to see changes.

### How live fetch works

- On load, the app requests the CSV with a cache-busting query so browsers do not serve a stale copy.
- In local development, Vite proxies requests through `/__events_sheet_proxy` so the browser avoids cross-origin CORS issues with `docs.google.com`.
- In production, the browser requests Google directly. If the browser blocks the request, the app falls back to the last bundled `src/content/events.json` and shows a notice. To keep that fallback fresh, run `npm run sync-events` before deploy or place a same-origin proxy in front of your site.

### Optional: bundle JSON for CI / fallback

```bash
npm run sync-events   # uses EVENTS_SHEET_CSV_URL or VITE_EVENTS_SHEET_CSV_URL
```

`npm run build` runs this first. If neither URL is set, sync is skipped and the existing `events.json` file is left unchanged.

### Column reference

| Column | Required | Description |
|--------|----------|-------------|
| `slug` | yes | URL-safe id: `/events/your-slug`. Lowercase, hyphens. |
| `title` | yes | Event title. |
| `date` | yes | First day: `YYYY-MM-DD`. |
| `endDate` | no | Last day for multi-day events. |
| `time` | no | Example: `6:30 PM`. |
| `summary` | yes | Short line for cards. |
| `description` | yes | Long text. In Sheets, use Alt+Enter for line breaks. |
| `location` | no | Example: `Cox Hall, room 200`. |
| `category` | yes | `speakers`, `programs`, or `wellness`. |
| `coverImage` | no | Path under the site root. See images below. |
| `rsvpUrl` | no | Shown while the event is upcoming. |
| `gallery` | no | See gallery format below. |
| `draft` | no | `yes` means the row is ignored on the site. |

Aliases like `Cover`, `RSVP`, and `End date` also work; see `src/lib/eventsFromCsv.ts`.

### Adding a new event

Add a row in the sheet, then refresh the site. No `npm run build` is required for copy or date changes.

### Adding and updating images

Images are not stored in the sheet. Add files under `public/events/<slug>/`, commit, deploy, and reference those paths in the sheet:

- `coverImage`: `/events/spring-kirtan-2025/cover.jpg`
- `gallery`: see below

### Gallery format in the sheet

Use one cell. Separate images with `;;`. Each entry is `path|alt text`:

```text
/events/spring-kirtan-2025/01.jpg|Kirtan;;/events/spring-kirtan-2025/02.jpg|Prasadam
```

### Past vs upcoming

The last day is `endDate`, or `date` if `endDate` is empty. After that calendar day, the event becomes past automatically.

### Without Google Sheets

Leave `VITE_EVENTS_SHEET_CSV_URL` unset. The app will use `src/content/events.json` only. You can edit that file by hand; `npm run sync-events` remains optional.

### More detail

- `public/events/README.md` - short reference
- `docs/events-sheet-template.csv` - starter import for Google Sheets

---

## Optional environment variables

See `.env.example`:

- `VITE_MEDIA_BASE` - if you mirror legacy media to your own host, set this base URL (`src/data/constants.ts`).

---

## License / content

Maintained by the club. Replace sample rows when you go live.
