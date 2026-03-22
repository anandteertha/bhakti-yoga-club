type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "left", className = "" }: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800/90">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-emerald-950 sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
