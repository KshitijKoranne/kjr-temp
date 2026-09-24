"use client";
// Shared motion hooks.
import { useEffect, useState, type RefObject } from "react";
export { T, EASE, STAGGER } from "./tokens";

export const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => typeof window !== "undefined" && matchMedia("(pointer: fine)").matches;

export function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => setR(reduced()), []);
  return r;
}

// Writes scroll progress (0..1) to `--p` on the element and calls onP.
// pinned: progress while a tall section scrolls under a sticky child.
// otherwise: progress from entering the bottom to leaving the top.
export function useScrollProgress(ref: RefObject<HTMLElement | null>, onP?: (p: number) => void, pinned = false) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const h = innerHeight;
      if (r.bottom < -h || r.top > 2 * h) return;
      const p = pinned ? -r.top / Math.max(1, r.height - h) : (h - r.top) / (h + r.height);
      const c = Math.min(1, Math.max(0, p));
      el.style.setProperty("--p", c.toFixed(4));
      onP?.(c);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
    // ponytail: onP identity ignored on purpose; callers pass setState-style callbacks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, pinned]);
}

export function useInView(ref: RefObject<Element | null>, once = true, margin = "0px 0px -15% 0px") {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setV(e.isIntersecting);
      if (e.isIntersecting && once) io.disconnect();
    }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, margin]);
  return v;
}

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+<>/";
// Decode effect, max 400 ms. Returns the final text right away on reduced motion.
export function useScramble(text: string, run = true, ms = 400) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!run || reduced()) return setOut(text);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      const fixed = Math.floor(k * text.length);
      setOut(text.split("").map((c, i) => (i < fixed || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(""));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, run, ms]);
  return out;
}

// Types text one character at a time. Returns [typed, done].
export function useTyped(text: string, run = true, speed = 45, delay = 0): [string, boolean] {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reduced()) return setN(text.length);
    setN(0);
    let i = 0;
    let id: ReturnType<typeof setTimeout>;
    const step = () => { i++; setN(i); if (i < text.length) id = setTimeout(step, speed); };
    id = setTimeout(step, delay);
    return () => clearTimeout(id);
  }, [text, run, speed, delay]);
  return [text.slice(0, n), n >= text.length];
}

export function useNow(every = 1000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), every);
    return () => clearInterval(id);
  }, [every]);
  return now;
}

export const fmtTime = (d: Date, tz?: string) =>
  new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz }).format(d);
