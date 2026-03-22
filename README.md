# SEVA Bhakti Yoga Club @ NCSU

Official website for the club — built with [Vite](https://vitejs.dev/), React, TypeScript, and Tailwind CSS.

## Quick start (developers)

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build (see Events section — runs sheet sync first)
npm run preview  # preview the production build locally
npm run lint
```

---

## Events: Google Sheet workflow (recommended)

Editors use a **Google Sheet** instead of editing JSON. A script downloads the sheet as CSV during `npm run build` (or when you run `npm run sync-events`) and writes `src/content/events.json`. The site then shows **upcoming** and **past** events automatically based on dates.

### One-time setup

1. **Create a Google Sheet** with a header row. Use the column names in the [column reference](#column-reference) below (or import the starter file `docs/events-sheet-template.csv` via **File → Import** in Google Sheets).

2. **Share the sheet** so the build can read it:
   - **Share** → **General access** → **Anyone with the link** → **Viewer**.

3. **Get the CSV export URL** (not the normal “edit” link):
   - Open the tab that holds your events (for example “Events”).
   - Copy the **spreadsheet ID** from the address bar: the long id between `/d/` and `/edit`.
   - With that tab selected, copy the **gid** from the URL (`gid=...`). The first tab is often `gid=0`, but **always copy it from the URL** for the tab you use.

   Build this URL (replace `YOUR_SHEET_ID` and `YOUR_GID`):

   `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID`

4. **Configure the project**  
   Copy `.env.example` to `.env` in the project root (`.env` is gitignored). Set:

   ```env
   EVENTS_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID
   ```

5. **Test the sync**:

   ```bash
   npm run sync-events
   ```

   You should see a message that `src/content/events.json` was written. Run `npm run dev` and check the **Events** page.

6. **Production / CI**  
   Add the same `EVENTS_SHEET_CSV_URL` value as a **secret** in your hosting provider (GitHub Actions, Netlify, Vercel, etc.) so `npm run build` can pull the latest sheet on each deploy.

If `EVENTS_SHEET_CSV_URL` is **not** set, `npm run sync-events` does nothing and **does not overwrite** `events.json` — useful if someone edits the JSON file by hand locally.

### Column reference

| Column | Required | Description |
|--------|------------|-------------|
| **slug** | yes | URL-safe id for `/events/your-slug`. Lowercase, use hyphens, no spaces. |
| **title** | yes | Event title. |
| **date** | yes | First day, format `YYYY-MM-DD`. |
| **endDate** | no | Last day for multi-day events. Leave empty for a single day. |
| **time** | no | Free text, e.g. `6:30 PM`. |
| **summary** | yes | Short line for cards and listings. |
| **description** | yes | Longer text. In Google Sheets, use **Alt+Enter** inside the cell for line breaks. |
| **location** | no | e.g. `Cox Hall, room 200`. |
| **category** | yes | One of: `speakers`, `programs`, `wellness`. |
| **coverImage** | no | Web path to the hero image (see [images](#adding-and-updating-images)). |
| **rsvpUrl** | no | Facebook or ticket link; shown while the event is still upcoming. |
| **gallery** | no | Multiple images in one cell (see [gallery format](#gallery-format-in-the-sheet)). |
| **draft** | no | Put `yes` to **exclude** this row from the site (planning / work in progress). |

Friendly header aliases work too (for example `Cover`, `RSVP`, `End date`) — see `scripts/sync-events-from-sheet.mjs` for the full mapping.

### Adding a new event

1. Add a **new row** in the sheet with a unique **slug** and fill required columns.
2. Leave **draft** empty or `no` when the event should appear on the site.
3. **Sync** locally with `npm run sync-events`, or deploy so CI runs `npm run build` (which runs sync first).
4. Confirm on `/events` and `/events/your-slug`.

### Adding and updating images

Images are **not** uploaded into the spreadsheet itself. You add files to the **repository** (or your static host) and put **paths** in the sheet.

1. **Choose a folder** under `public/events/` using the event slug, for example:
   - `public/events/spring-kirtan-2025/`
2. **Add image files** there (`jpg`, `png`, `webp`, etc.), for example `cover.jpg`, `01.jpg`, `02.jpg`.
3. **In the sheet**, reference them with paths that start at the site root (because `public/` is served as `/`):
   - **coverImage**: `/events/spring-kirtan-2025/cover.jpg`
   - **gallery**: use the format below.

4. **Commit** the new files under `public/events/...` with your code, then deploy.

### Gallery format in the sheet

Use a **single cell** for **gallery**. Separate multiple images with `;;`. For each image, use `path|short description`:

```text
/events/spring-kirtan-2025/01.jpg|Kirtan;;/events/spring-kirtan-2025/02.jpg|Prasadam
```

The text after `|` is the alt text for accessibility.

### Past vs upcoming (automatic)

The **last day** of the event is **endDate**, or **date** if endDate is empty. After that calendar day, the event is treated as **past** — you do not move rows manually.

### Without Google Sheets

You can still edit **`src/content/events.json`** directly. If you never set `EVENTS_SHEET_CSV_URL`, sync is skipped and your JSON is left as-is.

### More detail

- **`public/events/README.md`** — condensed reference (same workflow).
- **`docs/events-sheet-template.csv`** — sample row you can import into Google Sheets.

---

## Optional environment variables

See **`.env.example`**:

- **`EVENTS_SHEET_CSV_URL`** — CSV export URL for the events sheet (above).
- **`VITE_MEDIA_BASE`** — If you mirror legacy media to your own host, set this base URL so image paths resolve correctly (`src/data/constants.ts`).

---

## License / content

Event and media workflows are documented for club maintainers. Replace sample rows in the sheet or JSON when you go live.
