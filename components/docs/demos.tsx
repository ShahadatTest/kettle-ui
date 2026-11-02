"use client";

import { useState } from "react";
import { HeroScene } from "@/components/illustrations/HeroScene";
import { TrainStepper } from "@/components/illustrations/TrainStepper";
import { Field } from "@/components/kit/Field";
import { Polaroid } from "@/components/kit/Polaroid";
import { useOnScreen } from "@/components/motion/useOnScreen";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { PillButton } from "@/components/kit/PillButton";

export function LiveHeroScene({ caption }: { caption?: string }) {
  const [ref, on] = useOnScreen();
  return (
    <div ref={ref}>
      <Polaroid caption={caption}>
        <HeroScene on={on} />
      </Polaroid>
    </div>
  );
}

export function BareHeroScene() {
  const [ref, on] = useOnScreen();
  return (
    <div ref={ref} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-ink">
      <HeroScene on={on} />
    </div>
  );
}

const STOPS = [
  { label: "Plan", caption: "Step 01" },
  { label: "Pack", caption: "Step 02" },
  { label: "Board", caption: "Step 03" },
  { label: "Ride", caption: "Step 04" },
  { label: "Arrive", caption: "Step 05" },
];

export function TrainStepperDemo() {
  const [stop, setStop] = useState(0);
  return (
    <div className="flex flex-col gap-6">
      <TrainStepper stops={STOPS} value={stop} onChange={setStop} />
      <p className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground" aria-live="polite">
        Next stop → {STOPS[stop].label}
      </p>
    </div>
  );
}

export function FieldDemo() {
  const [email, setEmail] = useState("");
  const invalid = email.length > 0 && !/^\S+@\S+\.\S+$/.test(email);
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <Field label="Your name" placeholder="Alex Rivera" autoComplete="name" />
      <Field
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        hint="We only send product updates."
        error={invalid ? "That doesn't look like an email yet." : undefined}
      />
      <Field label="Disabled" placeholder="Not today" disabled />
    </div>
  );
}

export function RevealDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="flex flex-col items-center gap-8">
      <div key={key} className="flex w-full flex-col gap-6">
        <Reveal>
          <p className="text-center font-display text-3xl font-extrabold uppercase sm:text-4xl">Fades up on scroll</p>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4" stagger={0.1}>
          {["bg-tea", "bg-tunes", "bg-strings", "bg-sun"].map((c) => (
            <div key={c} className={`${c} h-20 rounded-2xl border-2 border-ink shadow-hard`} />
          ))}
        </Stagger>
      </div>
      <PillButton tone="paper" arrow={false} onClick={() => setKey((k) => k + 1)}>
        Replay
      </PillButton>
    </div>
  );
}
