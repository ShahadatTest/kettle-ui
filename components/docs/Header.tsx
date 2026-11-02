"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { NavGroup } from "./nav";

// a bit past scroll-padding-top in globals.css, so a clicked link lights up its own entry
const SPY_LINE = 140;

// Scroll events alone miss jumps the browser makes before hydration or without scrolling:
// #hash landings, scroll restoration, back/forward cache and content growing above the fold.
const TRIGGERS = ["scroll", "resize", "load", "pageshow", "hashchange", "scrollend"];

function watchViewport(update: () => void) {
  let raf = 0;
  const schedule = () => {
    if (!raf)
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
  };
  TRIGGERS.forEach((t) => window.addEventListener(t, schedule, { passive: true }));
  const resize = new ResizeObserver(schedule);
  resize.observe(document.body);
  // restoration can land after the first effects run
  const late = window.setTimeout(schedule, 350);
  update();
  return () => {
    cancelAnimationFrame(raf);
    window.clearTimeout(late);
    resize.disconnect();
    TRIGGERS.forEach((t) => window.removeEventListener(t, schedule));
  };
}

function useActiveSection(nav: NavGroup[]) {
  const key = nav.flatMap((g) => g.items.map((i) => i.id)).join(",");
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const ids = key.split(",");
    return watchViewport(() => {
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= SPY_LINE) current = id;
      }
      // the last sections can be too short to ever reach the line
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = ids[ids.length - 1];
      setActive(current);
    });
  }, [key]);
  return active;
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Kettle UI by Apurva, home">
      <span className="grid size-9 place-items-center rounded-xl border-2 border-ink bg-tunes shadow-[2px_2px_0_0_var(--ink)]">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path d="M5 10h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M16 12h1.5a2.5 2.5 0 0 1 0 5H16" fill="none" stroke="var(--ink)" strokeWidth="2" />
          <path d="M8 4c0 1.5 1.5 1.5 1.5 3M12 4c0 1.5 1.5 1.5 1.5 3" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex items-baseline gap-2">
        <span className="font-display text-xl font-extrabold leading-none">Kettle UI</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">by Apurva</span>
      </span>
    </Link>
  );
}

function useScrolled(offset = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => watchViewport(() => setScrolled(window.scrollY > offset)), [offset]);
  return scrolled;
}

// both states add up to the same height (64 + 2 at the top, 16 + 48 + 2 docked) so the page never jumps.
// The 16 is header padding, not pill margin, because a child margin would collapse out of the header.
const DOCK =
  "transition-[max-width,width,height,padding,border-radius,border-color,background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none";

export function Header({ nav }: { nav: NavGroup[] }) {
  const active = useActiveSection(nav);
  const docked = useScrolled();
  const rail = useRef<HTMLElement>(null);
  useEffect(() => {
    const chip = active && rail.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    // scrollIntoView would also nudge the page and fight smooth scrolling, so move the rail only
    if (chip && rail.current) rail.current.scrollTo({ left: chip.offsetLeft - (rail.current.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);
  return (
    <header
      data-docked={docked || undefined}
      className={cn(
        "sticky top-0 z-40 border-b-2 transition-[background-color,border-color,padding] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
        docked ? "border-transparent bg-transparent pt-4" : "pt-0 border-ink bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75"
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-4",
          DOCK,
          docked
            ? "h-12 w-[calc(100%-1.5rem)] max-w-5xl rounded-[2rem] border-2 border-ink bg-paper/85 px-3 shadow-hard backdrop-blur-md supports-[backdrop-filter]:bg-paper/75 sm:px-4"
            : "h-16 w-full max-w-[90rem] rounded-none border-0 border-transparent px-4 sm:px-6 lg:px-10"
        )}
      >
        <Logo />
        <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-widest md:flex" aria-label="Primary">
          <Link href="/#colors" className="hover:text-tunes">Foundations</Link>
          <Link href="/#pill-button" className="hover:text-tunes">Components</Link>
          <Link href="/#cursors" className="hover:text-tunes">Cursors</Link>
          <Link href="/#hero-scene" className="hover:text-tunes">Illustrations</Link>
        </nav>
        <Link
          href="/gallery"
          className="rounded-full border-2 border-ink bg-sun px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        >
          Gallery
        </Link>
      </div>
      {/* phones/tablets: the sidebar becomes a swipeable chip rail */}
      <nav
        ref={rail}
        className={cn(
          "hide-scroll relative flex gap-2 overflow-x-auto border-t-2 px-4 py-2.5 transition-colors duration-300 lg:hidden",
          docked ? "border-transparent" : "border-ink/10"
        )}
        aria-label="Sections"
      >
        {nav.flatMap((g) => g.items).map((it) => (
          <a
            key={it.id}
            data-id={it.id}
            href={`#${it.id}`}
            aria-current={active === it.id ? "location" : undefined}
            className={cn(
              "shrink-0 rounded-full border-2 border-ink px-3 py-1 text-sm font-semibold whitespace-nowrap transition-colors",
              active === it.id ? "bg-ink text-paper" : "bg-card active:bg-sun"
            )}
          >
            {it.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function Sidebar({ nav }: { nav: NavGroup[] }) {
  const active = useActiveSection(nav);
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-24 flex max-h-[calc(100dvh-7rem)] flex-col gap-8 overflow-y-auto pb-10 pr-4" aria-label="Sections">
        {nav.map((g) => (
          <div key={g.group}>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{g.group}</p>
            <ul className="flex flex-col gap-0.5 border-l-2 border-ink/15">
              {g.items.map((it) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    aria-current={active === it.id ? "location" : undefined}
                    className={cn(
                      "relative isolate -ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 font-semibold transition-colors",
                      active === it.id ? "text-ink" : "text-ink/70 hover:border-tunes hover:text-ink"
                    )}
                  >
                    {active === it.id && (
                      <motion.span
                        layoutId="toc-active"
                        transition={{ type: "spring", stiffness: 500, damping: 34 }}
                        className="absolute inset-y-0 left-0 right-0 -z-10 rounded-r-full border-2 border-l-4 border-ink bg-sun shadow-[2px_2px_0_0_var(--ink)]"
                      />
                    )}
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
