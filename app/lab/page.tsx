import type { Metadata } from "next";
import { labNotes } from "@/content/site";

export const metadata: Metadata = { title: "Lab notes", description: "Short, dated build-in-public notes from KJR Labs.", alternates: { canonical: "/lab/" } };

export default function Lab() {
  return (
    <section data-bg="#FAF7F0" className="graph min-h-svh px-5 pb-24 pt-36 md:px-10">
      <p className="eyebrow">Lab notes</p>
      <h1 className="display mt-6 text-[clamp(3rem,10vw,10rem)] font-extrabold">Lab <span className="serif font-normal">notes</span>.</h1>
      <ol className="mt-16 max-w-[900px] border-t-[1.5px] border-ink">
        {labNotes.map((n, i) => (
          <li key={n.date} className="grid gap-3 border-b-[1.5px] border-ink py-8 md:grid-cols-[10rem_1fr]">
            <p className="mono text-sm"><time dateTime={n.date}>{n.date}</time><br /><span className="opacity-60">NOTE-{String(labNotes.length - i).padStart(3, "0")}</span></p>
            <div>
              <h2 className="display text-3xl font-bold">{n.title}</h2>
              <p className="mt-3 max-w-[60ch] text-lg leading-relaxed">{n.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
