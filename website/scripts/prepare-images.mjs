/**
 * Curated image pipeline (see PROJECT-NOTES/IMAGE-PLAN.md).
 * - Optimizes Tier 1/2 photos into public/images as WebP (max 1600px wide).
 * - Crops the watermark strip off the hero cutout.
 * - Blurs the minor's face region in the certificate photo (privacy).
 * - Family/private photos are intentionally NOT processed.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve(process.cwd(), "../Images");
const OUT = path.resolve(process.cwd(), "public/images");

const jobs = [
  { src: "Single photo.jpeg", out: "hero.webp", cropBottomPct: 0.14 }, // remove watermark strip
  { src: "Single photo 02.jpeg", out: "speaking.webp" },
  { src: "WhatsApp Image 2026-07-03 at 9.41.32 PM.jpeg", out: "portrait.webp" },
  { src: "civic photo 01.jpeg", out: "civic-certificate.webp", blurFace: { x: 0.58, y: 0.1, w: 0.26, h: 0.22 } },
  { src: "WhatsApp Image 2026-07-03 at 9.41.42 PM.jpeg", out: "counselling.webp" },
  { src: "WhatsApp Image 2026-07-03 at 9.41.37 PM.jpeg", out: "flag.webp" },
  { src: "WhatsApp Image 2026-07-03 at 9.41.46 PM.jpeg", out: "namaste.webp" },
  { src: "Current and last corporater.jpeg", out: "victory.webp" },
  { src: "with swami .jpeg", out: "swami.webp" },
  { src: "WhatsApp Image 2026-07-03 at 9.41.34 PM.jpeg", out: "bouquet.webp" },
  { src: "WhatsApp Image 2026-07-03 at 9.41.46 PM (2).jpeg", out: "stage.webp" },
  { src: "WhatsApp Image 2026-07-03 at 9.41.45 PM.jpeg", out: "garland.webp" },
  { src: "WhatsApp Image 2026-07-03 at 9.41.43 PM (1).jpeg", out: "suit.webp" },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  const input = path.join(SRC, job.src);
  let img = sharp(input).rotate(); // respect EXIF orientation
  const meta = await img.metadata();
  let { width, height } = meta;

  if (job.cropBottomPct) {
    const newH = Math.round(height * (1 - job.cropBottomPct));
    img = img.extract({ left: 0, top: 0, width, height: newH });
    height = newH;
  }

  if (job.blurFace) {
    const r = job.blurFace;
    const region = {
      left: Math.round(width * r.x),
      top: Math.round(height * r.y),
      width: Math.round(width * r.w),
      height: Math.round(height * r.h),
    };
    const blurred = await sharp(input)
      .rotate()
      .extract(region)
      .blur(24)
      .toBuffer();
    img = img.composite([{ input: blurred, left: region.left, top: region.top }]);
  }

  const resized = img.resize({ width: 1600, withoutEnlargement: true });
  const info = await resized.webp({ quality: 80 }).toFile(path.join(OUT, job.out));
  console.log(`✓ ${job.out} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
}

console.log("Done. Family/private photos were skipped by design.");
