import { db } from "@/lib/db";
import { isAdmin } from "@/lib/adminAuth";
import { Icon, type IconName } from "@/components/ui/icons";
import { toggleInquiry } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminInquiries() {
  if (!(await isAdmin())) return null;
  const inquiries = await db.inquiry.findMany({
    orderBy: [{ handled: "asc" }, { createdAt: "desc" }],
    include: { listing: { select: { title: true, slug: true } } },
    take: 200,
  });

  const KIND_ICON: Record<string, IconName> = {
    property: "home", lic: "shield", documents: "fileText", civic: "landmark", general: "messageCircle", requirement: "target",
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-ink-800">
        Inquiries <span className="text-base font-normal text-ink-700/60">({inquiries.filter((i) => !i.handled).length} new)</span>
      </h1>
      <div className="space-y-3">
        {inquiries.map((q) => (
          <div key={q.id} className={`rounded-2xl border p-5 ${q.handled ? "border-ink-800/10 bg-white opacity-60" : "border-saffron-500/40 bg-saffron-100/30"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Icon name={KIND_ICON[q.kind] ?? "messageCircle"} className="h-5 w-5 text-ink-600" />
              <span className="font-semibold text-ink-800">{q.name}</span>
              <a href={`https://wa.me/91${q.phone.replace(/\D/g, "").slice(-10)}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-emerald-700 hover:underline">
                {q.phone} ↗ WhatsApp
              </a>
              <span className="text-xs text-ink-700/50">{q.createdAt.toLocaleString("en-IN")}</span>
              {q.listing && <span className="text-xs text-gold-600">→ {q.listing.title}</span>}
            </div>
            {q.message && <p className="mt-2 text-sm leading-relaxed text-ink-800">{q.message}</p>}
            {q.meta && <p className="mt-1 font-mono text-xs text-ink-700/50">{q.meta}</p>}
            <form action={toggleInquiry} className="mt-3">
              <input type="hidden" name="id" value={q.id} />
              <button className="inline-flex items-center gap-1.5 rounded-full border border-ink-800/20 px-4 py-1.5 text-xs font-semibold text-ink-800 hover:bg-ink-50">
                {q.handled ? "Mark as new" : <><Icon name="check" className="h-3.5 w-3.5" /> Mark handled</>}
              </button>
            </form>
          </div>
        ))}
        {inquiries.length === 0 && <p className="text-ink-700/50">No inquiries yet.</p>}
      </div>
    </div>
  );
}
