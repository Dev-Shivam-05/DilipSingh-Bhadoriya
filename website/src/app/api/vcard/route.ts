import { site } from "@/lib/site";

export function GET() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${site.name}`,
    "N:Bhadoriya;Dilipsingh;;;",
    `TEL;TYPE=CELL:+${site.phone}`,
    `EMAIL:${site.email}`,
    `ADR;TYPE=WORK:;;${site.address.street};${site.address.city};${site.address.state};${site.address.pin};India`,
    `URL:${site.url}`,
    "TITLE:Real Estate Advisor · LIC Agent · Corporator",
    `ORG:${site.name} — Navsari`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="dilipsingh-bhadoriya.vcf"`,
    },
  });
}
