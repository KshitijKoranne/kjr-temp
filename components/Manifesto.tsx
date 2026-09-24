"use client";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/content/site";
import { reduced, useInView, useScrollProgress } from "@/lib/hooks";

type CSS = React.CSSProperties;

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced()) return setN(to);
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 1200);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// Each word drifts a little at its own speed. Kept in em so words never overlap on small screens.
const line1 = ["Most", "agencies", "sell"].map((w, i) => ({ w, s: [-40, 30, -20][i] }));
const line3 = ["We", "sell"].map((w, i) => ({ w, s: [50, -30][i] }));
const W = ({ w, s }: { w: string; s: number }) => (
  <span className="drift inline-block" style={{ transform: `translateY(calc((var(--p, .5) - .5) * ${s / 100}em))` }}>{w}&nbsp;</span>
);

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
// Desk clutter of a software studio. The extra pieces sit in the empty right-hand space and hide on small screens.
const objects = [
  { el: <span className="mono text-4xl">{"{ }"}</span>, x: "84%", y: "8%", s: 160 },
  { el: <span className="mono text-3xl font-semibold">{"</>"}</span>, x: "66%", y: "22%", s: -110, wide: true },
  { el: <svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" {...stroke} /><circle cx="22" cy="22" r="4" fill="#FF4F1A" /></svg>, x: "76%", y: "40%", s: 90, wide: true },
  { el: <svg width="40" height="40" viewBox="0 0 40 40"><path d="M20 3v34M3 20h34M8 8l24 24M32 8 8 32" stroke="#FF4F1A" strokeWidth="3" strokeLinecap="round" /></svg>, x: "93%", y: "30%", s: -140, wide: true },
  { el: <svg width="34" height="44" viewBox="0 0 34 44"><path d="M4 3l24 19-11 2 7 14-5 2-7-14-8 8Z" {...stroke} /></svg>, x: "87%", y: "45%", s: 120, wide: true },
  { el: <span className="mono grid size-12 place-items-center rounded-lg text-2xl shadow-[inset_0_0_0_2px_currentColor,inset_0_-5px_0_currentColor]">⌘</span>, x: "84%", y: "58%", s: -80, wide: true },
  { el: <svg width="90" height="24" viewBox="0 0 90 24"><path d="M3 12c8-10 14-10 21 0s14 10 21 0 14-10 21 0 14 10 21 0" {...stroke} /></svg>, x: "58%", y: "10%", s: 70, wide: true },
  { el: <svg width="26" height="44" viewBox="0 0 26 44"><rect x="2" y="2" width="22" height="40" rx="6" {...stroke} /><path d="M10 7h6" {...stroke} /></svg>, x: "95%", y: "66%", s: 100, wide: true },
  { el: <span className="mono text-3xl">+</span>, x: "62%", y: "48%", s: -60, wide: true },
  { el: <svg width="36" height="36" viewBox="0 0 36 36"><path d="M6 19l8 8L30 9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>, x: "71%", y: "50%", s: -90 },
  { el: <svg width="30" height="40" viewBox="0 0 30 40"><path d="M11 3v13L3 35h24L19 16V3M8 3h14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg>, x: "4%", y: "62%", s: 140 },
];

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref);

  return (
    <section ref={ref} data-bg="#FAF7F0" className="relative overflow-hidden px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-40" aria-labelledby="manifesto-title">
      <p className="eyebrow mb-10">Introduction</p>
      {objects.map((o, i) => (
        <span key={i} aria-hidden className={`absolute text-ink/70 ${o.wide ? "max-lg:hidden" : ""}`} style={{ left: o.x, top: o.y, transform: `translateY(calc((var(--p, .5) - .5) * ${o.s}px * 2)) rotate(calc(var(--p, 0) * ${o.s / 3}deg))` }}>{o.el}</span>
      ))}
      <h2 id="manifesto-title" className="display relative max-w-[16ch] text-[clamp(2.6rem,8.4vw,8.5rem)] font-extrabold">
        <span className="sr-only">Most agencies sell hours. We sell working software.</span>
        <span aria-hidden>
          {line1.map((x) => <W key={x.w} {...x} />)}
          <span className="relative inline-block">
            hours.
            <svg className="absolute -inset-x-[12%] -inset-y-[18%] h-[136%] w-[124%]" viewBox="0 0 200 100" preserveAspectRatio="none" style={{ "--from": 0.15 } as CSS}>
              <path className="draw" pathLength={1} d="M20 55 C 20 15, 180 10, 185 50 C 190 90, 30 95, 15 60 C 8 40, 60 20, 110 22" fill="none" stroke="#FF4F1A" strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </span>
          <br />
          {line3.map((x) => <W key={x.w} {...x} />)}
          <span className="relative inline-block">
            <span className="serif font-normal">working software</span>.
            <svg className="absolute -bottom-[6%] left-0 h-[20%] w-[92%]" viewBox="0 0 300 20" preserveAspectRatio="none" style={{ "--from": 0.3 } as CSS}>
              <path className="draw" pathLength={1} d="M4 12 C 60 4, 120 18, 180 9 S 270 6, 296 12" fill="none" stroke="#FF4F1A" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </span>
        </span>
      </h2>
      <p className="relative mt-12 max-w-[52ch] text-lg leading-relaxed md:ml-[30%] md:text-xl">
        KJR Labs is a small software and design studio run by people who obsess over design and development. We scope honestly, build in short visible steps, test properly and hand over code you fully own. No bloat, no lock-in, no 60-slide proposals.<span className="caret" aria-hidden />
      </p>
      <dl className="relative mt-20 grid gap-8 border-t-[1.5px] border-ink pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col">
            <dt className="mt-2 max-w-[26ch] text-sm">{s.label}</dt>
            <dd className="display order-first text-6xl font-extrabold md:text-7xl"><Count to={s.value} suffix={s.suffix} /></dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
