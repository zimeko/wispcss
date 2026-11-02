/**
 *  Prefix Generator
 *
 *  Usage: npm run prefix
 *
 *  What it does (CSS files only):
 *  1. Copy the whole `src` directory to `src-prefix` (an existing copy is removed first).
 *  2. In `src-prefix/index.css`, rewrite `@import "tailwindcss";`
 *     to `@import "tailwindcss" prefix(tw);`.
 *  3. Prefix every class name of each `@apply` statement in all CSS files under `src-prefix`.
 *  4. Prefix static class selectors in rule headers, including `:where()`, `:not()`, `:has()` and `:is()`:
 *     @apply transition-all-normal inline-flex-center background-cover;
 *     -> @apply tw:transition-all-normal tw:inline-flex-center tw:background-cover;
 *     &:where(.check-subtle, .check-ghost) -> &:where(.tw\:check-subtle, .tw\:check-ghost)
 *
 *  Tailwind v4 requires prefixed class names inside @apply as well, otherwise compilation fails:
 *  Cannot apply unprefixed utility class `xxx`. Did you mean `tw:xxx`?
 *
 *  Note: `@apply` occurrences inside comments or strings are left untouched.
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, 'src');
const DEST_DIR = path.join(__dirname, 'src-prefix');
const ENTRY_FILE = 'index.css';
const DEFAULT_PREFIX = 'tw';
const APPLY = '@apply';

/* ============================================
   @apply transformation
   ============================================ */
const isWordChar = (char) => char !== undefined && /[\w-]/.test(char);

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Find the position of `@apply` on a line, ignoring comments and strings.
 * The shared `state` keeps the block-comment state across lines.
 * Returns -1 when the line has no `@apply` left to transform.
 */
const findApplyIndex = (line, state) => {
  let quote = '';
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    if (state.inBlock) {
      const end = line.indexOf('*/', i);
      if (end === -1) return -1; // block comment continues on the next line
      state.inBlock = false;
      i = end + 2;
      continue;
    }

    if (quote) {
      if (char === '\\') {
        i += 2;
        continue;
      }
      if (char === quote) quote = '';
      i += 1;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      i += 1;
      continue;
    }

    if (char === '/' && line[i + 1] === '*') {
      state.inBlock = true;
      i += 2;
      continue;
    }

    if (
      line.startsWith(APPLY, i) &&
      !isWordChar(line[i - 1]) &&
      !isWordChar(line[i + APPLY.length])
    ) {
      return i;
    }

    i += 1;
  }

  return -1;
};

/**
 * Prefix a single class name while keeping trailing markers such as `!` and `,`.
 * CSS variable syntax and already prefixed names are returned unchanged.
 */
const prefixToken = (token, prefix) => {
  const trailing = /[!,]+$/.exec(token);
  const suffix = trailing ? trailing[0] : '';
  const core = suffix ? token.slice(0, -suffix.length) : token;

  if (!core) return token;
  if (core.startsWith('(') || core.startsWith('--')) return token;
  if (new RegExp(`^${escapeRegExp(prefix)}:`).test(core)) return token;

  return `${prefix}:${core}${suffix}`;
};

/** Prefix a whole class-name list, normalising whitespace to single spaces */
const prefixClassList = (value, prefix) => {
  const tokens = value.trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return '';
  return tokens.map((token) => prefixToken(token, prefix)).join(' ');
};

/**
 * Prefix static class selectors in CSS rule headers.
 * The returned selector uses a CSS-escaped colon: `.tw\\:class-name`.
 */
const prefixSelectorClasses = (selector, prefix) => {
  let result = '';
  let quote = '';
  let attributeDepth = 0;
  let i = 0;

  while (i < selector.length) {
    const char = selector[i];

    if (quote) {
      result += char;
      if (char === '\\' && i + 1 < selector.length) {
        result += selector[i + 1];
        i += 2;
        continue;
      }
      if (char === quote) quote = '';
      i += 1;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      result += char;
      i += 1;
      continue;
    }

    if (char === '/' && selector[i + 1] === '*') {
      const end = selector.indexOf('*/', i + 2);
      if (end === -1) {
        result += selector.slice(i);
        break;
      }
      result += selector.slice(i, end + 2);
      i = end + 2;
      continue;
    }

    if (char === '[') attributeDepth += 1;
    if (char === ']') attributeDepth -= 1;

    if (char === '\\') {
      result += selector.slice(i, i + 2);
      i += 2;
      continue;
    }

    if (char !== '.' || attributeDepth > 0) {
      result += char;
      i += 1;
      continue;
    }

    const match = /^\.((?:--|-?(?:[A-Za-z_\u0080-\uFFFF]|\\(?:[0-9a-fA-F]{1,6}\s?|[^\r\n])))(?:[A-Za-z0-9_\u0080-\uFFFF-]|\\(?:[0-9a-fA-F]{1,6}\s?|[^\r\n]))*)/.exec(selector.slice(i));
    if (!match) {
      result += char;
      i += 1;
      continue;
    }

    const className = match[1];
    const hasPrefix = className.startsWith(`${prefix}\\:`);

    if (hasPrefix) {
      result += match[0];
    } else {
      result += `.${prefix}\\:${className}`;
    }
    i += match[0].length;
  }

  return result;
};

