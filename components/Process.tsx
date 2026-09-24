"use client";
import { useRef } from "react";
import { process } from "@/content/site";
import { useScrollProgress } from "@/lib/hooks";

type CSS = React.CSSProperties;
const n = process.length;
const visuals = ["hi▍", "30:00", "[ ▭ ▭ ]", "v0.1 → v0.4", "$ ship ✓"];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, undefined, true);

  return (
    <section ref={ref} data-bg="#E4E7F6" className="hscroll relative" style={{ "--n": n + 1 } as CSS} aria-labelledby="process-title">
      <div className="hscroll-sticky sticky top-0 h-svh overflow-hidden">
        <ol className="hscroll-track flex h-full" style={{ width: `${n * 80 + 50}vw` }}>
          <li className="flex h-full w-[50vw] shrink-0 flex-col justify-center px-5 py-20 md:px-10">
            <p className="eyebrow mb-6">Process</p>
            <h2 id="process-title" className="display text-[clamp(2.6rem,6vw,6rem)] font-extrabold">What working with us <span className="serif font-normal">looks</span> like.</h2>
          </li>
          {process.map((s, i) => (
            <li key={s.title} className="relative flex h-full w-[80vw] shrink-0 flex-col justify-end gap-6 px-5 py-20 md:px-12" style={{ background: s.color }}>
              <span aria-hidden className="display pointer-events-none absolute -top-[.08em] left-3 text-[clamp(8rem,34vw,34rem)] font-extrabold leading-none opacity-90 max-md:sticky max-md:top-16 max-md:text-8xl" style={{ transform: `translateX(calc((var(--p, 0) - ${(i + 1) / n}) * -18vw))` }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="mono relative w-fit rounded-md bg-ink px-3 py-1.5 text-lg text-bone">{visuals[i]}</span>
              <h3 className="display relative text-[clamp(2.2rem,5.4vw,5.4rem)] font-extrabold">{s.title}</h3>
              <p className="relative max-w-[40ch] text-lg leading-relaxed md:text-xl">{s.body}</p>
            </li>
          ))}
        </ol>
        <div aria-hidden className="absolute inset-x-5 bottom-6 h-[3px] bg-ink/15 max-md:hidden md:inset-x-10">
          <i className="block h-full origin-left bg-signal" style={{ transform: "scaleX(var(--p, 0))" }} />
          <i className="caret absolute -top-2.5 !h-6 !w-2" style={{ left: "calc(var(--p, 0) * 100%)" }} />
        </div>
      </div>
    </section>
  );
}
