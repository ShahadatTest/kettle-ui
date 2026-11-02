import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fragment_Mono, Manrope } from "next/font/google";
import { MotionConfig } from "motion/react";
import { PageCursor } from "@/components/docs/cursors";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["opsz", "wdth"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const fragmentMono = Fragment_Mono({ variable: "--font-fragment-mono", subsets: ["latin"], weight: "400" });

const description = "React components with ink outlines, hard offset shadows and spring animations.";

export const metadata: Metadata = {
  // share images need absolute URLs; on Vercel Next fills this in by itself
  metadataBase: process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined,
  title: { default: "Kettle UI by Apurva", template: "%s · Kettle UI" },
  description,
  applicationName: "Kettle UI",
  authors: [{ name: "Apurva Mukherjee", url: "https://github.com/apurvamukherjee" }],
  creator: "Apurva Mukherjee",
  keywords: ["React", "Tailwind CSS", "Motion", "shadcn", "component library", "UI kit"],
  openGraph: { type: "website", siteName: "Kettle UI", title: "Kettle UI by Apurva", description, locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Kettle UI by Apurva", description },
};

export const viewport: Viewport = {
  themeColor: "#fbf6ea",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${manrope.variable} ${fragmentMono.variable}`}>
        <MotionConfig reducedMotion="user">
          <PageCursor />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
