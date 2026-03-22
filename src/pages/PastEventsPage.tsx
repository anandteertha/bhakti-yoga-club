import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ClubEventCard } from "@/components/ClubEventCard";
import { ImageLightbox } from "@/components/ImageLightbox";
import { PageIntro } from "@/components/PageIntro";
import { RsvpBanner } from "@/components/RsvpBanner";
import { SectionHeading } from "@/components/SectionHeading";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getPastEventsFromFile } from "@/data/clubEvents";
import { vineDividerSrc } from "@/data/media";
import {
  categoryLabels,
  pastEventGroups,
  pastEventsIntro,
  type EventCategory,
} from "@/data/pastEvents";

const ALL = "all" as const;

export function PastEventsPage() {
  usePageTitle("Past Events");
  const jsonPast = getPastEventsFromFile();
  const [filter, setFilter] = useState<typeof ALL | EventCategory>(ALL);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const filtered = useMemo(() => {
    if (filter === ALL) return pastEventGroups;
    return pastEventGroups.filter((g) => g.category === filter);
  }, [filter]);

  const years = useMemo(() => {
    const y = new Set<number>();
    pastEventGroups.forEach((g) => y.add(g.year));
    return [...y].sort((a, b) => b - a);
  }, []);

  return (
    <>
      <PageIntro
        title="Past events"
        subtitle="Events you list in events.json (past dates) appear first. Below that: the legacy photo archive — tap any photo to enlarge."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {jsonPast.length > 0 ? (
          <section className="mb-16">
            <SectionHeading
              eyebrow="This site"
              title="Recorded events"
              subtitle="Details and galleries from events.json. Upcoming items live on the Events page."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jsonPast.map((e) => (
                <ClubEventCard key={e.slug} event={e} />
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-slate-600">
              Manage the list in{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">src/content/events.json</code> — see{" "}
              <Link className="font-semibold text-emerald-900 underline" to="/events">
                Events
              </Link>
              .
            </p>
          </section>
        ) : null}

        <div className="rounded-[2rem] border border-amber-200/70 bg-gradient-to-br from-amber-50/90 via-white to-emerald-50/50 p-8 shadow-sm sm:p-12">
          <p className="text-center font-[family-name:var(--font-display)] text-3xl font-semibold text-emerald-950 sm:text-4xl">
            {pastEventsIntro}
          </p>
          <div className="mt-8 flex justify-center">
            <img src={vineDividerSrc} alt="" className="max-h-12 w-auto opacity-80" loading="lazy" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <aside className="lg:w-52 lg:shrink-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Years</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {years.map((y) => (
                <li key={y}>
                  <span className="font-semibold text-emerald-900">{y}</span>
                  <span className="text-slate-500"> — archive</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-w-0 flex-1 space-y-8">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter past events">
              <FilterChip selected={filter === ALL} onClick={() => setFilter(ALL)} label="All" />
              {(Object.keys(categoryLabels) as EventCategory[]).map((key) => (
                <FilterChip
                  key={key}
                  selected={filter === key}
                  onClick={() => setFilter(key)}
                  label={categoryLabels[key]}
                />
              ))}
            </div>

            <div className="space-y-14">
              {filtered.map((group) => (
                <section
                  key={group.id}
                  className="rounded-[2rem] border border-amber-200/60 bg-white/85 p-6 shadow-md ring-1 ring-amber-100/80 sm:p-10"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-emerald-950 sm:text-3xl">
                      {group.title}
                    </h2>
                    <span className="rounded-full bg-emerald-900/10 px-4 py-1 text-xs font-bold uppercase tracking-wide text-emerald-900">
                      {categoryLabels[group.category]}
                    </span>
                  </div>
                  {group.description ? (
                    <p className="mt-3 text-slate-600 leading-relaxed">{group.description}</p>
                  ) : null}
                  <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.images.map((img) => (
                      <button
                        key={img.src}
                        type="button"
                        className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-amber-50/30 text-left shadow-sm ring-1 ring-amber-100/80 transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                        onClick={() => setLightbox({ src: img.src, alt: img.alt })}
                      >
                        <span className="sr-only">View larger: {img.alt}</span>
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                        <span className="absolute bottom-2 right-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700 opacity-0 shadow group-hover:opacity-100">
                          Enlarge
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <RsvpBanner />
        </div>
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

function FilterChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        selected
          ? "bg-emerald-900 text-amber-50 shadow-sm"
          : "bg-white/90 text-slate-800 ring-1 ring-amber-200/80 hover:bg-amber-50"
      }`}
    >
      {label}
    </button>
  );
}
