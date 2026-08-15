import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const exists = rel => fs.existsSync(path.join(root, rel));
const readJson = rel => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const failures = [];

const manifest = readJson('data/manifest.json');
const serialized = manifest.parts.map(name => fs.readFileSync(path.join(root, 'data', name), 'utf8')).join('');
const data = JSON.parse(serialized);
const matching = Number(data.awards?.matchingAwards || 0);
const shippedAwards = Array.isArray(data.awards?.explorerRows) ? data.awards.explorerRows.length : 0;

if (!matching) failures.push('matching award corpus count is missing');
if (shippedAwards !== matching) failures.push(`full normalized award corpus is not shipped: ${shippedAwards}/${matching} rows present`);

for (const rel of [
  'PROCUREMENT_1_0_RELEASE_GATE.md',
  'PROCUREMENT_QUARTERLY_SPEC.md',
  'data/procurement-schema.json',
  'scripts/validate-procurement-preview.mjs',
  'CITATION.cff',
  'data/procurement-source-manifest.json',
  'data/procurement-qa-report.json',
  'data/procurement-checksums.json'
]) if (!exists(rel)) failures.push(`missing required 1.0 artifact: ${rel}`);

const coverage = data.meta?.sourceCoverage || [];
if (!coverage.length || !coverage.every(x => x.url && x.name)) failures.push('source perimeter metadata incomplete');
if (!Array.isArray(data.meta?.limitations) || !data.meta.limitations.length) failures.push('limitations register missing');

if (exists('data/procurement-source-manifest.json')) {
  const provenance = readJson('data/procurement-source-manifest.json');
  if (!Array.isArray(provenance.records) || provenance.records.length !== coverage.length) failures.push('source manifest does not cover every declared source family');
  for (const source of provenance.records || []) {
    for (const field of ['id','publisher','source_family','landing_url','acquisition_endpoint','access_mode','archive_status','rights_note','retrieval_code']) {
      if (!source[field]) failures.push(`source manifest ${source.id || '(unknown)'} missing ${field}`);
    }
    if (source.archive_status?.startsWith('archived') && !/^[0-9a-f]{64}$/i.test(source.content_sha256 || '')) failures.push(`${source.id}: archived source missing SHA-256`);
  }
}

if (exists('data/procurement-qa-report.json')) {
  const qa = readJson('data/procurement-qa-report.json');
  if (qa.qa_scope !== 'full-release') failures.push(`QA scope is ${qa.qa_scope || 'missing'}, not full-release`);
  if (qa.promotion_eligible !== true) failures.push('QA report does not mark the object promotion-eligible');
  const requiredPassing = [
    'full_award_corpus_released',
    'full_award_corpus_exact_duplicate_test',
    'full_award_corpus_key_collision_report',
    'full_award_corpus_missingness_report',
    'full_release_checksum_manifest',
    'clean_environment_regeneration'
  ];
  for (const key of requiredPassing) if (qa.checks?.[key] !== 'passing') failures.push(`QA check not passing: ${key}`);
  if (Number(qa.counts?.matching_award_corpus) !== matching) failures.push('QA matching-award count drifts from released object');
  if (Number(qa.counts?.award_rows_shipped_as_release_rows) !== matching) failures.push('QA does not confirm every matching award is shipped');
}

if (exists('data/procurement-checksums.json')) {
  const checksums = readJson('data/procurement-checksums.json');
  if (checksums.release_state !== '1.0') failures.push('checksum manifest is not tied to release state 1.0');
  if (!Array.isArray(checksums.files) || !checksums.files.length) failures.push('checksum manifest contains no files');
  for (const item of checksums.files || []) {
    if (!item.path || !/^[0-9a-f]{64}$/i.test(item.sha256 || '')) failures.push(`invalid checksum record for ${item.path || '(missing path)'}`);
  }
}

if (failures.length) {
  console.log('PROCUREMENT 1.0 GATE: OPEN');
  [...new Set(failures)].forEach(x => console.log(`- ${x}`));
  process.exit(1);
}

console.log('PROCUREMENT 1.0 GATE: CLOSED');
console.log(`Full ${matching}-row award corpus and substantive provenance, QA, checksum and reproducibility requirements passed.`);
