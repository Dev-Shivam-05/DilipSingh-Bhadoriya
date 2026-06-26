"use client";

import { site } from "@/lib/site";
import { Icon } from "@/components/ui/icons";

export function ShareCardButton({ label }: { label: string }) {
  async function share() {
    const url = `${location.origin}/card`;
    if (navigator.share) {
      await navigator.share({ title: site.name, text: site.tagline.en, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  }
  return (
    <button
      onClick={share}
      data-track-cta="card-share"
      className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/30 px-6 py-3 text-sm font-semibold text-paper transition hover:border-gold-400"
    >
      <Icon name="share" className="h-4 w-4" /> {label}
    </button>
  );
}
