// Writes registry.json for `shadcn build`. Dependencies live here so the item list
// can't drift from the files. Run with `npm run registry`.
import { writeFileSync } from "node:fs";

const BASE = process.env.REGISTRY_URL ?? "https://raw.githubusercontent.com/apurvamukherjee/kettle-ui/main/public/r";
const dep = (name) => `${BASE}/${name}.json`;

// keep in sync with the :root / @theme blocks in app/globals.css
const theme = {
  name: "kettle-theme",
  type: "registry:style",
  title: "Kettle theme",
  description: "Colour tokens, hard shadows, easings, fonts and the keyframes the animated components need.",
  cssVars: {
    theme: {
      "font-display": "var(--font-bricolage), system-ui, sans-serif",
      "font-mono": "var(--font-fragment-mono), ui-monospace, monospace",
      "shadow-hard": "4px 4px 0 0 var(--ink)",
      "shadow-hard-lg": "8px 8px 0 0 var(--ink)",
      "ease-bounce": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
    },
    light: {
      paper: "#fbf6ea",
      "paper-2": "#f3ead4",
      ink: "#1a1714",
      tea: "#1fa34a",
      "tea-deep": "#0f6b30",
      tunes: "#ff4b1f",
      strings: "#ff4fb8",
      lilac: "#8a7cff",
      sun: "#ffd43b",
      sky: "#7fd1f5",
      card: "#fffdf7",
      "muted-foreground": "#615a51",
      destructive: "#d92d20",
    },
  },
  css: {
    "@keyframes marquee-x": {
      from: { transform: "translate3d(0, 0, 0)" },
      to: { transform: "translate3d(var(--marquee-to), 0, 0)" },
    },
    ".toy-train": { animation: "train-bob 0.35s ease-in-out infinite" },
    ".toy-train .wheel": {
      "transform-box": "fill-box",
      "transform-origin": "center",
      animation: "train-wheel 0.6s linear infinite",
    },
    ".toy-train .smoke": { animation: "train-smoke 1.2s ease-out infinite" },
    '.toy-train[data-paused="true"], .toy-train[data-paused="true"] *': { "animation-play-state": "paused" },
    "@keyframes train-bob": { "50%": { transform: "translateY(-2px)" } },
    "@keyframes train-wheel": { to: { transform: "rotate(360deg)" } },
    "@keyframes train-smoke": {
      from: { transform: "translate(0, 0)", opacity: "1" },
      to: { transform: "translate(var(--dx), var(--dy))", opacity: "0" },
    },
    ".brew-cup .brew": { "animation-fill-mode": "both", "animation-timing-function": "cubic-bezier(0.45, 0, 0.2, 1)" },
    ".brew-cup .cup-outline": { "animation-name": "brew-pop", "animation-duration": "0.5s" },
    ".brew-cup .cup-inside": { "animation-name": "brew-fade", "animation-duration": "0.3s", "animation-delay": "0.35s" },
    ".brew-cup .cup-pour": {
      "transform-origin": "top",
      "animation-name": "brew-pour",
      "animation-duration": "1s",
      "animation-delay": "0.5s",
    },
    ".brew-cup .cup-tea": { "animation-name": "brew-rise", "animation-duration": "0.9s", "animation-delay": "0.6s" },
    ".brew-cup .cup-wave": { animation: "brew-wave 2.2s linear infinite" },
    ".brew-cup .cup-wave-front": { "animation-duration": "1.6s", "animation-direction": "reverse" },
    ".brew-cup .cup-steam": { "transform-box": "fill-box", animation: "brew-steam 1.6s ease-out 1.3s infinite both" },
    ".brew-cup .cup-note": { animation: "brew-note 1.9s ease-out 1.5s infinite both" },
    "@keyframes brew-pop": { from: { opacity: "0", transform: "scale(0.85)" } },
    "@keyframes brew-fade": { from: { opacity: "0" } },
    "@keyframes brew-pour": {
      "0%": { transform: "translateY(0) scaleY(0)" },
      "30%": { transform: "translateY(0) scaleY(1)" },
      "100%": { transform: "translateY(100%) scaleY(0)" },
    },
    "@keyframes brew-rise": { from: { transform: "translateY(103%)" }, to: { transform: "translateY(7%)" } },
    "@keyframes brew-wave": { to: { transform: "translateX(-33.333%)" } },
    "@keyframes brew-steam": {
      "0%": { opacity: "0", transform: "translateY(0)" },
      "40%": { opacity: "0.9" },
      "100%": { opacity: "0", transform: "translateY(-14px)" },
    },
    "@keyframes brew-note": {
      "0%": { opacity: "0", transform: "translateY(10px) scale(0.5)" },
      "42%": { opacity: "1", transform: "translateY(-14px) scale(1)" },
      "84%, 100%": { opacity: "0", transform: "translateY(-34px) scale(0.9)" },
    },
    ".animate-swipe-hint": { animation: "swipe-hint 1.6s ease-in-out infinite" },
    "@keyframes swipe-hint": {
      "0%, 100%": { transform: "translateX(-5px) rotate(-8deg)" },
      "50%": { transform: "translateX(5px) rotate(8deg)" },
    },
    ".animate-fade-in": { animation: "fade-in 0.5s ease-out both" },
    "@keyframes fade-in": { from: { opacity: "0", transform: "translateY(8px)" } },
    "@media (hover: hover) and (pointer: fine)": {
      ".has-custom-cursor, .has-custom-cursor *": { cursor: "none !important" },
      '.has-custom-cursor :is(input, textarea, [contenteditable="true"])': { cursor: "text !important" },
    },
  },
};

