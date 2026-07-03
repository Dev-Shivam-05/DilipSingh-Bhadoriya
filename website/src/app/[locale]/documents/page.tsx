import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { guides, guideCategories } from "@/content/guides";
import { Container, SectionHeading, Card } from "@/components/ui";
import { SevaTracker } from "@/components/documents/SevaTracker";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "documents" });
  return {
    title: `${t("title")} — Government Document Guides in Gujarati, Hindi, English`,
    description: t("sub"),
  };
}

export default async function DocumentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const loc = locale as Locale;

  return (
    <>
      <section className="bg-gradient-to-br from-saffron-600 to-saffron-500 py-14 text-white">
        <Container>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">📄 {t("documents.title")}</h1>
          <p className="mt-3 max-w-2xl text-lg opacity-95">{t("documents.sub")}</p>
        </Container>
      </section>

      <section data-track-section="guide-library" className="py-14">
        <Container>
          <SectionHeading title={t("documents.wizardTitle")} />
          {guideCategories.map((cat) => {
            const items = guides.filter((g) => g.category === cat.key);
            if (!items.length) return null;
            return (
              <div key={cat.key} className="mb-10">
                <h3 className="mb-4 flex items-center gap-3 text-lg font-bold text-ink-800">
                  {cat.label[loc]}
                  <span className="ledger-rule w-24" />
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/documents/${g.slug}`}
                      data-track-cta={`guide-${g.slug}`}
                      className="group flex items-start gap-4 rounded-2xl border border-ink-800/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-seal"
                    >
                      <span className="text-3xl" aria-hidden>{g.emoji}</span>
                      <div>
                        <h4 className="font-semibold leading-snug text-ink-800 group-hover:text-gold-600">
                          {g.title[loc]}
                        </h4>
                        <p className="mt-1 line-clamp-2 text-sm text-ink-700/70">{g.intro[loc]}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section data-track-section="seva-tracker" className="bg-ink-900 py-14 text-paper">
        <Container>
          <div className="mx-auto max-w-2xl">
            <SectionHeading title={t("documents.trackTitle")} sub={t("documents.trackSub")} tone="dark" />
            <SevaTracker />
          </div>
        </Container>
      </section>

      <section data-track-section="seva-request" className="py-14">
        <Container>
          <div className="mx-auto max-w-2xl">
            <SectionHeading title={t("documents.newRequest")} sub={t("documents.helpText")} />
            <Card>
              <SevaRequestFormWrapper />
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}

// Server wrapper keeps the guide list out of the client bundle
import { SevaRequestForm } from "@/components/documents/SevaRequestForm";
function SevaRequestFormWrapper() {
  return <SevaRequestForm docTypes={guides.map((g) => g.slug)} />;
}
