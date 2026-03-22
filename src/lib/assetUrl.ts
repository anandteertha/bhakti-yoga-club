const ABSOLUTE_URL_RE = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

/**
 * Prefixes local `/public` asset paths with Vite's configured base path while
 * leaving external URLs untouched.
 */
export function assetUrl(path?: string | null): string {
  if (!path) {
    return "";
  }

  if (ABSOLUTE_URL_RE.test(path) || path.startsWith("#")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");

  return `${base}${normalizedPath}`;
}
