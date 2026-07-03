import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const CATEGORIES = new Set(["streetlight", "drainage", "road", "water", "garbage", "other"]);

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const name = String(b.name ?? "").trim().slice(0, 80);
    const phone = String(b.phone ?? "").trim().slice(0, 15);
    const category = String(b.category ?? "other");
    if (name.length < 2 || !/^[0-9+ ]{10,15}$/.test(phone) || !CATEGORIES.has(category)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const count = await db.civicIssue.count();
    const token = `WARD-${2000 + count + 1}`;
    const created = await db.civicIssue.create({
      data: {
        token,
        name,
        phone,
        category,
        area: String(b.area ?? "").slice(0, 120),
        details: String(b.details ?? "").slice(0, 800),
      },
    });
    return NextResponse.json({ ok: true, token: created.token });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
