"use client";
import { useRef } from "react";
import { projects } from "@/content/site";
import { useScrollProgress } from "@/lib/hooks";
import { Browser, Phone, Showcase } from "./Device";

type CSS = React.CSSProperties;
const [lead, ...rest] = projects; // lead = Tilde, opened up in the pinned intro
const n = rest.length;
// q: 0 → 1 while the intro opens into the lead project.
const Q = "clamp(0, (var(--p, 0) - .1) / .55, 1)";

export default function Work() {
  const intro = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  useScrollProgress(intro, undefined, true);
  useScrollProgress(gallery, undefined, true);

  return (
    <section id="work" data-bg="#121212" className="on-dark relative bg-ink text-bone" aria-labelledby="work-title">
      <div ref={intro} className="pin-off relative h-[260vh]" style={{ "--q": Q } as CSS}>
        <div className="pin-sticky sticky top-0 h-svh overflow-hidden">
          {/* Tilde on the web, slides in behind the phone */}
          <div className="absolute left-1/2 top-1/2 w-[54vw] max-w-[1000px] max-md:hidden" style={{ opacity: "var(--q)", transform: "translate(calc(-50% + 6vw), calc(-50% - 3vh + (1 - var(--q)) * 14vh)) scale(calc(.86 + var(--q) * .14))" } as CSS}>
            <Browser slug={lead.slug} shot={lead.shots.d!} url={lead.url} />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-5 md:flex-row md:gap-[2.4vw]">
            <h2 id="work-title" className="contents">
              <span className="display relative z-10 whitespace-nowrap text-[clamp(2.6rem,7.4vw,8rem)] font-extrabold" style={{ transform: "translateX(calc(var(--p, 0) * -70vw))", opacity: "clamp(0, 1 - var(--p, 0) * 2.4, 1)" } as CSS}>Things we&apos;ve</span>
              <span className="relative z-20 w-[clamp(150px,15vw,240px)] [--tx:0vw] [--ty:-8vh] max-md:order-first md:[--tx:25vw] md:[--ty:5vh]" style={{ transform: "translate(calc(var(--q) * var(--tx)), calc(var(--q) * var(--ty))) scale(calc(1 + var(--q) * .25))" } as CSS}>
                <Phone slug={lead.slug} shot={lead.shots.p[0]} bar={lead.shots.bar} />
              </span>
              <span className="display relative z-10 whitespace-nowrap text-[clamp(2.6rem,7.4vw,8rem)] font-extrabold" style={{ transform: "translateX(calc(var(--p, 0) * 70vw))", opacity: "clamp(0, 1 - var(--p, 0) * 2.4, 1)" } as CSS}>shipped.</span>
            </h2>
          </div>
          <p className="serif absolute inset-x-0 bottom-[9vh] text-center text-2xl md:text-3xl" style={{ opacity: "clamp(0, 1 - var(--p, 0) * 4, 1)" } as CSS}>(and a few still in the pipeline)</p>

          <div className="absolute bottom-8 left-5 z-30 max-w-[34ch] md:bottom-10 md:left-10" style={{ opacity: "clamp(0, (var(--p, 0) - .68) * 5, 1)", transform: "translateY(calc((1 - clamp(0, (var(--p, 0) - .68) * 5, 1)) * 20px))" } as CSS}>
            <p className="mono text-xs">{lead.platforms.join(" · ")} · <span className="text-signal">{lead.status}</span></p>
            <h3 className="display mt-2 text-[clamp(2.6rem,5vw,5rem)] font-extrabold leading-[.9]">{lead.name}</h3>
            <p className="mt-3 text-base opacity-85 md:text-lg">{lead.tagline}</p>
            <div className="mono mt-4 flex gap-5 text-sm">
              <a href={`/work/${lead.slug}/`} className="u">Case study ↗</a>
              {lead.liveUrl && <a href={lead.liveUrl} target="_blank" rel="noopener" className="u">Open {lead.name} ↗</a>}
            </div>
          </div>
        </div>
      </div>

      <div ref={gallery} className="hscroll relative" style={{ "--n": n } as CSS}>
        <div className="hscroll-sticky sticky top-0 h-svh overflow-hidden">
          <ul className="hscroll-track flex h-full" style={{ width: `${n * 88}vw` }}>
            {rest.map((p) => (
              <li key={p.slug} className="flex h-full w-[88vw] shrink-0 flex-col justify-center gap-6 px-5 py-16 md:flex-row md:items-center md:gap-12 md:px-10">
                <a href={`/work/${p.slug}/`} className="group relative block aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl md:w-[58%]" style={{ viewTransitionName: `media-${p.slug}` }} data-cursor="Open" aria-label={`Open ${p.name} case study`}>
                  <div className="size-full transition-transform duration-[var(--t-slow)] ease-[var(--e-snappy)] group-hover:scale-[1.03]"><Showcase p={p} /></div>
                </a>
                <div className="flex min-w-0 flex-col gap-4 max-md:order-first md:gap-6">
                  <p className="mono text-xs">{p.platforms.join(" · ")} · {p.stack[0].toUpperCase()} · <span className="text-signal">{p.status}</span></p>
                  <h3 className="display text-[clamp(2.6rem,5.5vw,6rem)] font-extrabold leading-[.9]" style={{ viewTransitionName: `title-${p.slug}` }}>{p.name}</h3>
                  <p className="max-w-[40ch] text-lg">{p.tagline}</p>
                  <div className="mono flex gap-5 text-sm">
                    <a href={`/work/${p.slug}/`} className="u">Case study ↗</a>
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener" className="u">Open live ↗</a>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div aria-hidden className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-signal max-md:hidden" style={{ transform: "scaleX(var(--p, 0))" }} />
        </div>
      </div>
    </section>
  );
}
