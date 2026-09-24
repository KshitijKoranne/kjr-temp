"use client";
import { useRef } from "react";
import { clientCities, contact, home } from "@/content/site";
import { dots, MAP } from "@/content/worldDots";
import { fmtTime, useInView, useNow } from "@/lib/hooks";

// Same equirectangular projection the land dots were generated with.
const xy = (lat: number, lon: number) => [((lon + 180) / 360) * MAP.w, ((MAP.n - lat) / (MAP.n - MAP.s)) * MAP.h] as const;
// Trim the empty Pacific on the left and right so the map fills its box.
const VB = { x: 60, w: 900 };

export default function Location() {
  const now = useNow(1000);
  const mapRef = useRef<SVGSVGElement>(null);
  const seen = useInView(mapRef);
  const zone = now ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
  const [hx, hy] = xy(home.lat, home.lon);

  return (
    <section data-bg="#FAF7F0" className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="loc-title">
      <p className="eyebrow mb-8">Location</p>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 id="loc-title" className="display text-[clamp(2.6rem,6vw,6rem)] font-extrabold">Built in Vadodara. <span className="serif font-normal">Shipped</span> worldwide.</h2>
          <p className="display mt-10 text-[clamp(1.8rem,3.6vw,3.2rem)] font-bold leading-tight">
            It&apos;s <span className="text-signal-ink">{now ? fmtTime(now, contact.tz) : "—"}</span> in Vadodara.
          </p>
          <p className="mt-2 text-lg">{now && fmtTime(now, zone) !== fmtTime(now, contact.tz) ? `And ${fmtTime(now, zone)} where you are.` : " "}</p>
          <p className="mono mt-8 text-sm leading-relaxed opacity-80">{contact.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}</p>
          <p className="mt-4 max-w-[42ch] leading-relaxed">We work with clients across time zones and plan calls inside the hours we share.</p>
        </div>

        <svg ref={mapRef} viewBox={`${VB.x} 0 ${VB.w} ${MAP.h}`} className={`w-full ${seen ? "is-in" : ""}`} role="img" aria-label="World map with arcs from Vadodara to London, Berlin, Dubai, Singapore and New York">
          <path d={dots} stroke="#121212" strokeOpacity=".22" strokeWidth="4.2" strokeLinecap="round" />
          {clientCities.map((c, i) => {
            const [x, y] = xy(c.lat, c.lon);
            const mx = (x + hx) / 2, my = Math.min(y, hy) - 30 - Math.abs(x - hx) * 0.16;
            const left = c.name !== "Berlin" && c.name !== "Singapore"; // label sides picked so London and Berlin don't collide
            return (
              <g key={c.name}>
                <path className="draw-in" pathLength={1} d={`M${hx} ${hy} Q ${mx} ${my} ${x} ${y}`} fill="none" stroke="#FF4F1A" strokeWidth="1.6" style={{ transitionDelay: `${i * 150}ms` }} />
                <circle cx={x} cy={y} r="5" fill="#121212" />
                <text x={x + (left ? -10 : 10)} y={y + (left ? -8 : 16)} textAnchor={left ? "end" : "start"} className="mono" fontSize="15" fill="#121212">
                  {c.name}<tspan fillOpacity=".55">{now ? ` ${fmtTime(now, c.tz)}` : ""}</tspan>
                </text>
              </g>
            );
          })}
          <circle cx={hx} cy={hy} r="7" fill="#FF4F1A" />
          <circle cx={hx} cy={hy} r="12" fill="none" stroke="#FF4F1A" strokeWidth="1.5"><animate attributeName="r" values="7;22;7" dur="2.4s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;0;1" dur="2.4s" repeatCount="indefinite" /></circle>
          <text x={hx + 4} y={hy + 28} fontSize="17" fontWeight="700" fill="#121212">Vadodara</text>
        </svg>
      </div>
    </section>
  );
}
