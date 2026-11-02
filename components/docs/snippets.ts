export const REGISTRY = "https://raw.githubusercontent.com/apurvamukherjee/kettle-ui/main/public/r";

export const SNIPPETS = {
  registry: `// components.json
{
  "registries": {
    "@kettle": "${REGISTRY}/{name}.json"
  }
}`,
  tokens: `:root {
  --paper: #fbf6ea;   --paper-2: #f3ead4;
  --ink: #1a1714;
  --tea: #1fa34a;     --tea-deep: #0f6b30;
  --tunes: #ff4b1f;   --strings: #ff4fb8;
  --lilac: #8a7cff;   --sun: #ffd43b;
  --sky: #7fd1f5;
}

@theme inline {
  --color-paper: var(--paper);
  --color-ink: var(--ink);
  --color-tunes: var(--tunes);
  /* …one per token → bg-tunes, text-ink, border-ink */
  --shadow-hard: 4px 4px 0 0 var(--ink);
  --shadow-hard-lg: 8px 8px 0 0 var(--ink);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}`,
  typography: `import { Bricolage_Grotesque, Manrope, Fragment_Mono } from "next/font/google";

const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["opsz", "wdth"] });
const sans = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const mono = Fragment_Mono({ variable: "--font-fragment-mono", subsets: ["latin"], weight: "400" });

<h1 className="font-display font-extrabold uppercase">Kettle UI</h1>
<p className="font-sans">Body copy in Manrope.</p>
<span className="font-mono uppercase tracking-widest">Eyebrow</span>`,
  effects: `<div className="rounded-[2rem] border-2 border-ink shadow-hard" />
<div className="rounded-[2rem] border-2 border-ink shadow-hard-lg" />

{/* the lift-and-press interaction used everywhere */}
<button className="border-2 border-ink shadow-hard transition-[transform,box-shadow]
  hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg
  active:translate-x-1 active:translate-y-1 active:shadow-none" />`,
  pill: `import { PillButton } from "@/components/kit/PillButton";

<PillButton tone="ink">Get tickets</PillButton>
<PillButton tone="tea">Register</PillButton>
<PillButton tone="tunes">Watch live</PillButton>
<PillButton tone="strings">Line-up</PillButton>
<PillButton tone="sun">Explore</PillButton>
<PillButton tone="paper" arrow={false}>Plain</PillButton>
<PillButton href="https://example.com">External link</PillButton>`,
  chip: `import { Chip } from "@/components/kit/Chip";

<Chip>Schedule</Chip>
<Chip tone="tea">Open</Chip>
<Chip tone="tunes" tilt={false}>Sold out</Chip>`,
  field: `import { Field } from "@/components/kit/Field";

<Field label="Your name" placeholder="Alex Rivera" />
<Field
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  hint="We only send product updates."
  error={invalid ? "That doesn't look like an email yet." : undefined}
/>`,
  card: `import { EventCard } from "@/components/kit/EventCard";

<EventCard
  title="Live Session"
  accent="var(--tunes)"
  image="/posters/live-session.jpg"
  desc="An evening of loud guitars and louder crowds."
  footer={<Chip tone="paper">Register</Chip>}
/>`,
  polaroid: `import { Polaroid } from "@/components/kit/Polaroid";

<Polaroid caption="Studio ✶ Day 1" className="rotate-2">
  <img src="/photo.jpg" alt="" className="size-full object-cover" />
</Polaroid>`,
  sticker: `import { Sticker } from "@/components/motion/Sticker";

{/* springs in, idles with a bob, drag it and it snaps home (mouse only) */}
<Sticker rotate={-10}>
  <div className="rounded-full border-2 border-ink bg-sun px-5 py-3 font-display font-extrabold shadow-hard">
    Brewed fresh ☕
  </div>
</Sticker>`,
  marquee: `import { Marquee } from "@/components/motion/Marquee";

{/* scroll-velocity aware on desktop, pure CSS on touch screens */}
<Marquee baseVelocity={-4} className="border-y-2 border-ink bg-sun py-4">
  <span className="mx-6 font-display text-4xl font-extrabold uppercase">Tea ✶ Tunes ✶ Strings ✶</span>
</Marquee>`,
  heading: `import { SectionHeading } from "@/components/kit/SectionHeading";

<SectionHeading
  eyebrow="Schedule"
  title={["Event", { text: "Itinerary", className: "text-tunes" }]}
  subtitle="Five days of talks, workshops and good coffee."
/>`,
  reveal: `import { Reveal, Stagger } from "@/components/motion/Reveal";

<Reveal y={40}>
  <p>Fades up on scroll</p>
</Reveal>

<Stagger className="grid grid-cols-4 gap-3" stagger={0.1}>
  <Tile /><Tile /><Tile /><Tile />
</Stagger>`,
  hero: `import { HeroScene } from "@/components/illustrations/HeroScene";
import { useOnScreen } from "@/components/motion/useOnScreen";

function Hero() {
  const [ref, on] = useOnScreen();   // pauses every loop while off-screen
  return (
    <div ref={ref} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
      <HeroScene on={on} />
    </div>
  );
}`,
  train: `import { ToyTrain } from "@/components/illustrations/ToyTrain";

{/* pure CSS animation, needs the .toy-train keyframes from globals.css */}
<ToyTrain className="h-16" />`,
  stepper: `import { TrainStepper } from "@/components/illustrations/TrainStepper";

const stops = [
  { label: "Plan", caption: "Step 01" },
  { label: "Board", caption: "Step 02" },
  { label: "Arrive", caption: "Step 03" },
];

const [stop, setStop] = useState(0);
<TrainStepper stops={stops} value={stop} onChange={setStop} />`,
} as const;
