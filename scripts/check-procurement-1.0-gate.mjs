import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const manifest = readJson('data/manifest.json');
const serialized = manifest.parts.map(name => fs.readFileSync(path.join(root, 'data', name), 'utf8')).join('');
const data = JSON.parse(serialized);
const failures = [];

const matching = Number(data.awards?.matchingAwards || 0);
const shippedAwards = Array.isArray(data.awards?.explorerRows) ? data.awards.explorerRows.length : 0;
if (!matching) failures.push('matching award corpus count is missing');
if (shippedAwards !== matching) failures.push(`full normalized award corpus is not shipped: ${shippedAwards}/${matching} rows present`);

const requiredFiles = [
  'PROCUREMENT_1_0_RELEASE_GATE.md',
  'PROCUREMENT_QUARTERLY_SPEC.md',
  'data/procurement-schema.json',
  'scripts/validate-procurement-preview.mjs',
  'CITATION.cff',
  'data/procurement-source-manifest.json',
  'data/procurement-qa-report.json',
  'data/procurement-checksums.json'
];
for (const rel of requiredFiles) if (!fs.existsSync(path.join(root, rel))) failures.push(`missing required 1.0 artifact: ${rel}`);

const coverage = data.meta?.sourceCoverage || [];
if (!coverage.length || !coverage.every(x => x.url && x.name)) failures.push('source perimeter metadata incomplete');
if (!Array.isArray(data.meta?.limitations) || !data.meta.limitations.length) failures.push('limitations register missing');

if (failures.length) {
  console.log('PROCUREMENT 1.0 GATE: OPEN');
  failures.forEach(x => console.log(`- ${x}`));
  process.exit(1);
}

console.log('PROCUREMENT 1.0 GATE: CLOSED');
console.log(`Full ${matching}-row award corpus and required provenance/QA/citation artifacts are present.`);
