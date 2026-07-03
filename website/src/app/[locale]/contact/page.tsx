import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, SectionHeading, AnchorButton, Card, WhatsAppIcon } from "@/components/ui";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { site, wa } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("sub") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <section className="py-16">
      <Container>
        <SectionHeading title={t("contact.title")} sub={t("contact.sub")} />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <Card>
              <h2 className="font-display text-lg font-bold text-ink-800">📍 {t("contact.office")}</h2>
              <p className="mt-2 leading-relaxed text-ink-700/85">
                {site.address.street},<br />
                {site.address.locality}, {site.address.city}, {site.address.state} — {site.address.pin}
              </p>
              <p className="mt-2 text-sm text-ink-700/70">🕘 {t("contact.hours")}</p>
            </Card>
            <div className="flex flex-wrap gap-3">
              <AnchorButton href={wa(t("hero.waMessage"))} target="_blank" rel="noopener noreferrer" data-track-cta="contact-whatsapp">
                <WhatsAppIcon /> {t("common.whatsapp")}
              </AnchorButton>
              <AnchorButton href={`tel:+${site.phone}`} variant="ink" data-track-cta="contact-call">
                📞 {t("common.call")}
              </AnchorButton>
            </div>
            <iframe
              title="Office location map"
              src={`https://www.google.com/maps?q=${encodeURIComponent("Shivaji Chowk, Vijalpore, Navsari, Gujarat")}&output=embed`}
              className="h-64 w-full rounded-2xl border border-ink-800/10"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <Card data-track-section="contact-form">
            <h2 className="mb-4 font-display text-lg font-bold text-ink-800">{t("contact.form")}</h2>
            <InquiryForm kind="general" />
          </Card>
        </div>
      </Container>
    </section>
  );
}
