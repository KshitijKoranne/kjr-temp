"use client";
import { useEffect, useRef, useState } from "react";
import { ticker } from "@/content/site";
import { reduced, useScrollProgress, useTyped } from "@/lib/hooks";
import Shader from "./Shader";
import Stack from "./Stack";
import Btn from "./Btn";

type CSS = React.CSSProperties;

function Ships({ delay }: { delay: number }) {
  const [typed, done] = useTyped("ships", true, 85, delay);
  // Invisible copy holds the width, so the full stop never jumps while the word re-types.
  return (
    <span className="relative inline-block">
      <span className="serif invisible font-normal">ships</span>
      <span className={`dock absolute left-0 top-0 whitespace-nowrap ${done ? "go-dock" : ""}`}>
        {typed.split("").map((c, i) => <span key={i} className="serif font-normal" style={{ "--i": i } as CSS}>{c}</span>)}
        {!done && <span className="caret" />}
      </span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [go, setGo] = useState(false);
  const [retype, setRetype] = useState(0);
  useScrollProgress(ref, undefined, true);

  useEffect(() => {
    const start = () => setGo(true);
    if (document.documentElement.classList.contains("booted")) return start();
    addEventListener("booted", start);
    return () => removeEventListener("booted", start);
  }, []);

  // Re-type "ships" every few seconds while the hero is on screen.
  useEffect(() => {
    if (!go || reduced()) return;
    const id = setInterval(() => { if (scrollY < innerHeight * 0.6 && !document.hidden) setRetype((n) => n + 1); }, 4200);
    return () => clearInterval(id);
  }, [go]);

  return (
    <section ref={ref} className={`hero relative h-[185vh] ${go ? "go" : ""}`} data-bg="#F2EFE8" aria-labelledby="hero-title">
      <div className="sticky top-0 h-svh overflow-hidden">
        <Shader />
        <div className="absolute inset-x-0 bottom-0 top-[72%] md:bottom-0 md:left-[42%] md:top-[6%]">
          <div className="size-full" style={{ opacity: "clamp(0, (1 - var(--p, 0)) * 5, 1)" } as CSS}><div className="stack-in size-full origin-center scale-[.5] sm:scale-75 lg:scale-100"><Stack /></div></div>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-start px-5 pt-28 md:justify-center-safe md:px-10 md:pt-24" style={{ transform: "translateY(calc(var(--p, 0) * -14vh))", opacity: "clamp(0, 1 - var(--p, 0) * 1.8, 1)" } as CSS}>
          <p className="anim-fade-up mono flex items-center gap-2.5 text-sm" style={{ "--d": "600ms" } as CSS}>
            <i aria-hidden className="size-2 rounded-full bg-signal" />
            Software and design studio · Vadodara, India
          </p>
          <h1 id="hero-title" className="display mt-5 text-[clamp(2.9rem,13vw,11.5rem)] md:text-[clamp(2.9rem,min(12vw,calc(29svh_-_110px)),11.5rem)] font-extrabold" onPointerEnter={() => go && setRetype((n) => n + 1)}>
            <span className="sr-only">We build software that actually ships.</span>
            <span aria-hidden>
              <span className="mask-line" style={{ "--i": 0, "--d": "900ms" } as CSS}><span>We build</span></span>
              <span className="mask-line" style={{ "--i": 1, "--d": "900ms" } as CSS}><span>software that</span></span>
              <span className="mask-line" style={{ "--i": 2, "--d": "900ms" } as CSS}>
                <span>actually {go && <Ships key={retype} delay={retype ? 0 : 1450} />}.</span>
              </span>
            </span>
          </h1>
          <p className="anim-fade-up mt-7 max-w-[44ch] text-base leading-relaxed md:text-lg" style={{ "--d": "2000ms" } as CSS}>
            Web apps, mobile apps and AI tools for founders, small businesses and anyone with an idea worth building. Designed with care, built fast, tested like it matters. From a small lab in Vadodara, India.
          </p>
          <div className="anim-fade-up mt-7 flex flex-wrap gap-3" style={{ "--d": "2100ms" } as CSS}>
            <Btn href="#contact">Start a Project</Btn>
            <Btn href="#work" variant="ghost">See the Work</Btn>
          </div>
          <p className="anim-fade-up mono mt-6 text-xs opacity-70" style={{ "--d": "2250ms" } as CSS}>
            Latest release: {ticker.lastShipped.text}
          </p>
        </div>
        <p className="mono absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-[11px] opacity-60 md:block" aria-hidden>scroll to explode ↓</p>
      </div>
    </section>
  );
}
