import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Seal } from "@/components/brand/Seal";

export default function NotFound() {
  const t = useTranslations("notFound");
  const tc = useTranslations("common");
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <Seal size={72} />
      <h1 className="mt-6 font-display text-3xl font-bold text-ink-800">{t("title")}</h1>
      <p className="mt-2 text-ink-700/70">{t("text")}</p>
      <Link href="/" className="mt-6 rounded-full bg-ink-800 px-6 py-3 text-sm font-semibold text-paper hover:bg-ink-700">
        ← {tc("backHome")}
      </Link>
    </section>
  );
}
