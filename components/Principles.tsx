"use client";
import { useRef, useState } from "react";
import { principles } from "@/content/site";
import { useScrollProgress } from "@/lib/hooks";

type CSS = React.CSSProperties;

function Visual({ kind }: { kind: string }) {
  const once = (name: string, delay = 0): CSS => ({ animation: `${name} 900ms var(--e-snappy) ${delay}ms both` });
  if (kind === "check")
    return (
      <ul className="space-y-2 text-base">
        {["Scope in plain words", "Milestone 1 · week 2", "Demo every Friday"].map((t, i) => (
          <li key={t} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded bg-ink text-bone" style={once("pop", 200 + i * 220)}>✓</span>{t}</li>
        ))}
      </ul>
    );
  if (kind === "shrink")
    return (
      <div className="mono w-64 space-y-2 text-sm">
        <p>bundle.js</p>
        <div className="h-4 rounded bg-paper"><i className="block h-full origin-left rounded bg-ink" style={{ animation: "shrinkbar 1.2s var(--e-snappy) both" }} /></div>
        <p className="flex justify-between"><s className="opacity-60">480 KB</s><b>92 KB</b></p>
        <style>{`@keyframes shrinkbar{from{transform:scaleX(1)}to{transform:scaleX(.19)}}`}</style>
      </div>
    );
  if (kind === "key") return null;
  return (
    <div className="mono grid w-64 grid-cols-8 gap-1.5">
      {Array.from({ length: 32 }, (_, i) => <i key={i} className="size-6 rounded" style={{ background: "#121212", animation: `pass 300ms linear ${i * 30}ms both` }} />)}
      <p className="col-span-8 mt-2 text-sm">48/48 tests passed</p>
      <style>{`@keyframes pass{from{background:#FF4F1A}to{background:#121212}}`}</style>
    </div>
  );
}

const Bug = ({ size = 34 }: { size?: number }) => (
  <svg width={size} height={size * 0.82} viewBox="0 0 34 28" aria-hidden>
    <ellipse cx="17" cy="16" rx="9" ry="10" fill="#121212" />
    <path d="M8 10 2 6M8 16H1M8 22l-6 4M26 10l6-4M26 16h7M26 22l6 4M13 6l-3-5M21 6l3-5" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// A swarm crosses the screen and carries the old word off. Fixed pseudo-random layout so SSR and client agree.
const SWARM = Array.from({ length: 16 }, (_, k) => ({ y: (k * 37) % 88 + 6, d: (k * 53) % 340, t: 900 + ((k * 71) % 500), s: 22 + ((k * 13) % 18) }));
function Swarm({ dir }: { dir: 1 | -1 }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {SWARM.map((b, k) => (
        <span key={k} className="absolute left-0" style={{ top: `${b.y}%`, animation: `scurry ${b.t}ms linear ${b.d}ms both`, animationDirection: dir > 0 ? "normal" : "reverse" }}>
          <span className="block" style={{ rotate: `${dir > 0 ? 90 : -90}deg` }}><span className="block" style={{ animation: "wiggle 140ms linear infinite alternate" }}><Bug size={b.s} /></span></span>
        </span>
      ))}
    </div>
  );
}

export default function Principles() {
  const ref = useRef<HTMLElement>(null);
  const [st, setSt] = useState({ i: 0, prev: -1, dir: 1 as 1 | -1, n: 0 });
  useScrollProgress(ref, (p) => {
    const i = Math.min(principles.length - 1, Math.floor(p * principles.length));
    setSt((s) => (s.i === i ? s : { i, prev: s.i, dir: i > s.i ? 1 : -1, n: s.n + 1 }));
  }, true);
  const cur = principles[st.i];
  const prev = st.prev >= 0 ? principles[st.prev] : null;
  const move = (name: string, delay = 0, ms = 650): CSS => ({ animation: `${name} ${ms}ms var(--e-snappy) ${delay}ms both`, ["--dx" as string]: `${st.dir * 34}vw` });

  return (
    <section ref={ref} data-bg={cur.color} className="pin-off relative h-[400vh]" aria-labelledby="principles-title">
      <div className="pin-sticky sticky top-0 flex h-svh flex-col overflow-hidden px-5 pb-28 pt-24 md:px-10">
        <div className="flex items-baseline justify-between gap-6">
          <h2 id="principles-title" className="display text-[clamp(1.8rem,4vw,3.4rem)] font-extrabold">The agency, <span className="serif font-normal">debugged</span>.</h2>
          <p className="mono text-sm motion-reduce:hidden" aria-hidden>{String(st.i + 1).padStart(2, "0")} / 0{principles.length}</p>
        </div>

        {st.n > 0 && <Swarm key={st.n} dir={st.dir} />}

        <div aria-hidden className="flex flex-1 flex-col justify-center motion-reduce:hidden">
          <div className="relative">
            {prev && <p key={`out-${st.n}`} className="display absolute left-0 top-0 text-[clamp(4.2rem,19vw,20rem)] font-extrabold leading-[.82]" style={{ ...move("word-out", 120, 700), fontVariationSettings: '"wght" 800, "wdth" 100' }}>{prev.word}</p>}
            <p key={cur.word} className="display relative inline-block text-[clamp(4.2rem,19vw,20rem)] font-extrabold leading-[.82]" style={{ ...move(st.n ? "word-in-x" : "word-in", st.n ? 280 : 0, 700), fontVariationSettings: '"wght" 800, "wdth" 100' }}>
              {cur.word}
              <span className="absolute -top-[4%] right-[-6%]" style={{ animation: `squash 900ms var(--e-snappy) ${st.n ? 1050 : 350}ms both`, transformOrigin: "50% 100%" }}><Bug /></span>
              <span className="caret absolute -top-[4%] right-[-3%] !h-[.3em] !w-[.05em]" style={{ animation: `caret-drop 500ms var(--e-snappy) ${st.n ? 850 : 150}ms both` }} aria-hidden />
            </p>
          </div>
          <div key={`b-${cur.word}`} className="mt-8 grid items-start gap-8 md:mt-10 md:grid-cols-[minmax(0,46ch)_1fr] md:gap-16" style={move("fade-up", st.n ? 450 : 100, 600)}>
            <p className="text-lg leading-relaxed md:text-xl">{cur.body}</p>
            <div className="md:justify-self-start"><Visual kind={cur.visual} /></div>
          </div>
        </div>
        <ol className="sr-only motion-reduce:not-sr-only motion-reduce:mt-10 motion-reduce:space-y-8">
          {principles.map((p) => <li key={p.word}><b className="display block text-6xl font-extrabold">{p.word}</b> {p.body}</li>)}
        </ol>
      </div>
    </section>
  );
}
