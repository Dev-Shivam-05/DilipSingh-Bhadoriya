import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const EVENT_TYPES = new Set([
  "pageview", "section_view", "section_dwell", "scroll_depth", "cta_click", "calc_use", "lead",
]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sid = String(body.sid ?? "");
    if (!/^[0-9a-f-]{36}$/.test(sid)) return NextResponse.json({ ok: false }, { status: 400 });

    // Session bootstrap (sent once, on consent)
    if (body.session) {
      const s = body.session;
      await db.visitSession.upsert({
        where: { id: sid },
        update: {},
        create: {
          id: sid,
          device: clip(s.device), os: clip(s.os), browser: clip(s.browser),
          language: clip(s.language), referrer: clip(s.referrer, 300),
          utmSource: clip(s.utmSource), utmMedium: clip(s.utmMedium),
          screenW: typeof s.screenW === "number" ? s.screenW : null,
          // Approximate geo from edge headers when deployed on Vercel
          city: clip(req.headers.get("x-vercel-ip-city")),
          country: clip(req.headers.get("x-vercel-ip-country")),
        },
      });
    }

    if (Array.isArray(body.events) && body.events.length > 0) {
      const session = await db.visitSession.findUnique({ where: { id: sid }, select: { id: true } });
      if (!session) return NextResponse.json({ ok: false }, { status: 400 });

      const events = body.events
        .slice(0, 50)
        .filter((e: Record<string, unknown>) => EVENT_TYPES.has(String(e.type)))
        .map((e: Record<string, unknown>) => ({
          sessionId: sid,
          type: String(e.type),
          path: clip(e.path, 200) ?? "/",
          locale: clip(e.locale, 5),
          name: clip(e.name, 100),
          value: typeof e.value === "number" ? Math.round(e.value) : null,
        }));
      if (events.length) await db.analyticsEvent.createMany({ data: events });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

function clip(v: unknown, max = 60): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v);
  return s ? s.slice(0, max) : null;
}
