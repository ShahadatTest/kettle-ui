export type NavGroup = { group: string; items: { id: string; label: string }[] };

export const DOCS_NAV: NavGroup[] = [
  {
    group: "Foundations",
    items: [
      { id: "install", label: "Install" },
      { id: "colors", label: "Colours" },
      { id: "typography", label: "Typography" },
      { id: "effects", label: "Shadows & Motion" },
    ],
  },
  {
    group: "Components",
    items: [
      { id: "pill-button", label: "Pill Button" },
      { id: "chip", label: "Chip" },
      { id: "field", label: "Field" },
      { id: "event-card", label: "Event Card" },
      { id: "polaroid", label: "Polaroid" },
      { id: "sticker", label: "Sticker" },
      { id: "marquee", label: "Marquee" },
      { id: "section-heading", label: "Section Heading" },
      { id: "reveal", label: "Reveal & Stagger" },
    ],
  },
  { group: "Pointers", items: [{ id: "cursors", label: "Cursors" }] },
  {
    group: "Illustrations",
    items: [
      { id: "hero-scene", label: "Hero Scene" },
      { id: "toy-train", label: "Toy Train" },
      { id: "train-stepper", label: "Train Stepper" },
    ],
  },
];

export const GALLERY_NAV: NavGroup[] = [
  {
    group: "Animated",
    items: [
      { id: "strings", label: "Guitar Strings" },
      { id: "brew-cup", label: "Brew Cup" },
      { id: "magnetic", label: "Magnetic" },
      { id: "tilt", label: "Tilt Card" },
    ],
  },
  { group: "Pointers", items: [{ id: "cursors", label: "Cursor Lab" }] },
  {
    group: "Draggables",
    items: [
      { id: "stickers", label: "Sticker Wall" },
      { id: "throw", label: "Throw Box" },
      { id: "reorder", label: "Reorder List" },
      { id: "swipe", label: "Swipe Deck" },
    ],
  },
];
