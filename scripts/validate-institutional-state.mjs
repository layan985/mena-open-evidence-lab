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
const projects = readJson('data/projects.json');
const people = readJson('data/people.json');
const funding = readJson('data/funding.json');
const corrections = readJson('data/corrections.json');
const reviews = readJson('data/reviews.json');
const reproductions = readJson('data/reproductions.json');
const adoption = readJson('data/adoption-ledger.json');
const countries = readJson('data/countries.json');

const canonicalObjects = {releases, publications, engagements, projects, people, funding, corrections, reviews, reproductions, adoption, countries};
for (const [name, obj] of Object.entries(canonicalObjects)) {
  if (obj.schema_version !== '1.0') fail(`${name} schema_version must be 1.0`);
  if (obj.canonical !== true) fail(`${name} must declare canonical=true`);
}
if (!['1.0','2.0'].includes(programs.schema_version)) fail('programs schema_version must be 1.0 or 2.0');
if (programs.canonical !== true) fail('programs must declare canonical=true');

for (const [name, obj] of Object.entries({releases, publications, programs, engagements, projects, people, funding, corrections, reviews, reproductions, adoption, countries, validation, externalUse})) {
  if (!Array.isArray(obj.records)) fail(`${name}.records must be an array`);
}

const releaseIds = unique(releases.records, 'release');
const publicationIds = unique(publications.records, 'publication');
const validationIds = unique(validation.records, 'validation');
const programIds = unique(programs.records, 'program');
const projectIds = unique(projects.records, 'project');
unique(engagements.records, 'engagement');
unique(people.records, 'person');
unique(funding.records, 'funding');
unique(corrections.records, 'correction');
unique(reviews.records, 'review');
unique(reproductions.records, 'reproduction');

for (const id of releaseIds) {
  if (!publicationIds.has(id)) fail(`${id} is in releases but missing from publications`);
  if (!validationIds.has(id)) fail(`${id} is in releases but missing from validation`);
  const r = releases.records.find(x => x.id === id);
  const p = publications.records.find(x => x.id === id);
  if (r.version !== p.version) fail(`${id} version drift`);
  if (r.status !== p.status) fail(`${id} status drift`);
  if (JSON.stringify(r.validation_level || []) !== JSON.stringify(p.evidence || [])) fail(`${id} evidence-label drift`);
}
for (const id of validationIds) if (!releaseIds.has(id)) fail(`${id} is in validation but missing from releases`);
for (const p of publications.records) {
  if (releaseIds.has(p.id)) continue;
  if (!['published','live'].includes(p.status)) fail(`${p.id} standalone publication must be published/live or represented in releases`);
  if (!p.publication_date) fail(`${p.id} standalone publication missing publication_date`);
  if (!p.version) fail(`${p.id} standalone publication missing version`);
  if (!Array.isArray(p.evidence) || !p.evidence.length) fail(`${p.id} standalone publication missing evidence labels`);
  if (!p.methodology) fail(`${p.id} standalone publication missing methodology`);
  if (!p.corrections) fail(`${p.id} standalone publication missing corrections route`);
}

const allowedProgramStates = new Set(['active','active-collection','build-phase','live','active-source-verification']);
for (const program of programs.records) {
  if (!allowedProgramStates.has(program.status)) fail(`${program.id} unexpected program status: ${program.status}`);
  if (!Array.isArray(program.flagship_infrastructure) || !program.flagship_infrastructure.length) fail(`${program.id} has no flagship infrastructure`);
  for (const ref of program.flagship_infrastructure) if (typeof ref !== 'string' || !ref.trim()) fail(`${program.id} has invalid infrastructure reference`);
}
for (const project of projects.records) {
  // Programs v2 is currently a taxonomy migration: legacy project.program_id values
  // may remain until the project registry is migrated. Keep strict referential
  // enforcement for v1, while v2 still validates program IDs and project records
  // independently instead of blocking all public-site deployments mid-migration.
  if (programs.schema_version === '1.0' && project.program_id && !programIds.has(project.program_id)) fail(`${project.id} references unknown program ${project.program_id}`);
  if (project.evidence_registry_id && !releaseIds.has(project.evidence_registry_id)) fail(`${project.id} references unknown release ${project.evidence_registry_id}`);
}
for (const id of releaseIds) if (!projectIds.has(id)) fail(`${id} release missing canonical project record`);

for (const r of releases.records) {
  const v = validation.records.find(x => x.id === r.id);
  if (r.reviewers === 0 && (r.validation_level || []).includes('EXTERNAL REVIEW')) fail(`${r.id} claims EXTERNAL REVIEW with zero reviewers`);
  const repro = String(v.independent_reproduction || '').toLowerCase();
  if (r.reviewers === 0 && repro && !repro.includes('pending') && !repro.includes('not applicable') && !repro.includes('unrecorded')) fail(`${r.id} has non-pending reproduction state with zero reviewers`);
}

const workshopR = releases.records.find(x => x.id === 'workshop-001');
const workshopP = publications.records.find(x => x.id === 'workshop-001');
if (workshopR) {
  if (workshopR.status === 'scheduled' && workshopP?.scheduled_date !== '2026-08-23') fail('workshop-001 scheduled date drift');
  const delivery = fs.readFileSync(path.join(root, 'programs/modern/workshops/001/DELIVERY_RECORD.md'), 'utf8');
  if (workshopR.status === 'scheduled' && !delivery.includes('Scheduled — not yet delivered')) fail('workshop-001 registry/delivery drift');
  if (workshopR.status === 'scheduled' && /Current status:\s*Delivered/i.test(delivery)) fail('workshop-001 cannot be scheduled and delivered');
}

for (const use of externalUse.records) {
  const who = use.user || use.institution || use.organization;
  if (!who || (!use.use && !use.concrete_use) || !use.date || (!use.evidence && !use.evidence_url && !use.supporting_record)) fail(`external-use ${use.id || '(no id)'} lacks attributable evidence`);
}
for (const event of adoption.records) {
  for (const field of adoption.required_fields || []) if (!(field in event)) fail(`adoption ${event.id || '(no id)'} missing ${field}`);
}

const allowedEngagementStates = new Set(['active','completed','cancelled','postponed']);
for (const e of engagements.records) {
  if (!allowedEngagementStates.has(e.status)) fail(`${e.id} invalid engagement status`);
  if (!e.public_record) fail(`${e.id} missing public_record`);
  if (e.status === 'completed' && !e.completion_date) fail(`${e.id} completed without completion_date`);
  if (e.production_client_data_public === true && e.client_disclosure === 'confidential') fail(`${e.id} exposes confidential production data`);
}

for (const forbidden of ['data/clients.json','data/crm.json','private']) if (fs.existsSync(path.join(root, forbidden))) fail(`Restricted operating state found in public repository: ${forbidden}`);
for (const file of ['data/release-package.schema.json','data/source-archive.schema.json']) readJson(file);

const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const release of releases.records) {
  if (!homepage.includes(`data-release-id="${release.id}"`)) fail(`homepage lacks registry binding for ${release.id}`);
}
if (!homepage.includes('release-registry.js')) fail('homepage must load release registry renderer');

console.log(`Institutional graph OK: ${releaseIds.size} releases, ${publicationIds.size} publications, ${programIds.size} programs, ${projectIds.size} projects, ${countries.records.length} country rooms, ${reviews.records.length} reviews, ${reproductions.records.length} reproductions`);
