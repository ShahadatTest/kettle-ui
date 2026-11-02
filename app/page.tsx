import { Header, Sidebar } from "@/components/docs/Header";
import { Footer } from "@/components/docs/Footer";
import { DOCS_NAV } from "@/components/docs/nav";
import { DocSection } from "@/components/docs/DocSection";
import { Showcase } from "@/components/docs/Showcase";
import { Swatch } from "@/components/docs/Swatch";
import { BRAND, SEMANTIC } from "@/components/docs/colors";
import { SNIPPETS } from "@/components/docs/snippets";
import { BareHeroScene, FieldDemo, LiveHeroScene, RevealDemo, TrainStepperDemo } from "@/components/docs/demos";
import { CopyButton } from "@/components/docs/CopyButton";
import { PillButton } from "@/components/kit/PillButton";
import { Chip } from "@/components/kit/Chip";
import { EventCard } from "@/components/kit/EventCard";
import { Polaroid } from "@/components/kit/Polaroid";
import { SectionHeading } from "@/components/kit/SectionHeading";
import { Sticker } from "@/components/motion/Sticker";
import { Marquee } from "@/components/motion/Marquee";
import { ToyTrain } from "@/components/illustrations/ToyTrain";

const STATS = [
  { value: "14", label: "Components" },
  { value: "10", label: "Brand colours" },
  { value: "3", label: "Typefaces" },
  { value: "0", label: "CSS-in-JS" },
];

const TICKER = ["Ink outlines", "Hard shadows", "Springy motion", "Milky-tea paper", "Open source"];

