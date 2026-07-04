import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { guides, getGuide } from "@/content/guides";
import { site, wa } from "@/lib/site";
import { Container, Card, AnchorButton, WhatsAppIcon } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { Seal } from "@/components/brand/Seal";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const loc = locale as Locale;
  return {
    title: guide.title[loc],
    description: guide.intro[loc].slice(0, 155),
  };
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const guide = getGuide(slug);
  if (!guide) notFound();
  const t = await getTranslations("documents");
  const loc = locale as Locale;

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title[loc],
    description: guide.intro[loc],
    inLanguage: loc,
    step: guide.steps[loc].map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s })),
  };
  const faqJsonLd = guide.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((f) => ({
          "@type": "Question",
          name: f.q[loc],
          acceptedAnswer: { "@type": "Answer", text: f.a[loc] },
        })),
      }
    : null;

  return (
    <article className="py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-600">
            <Icon name={guide.icon} className="h-9 w-9" />
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-ink-800 sm:text-4xl">
            {guide.title[loc]}
          </h1>
          <div className="ledger-rule my-6 w-40" />
          <p className="text-lg leading-relaxed text-ink-800">{guide.intro[loc]}</p>

          <h2 className="mt-10 flex items-center gap-3 font-display text-2xl font-bold text-ink-800">
            <Icon name="listChecks" className="h-6 w-6 text-gold-600" /> {t("steps")}
          </h2>
          <ol className="mt-5 space-y-4">
            {guide.steps[loc].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-800 font-display text-sm font-bold text-gold-300">
                  {i + 1}
                </span>
                <p className="pt-1 leading-relaxed text-ink-800">{step}</p>
              </li>
            ))}
          </ol>

          {guide.faqs.length > 0 && (
            <>
              <h2 className="mt-10 flex items-center gap-3 font-display text-2xl font-bold text-ink-800">
                <Icon name="helpCircle" className="h-6 w-6 text-gold-600" /> {t("faqs")}
              </h2>
              <div className="mt-4 space-y-4">
                {guide.faqs.map((f, i) => (
                  <details key={i} className="rounded-2xl border border-ink-800/10 bg-white p-5 shadow-sm">
                    <summary className="cursor-pointer font-semibold text-ink-800">{f.q[loc]}</summary>
                    <p className="mt-3 leading-relaxed text-ink-700/85">{f.a[loc]}</p>
                  </details>
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="space-y-5">
          <Card data-track-section="guide-checklist">
            <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-ink-800">
              <Icon name="clipboardCheck" className="h-5 w-5 text-gold-600" /> {t("checklist")}
            </h2>
            <ul className="mt-3 space-y-2">
              {guide.documents[loc].map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-ink-800">
                  <span className="mt-0.5 text-gold-600">▢</span> {d}
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-ink-800/10 pt-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-700/70">{t("fees")}</dt>
                <dd className="text-right font-medium text-ink-800">{guide.fees[loc]}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-700/70">{t("time")}</dt>
                <dd className="text-right font-medium text-ink-800">{guide.time[loc]}</dd>
              </div>
              <div>
                <dt className="text-ink-700/70">{t("office")}</dt>
                <dd className="mt-1 font-medium leading-relaxed text-ink-800">{guide.office[loc]}</dd>
              </div>
            </dl>
          </Card>

          <div className="rounded-2xl bg-ink-900 p-6 text-paper" data-track-section="guide-help">
            <Seal size={40} tone="gold" />
            <h2 className="mt-3 font-display text-lg font-bold">{t("helpTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-100/85">{t("helpText")}</p>
            <AnchorButton
              href={wa(`${t("waHelp")}${guide.title.en} — ${site.url}/documents/${guide.slug}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full"
              data-track-cta={`wa-guide-${guide.slug}`}
            >
              <WhatsAppIcon /> WhatsApp
            </AnchorButton>
          </div>
        </aside>
      </Container>
    </article>
  );
}
