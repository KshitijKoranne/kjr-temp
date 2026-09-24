"use client";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/site";

const places: Record<string, string> = { home: "/", work: "/#work", services: "/#services", about: "/#about", faq: "/#faq", contact: "/#contact", hire: "/#contact", lab: "/lab/", estimate: "/#estimate" };
const commands = ["help", "whoami", "ls projects", "hire", "ship", "clear", "sudo make me a sandwich", ...Object.keys(places).filter((k) => k !== "hire"), ...projects.map((p) => p.name)];

function run(input: string): { out: string[]; go?: string } {
  const c = input.trim().toLowerCase();
  if (!c) return { out: [] };
  if (c === "help") return { out: ["navigate: work · services · about · faq · contact · lab", "projects: type a project name, or `ls projects`", "fun: whoami · ship · hire · clear · sudo make me a sandwich"] };
  if (c === "whoami") return { out: ["visitor@kjr-labs — probably a founder with a spreadsheet problem."] };
  if (c === "ls projects" || c === "ls") return { out: projects.map((p) => `${p.status.padEnd(11)} ${p.slug}`) };
  if (c === "ship") return { out: ["▍ building ... ok", "▍ testing .... ok", "▍ shipping ... done", "(That was the demo. Real shipping starts with a scope call: type `hire`.)"] };
  if (c.startsWith("sudo make me a sandwich")) return { out: ["[sudo] password for visitor: ********", "Okay. sandwich.exe compiled with 0 warnings.", "Delivery is outside our scope. Software is not."] };
  if (c.startsWith("sudo")) return { out: ["visitor is not in the sudoers file. This incident will be reported to Kshitij."] };
  if (places[c]) return { out: [`→ ${places[c]}`], go: places[c] };
  const p = projects.find((x) => x.slug === c || x.name.toLowerCase() === c || x.name.toLowerCase().startsWith(c));
  if (p) return { out: [`→ opening ${p.name}`], go: `/work/${p.slug}/` };
  return { out: [`command not found: ${c}. Type \`help\`.`] };
}

export default function Palette() {
  const dlg = useRef<HTMLDialogElement>(null);
  const [q, setQ] = useState("");
  const [log, setLog] = useState<string[]>(["KJR Labs shell. Type `help`."]);

  useEffect(() => {
    const open = () => { if (!dlg.current?.open) dlg.current?.showModal(); };
    const key = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input, textarea, select, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) { e.preventDefault(); open(); }
    };
    addEventListener("keydown", key);
    addEventListener("palette", open);
    return () => { removeEventListener("keydown", key); removeEventListener("palette", open); };
  }, []);

  const exec = (cmd: string) => {
    if (cmd.trim().toLowerCase() === "clear") { setLog([]); setQ(""); return; }
    const r = run(cmd);
    setLog((l) => [...l, `$ ${cmd}`, ...r.out].slice(-40));
    setQ("");
    if (r.go) setTimeout(() => { dlg.current?.close(); location.href = r.go!; }, 250);
  };

  const hints = q ? commands.filter((c) => c.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : [];

  return (
    <dialog ref={dlg} className="palette on-dark m-auto w-[min(640px,92vw)] rounded-2xl bg-ink p-0 text-bone shadow-[0_30px_80px_rgb(0_0_0/.4)]" aria-label="Command palette">
      <form onSubmit={(e) => { e.preventDefault(); exec(q); }} className="mono text-sm">
        <div className="max-h-[40vh] overflow-y-auto px-5 pt-5" aria-live="polite">
          {log.map((l, i) => <p key={i} className={l.startsWith("$") ? "text-signal" : "opacity-80"}>{l}</p>)}
        </div>
        <label className="flex items-center gap-2 border-t border-white/15 px-5 py-4">
          <span className="text-signal" aria-hidden>❯</span>
          <span className="sr-only">Command</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 bg-transparent outline-none placeholder:text-bone/50" placeholder="type a command or a page…" autoFocus autoComplete="off" spellCheck={false} />
          <kbd className="text-xs opacity-60">esc</kbd>
        </label>
        {hints.length > 0 && (
          <ul className="flex flex-wrap gap-2 px-5 pb-4">
            {hints.map((h) => (
              <li key={h}><button type="button" onClick={() => exec(h)} className="rounded-md bg-white/10 px-2 py-1 hover:bg-signal hover:text-ink">{h}</button></li>
            ))}
          </ul>
        )}
      </form>
    </dialog>
  );
}
