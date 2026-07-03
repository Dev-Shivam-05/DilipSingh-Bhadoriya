import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, SectionHeading, Card } from "@/components/ui";
import { Seal } from "@/components/brand/Seal";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("sub") };
}

const TIMELINE_PHOTOS = ["/images/portrait.webp", "/images/speaking.webp", "/images/counselling.webp", "/images/victory.webp", "/images/namaste.webp"];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const timeline = t.raw("timeline") as { year: string; title: string; text: string }[];
  const values = t.raw("values") as { title: string; text: string }[];

  return (
    <>
      <section className="bg-ink-950 py-16 text-paper">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <Seal size={64} tone="gold" animated />
            <h1 className="mt-6 font-display text-4xl font-bold sm:text-5xl">{t("title")}</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-100">{t("sub")}</p>
          </div>
          <div className="arch-frame mx-auto hidden w-64 border-4 border-gold-500/50 lg:block">
            <Image src="/images/portrait.webp" alt={site.name} width={667} height={731} className="h-80 w-full object-cover object-top" />
          </div>
        </Container>
      </section>

      <section data-track-section="timeline" className="py-16">
        <Container>
          <ol className="relative mx-auto max-w-3xl border-l-2 border-gold-500/40 pl-8">
            {timeline.map((item, i) => (
              <li key={item.year} className="relative mb-12 last:mb-0">
                <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-gold-500 bg-paper text-[10px] font-bold text-gold-600" aria-hidden>
                  ✦
                </span>
                <p className="font-display text-3xl font-bold text-gold-600">{item.year}</p>
                <div className="mt-3 grid gap-6 sm:grid-cols-[1fr_180px]">
                  <div>
                    <h2 className="text-xl font-bold text-ink-800">{item.title}</h2>
                    <p className="mt-2 leading-relaxed text-ink-700/85">{item.text}</p>
                  </div>
                  {TIMELINE_PHOTOS[i] && (
                    <Image
                      src={TIMELINE_PHOTOS[i]}
                      alt={item.title}
                      width={360}
                      height={270}
                      className="h-32 w-full rounded-xl border border-ink-800/10 object-cover object-top shadow-sm"
                    />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section data-track-section="values" className="bg-paper-dark py-16">
        <Container>
          <SectionHeading title={t("valuesTitle")} />
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title}>
                <Seal size={36} />
                <h3 className="mt-4 font-display text-lg font-bold text-ink-800">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700/85">{v.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section data-track-section="gallery" className="py-16">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {["swami", "bouquet", "stage", "garland"].map((img) => (
              <Image
                key={img}
                src={`/images/${img}.webp`}
                alt={`${site.name} — community moments`}
                width={400}
                height={400}
                className="h-48 w-full rounded-2xl border border-ink-800/10 object-cover shadow-sm transition-transform hover:scale-[1.02]"
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
