"use client";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/site";

const lines = ["> booting kjr-labs.local", `> loading projects ............ ${projects.length} found`, "> compiling ideas ............. ok", "> ready"];

export default function Preloader() {
  const [gone, setGone] = useState(false);
  const caret = useRef<HTMLSpanElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("booted")) {
      setGone(true);
      dispatchEvent(new Event("booted"));
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      sessionStorage.setItem("booted", "1");
      const from = caret.current?.getBoundingClientRect();
      const to = document.getElementById("logo-caret")?.getBoundingClientRect();
      const end = () => { html.classList.add("booted"); setGone(true); dispatchEvent(new Event("booted")); };
      if (!from || !to || !caret.current) return end();
      // The final caret flies to the nav logo and becomes its caret.
      caret.current.animate(
        [{ transform: "none" }, { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.height / from.height})` }],
        { duration: 520, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" },
      );
      root.current?.animate([{ backgroundColor: "#121212" }, { backgroundColor: "rgba(18,18,18,0)" }], { duration: 520, fill: "forwards" });
      root.current?.querySelector("pre")?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
      setTimeout(end, 520);
    };
    const t = setTimeout(finish, 1050);
    addEventListener("keydown", finish);
    addEventListener("pointerdown", finish);
    return () => { clearTimeout(t); removeEventListener("keydown", finish); removeEventListener("pointerdown", finish); };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="mono relative text-sm leading-7 md:text-base">
        <pre className="font-[inherit] whitespace-pre">
          {lines.map((l, i) => (
            <span key={l} className="boot-line" style={{ "--i": i } as React.CSSProperties}>
              {l}
              {i === lines.length - 1 && <span className="caret invisible" />}
            </span>
          ))}
        </pre>
        {/* Real caret sits outside the clipped lines so it can fly to the logo. */}
        <span ref={caret} className="caret absolute" style={{ marginTop: "-1.55em", marginLeft: "7.2ch", height: "1.1em", width: ".55em" }} />
      </div>
    </div>
  );
}
