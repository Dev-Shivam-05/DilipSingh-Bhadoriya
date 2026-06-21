<div align="center">

<img src="website/src/app/icon.svg" width="110" alt="The Trident Pillar seal" />

# દિલીપસિંહ ભદોરિયા · Dilipsingh Bhadoriya

### *Navsari's one man for property, protection & paperwork — trusted since 2007.*

**A trilingual, database-driven civic-and-business platform** disguised as a portfolio —
built to turn 18 years of neighbourhood trust into organic reach.

`Next.js 16` · `TypeScript` · `Tailwind v4` · `Prisma` · `next-intl (ગુજરાતી · हिन्दी · English)` · `First-party analytics`

[The Idea](#-the-idea) · [Features](#-features) · [Architecture](#-architecture) · [Run It](#-run-it-locally) · [Deploy](#-deploy) · [Admin Manual](#-family-admin-manual) · [ગુજરાતી](#-ગુજરાતીમાં)

---

</div>

## 🎯 The Idea

Nobody googles a person's name until they already know him. So this site doesn't wait to be found —
**it earns visitors by being useful**, then converts usefulness into trust, and trust into WhatsApp conversations:

```
  Google search (ગુજરાતી/हिन्दी/English)          The four doors
  "આવકનો દાખલો કેવી રીતે કઢાવવો?"                ┌──────────────┐
  "gujarat stamp duty calculator"        ──────▶  │ 📄 Documents │──┐
  "property in vijalpore navsari"                 │ 🏡 Property  │  │   one tap
  "LIC plan for child education"                  │ 🛡️ LIC       │  ├──▶ 💬 WhatsApp
                                                  │ 🏛️ Civic     │  │   (pre-filled,
  39 static guide pages × 3 languages             └──────────────┘  │    in-context)
  calculators · trackers · listings                                 ▼
                                                            📥 Admin inbox + lead intel
```

The **traffic engine** is a library of genuinely useful, step-by-step government-document guides
(income certificate, varsai, 7/12, Ayushman card…) written natively in Gujarati, Hindi and English —
a search space where quality content barely exists. Every page funnels to one man who can actually
solve the problem, backed by an 18-year JustDial-verified record.

## ✨ Features

| | |
|---|---|
| 🔱 **The Trident Pillar seal** | Hand-crafted animated SVG logo (~2KB): a *stambh* of public service crowned by three flames — property, protection, paperwork. Draws itself on load; flames flicker on hover. |
| 🌐 **Trilingual to the bone** | ગુજરાતી (default), हिन्दी, English — full `hreflang`, localized URLs, Gujarati numerals, Noto Sans Gujarati subset. Not a translation afterthought; Gujarati is the *primary* voice. |
| 📄 **Document Seva Kendra** | 12 deep guides × 3 languages = 36+ SEO pages with `HowTo` + `FAQPage` schema. Checklists, fees, offices in Navsari, rejection traps. |
| 🎫 **Seva tracker** | Citizens get a token (`DSB-1042`) for document requests and check status online — a corporator who gives you a *tracking number* for paperwork. |
| 🏛️ **Public accountability board** | Civic complaints (streetlight, drainage, roads…) filed with a token (`WARD-2007`), tracked **publicly** from Received → In Progress → Resolved. |
| 🏡 **Live property portal** | DB-backed listings with type filters, status badges (sold deals stay up as proof), per-listing WhatsApp deep links, requirement-drop reverse funnel. |
| 🧮 **Six calculators** | EMI · Gujarat stamp duty (with the women's-registration waiver) · LIC premium · maturity · human-life-value · a 3-question plan-finder quiz — each ending in a pre-filled WhatsApp CTA. |
| 📊 **Visitor Intelligence** | Consent-based, first-party, cookie-free analytics: pageviews, per-section dwell time, scroll depth, CTA clicks, devices — charted in the family admin. No Google Analytics, no data leaves the site. DPDP-friendly. |
| 🔐 **Family admin** | Password-protected control room: listings CRUD, inquiry inbox with one-tap WhatsApp reply, testimonial approvals, seva/civic status updates. Runs in 10 minutes a week. |
| 💳 **Digital visiting card** | `/card` — QR-able, one-tap save-to-contacts (vCard), call, WhatsApp, share. The paper card is dead. |
| ⚡ **Performance discipline** | Static prerender for all guide pages, WebP images (13 curated photos, 34–223KB), font subsetting, zero chart libraries, `prefers-reduced-motion` respected. |
| 🧒 **Privacy by design** | A minor's face auto-blurred in the image pipeline; family photos excluded from publication by policy; analytics collect zero personal data. |

## 🏗 Architecture

```
website/
├─ prisma/            schema (SQLite dev → Postgres prod, one-line switch) + seed
├─ scripts/           sharp image pipeline (crop, blur-face, WebP)
├─ messages/          gu.json · hi.json · en.json  — every UI string, three voices
└─ src/
   ├─ app/
   │  ├─ [locale]/    public site (gu unprefixed, /hi, /en)
   │  │  ├─ property/[slug]   lic/   documents/[slug]   corporator/
   │  │  ├─ about/   card/   contact/
   │  ├─ admin/       separate root layout · cookie-HMAC auth · dashboard + CRUD
   │  ├─ api/         track · inquiries · seva · civic · vcard
   │  └─ sitemap.ts · robots.ts · manifest.ts · icon.svg
   ├─ components/     brand/ (Seal) · ui/ · layout/ · home/ · property/ · lic/
   │                  documents/ · corporator/ · forms/ · analytics/ · seo/
   ├─ content/        guides.ts — the trilingual traffic engine
   ├─ i18n/           next-intl routing + navigation
   └─ lib/            db · site config · calculators (unit-tested) · adminAuth
```

**Stack:** Next.js 16 (App Router, RSC) · TypeScript strict · Tailwind CSS v4 tokens ·
Prisma 6 · next-intl 4 · sharp · Vitest · first-party analytics (no third-party scripts at all).

## 🚀 Run it locally

```bash
cd website
npm install
npm run setup      # prisma generate + db push + seed
npm run images     # process photos from ../Images into public/images
npm run dev        # http://localhost:3000
```

Admin: `http://localhost:3000/admin` — password from `.env` (`ADMIN_PASSWORD`).
Tests: `npm test` · Production build: `npm run build && npm start`.

## ☁️ Deploy

1. **Database** — create a free Postgres (Supabase/Neon). In `prisma/schema.prisma` set
   `provider = "postgresql"`; set `DATABASE_URL` accordingly. Run `npx prisma db push && npm run db:seed`.
2. **Vercel** — import the repo, set **Root Directory = `website`**, add env vars from `.env.example`.
3. **Before going live** (the launch checklist):
   - [ ] Replace the placeholder phone number in `src/lib/site.ts` (**one line — powers every WhatsApp/call CTA**)
   - [ ] Set the real domain in `NEXT_PUBLIC_SITE_URL`
   - [ ] Strong `ADMIN_PASSWORD` + random `SESSION_SECRET`
   - [ ] Verify domain in **Google Search Console**, submit `/sitemap.xml`
   - [ ] Create/claim the **Google Business Profile** and link the site
   - [ ] Replace sample listings & confirm testimonials with real ones (2 minutes each in `/admin`)
   - [ ] Confirm consent for the certificate photo (minor's face ships blurred by default)

## 👨‍👩‍👧 Family admin manual

| You want to… | Go to |
|---|---|
| See who visited, what they read, what they clicked | `/admin` |
| Add / edit / mark-sold a property | `/admin/listings` |
| Answer a lead (one tap opens their WhatsApp) | `/admin/inquiries` |
| Approve a testimonial before it appears | `/admin/testimonials` |
| Update a citizen's document request (they see it live) | `/admin/seva` |
| Move a ward complaint to Resolved (public board updates) | `/admin/civic` |

## 📈 The 10k-visitor plan

39 indexable utility pages at launch (guides × 3 languages + hubs) targeting long-tail Gujarati/Hindi
queries with almost no competition → Search Console from day one → guide PDFs and tokens circulating in
WhatsApp groups → the public civic board earning local press. Utility content compounds: expect the
curve to inflect around month 3–6. Every new guide added later (there's a template — `src/content/guides.ts`)
is three more pages of surface area.

---

## 🙏 ગુજરાતીમાં

આ વેબસાઇટ દિલીપસિંહ ભદોરિયા માટે બનાવવામાં આવી છે — નવસારીના રિયલ એસ્ટેટ સલાહકાર, LIC એજન્ટ,
કોર્પોરેટર અને હજારો પરિવારોના મફત ડોક્યુમેન્ટ-મદદગાર. સાઇટના ચાર દરવાજા છે: **મિલકત, વીમો,
ડોક્યુમેન્ટ સેવા અને વોર્ડની ફરિયાદ** — અને દરેક રસ્તો એક જ જગ્યાએ પહોંચે છે: WhatsApp પર સીધી વાત.
પરિવાર માટે `/admin` માં આખું નિયંત્રણ છે: મિલકતો ઉમેરો, પૂછપરછના જવાબ આપો, સેવા વિનંતીની સ્થિતિ
બદલો — અઠવાડિયે દસ મિનિટનું કામ.

<div align="center">

*Built with pride for Navsari. · નવસારી માટે ગર્વથી બનાવેલ.*

**🔱 મિલકત · વીમો · કાગળ — એક જ વિશ્વાસુ ચહેરો.**

</div>
