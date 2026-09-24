"use client";
import { useRef, useState } from "react";
import { services } from "@/content/site";
import { logos } from "@/content/logos";

type CSS = React.CSSProperties;
const loop = (name: string, delay = 0, extra: CSS = {}): CSS => ({ animation: `${name} 2.6s var(--e-snappy) ${delay}ms infinite both`, ...extra });
const once = (delay = 0): CSS => ({ animation: `pop-in 600ms var(--e-spring) ${delay}ms both` });

// Eight tiny looping demos, pure HTML + CSS keyframes.
function Demo({ kind }: { kind: string }) {
  const box = "relative h-[160px] w-[250px] overflow-hidden rounded-xl p-3 shadow-[0_0_0_1.5px_var(--color-ink),0_20px_40px_-20px_rgb(18_18_18/.35)]";
  switch (kind) {
    case "web":
      return (
        <div className={`${box} bg-paper`}>
          <div className="mb-3 flex gap-1">{[0, 1, 2].map((i) => <i key={i} className="size-2 rounded-full bg-ink/25" />)}</div>
          {[["h-4 w-2/3 bg-ink", 0], ["h-2 w-full bg-ink/20", 150], ["h-2 w-5/6 bg-ink/20", 300], ["h-10 w-full bg-sage", 450]].map(([c, d]) => (
            <i key={d} className={`mb-2 block origin-left rounded ${c}`} style={loop("grow", d as number)} />
          ))}
        </div>
      );
    case "phone":
      return (
        <div className={`${box} grid place-items-center bg-lilac`}>
          <div className="relative h-[126px] w-[70px] overflow-hidden rounded-[14px] bg-ink p-1">
            <div className="h-full rounded-[10px] bg-paper p-1.5">
              <div className="h-16 rounded-md bg-signal" style={loop("swipe")} />
              <i className="mt-2 block h-1.5 w-2/3 rounded bg-ink/30" />
            </div>
          </div>
          <i className="absolute left-[58%] top-[50%] size-5 rounded-full bg-ink/30" style={loop("swipe", 0, { animationDirection: "normal" })} />
        </div>
      );
    case "ai":
      return (
        <div className={`${box} flex flex-col gap-2 bg-butter text-[10px]`}>
          <p className="ml-auto w-fit rounded-lg rounded-br-sm bg-ink px-2 py-1 text-bone">Which product sold best this week?</p>
          <div className="w-[88%] rounded-lg rounded-bl-sm bg-paper p-2 leading-snug">
            <p style={loop("typeline")}>Cold brew, up 24% on last week.</p>
            <div className="mt-1.5 flex h-9 items-end gap-1">
              {[45, 60, 38, 100, 52].map((h, i) => <i key={i} className="flex-1 origin-bottom rounded-sm" style={{ height: `${h}%`, background: i === 3 ? "#FF4F1A" : "rgb(18 18 18 / .18)", ...loop("growy", 500 + i * 90) }} />)}
            </div>
          </div>
          <span className="mono w-fit rounded bg-ink px-1.5 py-0.5 text-[9px] text-bone" style={loop("pop")}>from: Sales sheet · Sept</span>
        </div>
      );
    case "gxp":
      return (
        <div className={`${box} bg-mist`}>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="size-6" style={once()}><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" fill="#121212" /><path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="#C9D0F5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="text-[11px] font-bold leading-tight">Built to help you meet</p>
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {["HIPAA", "GDPR", "SOC 2", "ISO 27001", "PCI DSS", "DPDP"].map((b, i) => (
              <span key={b} className="mono flex items-center justify-center gap-1 rounded-md bg-paper px-1 py-1.5 text-[9px] font-bold shadow-[0_0_0_1px_rgb(18_18_18/.15)]" style={once(150 + i * 110)}>
                <i className="size-1.5 rounded-full bg-[#1FA971]" />{b}
              </span>
            ))}
          </div>
          <p className="mono mt-2 text-[8.5px] opacity-60">Encryption · access control · audit trail</p>
        </div>
      );
    case "sheet":
      return (
        <div className={`${box} bg-sage`}>
          <p className="flex items-center justify-between text-[10px] font-bold">Orders board <span className="mono font-normal opacity-60">today</span></p>
          <div className="relative mt-2 grid grid-cols-3 gap-1.5">
            {["New", "Packed", "Shipped"].map((c, i) => (
              <div key={c} className="h-[98px] rounded-md bg-paper/70 p-1">
                <p className="mono mb-1 text-[8px] uppercase opacity-60">{c}</p>
                {Array.from({ length: [2, 1, 3][i] }, (_, k) => <i key={k} className="mb-1 block h-4 rounded bg-paper shadow-[0_0_0_1px_rgb(18_18_18/.12)]" />)}
              </div>
            ))}
            {/* one order hops along the board */}
            <div className="absolute left-1 top-[58px] flex h-5 w-[calc(33.333%-10px)] items-center gap-1 rounded bg-ink px-1 text-[8px] font-semibold text-bone" style={{ animation: "hop 3.6s var(--e-snappy) infinite both" }}>
              <i className="size-1.5 shrink-0 rounded-full bg-signal" />#418
            </div>
          </div>
        </div>
      );
    case "mvp":
      return (
        <div className={`${box} grid content-center gap-3 bg-peach`}>
          <div className="mono relative h-5 text-sm font-bold">
            <span className="absolute" style={loop("xfade-a", 0, { animationTimingFunction: "linear" })}>v0.1</span>
            <span className="absolute" style={loop("xfade-b", 0, { animationTimingFunction: "linear" })}>v1.0 ✓</span>
          </div>
          <div className="h-3 rounded-full bg-paper"><i className="block h-full origin-left rounded-full bg-ink" style={loop("race")} /></div>
        </div>
      );
    case "design":
      return (
        <div className={`${box} flex gap-4 bg-paper`}>
          <div className="grid grid-cols-2 gap-1.5">{["bg-ink", "bg-signal", "bg-sage", "bg-lilac"].map((c, i) => <i key={c} className={`size-8 rounded-md ${c}`} style={loop("pop", i * 120)} />)}</div>
          <div className="display flex flex-col justify-center leading-none">
            {["text-3xl", "text-xl", "text-sm", "text-[10px]"].map((c, i) => <span key={c} className={`${c} origin-left font-bold`} style={loop("grow", 300 + i * 120)}>Aa</span>)}
          </div>
        </div>
      );
    default:
      return (
        <div className={`${box} bg-ink text-bone`}>
          <div className="mono flex items-center gap-1 text-[9px]">
            {["Build", "Test", "Live"].map((t, i) => (
              <span key={t} className="flex items-center gap-1">
                <span className="rounded-full px-1.5 py-0.5" style={{ animation: `stage 3s steps(1) ${i * 0.6}s infinite both` }}>{i === 2 && <i className="mr-1 inline-block size-1.5 rounded-full bg-[#28C840]" />}{t}</span>
                {i < 2 && <span className="opacity-40">→</span>}
              </span>
            ))}
          </div>
          <svg viewBox="0 0 200 50" className="mt-2 w-full"><path d="M0 38 L20 34 L34 36 L48 22 L62 28 L78 18 L94 24 L110 12 L128 20 L146 10 L166 16 L184 8 L200 12" fill="none" stroke="#28C840" strokeWidth="2" pathLength={1} strokeDasharray="1" style={{ animation: "trace 3s linear infinite" }} /></svg>
          <div className="mt-1 flex items-center justify-between text-[9px]"><span className="opacity-60">Uptime · 30 days</span><b>99.98%</b></div>
          <div className="mt-2 flex gap-1.5">
            {([["App Store", logos.apple.path], ["Google Play", logos.googleplay.path]] as const).map(([b, d], i) => (
              <span key={b} className="flex items-center gap-1 rounded-md bg-white/10 px-1.5 py-1 text-[8.5px] font-semibold" style={once(400 + i * 150)}>
                <svg viewBox="0 0 24 24" className="size-2.5" fill="currentColor"><path d={d} /></svg>{b}
              </span>
            ))}
          </div>
        </div>
      );
  }
}

