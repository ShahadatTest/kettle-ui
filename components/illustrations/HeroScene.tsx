"use client";

import { motion } from "motion/react";

const INK = "var(--ink)";
const box = { transformBox: "fill-box", transformOrigin: "center" } as const;

function Cloud({ y, scale, duration, delay, on }: { y: number; scale: number; duration: number; delay: number; on: boolean }) {
  return (
    <motion.g
      initial={{ transform: `translate(-90px, ${y}px) scale(${scale})` }}
      animate={on ? { transform: [`translate(-90px, ${y}px) scale(${scale})`, `translate(430px, ${y}px) scale(${scale})`] } : undefined}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M0 30a14 14 0 0 1 14-14 20 20 0 0 1 36-4 15 15 0 0 1 24 18Z"
        fill="var(--paper)"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </motion.g>
  );
}

function Puff({ delay, on }: { delay: number; on: boolean }) {
  return (
    <motion.circle
      cx="0"
      cy="0"
      r="7"
      fill="var(--paper)"
      stroke={INK}
      strokeWidth="2"
      style={box}
      initial={{ opacity: 0 }}
      animate={
        on
          ? {
              opacity: [0, 1, 0],
              transform: ["translate(0px, 0px) scale(0.4)", "translate(-10px, -22px) scale(1)", "translate(-24px, -46px) scale(1.5)"],
            }
          : undefined
      }
      transition={{ duration: 1.8, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

function Note({ x, delay, glyph, color, on }: { x: number; delay: number; glyph: string; color: string; on: boolean }) {
  return (
    <motion.text
      x={x}
      y="250"
      fontSize="26"
      fontWeight="800"
      fill={color}
      stroke={INK}
      strokeWidth="1.2"
      initial={{ opacity: 0 }}
      animate={
        on
          ? {
              opacity: [0, 1, 1, 0],
              transform: ["translate(0px, 0px) rotate(0deg)", "translate(10px, -40px) rotate(12deg)", "translate(-8px, -80px) rotate(-10deg)", "translate(6px, -120px) rotate(8deg)"],
            }
          : undefined
      }
      transition={{ duration: 3.6, delay, repeat: Infinity, ease: "easeOut" }}
      style={box}
    >
      {glyph}
    </motion.text>
  );
}

/** Animated hero illustration: a toy train crossing green hills below a snowy peak. */
export function HeroScene({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 size-full" role="img" aria-label="Illustration: a toy train crossing green hills below a snowy mountain">
      <rect width="400" height="300" fill="var(--sky)" />

      <motion.circle
        cx="320"
        cy="62"
        r="30"
        fill="var(--sun)"
        stroke={INK}
        strokeWidth="2.5"
        style={box}
        animate={on ? { transform: ["scale(1)", "scale(1.08)", "scale(1)"] } : undefined}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <Cloud y={30} scale={0.9} duration={26} delay={-8} on={on} />
      <Cloud y={70} scale={0.6} duration={34} delay={-22} on={on} />

      {/* mountains */}
      <path d="M-10 190 70 120l40 26 70-86 60 64 40-24 70 70 60-30v70H-10Z" fill="var(--lilac)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m180 60 30 32-14-4-12 12-10-10-18 8Z" fill="var(--paper)" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="m70 120 18 12-8-1-6 8-8-6-10 3Z" fill="var(--paper)" stroke={INK} strokeWidth="2" strokeLinejoin="round" />

      {/* hills */}
      <path d="M-10 200c70-30 130-34 200-12s140 14 220-14v130H-10Z" fill="var(--tea)" stroke={INK} strokeWidth="2.5" />
      {Array.from({ length: 4 }).map((_, i) => (
        <path
          key={i}
          d={`M-10 ${224 + i * 16}c90-${18 - i * 3} 200-${6 + i} 420-${10 - i * 2}`}
          fill="none"
          stroke="var(--tea-deep)"
          strokeWidth="5"
          strokeDasharray="2 12"
          strokeLinecap="round"
        />
      ))}

      {/* track */}
      <path d="M-10 214h420" stroke={INK} strokeWidth="3" />
      <path d="M-10 219h420" stroke={INK} strokeWidth="1.5" strokeDasharray="3 7" />

      {/* toy train */}
      <motion.g
        initial={{ transform: "translateX(-200px)" }}
        animate={on ? { transform: ["translateX(-200px)", "translateX(430px)"] } : undefined}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      >
        <motion.g
          animate={on ? { transform: ["translateY(0px)", "translateY(-1.5px)", "translateY(0px)"] } : undefined}
          transition={{ duration: 0.4, repeat: Infinity }}
        >
          {/* coaches */}
          <rect x="0" y="186" width="46" height="24" rx="4" fill="var(--strings)" stroke={INK} strokeWidth="2.5" />
          <rect x="6" y="192" width="10" height="8" rx="1.5" fill="var(--paper)" stroke={INK} strokeWidth="1.5" />
          <rect x="22" y="192" width="10" height="8" rx="1.5" fill="var(--paper)" stroke={INK} strokeWidth="1.5" />
          <rect x="52" y="186" width="46" height="24" rx="4" fill="var(--sun)" stroke={INK} strokeWidth="2.5" />
          <rect x="58" y="192" width="10" height="8" rx="1.5" fill="var(--paper)" stroke={INK} strokeWidth="1.5" />
          <rect x="74" y="192" width="10" height="8" rx="1.5" fill="var(--paper)" stroke={INK} strokeWidth="1.5" />
          {/* engine */}
          <rect x="104" y="180" width="26" height="30" rx="3" fill="var(--tunes)" stroke={INK} strokeWidth="2.5" />
          <rect x="109" y="185" width="14" height="10" rx="1.5" fill="var(--paper)" stroke={INK} strokeWidth="1.5" />
          <rect x="130" y="192" width="30" height="18" rx="6" fill="var(--tunes)" stroke={INK} strokeWidth="2.5" />
          <rect x="146" y="178" width="8" height="14" fill={INK} />
          {[12, 34, 64, 86, 116, 148].map((cx) => (
            <circle key={cx} cx={cx} cy="212" r="5" fill={INK} />
          ))}
        </motion.g>
        <g transform="translate(150 174)">
          <Puff delay={0} on={on} />
          <Puff delay={0.6} on={on} />
          <Puff delay={1.2} on={on} />
        </g>
      </motion.g>

      {/* foreground: a cup of tea playing tunes */}
      <path d="M-10 262c80-14 180-14 260 0s110 6 160 0v50H-10Z" fill="var(--tea-deep)" stroke={INK} strokeWidth="2.5" />
      <g transform="translate(270 238)">
        <ellipse cx="34" cy="44" rx="44" ry="8" fill="var(--paper)" stroke={INK} strokeWidth="2.5" />
        <path d="M2 4h64l-6 32a8 8 0 0 1-8 6H16a8 8 0 0 1-8-6Z" fill="var(--paper)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M66 12a10 10 0 0 1 0 18" fill="none" stroke={INK} strokeWidth="3" />
        <ellipse cx="34" cy="5" rx="31" ry="4" fill="var(--sun)" stroke={INK} strokeWidth="2" />
        <path d="M18 20c6 4 26 4 32 0" fill="none" stroke="var(--tea)" strokeWidth="4" strokeLinecap="round" />
      </g>
      <Note x={280} delay={0} glyph="♪" color="var(--tunes)" on={on} />
      <Note x={302} delay={1.2} glyph="♫" color="var(--strings)" on={on} />
      <Note x={322} delay={2.4} glyph="♪" color="var(--sun)" on={on} />
    </svg>
  );
}