/** Transform only rule headers, leaving declarations, comments and strings untouched */
const transformSelectorHeaders = (content, prefix) => {
  let result = '';
  let segmentStart = 0;
  let quote = '';
  let inComment = false;
  let parentheses = 0;
  let brackets = 0;

  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    const next = content[i + 1];

    if (inComment) {
      if (char === '*' && next === '/') {
        inComment = false;
        i += 1;
      }
      continue;
    }

    if (quote) {
      if (char === '\\') i += 1;
      else if (char === quote) quote = '';
      continue;
    }

    if (char === '/' && next === '*') {
      inComment = true;
      i += 1;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === '\\') {
      i += 1;
      continue;
    }
    if (char === '(') parentheses += 1;
    if (char === ')') parentheses -= 1;
    if (char === '[') brackets += 1;
    if (char === ']') brackets -= 1;
    if (parentheses > 0 || brackets > 0) continue;

    if (char === '{') {
      const header = content.slice(segmentStart, i);
      const code = header.replace(/\/\*[\s\S]*?\*\//g, '').trimStart();
      // Rule headers and selector-bearing at-rules contain selectors, not declaration values.
      const isSelector = !code.startsWith('@') && !code.startsWith('--');
      const hasSelector = /^@(custom-variant|scope)\b/.test(code);
      result += isSelector || hasSelector ? prefixSelectorClasses(header, prefix) : header;
      result += char;
      segmentStart = i + 1;
    } else if (char === '}' || char === ';') {
      const statement = content.slice(segmentStart, i + 1);
      const code = statement.replace(/\/\*[\s\S]*?\*\//g, '').trimStart();
      result += char === ';' && /^@custom-variant\b/.test(code)
        ? prefixSelectorClasses(statement, prefix)
        : statement;
      segmentStart = i + 1;
    }
  }

  return result + content.slice(segmentStart);
};

/** Rewrite every `@apply` statement of a single line (comments and strings excluded) */
const transformLine = (line, prefix, state) => {
  let result = '';
  let rest = line;

  for (;;) {
    const at = findApplyIndex(rest, state);
    if (at === -1) {
      result += rest;
      break;
    }

    const start = at + APPLY.length;
    let end = rest.indexOf(';', start);
    if (end === -1) end = rest.length;

    let value = rest.slice(start, end);
    const suffix = rest.slice(end);

    // Keep the inline comment that follows the `@apply` statement
    let comment = '';
    const commentAt = value.search(/\/\*/);
    if (commentAt !== -1) {
      comment = value.slice(commentAt);
      value = value.slice(0, commentAt);
    }

    const prefixed = prefixClassList(value, prefix);
    if (!prefixed) {
      // Empty statement or comment only: skip this `@apply` and keep scanning
      result += rest.slice(0, start);
      rest = rest.slice(start);
      continue;
    }

    result += `${rest.slice(0, start)} ${prefixed}${comment ? ` ${comment}` : ''}`;
    rest = suffix;
  }

  return result;
};

/** Rewrite the tailwindcss import of the entry file */
const transformEntryImport = (content, prefix) => {
  const pattern = /@import\s+(['"])tailwindcss\1\s*;/g;
  return content.replace(pattern, (full, quote) =>
    full.includes('prefix(') ? full : `@import ${quote}tailwindcss${quote} prefix(${prefix});`
  );
};

/* ============================================
   Main
   ============================================ */
/** Collect every CSS file below a directory, recursively */
const walkCssFiles = (dir) => {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkCssFiles(fullPath));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.css')) files.push(fullPath);
  }
  return files;
};

const askPrefix = async () => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question(
      `Enter Tailwind prefix (press Enter to use the default "${DEFAULT_PREFIX}"): `
    );
    const prefix = answer.trim().replace(/[:：\s]+$/, '');
    return prefix || DEFAULT_PREFIX;
  } finally {
    rl.close();
  }
};

const main = async () => {
  const prefix = await askPrefix();

  fs.rmSync(DEST_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.cpSync(SRC_DIR, DEST_DIR, { recursive: true });

  console.log('');
  console.log(`Source      : ${path.basename(SRC_DIR)}`);
  console.log(`Destination : ${path.basename(DEST_DIR)}`);
  console.log(`Prefix      : ${prefix}:`);

  const cssFiles = walkCssFiles(DEST_DIR);

  let changedFiles = 0;
  let changedLines = 0;

  for (const file of cssFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const isEntry = path.basename(file) === ENTRY_FILE;
    const state = { inBlock: false };

    let lines = 0;
    const nextLines = content.split('\n').map((line) => {
      const next = line.includes(APPLY) ? transformLine(line, prefix, state) : null;
      if (next === null) {
        // Lines without `@apply` still need scanning to track the block-comment state
        findApplyIndex(line, state);
        return line;
      }
      if (next !== line) lines += 1;
      return next;
    });

    let nextContent = transformSelectorHeaders(nextLines.join('\n'), prefix);
    if (isEntry) nextContent = transformEntryImport(nextContent, prefix);

    if (nextContent !== content) {
      fs.writeFileSync(file, nextContent, 'utf8');
      changedFiles += 1;
      changedLines += lines;
      console.log(`  ✓ ${path.relative(DEST_DIR, file)}`);
    }
  }

  console.log('');
  console.log(`CSS files           : ${cssFiles.length}`);
  console.log(`Files rewritten     : ${changedFiles}`);
  console.log(`@apply lines fixed  : ${changedLines}`);
  console.log('Done.');
};

main();

