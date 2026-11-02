"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useOnScreen } from "@/components/motion/useOnScreen";
import { useFinePointer } from "@/components/motion/useFinePointer";

/**
 * A tilted, draggable sticker that idles with a gentle bob and
 * springs back when let go.
 */
export function Sticker({
  children,
  rotate = -8,
  className,
  delay = 0,
  drag = true,
  play = true,
}: {
  children: ReactNode;
  rotate?: number;
  className?: string;
  delay?: number;
  drag?: boolean;
  play?: boolean;
}) {
  const [ref, onScreen] = useOnScreen();
  const canDrag = useFinePointer() && drag;
  return (
    <motion.div
      ref={ref}
      className={cn(
        "select-none",
        canDrag && "touch-none cursor-grab active:cursor-grabbing",
        className
      )}
      initial={{ scale: 0, rotate: rotate - 30 }}
      animate={play ? { scale: 1, rotate } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 14, delay }}
      drag={canDrag}
      dragSnapToOrigin
      dragElastic={0.6}
      whileHover={{ scale: 1.08, rotate: rotate + 6 }}
      whileDrag={{ scale: 1.15, rotate: rotate - 6, zIndex: 50 }}
      data-cursor={canDrag ? "drag" : undefined}
    >
      <motion.div
        // transform string: runs on the compositor, not per-frame JS
        animate={
          onScreen
            ? { transform: ["translateY(0px)", "translateY(-8px)", "translateY(0px)"] }
            : { transform: "translateY(0px)" }
        }
        transition={{
          duration: 3 + Math.abs(rotate) / 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.6,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
