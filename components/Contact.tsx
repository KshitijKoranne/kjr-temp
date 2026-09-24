"use client";
import { useEffect, useRef, useState } from "react";
import { budgets, contact, projectTypes } from "@/content/site";

const labels: Record<string, string> = { name: "Name", email: "Email", company: "Company (optional)", country: "Country", type: "What are you building?", budget: "Budget range (optional)", timeline: "Timeline", message: "Message" };
const msgs: Record<string, string> = { name: "Enter your name.", email: "Enter a valid email, like name@company.com.", country: "Enter your country.", type: "Choose what you are building.", timeline: "Choose a timeline.", message: "Tell us a little about the problem (20 characters or more)." };

const input = "peer w-full rounded-lg bg-paper px-4 pb-2.5 pt-6 text-base shadow-[inset_0_0_0_1.5px_var(--color-ink)] outline-none transition-shadow focus:shadow-[inset_4px_0_0_var(--color-signal),inset_0_0_0_1.5px_var(--color-ink)] aria-[invalid=true]:shadow-[inset_0_0_0_2px_var(--color-signal-ink)]";
const float = "pointer-events-none absolute left-4 top-4 origin-left text-base opacity-70 transition-transform duration-[var(--t-fast)] peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-75";

function F({ name, type = "text", required = true, auto, err }: { name: string; type?: string; required?: boolean; auto?: string; err?: string }) {
  return (
    <div className="relative">
      <input id={`f-${name}`} name={name} type={type} required={required} placeholder=" " autoComplete={auto} className={input} aria-invalid={!!err} aria-describedby={err ? `e-${name}` : undefined} />
      <label htmlFor={`f-${name}`} className={float}>{labels[name]}</label>
      {err && <p id={`e-${name}`} className="mt-1.5 text-sm font-medium text-signal-ink">{err}</p>}
    </div>
  );
}
function S({ name, opts, required = true, err }: { name: string; opts: string[]; required?: boolean; err?: string }) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className="mono mb-1.5 block text-xs">{labels[name]}</label>
      <select id={`f-${name}`} name={name} required={required} defaultValue="" className={input.replace("pt-6", "pt-2.5")} aria-invalid={!!err} aria-describedby={err ? `e-${name}` : undefined}>
        <option value="" disabled={required}>{required ? "Choose one" : "Prefer not to say"}</option>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
      {err && <p id={`e-${name}`} className="mt-1.5 text-sm font-medium text-signal-ink">{err}</p>}
    </div>
  );
}


export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [scope, setScope] = useState("");
  const [status, setStatus] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ scope?: string; type?: string }>).detail;
      if (d.scope) setScope(d.scope);
      if (d.type && form.current) (form.current.elements.namedItem("type") as HTMLSelectElement).value = d.type;
    };
    addEventListener("prefill", on);
    return () => removeEventListener("prefill", on);
  }, []);

  const build = () => {
    const d = new FormData(form.current!);
    const lines = Object.keys(labels).filter((k) => k !== "message").map((k) => `${labels[k].replace(" (optional)", "")}: ${d.get(k) || "—"}`);
    return `New project enquiry\n\n${lines.join("\n")}${scope ? `\nEstimator scope: ${scope}` : ""}\n\nMessage:\n${d.get("message")}`;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    Array.from(form.current!.elements).forEach((el) => {
      const f = el as HTMLInputElement;
      if (f.name && !f.checkValidity()) e[f.name] = msgs[f.name] ?? f.validationMessage;
    });
    setErrors(e);
    if (Object.keys(e).length) (form.current!.elements.namedItem(Object.keys(e)[0]) as HTMLElement).focus();
    return !Object.keys(e).length;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return setStatus("Some fields need attention.");
    const body = build();
    setSummary(body);
    setStatus("Your email app is opening with the enquiry. If nothing happens, use WhatsApp below.");
    location.href = `mailto:${contact.email.value}?subject=${encodeURIComponent("Project enquiry — KJR Labs")}&body=${encodeURIComponent(body)}`;
  };
  const whatsapp = () => {
    if (!validate()) return setStatus("Some fields need attention.");
    open(`https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(build())}`, "_blank", "noopener");
  };

  return (
    <section id="contact" data-bg="#F2EFE8" className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="contact-title">
      <p className="eyebrow mb-8">Contact</p>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 id="contact-title" className="display text-[clamp(2.6rem,6.4vw,6.4rem)] font-extrabold">Tell us the <span className="serif font-normal">problem</span>.</h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed">This sends an enquiry. We reply within one working day (IST) to set up a scope call.</p>
        </div>
        <form ref={form} noValidate onSubmit={submit} className="grid gap-5 md:grid-cols-2">
          <F name="name" auto="name" err={errors.name} />
          <F name="email" type="email" auto="email" err={errors.email} />
          <F name="company" required={false} auto="organization" />
          <F name="country" auto="country-name" err={errors.country} />
          <S name="type" opts={projectTypes} err={errors.type} />
          <S name="timeline" opts={["ASAP", "1–3 months", "3+ months", "Exploring"]} err={errors.timeline} />
          <div className="md:col-span-2"><S name="budget" opts={budgets} required={false} /></div>
          <div className="relative md:col-span-2">
            <textarea id="f-message" name="message" required minLength={20} rows={5} placeholder=" " className={`${input} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined} />
            <label htmlFor="f-message" className={float}>{labels.message}</label>
            {errors.message && <p id="e-message" className="mt-1.5 text-sm font-medium text-signal-ink">{errors.message}</p>}
          </div>
          <input type="hidden" name="scope" value={scope} />
          {scope && <p className="mono rounded-lg bg-sage p-3 text-xs md:col-span-2">Scope from estimator: {scope} <button type="button" className="u ml-2" onClick={() => setScope("")}>remove</button></p>}
          <div className="flex flex-wrap items-center gap-3 md:col-span-2">
            <button type="submit" className="btn btn-solid" data-magnetic>
              <span className="btn-l"><span>Send enquiry by email</span><span aria-hidden>Send enquiry by email</span></span>
              <span className="btn-a" aria-hidden>↗</span>
            </button>
            <button type="button" onClick={whatsapp} className="btn btn-ghost" data-magnetic>
              <span className="btn-l"><span>Send via WhatsApp instead</span><span aria-hidden>Send via WhatsApp instead</span></span>
            </button>
          </div>
          <p role="status" className="text-sm md:col-span-2">{status}</p>
          {summary && <pre className="mono whitespace-pre-wrap rounded-lg bg-paper p-4 text-xs md:col-span-2">{summary}</pre>}
        </form>
      </div>
    </section>
  );
}
