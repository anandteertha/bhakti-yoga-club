/**
 * Official club site — media can be self-hosted by setting `VITE_MEDIA_BASE`
 * to your CDN or `/media` after mirroring uploads. Defaults to the legacy
 * WordPress uploads path until you cut over.
 */
export const LEGACY_SITE = "https://sevabhaktiyogaclub.wordpress.com/" as const;

export const FACEBOOK_EVENTS = "https://www.facebook.com/SEVA.NCSU/events" as const;

const legacyUploads = `${LEGACY_SITE.replace(/\/$/, "")}/wp-content/uploads`;

const trimmedMediaEnv = (import.meta.env.VITE_MEDIA_BASE ?? "").trim();
/** Vite base without trailing slash; empty when site is served at domain root. */
const viteBase = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Resolves `VITE_MEDIA_BASE`:
 * - Empty / unset → legacy WordPress uploads URL (full https).
 * - `https://…` or `//…` → used as-is (no trailing slash).
 * - Path like `/media` → same-origin under the app, prefixed with `import.meta.env.BASE_URL`
 *   so GitHub Pages project sites (`/repo/…`) resolve correctly.
 */
function resolveMediaBase(): string {
  const raw = trimmedMediaEnv.replace(/\/$/, "");
  if (!raw) {
    return legacyUploads;
  }
  if (/^https?:\/\//i.test(raw) || raw.startsWith("//")) {
    return raw;
  }
  const slashPath = raw.startsWith("/") ? raw : `/${raw}`;
  return viteBase ? `${viteBase}${slashPath}` : slashPath;
}

/** Base for gallery paths passed to `mediaUrl` (no trailing slash). */
export const MEDIA_BASE = resolveMediaBase();

/** Full URL for a file under the resolved media base, e.g. `2016/02/meet1.jpg`. */
export function mediaUrl(path: string): string {
  const p = path.replace(/^\//, "");
  return `${MEDIA_BASE}/${p}`;
}
