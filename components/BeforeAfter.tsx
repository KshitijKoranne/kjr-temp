"use client";
import { useState } from "react";

type CSS = React.CSSProperties;

const Sheet = () => (
  <div className="mono size-full bg-[#fff] p-3 text-[10px] md:text-xs">
    <div className="mb-2 flex gap-2 opacity-60"><span>orders_FINAL_v7 (2).xlsx</span><span className="ml-auto">⚠ 3 people editing</span></div>
    <div className="grid grid-cols-[1.4fr_1fr_1fr_1.6fr] gap-px bg-ink/25">
      {["Client", "Due", "Owner", "Status", "Bloom Café", "12/09??", "RK / SM", "PAID? (see email)", "Sharma Interiors", "#REF!", "—", "quote v3 missing!!", "Kiran Tutorials", "03/10", "SM", "sent? check w/ Meera", "Patel Motors", "", "RK", "DRAFT DRAFT", "Zeta Studio", "22/09", "?", "on hold"].map((c, i) => (
        <span key={i} className={`truncate px-1.5 py-2 ${i < 4 ? "bg-ink/10 font-bold" : [5, 10, 19].includes(i) ? "bg-[#ffb3a1]" : [7, 13].includes(i) ? "bg-[#fff08a]" : i === 22 ? "bg-[#c9f2c4] line-through" : "bg-[#fff]"}`}>{c}</span>
      ))}
    </div>
    <p className="serif mt-4 -rotate-2 text-lg text-signal-ink">why are there two “Sharma” rows??</p>
  </div>
);

const pill = (t: string, c: string) => <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: c }}>{t}</span>;

const Clean = () => (
  <div className="grid size-full grid-cols-[36%_1fr] bg-paper text-xs md:text-sm">
    <div className="space-y-1 border-r border-ink/10 p-3 md:p-4">
      <p className="display mb-3 flex items-center justify-between font-bold">Orders <span className="mono text-[10px] font-normal opacity-60">5 open</span></p>
      {[["Bloom Café", "Paid", "#DCE8DF"], ["Sharma Interiors", "Packing", "#F6E7A6"], ["Kiran Tutorials", "Quote sent", "#D9D3EC"], ["Patel Motors", "Due Fri", "#FFD9C7"], ["Zeta Studio", "Delivered", "#DCE8DF"]].map(([v, st, c], i) => (
        <p key={v} className={`flex items-center justify-between gap-2 rounded-lg px-2 py-2 ${i === 1 ? "bg-ink text-bone" : ""}`}><span className="truncate">{v}</span>{i === 1 ? pill(st, "#FF4F1A") : pill(st, c)}</p>
      ))}
    </div>
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-start justify-between">
        <div><p className="mono text-[10px] opacity-60">ORDER #418</p><p className="display text-lg font-bold md:text-2xl">Sharma Interiors</p></div>
        <p className="text-right"><span className="mono block text-[10px] opacity-60">TOTAL</span><b className="display text-lg md:text-2xl">₹1,86,400</b></p>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {["Quote", "Paid", "Packing", "Delivered"].map((t, i) => (
          <div key={t}><i className={`block h-1.5 rounded-full ${i < 2 ? "bg-ink" : i === 2 ? "bg-signal" : "bg-ink/15"}`} /><p className={`mt-1.5 text-[10px] md:text-xs ${i === 2 ? "font-bold" : "opacity-70"}`}>{i < 2 ? "✓ " : ""}{t}</p></div>
        ))}
      </div>
      <div className="divide-y divide-ink/10 rounded-lg bg-bone px-3">
        {[["40 × Oak chair", "₹1,44,000"], ["2 × Dining table", "₹38,400"], ["Delivery, Friday", "₹4,000"]].map(([a, b]) => <p key={a} className="flex justify-between py-2">{a}<span className="mono">{b}</span></p>)}
      </div>
      <div className="mt-auto flex items-center gap-2"><span className="mono text-[10px] opacity-60">Updated 2 min ago · Meera</span><span className="ml-auto rounded-full bg-ink px-3 py-1.5 text-bone">Send update to client</span></div>
    </div>
  </div>
);

const Chaos = () => (
  <div className="relative size-full overflow-hidden bg-[#e8e1d3]">
    <div className="absolute left-[5%] top-[7%] w-[40%] rotate-[-2deg] rounded-2xl bg-[#ECE5DD] p-3 shadow-lg">
      <p className="mb-2 text-[10px] font-bold opacity-60">+91 98••• ••210</p>
      {[["Is Saturday 4 pm free?", 0], ["Sorry, who is this?", 1], ["Rohan. Booked last week", 0], ["Can I move it to 5??", 0], ["Missed call (3)", 2]].map(([t, me], i) => (
        <p key={i} className={`mb-1.5 w-fit max-w-[85%] rounded-lg px-2 py-1 text-[10px] md:text-xs ${me === 1 ? "ml-auto bg-[#D9FDD3]" : me === 2 ? "mx-auto bg-[#fff]/70 text-[#c0392b]" : "bg-[#fff]"}`}>{t}</p>
      ))}
    </div>
    {[["Mrs. Shah\nSat 4?? or 5", "#FFF08A", "54%", "9%", 5], ["CALL BACK\nRohan!!", "#FFC2D1", "74%", "30%", -7], ["Dr visit clash\nwith 11:30??", "#C9F2C4", "52%", "52%", -3]].map(([t, c, x, y, r]) => (
      <p key={t as string} className="serif absolute aspect-square w-[17%] whitespace-pre-line p-[1.4%] text-[clamp(.8rem,1.7vw,1.6rem)] leading-tight shadow-md" style={{ background: c as string, left: x as string, top: y as string, rotate: `${r}deg` }}>{t}</p>
    ))}
    <div className="absolute bottom-[6%] left-[8%] w-[36%] rotate-[3deg] bg-[#fff] p-3 shadow-md">
      <p className="mono text-[9px] font-bold">DIARY · SAT</p>
      {["10:00  Anil", "11:30  Priya", "11:30  Dev", "4:00   Mrs. Shah"].map((l, i) => <p key={i} className={`mono mt-1 text-[10px] ${i === 2 ? "text-[#c0392b] line-through" : ""}`}>{l}</p>)}
    </div>
    <p className="serif absolute bottom-[8%] right-[6%] -rotate-3 text-xl text-signal-ink md:text-2xl">double booked again…</p>
  </div>
);

