"use client";
import { useState } from "react";
import { testimonials } from "@/content/site";
import { useScramble } from "@/lib/hooks";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const text = useScramble(t.quote, true, 400);
  const go = (d: number) => setI((x) => (x + d + testimonials.length) % testimonials.length);

  return (
    <section data-bg="#D9D3EC" className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="t-title" aria-roledescription="carousel">
      <p className="eyebrow mb-8" id="t-title">What people say</p>
      <figure className="min-h-[60vh]" aria-live="polite">
        <blockquote className="display max-w-[20ch] text-[clamp(2.2rem,6.4vw,6.6rem)] font-extrabold leading-[0.95]">
          <span aria-hidden>“{text}”</span>
          <span className="sr-only">{t.quote}</span>
        </blockquote>
        <figcaption className="mono mt-8 text-sm">— {t.by}, {t.role}</figcaption>
      </figure>
      <div className="mt-10 flex items-center gap-3" role="group" aria-label="Choose testimonial" onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}>
        {testimonials.map((x, k) => (
          <button key={x.by} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1} of ${testimonials.length}`} aria-current={k === i} className={`mono grid size-11 place-items-center rounded-full text-sm transition-colors ${k === i ? "bg-ink text-bone" : "shadow-[inset_0_0_0_1.5px_var(--color-ink)]"}`}>
            {String(k + 1).padStart(2, "0")}
          </button>
        ))}
        <span className="mono ml-3 text-xs opacity-70">← → keys work too</span>
      </div>

    </section>
  );
}
