import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fragment_Mono, Manrope } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["opsz", "wdth"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const fragmentMono = Fragment_Mono({ variable: "--font-fragment-mono", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Kettle UI — by Apurva",
  description:
    "A loud, hand-inked React component library: milky-tea paper, ink outlines, hard shadows and springy motion.",
};

export const viewport: Viewport = {
  themeColor: "#fbf6ea",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${manrope.variable} ${fragmentMono.variable}`}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
