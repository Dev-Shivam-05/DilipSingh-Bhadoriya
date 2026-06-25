import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { guides } from "@/content/guides";
import { db } from "@/lib/db";
import { routing } from "@/i18n/routing";

const STATIC_PATHS = ["", "/property", "/lic", "/documents", "/corporator", "/about", "/contact", "/card"];

function localizedUrl(path: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${site.url}${prefix}${path}`;
}

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(path, routing.defaultLocale),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(path, l)])),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await db.listing.findMany({ select: { slug: true, updatedAt: true } }).catch(() => []);

  return [
    ...STATIC_PATHS.map((p) => entry(p, p === "" ? 1 : 0.8, "weekly" as const)),
    ...guides.map((g) => entry(`/documents/${g.slug}`, 0.9, "monthly" as const)),
    ...listings.map((l) => ({
      ...entry(`/property/${l.slug}`, 0.7, "weekly" as const),
      lastModified: l.updatedAt,
    })),
  ];
}
