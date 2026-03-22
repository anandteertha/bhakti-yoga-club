# Import the example events sheet

Use the CSV in this folder to create your Google Sheet in a few minutes.

## File

- **`events-sheet-template.csv`** — header row + four sample rows (upcoming, past, multi-day, draft).

## Steps

1. Open [Google Sheets](https://sheets.google.com) and sign in.
2. **File → Import → Upload** (or **Import** from **File** menu in a new spreadsheet).
3. Choose **`events-sheet-template.csv`** from this `docs/` folder.
4. Import settings:
   - **Import location:** *Create new spreadsheet* (recommended) or *Insert new sheet(s)* in an existing file.
   - **Separator type:** *Automatically detect* (comma).
   - **Convert text to numbers, dates, and formulas:** you can leave on; dates stay as `YYYY-MM-DD` if the column is plain text.
5. Click **Import data**.
6. **Share** the spreadsheet: **Share** → **General access** → **Anyone with the link** → **Viewer**.
7. **Copy the CSV export URL** for your `.env` file:
   - Click the tab that contains the imported data (usually **Sheet1**).
   - From the browser address bar, copy:
     - The spreadsheet **ID** (between `/d/` and `/edit`).
     - The **gid** for that tab (the `gid=NUMBER` part when the tab is selected).
   - Build:

   `https://docs.google.com/spreadsheets/d/PASTE_SHEET_ID_HERE/export?format=csv&gid=PASTE_GID_HERE`

8. In the project root, copy `.env.example` to `.env` and set:

   ```env
   VITE_EVENTS_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID
   EVENTS_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID
   ```

9. Run **`npm run dev`**, open **Events**, and refresh after you edit the sheet.

## After import

- Edit or delete the **sample** rows (`upcoming-sample`, `past-sample`, etc.) and add your real events.
- **draft** = `yes` means the row is **not** shown on the site (good for ideas-in-progress).
- **category** must be exactly: `speakers`, `programs`, or `wellness`.
- **gallery** format: `/path/to/a.jpg|Caption;;/path/to/b.jpg|Other caption` — add image files under `public/` to match.

Full column reference: root **`README.md`** (Events section).
