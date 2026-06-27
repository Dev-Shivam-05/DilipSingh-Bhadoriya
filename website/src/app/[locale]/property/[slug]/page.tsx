import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/lib/db";
import { site, wa } from "@/lib/site";
import { formatINR } from "@/lib/calculators";
import { Container, Badge, AnchorButton, Card, WhatsAppIcon } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { InquiryForm } from "@/components/forms/InquiryForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = await db.listing.findUnique({ where: { slug } });
  if (!listing) return {};
  return {
    title: `${listing.title} — ${listing.locality}, Navsari`,
    description: listing.description.slice(0, 155),
  };
}

export default async function ListingPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const listing = await db.listing.findUnique({ where: { slug } });
  if (!listing) notFound();

  const title = locale === "gu" && listing.titleGu ? listing.titleGu : listing.title;
  const description = locale === "gu" && listing.descriptionGu ? listing.descriptionGu : listing.description;
  const waMsg = `${t("property.waListing")}${listing.title} (${listing.locality}) — ${site.url}/property/${listing.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.name, item: site.url },
      { "@type": "ListItem", position: 2, name: "Property", item: `${site.url}/property` },
      { "@type": "ListItem", position: 3, name: listing.title },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "INR",
      availability: listing.status === "available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      seller: { "@type": "RealEstateAgent", name: site.name },
    },
  };

  return (
    <section className="py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge color={listing.status === "available" ? "green" : listing.status === "token" ? "gold" : "red"}>
              {listing.status === "available" ? t("common.available") : listing.status === "token" ? t("common.token") : t("common.sold")}
            </Badge>
            {listing.isSample && <Badge color="ink">{t("common.sample")}</Badge>}
            <span className="text-sm capitalize text-ink-700/60">{listing.type}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-800 sm:text-4xl">{title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-ink-700/70">
            <Icon name="mapPin" className="h-4 w-4" /> {listing.locality}, Navsari
          </p>

          {listing.imageUrl && (
            <Image src={listing.imageUrl} alt={title} width={1200} height={675} className="mt-6 w-full rounded-2xl border border-ink-800/10 object-cover" />
          )}

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Card className="!p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-ink-700/60">{t("common.price")}</p>
              <p className="mt-1 text-lg font-bold text-saffron-600">
                {formatINR(listing.price)}{listing.type === "rental" && "/mo"}
              </p>
            </Card>
            {listing.areaSqft && (
              <Card className="!p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-ink-700/60">{t("common.area")}</p>
                <p className="mt-1 text-lg font-bold text-ink-800">{listing.areaSqft.toLocaleString("en-IN")} sq.ft</p>
              </Card>
            )}
            <Card className="!p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-ink-700/60">{t("common.locality")}</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{listing.locality}</p>
            </Card>
          </div>

          <p className="mt-6 leading-relaxed text-ink-800">{description}</p>
        </div>

        <aside className="space-y-5">
          <Card data-track-section="listing-cta">
            <p className="font-display text-lg font-bold text-ink-800">{site.name}</p>
            <p className="mt-1 text-sm text-ink-700/70">{t("property.sub")}</p>
            <div className="mt-4 grid gap-3">
              <AnchorButton href={wa(waMsg)} target="_blank" rel="noopener noreferrer" data-track-cta={`wa-listing-${listing.slug}`}>
                <WhatsAppIcon /> {t("common.whatsapp")}
              </AnchorButton>
              <AnchorButton href={`tel:+${site.phone}`} variant="ink" data-track-cta={`call-listing-${listing.slug}`}>
                <Icon name="phone" className="h-4 w-4" /> {t("common.call")}
              </AnchorButton>
            </div>
          </Card>
          <Card>
            <p className="mb-4 font-semibold text-ink-800">{t("property.requirementTitle")}</p>
            <InquiryForm kind="property" listingId={listing.id} meta={{ listing: listing.slug }} />
          </Card>
        </aside>
      </Container>
    </section>
  );
}
