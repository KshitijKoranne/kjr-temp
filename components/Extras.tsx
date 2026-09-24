"use client";
import { useEffect, useRef } from "react";
import { finePointer, reduced } from "@/lib/hooks";

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => { const x = hex(a), y = hex(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`; };
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function Extras() {
  const bar = useRef<HTMLDivElement>(null);
  const cur = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  // Page background follows the section at the viewport centre, blending across each boundary.
  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      const h = innerHeight;
      const doc = document.documentElement;
      bar.current?.style.setProperty("transform", `scaleX(${scrollY / Math.max(1, doc.scrollHeight - h)})`);
      const secs = Array.from(document.querySelectorAll<HTMLElement>("main [data-bg]"));
      let color = "";
      for (let i = 0; i < secs.length; i++) {
        const r = secs[i].getBoundingClientRect();
        if (r.top <= h / 2 && r.bottom > h / 2) {
          const next = secs[i + 1];
          const t = next ? Math.min(1, Math.max(0, (h * 0.65 - next.getBoundingClientRect().top) / (h * 0.3))) : 0;
          color = next ? mix(secs[i].dataset.bg!, next.dataset.bg!, t) : secs[i].dataset.bg!;
          break;
        }
      }
      document.body.style.backgroundColor = color;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    const mo = new MutationObserver(on);
    mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-bg"] });
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); mo.disconnect(); };
  }, []);

  // Caret cursor + magnetic elements (desktop only, never on reduced motion).
  useEffect(() => {
    if (!finePointer() || reduced()) return;
    document.documentElement.classList.add("has-cursor");
    const pos = { x: -100, y: -100 }, at = { x: -100, y: -100 };
    let raf = 0, mag: HTMLElement | null = null;
    const frame = () => {
      at.x += (pos.x - at.x) * 0.35;
      at.y += (pos.y - at.y) * 0.35;
      if (cur.current) cur.current.style.transform = `translate(${at.x}px, ${at.y}px)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const move = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      const t = e.target as HTMLElement;
      const hit = t.closest<HTMLElement>("a, button, summary, label, [data-cursor]");
      cur.current?.classList.toggle("on", !!hit);
      cur.current?.classList.toggle("inv", !!hit?.closest(".btn")); // buttons turn Signal on hover, so the cursor flips to Ink
      if (hit && label.current) label.current.textContent = hit.dataset.cursor ?? (hit.tagName === "A" ? "Open" : "Click");
      const m = t.closest<HTMLElement>("[data-magnetic]");
      if (mag && mag !== m) mag.style.translate = "";
      mag = m;
      if (m) {
        const b = m.getBoundingClientRect();
        m.style.translate = `${(e.clientX - b.left - b.width / 2) * 0.25}px ${(e.clientY - b.top - b.height / 2) * 0.35}px`;
      }
    };
    const leave = () => { pos.x = pos.y = -100; };
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); document.documentElement.classList.remove("has-cursor"); };
  }, []);

  // Console greeting + Konami terminal mode.
  useEffect(() => {
    console.log("%cKJR LABS▍", "font:800 28px system-ui;color:#FF4F1A;background:#121212;padding:8px 14px;border-radius:6px");
    console.log("%cSay hi: kjrlabs9@gmail.com · press ⌘K and type `help`.", "font:13px ui-monospace,monospace");
    let i = 0;
    const key = (e: KeyboardEvent) => {
      i = e.key === KONAMI[i] ? i + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) { document.documentElement.classList.add("terminal"); i = 0; }
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, []);

  return (
    <>
      <div aria-hidden className="progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
        <div ref={bar} className="h-full origin-left bg-signal" style={{ transform: "scaleX(0)" }} />
      </div>
      <div ref={cur} aria-hidden className="cur hidden [.has-cursor_&]:block">
        <div className="cur-dot"><span ref={label} className="cur-l">Open</span></div>
      </div>
    </>
  );
}
