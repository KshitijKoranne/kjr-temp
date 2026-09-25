"use client";
import { useRef, useState } from "react";
import { contact } from "@/content/site";
import { finePointer, reduced, useScrollProgress } from "@/lib/hooks";
import { fragments } from "./Stack";
import Btn from "./Btn";

type CSS = React.CSSProperties;
// Scattered position (fx, fy, fr) and assembled position (ax, ay), relative to centre.
// Scattered position (fx, fy, fr) and assembled position (ax, ay), relative to centre.
// Assembled: two tidy stacks either side of the buttons, and the order notification lands under the email line. Nothing covers the headline.
const pieces: { k: keyof typeof fragments; fx: string; fy: string; fr: string; ax: string; ay: string; fd: string }[] = [
  { k: "browser", fx: "-44vw", fy: "-30vh", fr: "-9deg", ax: "-33vw", ay: "9vh", fd: "0s" },
  { k: "phone", fx: "34vw", fy: "-34vh", fr: "12deg", ax: "29vw", ay: "14vh", fd: "1s" },
  { k: "terminal", fx: "-40vw", fy: "22vh", fr: "7deg", ax: "-27vw", ay: "25vh", fd: "2s" },
  { k: "chart", fx: "30vw", fy: "24vh", fr: "-11deg", ax: "37vw", ay: "26vh", fd: ".5s" },
  { k: "form", fx: "-8vw", fy: "36vh", fr: "4deg", ax: "0vw", ay: "calc(6.5vw + 220px)", fd: "1.5s" },
];

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const [snap, setSnap] = useState(false);
  useScrollProgress(ref);

  // Cursor pulls nearby fragments gently.
  const pull = (e: React.PointerEvent) => {
    if (!finePointer() || reduced()) return;
    ref.current?.querySelectorAll<HTMLElement>(".frag").forEach((f) => {
      const b = f.getBoundingClientRect();
      const dx = e.clientX - (b.left + b.width / 2);
      const dy = e.clientY - (b.top + b.height / 2);
      const k = Math.max(0, 1 - Math.hypot(dx, dy) / 500) * 0.12;
      f.style.setProperty("--mx", `${dx * k}px`);
      f.style.setProperty("--my", `${dy * k}px`);
    });
  };

  return (
    <section ref={ref} data-bg="#121212" onPointerMove={pull} className={`on-dark bg-ink relative grid min-h-[110svh] place-items-center overflow-hidden px-5 py-32 text-bone ${snap ? "assembled" : ""}`} aria-labelledby="cta-title">
      <div aria-hidden className="display outline-text pointer-events-none absolute inset-0 flex flex-col justify-center gap-[4vh] text-[22vw] font-extrabold leading-none opacity-20">
        {["BUILD", "SHIP", "REPEAT"].map((w, i) => (
          <span key={w} className="whitespace-nowrap" style={{ transform: `translateX(calc((var(--p, .5) - .5) * ${i % 2 ? -60 : 60}vw + ${i * 10}vw))` }}>{w}</span>
        ))}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
        {pieces.map((p) => (
          <div key={p.k} className="frag absolute" style={{ "--fx": p.fx, "--fy": p.fy, "--fr": p.fr, "--ax": p.ax, "--ay": p.ay } as CSS}>
            <div className="float scale-[.55] md:scale-75" style={{ "--fd": p.fd } as CSS}>{fragments[p.k]}</div>
          </div>
        ))}
      </div>
      <div className="relative z-10 max-w-[1200px] text-center">
        <h2 id="cta-title" className="display text-[clamp(2.8rem,8.5vw,9rem)] font-extrabold">
          Your idea is one message away from a <span className="serif font-normal text-signal">working</span> product.
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3" onPointerEnter={() => setSnap(true)} onPointerLeave={() => setSnap(false)} onFocus={() => setSnap(true)} onBlur={() => setSnap(false)}>
          <Btn href="#contact" variant="light" className="!px-8 !py-5 !text-xl">Start a Project</Btn>
          <Btn href={`https://wa.me/${contact.whatsapp.number}`} external variant="ghost">WhatsApp us</Btn>
        </div>
        <p className="mt-6 text-sm opacity-80">or email <a href={`mailto:${contact.email.value}`} className="u">{contact.email.value}</a></p>
      </div>
    </section>
  );
}
