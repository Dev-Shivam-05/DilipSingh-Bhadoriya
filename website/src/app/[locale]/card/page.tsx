import Image from "next/image";
import type { Metadata } from "next";
import QRCode from "qrcode";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Seal } from "@/components/brand/Seal";
import { AnchorButton, WhatsAppIcon } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { site, wa } from "@/lib/site";
import { ShareCardButton } from "./ShareCardButton";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Digital Visiting Card", description: `${site.name} — ${site.tagline.en}` };
}

export default async function CardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("card");

  // QR → the card itself; scans from his printed cards/office board land here
  const qr = await QRCode.toDataURL(`${site.url}/card`, {
    margin: 1,
    width: 480,
    color: { dark: "#0e2a47", light: "#faf7f0" },
  });

  return (
    <section className="flex min-h-[85vh] items-center justify-center bg-ink-950 px-4 py-16">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-gold-500/40 bg-gradient-to-b from-ink-900 to-ink-950 text-center shadow-2xl">
        <div className="border-b border-gold-500/20 bg-ink-900/60 py-6">
          <Seal size={72} tone="gold" animated className="mx-auto" />
        </div>
        <div className="px-8 py-6">
          <Image
            src="/images/portrait.webp"
            alt={site.name}
            width={112}
            height={112}
            className="mx-auto h-28 w-28 rounded-full border-2 border-gold-500 object-cover object-top"
          />
          <h1 className="mt-4 font-display text-2xl font-bold text-paper">{site.name}</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold-300">{t("roles")}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-100/80">
            {site.address.street},<br />
            {site.address.locality}, {site.address.city} — {site.address.pin}
          </p>
          <p className="mt-2 text-lg font-semibold text-gold-300">{site.phoneDisplay}</p>

          <div className="mt-6 grid gap-3">
            <AnchorButton href={wa("Namaste Dilipsingh bhai 🙏")} target="_blank" rel="noopener noreferrer" data-track-cta="card-whatsapp">
              <WhatsAppIcon /> WhatsApp
            </AnchorButton>
            <AnchorButton href={`tel:+${site.phone}`} variant="gold" data-track-cta="card-call">
              <Icon name="phone" className="h-4 w-4" /> {site.phoneDisplay}
            </AnchorButton>
            <AnchorButton href="/api/vcard" variant="outline" className="!border-paper/30 !text-paper hover:!border-gold-400" data-track-cta="card-vcard">
              <Icon name="download" className="h-4 w-4" /> {t("save")}
            </AnchorButton>
            <ShareCardButton label={t("share")} />
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 rounded-2xl border border-gold-500/20 bg-paper/5 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- data URI QR */}
            <img src={qr} alt="QR code — scan to open this card" className="h-24 w-24 rounded-lg border border-gold-500/40" />
            <p className="max-w-40 text-left text-xs leading-relaxed text-ink-100/70">
              Scan → save contact.
              <br />
              Print-ready for visiting cards.
            </p>
          </div>
        </div>
        <p className="border-t border-gold-500/20 bg-ink-900/60 py-3 text-[10px] uppercase tracking-[0.25em] text-gold-500/70">
          Est. {site.established} · Navsari
        </p>
      </div>
    </section>
  );
}
