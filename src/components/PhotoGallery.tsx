import { useState } from "react";
import type { GalleryImage } from "@/data/media";
import { ImageLightbox } from "./ImageLightbox";

type PhotoGalleryProps = {
  items: readonly GalleryImage[];
  /** Tailwind columns */
  columns?: 1 | 2 | 3 | 4 | 5;
  gap?: "sm" | "md";
  aspect?: "landscape" | "square" | "portrait" | "auto";
  showCaptions?: boolean;
  className?: string;
};

const colClass: Record<NonNullable<PhotoGalleryProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
};

const aspectClass: Record<NonNullable<PhotoGalleryProps["aspect"]>, string> = {
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  auto: "",
};

export function PhotoGallery({
  items,
  columns = 3,
  gap = "md",
  aspect = "landscape",
  showCaptions = true,
  className = "",
}: PhotoGalleryProps) {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const gapCls = gap === "sm" ? "gap-2" : "gap-3";

  return (
    <>
      <div className={`grid ${gapCls} ${colClass[columns]} ${className}`}>
        {items.map((item) => (
          <figure
            key={item.src}
            className="group overflow-hidden rounded-2xl border border-amber-200/60 bg-white/90 shadow-sm ring-1 ring-amber-100/80 transition hover:shadow-md"
          >
            <button
              type="button"
              className="relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              onClick={() => setLightbox(item)}
            >
              <span className="sr-only">View larger: {item.alt}</span>
              <div className={`relative overflow-hidden ${aspectClass[aspect]}`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.04] ${
                    aspect === "auto" ? "max-h-80 w-full object-cover" : ""
                  }`}
                  loading="lazy"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="absolute bottom-2 right-2 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-900 opacity-0 shadow group-hover:opacity-100">
                  View
                </span>
              </div>
            </button>
            {showCaptions && item.caption ? (
              <figcaption className="px-3 py-2.5 text-sm leading-snug text-slate-700">{item.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {lightbox ? (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </>
  );
}
