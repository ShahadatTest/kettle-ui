import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Labelled input in the ink-outline house style. */
export function Field({
  label,
  hint,
  error,
  className,
  id: idProp,
  ...props
}: { label: string; hint?: string; error?: string } & ComponentProps<"input">) {
  // useId must run unconditionally; prefer a caller-supplied id so the label
  // and hint stay wired when props spread would otherwise overwrite input id (#1).
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const note = error ?? hint;
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-[0.2em]">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={note ? `${id}-note` : undefined}
        className="h-12 w-full min-w-0 rounded-2xl border-2 border-ink bg-card px-4 text-base shadow-hard transition-[box-shadow,transform] outline-none placeholder:text-muted-foreground focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-hard-lg aria-invalid:border-destructive aria-invalid:shadow-[4px_4px_0_0_var(--destructive)] disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
      {note && (
        <p id={`${id}-note`} className={cn("text-sm", error ? "text-destructive" : "text-muted-foreground")}>
          {note}
        </p>
      )}
    </div>
  );
}
