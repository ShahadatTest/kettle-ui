import type { Metadata } from "next";
import { Header, Sidebar } from "@/components/docs/Header";
import { Footer } from "@/components/docs/Footer";
import { GALLERY_NAV } from "@/components/docs/nav";
import { DocSection } from "@/components/docs/DocSection";
import { Showcase } from "@/components/docs/Showcase";
import { GALLERY_SNIPPETS as S } from "@/components/docs/gallery-snippets";
import { BrewDemo, CursorLab, ReorderDemo, SwipeDemo, ThrowDemo } from "@/components/docs/gallery-demos";
import { Chip } from "@/components/kit/Chip";
import { PillButton } from "@/components/kit/PillButton";
import { PluckStrings } from "@/components/motion/PluckStrings";
import { Magnetic } from "@/components/motion/Magnetic";
import { TiltCard } from "@/components/motion/TiltCard";
import { Sticker } from "@/components/motion/Sticker";

export const metadata: Metadata = {
  title: "Gallery · Kettle UI",
  description: "Animated components, custom cursors and draggables from Kettle UI.",
};

export default function Gallery() {
  return (
    <div id="top">
      <Header nav={GALLERY_NAV} />

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-[90rem] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
          <Chip tone="strings">Motion gallery</Chip>
          <h1 className="mt-6 font-display text-[clamp(3rem,11vw,8rem)] font-extrabold uppercase leading-[0.85]">
            Things that <span className="text-tunes">move</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/80">
            Strings you can strum, six cursors and things you can drag around. All of them work with a mouse, touch and keyboard.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 pt-6 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:px-10 lg:pt-16 xl:gap-16">
        <Sidebar nav={GALLERY_NAV} />
        <main className="min-w-0">
          <DocSection
            id="strings"
            eyebrow="Animated"
            title="Guitar Strings"
            intro="Six strings across the page. Sweep the mouse over them and they bend and twang back. On a phone, swipe sideways along one. Turn the sound on and each pluck plays the next note of a random tune, synthesised in the browser."
          >
            <Showcase title="Pluck" description="Sound starts off. Browsers only allow audio after a click." code={S.strings}>
              <PluckStrings height={160} />
            </Showcase>
          </DocSection>

          <DocSection id="brew-cup" eyebrow="Animated" title="Brew Cup" intro="A loader made of CSS keyframes. It starts on first paint, before any JavaScript has loaded.">
            <Showcase title="Pour" code={S.brew} previewClassName="p-3 sm:p-4 md:p-4">
              <BrewDemo />
            </Showcase>
          </DocSection>

          <DocSection id="magnetic" eyebrow="Animated" title="Magnetic" intro="Wrap anything and it leans toward the mouse while hovered, then springs back. Does nothing on touch screens.">
            <Showcase title="Pull" code={S.magnetic} previewClassName="flex min-h-56 flex-wrap items-center justify-center gap-8">
              <Magnetic>
                <PillButton tone="tunes">Hover me</PillButton>
              </Magnetic>
              <Magnetic strength={0.6}>
                <span className="grid size-24 place-items-center rounded-full border-2 border-ink bg-sun font-display text-lg font-extrabold shadow-hard">Strong</span>
              </Magnetic>
            </Showcase>
          </DocSection>

          <DocSection id="tilt" eyebrow="Animated" title="Tilt Card" intro="Tilts in 3D toward the pointer, with a glare that slides across the surface.">
            <Showcase title="Tilt" code={S.tilt}>
              <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
                <TiltCard className="bg-[linear-gradient(140deg,var(--lilac),var(--strings))]">
                  <div className="flex h-64 flex-col justify-end p-6 text-ink">
                    <span className="font-mono text-xs uppercase tracking-widest">Member card</span>
                    <span className="font-display text-3xl font-extrabold uppercase">Kettle Club</span>
                  </div>
                </TiltCard>
                <TiltCard className="bg-[linear-gradient(140deg,var(--sun),var(--tea))]" max={20}>
                  <div className="flex h-64 flex-col justify-end p-6 text-ink">
                    <span className="font-mono text-xs uppercase tracking-widest">max = 20</span>
                    <span className="font-display text-3xl font-extrabold uppercase">Extra tilt</span>
                  </div>
                </TiltCard>
              </div>
            </Showcase>
          </DocSection>

          <DocSection
            id="cursors"
            eyebrow="Pointers"
            title="Cursor Lab"
            intro="Six custom cursors. Pick one and it applies to this whole page. Mark any element with data-cursor=&quot;Label&quot; and the cursor turns into that label while it's over the element."
          >
            <Showcase title="Pick a cursor" code={S.cursor}>
              <CursorLab />
            </Showcase>
          </DocSection>

          <DocSection id="stickers" eyebrow="Draggables" title="Sticker Wall" intro="Stickers spring in, bob while idle, and snap back home when you let go. Dragging is mouse-only so they never get in the way of scrolling on a phone.">
            <Showcase title="Peel" code={S.stickers} previewClassName="flex min-h-72 flex-wrap items-center justify-center gap-8">
              {[
                ["New", "bg-sun", -12],
                ["Hot ☕", "bg-tunes text-paper", 8],
                ["Drag me", "bg-strings", -4],
                ["Kettle UI", "bg-tea text-paper", 14],
                ["by Apurva", "bg-lilac", -8],
              ].map(([text, tone, rotate], i) => (
                <Sticker key={String(text)} rotate={Number(rotate)} delay={i * 0.08}>
                  <span className={`inline-block rounded-full border-2 border-ink px-5 py-3 font-display text-lg font-extrabold shadow-hard ${tone}`}>{text}</span>
                </Sticker>
              ))}
            </Showcase>
          </DocSection>

          <DocSection id="throw" eyebrow="Draggables" title="Throw Box" intro="Fling things around. They keep their momentum and bounce off the walls. Works with touch too.">
            <Showcase title="Fling" code={S.throwBox}>
              <ThrowDemo />
            </Showcase>
          </DocSection>

          <DocSection id="reorder" eyebrow="Draggables" title="Reorder List" intro="Drag a row by its grip to reorder the list. Only the grip starts a drag, so swiping elsewhere still scrolls the page on a phone.">
            <Showcase title="Sort" code={S.reorder}>
              <ReorderDemo />
            </Showcase>
          </DocSection>

          <DocSection id="swipe" eyebrow="Draggables" title="Swipe Deck" intro="Swipe the top card left or right and it goes to the back of the deck. The buttons do the same for keyboard users.">
            <Showcase title="Swipe" code={S.swipe}>
              <SwipeDemo />
            </Showcase>
          </DocSection>
        </main>
      </div>

      <Footer />
    </div>
  );
}
