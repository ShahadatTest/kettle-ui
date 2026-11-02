"use client";

import { useEffect, useRef, useState } from "react";
import { LuVolume2, LuVolumeX } from "react-icons/lu";
import { cn } from "@/lib/utils";

const COLORS = [
  "var(--tea)",
  "var(--tunes)",
  "var(--strings)",
  "var(--lilac)",
  "var(--sun)",
  "var(--sky)",
];

// Public-domain tunes as MIDI note numbers. Every pluck — on any string —
// plays the next note, so strumming "performs" a randomly picked song.
const SONGS: { name: string; notes: number[] }[] = [
  {
    name: "Ode to Joy",
    notes: [64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 64, 62, 62, 64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 62, 60, 60],
  },
  {
    name: "Twinkle Twinkle",
    notes: [60, 60, 67, 67, 69, 69, 67, 65, 65, 64, 64, 62, 62, 60, 67, 67, 65, 65, 64, 64, 62, 67, 67, 65, 65, 64, 64, 62, 60, 60, 67, 67, 69, 69, 67, 65, 65, 64, 64, 62, 62, 60],
  },
  {
    name: "Frère Jacques",
    notes: [60, 62, 64, 60, 60, 62, 64, 60, 64, 65, 67, 64, 65, 67, 67, 69, 67, 65, 64, 60, 67, 69, 67, 65, 64, 60, 60, 55, 60, 60, 55, 60],
  },
  {
    name: "Jingle Bells",
    notes: [64, 64, 64, 64, 64, 64, 64, 67, 60, 62, 64, 65, 65, 65, 65, 65, 64, 64, 64, 64, 62, 62, 64, 62, 67, 64, 64, 64, 64, 64, 64, 64, 67, 60, 62, 64, 65, 65, 65, 65, 65, 64, 64, 64, 67, 67, 65, 62, 60],
  },
  {
    name: "Happy Birthday",
    notes: [60, 60, 62, 60, 65, 64, 60, 60, 62, 60, 67, 65, 60, 60, 72, 69, 65, 64, 62, 70, 70, 69, 65, 67, 65],
  },
  {
    name: "Mary Had a Little Lamb",
    notes: [64, 62, 60, 62, 64, 64, 64, 62, 62, 62, 64, 67, 67, 64, 62, 60, 62, 64, 64, 64, 64, 62, 62, 64, 62, 60],
  },
  {
    name: "Für Elise",
    notes: [76, 75, 76, 75, 76, 71, 74, 72, 69, 60, 64, 69, 71, 64, 68, 71, 72, 64, 76, 75, 76, 75, 76, 71, 74, 72, 69, 60, 64, 69, 71, 64, 72, 71, 69],
  },
];
const midiToFreq = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
const SOUND_KEY = "kettle-strings-sound";

/** Soft Karplus–Strong pluck (fingertip, not pick), rendered once per note. */
function pluckBuffer(ctx: AudioContext, freq: number) {
  const rate = ctx.sampleRate;
  const len = Math.floor(rate * 3);
  const buf = ctx.createBuffer(1, len, rate);
  const out = buf.getChannelData(0);
  const period = Math.max(2, Math.round(rate / freq));
  // smoothed noise burst = a rounder, softer attack
  const ring = new Float32Array(period);
  for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
  for (let pass = 0; pass < 3; pass++)
    for (let i = 0; i < period; i++) ring[i] = 0.5 * (ring[i] + ring[(i + 1) % period]);
  const decay = 0.9985 - freq / 400000; // higher notes fade a little faster
  const attack = Math.floor(rate * 0.004);
  const release = Math.floor(rate * 0.4);
  let lp = 0;
  for (let i = 0; i < len; i++) {
    const j = i % period;
    const v = ring[j];
    ring[j] = decay * 0.5 * (v + ring[(j + 1) % period]);
    lp += 0.35 * (v - lp); // mellow low-pass
    let env = 1;
    if (i < attack) env = i / attack; // no click at the start
    else if (i > len - release) env = (len - i) / release;
    out[i] = lp * env;
  }
  return buf;
}

/** Shared output: tone filter -> small room reverb -> gentle limiter. */
function buildOutput(ctx: AudioContext) {
  const input = ctx.createGain();
  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 2600;
  tone.Q.value = 0.5;

  const len = Math.floor(ctx.sampleRate * 1.6);
  const impulse = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = impulse.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  }
  const reverb = ctx.createConvolver();
  reverb.buffer = impulse;
  const wet = ctx.createGain();
  wet.gain.value = 0.22;
  const dry = ctx.createGain();
  dry.gain.value = 0.85;

  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -18;
  limiter.knee.value = 12;
  limiter.ratio.value = 6;
  limiter.attack.value = 0.005;
  limiter.release.value = 0.25;

  input.connect(tone);
  tone.connect(dry).connect(limiter);
  tone.connect(reverb).connect(wet).connect(limiter);
  limiter.connect(ctx.destination);
  return input;
}

