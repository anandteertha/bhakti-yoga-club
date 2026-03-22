/**
 * Official club site — media can be self-hosted by setting `VITE_MEDIA_BASE`
 * to your CDN or `/media` after mirroring uploads. Defaults to the legacy
 * WordPress uploads path until you cut over.
 */
export const LEGACY_SITE = "https://sevabhaktiyogaclub.wordpress.com/" as const;

export const FACEBOOK_EVENTS = "https://www.facebook.com/SEVA.NCSU/events" as const;

const legacyUploads = `${LEGACY_SITE.replace(/\/$/, "")}/wp-content/uploads`;

/** Base URL for `/wp-content/uploads`-style paths (no trailing slash). */
export const MEDIA_BASE = (import.meta.env.VITE_MEDIA_BASE?.replace(/\/$/, "") ?? legacyUploads) as string;

/** Full URL for a file under wp-content/uploads, e.g. `2016/02/meet1.jpg`. */
export function mediaUrl(path: string): string {
  const p = path.replace(/^\//, "");
  return `${MEDIA_BASE}/${p}`;
}
