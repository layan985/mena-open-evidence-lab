# MENA Data Revision Atlas — Technical Specification

_Last updated: 20 August 2026_

## Research object

The Atlas preserves the chain:

**FIRST RELEASE → REVISION → CURRENT VALUE**

for official macroeconomic series where the source record permits reconstruction.

The Atlas is paired with the MENA Statistical Vintage Register (MSVR). MSVR freezes official values prospectively before later comparable vintages are known; the Atlas reconstructs and measures resolved revision chains where the archival record is sufficient.

## Observation schema

Each observation records:

- indicator and entity;
- reference period;
- first-release value and release date;
- each observed revision and revision date;
- current value and retrieval date;
- numerical difference and, where admissible, revision magnitude and direction;
- publication lag;
- comparison family;
- comparability state;
- methodology break or base-year change;
- series discontinuity;
- source disappearance or archival status;
- frequency;
- publisher and source URL;
- source-file hash when bytes are actually retrieved;
- extraction/transformation code commit;
- validation state;
- inclusion/exclusion from pooled revision statistics.

## Comparability states

### COMPARABLE
The earlier and later values describe the same statistical object closely enough that an ordinary numerical revision can be computed.

### RESTATEMENT
A later official release repeats or restates an earlier reference-period value, but the record is not a matched first-release-to-next-release pair of the same publication family. The numerical difference may be preserved, but the record is excluded from pooled ordinary-revision statistics unless separately adjudicated.

### METHOD_REVIEW
A changed number may coincide with rebasing, classification changes, reconstruction, database redesign, scope changes or another methodology event. The numerical difference may be reported, but it is not labelled an ordinary revision until comparability is established.

### BREAK
The statistical object changed materially enough that the difference must not be interpreted as an ordinary revision.

## Revision rule

For a directly comparable rate expressed in percent:

`revision_pp = later_comparable_value - first_release_value`

Absolute revision is:

`absolute_revision_pp = abs(revision_pp)`

No revision statistic is assigned to METHOD_REVIEW or BREAK records.

## v0.1 release

`data/revision-atlas-v0.1.json` and `data/revision-atlas-v0.1.csv` contain the first public panel.

Version 0.1 contains:

- 11 GDP comparison records;
- 3 jurisdictions: Saudi Arabia, Jordan and Bahrain;
- 9 directly comparable Saudi quarterly flash-to-later GDP pairs;
- 1 Jordan restatement record;
- 1 Bahrain methodology-review record.

Only the nine Saudi records are included in the v0.1 pooled revision statistics. This is deliberate. Version 0.1 is not presented as a MENA-wide estimate of revision behaviour.

For that comparable Saudi subset:

- mean signed revision: +0.122 percentage points;
- mean absolute revision: 0.167 percentage points;
- median signed revision: +0.1 percentage points;
- 6 upward, 2 unchanged, 1 downward;
- largest absolute headline revision: +0.7 percentage points, Saudi Arabia Q1 2025.

These are descriptive statistics for one statistical authority and one publication family, not measures of regional data quality.

## Research outputs

The Atlas is designed to support questions including:

- which MENA macro indicators are most heavily revised;
- how revision magnitudes vary by publication stage and lag;
- whether headline stability masks component revisions;
- which statistical systems preserve historical vintages;
- how much real-time-data uncertainty researchers and decision-makers face;
- where apparent revisions are actually methodology breaks.

## Rules

Current values never overwrite historical vintages. Methodology changes are distinct from ordinary revisions. A missing historical release is represented as an archival gap, not reconstructed from later values. Every published revision statistic must resolve to the underlying official release records. File hashes are published only when the underlying binary bytes have actually been retrieved. A changed number is not called a revision merely because two official values differ.
