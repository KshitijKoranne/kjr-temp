"use client";
import { useRef } from "react";
import { brand, contact, nav, social } from "@/content/site";
import { fmtTime, useInView, useNow } from "@/lib/hooks";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref);
  const now = useNow(1000);

  return (
    <footer id="site-footer" data-bg="#121212" className="on-dark relative overflow-hidden bg-ink px-5 pb-10 pt-20 text-bone md:px-10">
      <div ref={ref} className={`relative pb-[2.4vw] ${seen ? "fall" : ""}`}>
        <p className="display text-[clamp(6rem,30vw,30rem)] font-extrabold leading-[0.8]" aria-label="Ship it.">
          <span aria-hidden className="block">SHIP</span>
          <span aria-hidden className="block tracking-[0.04em]">IT.<span className="fall-caret caret" /></span>
        </p>
        <i aria-hidden className="horizon absolute bottom-0 left-0 block h-[6px] w-full origin-right bg-signal" />
        {/* The caret falls over, becomes the horizon, and something ships. */}
        <span aria-hidden className="sail absolute bottom-[6px] left-0 block w-full">
          <span className="sail-boat block w-[clamp(44px,4.6vw,72px)]">
            <svg viewBox="0 0 72 44" className="block w-full overflow-visible">
              <g className="smoke" fill="#F2EFE8">{[0, 1, 2].map((k) => <circle key={k} cx={44 - k * 7} cy={6 - k * 3} r={2.6 + k} style={{ animationDelay: `${k * 0.5}s` }} />)}</g>
              <rect x="40" y="10" width="7" height="12" rx="1.5" fill="#F2EFE8" /><rect x="40" y="12" width="7" height="2.5" fill="#FF4F1A" />
              <rect x="20" y="17" width="30" height="10" rx="2" fill="#FF4F1A" />
              {[26, 34, 42].map((x) => <rect key={x} x={x} y="20" width="4" height="4" rx="1" fill="#121212" />)}
              <path d="M4 27h64l-9 15H13Z" fill="#F2EFE8" />
            </svg>
          </span>
        </span>
      </div>

      <div className="mt-16 grid gap-10 text-sm md:grid-cols-4">
        <div>
          <p className="display text-lg font-bold">{brand.name}</p>
          <p className="opacity-70">{brand.descriptor}</p>
          <p className="mt-4 opacity-80">Vadodara, Gujarat, India</p>
          <a className="u block w-fit" href={`mailto:${contact.email.value}`}>{contact.email.value}</a>
          <a className="u block w-fit" href={`https://wa.me/${contact.whatsapp.number}`} target="_blank" rel="noopener">WhatsApp {contact.whatsapp.display}</a>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-1.5">
            {[...nav, { label: "Contact", href: "/#contact" }, { label: "Privacy", href: "/privacy/" }].map((l) => <li key={l.href}><a className="u" href={l.href}>{l.label}</a></li>)}
          </ul>
        </nav>
        <ul className="space-y-1.5">
          {social.filter((s) => !s.placeholder).map((s) => <li key={s.label}><a className="u" href={s.href} target="_blank" rel="noopener">{s.label} ↗</a></li>)}
        </ul>
        <div className="mono space-y-1.5 text-xs">
          <p>IST {now ? fmtTime(now, contact.tz) : "—"}</p>
          <p className="opacity-80">{contact.hours[0].days}, {contact.hours[0].time}</p>
        </div>
      </div>
      <p className="mono mt-16 text-xs opacity-60">© {new Date().getFullYear()} KJR Labs. All rights reserved.</p>
    </footer>
  );
}
