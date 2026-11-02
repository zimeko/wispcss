/**
 *  Last modified: 2026/11/02 11:05:00
 *
 *  CSS 压缩脚本 - 将 dist 目录下的每个 CSS 文件压缩为同名 .min.css 文件
 *    dist/wispcss.css -> dist/wispcss.min.css
 *  *.min.css 不会被再次压缩，因此脚本可重复执行。
 *
 *  使用 lightningcss（Tailwind v4 内部使用的同一个压缩器）。
 *  说明：clean-css(cleancss) 无法解析 Tailwind v4 产物的现代语法，
 *  在 tokenizer 阶段会直接抛异常，因此不再使用。
 *
 *  使用方式：node script-mini.js 或 npm run mini
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

  // 只处理 .css，跳过压缩产物 *.min.css
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
