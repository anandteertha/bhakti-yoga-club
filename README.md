# SEVA Bhakti Yoga Club @ NCSU

Official website for the club — built with [Vite](https://vitejs.dev/), React, TypeScript, and Tailwind CSS.

## Quick start (developers)

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # runs optional sheet → JSON sync, then TypeScript + Vite build
npm run preview  # preview the production build locally
npm run lint
```

---

## Events: Google Sheet + live refresh (recommended)

Editors maintain a **Google Sheet**. The **website fetches the sheet in the browser** whenever someone loads or **refreshes** a page (no redeploy needed for event text and dates). Image files still live in `public/` in the repo; you only put **paths** in the sheet.

### Environment variables

Copy `.env.example` to `.env` (gitignored).

| Variable | Purpose |
|----------|---------|
| **`VITE_EVENTS_SHEET_CSV_URL`** | **Required for live updates.** The public CSV export URL of your sheet (below). Exposed to the client so the app can fetch it on each load. |
| **`EVENTS_SHEET_CSV_URL`** | Optional. Same URL for **`npm run sync-events`** / **`npm run build`**, which writes `src/content/events.json` as a **fallback bundle** when the browser cannot reach Google (offline, or some production CORS cases). Can match `VITE_EVENTS_SHEET_CSV_URL`. |

### One-time setup

1. **Create a Google Sheet** from the template: import **`docs/events-sheet-template.csv`** (full steps in **`docs/GOOGLE_SHEET_TEMPLATE.md`**).

2. **Share** the sheet: **Anyone with the link** → **Viewer**.

3. **CSV export URL** (this is what both env vars use):

   - Open the tab that holds events.
   - Copy the spreadsheet **ID** from the URL (between `/d/` and `/edit`).
   - With that tab selected, copy **gid** from the URL.

   `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID`

4. In **`.env`**:

   ```env
   VITE_EVENTS_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID
   EVENTS_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID
   ```

5. Run **`npm run dev`**, open **Events** — you should see data from the sheet after it loads. **Edit the sheet, save, refresh the browser** — changes appear without rebuilding.

### How live fetch works

- On load, the app requests the CSV (with a cache-busting query so browsers do not serve a stale copy).
- **Local development:** Vite proxies requests through `/__events_sheet_proxy` so the browser does not hit cross-origin **CORS** issues with `docs.google.com`.
- **Production:** the browser requests Google directly. If the browser blocks the request (CORS), the app **falls back** to the last bundled `src/content/events.json` and shows a small notice. Mitigations: run `npm run sync-events` before deploy so the bundle is fresh, or put a same-origin proxy in front of your site that forwards to the CSV URL.

### Optional: bundle JSON for CI / fallback

```bash
npm run sync-events   # uses EVENTS_SHEET_CSV_URL or VITE_EVENTS_SHEET_CSV_URL
```

`npm run build` runs this first. If neither URL is set, sync is skipped and existing `events.json` is left unchanged.

### Column reference

| Column | Required | Description |
|--------|------------|-------------|
| **slug** | yes | URL-safe id: `/events/your-slug`. Lowercase, hyphens. |
| **title** | yes | Event title. |
| **date** | yes | First day: `YYYY-MM-DD`. |
| **endDate** | no | Last day for multi-day events. |
| **time** | no | e.g. `6:30 PM`. |
| **summary** | yes | Short line for cards. |
| **description** | yes | Long text. In Sheets: **Alt+Enter** for line breaks. |
| **location** | no | e.g. `Cox Hall, room 200`. |
| **category** | yes | `speakers`, `programs`, or `wellness`. |
| **coverImage** | no | Path under site root (see [images](#adding-and-updating-images)). |
| **rsvpUrl** | no | Shown while the event is upcoming. |
| **gallery** | no | See [gallery format](#gallery-format-in-the-sheet). |
| **draft** | no | `yes` = row is ignored on the site. |

Aliases like `Cover`, `RSVP`, `End date` work — see `src/lib/eventsFromCsv.ts`.

### Adding a new event

Add a row in the sheet, then **refresh** the site. No `npm run build` required for copy/date changes.

### Adding and updating images

Images are **not** stored in the sheet. Add files under **`public/events/<slug>/`**, commit, deploy, and reference paths in the sheet:

- **coverImage:** `/events/spring-kirtan-2025/cover.jpg`
- **gallery:** see below.

### Gallery format in the sheet

One cell; separate images with `;;`. Each entry: `path|alt text`:

```text
/events/spring-kirtan-2025/01.jpg|Kirtan;;/events/spring-kirtan-2025/02.jpg|Prasadam
```

### Past vs upcoming (automatic)

The last day is **endDate**, or **date** if endDate is empty. After that calendar day, the event is **past** — no manual moves.

### Without Google Sheets

Leave **`VITE_EVENTS_SHEET_CSV_URL`** unset. The app uses **`src/content/events.json`** only. You can edit that file by hand; `npm run sync-events` is optional.

### More detail

- **`docs/GOOGLE_SHEET_TEMPLATE.md`** — import the example CSV, share, and copy the export URL.
- **`docs/events-sheet-template.csv`** — sample rows (upcoming, past, multi-day, draft).
- **`public/events/README.md`** — short reference.

---

## Optional environment variables

See **`.env.example`**:

- **`VITE_MEDIA_BASE`** — If you mirror legacy media to your own host, set this base URL (`src/data/constants.ts`).

---

## License / content

Maintained by the club. Replace sample rows when you go live.
