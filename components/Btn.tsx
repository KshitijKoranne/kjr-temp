// Magnetic pill button: label slides up to a copy, arrow exits and re-enters.
type Props = { href: string; children: string; variant?: "solid" | "ghost" | "light"; onClick?: () => void; external?: boolean; arrow?: boolean; className?: string };

export default function Btn({ href, children, variant = "solid", onClick, external, arrow = true, className = "" }: Props) {
  return (
    <a href={href} onClick={onClick} data-magnetic className={`btn btn-${variant} ${className}`} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
      <span className="btn-l"><span>{children}</span><span aria-hidden>{children}</span></span>
      {arrow && <span className="btn-a" aria-hidden>↗</span>}
    </a>
  );
}
