import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui";
import { Icon, type IconName } from "@/components/ui/icons";
import { formatINR } from "@/lib/calculators";
import type { Listing } from "@prisma/client";

const TYPE_ICON: Record<string, IconName> = {
  plot: "map", bungalow: "home", flat: "building", commercial: "store", rental: "key",
};

export function ListingCard({ listing }: { listing: Listing }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const title = locale === "gu" && listing.titleGu ? listing.titleGu : listing.title;
  const statusColor = listing.status === "available" ? "green" : listing.status === "token" ? "gold" : "red";
  const statusLabel = listing.status === "available" ? t("available") : listing.status === "token" ? t("token") : t("sold");

  return (
    <Link
      href={`/property/${listing.slug}`}
      className="group overflow-hidden rounded-2xl border border-ink-800/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-seal"
      data-track-cta={`listing-${listing.slug}`}
    >
      <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-ink-50 to-gold-100">
        {listing.imageUrl ? (
          <Image src={listing.imageUrl} alt={title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
        ) : (
          <Icon name={TYPE_ICON[listing.type] ?? "home"} className="h-16 w-16 text-ink-600/50" strokeWidth={1.5} />
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge color={statusColor}>{statusLabel}</Badge>
          {listing.isSample && <Badge color="ink">{t("sample")}</Badge>}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-ink-800 group-hover:text-gold-600">{title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-700/70">
          <Icon name="mapPin" className="h-3.5 w-3.5" /> {listing.locality}, Navsari
        </p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xl font-bold text-saffron-600">
            {formatINR(listing.price)}
            {listing.type === "rental" && <span className="text-sm font-normal text-ink-700/60">/mo</span>}
          </p>
          {listing.areaSqft && <p className="text-sm text-ink-700/70">{listing.areaSqft.toLocaleString("en-IN")} sq.ft</p>}
        </div>
      </div>
    </Link>
  );
}
