"use client";
import { useEffect, useRef, useState } from "react";
import { reduced, useInView, useTyped } from "@/lib/hooks";
import Btn from "./Btn";

const question = "Which clients still owe us money this month?";
const answer = "Three invoices are overdue: Bloom Café (12 days), Sharma Interiors (5 days) and Kiran Tutorials (3 days). Together that is ₹1,42,000. Want a polite reminder drafted for each one?".split(" ");
const sources = ["Invoices · Sept 2026", "Payments sheet", "Client notes"];
const labels = ["RAG", "Workflow automation", "Data extraction", "Internal assistants", "Chat on your own data"];

export default function AI() {
  const panel = useRef<HTMLDivElement>(null);
  const seen = useInView(panel);
  const [q, qDone] = useTyped(question, seen, 32, 300);
  const [words, setWords] = useState(0);

  useEffect(() => {
    if (!qDone) return;
    if (reduced()) return setWords(answer.length);
    const id = setInterval(() => setWords((w) => (w >= answer.length ? (clearInterval(id), w) : w + 1)), 55);
    return () => clearInterval(id);
  }, [qDone]);
  const done = words >= answer.length;

  return (
    <section data-bg="#F6E7A6" className="relative overflow-hidden bg-butter px-5 py-28 md:px-10 md:py-40" aria-labelledby="ai-title">
      <p className="eyebrow mb-8">AI</p>
      <h2 id="ai-title" className="display text-[clamp(2.8rem,8vw,8rem)] font-extrabold">
        Put AI to work.<br /><span className="serif font-normal">Not</span> on display.
      </h2>

      <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div ref={panel} className="relative">
          {/* Source documents fan out behind the panel once the answer lands. */}
          {sources.map((s, i) => (
            <div key={s} aria-hidden className="absolute inset-x-8 top-6 h-[85%] rounded-2xl bg-paper shadow-[0_0_0_1.5px_var(--color-ink)] transition-transform duration-[var(--t-slow)] ease-[var(--e-spring)]"
              style={{ transform: done ? `translate(${(i - 1) * 70}px, ${-30 - i * 8}px) rotate(${(i - 1) * 7}deg)` : "none", transitionDelay: `${i * 90}ms` }}>
              <p className="mono p-4 text-[10px]">{s}</p>
            </div>
          ))}
          <p className="sr-only">Example: “{question}” Answer: {answer.join(" ")} Sources: {sources.join(", ")}.</p>
          <div aria-hidden className="relative space-y-5 rounded-2xl bg-ink p-5 text-bone md:p-8">
            <p className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-sm bg-bone px-4 py-3 text-ink">
              {q}{!qDone && <span className="caret" />}
            </p>
            <p className="min-h-[7.5em] max-w-[95%] text-base leading-relaxed md:text-lg">
              {answer.slice(0, words).join(" ")}
              {qDone && !done && <span className="caret" />}
            </p>
            <div className="flex flex-wrap gap-2">
              {sources.map((s, i) => (
                <span key={s} className="mono rounded-md bg-signal px-2 py-1 text-[11px] text-ink transition-[opacity,transform] duration-[var(--t-base)] ease-[var(--e-spring)]"
                  style={{ opacity: done ? 1 : 0, transform: done ? "none" : "scale(.6)", transitionDelay: `${i * 120}ms` }}>
                  [{i + 1}] {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="max-w-[44ch] text-lg leading-relaxed md:text-xl">
            We build AI tools that answer from your own documents and numbers, and take the boring steps off your plate. Clear limits, visible sources, no magic claims.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {labels.map((l) => <li key={l} className="mono rounded-full bg-paper px-3 py-1.5 text-xs shadow-[0_0_0_1.5px_var(--color-ink)]">{l}</li>)}
          </ul>
          <div className="mt-10"><Btn href="#contact" onClick={() => dispatchEvent(new CustomEvent("prefill", { detail: { type: "AI Tool" } }))}>Plan an AI build</Btn></div>
        </div>
      </div>
    </section>
  );
}
