import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Seal } from "@/components/brand/Seal";
import { site, yearsOfService } from "@/lib/site";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-ink-900 text-ink-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Seal size={52} tone="paper" />
            <div>
              <p className="font-display text-lg font-bold text-paper">{site.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gold-300">
                Navsari · {yearsOfService()}+ {t("stats.years")}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-100/80">
            {site.address.street}, {site.address.locality}, {site.address.city},{" "}
            {site.address.state} {site.address.pin}
          </p>
          <p className="mt-3 text-sm text-gold-300">{site.phoneDisplay}</p>
        </div>

        <nav aria-label="Footer quick links">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">{t("footer.quick")}</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-gold-300">{t("nav.about")}</Link></li>
            <li><Link href="/card" className="hover:text-gold-300">{t("nav.card")}</Link></li>
            <li><Link href="/contact" className="hover:text-gold-300">{t("nav.contact")}</Link></li>
            <li>
              <a href={site.justdial} rel="noopener noreferrer" target="_blank" className="hover:text-gold-300">
                {t("home.verified")} ↗
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">{t("footer.services")}</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/property" className="hover:text-gold-300">{t("nav.property")}</Link></li>
            <li><Link href="/lic" className="hover:text-gold-300">{t("nav.lic")}</Link></li>
            <li><Link href="/documents" className="hover:text-gold-300">{t("nav.documents")}</Link></li>
            <li><Link href="/corporator" className="hover:text-gold-300">{t("nav.corporator")}</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-ink-100/60 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. {t("footer.rights")} {t("footer.made")}</p>
          <p className="max-w-md">{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
