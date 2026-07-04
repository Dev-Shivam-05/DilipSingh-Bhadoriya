"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Icon, type IconName } from "@/components/ui/icons";

export type GuideListItem = {
  slug: string;
  icon: IconName;
  title: string;
  intro: string;
  category: string;
};

/** Searchable, filterable guide library (client-side, instant). */
export function GuideLibrary({
  items,
  categories,
  searchPlaceholder,
}: {
  items: GuideListItem[];
  categories: { key: string; label: string }[];
  searchPlaceholder: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (g) => g.title.toLowerCase().includes(q) || g.intro.toLowerCase().includes(q) || g.slug.includes(q),
    );
  }, [items, query]);

  return (
    <div>
      <div className="relative mb-10 max-w-xl">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/50">
          <Icon name="helpCircle" className="h-5 w-5" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          data-track-cta="guide-search"
          className="w-full rounded-full border border-ink-800/20 bg-white py-3.5 pl-12 pr-5 shadow-sm outline-none transition focus:border-gold-500 focus:shadow-seal"
        />
      </div>

      {categories.map((cat) => {
        const catItems = filtered.filter((g) => g.category === cat.key);
        if (!catItems.length) return null;
        return (
          <div key={cat.key} className="mb-10">
            <h3 className="mb-4 flex items-center gap-3 text-lg font-bold text-ink-800">
              {cat.label}
              <span className="ledger-rule w-24" />
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catItems.map((g) => (
                <Link
                  key={g.slug}
                  href={`/documents/${g.slug}`}
                  data-track-cta={`guide-${g.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border border-ink-800/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-seal"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-saffron-100 text-saffron-600">
                    <Icon name={g.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h4 className="font-semibold leading-snug text-ink-800 group-hover:text-gold-600">{g.title}</h4>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-700/70">{g.intro}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-ink-800/20 p-8 text-center text-ink-700/60">
          — {query} —
        </p>
      )}
    </div>
  );
}
