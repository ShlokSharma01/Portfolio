/**
 * Image optimisation pipeline
 * Converts oversized PNGs → compressed WebP, outputs to same /public path.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { statSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';

const jobs = [
  // ── Hero poster (full-bleed, 1920 wide max) ────────────────────────
  {
    src:  'public/hero-poster.png',
    out:  'public/hero-poster.webp',
    opts: { width: 1920, fit: 'inside', withoutEnlargement: true },
    webpQ: 75,
    deleteSrc: true,
  },

  // ── About abstract (portrait, displayed at ~50 % vw, opacity 0.22) ─
  {
    src:  'public/about-abstract.png',
    out:  'public/about-abstract.webp',
    opts: { width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true },
    webpQ: 72,
    deleteSrc: true,
  },

  // ── Section textures (shown at 4–5 % opacity, don't need high res) ─
  {
    src:  'public/textures/bg-1.png',
    out:  'public/textures/bg-1.webp',
    opts: { width: 1400, fit: 'inside', withoutEnlargement: true },
    webpQ: 68,
    deleteSrc: true,
  },
  {
    src:  'public/textures/bg-2.png',
    out:  'public/textures/bg-2.webp',
    opts: { width: 1400, fit: 'inside', withoutEnlargement: true },
    webpQ: 68,
    deleteSrc: true,
  },

  // ── Project screenshots (card images, max ~1000 px wide) ───────────
  {
    src:  'public/projects/hotel-os.png',
    out:  'public/projects/hotel-os.webp',
    opts: { width: 1000, fit: 'inside', withoutEnlargement: true },
    webpQ: 78,
    deleteSrc: true,
  },
  {
    src:  'public/projects/hotel-os1.png',
    out:  'public/projects/hotel-os1.webp',
    opts: { width: 1000, fit: 'inside', withoutEnlargement: true },
    webpQ: 78,
    deleteSrc: true,
  },
  {
    src:  'public/projects/hotel-os2.png',
    out:  'public/projects/hotel-os2.webp',
    opts: { width: 1000, fit: 'inside', withoutEnlargement: true },
    webpQ: 78,
    deleteSrc: true,
  },
  {
    src:  'public/projects/hotel-os4.png',
    out:  'public/projects/hotel-os4.webp',
    opts: { width: 1000, fit: 'inside', withoutEnlargement: true },
    webpQ: 78,
    deleteSrc: true,
  },
  {
    src:  'public/projects/hotel-os5.png',
    out:  'public/projects/hotel-os5.webp',
    opts: { width: 1000, fit: 'inside', withoutEnlargement: true },
    webpQ: 78,
    deleteSrc: true,
  },

  // ── OG image — keep as PNG (scrapers), just compress ──────────────
  {
    src:  'public/og-image.png',
    out:  'public/og-image.png',    // overwrite in-place
    opts: { width: 1200, height: 630, fit: 'cover' },
    png:  true,
    pngQ: 85,
    deleteSrc: false,
  },

  // ── Favicon — resize from 1024px → 256px, keep PNG ────────────────
  {
    src:  'public/favicon.png',
    out:  'public/favicon.png',
    opts: { width: 256, height: 256, fit: 'cover' },
    png:  true,
    pngQ: 90,
    deleteSrc: false,
  },
];

console.log('\nOptimising images…\n');
let savedTotal = 0;

for (const job of jobs) {
  if (!existsSync(job.src)) { console.log(`SKIP (not found): ${job.src}`); continue; }

  const beforeBytes = statSync(job.src).size;
  const beforeKB    = (beforeBytes / 1024).toFixed(0);

  const pipeline = sharp(job.src).resize(job.opts);

  if (job.png) {
    await pipeline.png({ quality: job.pngQ, compressionLevel: 9 }).toFile(job.out + '.tmp');
  } else {
    await pipeline.webp({ quality: job.webpQ }).toFile(job.out + '.tmp');
  }

  // atomic replace
  if (existsSync(job.out)) unlinkSync(job.out);
  const { renameSync } = await import('fs');
  renameSync(job.out + '.tmp', job.out);

  // delete original PNG if we converted to WebP
  if (job.deleteSrc && job.src !== job.out && existsSync(job.src)) {
    unlinkSync(job.src);
  }

  const afterBytes = statSync(job.out).size;
  const afterKB    = (afterBytes / 1024).toFixed(0);
  const saved      = beforeBytes - afterBytes;
  savedTotal      += Math.max(saved, 0);

  // get output dimensions
  const meta = await sharp(job.out).metadata();
  const dims = `${meta.width}×${meta.height}`;

  const pct = ((saved / beforeBytes) * 100).toFixed(0);
  console.log(
    `${job.out.replace('public/', '').padEnd(38)} ${String(beforeKB + ' KB').padStart(8)} → ${String(afterKB + ' KB').padStart(8)}   ${dims.padEnd(14)} (−${pct}%)`,
  );
}

console.log('\n' + '─'.repeat(78));
console.log(`Total saved: ${(savedTotal / 1024 / 1024).toFixed(2)} MB\n`);
