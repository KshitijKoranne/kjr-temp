import type { Project } from "@/content/site";

type CSS = React.CSSProperties;
const src = (slug: string, k: string) => `/work/${slug}/${k}.webp`;

// iPhone 16 Pro proportions (402 × 874 pt). Everything inside scales with the phone's own width (cqw).
function StatusBar({ bg, light }: { bg: string; light?: boolean }) {
  const c = light ? "#fff" : "#000";
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex h-[13.7cqw] items-center justify-between pl-[11cqw] pr-[8.5cqw] pt-[1.4cqw]" style={{ background: bg, color: c }}>
      <span className="text-[4.3cqw] font-semibold tracking-tight" style={{ fontFamily: "-apple-system, 'SF Pro Text', var(--font-sans)" }}>9:41</span>
      <svg viewBox="0 0 66 12" className="h-[3cqw]" fill={c} aria-hidden>
        <rect x="0" y="8" width="3" height="4" rx="1" /><rect x="4.5" y="5.5" width="3" height="6.5" rx="1" /><rect x="9" y="3" width="3" height="9" rx="1" /><rect x="13.5" y="0" width="3" height="12" rx="1" />
        <path d="M29 3.2a9 9 0 0 1 11.6 0l-1.3 1.4a7 7 0 0 0-9 0L29 3.2Zm2.6 2.8a5.2 5.2 0 0 1 6.4 0l-1.3 1.4a3.3 3.3 0 0 0-3.8 0L31.6 6Zm3.2 2.7 1.5 1.6-1.5 1.6-1.5-1.6 1.5-1.6Z" transform="translate(-4 0)" />
        <rect x="42" y="0.5" width="21" height="11" rx="3.2" fill="none" stroke={c} strokeOpacity=".4" /><rect x="44" y="2.5" width="16" height="7" rx="1.6" /><rect x="64" y="4" width="1.6" height="4" rx=".8" fillOpacity=".4" />
      </svg>
    </div>
  );
}

export function Phone({ slug, shot, bar, dark, lock, className = "", style }: { slug: string; shot: string; bar?: string; dark?: boolean; lock?: boolean; className?: string; style?: CSS }) {
  return (
    <div className={`aspect-[402/874] [container-type:inline-size] ${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} ${className}`} style={style} aria-hidden>
      {/* side buttons */}
      <i className="absolute -left-[.9cqw] top-[18%] h-[5%] w-[1.2cqw] rounded-l bg-[#4a4a4e]" />
      <i className="absolute -left-[.9cqw] top-[26%] h-[9%] w-[1.2cqw] rounded-l bg-[#4a4a4e]" />
      <i className="absolute -left-[.9cqw] top-[37%] h-[9%] w-[1.2cqw] rounded-l bg-[#4a4a4e]" />
      <i className="absolute -right-[.9cqw] top-[29%] h-[13%] w-[1.2cqw] rounded-r bg-[#4a4a4e]" />
      <div className="absolute inset-0 rounded-[16cqw] p-[1.1cqw] shadow-[0_40px_80px_-30px_rgb(0_0_0/.55)]" style={{ background: "linear-gradient(145deg,#8d8a86 0%,#3b3a39 22%,#6f6c69 50%,#2e2d2c 78%,#8a8783 100%)" }}>
        <div className="size-full rounded-[15cqw] bg-black p-[3.3cqw]">
          <div className="relative size-full overflow-hidden rounded-[11.8cqw]" style={{ background: bar ?? "#000" }}>
            {bar && !lock && <StatusBar bg={bar} light={dark} />}
            <img src={src(slug, shot)} alt="" width={780} height={1691} loading="lazy" decoding="async" className="absolute inset-x-0 w-full" style={{ top: bar && !lock ? "13.7cqw" : 0 }} />
            {lock && (
              <>
                <StatusBar bg="transparent" light />
                <div className="absolute inset-x-0 top-[17cqw] text-center text-white">
                  <p className="text-[4.4cqw] font-semibold opacity-90">Tuesday 4 July</p>
                  <p className="display text-[23cqw] font-bold leading-[1.05] tracking-[-0.02em]" style={{ fontVariationSettings: '"wdth" 75' }}>9:41</p>
                </div>
              </>
            )}
            <i className="absolute left-1/2 top-[2.9cqw] z-20 h-[9.2cqw] w-[31cqw] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Browser({ slug, shot, url, className = "", style }: { slug: string; shot: string; url?: string; className?: string; style?: CSS }) {
  return (
    <div className={`overflow-hidden rounded-[10px] bg-[#F4F2EE] shadow-[0_0_0_1px_rgb(18_18_18/.18),0_40px_80px_-30px_rgb(0_0_0/.5)] ${className}`} style={style} aria-hidden>
      <div className="flex items-center gap-[6px] border-b border-black/10 px-3 py-2">
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <i key={c} className="size-[9px] rounded-full" style={{ background: c }} />)}
        {url && <span className="mx-auto flex items-center gap-1.5 rounded-md bg-black/[.06] px-3 py-[3px] text-[10px] text-black/60"><svg viewBox="0 0 10 12" className="h-2" fill="currentColor"><path d="M2 5V3.5a3 3 0 0 1 6 0V5h.5A1.5 1.5 0 0 1 10 6.5v4A1.5 1.5 0 0 1 8.5 12h-7A1.5 1.5 0 0 1 0 10.5v-4A1.5 1.5 0 0 1 1.5 5H2Zm1.5 0h3V3.5a1.5 1.5 0 0 0-3 0V5Z" /></svg>{url}</span>}
        {url && <i className="w-[33px]" />}
      </div>
      <img src={src(slug, shot)} alt="" width={1800} height={1125} loading="lazy" decoding="async" className="block w-full" />
    </div>
  );
}

// Project media on its colour: a browser with a phone, or three phones fanned out.
export function Showcase({ p }: { p: Project }) {
  const s = p.shots;
  return (
    <div className="grain relative size-full overflow-hidden [container-type:inline-size]" style={{ background: p.color }} role="img" aria-label={`${p.name} screenshots`}>
      {s.d ? (
        <>
          <Browser slug={p.slug} shot={s.d} url={p.url} className="absolute left-[6cqw] top-[9cqw] w-[74cqw]" />
          <Phone slug={p.slug} shot={s.p[0]} bar={s.bar} dark={s.dark} lock={s.lock} className="absolute bottom-[-9cqw] right-[7cqw] w-[21cqw]" />
        </>
      ) : (
        s.p.slice(0, 3).map((k, i) => (
          <Phone
            key={k} slug={p.slug} shot={k} bar={s.bar} dark={s.dark}
            className="absolute top-1/2 w-[23cqw]"
            style={{ left: `${[16, 38.5, 61][i]}cqw`, transform: `translateY(${[-44, -50, -44][i]}%) rotate(${[-6, 0, 6][i]}deg) scale(${i === 1 ? 1.08 : 0.94})`, zIndex: i === 1 ? 2 : 1 }}
          />
        ))
      )}
    </div>
  );
}
