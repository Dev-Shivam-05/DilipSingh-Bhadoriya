"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SealLockup } from "@/components/brand/Seal";
import { routing } from "@/i18n/routing";

const NAV = [
  { href: "/", key: "home" },
  { href: "/property", key: "property" },
  { href: "/lic", key: "lic" },
  { href: "/documents", key: "documents" },
  { href: "/corporator", key: "corporator" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

const LOCALE_LABEL: Record<string, string> = { gu: "ગુજરાતી", hi: "हिन्दी", en: "English" };

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
        <Link href="/" aria-label="Home" onClick={() => setOpen(false)}>
          <SealLockup compact />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main">
          {NAV.slice(1).map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-gold-600 ${
                pathname.startsWith(item.href) ? "text-gold-600" : "text-ink-800"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
          <LocaleSwitcher current={locale} pathname={pathname} />
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleSwitcher current={locale} pathname={pathname} />
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-ink-800/15"
          >
            <span className={`h-0.5 w-5 bg-ink-800 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink-800 ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink-800 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink-800/10 bg-paper px-4 pb-4 lg:hidden" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-ink-800/5 py-3 text-base font-medium text-ink-800"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function LocaleSwitcher({ current, pathname }: { current: string; pathname: string }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-ink-800/15 p-0.5 text-xs">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={`rounded-full px-2 py-1 font-medium ${
            l === current ? "bg-ink-800 text-paper" : "text-ink-700 hover:text-gold-600"
          }`}
        >
          {LOCALE_LABEL[l]}
        </Link>
      ))}
    </div>
  );
}
