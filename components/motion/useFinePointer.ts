"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

/**
 * True on mouse/trackpad devices. Used to keep drag + hover-follow effects
 * off touch screens, where they would hijack scrolling.
 * Server snapshot is false so touch-safe markup is the default.
 */
export function useFinePointer() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
