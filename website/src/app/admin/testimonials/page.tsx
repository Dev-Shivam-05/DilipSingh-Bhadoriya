import { db } from "@/lib/db";
import { isAdmin } from "@/lib/adminAuth";
import { setTestimonialApproval, addTestimonial } from "../actions";

export const dynamic = "force-dynamic";

const inputCls = "w-full rounded-xl border border-ink-800/20 bg-white px-3 py-2 text-sm outline-none focus:border-gold-500";

export default async function AdminTestimonials() {
  if (!(await isAdmin())) return null;
  const items = await db.testimonial.findMany({ orderBy: [{ approved: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-bold text-ink-800">Testimonials</h1>

      <details className="rounded-2xl border border-gold-500/40 bg-gold-100/40 p-5">
        <summary className="cursor-pointer font-semibold text-ink-800">➕ Add testimonial</summary>
        <form action={addTestimonial} className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-sm">Name<input name="name" required className={inputCls} /></label>
          <label className="text-sm">Locality<input name="locality" className={inputCls} /></label>
          <label className="text-sm">Service
            <select name="service" className={inputCls}>
              {["property", "lic", "documents", "civic"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="text-sm md:col-span-2">Message<textarea name="message" required rows={2} className={inputCls} /></label>
          <button className="rounded-full bg-ink-800 px-6 py-2.5 text-sm font-semibold text-paper md:justify-self-start">💾 Save</button>
        </form>
      </details>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((t) => (
          <div key={t.id} className={`rounded-2xl border p-5 ${t.approved ? "border-ink-800/10 bg-white" : "border-saffron-500/40 bg-saffron-100/30"}`}>
            {!t.approved && <p className="mb-2 text-xs font-bold uppercase text-saffron-600">Pending approval</p>}
            <p className="text-sm leading-relaxed text-ink-800">“{t.message}”</p>
            <p className="mt-2 text-sm font-semibold text-ink-800">{t.name} <span className="font-normal text-ink-700/60">· {t.locality} · {t.service}</span></p>
            <div className="mt-3 flex gap-2">
              {!t.approved && (
                <form action={setTestimonialApproval}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="approve" value="1" />
                  <button className="rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white">✓ Approve</button>
                </form>
              )}
              <form action={setTestimonialApproval}>
                <input type="hidden" name="id" value={t.id} />
                <input type="hidden" name="approve" value="0" />
                <button className="rounded-full border border-red-300 px-4 py-1.5 text-xs font-semibold text-red-600">🗑 Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
