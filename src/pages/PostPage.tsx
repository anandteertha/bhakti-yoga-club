import { Link, useParams } from "react-router-dom";
import { PageIntro } from "@/components/PageIntro";
import { RsvpBanner } from "@/components/RsvpBanner";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getPostBySlug } from "@/data/posts";

export function PostPage() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;
  usePageTitle(post ? post.title : "Not found");

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-emerald-950">
          Post not found
        </h1>
        <p className="mt-4 text-slate-600">
          That article is not in this mirror. Try the{" "}
          <a className="font-semibold text-emerald-900 underline" href="https://sevabhaktiyogaclub.wordpress.com/">
            legacy archive
          </a>
          .
        </p>
        <Link to="/" className="mt-10 inline-block font-semibold text-emerald-900 hover:underline">
          ← Back home
        </Link>
      </div>
    );
  }

  const dates = [post.datePosted, post.dateUpdated].filter(Boolean).join(" · updated ");

  return (
    <>
      <PageIntro title={post.title} subtitle={`From the club archive · ${dates}`} />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <figure className="overflow-hidden rounded-[2rem] border border-amber-200/80 bg-white shadow-xl ring-1 ring-amber-100">
          <img src={post.heroImage} alt={post.heroAlt} className="w-full object-cover" loading="lazy" />
        </figure>

        {post.body ? (
          <div className="prose prose-slate prose-lg mt-12 max-w-none prose-p:leading-relaxed">
            {post.body.map((p, i) => (
              <p key={i} className="text-slate-800">
                {p}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-lg leading-relaxed text-slate-700">
            This piece is mainly visual in the archive — the image above is shown here at full width for easy viewing.
          </p>
        )}

        {post.externalLink ? (
          <p className="mt-10">
            <a
              href={post.externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-emerald-800"
            >
              {post.externalLink.label}
              <span aria-hidden>↗</span>
            </a>
          </p>
        ) : null}

        <p className="mt-12 rounded-2xl border border-amber-200/60 bg-amber-50/50 px-4 py-3 text-sm text-slate-600">
          Canonical URL on the legacy site:{" "}
          <a className="font-medium text-emerald-900 underline break-all" href={post.wpUrl}>
            {post.wpUrl}
          </a>
        </p>

        <div className="mt-12">
          <RsvpBanner />
        </div>
      </article>
    </>
  );
}
