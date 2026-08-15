# Data Provenance & Source Archive Standard

_Last updated: 16 August 2026_

## Canonical data layout

Public analytical projects use the following conceptual layers:

`raw/` → `interim/` → `processed/` → `analysis/` → `outputs/`

with supporting `docs/`, `tests/`, `metadata/` and `release/` directories.

Raw source objects are immutable. Transformations are scripted. Manual edits to analytical CSV files are not accepted as a reproducible transformation step.

## Provenance graph

Every material public claim should be resolvable through:

**public claim → metric definition → analysis output → processed variable → transformation script → raw observation → source file → publisher → release date → source URL → file hash**

A claim is not considered fully provenance-linked when a material link in this chain is unavailable and undisclosed.

## Source archive metadata

Where licensing permits, archive:

- source file;
- retrieval timestamp;
- SHA-256 hash;
- original filename;
- publisher;
- release date;
- MIME type;
- source URL;
- license/access notes.

Where redistribution is prohibited, retain metadata and hash only unless another lawful archival route applies.

## Evidence Terminal record

Terminal-ready observations add indicator, entity, value, unit, reference period, vintage, revision status, transformation, code commit, license and validation status.

## Correction behavior

A corrected transformation creates a new output/version. The historical source hash and superseded transformation record remain inspectable. Corrections must not erase the path by which the earlier result was produced.
