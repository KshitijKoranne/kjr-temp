import { faqs } from "@/content/site";

const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

export default function FAQ() {
  return (
    <section id="faq" data-bg="#FAF7F0" className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <p className="eyebrow mb-8">FAQ</p>
      <h2 id="faq-title" className="display text-[clamp(2.6rem,7vw,7rem)] font-extrabold">Fair <span className="serif font-normal">questions</span>.</h2>
      <div className="mt-14 border-t-[1.5px] border-ink">
        {faqs.map((f, i) => (
          <details key={f.q} className="group border-b-[1.5px] border-ink" name="faq">
            <summary className="grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 py-6 md:grid-cols-[7rem_1fr_auto] md:py-8">
              <span className="display text-3xl font-extrabold text-ink/30 transition-colors group-open:text-signal-ink md:text-5xl">{String(i + 1).padStart(2, "0")}</span>
              <span className="display text-[clamp(1.35rem,2.8vw,2.6rem)] font-bold leading-tight">{f.q}</span>
              <span aria-hidden className="faq-x mono text-3xl leading-none">+</span>
            </summary>
            <p className="max-w-[60ch] pb-8 pl-[4.5rem] text-lg leading-relaxed md:pl-[8rem]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
