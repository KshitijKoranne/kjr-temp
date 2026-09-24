// Motion tokens. One place, no directive, so the server layout can inline them.
export const T = { fast: 180, base: 320, slow: 700, hero: 1100 } as const;
export const EASE = { snappy: "cubic-bezier(.2,.9,.1,1)", soft: "cubic-bezier(.65,0,.35,1)", spring: "cubic-bezier(.34,1.56,.64,1)" } as const;
export const STAGGER = { char: 30, line: 80, block: 120 } as const;

export const tokenCss = `:root{--t-fast:${T.fast}ms;--t-base:${T.base}ms;--t-slow:${T.slow}ms;--t-hero:${T.hero}ms;--e-snappy:${EASE.snappy};--e-soft:${EASE.soft};--e-spring:${EASE.spring};--s-char:${STAGGER.char}ms;--s-line:${STAGGER.line}ms;--s-block:${STAGGER.block}ms}`;

