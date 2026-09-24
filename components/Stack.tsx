"use client";
import { useEffect, useRef } from "react";
import { finePointer, reduced } from "@/lib/hooks";

type CSS = React.CSSProperties;

// The five UI fragments. Shared by the hero stack and the booking CTA.
// Picture-first on purpose: a visitor should read "website, app, numbers, orders, live" without reading any words.
const ring = (r: number, pct: number, color: string, w = 9) => {
  const c = 2 * Math.PI * r;
  return <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} transform="rotate(-90 50 50)" />;
};

export const fragments = {
  browser: (
    <div className="w-[340px] overflow-hidden rounded-xl bg-paper text-ink shadow-[0_0_0_1.5px_var(--color-ink),0_24px_48px_-24px_rgb(18_18_18/.35)]">
      <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <i key={c} className="size-2.5 rounded-full" style={{ background: c }} />)}
        <span className="mono ml-3 rounded-full bg-bone px-3 py-0.5 text-[10px]">yourbrand.com</span>
      </div>
      <div className="relative h-[118px] overflow-hidden" style={{ background: "linear-gradient(160deg,#FFB38A 0%,#FF6A3D 45%,#7A3BD1 100%)" }}>
        <i className="absolute left-[62%] top-5 size-14 rounded-full bg-[#FFE6A8]" />
        <svg viewBox="0 0 340 118" className="absolute inset-x-0 bottom-0 w-full" preserveAspectRatio="none"><path d="M0 90 L60 60 L110 84 L170 40 L230 78 L290 52 L340 70 V118 H0Z" fill="#2B1B4A" opacity=".85" /><path d="M0 104 L80 80 L150 100 L220 76 L300 98 L340 88 V118 H0Z" fill="#170F2B" /></svg>
        <div className="absolute left-4 top-4 space-y-1.5"><i className="block h-3 w-28 rounded bg-paper" /><i className="block h-2 w-20 rounded bg-paper/70" /><i className="mt-2 block h-5 w-16 rounded-full bg-ink" /></div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {["#DCE8DF", "#D9D3EC", "#F6E7A6"].map((c, i) => (
          <div key={c} className="rounded-md p-1.5" style={{ background: c }}>
            <i className="block h-8 rounded" style={{ background: ["#9CC5A6", "#A99BD8", "#EBC95B"][i] }} />
            <i className="mt-1.5 block h-1.5 w-3/4 rounded bg-ink/30" />
          </div>
        ))}
      </div>
    </div>
  ),
  phone: (
    <div className="h-[300px] w-[150px] rounded-[28px] bg-ink p-[6px] shadow-[0_24px_48px_-20px_rgb(18_18_18/.5)]">
      <div className="relative flex h-full flex-col gap-2 overflow-hidden rounded-[22px] bg-paper p-3 pt-7 text-ink">
        <i className="absolute left-1/2 top-2 h-3 w-12 -translate-x-1/2 rounded-full bg-ink" />
        <p className="text-[9px] font-semibold opacity-60">Today</p>
        <svg viewBox="0 0 100 100" className="mx-auto w-[92px]">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#FF4F1A" strokeOpacity=".15" strokeWidth="9" />{ring(42, 0.78, "#FF4F1A")}
          <circle cx="50" cy="50" r="30" fill="none" stroke="#2430D6" strokeOpacity=".15" strokeWidth="9" />{ring(30, 0.6, "#2430D6")}
          <circle cx="50" cy="50" r="18" fill="none" stroke="#1FA971" strokeOpacity=".15" strokeWidth="9" />{ring(18, 0.9, "#1FA971")}
        </svg>
        <div className="grid grid-cols-2 gap-1.5">
          {[["#FFD9C7", "8.2k"], ["#C9D0F5", "42m"]].map(([c, v]) => <div key={v} className="rounded-lg p-1.5" style={{ background: c }}><p className="display text-sm font-extrabold leading-none">{v}</p><i className="mt-1 block h-1 w-2/3 rounded bg-ink/25" /></div>)}
        </div>
        <div className="flex items-end gap-[3px] rounded-lg bg-bone p-1.5">{[40, 65, 50, 80, 58, 92, 70].map((h, i) => <i key={i} className="flex-1 rounded-sm" style={{ height: `${h * 0.28}px`, background: i === 5 ? "#FF4F1A" : "#121212", opacity: i === 5 ? 1 : 0.2 }} />)}</div>
        <div className="mt-auto flex justify-around rounded-full bg-ink/5 py-1.5">{[0, 1, 2, 3].map((i) => <i key={i} className={`size-2 rounded-full ${i ? "bg-ink/25" : "bg-signal"}`} />)}</div>
      </div>
    </div>
  ),
  terminal: (
    <div className="w-[250px] rounded-xl bg-ink p-4 text-bone shadow-[0_24px_48px_-24px_rgb(18_18_18/.5)]">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-semibold"><span className="relative grid size-2.5 place-items-center"><i className="absolute size-2.5 animate-ping rounded-full bg-[#28C840]/60" /><i className="size-2.5 rounded-full bg-[#28C840]" /></span>Live</p>
        <span className="mono text-[10px] opacity-60">yourbrand.com</span>
      </div>
      <svg viewBox="0 0 220 60" className="mt-3 w-full"><defs><linearGradient id="up" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#28C840" stopOpacity=".45" /><stop offset="1" stopColor="#28C840" stopOpacity="0" /></linearGradient></defs><path d="M0 44 C20 40 30 22 50 26 S80 44 100 30 S140 8 160 18 S200 12 220 6 V60 H0Z" fill="url(#up)" /><path d="M0 44 C20 40 30 22 50 26 S80 44 100 30 S140 8 160 18 S200 12 220 6" fill="none" stroke="#28C840" strokeWidth="2.5" /></svg>
      <div className="mt-2 flex justify-between text-[10px]"><span className="opacity-60">Uptime</span><b>99.98%</b></div>
      <div className="mt-2 flex gap-[3px]">{Array.from({ length: 30 }, (_, i) => <i key={i} className="h-4 flex-1 rounded-[2px] bg-[#28C840]" style={{ opacity: i === 11 ? 0.35 : 0.9 }} />)}</div>
    </div>
  ),
  chart: (
    <div className="w-[220px] rounded-xl bg-butter p-3 text-ink shadow-[0_0_0_1.5px_var(--color-ink),0_24px_48px_-24px_rgb(18_18_18/.35)]">
      <div className="flex items-baseline justify-between"><p className="text-[10px] font-semibold opacity-70">Sales this month</p><span className="rounded-full bg-ink px-1.5 py-0.5 text-[9px] font-bold text-butter">▲ 24%</span></div>
      <p className="display mt-1 text-2xl font-extrabold leading-none">₹4.8L</p>
      <svg viewBox="0 0 200 80" className="mt-2 w-full" aria-hidden>
        <defs><linearGradient id="sales" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#FF4F1A" stopOpacity=".5" /><stop offset="1" stopColor="#FF4F1A" stopOpacity="0" /></linearGradient></defs>
        {[0, 1, 2].map((k) => <line key={k} x1="0" x2="200" y1={18 + k * 24} y2={18 + k * 24} stroke="#121212" strokeOpacity=".12" strokeDasharray="3 4" />)}
        <path d="M0 66 C18 60 28 48 44 52 S72 62 88 44 S118 30 134 36 S166 22 182 14 L200 10 V80 H0Z" fill="url(#sales)" />
        <path d="M0 66 C18 60 28 48 44 52 S72 62 88 44 S118 30 134 36 S166 22 182 14 L200 10" fill="none" stroke="#FF4F1A" strokeWidth="3" strokeLinecap="round" />
        <circle cx="182" cy="14" r="5" fill="#FF4F1A" stroke="#F6E7A6" strokeWidth="2.5" />
      </svg>
    </div>
  ),
  form: (
    <div className="flex w-[250px] items-center gap-3 rounded-2xl bg-paper p-3 text-ink shadow-[0_0_0_1.5px_var(--color-ink),0_24px_48px_-24px_rgb(18_18_18/.35)]">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl" style={{ background: "linear-gradient(135deg,#FFB38A,#FF4F1A)" }}>
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="#FAF7F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center justify-between text-xs font-bold">New order <span className="text-[9px] font-normal opacity-50">now</span></p>
        <p className="truncate text-[11px] opacity-70">2 × Ceramic mug · Paid ₹1,240</p>
      </div>
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#1FA971] text-[11px] font-bold text-paper">✓</span>
    </div>
  ),
};

type Layer = { k: keyof typeof fragments; x: number; y: number; z: number; dx: number; dy: number; dz: number; label?: string };
const layers: Layer[] = [
  { k: "browser", x: -210, y: -130, z: 0, dx: -140, dy: -60, dz: -180, label: "WEBSITE" },
  { k: "terminal", x: -250, y: 90, z: 70, dx: -220, dy: 160, dz: 120, label: "LAUNCH" },
  { k: "phone", x: 70, y: -120, z: 130, dx: 60, dy: 460, dz: 40 },
  { k: "chart", x: 30, y: 90, z: 190, dx: 220, dy: 140, dz: 260, label: "DATA" },
  { k: "form", x: -110, y: -230, z: 250, dx: 60, dy: -180, dz: 380, label: "AUTOMATION" },
];

export default function Stack() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    if (finePointer()) {
      const on = (e: PointerEvent) => {
        el.style.setProperty("--mx", (e.clientX / innerWidth - 0.5).toFixed(3));
        el.style.setProperty("--my", (e.clientY / innerHeight - 0.5).toFixed(3));
      };
      addEventListener("pointermove", on, { passive: true });
      return () => removeEventListener("pointermove", on);
    }
    // Touch: Android gives orientation without a permission prompt; iOS needs one, so drift instead.
    const needsPermission = typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown }).requestPermission === "function";
    if (needsPermission || !("ondeviceorientation" in window)) { el.firstElementChild?.classList.add("drift"); return; }
    const on = (e: DeviceOrientationEvent) => {
      el.style.setProperty("--mx", (((e.gamma ?? 0) / 90) * 0.8).toFixed(3));
      el.style.setProperty("--my", ((((e.beta ?? 45) - 45) / 90) * 0.8).toFixed(3));
    };
    addEventListener("deviceorientation", on);
    return () => removeEventListener("deviceorientation", on);
  }, []);

  return (
    <div ref={ref} className="stack pointer-events-none relative size-full" aria-hidden>
      <div className="stack-rig absolute left-1/2 top-1/2">
        {layers.map((l) => (
          <div
            key={l.k}
            className={`layer ${l.k === "form" ? "max-md:hidden" : ""}`} // mobile: the top card would sit on the hero buttons
            style={{ "--x": `${l.x}px`, "--y": `${l.y}px`, "--z": `${l.z}px`, "--dx": `${l.dx}px`, "--dy": `${l.dy}px`, "--dz": `${l.dz}px`, ...(l.k === "phone" ? { opacity: "clamp(0, 1.4 - var(--p, 0) * 1.6, 1)" } : {}) } as CSS}
          >
            {fragments[l.k]}
            {l.label && <span className="layer-label mono text-[11px] font-semibold"><span className="rounded bg-ink px-1.5 py-0.5 text-bone">{l.label}</span></span>}
          </div>
        ))}
      </div>
    </div>
  );
}
