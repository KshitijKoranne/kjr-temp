"use client";
import { useState } from "react";
import { estimator as E } from "@/content/site";

type Opt = { id: string; label: string; weeks: number[] };

// Sums the week ranges of every chosen option. Pure, so check.mjs can test it.
export function estimate(kind: string, features: string[], design: string) {
  const picked: Opt[] = [E.kinds.find((k) => k.id === kind), E.design.find((d) => d.id === design), ...E.features.filter((f) => features.includes(f.id))].filter(Boolean) as Opt[];
  const min = picked.reduce((s, o) => s + o.weeks[0], 0);
  const max = picked.reduce((s, o) => s + o.weeks[1], 0);
  return { min, max, first: Math.max(2, Math.round(min * 0.6)) };
}

function Odo({ n }: { n: number }) {
  return (
    <span className="odo" aria-hidden>
      {String(n).padStart(2, "0").split("").map((d, i) => (
        <span key={i} className="odo-col" style={{ transform: `translateY(-${+d}em)` }}>
          {Array.from({ length: 10 }, (_, k) => <span key={k}>{k}</span>)}
        </span>
      ))}
    </span>
  );
}

function Chips({ name, opts, value, onChange, multi }: { name: string; opts: Opt[]; value: string | string[]; onChange: (v: string) => void; multi?: boolean }) {
  return (
    <fieldset>
      <legend className="mono mb-3 text-xs">{name}</legend>
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => {
          const on = multi ? (value as string[]).includes(o.id) : value === o.id;
          return (
            <label key={o.id} className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium shadow-[0_0_0_1.5px_var(--color-ink)] transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-signal ${on ? "bg-ink text-bone" : "bg-paper hover:bg-bone"}`}>
              <input type={multi ? "checkbox" : "radio"} name={name} className="sr-only" checked={on} onChange={() => onChange(o.id)} />
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function Estimator() {
  const [kind, setKind] = useState("web");
  const [features, setFeatures] = useState<string[]>(["login", "admin"]);
  const [design, setDesign] = useState("need");
  const { min, max, first } = estimate(kind, features, design);

  const raw = E.kinds.find((k) => k.id === kind)!.label.replace(" / ", " or ");
  const kindLabel = /^[A-Z]{2}/.test(raw) ? raw : raw[0].toLowerCase() + raw.slice(1); // keeps "AI"
  const feats = E.features.filter((f) => features.includes(f.id)).map((f) => f.label.toLowerCase());
  const list = feats.length > 1 ? `${feats.slice(0, -1).join(", ")} and ${feats.at(-1)}` : feats[0];
  const article = /^[aeiouAEIOU]/.test(kindLabel) ? "An" : "A";
  const summary = `${article} ${kindLabel}${list ? ` with ${list}` : ""}${design === "need" ? ", design included" : ""}. Typical first usable version in ${first} weeks.`;

  const send = () => {
    dispatchEvent(new CustomEvent("prefill", { detail: { scope: `${summary} Estimate: ${min}–${max} weeks.` } }));
    document.getElementById("contact")?.scrollIntoView();
  };

  return (
    <section id="estimate" data-bg="#DCE8DF" className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="est-title">
      <p className="eyebrow mb-8">Scope estimator</p>
      <h2 id="est-title" className="display max-w-[14ch] text-[clamp(2.6rem,7vw,7rem)] font-extrabold">Let&apos;s talk about the <span className="serif font-normal">boring</span> stuff.</h2>
      <p className="mt-4 text-lg">Timelines, ownership and how we work.</p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-8">
          <Chips name="What are you building?" opts={E.kinds} value={kind} onChange={setKind} />
          <Chips name="Features" opts={E.features} value={features} multi onChange={(id) => setFeatures((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))} />
          <Chips name="Design" opts={E.design} value={design} onChange={setDesign} />
        </div>
        <div className="flex flex-col justify-between gap-8 rounded-2xl bg-ink p-6 text-bone md:p-8 on-dark">
          <div>
            <p className="mono text-xs uppercase tracking-[.12em] opacity-70">Estimate</p>
            <p className="display mt-4 flex items-baseline gap-3 text-[clamp(4rem,9vw,8rem)] font-extrabold leading-none">
              <span aria-hidden>≈</span><Odo n={min} /><span aria-hidden>–</span><Odo n={max} />
              <span className="ml-1 font-sans text-2xl font-semibold tracking-normal">weeks</span>
            </p>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed" aria-live="polite">
              <span className="sr-only">About {min} to {max} weeks. </span>{summary}
            </p>
          </div>
          <button onClick={send} className="btn btn-light self-start" data-magnetic>
            <span className="btn-l"><span>Send this scope to KJR Labs</span><span aria-hidden>Send this scope to KJR Labs</span></span>
            <span className="btn-a" aria-hidden>↗</span>
          </button>
        </div>
      </div>
      <ul className="mt-14 grid gap-4 border-t-[1.5px] border-ink pt-8 text-lg md:grid-cols-3">
        {["You own 100% of the code and accounts.", "Fixed milestones, weekly demos.", "No retainers you do not need."].map((t) => <li key={t} className="flex gap-3"><span className="text-signal-ink">▍</span>{t}</li>)}
      </ul>
    </section>
  );
}
