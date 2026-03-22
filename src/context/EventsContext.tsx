import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ClubEventRecord, EventsFile } from "@/types/clubEvent";
import fallbackFile from "@/content/events.json";
import { parseEventsCsv } from "@/lib/eventsFromCsv";
import { normalizeEventsSheetCsvUrl } from "@/lib/eventsSheetUrl";

const FALLBACK_EVENTS = (fallbackFile as EventsFile).events;

export type EventsSource = "sheet" | "bundle";

type EventsState = {
  events: ClubEventRecord[];
  status: "loading" | "ready";
  /** Set when sheet URL is configured but fetch/parse failed; UI still shows fallback bundle. */
  fetchError: string | null;
  /** Where `events` came from last successful load. */
  source: EventsSource;
};

const EventsContext = createContext<EventsState | null>(null);

/** Same-origin proxy path in dev (see vite.config.ts) to avoid CORS to Google. */
function sheetRequestUrl(csvBase: string): string {
  const normalized = normalizeEventsSheetCsvUrl(csvBase);
  let u: URL;
  try {
    u = new URL(normalized);
  } catch {
    throw new Error(`Invalid VITE_EVENTS_SHEET_CSV_URL (not a valid URL): ${csvBase}`);
  }
  u.searchParams.set("t", String(Date.now()));
  const full = u.toString();
  if (import.meta.env.DEV) {
    return `/__events_sheet_proxy${u.pathname}${u.search}`;
  }
  return full;
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const hasSheetUrl = Boolean(import.meta.env.VITE_EVENTS_SHEET_CSV_URL?.trim());
  const [state, setState] = useState<EventsState>(() => ({
    events: FALLBACK_EVENTS,
    status: hasSheetUrl ? "loading" : "ready",
    fetchError: null,
    source: "bundle",
  }));

  const load = useCallback(async (signal: AbortSignal) => {
    const url = import.meta.env.VITE_EVENTS_SHEET_CSV_URL?.trim();

    if (!url) {
      setState({
        events: FALLBACK_EVENTS,
        status: "ready",
        fetchError: null,
        source: "bundle",
      });
      return;
    }

    setState((s) => ({ ...s, status: "loading", fetchError: null }));

    try {
      const reqUrl = sheetRequestUrl(url);
      const res = await fetch(reqUrl, {
        signal,
        cache: "no-store",
        headers: { Accept: "text/csv,text/plain,*/*" },
      });
      if (!res.ok) {
        throw new Error(`Sheet request failed (${res.status})`);
      }
      const csv = await res.text();
      const events = parseEventsCsv(csv);
      setState({
        events,
        status: "ready",
        fetchError: null,
        source: "sheet",
      });
    } catch (e) {
      if (signal.aborted) return;
      const msg = e instanceof Error ? e.message : String(e);
      setState({
        events: FALLBACK_EVENTS,
        status: "ready",
        fetchError: msg,
        source: "bundle",
      });
    }
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    void load(ac.signal);
    return () => ac.abort();
  }, [load]);

  const value = useMemo(() => state, [state]);

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook exported next to Provider
export function useEvents(): EventsState {
  const ctx = useContext(EventsContext);
  if (!ctx) {
    throw new Error("useEvents must be used within EventsProvider");
  }
  return ctx;
}
