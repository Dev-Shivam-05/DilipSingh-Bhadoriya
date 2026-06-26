import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/** Public status lookup by token — returns no personal data. */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")?.toUpperCase() ?? "";
  if (!/^DSB-?\d{3,6}$/.test(token)) return NextResponse.json({ ok: false }, { status: 400 });
  const normalized = token.startsWith("DSB-") ? token : token.replace("DSB", "DSB-");
  const r = await db.sevaRequest.findUnique({ where: { token: normalized } });
  if (!r) return NextResponse.json({ ok: false }, { status: 404 });
  return NextResponse.json({
    token: r.token,
    docType: r.docType,
    status: r.status,
    note: r.note,
    updatedAt: r.updatedAt,
  });
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const name = String(b.name ?? "").trim().slice(0, 80);
    const phone = String(b.phone ?? "").trim().slice(0, 15);
    if (name.length < 2 || !/^[0-9+ ]{10,15}$/.test(phone)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    // Sequential-ish human-friendly token
    const count = await db.sevaRequest.count();
    const token = `DSB-${1000 + count + 1}`;
    const created = await db.sevaRequest.create({
      data: {
        token,
        name,
        phone,
        docType: String(b.docType ?? "other").slice(0, 60),
        details: String(b.details ?? "").slice(0, 800),
      },
    });
    return NextResponse.json({ ok: true, token: created.token });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
