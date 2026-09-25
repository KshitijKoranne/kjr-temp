import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand, projects } from "@/content/site";
import { Showcase } from "@/components/Device";
import NextTeaser from "./NextTeaser";

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug)!;
  return { title: p.name, description: p.tagline, alternates: { canonical: `/work/${p.slug}/` }, openGraph: { title: `${p.name} | KJR Labs`, description: p.tagline, url: `/work/${p.slug}/` } };
}

export default async function Case({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const ld = { "@context": "https://schema.org", "@type": "CreativeWork", name: p.name, description: p.tagline, url: `${brand.url}/work/${p.slug}/`, dateCreated: String(p.year), creator: { "@type": "Organization", name: brand.name }, keywords: p.stack.join(", ") };

  return (
    <article className="case">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header data-bg={p.color} className="px-5 pb-16 pt-32 md:px-10" style={{ background: p.color }}>
        <p className="mono text-xs">{p.platforms.join(" · ")} · {p.stack.join(" · ").toUpperCase()} · {p.status} · {p.year}</p>
        <h1 className="display mt-6 text-[clamp(3.4rem,13vw,13rem)] font-extrabold" style={{ viewTransitionName: `title-${p.slug}` }}>{p.name}</h1>
        <p className="mt-4 max-w-[40ch] text-xl md:text-2xl">{p.tagline}</p>
        <div className="mt-6 flex gap-5 text-sm font-semibold">
          {p.liveUrl && <a className="u" href={p.liveUrl} target="_blank" rel="noopener">Open live ↗</a>}
          {p.repoUrl && <a className="u" href={p.repoUrl} target="_blank" rel="noopener">Source ↗</a>}
        </div>
        <div className="mt-12 aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_0_0_1.5px_var(--color-ink)]" style={{ viewTransitionName: `media-${p.slug}` }}><Showcase p={p} /></div>
      </header>

      <div data-bg="#FAF7F0" className="space-y-24 px-5 py-24 md:px-10">
        <section className="grid gap-6 md:grid-cols-[14rem_1fr]">
          <h2 className="mono text-sm">01 · The brief</h2>
          <p className="display max-w-[28ch] text-[clamp(1.8rem,3.6vw,3.2rem)] font-bold leading-tight">{p.problem}</p>
        </section>

        <section className="grid gap-6 md:grid-cols-[14rem_1fr]">
          <h2 className="mono text-sm">02 · The build</h2>
          <div>
            <p className="max-w-[60ch] text-lg leading-relaxed">{p.approach}</p>
            <ul className="mono mt-6 flex flex-wrap gap-2 text-xs">{p.stack.map((s) => <li key={s} className="rounded-full px-3 py-1.5 shadow-[inset_0_0_0_1.5px_var(--color-ink)]">{s}</li>)}</ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[14rem_1fr]">
          <h2 className="mono text-sm">03 · The result</h2>
          <div>
            <p className="text-xl">{p.outcome}</p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {p.metrics.map((m) => (
                <div key={m.label} className="flex flex-col border-t-[1.5px] border-ink pt-4">
                  <dt className="mono text-xs">{m.label}</dt>
                  <dd className="display order-first text-4xl font-extrabold">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[14rem_1fr]">
          <h2 className="mono text-sm">04 · What comes next</h2>
          <p className="max-w-[56ch] text-lg leading-relaxed">{p.next}</p>
        </section>
      </div>

      <NextTeaser slug={next.slug} name={next.name} color={next.color} />
    </article>
  );
}
