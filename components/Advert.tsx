"use client";
import { useRef, useState } from "react";

// ponytail: native <video>, loads nothing until play. One overlay button, then the browser's own controls.
export default function Advert() {
  const v = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const play = () => { setOn(true); v.current?.play(); };

  return (
    <section data-bg="#FAF7F0" className="px-5 py-20 md:px-10 md:py-28" aria-labelledby="advert-title">
      <div className="mx-auto max-w-[1200px]">
        <p className="eyebrow mb-6">The short version</p>
        <h2 id="advert-title" className="display mb-10 text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold">
          From scribble to <span className="serif font-normal">shipped</span>, in 38 seconds.
        </h2>
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink shadow-[0_0_0_2px_var(--color-ink)]">
          <video ref={v} className="size-full" src="/advert.mp4" poster="/advert-poster.webp" preload="none" playsInline controls={on} onEnded={() => setOn(false)}>
            A 38-second video about how KJR Labs builds apps.
          </video>
          {!on && (
            <button onClick={play} data-cursor="Play" aria-label="Play the KJR Labs video, 38 seconds, with sound" className="group absolute inset-0 grid place-items-center">
              <span className="grid size-20 place-items-center rounded-full bg-signal text-ink transition-transform duration-(--t-base) ease-(--e-spring) group-hover:scale-110 md:size-28">
                <svg aria-hidden viewBox="0 0 24 24" className="ml-1 size-8 md:size-11"><path d="M7 4.5v15l13-7.5Z" fill="currentColor" /></svg>
              </span>
              <span className="mono absolute bottom-4 left-4 rounded-md bg-ink px-2 py-1 text-xs text-bone">0:38 · sound on</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
