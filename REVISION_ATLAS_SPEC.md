# MENA Data Revision Atlas — Technical Specification

_Last updated: 16 August 2026_

## Research object

The Atlas preserves the chain:

**FIRST RELEASE → REVISION → CURRENT VALUE**

for official macroeconomic series where the source record permits reconstruction.

## Observation schema

Each observation records:

- indicator and entity;
- reference period;
- first-release value and release date;
- each observed revision and revision date;
- current value and retrieval date;
- revision magnitude and direction;
- publication lag;
- methodology break or base-year change;
- series discontinuity;
- source disappearance or archival status;
- frequency;
- publisher and source URL;
- source-file hash;
- extraction/transformation code commit;
- validation state.

## Research outputs

The Atlas is designed to support questions including which MENA macro indicators are most heavily revised, which statistical systems preserve historical vintages, and how large real-time-data uncertainty is.

## Rules

Current values never overwrite historical vintages. Methodology changes are distinct from ordinary revisions. A missing historical release is represented as an archival gap, not reconstructed from later values. Every published revision statistic must resolve to the underlying release records and hashes.
