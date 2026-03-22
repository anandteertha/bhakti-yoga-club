import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { brand, club, navItems } from "@/data/siteContent";

const linkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-amber-100/80 hover:text-slate-900";
const activeClass = "bg-emerald-900/10 text-emerald-950 font-semibold";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-amber-200/60 bg-[color:var(--color-saffron-50)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="group flex min-w-0 flex-1 items-center gap-3 sm:gap-4"
          onClick={() => setOpen(false)}
        >
          <img
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={112}
            height={112}
            className="h-11 w-11 shrink-0 rounded-full border border-amber-200/90 bg-white object-contain shadow-sm ring-2 ring-white sm:h-14 sm:w-14"
            decoding="async"
          />
          <div className="min-w-0 flex flex-col">
            <span className="truncate font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-emerald-950 sm:text-xl">
              {club.name}
            </span>
            <span className="truncate text-xs text-slate-600 group-hover:text-slate-800">
              {club.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-amber-300/80 bg-white/80 p-2 text-slate-800 shadow-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-amber-200/60 bg-[color:var(--color-saffron-50)] px-4 py-3 lg:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile main">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-base ${isActive ? "bg-emerald-900/10 font-semibold text-emerald-950" : "text-slate-800"}`
              }
              end={item.to === "/"}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
