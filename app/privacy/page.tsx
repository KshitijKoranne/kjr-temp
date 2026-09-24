import type { Metadata } from "next";
import { contact } from "@/content/site";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy/" } };

export default function Privacy() {
  return (
    <section data-bg="#FAF7F0" className="min-h-svh px-5 pb-24 pt-36 md:px-10">
      <h1 className="display text-[clamp(3rem,9vw,8rem)] font-extrabold">Privacy.</h1>
      <div className="mt-10 max-w-[60ch] space-y-4 text-lg leading-relaxed">
        <p>This website has no cookies, no analytics and no tracking scripts.</p>
        <p>The contact form does not send data to a server. It opens your own email app or WhatsApp with a message you can read before you send it.</p>
        <p>If you email us, we use your details only to reply to you. Ask us to delete them at any time: <a className="u font-semibold" href={`mailto:${contact.email.value}`}>{contact.email.value}</a>.</p>
      </div>
    </section>
  );
}
