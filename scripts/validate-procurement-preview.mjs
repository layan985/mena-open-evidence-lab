import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const fail = (message) => { throw new Error(message); };
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));

const manifest = readJson('data/manifest.json');
if (manifest.version !== 1) fail('procurement part manifest version must be 1');
if (!Array.isArray(manifest.parts) || !manifest.parts.length) fail('procurement part manifest has no parts');

const expectedNames = manifest.parts.map((_, i) => `procurement-${String(i).padStart(3, '0')}.part`);
if (JSON.stringify(manifest.parts) !== JSON.stringify(expectedNames)) fail('procurement parts are not contiguous and ordered');

const serialized = manifest.parts.map((name) => {
  const file = path.join(root, 'data', name);
  if (!fs.existsSync(file)) fail(`missing procurement part ${name}`);
  return fs.readFileSync(file, 'utf8');
}).join('');

if (Buffer.byteLength(serialized) !== manifest.bytes) fail(`procurement manifest byte mismatch: ${Buffer.byteLength(serialized)} != ${manifest.bytes}`);

const data = JSON.parse(serialized);
if (data.meta?.product !== 'MENA Funding & Procurement Intelligence') fail('unexpected procurement product name');
if (!data.meta?.fetchedAt) fail('procurement snapshot missing fetchedAt');
if (!Array.isArray(data.meta?.sourceCoverage) || data.meta.sourceCoverage.length !== 3) fail('expected three declared World Bank source families');
if (!data.meta.sourceCoverage.every(s => /World Bank/i.test(s.name) && /^https:\/\//.test(s.url || ''))) fail('source coverage must identify official World Bank URLs');
if (!Array.isArray(data.meta?.limitations) || !data.meta.limitations.some(x => /World Bank sources only/i.test(x))) fail('preview must state its World Bank-only perimeter');

const releases = readJson('data/releases.json');
const release = releases.records.find(x => x.id === 'procurement-intelligence');
if (!release) fail('canonical procurement release missing');
if (release.status !== 'public-preview') fail(`procurement preview validator expected public-preview, got ${release.status}`);
if (!String(release.coverage_note || '').includes('World Bank')) fail('canonical release must state World Bank perimeter');

const notices = data.opportunities?.rows;
const plans = data.plans?.rows;
const awards = data.awards?.explorerRows;
if (!Array.isArray(notices) || !Array.isArray(plans) || !Array.isArray(awards)) fail('procurement preview arrays missing');

function unique(rows, key, label) {
  const seen = new Set();
  for (const row of rows) {
    const value = row[key];
    if (!value) fail(`${label} row missing ${key}`);
    if (seen.has(value)) fail(`${label} duplicate ${key}: ${value}`);
    seen.add(value);
  }
}
unique(notices, 'id', 'notice');
unique(plans, 'id', 'plan');

for (const row of notices) {
  if (!row.country || !row.title || !row.sourceUrl) fail(`notice ${row.id} missing core public fields`);
  if ('contactEmail' in row) fail(`notice ${row.id} exposes contactEmail in public artifact`);
}
for (const row of plans) {
  if (!row.title || !row.projectId) fail(`plan ${row.id} missing title/projectId`);
}
for (const [i, row] of awards.entries()) {
  if (!row.country || !row.sourceUrl) fail(`award explorer row ${i} missing country/sourceUrl`);
  if (row.amountUsd !== null && (!Number.isFinite(row.amountUsd) || row.amountUsd < 0)) fail(`award explorer row ${i} has invalid amountUsd`);
}

const matchingAwards = Number(data.awards?.matchingAwards);
if (!Number.isInteger(matchingAwards) || matchingAwards < awards.length) fail('matchingAwards is invalid or smaller than shipped explorer rows');
if (release.row_metric?.value !== matchingAwards) fail(`canonical award count drift: registry=${release.row_metric?.value}, snapshot=${matchingAwards}`);
if (data.awards?.sourceTotal < matchingAwards) fail('sourceTotal cannot be smaller than MENA matching awards');

console.log(`Procurement preview OK: ${notices.length} notice rows, ${plans.length} plan rows, ${awards.length}/${matchingAwards} award rows shipped, ${manifest.parts.length} parts, ${manifest.bytes} bytes.`);
