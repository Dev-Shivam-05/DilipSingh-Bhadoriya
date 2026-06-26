import { db } from "@/lib/db";
import { isAdmin } from "@/lib/adminAuth";
import { updateSevaStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminSeva() {
  if (!(await isAdmin())) return null;
  const requests = await db.sevaRequest.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-ink-800">Seva Requests</h1>
      <div className="space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="rounded-2xl border border-ink-800/10 bg-white p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono font-bold text-gold-600">{r.token}</span>
              <span className="font-semibold text-ink-800">{r.name}</span>
              <a href={`https://wa.me/91${r.phone.replace(/\D/g, "").slice(-10)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-700 hover:underline">{r.phone} ↗</a>
              <span className="text-sm text-ink-700/60">{r.docType}</span>
              <span className="text-xs text-ink-700/50">{r.createdAt.toLocaleDateString("en-IN")}</span>
            </div>
            {r.details && <p className="mt-2 text-sm text-ink-800">{r.details}</p>}
            <form action={updateSevaStatus} className="mt-3 flex flex-wrap items-center gap-2">
              <input type="hidden" name="id" value={r.id} />
              <select name="status" defaultValue={r.status} className="rounded-xl border border-ink-800/20 px-3 py-1.5 text-sm">
                {["received", "in_progress", "ready", "done"].map((s) => <option key={s}>{s}</option>)}
              </select>
              <input name="note" defaultValue={r.note ?? ""} placeholder="Note shown to citizen" className="min-w-52 flex-1 rounded-xl border border-ink-800/20 px-3 py-1.5 text-sm" />
              <button className="rounded-full bg-ink-800 px-4 py-1.5 text-xs font-semibold text-paper">Update</button>
            </form>
          </div>
        ))}
        {requests.length === 0 && <p className="text-ink-700/50">No requests yet.</p>}
      </div>
    </div>
  );
}
