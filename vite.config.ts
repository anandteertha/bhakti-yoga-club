import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

function normalizeBasePath(basePath?: string): string {
  if (!basePath || basePath === "/") {
    return "/";
  }

  return `/${basePath.replace(/^\/+|\/+$/g, "")}/`;
}

/**
 * Dev-only proxy so `fetch` hits same-origin `/__events_sheet_proxy/...` and avoids
 * browser CORS when talking to docs.google.com. Production still uses the full CSV URL.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const sheet = env.VITE_EVENTS_SHEET_CSV_URL;
  const configuredBase =
    env.VITE_BASE_PATH?.trim() ||
    process.env.VITE_BASE_PATH?.trim() ||
    process.env.BASE_PATH?.trim() ||
    (() => {
      const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
      return process.env.GITHUB_ACTIONS === "true" && repoName ? `/${repoName}/` : undefined;
    })();
  const proxy: Record<string, { target: string; changeOrigin: boolean; rewrite: (p: string) => string }> = {};

  if (sheet) {
    try {
      const origin = new URL(sheet).origin;
      proxy["/__events_sheet_proxy"] = {
        target: origin,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/__events_sheet_proxy/, "") || "/",
      };
    } catch {
      /* invalid URL in env — skip proxy */
    }
  }

  return {
    base: normalizeBasePath(configuredBase),
    plugins: [react(), tailwindcss()],
    define: {
      global: "globalThis",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        buffer: "buffer",
      },
    },
    optimizeDeps: {
      include: ["buffer", "csv-parse"],
    },
    server: {
      proxy,
    },
  };
});
