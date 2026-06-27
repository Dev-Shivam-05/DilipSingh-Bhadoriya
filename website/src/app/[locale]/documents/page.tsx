import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { guides, guideCategories } from "@/content/guides";
import { GuideLibrary } from "@/components/documents/GuideLibrary";
import { Container, SectionHeading, Card } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
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
          <h1 className="flex items-center gap-4 font-display text-4xl font-bold sm:text-5xl">
            <Icon name="fileText" className="h-11 w-11 shrink-0" /> {t("documents.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-lg opacity-95">{t("documents.sub")}</p>
        </Container>
      </section>

      <section data-track-section="guide-library" className="py-14">
        <Container>
          <SectionHeading title={t("documents.wizardTitle")} />
          <GuideLibrary
            searchPlaceholder={t("documents.search")}
            categories={guideCategories.map((c) => ({ key: c.key, label: c.label[loc] }))}
            items={guides.map((g) => ({
              slug: g.slug,
              icon: g.icon,
              category: g.category,
              title: g.title[loc],
              intro: g.intro[loc],
            }))}
          />
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
