import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { db } from "@/lib/db";
import { site, wa, yearsOfService } from "@/lib/site";
import { guides } from "@/content/guides";
import { Seal } from "@/components/brand/Seal";
import { Container, SectionHeading, ButtonLink, AnchorButton, Card, WhatsAppIcon } from "@/components/ui";
import { Counter } from "@/components/home/Counter";
import { ListingCard } from "@/components/property/ListingCard";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const loc = locale as Locale;

  const [featured, testimonials] = await Promise.all([
    db.listing.findMany({ where: { featured: true }, take: 3, orderBy: { createdAt: "desc" } }),
    db.testimonial.findMany({ where: { approved: true }, take: 6, orderBy: { createdAt: "desc" } }),
  ]);
  const popularGuides = guides.filter((g) => g.popular).slice(0, 4);

  const doors = [
    { key: "property", href: "/property", emoji: "🏡", grad: "from-ink-800 to-ink-600" },
    { key: "lic", href: "/lic", emoji: "🛡️", grad: "from-gold-600 to-gold-500" },
    { key: "documents", href: "/documents", emoji: "📄", grad: "from-saffron-600 to-saffron-500" },
    { key: "corporator", href: "/corporator", emoji: "🏛️", grad: "from-ink-700 to-ink-600" },
  ] as const;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section data-track-section="hero" className="relative overflow-hidden bg-ink-950 text-paper">
        <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-500 blur-[140px]" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-saffron-500 blur-[140px]" />
        </div>
        <Container className="relative grid min-h-[82vh] items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <Seal size={72} tone="gold" animated />
              <p className="text-sm uppercase tracking-[0.3em] text-gold-300">{t("hero.since")}</p>
            </div>
            <p className="text-lg text-gold-300">{t("hero.namaste")}</p>
            <h1 className="mt-1 font-display text-5xl font-bold leading-tight sm:text-6xl">
              {t("hero.name")}
            </h1>
            <p className="mt-4 max-w-xl text-xl leading-relaxed text-ink-100">{t("hero.tagline")}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-100/70">{t("hero.sub")}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <AnchorButton
                href={wa(t("hero.waMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                data-track-cta="hero-whatsapp"
              >
                <WhatsAppIcon /> {t("hero.ctaPrimary")}
              </AnchorButton>
              <ButtonLink href="/documents" variant="outline" className="!text-paper !border-paper/30 hover:!border-gold-400 hover:!text-gold-300" data-track-cta="hero-services">
                {t("hero.ctaSecondary")}
              </ButtonLink>
            </div>
          </div>
          <div className="relative mx-auto hidden max-w-md lg:block">
            <div className="absolute inset-x-8 bottom-0 top-12 rounded-t-full border border-gold-500/30" aria-hidden />
            <Image
              src="/images/hero.webp"
              alt={site.name}
              width={597}
              height={688}
              priority
              className="relative drop-shadow-[0_20px_50px_rgba(201,162,39,0.15)]"
            />
          </div>
        </Container>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section data-track-section="stats" className="border-b border-ink-800/10 bg-paper-dark">
        <Container className="grid grid-cols-2 gap-8 py-12 text-center md:grid-cols-4">
          {[
            { to: yearsOfService(), key: "years" },
            { to: 4000, key: "families" },
            { to: 10000, key: "documents" },
            { to: 850, key: "deals" },
          ].map((s) => (
            <div key={s.key}>
              <p className="font-display text-4xl font-bold text-ink-800">
                <Counter to={s.to} />
              </p>
              <p className="mt-1 text-sm text-ink-700/70">{t(`stats.${s.key}`)}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* ── FOUR DOORS ───────────────────────────────────────── */}
      <section data-track-section="doors" className="py-16">
        <Container>
          <SectionHeading title={t("doors.title")} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {doors.map((d) => (
              <Link
                key={d.key}
                href={d.href}
                data-track-cta={`door-${d.key}`}
                className={`group rounded-2xl bg-gradient-to-br p-6 text-paper shadow-lg transition-transform hover:-translate-y-1.5 ${d.grad}`}
              >
                <span className="text-4xl" aria-hidden>{d.emoji}</span>
                <h3 className="mt-4 font-display text-xl font-bold">{t(`doors.${d.key}.title`)}</h3>
                <p className="mt-2 min-h-12 text-sm leading-relaxed opacity-85">{t(`doors.${d.key}.desc`)}</p>
                <p className="mt-4 text-sm font-semibold text-gold-300 group-hover:underline">
                  {t(`doors.${d.key}.cta`)} →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── LATEST LISTINGS ──────────────────────────────────── */}
      <section data-track-section="listings" className="bg-white py-16">
        <Container>
          <div className="flex items-end justify-between">
            <SectionHeading title={t("home.latestListings")} />
            <Link href="/property" className="mb-8 shrink-0 text-sm font-semibold text-gold-600 hover:underline">
              {t("home.viewAll")} →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── TRUST + PHOTO ────────────────────────────────────── */}
      <section data-track-section="trust" className="bg-ink-900 py-16 text-paper">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="arch-frame mx-auto max-w-sm border-4 border-gold-500/50">
            <Image src="/images/counselling.webp" alt="Dilipsingh Bhadoriya helping residents with documents" width={800} height={360} className="h-full w-full object-cover" style={{ aspectRatio: "4/5", objectPosition: "20% center" }} />
          </div>
          <div>
            <SectionHeading title={t("home.trustTitle")} tone="dark" />
            <ul className="space-y-5">
              {(["trust1", "trust2", "trust3"] as const).map((k) => (
                <li key={k} className="flex items-start gap-4">
                  <Seal size={30} tone="gold" />
                  <p className="text-lg text-ink-100">{t(`home.${k}`)}</p>
                </li>
              ))}
            </ul>
            <a
              href={site.justdial}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full border border-gold-500/40 px-5 py-2 text-sm text-gold-300 hover:bg-gold-500/10"
            >
              ✓ {t("home.verified")} ↗
            </a>
          </div>
        </Container>
      </section>

      {/* ── POPULAR GUIDES ───────────────────────────────────── */}
      <section data-track-section="guides" className="py-16">
        <Container>
          <div className="flex items-end justify-between">
            <SectionHeading title={t("home.guides")} />
            <Link href="/documents" className="mb-8 shrink-0 text-sm font-semibold text-gold-600 hover:underline">
              {t("home.viewAll")} →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/documents/${g.slug}`}
                data-track-cta={`guide-${g.slug}`}
                className="rounded-2xl border border-ink-800/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-gold-400 hover:shadow-seal"
              >
                <span className="text-3xl" aria-hidden>{g.emoji}</span>
                <h3 className="mt-3 font-semibold leading-snug text-ink-800">{g.title[loc]}</h3>
                <p className="mt-3 text-sm font-semibold text-gold-600">{t("common.readGuide")} →</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section data-track-section="testimonials" className="bg-paper-dark py-16">
        <Container>
          <SectionHeading title={t("home.testimonials")} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((tm) => (
              <Card key={tm.id} className="flex flex-col">
                <p className="flex-1 leading-relaxed text-ink-800">“{tm.message}”</p>
                <div className="mt-4 border-t border-ink-800/10 pt-3">
                  <p className="font-semibold text-ink-800">{tm.name}</p>
                  <p className="text-xs text-ink-700/60">
                    {tm.locality} · {t(`nav.${tm.service === "civic" ? "corporator" : tm.service}` as never)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
