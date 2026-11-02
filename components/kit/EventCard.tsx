import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Poster card: a colour wash floods up on hover and reveals the description. */
export function EventCard({
  title,
  desc,
  image,
  accent = "var(--tunes)",
  footer,
  className,
}: {
  title: string;
  desc?: ReactNode;
  image?: string;
  accent?: string;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative h-full min-h-[24rem] overflow-hidden rounded-[2rem] border-2 border-ink bg-ink shadow-hard-lg",
        className
      )}
    >
      {image && (
        // plain img: the kit must work with any URL and static export, not only next/image
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
        />
      )}
      <div
        className="absolute inset-0 translate-y-full opacity-90 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0"
        style={{ background: accent }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
      <div className="relative flex h-full min-h-[inherit] flex-col justify-end gap-3 p-6 text-paper transition-colors group-hover:text-ink">
        <h3 className="font-display text-3xl font-extrabold uppercase leading-none [overflow-wrap:anywhere]">{title}</h3>
        {desc && (
          <p className="max-h-0 overflow-hidden text-sm font-medium opacity-0 transition-all duration-500 group-hover:max-h-52 group-hover:opacity-100 [@media(hover:none)]:max-h-52 [@media(hover:none)]:opacity-100 md:text-base">
            {desc}
          </p>
        )}
        {footer}
      </div>
    </article>
  );
}
