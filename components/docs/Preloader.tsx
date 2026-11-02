import { ToyTrain } from "@/components/illustrations/ToyTrain";

// runs before first paint so a returning visitor in the same tab never sees a flash of the loader
const SKIP = `try{sessionStorage.getItem("kettle-preloaded")?document.documentElement.dataset.preloaded="":sessionStorage.setItem("kettle-preloaded","1")}catch(e){document.documentElement.dataset.preloaded=""}`;

/** Train preloader. Pure CSS (globals.css), so it plays before hydration and removes itself. */
export function Preloader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SKIP }} />
      <div className="preloader" aria-hidden>
        <div className="flex w-[min(20rem,78vw)] flex-col items-center">
          <div className="preloader-train">
            <ToyTrain className="h-16 md:h-20" />
          </div>
          <div className="preloader-track" />
          <p className="mt-8 font-display text-4xl font-extrabold uppercase leading-none tracking-tight">
            Kettle <span className="text-tunes">UI</span>
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">by Apurva</p>
          <div className="mt-6 h-2.5 w-full overflow-hidden rounded-full border-2 border-ink bg-card">
            <div className="preloader-bar h-full bg-tea" />
          </div>
        </div>
      </div>
    </>
  );
}
