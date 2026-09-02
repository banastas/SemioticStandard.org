import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const html = read('index.html');
const readme = read('README.md');
const headers = read('_headers');

function attribute(tag, name) {
  return tag.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? '';
}

function symbolName(value) {
  return value.replace(/^\d+[A-C]?\./, '').replace(/\./g, ' ').trim();
}

const symbolTags = [...html.matchAll(/<button class="symbol-item"[^>]*>[\s\S]*?<\/button>/g)].map((match) => match[0]);
assert.equal(symbolTags.length, 34, 'index.html must contain exactly 34 symbol buttons');
assert.equal(new Set(symbolTags.map((tag) => attribute(tag, 'data-symbol'))).size, 34, 'symbol identifiers must be unique');

for (const tag of symbolTags) {
  const identifier = attribute(tag, 'data-symbol');
  const label = attribute(tag, 'aria-label');
  const source = attribute(tag, 'src').replace(/^\//, '');

  assert.equal(label.toLowerCase(), symbolName(identifier).toLowerCase(), `${identifier} must have a matching accessible label`);
  assert.ok(existsSync(resolve(root, source)), `${source} must exist`);

  const svg = read(source);
  assert.match(svg, /<svg\b/, `${source} must contain an SVG root`);
  assert.match(svg, /viewBox=/, `${source} must include a viewBox`);
}

assert.match(html, /<link rel="canonical" href="https:\/\/semioticstandard\.org\/">/, 'canonical URL is required');
assert.match(html, /<script type="application\/ld\+json">/, 'JSON-LD is required');
assert.match(html, /<meta property="og:image:width" content="1200">/, 'Open Graph width must match the preview');
assert.match(html, /<meta property="og:image:height" content="630">/, 'Open Graph height must match the preview');
assert.doesNotMatch(html, /favicon\.ico/, 'HTML must not reference a missing favicon');
assert.doesNotMatch(html, /<figure class="symbol-item"/, 'symbols must use native buttons');
assert.match(html, /creativecommons\.org\/licenses\/by\/4\.0\//, 'the gallery must retain the vector license attribution');

const preview = readFileSync(resolve(root, 'assets/images/SemioticStandard.png'));
assert.equal(preview.toString('ascii', 1, 4), 'PNG', 'social preview must be a PNG');
assert.equal(preview.readUInt32BE(16), 1200, 'social preview must be 1200px wide');
assert.equal(preview.readUInt32BE(20), 630, 'social preview must be 630px high');

assert.match(headers, /Content-Security-Policy:/, 'a content security policy is required');
assert.match(headers, /Strict-Transport-Security:/, 'HSTS is required');
assert.ok(existsSync(resolve(root, 'THIRD_PARTY_NOTICES.md')), 'third-party notices are required');

for (const match of readme.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
  const target = match[1];
  if (/^(?:https?:|#)/.test(target)) continue;
  assert.ok(existsSync(resolve(root, target)), `README link target ${target} must exist`);
}

console.log('Validated 34 symbols, public metadata, security policy, preview image, and documentation links.');
