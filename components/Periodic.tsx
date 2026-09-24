"use client";
import { useRef, useState } from "react";
import { stack } from "@/content/site";
import { logos } from "@/content/logos";
import { useInView } from "@/lib/hooks";

type CSS = React.CSSProperties;
const groups: Record<string, string> = { Web: "#DCE8DF", Apps: "#D9D3EC", Data: "#F6E7A6", AI: "#FFD9C7", Infra: "#C9D0F5" };

function Mark({ id }: { id: string }) {
  if (id === "ai")
    return (
      <svg viewBox="0 0 24 24" className="size-full" aria-hidden>
        <defs><linearGradient id="ai-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF4F1A" /><stop offset="1" stopColor="#7A3BD1" /></linearGradient></defs>
        <path d="M11 1.5c.6 4.6 3.3 7.5 8 8.2-4.7.7-7.4 3.6-8 8.3-.6-4.7-3.3-7.6-8-8.3 4.7-.7 7.4-3.6 8-8.2Z" fill="url(#ai-g)" />
        <path d="M19.5 14c.3 2.2 1.5 3.4 3.5 3.8-2 .3-3.2 1.6-3.5 3.8-.3-2.2-1.5-3.5-3.5-3.8 2-.4 3.2-1.6 3.5-3.8Z" fill="url(#ai-g)" />
      </svg>
    );
  const l = logos[id];
  return <svg viewBox="0 0 24 24" className="size-full" aria-hidden><path d={l.path} fill={l.hex} /></svg>;
}

export default function Periodic() {
  const ref = useRef<HTMLUListElement>(null);
  const seen = useInView(ref);
  const [flipped, setFlipped] = useState(-1);

  return (
    <section data-bg="#FAF7F0" className="graph px-5 py-24 md:px-10 md:py-36" aria-labelledby="stack-title">
      <p className="eyebrow mb-8">Toolbox</p>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="stack-title" className="display text-[clamp(2.8rem,8vw,8rem)] font-extrabold">Our <span className="serif font-normal">elements</span>.</h2>
        <ul className="mono flex flex-wrap gap-3 text-xs">
          {Object.entries(groups).map(([g, c]) => <li key={g} className="flex items-center gap-1.5"><i className="size-3 rounded-sm shadow-[0_0_0_1px_var(--color-ink)]" style={{ background: c }} />{g}</li>)}
        </ul>
      </div>
      <ul ref={ref} className={`mt-14 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7 ${seen ? "react" : ""}`}>
        {stack.map((el, i) => (
          <li key={el.sym}>
            <button
              className="tile block aspect-square w-full text-left"
              aria-pressed={flipped === i}
              onClick={() => setFlipped(flipped === i ? -1 : i)}
              style={{ "--i": i, "--r": `${(i % 5) * 7 - 14}deg` } as CSS}
              data-cursor="Flip"
            >
              <span className="tile-in relative block size-full">
                <span className="tile-face absolute inset-0 flex flex-col justify-between rounded-lg bg-paper p-2.5 shadow-[0_0_0_1.5px_var(--color-ink)] md:p-3">
                  <span className="mono flex items-center justify-between text-[10px] md:text-xs">{String(i + 1).padStart(2, "0")}<i className="size-2.5 rounded-full shadow-[0_0_0_1px_var(--color-ink)]" style={{ background: groups[el.group] }} /></span>
                  <span className="mx-auto block w-[42%]"><Mark id={el.logo} /></span>
                  <span className="flex items-baseline justify-between gap-2"><span className="truncate text-[11px] font-semibold md:text-sm">{el.name}</span><span className="mono text-[10px] opacity-50">{el.sym}</span></span>
                </span>
                <span className="tile-face tile-back absolute inset-0 flex flex-col justify-between rounded-lg bg-ink p-2.5 text-bone md:p-3">
                  <span className="mono text-[10px] text-signal">{el.sym} · {el.group}</span>
                  <span className="text-xs leading-snug md:text-sm">{el.use}</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
