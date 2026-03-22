/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional base for mirrored `/wp-content/uploads` files, e.g. `https://cdn.example.com` or `/media`. */
  readonly VITE_MEDIA_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
