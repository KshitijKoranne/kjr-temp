"use client";
import { useRef, useState } from "react";
import { useScramble, useScrollProgress } from "@/lib/hooks";
import Btn from "./Btn";

const rows = [
  ["10:42", "Requirements", "12 of 12 traced to tests"],
  ["10:44", "Automated tests", "184 of 184 passed"],
  ["11:02", "Accessibility", "WCAG AA · 0 issues"],
  ["11:30", "Performance", "Lighthouse 96 · LCP 1.4 s"],
  ["11:58", "Backup restore", "Restored in 3 min"],
  ["12:05", "Release v1.2", "Signed off · notes sent"],
];
const labels = ["Written requirements", "Automated tests", "Code review", "Accessibility checks", "Backups that restore", "A change log for every release"];

// Every row is always in the DOM (height reserved), so revealing one never shifts the page.
function Row({ r, on, next }: { r: string[]; on: boolean; next: boolean }) {
  const text = useScramble(r.join("  |  "), on, 380);
  return (
    <li className="relative flex items-center gap-4 border-b border-white/20 py-2.5">
      <span className="flex-1 whitespace-pre" style={{ visibility: on ? "visible" : "hidden" }}>{text}</span>
      <span className={`shrink-0 rounded border-2 border-signal bg-signal px-2 py-0.5 font-bold text-ink ${on ? "stamp" : "invisible"}`}>✓ passed</span>
      {next && <span className="absolute inset-y-0 left-0 flex items-center opacity-70">running next check<span className="caret" /></span>}
    </li>
  );
}

export default function Quality() {
  const ref = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  useScrollProgress(ref, (p) => setCount(Math.min(rows.length, Math.max(0, Math.floor((p - 0.2) * 14)))));

  return (
    <section ref={ref} data-bg="#2430D6" className="on-dark bg-blueprint blueprint-grid relative overflow-hidden px-5 py-28 text-white md:px-10 md:py-40" aria-labelledby="quality-title">
      <p className="eyebrow mb-8">Quality</p>
      <h2 id="quality-title" className="display max-w-[18ch] text-[clamp(2.4rem,6.6vw,6.8rem)] font-extrabold">
        Built by a developer. <span className="serif font-normal">Checked by</span> a quality professional.
      </h2>

      <div className="relative mt-16">
        <div className="mono mb-2 flex justify-between text-[11px] opacity-80"><span>RELEASE CHECKS · v1.2</span><span>{count}/{rows.length} checks</span></div>
        <div className="overflow-x-auto rounded-xl border border-white/40 bg-[#1b25b0] p-4 md:p-6">
          <ol className="mono min-w-[560px] text-[12px] md:text-sm" aria-label="Example release checklist">
            {rows.map((r, i) => <Row key={r[1]} r={r} on={i < count} next={i === count} />)}
          </ol>
        </div>
        <ul className="mt-8 flex flex-wrap gap-3">
          {labels.map((l) => (
            <li key={l} className="mono rounded-full border border-white/60 px-4 py-2 text-xs md:text-sm">{l}</li>
          ))}
        </ul>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-[58ch] space-y-4 text-lg leading-relaxed">
          <p>Before KJR Labs, Kshitij spent 14+ years in pharmaceutical quality assurance, where &ldquo;it seems to work&rdquo; is never enough. That habit comes into every project: clear requirements, real tests and a record of every change. Your app does not need to pass an audit. It just gets built as if it might.</p>
          <p className="text-base opacity-85">
            Work in healthcare, finance or another regulated field?{" "}
            <a href="#contact" className="u font-medium" onClick={() => dispatchEvent(new CustomEvent("prefill", { detail: { type: "Regulated / Compliant Software" } }))}>We build compliance-ready software too ↗</a>
          </p>
        </div>
        <Btn href="#contact" variant="light">Start a project</Btn>
      </div>
    </section>
  );
}