export default function Services() {
  const [active, setActive] = useState(-1);
  const follow = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !follow.current) return;
    follow.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 75}px)`;
  };

  return (
    <section id="services" data-bg={active >= 0 ? services[active].color : "#DCE8DF"} className="relative px-5 pb-24 pt-20 md:px-10 md:pb-36 md:pt-28" aria-labelledby="services-title" onPointerMove={move}>
      <p className="eyebrow mb-8">Services</p>
      <h2 id="services-title" className="display max-w-[14ch] text-[clamp(2.6rem,7vw,7rem)] font-extrabold">
        What should we <span className="serif font-normal">build</span> for you?
      </h2>
      <ol className="mt-16 border-t-[1.5px] border-ink" onPointerLeave={() => setActive(-1)}>
        {services.map((s, i) => {
          const on = active === i;
          return (
            <li key={s.name} className="border-b-[1.5px] border-ink" onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}>
              <button
                className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-3 py-5 text-left transition-[padding] duration-[var(--t-base)] md:grid-cols-[5rem_1fr_minmax(0,34ch)] md:py-7 md:data-[on=true]:py-10"
                data-on={on}
                aria-expanded={on}
                aria-controls={`svc-${i}`}
                onClick={() => setActive(on ? -1 : i)}
                onFocus={(e) => e.currentTarget.matches(":focus-visible") && setActive(i)}
                data-cursor="View"
              >
                <span className="mono text-sm">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-[clamp(1.9rem,5.4vw,5.2rem)] leading-[0.95] transition-[font-variation-settings] duration-[var(--t-base)]" style={{ fontVariationSettings: on ? '"wght" 800, "wdth" 100' : '"wght" 450, "wdth" 85' }}>
                  {s.name}
                </span>
                <span className="hidden items-center justify-end gap-3 md:flex" aria-hidden={!on}>
                  <span className="text-right text-base leading-snug transition-[opacity,transform] duration-[var(--t-base)]" style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateX(30px)" }}>{s.body}</span>
                  <svg width="40" height="40" viewBox="0 0 40 40" className="shrink-0 transition-transform duration-[var(--t-base)]" style={{ transform: on ? "translate(4px,-4px)" : "none" }}>
                    <path d="M8 32 L32 8 M14 8 H32 V26" fill="none" stroke="currentColor" strokeWidth="3" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: on ? 0 : 1, transition: "stroke-dashoffset 420ms var(--e-snappy)" }} />
                  </svg>
                </span>
                <span className="mono text-xl md:hidden" aria-hidden>{on ? "−" : "+"}</span>
              </button>
              <div id={`svc-${i}`} className="grid transition-[grid-template-rows] duration-[var(--t-base)] md:hidden" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <div className="pb-6 pl-[3.75rem]">
                    {on && <Demo kind={s.demo} />}
                    <p className="mt-4 max-w-[40ch] leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div ref={follow} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden transition-transform duration-[var(--t-fast)] ease-out md:block">
        <div className="transition-[opacity,scale] duration-[var(--t-base)]" style={{ opacity: active >= 0 ? 1 : 0, scale: active >= 0 ? "1" : ".8" }}>
          {active >= 0 && <Demo key={active} kind={services[active].demo} />}
        </div>
      </div>
    </section>
  );
}
