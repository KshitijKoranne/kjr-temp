"use client";
import { useEffect, useState } from "react";
import { contact } from "@/content/site";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = new Set<Element>();
    let past = false;
    const sync = () => setShow(past && seen.size === 0);
    const io = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target))); sync(); });
    ["contact", "site-footer"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const on = () => { past = scrollY > innerHeight * 0.8; sync(); };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", on); };
  }, []);

  const hide = show ? "" : "pointer-events-none translate-y-[160%] opacity-0";
  return (
    <div className="no-print">
      <a href="/#contact" data-magnetic className={`group fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full bg-ink py-4 pl-6 pr-5 font-display font-semibold text-bone shadow-[0_0_0_1.5px_rgb(242_239_232/.22),0_12px_40px_rgb(18_18_18/.25)] transition-[transform,opacity] duration-[var(--t-base)] md:flex ${hide}`} tabIndex={show ? 0 : -1} aria-hidden={!show}>
        Start a Project<span className="caret" />
        <span className="grid max-w-0 overflow-hidden whitespace-nowrap text-sm font-normal opacity-0 transition-all duration-[var(--t-base)] group-hover:max-w-[16rem] group-hover:opacity-80 group-focus-visible:max-w-[16rem] group-focus-visible:opacity-80">Reply within 1 working day</span>
      </a>
      <div className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 bg-bone/95 px-3 pt-2 shadow-[0_-1px_0_var(--color-ink)] transition-[transform,opacity] duration-[var(--t-base)] md:hidden ${hide}`} style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }} aria-hidden={!show}>
        <a href="/#contact" tabIndex={show ? 0 : -1} className="rounded-full bg-ink py-3 text-center font-display font-semibold text-bone">Start a Project</a>
        <a href={`https://wa.me/${contact.whatsapp.number}`} tabIndex={show ? 0 : -1} target="_blank" rel="noopener" className="rounded-full py-3 text-center font-display font-semibold shadow-[inset_0_0_0_1.5px_var(--color-ink)]">WhatsApp</a>
      </div>
    </div>
  );
}
