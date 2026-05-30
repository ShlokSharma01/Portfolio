import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);

function walk(dir) {
  const results = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) results.push(...walk(full));
    else if (EXTS.has(extname(name).toLowerCase())) results.push({ full, name, size: st.size });
  }
  return results;
}

const files = walk('./public');
let total = 0;

console.log('\nFile                                    Size      Dimensions        Flag');
console.log('─'.repeat(80));

for (const { full, size } of files) {
  const kb   = (size / 1024).toFixed(0);
  const mb   = (size / 1024 / 1024).toFixed(2);
  const display = size > 1024 * 1024 ? `${mb} MB` : `${kb} KB`;
  total += size;

  let dims = '–';
  try {
    const meta = await sharp(full).metadata();
    dims = `${meta.width}×${meta.height}`;
  } catch {}

  const flag = size > 300 * 1024 ? '⚠ LARGE' : '';
  const rel  = full.replace('./public/', '');
  console.log(`${rel.padEnd(40)} ${display.padStart(8)}   ${dims.padEnd(16)}  ${flag}`);
}

console.log('─'.repeat(80));
console.log(`TOTAL: ${(total / 1024 / 1024).toFixed(2)} MB across ${files.length} images\n`);
