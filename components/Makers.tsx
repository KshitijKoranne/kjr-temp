import { people } from "@/content/site";

export default function Makers() {
  const p = people[0];
  return (
    <section id="about" data-bg="#F2EFE8" className="overflow-hidden px-5 py-24 md:px-10 md:py-36" aria-labelledby="about-title">
      <p className="eyebrow mb-8">About</p>
      <h2 id="about-title" className="display max-w-[16ch] text-[clamp(2.6rem,7vw,7rem)] font-extrabold">A founder who <span className="serif font-normal">obsesses</span> over the details.</h2>

      <article className="group relative mt-20 grid items-end gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16">
        <p aria-hidden className="display outline-text pointer-events-none absolute -top-[0.55em] left-0 z-0 whitespace-nowrap text-[clamp(5rem,17vw,17rem)] font-extrabold opacity-50 transition-transform duration-[var(--t-slow)] ease-[var(--e-snappy)] group-hover:translate-x-[3%]">
          {p.first}
        </p>
        <div className="relative z-10 ml-[6%] aspect-[4/5] w-[82%] overflow-hidden rounded-sm">
          <div className="size-full transition-transform duration-[var(--t-slow)] ease-[var(--e-snappy)] group-hover:scale-105"><img src="/kshitij.jpg" alt={p.name} width={800} height={1000} className="size-full object-cover" /></div>
          <p aria-hidden className="serif absolute right-3 top-4 z-20 max-w-[9em] rotate-[-6deg] text-right text-2xl leading-tight text-signal md:text-3xl">{p.note}</p>
        </div>
        <div className="relative z-10 max-w-[52ch] pb-2">
          <h3 className="display text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold leading-none">{p.name}</h3>
          <p className="mono mt-3 text-sm">{p.role}</p>
          <p className="mt-6 text-lg leading-relaxed">{p.bio}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {p.facts.map((f) => <li key={f} className="mono rounded-full px-3 py-1.5 text-xs shadow-[inset_0_0_0_1.5px_var(--color-ink)]">{f}</li>)}
          </ul>
        </div>
      </article>
    </section>
  );
}
