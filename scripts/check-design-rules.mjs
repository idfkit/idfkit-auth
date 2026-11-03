/**
 * The design-rule lint: no identity value is written in this repository's own files.
 *
 * Every colour, font family and easing comes from the vendored derivation under src/identity/
 * and is read through an --idfkit-* property. This script scans the identity-bearing files the
 * roster names for auth.idfkit.com (idfkit-brand/touchpoints.toml: src/styles/**\/*.css,
 * src/**\/*.tsx, index.html), skips the vendored path, and exits 1 naming each literal by file
 * and line. It mirrors assertion 4 of idfkit-brand/tools/check_touchpoint.py, including its
 * exemption of a line pasted verbatim from the host's vendored head.html, and adds the easing
 * literals that assertion does not cover. No dependencies: Node's standard library only.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const VENDORED = ['src/identity/'];
const SKIPPED_DIRECTORIES = new Set(['node_modules', 'dist', '.git']);
const HEAD_FRAGMENT = 'src/identity/hosts/auth.idfkit.com/head.html';

/** The files the roster marks as identity-bearing: a directory, a suffix, and an optional prefix. */
const TARGETS = [
  { directory: 'src/styles', suffix: '.css' },
  { directory: 'src', suffix: '.tsx' },
  { file: 'index.html' },
];

const RULES = [
  {
    name: 'colour literal',
    pattern: /(?<![\w&{-])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/,
  },
  { name: 'colour function', pattern: /\b(?:rgba?|hsla?|oklch|oklab)\(/ },
  {
    name: 'font family',
    pattern: /font-family\s*:\s*(?!\s*(?:var\(|inherit|initial|unset|monospace\b|sans-serif\b|serif\b|system-ui\b))/,
  },
  { name: 'font face or font host', pattern: /@font-face|@import\s+url\(|fonts\.googleapis\.com|fonts\.gstatic\.com/ },
  { name: 'easing literal', pattern: /\bcubic-bezier\(|\bsteps\(/ },
  {
    name: 'easing keyword',
    pattern:
      /\b(?:transition|animation)(?:-timing-function)?\s*:[^;]*(?<![\w-])(?:ease(?:-in-out|-in|-out)?|linear)(?![\w-])/,
  },
];

function* walk(directory) {
  for (const entry of readdirSync(directory)) {
    if (SKIPPED_DIRECTORIES.has(entry)) continue;
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

function isVendored(path) {
  const posix = relative(ROOT, path).split(sep).join('/');
  return VENDORED.some((prefix) => posix.startsWith(prefix));
}

function* files() {
  const seen = new Set();
  for (const target of TARGETS) {
    const candidates = target.file
      ? [join(ROOT, target.file)]
      : [...walk(join(ROOT, target.directory))].filter((path) => path.endsWith(target.suffix));
    for (const path of candidates) {
      if (seen.has(path) || isVendored(path)) continue;
      seen.add(path);
      yield path;
    }
  }
}

/** The standard's own head lines, which a page carries verbatim. */
const headLines = new Set(
  readFileSync(join(ROOT, HEAD_FRAGMENT), 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0),
);

const findings = [];
for (const path of files()) {
  const lines = readFileSync(path, 'utf8').split('\n');
  lines.forEach((line, index) => {
    if (headLines.has(line.trim())) return;
    for (const rule of RULES) {
      const match = rule.pattern.exec(line);
      if (match) {
        findings.push(`${relative(ROOT, path)}:${index + 1}: ${rule.name} ${JSON.stringify(match[0])}; read it through an --idfkit-* property`);
        break;
      }
    }
  });
}

if (findings.length > 0) {
  for (const finding of findings) console.error(`FAIL ${finding}`);
  console.error(`${findings.length} identity value(s) written outside src/identity/`);
  process.exit(1);
}
console.log('design rules: no identity value written outside src/identity/');
