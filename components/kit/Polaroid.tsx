import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** White instant-photo frame with a mono caption strip. */
export function Polaroid({
  children,
  caption,
  className,
  frameClassName,
}: {
  children: ReactNode;
  caption?: ReactNode;
  className?: string;
  frameClassName?: string;
}) {
  return (
    <figure className={cn("relative rounded-[1.75rem] border-2 border-ink bg-white p-3 pb-14 shadow-hard-lg", className)}>
      <div className={cn("relative aspect-[4/3] overflow-hidden rounded-2xl bg-sky", frameClassName)}>{children}</div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-4 px-4 text-center font-mono text-xs uppercase tracking-widest sm:text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
