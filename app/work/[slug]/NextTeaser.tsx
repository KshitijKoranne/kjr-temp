"use client";
import { useRef } from "react";
import { useScrollProgress } from "@/lib/hooks";

// The next project's colour block grows to fill the screen as you reach it.
export default function NextTeaser({ slug, name, color }: { slug: string; name: string; color: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useScrollProgress(ref);
  return (
    <a ref={ref} href={`/work/${slug}/`} data-bg="#FAF7F0" className="no-print relative grid h-[90svh] place-items-center overflow-hidden" data-cursor="Next">
      <span aria-hidden className="absolute inset-0" style={{ background: color, clipPath: "inset(calc((1 - clamp(0, var(--p, 0) * 1.8, 1)) * 30%) round calc((1 - clamp(0, var(--p, 0) * 1.8, 1)) * 40px))" }} />
      <span className="relative text-center">
        <span className="mono block text-xs">Next project</span>
        <span className="display mt-3 block text-[clamp(3rem,12vw,12rem)] font-extrabold" style={{ viewTransitionName: `title-${slug}` }}>{name} ↗</span>
      </span>
    </a>
  );
}
