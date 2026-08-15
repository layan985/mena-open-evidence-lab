import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const fail = (msg) => { throw new Error(msg); };
const unique = (records, label) => {
  const seen = new Set();
  for (const r of records) {
    if (!r.id) fail(`${label} record missing id`);
    if (seen.has(r.id)) fail(`${label} duplicate id: ${r.id}`);
    seen.add(r.id);
  }
  return seen;
};

const releases = readJson('data/releases.json');
const publications = readJson('data/publications.json');
const validation = readJson('data/validation.json');
const externalUse = readJson('data/external-use.json');
const programs = readJson('data/programs.json');
const engagements = readJson('data/engagements.json');

for (const [name, obj] of Object.entries({releases, publications, programs, engagements})) {
  if (obj.schema_version !== '1.0') fail(`${name} schema_version must be 1.0`);
  if (obj.canonical !== true) fail(`${name} must declare canonical=true`);
  if (!Array.isArray(obj.records)) fail(`${name}.records must be an array`);
}
for (const [name, obj] of Object.entries({validation, externalUse})) {
  if (obj.schema_version !== '1.0') fail(`${name} schema_version must be 1.0`);
  if (!Array.isArray(obj.records)) fail(`${name}.records must be an array`);
}

const releaseIds = unique(releases.records, 'release');
const publicationIds = unique(publications.records, 'publication');
const validationIds = unique(validation.records, 'validation');
unique(programs.records, 'program');
unique(engagements.records, 'engagement');

for (const id of releaseIds) {
  if (!publicationIds.has(id)) fail(`${id} is in releases but missing from publications`);
  if (!validationIds.has(id)) fail(`${id} is in releases but missing from validation`);
  const r = releases.records.find(x => x.id === id);
  const p = publications.records.find(x => x.id === id);
  if (r.version !== p.version) fail(`${id} version drift: releases=${r.version}, publications=${p.version}`);
  if (r.status !== p.status) fail(`${id} status drift: releases=${r.status}, publications=${p.status}`);
  const a = JSON.stringify(r.validation_level || []);
  const b = JSON.stringify(p.evidence || []);
  if (a !== b) fail(`${id} evidence-label drift between releases and publications`);
}
for (const id of publicationIds) if (!releaseIds.has(id)) fail(`${id} is in publications but missing from releases`);
for (const id of validationIds) if (!releaseIds.has(id)) fail(`${id} is in validation but missing from releases`);

const crossProgramIds = new Set((programs.cross_program_infrastructure || []).map(x => x.id));
for (const program of programs.records) {
  if (program.status !== 'active') fail(`${program.id} unexpected program status: ${program.status}`);
  if (!Array.isArray(program.flagship_infrastructure) || !program.flagship_infrastructure.length) fail(`${program.id} has no flagship infrastructure`);
  for (const ref of program.flagship_infrastructure) {
    if (!releaseIds.has(ref) && !crossProgramIds.has(ref)) fail(`${program.id} references unknown infrastructure: ${ref}`);
  }
}

for (const r of releases.records) {
  const v = validation.records.find(x => x.id === r.id);
  if (r.reviewers === 0 && Array.isArray(r.validation_level) && r.validation_level.includes('EXTERNAL REVIEW')) {
    fail(`${r.id} claims EXTERNAL REVIEW with zero reviewers`);
  }
  const repro = String(v.independent_reproduction || '').toLowerCase();
  if (r.reviewers === 0 && repro && !repro.includes('pending') && !repro.includes('not applicable') && !repro.includes('unrecorded')) {
    fail(`${r.id} has a non-pending reproduction state with zero reviewers: ${v.independent_reproduction}`);
  }
}

const workshopR = releases.records.find(x => x.id === 'workshop-001');
const workshopP = publications.records.find(x => x.id === 'workshop-001');
if (workshopR) {
  if (workshopR.status === 'scheduled' && workshopP?.scheduled_date !== '2026-08-23') fail('workshop-001 scheduled date drift');
  const delivery = fs.readFileSync(path.join(root, 'programs/modern/workshops/001/DELIVERY_RECORD.md'), 'utf8');
  if (workshopR.status === 'scheduled' && !delivery.includes('Scheduled — not yet delivered')) fail('workshop-001 registry says scheduled but delivery record does not');
  if (workshopR.status === 'scheduled' && /Current status:\s*Delivered/i.test(delivery)) fail('workshop-001 cannot be both scheduled and delivered');
}

for (const use of externalUse.records) {
  const who = use.user || use.institution || use.organization;
  if (!who) fail(`external-use ${use.id || '(no id)'} missing attributable user/institution`);
  if (!use.use && !use.concrete_use) fail(`external-use ${use.id || '(no id)'} missing concrete use`);
  if (!use.date) fail(`external-use ${use.id || '(no id)'} missing date`);
  if (!use.evidence && !use.evidence_url && !use.supporting_record) fail(`external-use ${use.id || '(no id)'} missing reviewable evidence`);
}

const allowedEngagementStates = new Set(['active', 'completed', 'cancelled', 'postponed']);
for (const e of engagements.records) {
  if (!allowedEngagementStates.has(e.status)) fail(`${e.id} invalid engagement status: ${e.status}`);
  if (!e.public_record) fail(`${e.id} missing public_record`);
  if (e.status === 'completed' && !e.completion_date) fail(`${e.id} completed without completion_date`);
  if (e.production_client_data_public === true && e.client_disclosure === 'confidential') fail(`${e.id} cannot expose production client data while client disclosure is confidential`);
}

for (const forbidden of ['data/clients.json', 'data/crm.json', 'private']) {
  if (fs.existsSync(path.join(root, forbidden))) fail(`Restricted operating state found in public repository: ${forbidden}`);
}

console.log(`Institutional state OK: ${releaseIds.size} releases, ${programs.records.length} programs, ${engagements.records.length} public engagement record(s), ${externalUse.records.length} external-use record(s)`);
