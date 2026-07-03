import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { db } from "@/lib/db";
import { site } from "@/lib/site";
import { Container, SectionHeading, Card, Badge } from "@/components/ui";
import { CivicIssueForm } from "@/components/corporator/CivicIssueForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "corporator" });
  return {
    title: `${t("title")} — Navsari Vijalpore | Raise & Track Civic Issues`,
    description: t("raiseSub"),
  };
}

export default async function CorporatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("corporator");

  const issues = await db.civicIssue.findMany({
    where: { public: true },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  const STATUS_BADGE: Record<string, "ink" | "gold" | "green"> = {
    received: "ink",
    in_progress: "gold",
    resolved: "green",
  };
  const CAT_EMOJI: Record<string, string> = {
    streetlight: "💡", drainage: "🌊", road: "🛣️", water: "🚰", garbage: "🗑️", other: "📋",
  };

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 py-14 text-paper">
        <Container className="relative grid items-center gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">🏛️ {t("title")}</h1>
            <p className="mt-3 max-w-2xl text-lg text-ink-100">{t("sub")}</p>
            <div className="mt-6 rounded-2xl border border-gold-500/30 bg-ink-900/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-300">🤝 {t("officeHours")}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-100/85">{t("officeText")}</p>
            </div>
          </div>
          <div className="arch-frame mx-auto hidden w-60 border-4 border-gold-500/40 lg:block">
            <Image src="/images/flag.webp" alt={site.name} width={480} height={640} className="h-72 w-full object-cover object-top" />
          </div>
        </Container>
      </section>

      <section data-track-section="civic-form" className="py-14">
        <Container>
          <div className="mx-auto max-w-2xl">
            <SectionHeading title={t("raiseTitle")} sub={t("raiseSub")} />
            <Card>
              <CivicIssueForm />
            </Card>
          </div>
        </Container>
      </section>

      <section data-track-section="civic-board" className="bg-paper-dark py-14">
        <Container>
          <SectionHeading title={t("boardTitle")} sub={t("boardSub")} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <Card key={issue.id} className="!p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-2xl" aria-hidden>{CAT_EMOJI[issue.category] ?? "📋"}</span>
                  <Badge color={STATUS_BADGE[issue.status] ?? "ink"}>
                    {t(`status.${issue.status}` as never)}
                  </Badge>
                </div>
                <p className="mt-3 font-semibold text-ink-800">{t(`cat.${issue.category}` as never)}</p>
                <p className="text-sm text-ink-700/70">📍 {issue.area}</p>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-800">{issue.details}</p>
                {issue.note && (
                  <p className="mt-3 border-t border-ink-800/10 pt-2 text-xs italic text-emerald-700">✓ {issue.note}</p>
                )}
                <p className="mt-2 font-mono text-[10px] text-ink-700/50">
                  {issue.token} · {issue.createdAt.toLocaleDateString("en-IN")}
                </p>
              </Card>
            ))}
          </div>
          {issues.length === 0 && <p className="text-center text-ink-700/60">—</p>}
        </Container>
      </section>
    </>
  );
}
