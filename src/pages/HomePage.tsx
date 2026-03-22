import { Link } from "react-router-dom";
import { ClubEventCard } from "@/components/ClubEventCard";
import { MeetingCard } from "@/components/MeetingCard";
import { NewsletterStrip } from "@/components/NewsletterStrip";
import { PhotoGallery } from "@/components/PhotoGallery";
import { RsvpBanner } from "@/components/RsvpBanner";
import { SectionHeading } from "@/components/SectionHeading";
import { usePageTitle } from "@/hooks/usePageTitle";
import { club } from "@/data/siteContent";
import {
  communityMeetPhotos,
  homeCampusMoments,
  homeFeatureStills,
  homeHeroAssets,
} from "@/data/media";
import { getUpcomingEvents } from "@/data/clubEvents";
import { posts } from "@/data/posts";

export function HomePage() {
  usePageTitle("Home");
  const upcoming = getUpcomingEvents();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-amber-200/50">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(251,191,36,0.2),transparent)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" aria-hidden />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-800/90">NCSU · Registered org</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-tight text-emerald-950">
              {club.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
              Kīrtan, Bhagavad-gītā discussion, and a free vegetarian dinner — every{" "}
              <strong className="font-semibold text-emerald-900">Wednesday</strong> at{" "}
              <strong className="font-semibold text-emerald-900">Cox Hall, room 200</strong>. Open to everyone.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-900 px-6 py-3.5 text-sm font-semibold text-amber-50 shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-800"
              >
                Why we meet
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center justify-center rounded-2xl border border-emerald-900/15 bg-white/90 px-6 py-3.5 text-sm font-semibold text-emerald-950 shadow-sm backdrop-blur transition hover:border-emerald-900/30 hover:bg-white"
              >
                Events
              </Link>
              <Link
                to="/past-events"
                className="inline-flex items-center justify-center rounded-2xl border border-emerald-900/15 bg-white/90 px-6 py-3.5 text-sm font-semibold text-emerald-950 shadow-sm backdrop-blur transition hover:border-emerald-900/30 hover:bg-white"
              >
                Photo archive
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-200/40 via-transparent to-emerald-300/30 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-amber-200/80 bg-white/90 shadow-xl shadow-amber-900/10 ring-1 ring-amber-100">
              <img
                src={homeHeroAssets[0].src}
                alt={homeHeroAssets[0].alt}
                className="aspect-[4/5] w-full object-cover object-top sm:aspect-[3/4]"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent p-6 pt-24">
                <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-amber-50">
                  {club.name}
                </p>
                <p className="mt-1 text-sm text-emerald-100/90">Mantra · wisdom · community · prasādam</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6 sm:py-20">
        <MeetingCard />

        {upcoming.length > 0 ? (
          <section>
            <SectionHeading
              eyebrow="Calendar"
              title="Upcoming"
              subtitle="From our events list — add or edit entries in events.json (no code changes)."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.slice(0, 3).map((e) => (
                <ClubEventCard key={e.slug} event={e} />
              ))}
            </div>
            <p className="mt-6 text-center">
              <Link
                to="/events"
                className="text-sm font-semibold text-emerald-900 underline hover:no-underline"
              >
                {upcoming.length > 3 ? `View all ${upcoming.length} upcoming` : "Events page"} →
              </Link>
            </p>
          </section>
        ) : null}

        <section className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Campus"
              title="Find us at the table"
              subtitle="We table at events and hold space for real questions — no pressure, no pitch."
            />
            <ul className="mt-8 space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>Ask about the Bhagavad-gītā, meditation, or vegetarian food.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>Pick up a card — bring a friend to Wednesday night.</span>
              </li>
            </ul>
          </div>
          <PhotoGallery items={homeCampusMoments} columns={2} aspect="landscape" />
        </section>

        <section>
          <SectionHeading
            eyebrow="Gallery"
            title="Every photo from the legacy home page"
            subtitle="Moments from our weekly gatherings — the full set, preserved in one place."
          />
          <div className="mt-10">
            <PhotoGallery items={communityMeetPhotos} columns={4} aspect="landscape" />
          </div>
        </section>

        <section className="rounded-3xl border border-amber-200/70 bg-gradient-to-br from-white via-amber-50/80 to-emerald-50/40 p-6 shadow-sm ring-1 ring-amber-100 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Still"
                title="Kīrtan · discussion · lineages"
                subtitle="Extra frames from the archive — discussion circles, the holy name, and practice."
              />
            </div>
            <PhotoGallery items={homeFeatureStills} columns={3} aspect="landscape" />
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Read"
            title="From the journal"
            subtitle="Short posts we’ve carried forward — open any for the full article on this site."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-amber-200/80 bg-white/90 shadow-sm ring-1 ring-amber-100 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Link to={`/posts/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={post.heroAlt}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-emerald-950">
                    <Link to={`/posts/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                  <Link
                    to={`/posts/${post.slug}`}
                    className="mt-4 text-sm font-semibold text-emerald-900 hover:underline"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-stretch">
          <NewsletterStrip />
          <div className="flex flex-col justify-center rounded-3xl border border-amber-200/80 bg-white/80 p-6 shadow-sm ring-1 ring-amber-100">
            <img
              src={homeHeroAssets[1].src}
              alt={homeHeroAssets[1].alt}
              className="overflow-hidden rounded-2xl object-cover"
              loading="lazy"
            />
            <p className="mt-4 text-center text-sm font-medium text-slate-700">{homeHeroAssets[1].caption}</p>
          </div>
        </section>

        <RsvpBanner />
      </div>
    </>
  );
}
