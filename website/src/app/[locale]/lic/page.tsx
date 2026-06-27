import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { LicTools } from "@/components/lic/LicTools";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lic" });
  return {
    title: `${t("title")} — LIC Agent in Navsari | Plans, Premium Calculator`,
    description: t("sub"),
  };
}

export default async function LicPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <section className="bg-gradient-to-br from-ink-900 to-ink-700 py-14 text-paper">
        <Container>
          <h1 className="flex items-center gap-4 font-display text-4xl font-bold sm:text-5xl">
            <Icon name="shield" className="h-11 w-11 shrink-0 text-gold-300" /> {t("lic.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-100">{t("lic.sub")}</p>
        </Container>
      </section>

      <section data-track-section="lic-tools" className="py-14">
        <Container>
          <LicTools />
        </Container>
      </section>

      <section data-track-section="lic-claims" className="bg-ink-950 py-16 text-paper">
        <Container className="grid items-center gap-10 lg:grid-cols-[300px_1fr]">
          <div className="arch-frame mx-auto w-64 border-4 border-gold-500/40">
            <Image
              src="/images/namaste.webp"
              alt="Dilipsingh Bhadoriya"
              width={500}
              height={640}
              className="h-80 w-full object-cover object-top"
            />
          </div>
          <div>
            <SectionHeading title={t("lic.claimsTitle")} tone="dark" />
            <p className="max-w-2xl text-lg leading-relaxed text-ink-100">{t("lic.claimsText")}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