/**
 * Six guitar strings stretched across the page. Sweep the pointer across
 * them and each one bends, then twangs back with a damped spring — and,
 * with sound switched on, every pluck plays the next note of a random song.
 */
export function PluckStrings({
  className,
  count = 6,
  height = 120,
}: {
  className?: string;
  count?: number;
  height?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [soundOn, setSoundOn] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [touchPlayed, setTouchPlayed] = useState(false); // hides the phone tooltip
  const song = useRef<{ idx: number; pos: number } | null>(null);
  const soundRef = useRef(false);
  const audio = useRef<{
    ctx: AudioContext;
    buffers: Map<number, AudioBuffer>;
    output: AudioNode;
  } | null>(null);

  const ensureAudio = () => {
    if (!audio.current) {
      const Ctx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return null;
      const ctx = new Ctx();
      audio.current = {
        ctx,
        buffers: new Map(),
        output: buildOutput(ctx),
      };
    }
    if (audio.current.ctx.state === "suspended") audio.current.ctx.resume();
    return audio.current;
  };

  // restore the viewer's choice (audio still only starts after a gesture)
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem(SOUND_KEY) === "on") setSoundOn(true);
    } catch (err: unknown) {
      // storage is blocked in private mode / sandboxed iframes; sound just starts off
      console.warn("PluckStrings: could not read sound preference", err);
    }
  }, []);

  useEffect(() => {
    soundRef.current = soundOn;
    try {
      localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off");
    } catch (err: unknown) {
      console.warn("PluckStrings: could not save sound preference", err);
    }
    if (!soundOn || audio.current?.ctx.state === "running") return;
    // browsers only allow audio after a tap/click: unlock on the first one
    const unlock = () => ensureAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, [soundOn]);

  /** Next note of the current song; picks a new random song when one ends. */
  const nextNote = () => {
    let cur = song.current;
    if (!cur || cur.pos >= SONGS[cur.idx].notes.length) {
      let idx = Math.floor(Math.random() * SONGS.length);
      if (cur && SONGS.length > 1 && idx === cur.idx) idx = (idx + 1) % SONGS.length;
      cur = song.current = { idx, pos: 0 };
      setNowPlaying(SONGS[idx].name);
    }
    return SONGS[cur.idx].notes[cur.pos++];
  };

  const toggleSound = () => {
    const next = !soundOn;
    if (next) ensureAudio(); // created inside the click so browsers allow it
    setSoundOn(next);
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const W = 1000;
    const gap = height / (count + 1);
    const state = Array.from({ length: count }, (_, i) => ({
      y0: gap * (i + 1),
      x: W / 2,
      off: 0, // current displacement
      vel: 0,
      grabbed: false,
      lastPluck: 0,
    }));

    let lastNote = 0;
    const pluck = (i: number, strength: number) => {
      if (!soundRef.current) return;
      const s = state[i];
      const now = performance.now();
      if (now - s.lastPluck < 120 || now - lastNote < 70) return;
      s.lastPluck = lastNote = now;
      const a = ensureAudio();
      if (!a) return;
      const midi = nextNote();
      let buffer = a.buffers.get(midi);
      if (!buffer) {
        buffer = pluckBuffer(a.ctx, midiToFreq(midi));
        a.buffers.set(midi, buffer);
      }
      const src = a.ctx.createBufferSource();
      src.buffer = buffer;
      const gain = a.ctx.createGain();
      gain.gain.value = 0.1 + 0.25 * Math.min(1, strength); // soft, never harsh
      let node: AudioNode = src.connect(gain);
      if (a.ctx.createStereoPanner) {
        // spread the strings gently left to right
        const pan = a.ctx.createStereoPanner();
        pan.pan.value = (i / Math.max(1, count - 1) - 0.5) * 0.6;
        node = node.connect(pan);
      }
      node.connect(a.output);
      src.start();
    };

    let raf = 0;
    let running = false;

    const draw = () => {
      let active = false;
      state.forEach((s, i) => {
        if (!s.grabbed) {
          // damped spring back to rest
          const force = -0.14 * s.off - 0.05 * s.vel;
          s.vel += force;
          s.off += s.vel;
          if (Math.abs(s.off) > 0.05 || Math.abs(s.vel) > 0.05) active = true;
          else s.off = s.vel = 0;
        } else active = true;
        const p = pathRefs.current[i];
        p?.setAttribute(
          "d",
          `M0 ${s.y0} Q${s.x} ${s.y0 + s.off * 2} ${W} ${s.y0}`
        );
      });
      if (active) raf = requestAnimationFrame(draw);
      else running = false;
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    const toLocal = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      return {
        x: ((e.clientX - r.left) / r.width) * W,
        y: ((e.clientY - r.top) / r.height) * height,
      };
    };

    const release = (i: number) => {
      const s = state[i];
      s.grabbed = false; // let it ring
      pluck(i, Math.abs(s.off) / (gap * 0.225));
    };

    // Touch: the browser keeps vertical swipes for scrolling (touch-action: pan-y),
    // so on phones you play by swiping sideways along a string. Every stretch of
    // the swipe plays the next note; a plain tap plays one.
    let touch: { i: number; lastX: number; travel: number; played: boolean } | null = null;
    const STEP = 170; // swipe distance (of 1000) between notes

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || reduce) return;
      const { x, y } = toLocal(e);
      let best = -1;
      state.forEach((s, i) => {
        if (Math.abs(y - s.y0) < gap * 0.9 && (best < 0 || Math.abs(y - s.y0) < Math.abs(y - state[best].y0))) best = i;
      });
      if (best < 0) return;
      touch = { i: best, lastX: x, travel: 0, played: false };
      const s = state[best];
      s.grabbed = true;
      s.x = x;
      s.off = gap * 0.22;
      s.vel = 0;
      kick();
    };

    const twang = (i: number) => {
      const s = state[i];
      s.vel = (s.off > 0 ? -1 : 1) * gap * 0.12;
      pluck(i, 0.65);
    };

    const onTouchMove = (e: PointerEvent) => {
      if (!touch) return;
      const { x } = toLocal(e);
      const s = state[touch.i];
      touch.travel += Math.abs(x - touch.lastX);
      touch.lastX = x;
      s.x = x;
      if (touch.travel >= STEP) {
        touch.travel = 0;
        touch.played = true;
        setTouchPlayed(true);
        twang(touch.i);
        s.off = gap * 0.22 * (Math.random() > 0.5 ? 1 : -1);
      }
      kick();
    };

    const onUp = (e?: PointerEvent) => {
      if (!touch) return;
      const { i, played } = touch;
      touch = null;
      state[i].grabbed = false;
      // a cancelled touch means the swipe turned into a page scroll: stay silent
      if (!played && e?.type !== "pointercancel") {
        setTouchPlayed(true);
        twang(i);
      }
      kick();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return onTouchMove(e);
      if (reduce) return;
      const { x, y } = toLocal(e);
      state.forEach((s, i) => {
        const d = y - s.y0;
        if (Math.abs(d) < gap * 0.9) {
          s.grabbed = true;
          s.x = x;
          s.off = Math.max(-gap * 0.45, Math.min(gap * 0.45, d)) / 2;
          s.vel = 0;
        } else if (s.grabbed) {
          release(i);
        }
      });
      kick();
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return onUp(e);
      state.forEach((s, i) => s.grabbed && release(i));
      kick();
    };

    const listeners: [string, (e: PointerEvent) => void][] = [
      ["pointerdown", onDown],
      ["pointermove", onMove],
      ["pointerup", onUp],
      ["pointercancel", onUp],
      ["pointerleave", onLeave],
    ];
    listeners.forEach(([t, fn]) => svg.addEventListener(t, fn as EventListener));
    return () => {
      cancelAnimationFrame(raf);
      listeners.forEach(([t, fn]) => svg.removeEventListener(t, fn as EventListener));
    };
  }, [count, height]);

  useEffect(
    () => () => {
      audio.current?.ctx.close();
    },
    []
  );

  const gap = height / (count + 1);
  return (
    <div className="relative">
      <div
        className={cn(
          "pointer-events-none absolute -top-14 left-1/2 z-10 hidden -translate-x-1/2 transition-opacity duration-500 [@media(hover:none)_and_(pointer:coarse)]:block",
          touchPlayed && soundOn && "opacity-0"
        )}
        role="note"
      >
        <div className="relative flex w-max max-w-[calc(100vw-2rem)] items-center gap-2 rounded-2xl border-2 text-center border-ink bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-paper shadow-hard">
          <span className="animate-swipe-hint inline-block text-base leading-none" aria-hidden>
            👆
          </span>
          {soundOn ? "Swipe sideways along a string" : "Sound on ↓ then swipe a string sideways"}
          <span className="absolute -bottom-2 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-ink bg-ink" />
        </div>
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 1000 ${height}`}
        preserveAspectRatio="none"
        className={cn("block w-full", className)}
        style={{ height, touchAction: "pan-y" }}
        aria-hidden
      >
        {Array.from({ length: count }).map((_, i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            d={`M0 ${gap * (i + 1)} Q500 ${gap * (i + 1)} 1000 ${gap * (i + 1)}`}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={3 + (count - i) * 0.6}
            vectorEffect="non-scaling-stroke"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div className="mt-3 flex items-center justify-end gap-3">
        {soundOn && nowPlaying && (
          <span
            key={nowPlaying}
            className="animate-fade-in rounded-full border-2 border-ink bg-strings px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink"
            aria-live="polite"
          >
            ♪ {nowPlaying}
          </span>
        )}
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Mute guitar strings" : "Unmute guitar strings"}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 font-mono text-xs uppercase tracking-widest shadow-hard transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none",
            soundOn ? "bg-sun text-ink" : "bg-paper text-ink"
          )}
        >
          {soundOn ? <LuVolume2 className="size-4" /> : <LuVolumeX className="size-4" />}
          {soundOn ? "Sound on" : "Sound off"}
        </button>
      </div>
    </div>
  );
}
