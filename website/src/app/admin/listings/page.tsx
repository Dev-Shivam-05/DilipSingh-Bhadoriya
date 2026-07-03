import { db } from "@/lib/db";
import { isAdmin } from "@/lib/adminAuth";
import { upsertListing, deleteListing } from "../actions";
import { formatINR } from "@/lib/calculators";

export const dynamic = "force-dynamic";

const inputCls = "w-full rounded-xl border border-ink-800/20 bg-white px-3 py-2 text-sm outline-none focus:border-gold-500";

export default async function AdminListings() {
  if (!(await isAdmin())) return null;
  const listings = await db.listing.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-bold text-ink-800">Listings ({listings.length})</h1>

      <details className="rounded-2xl border border-gold-500/40 bg-gold-100/40 p-5" open={listings.length === 0}>
        <summary className="cursor-pointer font-semibold text-ink-800">➕ Add new listing</summary>
        <ListingForm />
      </details>

      <div className="space-y-4">
        {listings.map((l) => (
          <details key={l.id} className="rounded-2xl border border-ink-800/10 bg-white p-5">
            <summary className="flex cursor-pointer flex-wrap items-center gap-3">
              <span className="font-semibold text-ink-800">{l.title}</span>
              <span className="text-sm text-ink-700/60">{l.locality} · {formatINR(l.price)} · {l.type}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${l.status === "available" ? "bg-emerald-100 text-emerald-700" : l.status === "token" ? "bg-gold-100 text-gold-600" : "bg-red-100 text-red-600"}`}>
                {l.status}
              </span>
              {l.featured && <span className="text-xs">⭐ featured</span>}
              {l.isSample && <span className="text-xs opacity-60">(sample)</span>}
            </summary>
            <ListingForm listing={l} />
            <form action={deleteListing} className="mt-2">
              <input type="hidden" name="id" value={l.id} />
              <button className="text-sm text-red-600 hover:underline">🗑 Delete listing</button>
            </form>
          </details>
        ))}
      </div>
    </div>
  );
}

function ListingForm({ listing }: { listing?: import("@prisma/client").Listing }) {
  return (
    <form action={upsertListing} className="mt-4 grid gap-3 md:grid-cols-2">
      {listing && <input type="hidden" name="id" value={listing.id} />}
      <label className="text-sm">Slug (URL)
        <input name="slug" required defaultValue={listing?.slug} className={inputCls} placeholder="2bhk-flat-ramnagar" />
      </label>
      <label className="text-sm">Locality
        <input name="locality" required defaultValue={listing?.locality} className={inputCls} />
      </label>
      <label className="text-sm">Title (English)
        <input name="title" required defaultValue={listing?.title} className={inputCls} />
      </label>
      <label className="text-sm">Title (ગુજરાતી)
        <input name="titleGu" defaultValue={listing?.titleGu ?? ""} className={inputCls} />
      </label>
      <label className="text-sm">Type
        <select name="type" defaultValue={listing?.type ?? "plot"} className={inputCls}>
          {["plot", "bungalow", "flat", "commercial", "rental"].map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="text-sm">Status
        <select name="status" defaultValue={listing?.status ?? "available"} className={inputCls}>
          {["available", "token", "sold"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="text-sm">Price (₹)
        <input name="price" type="number" required defaultValue={listing?.price} className={inputCls} />
      </label>
      <label className="text-sm">Area (sq.ft)
        <input name="areaSqft" type="number" defaultValue={listing?.areaSqft ?? ""} className={inputCls} />
      </label>
      <label className="text-sm">Bedrooms
        <input name="bedrooms" type="number" defaultValue={listing?.bedrooms ?? ""} className={inputCls} />
      </label>
      <div className="flex items-end gap-5 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={listing?.featured} /> Featured (home page)</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="isSample" defaultChecked={listing?.isSample} /> Sample</label>
      </div>
      <label className="text-sm md:col-span-2">Description (English)
        <textarea name="description" required rows={2} defaultValue={listing?.description} className={inputCls} />
      </label>
      <label className="text-sm md:col-span-2">Description (ગુજરાતી)
        <textarea name="descriptionGu" rows={2} defaultValue={listing?.descriptionGu ?? ""} className={inputCls} />
      </label>
      <button className="rounded-full bg-ink-800 px-6 py-2.5 text-sm font-semibold text-paper hover:bg-ink-700 md:col-span-2 md:justify-self-start">
        💾 Save listing
      </button>
    </form>
  );
}
