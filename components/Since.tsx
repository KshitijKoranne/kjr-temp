"use client";
import { useRef } from "react";
import { brand } from "@/content/site";
import { useInView } from "@/lib/hooks";

export default function Since() {
  const big = useRef<HTMLDivElement>(null);
  const seen = useInView(big);
  return (
    <section data-bg="#D9D3EC" className="px-5 py-24 md:px-10 md:py-32" aria-label="Since 2025">
      <div ref={big} className={`text-center ${seen ? "is-in" : ""}`}>
        <p className="display flex items-center justify-center gap-[4vw] text-[clamp(7rem,30vw,30rem)] font-extrabold leading-none" aria-label="Zero to one">
          <span aria-hidden>0</span>
          <svg aria-hidden viewBox="0 0 200 60" className="w-[22vw] max-w-[320px]"><path className="draw-in" pathLength={1} d="M6 30 H180 M150 6 L186 30 L150 54" fill="none" stroke="#FF4F1A" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span aria-hidden className="inline-block" style={seen ? { animation: "pop 1.4s var(--e-spring) both" } : { opacity: 0 }}>1</span>
        </p>
        <p className="serif mt-4 text-2xl md:text-3xl">Turning ideas into first versions since {brand.since.year}.</p>
      </div>
    </section>
  );
}
