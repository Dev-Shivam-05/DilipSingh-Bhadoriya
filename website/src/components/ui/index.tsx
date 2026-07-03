import Link from "next/link";
import type { ReactNode, ComponentProps } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow && (
        <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${tone === "dark" ? "text-gold-300" : "text-gold-600"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl font-bold sm:text-4xl ${tone === "dark" ? "text-paper" : "text-ink-800"}`}>
        {title}
      </h2>
      {sub && <p className={`mt-3 text-base ${tone === "dark" ? "text-ink-100" : "text-ink-700/80"}`}>{sub}</p>}
      <div className="ledger-rule mt-5 w-40" />
    </div>
  );
}

const BTN_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0";
const BTN_STYLES = {
  primary: `${BTN_BASE} bg-saffron-500 text-white shadow-lg shadow-saffron-500/25 hover:bg-saffron-600`,
  ink: `${BTN_BASE} bg-ink-800 text-paper hover:bg-ink-700`,
  outline: `${BTN_BASE} border border-ink-800/25 text-ink-800 hover:border-gold-500 hover:text-gold-600`,
  gold: `${BTN_BASE} bg-gold-500 text-ink-900 hover:bg-gold-400`,
} as const;

type BtnVariant = keyof typeof BTN_STYLES;

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: BtnVariant; className?: string }) {
  return <Link {...props} className={`${BTN_STYLES[variant]} ${className}`} />;
}

export function AnchorButton({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: BtnVariant }) {
  return <a {...props} className={`${BTN_STYLES[variant]} ${className}`} />;
}

export function Badge({ children, color = "gold" }: { children: ReactNode; color?: "gold" | "green" | "red" | "ink" | "saffron" }) {
  const colors = {
    gold: "bg-gold-100 text-gold-600 border-gold-300",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red: "bg-red-50 text-red-600 border-red-200",
    ink: "bg-ink-50 text-ink-700 border-ink-100",
    saffron: "bg-saffron-100 text-saffron-600 border-saffron-500/30",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${colors[color]}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-ink-800/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-seal ${className}`}>
      {children}
    </div>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.38-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}
