import { site } from "@/lib/site";

type SealProps = {
  size?: number;
  animated?: boolean;
  tone?: "ink" | "gold" | "paper";
  className?: string;
  title?: string;
};

const TONES = {
  ink: { ring: "#0e2a47", pillar: "#0e2a47", flame: "#e87c1e", accent: "#c9a227" },
  gold: { ring: "#c9a227", pillar: "#c9a227", flame: "#e87c1e", accent: "#ddb945" },
  paper: { ring: "#faf7f0", pillar: "#faf7f0", flame: "#e87c1e", accent: "#ddb945" },
} as const;

/**
 * The "Trident Pillar" seal — a stambh (pillar of public service) crowned by
 * three flames for his three seva: property, protection (LIC), paperwork.
 * Pure SVG, ~2KB, draws itself on mount when `animated`.
 */
export function Seal({ size = 64, animated = false, tone = "ink", className = "", title }: SealProps) {
  const c = TONES[tone];
  const draw = animated ? "seal-draw" : "";
  const drawSlow = animated ? "seal-draw-slow" : "";
  const fade = animated ? "seal-fade" : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label={title ?? `${site.name} — seal`}
      className={`group/seal ${animated ? "seal-live" : ""} ${className}`}
    >
      {/* Outer seal rings */}
      <circle cx="60" cy="60" r="57" stroke={c.ring} strokeWidth="1.5" className={drawSlow} />
      <circle
        cx="60" cy="60" r="52"
        stroke={c.accent} strokeWidth="1"
        strokeDasharray="2 4"
        className={draw}
      />

      {/* Pillar base — three ledger steps */}
      <g className={fade}>
        <rect x="38" y="88" width="44" height="4" rx="1" fill={c.pillar} />
        <rect x="43" y="81" width="34" height="4" rx="1" fill={c.pillar} />
        <rect x="48" y="74" width="24" height="4" rx="1" fill={c.pillar} />
      </g>

      {/* Shaft with fluting */}
      <g className={fade}>
        <path d="M52 72 L53.5 42 H66.5 L68 72 Z" fill={c.pillar} />
        <line x1="57.5" y1="45" x2="57" y2="70" stroke={tone === "paper" ? "#0e2a47" : "#faf7f0"} strokeWidth="1.2" opacity="0.55" />
        <line x1="62.5" y1="45" x2="63" y2="70" stroke={tone === "paper" ? "#0e2a47" : "#faf7f0"} strokeWidth="1.2" opacity="0.55" />
        {/* Capital */}
        <rect x="46" y="36" width="28" height="4.5" rx="1.5" fill={c.pillar} />
      </g>

      {/* Three flames — property · protection · paperwork */}
      <g>
        <path
          className={`seal-flame ${fade}`}
          d="M60 14 C64.5 22 66.5 27 60 33.5 C53.5 27 55.5 22 60 14 Z"
          fill={c.flame}
        />
        <path
          className={`seal-flame ${fade}`}
          style={{ animationDelay: "0.3s" }}
          d="M46 22 C49.5 27.5 51 31 46 35.5 C41 31 42.5 27.5 46 22 Z"
          fill={c.accent}
        />
        <path
          className={`seal-flame ${fade}`}
          style={{ animationDelay: "0.6s" }}
          d="M74 22 C77.5 27.5 79 31 74 35.5 C69 31 70.5 27.5 74 22 Z"
          fill={c.accent}
        />
      </g>

      {/* EST 2007 ticks */}
      <g className={fade} opacity="0.9">
        <circle cx="24" cy="60" r="1.6" fill={c.accent} />
        <circle cx="96" cy="60" r="1.6" fill={c.accent} />
      </g>
    </svg>
  );
}

/** Mark + wordmark lockup for header / footer */
export function SealLockup({
  tone = "ink",
  animated = false,
  compact = false,
}: {
  tone?: "ink" | "gold" | "paper";
  animated?: boolean;
  compact?: boolean;
}) {
  const nameColor = tone === "paper" ? "text-paper" : "text-ink-800";
  const subColor = tone === "paper" ? "text-gold-300" : "text-gold-600";
  return (
    <span className="flex items-center gap-2.5">
      <Seal size={compact ? 38 : 46} tone={tone} animated={animated} />
      <span className="flex flex-col leading-tight">
        <span className={`font-display font-bold tracking-wide ${compact ? "text-base" : "text-lg"} ${nameColor}`}>
          Dilipsingh Bhadoriya
        </span>
        <span className={`text-[0.65rem] tracking-[0.22em] uppercase ${subColor}`}>
          Navsari · Est. {site.established}
        </span>
      </span>
    </span>
  );
}
