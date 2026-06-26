import { db } from "@/lib/db";
import { isAdmin } from "@/lib/adminAuth";
import { Icon } from "@/components/ui/icons";
import { updateCivicStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminCivic() {
  if (!(await isAdmin())) return null;
  const issues = await db.civicIssue.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-ink-800">Civic Issues</h1>
      <div className="space-y-3">
        {issues.map((c) => (
          <div key={c.id} className="rounded-2xl border border-ink-800/10 bg-white p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono font-bold text-gold-600">{c.token}</span>
              <span className="font-semibold capitalize text-ink-800">{c.category}</span>
              <span className="inline-flex items-center gap-1 text-sm text-ink-700/60">
                <Icon name="mapPin" className="h-3.5 w-3.5" /> {c.area}
              </span>
              <span className="text-sm text-ink-700/60">{c.name} · {c.phone}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.status === "resolved" ? "bg-emerald-100 text-emerald-700" : c.status === "in_progress" ? "bg-gold-100 text-gold-600" : "bg-ink-100 text-ink-800"}`}>{c.status}</span>
            </div>
            <p className="mt-2 text-sm text-ink-800">{c.details}</p>
            <form action={updateCivicStatus} className="mt-3 flex flex-wrap items-center gap-2">
              <input type="hidden" name="id" value={c.id} />
              <select name="status" defaultValue={c.status} className="rounded-xl border border-ink-800/20 px-3 py-1.5 text-sm">
                {["received", "in_progress", "resolved"].map((s) => <option key={s}>{s}</option>)}
              </select>
              <input name="note" defaultValue={c.note ?? ""} placeholder="Public resolution note (e.g. 'New LED fitted')" className="min-w-52 flex-1 rounded-xl border border-ink-800/20 px-3 py-1.5 text-sm" />
              <label className="flex items-center gap-1.5 text-xs text-ink-800">
                <input type="checkbox" name="public" defaultChecked={c.public} /> Show on public board
              </label>
              <button className="rounded-full bg-ink-800 px-4 py-1.5 text-xs font-semibold text-paper">Update</button>
            </form>
          </div>
        ))}
        {issues.length === 0 && <p className="text-ink-700/50">No issues yet.</p>}
      </div>
    </div>
  );
}
