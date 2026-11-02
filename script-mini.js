/**
 *  Last modified: 2026/11/02 14:02:04
 *
 *  Minify every CSS file in `dist` into a sibling `.min.css` file
 *  (dist/wispcss.css -> dist/wispcss.min.css). Existing `*.min.css` files are skipped,
 *  so the script can be re-run safely.
 *
 *  Uses lightningcss — the same minifier Tailwind v4 relies on. clean-css (cleancss) cannot
 *  parse Tailwind v4 output and throws inside its tokenizer, so it is no longer used.
 *
 *  Usage: node script-mini.js  (or: npm run mini)
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transform } from 'lightningcss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');

const formatSize = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

const minifyCssFile = (input, output, filename) => {
  const code = readFileSync(input);
  const result = transform({ filename, code, minify: true });
  writeFileSync(output, result.code);
  return { before: code.length, after: result.code.length, warnings: result.warnings || [] };
};

const minifyCss = () => {
  if (!existsSync(DIST_DIR)) {
    console.error(`dist directory not found: ${DIST_DIR}`);
    process.exit(1);
  }

  // Plain .css only; skip existing *.min.css
  const files = readdirSync(DIST_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.toLowerCase().endsWith('.css') && !name.toLowerCase().endsWith('.min.css'))
    .sort();

  if (!files.length) {
    console.log('No CSS files found in dist, nothing to minify.');
    return;
  }

  console.log(`Minifying ${files.length} CSS file(s) in dist...`);

  let failed = 0;

  for (const name of files) {
    const input = path.join(DIST_DIR, name);
    const output = path.join(DIST_DIR, name.replace(/\.css$/i, '.min.css'));

    try {
      const { before, after, warnings } = minifyCssFile(input, output, name);
      const ratio = before ? ((1 - after / before) * 100).toFixed(1) : '0.0';
      console.log(
        `  ✓ ${name} -> ${path.basename(output)}  ${formatSize(before)} -> ${formatSize(after)} (-${ratio}%)`
      );
      if (warnings.length) console.warn(`    ${warnings.length} warning(s) reported by lightningcss`);
    } catch (error) {
      failed += 1;
      console.error(`  ✗ ${name}: ${error.message}`);
    }
  }

  if (failed) {
    console.error(`Minification finished with ${failed} error(s).`);
    process.exit(1);
  }

  console.log('Minification complete.');
};

minifyCss();
