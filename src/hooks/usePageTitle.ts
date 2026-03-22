import { useEffect } from "react";

const suffix = "SEVA Bhakti Yoga Club @ NCSU";

export function usePageTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} · ${suffix}`;
    return () => {
      document.title = prev;
    };
  }, [title]);
}
