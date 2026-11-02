import { cn } from "@/lib/utils";

const PICK = "M50 118C31 101 3 66 4 36 5 12 25 2 50 2s45 10 46 34c1 30-27 65-46 82Z";
const VEIN = "M50 16C47 44 47 76 50 106M50 46 30 32M50 46l20-14M50 70 32 58M50 70l18-12";

export function LeafPick({
  className,
  fill = "var(--tea)",
  vein = "var(--paper)",
  shadow = false,
}: {
  className?: string;
  fill?: string;
  vein?: string;
  /** hard ink offset shadow drawn in the SVG (cheaper than a CSS drop-shadow filter) */
  shadow?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 120" className={cn("overflow-visible", className)} aria-hidden>
      {shadow && <path d={PICK} fill="var(--ink)" transform="translate(8 8)" />}
      <path d={PICK} fill={fill} />
      <path d={VEIN} fill="none" stroke={vein} strokeWidth={5} strokeLinecap="round" />
    </svg>
  );
}
