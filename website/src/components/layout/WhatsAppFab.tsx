"use client";

import { useTranslations } from "next-intl";
import { wa } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui";

/** Floating WhatsApp button — the primary lead rail. */
export function WhatsAppFab() {
  const t = useTranslations("hero");

  return (
    <a
      href={wa(t("waMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      data-track-cta="whatsapp-fab"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
