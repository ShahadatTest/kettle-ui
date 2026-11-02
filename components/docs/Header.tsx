import Link from "next/link";
import type { NavGroup } from "./nav";

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

export function Header({ nav }: { nav: NavGroup[] }) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
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
      <nav className="hide-scroll flex gap-2 overflow-x-auto border-t-2 border-ink/10 px-4 py-2.5 lg:hidden" aria-label="Sections">
        {nav.flatMap((g) => g.items).map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className="shrink-0 rounded-full border-2 border-ink bg-card px-3 py-1 text-sm font-semibold whitespace-nowrap active:bg-sun"
          >
            {it.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function Sidebar({ nav }: { nav: NavGroup[] }) {
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
                    className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 font-semibold text-ink/70 transition-colors hover:border-tunes hover:text-ink"
                  >
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
