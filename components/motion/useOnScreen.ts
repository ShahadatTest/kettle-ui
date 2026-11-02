"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

/**
 * Ref + "is it near the viewport" flag. Used to pause infinite loops and
 * per-frame work while an element is off-screen, so idle sections cost nothing.
 */
export function useOnScreen<T extends Element = HTMLDivElement>(margin = "120px") {
  const ref = useRef<T>(null);
  const onScreen = useInView(ref, { margin: `${margin} 0px ${margin} 0px` as `${number}px 0px ${number}px 0px` });
  return [ref, onScreen] as const;
}