const Calendar = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const slots: [number, number, number, string, string][] = [[0, 0, 2, "Anil", "#DCE8DF"], [1, 1, 1, "Priya", "#D9D3EC"], [2, 3, 2, "Dev", "#F6E7A6"], [3, 0, 1, "Kavya", "#C9D0F5"], [4, 2, 2, "Rohan", "#DCE8DF"], [5, 0, 1, "Anil", "#D9D3EC"], [5, 2, 1, "Priya", "#F6E7A6"], [5, 4, 1, "Mrs. Shah · 5 PM", "#FF4F1A"]];
  return (
    <div className="flex size-full flex-col bg-paper p-4 text-xs md:p-6 md:text-sm">
      <div className="flex items-center justify-between">
        <p className="display text-lg font-bold md:text-2xl">Bookings · this week</p>
        <span className="rounded-full bg-sage px-3 py-1 text-[10px] font-semibold md:text-xs">✓ 14 reminders sent</span>
      </div>
      <div className="mt-4 grid flex-1 grid-cols-6 gap-1.5">
        {days.map((d, di) => (
          <div key={d} className="relative rounded-lg bg-bone">
            <p className="mono p-1.5 text-[10px] opacity-60">{d}</p>
            {slots.filter((x) => x[0] === di).map(([, at, len, who, c]) => (
              <p key={who + at} className={`absolute inset-x-1 rounded-md px-1.5 py-1 text-[10px] font-semibold md:text-xs ${c === "#FF4F1A" ? "text-ink shadow-[0_0_0_2px_var(--color-ink)]" : ""}`} style={{ background: c, top: `${16 + at * 15}%`, height: `${len * 15 - 2}%` }}>{who}</p>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-2"><span className="rounded bg-ink px-1.5 py-0.5 text-[10px] text-bone">NEW</span>Mrs. Shah booked Sat, 5:00 PM online. Confirmation sent.</p>
    </div>
  );
};

const examples = [
  { id: "orders", tab: "Orders", label: "Orders · a messy spreadsheet → one clear screen", before: <Sheet />, after: <Clean /> },
  { id: "bookings", tab: "Bookings", label: "Bookings · calls and sticky notes → a calendar that books and reminds", before: <Chaos />, after: <Calendar /> },
];

export default function BeforeAfter() {
  const [ex, setEx] = useState(0);
  const [v, setV] = useState(50);
  const e = examples[ex];

  return (
    <section data-bg="#D9D3EC" className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="ba-title">
      <p className="eyebrow mb-8">From spreadsheet to software</p>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="ba-title" className="display max-w-[15ch] text-[clamp(2.4rem,6.4vw,6.4rem)] font-extrabold">A little software can remove a lot of <span className="serif font-normal">pain</span>.</h2>
        <fieldset className="flex rounded-full bg-paper p-1 shadow-[0_0_0_1.5px_var(--color-ink)]">
          <legend className="sr-only">Example</legend>
          {examples.map((x, i) => (
            <label key={x.id} className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal ${ex === i ? "bg-ink text-bone" : ""}`}>
              <input type="radio" name="ba" className="sr-only" checked={ex === i} onChange={() => { setEx(i); setV(50); }} />
              {x.tab}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="relative mt-12 aspect-[4/3] w-full select-none has-[input:focus-visible]:outline-4 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-signal overflow-hidden rounded-2xl shadow-[0_0_0_1.5px_var(--color-ink)] md:aspect-[16/8]" style={{ "--v": `${v}%` } as CSS}>
        <div className="absolute inset-0">{e.after}</div>
        <div className="absolute inset-0" style={{ clipPath: "inset(0 calc(100% - var(--v)) 0 0)" }}>{e.before}</div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0" style={{ left: "var(--v)" }}>
          <span className="absolute inset-y-0 -left-[5px] w-[10px] bg-signal" />
          <span className="mono absolute left-3 top-3 whitespace-nowrap rounded bg-ink px-2 py-1 text-xs text-bone">After →</span>
          <span className="mono absolute right-3 top-3 whitespace-nowrap rounded bg-ink px-2 py-1 text-xs text-bone">← Before</span>
          <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-bone">⇆</span>
        </div>
        <input
          type="range" min={0} max={100} step={1} value={v}
          onChange={(x) => setV(+x.target.value)}
          onKeyDown={(k) => { if (k.key === "ArrowLeft" || k.key === "ArrowRight") { k.preventDefault(); setV((c) => Math.max(0, Math.min(100, c + (k.key === "ArrowRight" ? 5 : -5)))); } }}
          aria-label={`Compare before and after: ${e.tab}`}
          aria-valuetext={`${v}% before shown`}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
          data-cursor="Drag"
        />
      </div>
      <p className="mono mt-4 text-sm">{e.label}</p>
      <p className="mt-2 text-sm italic opacity-70">Drag the line to compare. Examples are illustrative.</p>
    </section>
  );
}
