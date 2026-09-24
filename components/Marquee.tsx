"use client";
import { useEffect, useRef } from "react";
import { reduced } from "@/lib/hooks";

const words = ["WEB APPS", "iOS", "ANDROID", "AI TOOLS", "RAG", "WEBSITES", "AUTOMATION", "MVPs", "DESIGN SYSTEMS"];

function Row({ rev, offset }: { rev?: boolean; offset: number }) {
  const list = [...words.slice(offset), ...words.slice(0, offset)];
  return (
    <div className={`mrow ${rev ? "rev" : ""}`}>
      {[0, 1].map((k) => (
        <span key={k} className="flex shrink-0 items-center">
          {list.map((w) => (
            <span key={w} className="flex items-center">
              <span className="mw display px-[2vw] text-[clamp(3rem,9vw,8.5rem)] font-extrabold">{w}</span>
              <span className="text-signal text-[clamp(1.5rem,4vw,3.5rem)]">✦</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    // One small velocity hook: scroll direction flips the rows, speed boosts and skews briefly.
    const anims = el.getAnimations({ subtree: true });
    let last = scrollY, dir = 1, boost = 0, raf = 0;
    const frame = () => {
      boost *= 0.92;
      anims.forEach((a) => (a.playbackRate = dir * (1 + boost)));
      el.style.setProperty("--skew", `${(-dir * Math.min(boost, 4) * 2).toFixed(2)}deg`);
      raf = boost > 0.01 ? requestAnimationFrame(frame) : 0;
    };
    const on = () => {
      const dy = scrollY - last;
      last = scrollY;
      if (dy) dir = Math.sign(dy);
      boost = Math.min(5, boost + Math.abs(dy) / 60);
      if (!raf) raf = requestAnimationFrame(frame);
    };
    addEventListener("scroll", on, { passive: true });
    return () => { removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section data-bg="#F2EFE8" className="overflow-hidden py-10 md:py-16" aria-label="What we build">
      <p className="sr-only">{words.join(", ")}</p>
      <div ref={ref} aria-hidden className="space-y-2 transition-transform duration-[var(--t-base)]" style={{ transform: "skewX(var(--skew, 0deg))" }}>
        <Row offset={0} />
        <Row rev offset={4} />
      </div>
    </section>
  );
}
