import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Gujarati } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ConsentTracker } from "@/components/analytics/ConsentTracker";
import { GlobalJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const gujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gujarati",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tagline = site.tagline[locale as keyof typeof site.tagline] ?? site.tagline.en;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — Real Estate, LIC & Document Seva in Navsari`,
      template: `%s | ${site.name}`,
    },
    description: tagline,
    alternates: {
      languages: { gu: "/", hi: "/hi", en: "/en", "x-default": "/" },
    },
    openGraph: {
      siteName: site.name,
      locale,
      type: "website",
      images: [{ url: "/images/portrait.webp", width: 667, height: 731, alt: site.name }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} ${gujarati.variable}`}>
      <body className="flex min-h-screen flex-col">
        <GlobalJsonLd />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
          <ConsentTracker />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
