"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 3D tilt that follows the pointer, with a glare that slides across. */
export function TiltCard({ children, className, max = 14 }: { children: ReactNode; className?: string; max?: number }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 18 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const glare = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareBg = useTransform(glare, (g) => `radial-gradient(circle at ${g} 30%, rgb(255 255 255 / 0.55), transparent 55%)`);

  return (
    <div className="[perspective:900px]">
      <motion.div
        className={cn("relative overflow-hidden rounded-[1.75rem] border-2 border-ink shadow-hard-lg [transform-style:preserve-3d]", className)}
        style={{ rotateX, rotateY }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
      >
        {children}
        <motion.div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: glareBg }} />
      </motion.div>
    </div>
  );
}
