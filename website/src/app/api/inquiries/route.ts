import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const KINDS = new Set(["property", "lic", "documents", "civic", "general", "requirement"]);

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const kind = String(b.kind ?? "general");
    const name = String(b.name ?? "").trim().slice(0, 80);
    const phone = String(b.phone ?? "").trim().slice(0, 15);
    if (!KINDS.has(kind) || name.length < 2 || !/^[0-9+ ]{10,15}$/.test(phone)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await db.inquiry.create({
      data: {
        kind,
        name,
        phone,
        message: String(b.message ?? "").slice(0, 1000),
        meta: b.meta ? JSON.stringify(b.meta).slice(0, 2000) : null,
        listingId: typeof b.listingId === "string" ? b.listingId : null,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
