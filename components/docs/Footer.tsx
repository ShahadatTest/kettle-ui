import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="mt-10 border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10">
        <div className="flex flex-col gap-4">
          <div className="w-fit rounded-2xl bg-paper px-3 py-2 text-ink">
            <Logo />
          </div>
          <p className="max-w-sm text-paper/70">A hand-inked React design system. Designed and built by Apurva Mukherjee.</p>
        </div>
        <p className="font-display text-[clamp(2.5rem,8vw,5rem)] font-extrabold uppercase leading-none">
          By <span className="text-sun">Apurva</span>
        </p>
      </div>
      <div className="border-t-2 border-paper/15 px-4 py-5 text-center font-mono text-[11px] uppercase tracking-widest text-paper/50">
        © 2026 Kettle UI · Designed &amp; built by Apurva
      </div>
    </footer>
  );
}
