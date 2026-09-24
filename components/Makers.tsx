import { people } from "@/content/site";

// ponytail: duotone SVG stand-in portrait. Drop a real photo in with `filter: grayscale(1) contrast(1.1)` + mix-blend-multiply over Bone to keep the style.
const Portrait = () => (
  <svg viewBox="0 0 400 500" className="size-full" aria-hidden>
    <rect width="400" height="500" fill="#121212" />
    <circle cx="200" cy="190" r="86" fill="#F2EFE8" />
    <path d="M60 500 C 70 360, 150 300, 200 300 S 330 360, 340 500 Z" fill="#F2EFE8" />
    <rect width="400" height="500" fill="url(#dots)" opacity=".35" />
    <defs><pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.2" fill="#121212" /></pattern></defs>
  </svg>
);

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
          <div className="size-full transition-transform duration-[var(--t-slow)] ease-[var(--e-snappy)] group-hover:scale-105"><Portrait /></div>
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
