import type { Color } from "./Swatch";

export const BRAND: Color[] = [
  { name: "Paper", token: "--paper", hex: "#FBF6EA", role: "Page background, milky tea", light: true },
  { name: "Paper 2", token: "--paper-2", hex: "#F3EAD4", role: "Secondary surface, muted", light: true },
  { name: "Ink", token: "--ink", hex: "#1A1714", role: "Text, outlines, hard shadows" },
  { name: "Tea", token: "--tea", hex: "#1FA34A", role: "Success, nature, primary accent" },
  { name: "Tea Deep", token: "--tea-deep", hex: "#0F6B30", role: "Illustration shade, pressed states" },
  { name: "Tunes", token: "--tunes", hex: "#FF4B1F", role: "Focus ring, loud CTAs" },
  { name: "Strings", token: "--strings", hex: "#FF4FB8", role: "Playful highlights", light: true },
  { name: "Lilac", token: "--lilac", hex: "#8A7CFF", role: "Mountains, calm accents", light: true },
  { name: "Sun", token: "--sun", hex: "#FFD43B", role: "Eyebrows, selection, badges", light: true },
  { name: "Sky", token: "--sky", hex: "#7FD1F5", role: "Illustration skies, info", light: true },
];

export const SEMANTIC: Color[] = [
  { name: "Card", token: "--card", hex: "#FFFDF7", role: "Raised surfaces", light: true },
  { name: "Muted text", token: "--muted-foreground", hex: "#615A51", role: "Captions, secondary copy" },
  { name: "Destructive", token: "--destructive", hex: "#D92D20", role: "Errors, invalid fields" },
];
