"use client";
import { useEffect, useRef, useState } from "react";
import { contact, nav } from "@/content/site";
import { fmtTime, useNow } from "@/lib/hooks";

export default function Nav() {
  const [pill, setPill] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [bar, setBar] = useState({ x: 0, w: 0 });
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});
  const menu = useRef<HTMLDialogElement>(null);
  const now = useNow(15000);

  useEffect(() => {
    let last = scrollY;
    const on = () => {
      const y = scrollY;
      setPill(y > 60);
      if (y < 300) setActive("");
      if (y - last > 14 && y > 500) setHidden(true); // fast scroll down
      else if (last - y > 4) setHidden(false);
      last = y;
    };
    addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ["work", "services", "about", "faq"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { removeEventListener("scroll", on); io.disconnect(); };
  }, []);

  useEffect(() => {
    const el = links.current[active];
    setBar(el ? { x: el.offsetLeft, w: el.offsetWidth } : { x: 0, w: 0 });
  }, [active, pill]);

  const close = () => menu.current?.close();

  return (
    <>
      <header
        className="nav-in no-print fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 transition-transform duration-[var(--t-base)]"
        style={{ transform: hidden ? "translateY(-140%)" : "none", paddingTop: "max(12px, env(safe-area-inset-top))" }}
      >
        <nav
          aria-label="Main"
          className={`flex w-full items-center justify-between gap-6 transition-[max-width,border-radius,background-color,padding,box-shadow] duration-[var(--t-slow)] ease-[var(--e-snappy)] ${
            pill ? "max-w-[820px] rounded-full bg-paper px-3 py-2 pl-5 shadow-[0_0_0_1.5px_var(--color-ink)]" : "max-w-[1600px] rounded-none bg-transparent px-3 py-3 md:px-6"
          }`}
        >
          <a href="/" className="display text-xl font-extrabold tracking-tight" data-cursor="Home" aria-label="KJR Labs home">
            KJR LABS<span id="logo-caret" className="caret" aria-hidden />
          </a>
          <div className="relative hidden items-center gap-6 md:flex">
            {nav.map((l) => {
              const id = l.href.split("#")[1] ?? l.href; // page links never match a section id
              return (
                <a key={l.href} ref={(el) => { links.current[id] = el; }} href={l.href} className="text-[15px] font-medium" aria-current={active === id ? "true" : undefined}>
                  {l.label}
                </a>
              );
            })}
            <span aria-hidden className="absolute -bottom-1.5 h-[3px] bg-signal transition-all duration-[var(--t-base)] ease-[var(--e-snappy)]" style={{ left: bar.x, width: bar.w, opacity: bar.w ? 1 : 0 }} />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => dispatchEvent(new Event("palette"))} className="mono hidden rounded-md px-2 py-1 text-xs shadow-[inset_0_0_0_1px_currentColor] lg:block" aria-label="Open command palette" data-cursor="Type">
              ⌘K
            </button>
            <a href="/#contact" className="btn btn-solid max-md:!hidden !py-3 !text-[15px]" data-magnetic>
              <span className="btn-l"><span>Start a Project</span><span aria-hidden>Start a Project</span></span>
            </a>
            <button onClick={() => menu.current?.showModal()} className="mono rounded-full bg-ink px-4 py-2.5 text-xs text-bone md:hidden" aria-haspopup="dialog">
              MENU
            </button>
          </div>
        </nav>
      </header>

      <dialog ref={menu} className="menu" aria-label="Menu" onClick={(e) => e.target === menu.current && close()}>
        <div className="flex h-full flex-col px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))]">
          <div className="flex items-center justify-between">
            <span className="display text-xl font-extrabold">KJR LABS<span className="caret !bg-ink" /></span>
            <button onClick={close} className="mono rounded-full bg-ink px-4 py-2.5 text-xs text-bone" autoFocus>CLOSE</button>
          </div>
          <ul className="mt-10 flex flex-1 flex-col justify-center gap-1">
            {[...nav, { label: "Contact", href: "/#contact" }].map((l, i) => (
              <li key={l.href} className="menu-link" style={{ "--i": i } as React.CSSProperties}>
                <a href={l.href} onClick={close} className="display flex items-baseline gap-3 text-[16vw] font-extrabold leading-[0.95]">
                  <span className="mono text-sm font-normal">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mono flex flex-wrap items-end justify-between gap-3 text-sm">
            <div>
              <p>Vadodara · {now ? fmtTime(now, contact.tz) : "--:--"} IST</p>
              <a href={`mailto:${contact.email.value}`} className="u">{contact.email.value}</a>
            </div>
            <a href={`https://wa.me/${contact.whatsapp.number}`} className="btn btn-solid !text-sm" target="_blank" rel="noopener">
              <span className="btn-l"><span>WhatsApp</span><span aria-hidden>WhatsApp</span></span>
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
