import fs from 'node:fs';
const file = new URL('../data/releases.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
if (data.schema_version !== '1.0' || data.canonical !== true || !Array.isArray(data.records)) throw new Error('Invalid release registry header');
const required = ['id','project','version','validation_level','reviewers','status','row_metric'];
const ids = new Set();
for (const r of data.records) {
  for (const key of required) if (!(key in r)) throw new Error(`${r.id || 'record'} missing ${key}`);
  if (ids.has(r.id)) throw new Error(`Duplicate id: ${r.id}`);
  ids.add(r.id);
  if (!Array.isArray(r.validation_level) || !r.validation_level.length) throw new Error(`${r.id} missing validation labels`);
  if (!Number.isInteger(r.reviewers) || r.reviewers < 0) throw new Error(`${r.id} invalid reviewer count`);
  if (!r.row_metric || typeof r.row_metric.label !== 'string') throw new Error(`${r.id} invalid row metric`);
}
console.log(`Release registry OK: ${data.records.length} records`);
