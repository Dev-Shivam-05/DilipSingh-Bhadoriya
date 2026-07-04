"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icons";

/** Share a guide to WhatsApp (the distribution rail of Navsari) or copy the link. */
export function ShareGuide({ title, url, shareLabel }: { title: string; url: string; shareLabel: string }) {
  const [copied, setCopied] = useState(false);
  const waShare = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <a
        href={waShare}
        target="_blank"
        rel="noopener noreferrer"
        data-track-cta="guide-share-whatsapp"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        <Icon name="share" className="h-4 w-4" /> {shareLabel}
      </a>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(url).catch(() => {});
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        data-track-cta="guide-copy-link"
        className="inline-flex items-center gap-2 rounded-full border border-ink-800/20 px-5 py-2.5 text-sm font-semibold text-ink-800 transition hover:border-gold-500"
      >
        <Icon name={copied ? "check" : "clipboardList"} className="h-4 w-4" />
        {copied ? "✓" : "Copy link"}
      </button>
    </div>
  );
}
