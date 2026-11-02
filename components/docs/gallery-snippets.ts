export const GALLERY_SNIPPETS = {
  strings: `import { PluckStrings } from "@/components/motion/PluckStrings";

<PluckStrings count={6} height={160} />`,
  brew: `import { BrewCup } from "@/components/motion/BrewCup";

{/* needs the .brew-cup keyframes from globals.css; change key to replay */}
<BrewCup key={run} />`,
  magnetic: `import { Magnetic } from "@/components/motion/Magnetic";

<Magnetic strength={0.35}>
  <PillButton tone="tunes">Hover me</PillButton>
</Magnetic>`,
  tilt: `import { TiltCard } from "@/components/motion/TiltCard";

<TiltCard max={14} className="bg-sun">
  <div className="h-64 p-6">Kettle Club</div>
</TiltCard>`,
  cursor: `import { Cursor } from "@/components/cursor/Cursor";

// once, in your root layout
<Cursor variant="ring" />   // "leaf" | "ring" | "blob" | "trail" | "spark" | "kettle"

// anywhere: the cursor becomes a label over this element
<a href="/work" data-cursor="View">Case study</a>`,
  stickers: `import { Sticker } from "@/components/motion/Sticker";

<Sticker rotate={-12} delay={0.1}>
  <span className="rounded-full border-2 border-ink bg-sun px-5 py-3 shadow-hard">New</span>
</Sticker>`,
  throwBox: `import { ThrowBox } from "@/components/drag/ThrowBox";

<ThrowBox
  items={[
    { id: "a", left: "8%", top: "12%", rotate: -8, node: <Badge>Fling me</Badge> },
    { id: "b", left: "55%", top: "8%", node: <Ball /> },
  ]}
/>`,
  reorder: `import { ReorderList } from "@/components/drag/ReorderList";

const [rows, setRows] = useState([
  { id: "1", label: "Boil the water", tone: "bg-sky" },
  { id: "2", label: "Warm the pot", tone: "bg-sun" },
]);

<ReorderList items={rows} onReorder={setRows} />`,
  swipe: `import { SwipeDeck } from "@/components/drag/SwipeDeck";

<SwipeDeck
  cards={[{ id: "01", title: "Lag Ring", body: "A cursor that takes its time.", tone: "bg-sun" }]}
  onSwipe={(card, dir) => console.log(card.title, dir)}
/>`,
} as const;
