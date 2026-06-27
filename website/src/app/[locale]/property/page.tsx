import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { db } from "@/lib/db";
import { Container, SectionHeading, Card } from "@/components/ui";
import { ListingCard } from "@/components/property/ListingCard";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PropertyCalculators } from "@/components/property/PropertyCalculators";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "property" });
  return {
    title: `${t("title")} — Plots, Bungalows, Flats | Navsari Real Estate`,
    description: t("sub"),
  };
}

const TYPES = ["all", "plot", "bungalow", "flat", "commercial", "rental"] as const;

export default async function PropertyPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { type } = await searchParams;
  const t = await getTranslations();

  const active = TYPES.includes(type as (typeof TYPES)[number]) ? type : "all";
  const listings = await db.listing.findMany({
    where: active === "all" ? {} : { type: active },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <section className="bg-ink-900 py-14 text-paper">
        <Container>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("property.title")}</h1>
          <p className="mt-3 text-lg text-ink-100">{t("property.sub")}</p>
        </Container>
      </section>

      <section data-track-section="listings-grid" className="py-12">
        <Container>
          <div className="mb-8 flex flex-wrap gap-2">
            {TYPES.map((tp) => (
              <Link
                key={tp}
                href={tp === "all" ? "/property" : `/property?type=${tp}`}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition ${
                  active === tp
                    ? "border-ink-800 bg-ink-800 text-paper"
                    : "border-ink-800/20 text-ink-800 hover:border-gold-500"
                }`}
              >
                {tp === "all" ? t("property.all") : tp}
              </Link>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </Container>
      </section>

      <section data-track-section="calculators" className="bg-white py-14">
        <Container>
          <SectionHeading title={t("property.calcTitle")} />
          <PropertyCalculators />
        </Container>
      </section>

      <section data-track-section="requirement" className="bg-paper-dark py-14">
        <Container>
          <div className="mx-auto max-w-2xl">
            <SectionHeading title={t("property.requirementTitle")} sub={t("property.requirementSub")} />
            <Card>
              <InquiryForm kind="requirement" messageLabel={t("property.lookingFor")}>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-ink-800">{t("property.budget")}</span>
                  <input name="budget" inputMode="numeric" className="w-full rounded-xl border border-ink-800/20 bg-white px-4 py-2.5 outline-none focus:border-gold-500" />
                </label>
              </InquiryForm>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