export default function Home() {
  return (
    <div id="top">
      <Header nav={DOCS_NAV} />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:px-10 lg:py-28">
          <div className="min-w-0">
            <Chip>Open design system</Chip>
            <h1 className="mt-6 font-display text-[clamp(3.75rem,15vw,10.5rem)] font-extrabold uppercase leading-[0.82] tracking-tight">
              Kettle
              <span className="block text-tunes">
                UI<span className="text-ink">.</span>
              </span>
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Sticker rotate={-6} delay={0.3}>
                <span className="inline-block rounded-full border-2 border-ink bg-strings px-5 py-2 font-display text-lg font-extrabold shadow-hard">
                  by Apurva ✶
                </span>
              </Sticker>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Hand-inked React components</span>
            </div>
            <p className="mt-8 max-w-xl text-lg text-ink/80 md:text-xl">
              A loud, friendly component library steeped in milky-tea paper, chunky ink outlines, hard offset shadows and springy
              motion. Built with React, Tailwind CSS v4 and Motion.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <PillButton href="#pill-button" tone="ink">
                Browse components
              </PillButton>
              <PillButton href="#colors" tone="sun" arrow={false}>
                See the palette
              </PillButton>
            </div>
            <div className="mt-8 flex w-full max-w-md items-center justify-between gap-3 rounded-2xl border-2 border-ink bg-ink py-2 pl-4 pr-2 text-paper">
              <code className="truncate font-mono text-sm">
                <span className="text-sun">$</span> npm i motion react-icons clsx tailwind-merge
              </code>
              <CopyButton value="npm i motion react-icons clsx tailwind-merge" className="shrink-0 text-sun" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="rotate-2 transition-transform duration-500 ease-[var(--ease-bounce)] hover:rotate-0">
              <LiveHeroScene caption="Kettle UI ✶ by Apurva" />
            </div>
            <Sticker rotate={12} delay={0.6} className="absolute -left-3 -top-5 sm:-left-6 sm:-top-6">
              <span className="grid size-20 place-items-center rounded-full border-2 border-ink bg-sun text-center font-display text-sm font-extrabold leading-tight shadow-hard sm:size-24 sm:text-base">
                Fresh
                <br />
                brew
              </span>
            </Sticker>
          </div>
        </div>

        <dl className="grid grid-cols-2 border-t-2 border-ink md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 px-4 py-6 sm:px-8 ${i % 2 ? "border-l-2" : ""} ${i > 1 ? "border-t-2 md:border-t-0" : ""} ${i === 2 ? "md:border-l-2" : ""} border-ink`}
            >
              <dt className="order-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.label}</dt>
              <dd className="font-display text-4xl font-extrabold sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Marquee baseVelocity={-3} className="border-b-2 border-ink bg-sun py-4">
        {TICKER.map((t) => (
          <span key={t} className="mx-5 flex items-center gap-10 font-display text-2xl font-extrabold uppercase sm:text-4xl">
            {t}
            <span className="text-tunes">✶</span>
          </span>
        ))}
      </Marquee>

      {/* ---------- Docs ---------- */}
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 pt-6 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:px-10 lg:pt-16 xl:gap-16">
        <Sidebar nav={DOCS_NAV} />
        <main className="min-w-0">
          <DocSection
            id="colors"
            eyebrow="Foundations"
            title="Colours"
            intro="Milky-tea paper and ink do the heavy lifting; one loud colour per idea. Tap a swatch to copy its hex, or the token to copy the CSS variable."
          >
            <div>
              <h3 className="mb-5 font-display text-2xl font-extrabold">Brand palette</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
                {BRAND.map((c) => (
                  <Swatch key={c.token} color={c} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-5 font-display text-2xl font-extrabold">Semantic</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
                {SEMANTIC.map((c) => (
                  <Swatch key={c.token} color={c} />
                ))}
              </div>
            </div>
            <Showcase title="Tokens" description="Every colour is a CSS variable mapped into Tailwind's theme." code={SNIPPETS.tokens}>
              <div className="flex h-16 overflow-hidden rounded-2xl border-2 border-ink">
                {BRAND.map((c) => (
                  <div key={c.token} className="flex-1" style={{ background: `var(${c.token})` }} title={c.name} />
                ))}
              </div>
            </Showcase>
          </DocSection>

          <DocSection id="typography" eyebrow="Foundations" title="Typography" intro="Three families: a variable display grotesque, a warm sans for reading and a mono for labels.">
            <Showcase title="Type families" code={SNIPPETS.typography}>
              <div className="flex flex-col divide-y-2 divide-ink/10">
                <div className="flex flex-col gap-2 pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <p className="font-display text-6xl font-extrabold uppercase leading-none sm:text-7xl">Aa Tea</p>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Bricolage Grotesque · Display</span>
                </div>
                <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-end sm:justify-between">
                  <p className="text-3xl font-semibold sm:text-4xl">Aa Steeped slowly</p>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Manrope · Body</span>
                </div>
                <div className="flex flex-col gap-2 pt-6 sm:flex-row sm:items-end sm:justify-between">
                  <p className="font-mono text-2xl uppercase tracking-widest">Aa 0123</p>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Fragment Mono · Labels</span>
                </div>
              </div>
            </Showcase>
            <div className="overflow-hidden rounded-[1.75rem] border-2 border-ink bg-card shadow-hard">
              {[
                ["Display", "clamp(3.75rem, 15vw, 10.5rem)", "font-display text-6xl font-extrabold uppercase leading-none sm:text-7xl"],
                ["H1", "4.5rem / 0.9", "font-display text-5xl font-extrabold uppercase leading-[0.9]"],
                ["H2", "2.25rem", "font-display text-4xl font-extrabold"],
                ["H3", "1.5rem", "font-display text-2xl font-extrabold"],
                ["Body", "1.125rem / 1.6", "text-lg"],
                ["Caption", "0.75rem mono", "font-mono text-xs uppercase tracking-widest"],
              ].map(([name, spec, cls]) => (
                <div key={name} className="grid gap-2 border-b-2 border-ink/10 p-5 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:items-center sm:p-6">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest">{name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{spec}</p>
                  </div>
                  <p className={`${cls} [overflow-wrap:anywhere]`}>Steep it slowly</p>
                </div>
              ))}
            </div>
          </DocSection>

          <DocSection id="effects" eyebrow="Foundations" title="Shadows & Motion" intro="Hard offset shadows instead of blur. Elements lift on hover and press flat on tap.">
            <Showcase title="Elevation" description="Hover or tap the tiles." code={SNIPPETS.effects}>
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  ["Flat", "border-2 border-ink"],
                  ["shadow-hard", "border-2 border-ink shadow-hard"],
                  ["shadow-hard-lg", "border-2 border-ink shadow-hard-lg"],
                ].map(([label, cls]) => (
                  <button
                    key={label}
                    type="button"
                    className={`${cls} grid h-32 place-items-center rounded-[1.5rem] bg-paper font-mono text-xs uppercase tracking-widest transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-1 active:translate-y-1 active:shadow-none`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Showcase>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["--ease-bounce", "cubic-bezier(0.34, 1.56, 0.64, 1)", "ease-[var(--ease-bounce)]", "bg-strings"],
                ["--ease-out-expo", "cubic-bezier(0.16, 1, 0.3, 1)", "ease-[var(--ease-out-expo)]", "bg-tea"],
              ].map(([name, val, ease, bg]) => (
                <div key={name} className="group rounded-[1.5rem] border-2 border-ink bg-card p-5 shadow-hard">
                  <p className="font-mono text-sm">{name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{val}</p>
                  <div className="relative mt-5 h-12 rounded-full border-2 border-ink bg-paper-2">
                    <div
                      className={`${bg} ${ease} absolute left-1 top-1 size-9 rounded-full border-2 border-ink transition-[left] duration-700 group-hover:left-[calc(100%-2.6rem)] group-active:left-[calc(100%-2.6rem)]`}
                    />
                  </div>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Hover or press the card</p>
                </div>
              ))}
            </div>
          </DocSection>

          <DocSection id="pill-button" eyebrow="Components" title="Pill Button" intro="Chunky pill with a hard shadow. A second colour floods up on hover and the arrow hops out and back in. Renders a Next.js Link when given an href.">
            <Showcase title="Tones" code={SNIPPETS.pill}>
              <div className="flex flex-wrap gap-4">
                <PillButton tone="ink">Get tickets</PillButton>
                <PillButton tone="tea">Register</PillButton>
                <PillButton tone="tunes">Watch live</PillButton>
                <PillButton tone="strings">Line-up</PillButton>
                <PillButton tone="sun">Explore</PillButton>
                <PillButton tone="paper" arrow={false}>
                  Plain
                </PillButton>
              </div>
            </Showcase>
          </DocSection>

          <DocSection id="chip" eyebrow="Components" title="Chip" intro="Tilted mono eyebrow for section labels, statuses and tags.">
            <Showcase title="Tones" code={SNIPPETS.chip}>
              <div className="flex flex-wrap gap-3">
                <Chip>Schedule</Chip>
                <Chip tone="tea">Open</Chip>
                <Chip tone="tunes" tilt={false}>
                  Sold out
                </Chip>
                <Chip tone="strings">New</Chip>
                <Chip tone="lilac" tilt={false}>
                  Beta
                </Chip>
                <Chip tone="sky">Info</Chip>
                <Chip tone="ink">Ink</Chip>
              </div>
            </Showcase>
          </DocSection>

          <DocSection id="field" eyebrow="Components" title="Field" intro="Labelled input with an ink outline. Lifts on focus; turns red with a message when invalid.">
            <Showcase title="States" description="Type a bad email to see the error state." code={SNIPPETS.field}>
              <FieldDemo />
            </Showcase>
          </DocSection>

          <DocSection id="event-card" eyebrow="Components" title="Event Card" intro="Poster card. On hover a colour wash floods up and the description slides in. On touch screens the description is always shown.">
            <Showcase title="Accents" code={SNIPPETS.card}>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  ["Live Session", "var(--tunes)", "bg-[linear-gradient(135deg,var(--lilac),var(--strings))]", "An evening of loud guitars and louder crowds."],
                  ["Trail Run", "var(--sun)", "bg-[linear-gradient(135deg,var(--tea),var(--sky))]", "Morning trails, fresh air and a finish-line breakfast."],
                  ["Makers Lab", "var(--strings)", "bg-[linear-gradient(135deg,var(--sun),var(--tunes))]", "A stage for creators and digital storytellers."],
                ].map(([title, accent, bg, desc]) => (
                  <div key={title} className="relative">
                    <EventCard
                      title={title}
                      accent={accent}
                      desc={desc}
                      className={bg}
                      footer={
                        <div>
                          <Chip tone="paper" tilt={false}>
                            Register →
                          </Chip>
                        </div>
                      }
                    />
                  </div>
                ))}
              </div>
            </Showcase>
          </DocSection>

          <DocSection id="polaroid" eyebrow="Components" title="Polaroid" intro="Instant-photo frame with a caption strip. Drop any image, video or illustration in.">
            <Showcase title="Frame" code={SNIPPETS.polaroid}>
              <div className="grid gap-8 sm:grid-cols-2">
                <Polaroid caption="Studio ✶ Day 1" className="-rotate-2" frameClassName="bg-[linear-gradient(160deg,var(--sky),var(--lilac))]">
                  <span className="absolute inset-0 grid place-items-center font-display text-5xl font-extrabold text-paper">☕</span>
                </Polaroid>
                <Polaroid caption="Rooftop ✶ Sunrise" className="rotate-2" frameClassName="bg-[linear-gradient(160deg,var(--sun),var(--tunes))]">
                  <span className="absolute inset-0 grid place-items-center font-display text-5xl font-extrabold text-paper">⛰</span>
                </Polaroid>
              </div>
            </Showcase>
          </DocSection>

          <DocSection id="sticker" eyebrow="Components" title="Sticker" intro="Springs in tilted, idles with a gentle bob and, on mouse devices, can be dragged and snaps home when let go.">
            <Showcase title="Draggable" description="Grab one with your mouse." code={SNIPPETS.sticker} previewClassName="min-h-64 flex flex-wrap items-center justify-center gap-10">
              <Sticker rotate={-10}>
                <div className="rounded-full border-2 border-ink bg-sun px-5 py-3 font-display text-xl font-extrabold shadow-hard">Brewed fresh ☕</div>
              </Sticker>
              <Sticker rotate={8} delay={0.15}>
                <div className="grid size-28 place-items-center rounded-full border-2 border-ink bg-tea text-center font-display text-lg font-extrabold leading-tight text-paper shadow-hard">
                  Live
                  <br />
                  music
                </div>
              </Sticker>
              <Sticker rotate={-4} delay={0.3}>
                <div className="rounded-2xl border-2 border-ink bg-strings px-5 py-3 font-mono text-sm uppercase tracking-widest shadow-hard">Limited ed.</div>
              </Sticker>
            </Showcase>
          </DocSection>

          <DocSection id="marquee" eyebrow="Components" title="Marquee" intro="Infinite ticker. On desktop its speed and direction react to scroll velocity and it slows on hover; on touch screens it is a pure CSS animation.">
            <Showcase title="Ticker" description="Scroll the page to push it." code={SNIPPETS.marquee} previewClassName="p-0 sm:p-0 md:p-0 py-10 sm:py-10 md:py-12 flex flex-col gap-4">
              <Marquee baseVelocity={-4} className="-rotate-1 border-y-2 border-ink bg-sun py-4">
                <span className="mx-6 font-display text-3xl font-extrabold uppercase sm:text-4xl">Tea ✶ Tunes ✶ Strings ✶</span>
              </Marquee>
              <Marquee baseVelocity={3} className="rotate-1 border-y-2 border-ink bg-ink py-4 text-paper">
                <span className="mx-6 font-mono text-lg uppercase tracking-widest">Kettle UI · by Apurva · Kettle UI · by Apurva ·</span>
              </Marquee>
            </Showcase>
          </DocSection>

          <DocSection id="section-heading" eyebrow="Components" title="Section Heading" intro="Eyebrow chip, a giant word-by-word masked reveal title and an optional subtitle. Pass objects to colour single words.">
            <Showcase title="Split reveal" code={SNIPPETS.heading}>
              <SectionHeading
                eyebrow="Schedule"
                title={["Event", { text: "Itinerary", className: "text-tunes" }]}
                subtitle="Five days of talks, workshops and good coffee."
                className="[&_h2]:text-[clamp(2.2rem,6vw,5rem)]"
              />
            </Showcase>
          </DocSection>

          <DocSection id="reveal" eyebrow="Components" title="Reveal & Stagger" intro="Scroll-triggered entrances that run on the compositor, so they stay smooth on iOS.">
            <Showcase title="Entrances" code={SNIPPETS.reveal}>
              <RevealDemo />
            </Showcase>
          </DocSection>

          <DocSection id="hero-scene" eyebrow="Illustrations" title="Hero Scene" intro="The animated hero illustration: a toy train crossing rolling green hills below a snowy peak, with drifting clouds, steam puffs and a cup of tea playing tunes. Every loop pauses while off-screen.">
            <Showcase title="Scene" code={SNIPPETS.hero}>
              <div className="grid gap-8 lg:grid-cols-2">
                <BareHeroScene />
                <div className="flex flex-col justify-center gap-4">
                  <p className="text-lg">Pure SVG, coloured entirely by tokens, so it re-themes with the palette.</p>
                  <ul className="flex flex-col gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    <li>✶ 400 × 300 viewBox, scales to any box</li>
                    <li>✶ Transform-string animations (GPU)</li>
                    <li>✶ <code>on</code> prop pauses everything</li>
                    <li>✶ Labelled for screen readers</li>
                  </ul>
                </div>
              </div>
            </Showcase>
          </DocSection>

          <DocSection id="toy-train" eyebrow="Illustrations" title="Toy Train" intro="The little engine on its own: chugging bob, spinning wheels and smoke puffs, all in CSS.">
            <Showcase title="Engine" code={SNIPPETS.train}>
              <div className="flex flex-col items-center gap-2">
                <ToyTrain className="h-20 md:h-24" />
                <div className="h-2 w-full max-w-sm rounded-full bg-ink" />
                <div className="h-1 w-full max-w-sm rounded-full bg-[repeating-linear-gradient(90deg,var(--ink)_0_6px,transparent_6px_18px)]" />
              </div>
            </Showcase>
          </DocSection>

          <DocSection id="train-stepper" eyebrow="Illustrations" title="Train Stepper" intro="Ticket-stub tabs with the toy train springing along the track to the selected stop. Great for itineraries and multi-step flows.">
            <Showcase title="Itinerary" description="Pick a station." code={SNIPPETS.stepper}>
              <TrainStepperDemo />
            </Showcase>
          </DocSection>
        </main>
      </div>

      <Footer />
    </div>
  );
}
