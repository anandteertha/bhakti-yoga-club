/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public CSV export URL for events — fetched in the browser on each load when set. */
  readonly VITE_EVENTS_SHEET_CSV_URL?: string;
  /** Optional base for mirrored `/wp-content/uploads` files, e.g. `https://cdn.example.com` or `/media`. */
  readonly VITE_MEDIA_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
