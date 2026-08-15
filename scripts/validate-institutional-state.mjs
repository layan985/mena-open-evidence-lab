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

const canonicalObjects = {releases, publications, programs, engagements, projects, people, funding, corrections, reviews, reproductions, adoption, countries};
for (const [name, obj] of Object.entries(canonicalObjects)) {
  if (obj.schema_version !== '1.0') fail(`${name} schema_version must be 1.0`);
  if (obj.canonical !== true) fail(`${name} must declare canonical=true`);
}
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
for (const id of publicationIds) if (!releaseIds.has(id)) fail(`${id} is in publications but missing from releases`);
for (const id of validationIds) if (!releaseIds.has(id)) fail(`${id} is in validation but missing from releases`);

const crossProgramIds = new Set((programs.cross_program_infrastructure || []).map(x => x.id));
for (const program of programs.records) {
  if (program.status !== 'active') fail(`${program.id} unexpected program status`);
  if (!Array.isArray(program.flagship_infrastructure) || !program.flagship_infrastructure.length) fail(`${program.id} has no flagship infrastructure`);
  for (const ref of program.flagship_infrastructure) if (!releaseIds.has(ref) && !crossProgramIds.has(ref)) fail(`${program.id} references unknown infrastructure: ${ref}`);
}
for (const project of projects.records) {
  if (project.program_id && !programIds.has(project.program_id)) fail(`${project.id} references unknown program ${project.program_id}`);
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

console.log(`Institutional graph OK: ${releaseIds.size} releases, ${programIds.size} programs, ${projectIds.size} projects, ${countries.records.length} country rooms, ${reviews.records.length} reviews, ${reproductions.records.length} reproductions`);
