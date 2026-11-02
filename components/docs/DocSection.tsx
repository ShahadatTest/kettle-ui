import type { ReactNode } from "react";
import { Chip } from "@/components/kit/Chip";

export function DocSection({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 border-t-2 border-dashed border-ink/20 py-16 first:border-t-0 md:py-24">
      <Chip>{eyebrow}</Chip>
      <h2 className="mt-5 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] [overflow-wrap:anywhere]">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      <div className="mt-10 flex flex-col gap-16">{children}</div>
    </section>
  );
}
