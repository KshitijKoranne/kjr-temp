"use client";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const jump = () => setPos({ x: 8 + Math.random() * 84, y: 12 + Math.random() * 76 });
  useEffect(() => { const id = setInterval(jump, 1100); return () => clearInterval(id); }, []);

  return (
    <section data-bg="#121212" className="on-dark grid min-h-svh gap-10 bg-ink px-5 pb-16 pt-32 text-bone md:px-10">
      <div>
        <p className="mono text-xs text-signal">404</p>
        <h1 className="display mt-4 text-[clamp(3rem,10vw,9rem)] font-extrabold">Page <span className="serif font-normal">not found</span>.</h1>
        <p className="mt-4 max-w-[46ch] text-lg">This page does not exist or has moved. While you are here: catch the caret.</p>
        <a href="/" className="btn btn-light mt-8"><span className="btn-l"><span>Back to home</span><span aria-hidden>Back to home</span></span></a>
      </div>
      <div className="relative h-[46svh] overflow-hidden rounded-2xl border border-bone/25">
        <p className="mono absolute left-4 top-3 text-sm" aria-live="polite">caught: {score}</p>
        <button
          aria-label="Catch the caret"
          onClick={() => { setScore((s) => s + 1); jump(); }}
          className="absolute size-12 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-[var(--t-base)] ease-[var(--e-snappy)]"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          data-cursor="Catch"
        >
          <span className="caret !h-10 !w-3" />
        </button>
      </div>
    </section>
  );
}
