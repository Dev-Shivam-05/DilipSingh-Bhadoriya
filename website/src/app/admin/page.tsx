import { db } from "@/lib/db";
import { isAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

function windowsFromNow() {
  const now = Date.now();
  return { since7: new Date(now - 7 * 86400_000), since30: new Date(now - 30 * 86400_000) };
}

export default async function AdminDashboard() {
  if (!(await isAdmin())) return null;

  const { since7, since30 } = windowsFromNow();

  const [
    sessions7, sessions30, pageviews7, unhandled, pendingTestimonials,
    openSeva, openCivic, topPages, dwell, ctas, devices, depth,
  ] = await Promise.all([
    db.visitSession.count({ where: { createdAt: { gte: since7 } } }),
    db.visitSession.count({ where: { createdAt: { gte: since30 } } }),
    db.analyticsEvent.count({ where: { type: "pageview", createdAt: { gte: since7 } } }),
    db.inquiry.count({ where: { handled: false } }),
    db.testimonial.count({ where: { approved: false } }),
    db.sevaRequest.count({ where: { status: { in: ["received", "in_progress"] } } }),
    db.civicIssue.count({ where: { status: { not: "resolved" } } }),
    db.analyticsEvent.groupBy({
      by: ["path"], where: { type: "pageview", createdAt: { gte: since30 } },
      _count: { path: true }, orderBy: { _count: { path: "desc" } }, take: 8,
    }),
    db.analyticsEvent.groupBy({
      by: ["name"], where: { type: "section_dwell", createdAt: { gte: since30 } },
      _sum: { value: true }, orderBy: { _sum: { value: "desc" } }, take: 8,
    }),
    db.analyticsEvent.groupBy({
      by: ["name"], where: { type: "cta_click", createdAt: { gte: since30 } },
      _count: { name: true }, orderBy: { _count: { name: "desc" } }, take: 8,
    }),
    db.visitSession.groupBy({
      by: ["device"], where: { createdAt: { gte: since30 } }, _count: { device: true },
    }),
    db.analyticsEvent.aggregate({
      where: { type: "scroll_depth", createdAt: { gte: since30 } }, _avg: { value: true },
    }),
  ]);

  const stats = [
    { label: "Visitors (7d)", value: sessions7 },
    { label: "Visitors (30d)", value: sessions30 },
    { label: "Pageviews (7d)", value: pageviews7 },
    { label: "Avg scroll depth", value: `${Math.round(depth._avg.value ?? 0)}%` },
    { label: "🔴 New inquiries", value: unhandled },
    { label: "⭐ Pending testimonials", value: pendingTestimonials },
    { label: "📄 Open seva requests", value: openSeva },
    { label: "🏛️ Open civic issues", value: openCivic },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-bold text-ink-800">Visitor Intelligence</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-ink-800/10 bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-ink-700/60">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-ink-800">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BarPanel
          title="📄 Most visited pages (30d)"
          rows={topPages.map((p) => ({ label: p.path, value: p._count.path }))}
        />
        <BarPanel
          title="⏱️ Where visitors spend time (30d)"
          rows={dwell.map((d) => ({ label: d.name ?? "?", value: Math.round((d._sum.value ?? 0) / 1000), suffix: "s" }))}
        />
        <BarPanel
          title="👆 Most clicked actions (30d)"
          rows={ctas.map((c) => ({ label: c.name ?? "?", value: c._count.name }))}
        />
        <BarPanel
          title="📱 Devices (30d)"
          rows={devices.map((d) => ({ label: d.device ?? "unknown", value: d._count.device }))}
        />
      </div>

      <p className="text-xs text-ink-700/50">
        First-party, consent-based analytics. No cookies for visitors, no personal data, DPDP-friendly.
      </p>
    </div>
  );
}

function BarPanel({ title, rows, }: { title: string; rows: { label: string; value: number; suffix?: string }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="rounded-2xl border border-ink-800/10 bg-white p-5">
      <h2 className="mb-4 font-semibold text-ink-800">{title}</h2>
      {rows.length === 0 && <p className="text-sm text-ink-700/50">No data yet — data appears as visitors consent.</p>}
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="mb-0.5 flex justify-between text-xs">
              <span className="truncate font-medium text-ink-800">{r.label}</span>
              <span className="text-ink-700/60">{r.value.toLocaleString("en-IN")}{r.suffix ?? ""}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ink-50">
              <div className="h-full rounded-full bg-gradient-to-r from-gold-500 to-saffron-500" style={{ width: `${(r.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