// [name, file, description, npm deps, registry deps]
const ITEMS = [
  ["use-on-screen", "components/motion/useOnScreen.ts", "Ref plus an is-near-viewport flag, used to pause loops off-screen.", ["motion"], [], "registry:hook"],
  ["use-fine-pointer", "components/motion/useFinePointer.ts", "True on mouse and trackpad devices.", [], [], "registry:hook"],
  ["tf", "components/motion/tf.ts", "Builds one transform string so Motion can run animations on the compositor.", [], [], "registry:lib"],
  ["pill-button", "components/kit/PillButton.tsx", "Pill button with a hard shadow, colour flood and hopping arrow. Uses next/link.", ["motion", "react-icons"], []],
  ["chip", "components/kit/Chip.tsx", "Tilted mono label.", [], []],
  ["field", "components/kit/Field.tsx", "Labelled input with hint and error states.", [], []],
  ["event-card", "components/kit/EventCard.tsx", "Poster card with a colour wash on hover.", [], []],
  ["polaroid", "components/kit/Polaroid.tsx", "Instant-photo frame with a caption.", [], []],
  ["split-words", "components/motion/SplitWords.tsx", "Word-by-word masked heading reveal.", ["motion"], ["tf"]],
  ["reveal", "components/motion/Reveal.tsx", "Reveal and Stagger scroll entrances.", ["motion"], ["tf"]],
  ["section-heading", "components/kit/SectionHeading.tsx", "Eyebrow, split-reveal title and subtitle.", [], ["split-words", "reveal"]],
  ["sticker", "components/motion/Sticker.tsx", "Tilted sticker that bobs and can be dragged with a mouse.", ["motion"], ["use-on-screen", "use-fine-pointer"]],
  ["marquee", "components/motion/Marquee.tsx", "Infinite ticker that reacts to scroll speed on desktop.", ["motion"], ["use-on-screen", "use-fine-pointer"]],
  ["pluck-strings", "components/motion/PluckStrings.tsx", "Guitar strings you can strum, with optional synthesised sound.", ["react-icons"], []],
  ["brew-cup", "components/motion/BrewCup.tsx", "CSS-only cup-of-tea loader.", [], []],
  ["magnetic", "components/motion/Magnetic.tsx", "Wrapper that leans toward the mouse.", ["motion"], ["use-fine-pointer"]],
  ["tilt-card", "components/motion/TiltCard.tsx", "3D tilt card with a glare.", ["motion"], []],
  ["hero-scene", "components/illustrations/HeroScene.tsx", "Animated SVG scene: a toy train crossing hills below a mountain.", ["motion"], []],
  ["toy-train", "components/illustrations/ToyTrain.tsx", "Chugging toy train in CSS.", [], ["use-on-screen"]],
  ["train-stepper", "components/illustrations/TrainStepper.tsx", "Ticket-stub step picker with the toy train.", ["motion"], ["toy-train"]],
  ["leaf-pick", "components/cursor/LeafPick.tsx", "Leaf-shaped pick icon.", [], []],
  ["cursor", "components/cursor/Cursor.tsx", "Custom cursor with six variants and data-cursor labels.", ["motion"], ["use-fine-pointer", "leaf-pick"]],
  ["throw-box", "components/drag/ThrowBox.tsx", "Box of items you can fling around.", ["motion"], []],
  ["reorder-list", "components/drag/ReorderList.tsx", "Drag-handle reorderable list.", ["motion", "react-icons"], []],
  ["swipe-deck", "components/drag/SwipeDeck.tsx", "Swipeable card deck with button fallbacks.", ["motion", "react-icons"], []],
];

const items = [
  theme,
  ...ITEMS.map(([name, path, description, dependencies, deps, type = "registry:component"]) => ({
    name,
    type,
    title: name.replace(/(^|-)(\w)/g, (_, s, c) => (s ? " " : "") + c.toUpperCase()),
    description,
    dependencies,
    // "utils" is shadcn's own cn() helper
    registryDependencies: ["utils", dep("kettle-theme"), ...deps.map(dep)],
    files: [{ path, type, target: path }],
  })),
];

const all = {
  name: "kettle-all",
  type: "registry:item",
  title: "Everything",
  description: "Every Kettle UI component, hook and the theme.",
  registryDependencies: items.map((i) => dep(i.name)),
};

writeFileSync(
  "registry.json",
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "kettle-ui",
      homepage: "https://github.com/apurvamukherjee/kettle-ui",
      items: [...items, all],
    },
    null,
    2
  ) + "\n"
);
console.log(`registry.json: ${items.length + 1} items, base ${BASE}`);
