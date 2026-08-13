# MENA Evidence Terminal — Product Contract v0.1

The **MENA Evidence Terminal** is the product layer of the MENA Open Data & Evidence Lab. MODERN contributors build and validate the objects exposed through it.

## Search contract

A user should be able to search a statistical series, policy event, company/entity, document or released dataset. A validated result should expose, where applicable:

- current value and unit;
- historical observations;
- geography and frequency;
- source institution;
- original source document;
- canonical source URL;
- retrieval date;
- source/release revision history;
- methodological notes and definitions;
- transformed variables and transformation lineage;
- licensing / redistribution status;
- recommended citation and DOI;
- downloadable CSV and Parquet;
- API endpoint;
- exact release Git commit;
- responsible release/contributors;
- validation status and correction history.

A missing field must be represented as missing. The Terminal must never infer or fabricate source metadata to make a record appear complete.

## Core object types

### Series
A time-indexed or panel statistic with explicit units, dimensions, frequency, source definition and revision lineage.

### Entity
A normalized company, institution, geography or other research entity with aliases and evidence-backed identity relationships.

### Event
A dated policy/economic event with jurisdiction, event class, source documents, coding notes, confidence and revision history.

### Document
A source artifact with publisher, date, URL/archive reference, retrieval metadata, license status and hashes where lawful/appropriate.

### Dataset release
A citable, versioned collection that passes the Lab release standard and links source objects to transformations and outputs.

## Research workflows

### Build research dataset
Select validated objects → choose variables/time/geographies → preserve transformations → export a research-ready manifest plus CSV/Parquet and provenance metadata.

### Run event study
Choose a validated event object + outcome series → define estimation window, event window and specification → run reproducibly → export code, results and manifest. The interface must distinguish exploratory output from a validated research claim.

### Audit provenance
Traverse output → transformation → raw/source object → source document/URL → retrieval/revision metadata → exact commit. Report broken or missing links explicitly.

## Validation states

1. `planned` — product/release slot only; no empirical claim.
2. `ingested` — source copied or referenced with metadata but not fully reviewed.
3. `reviewed` — provenance and transformation review complete.
4. `validated_release` — public release passed Lab standard.
5. `corrected` — a published release has a documented correction.
6. `retracted` — release should no longer be used; reason retained publicly.

Only `validated_release` and appropriately versioned `corrected` objects count toward the public validated-release scoreboard.

## API direction

Planned public namespace:

```text
GET /api/v1/search?q=
GET /api/v1/series/{id}
GET /api/v1/entities/{id}
GET /api/v1/events/{id}
GET /api/v1/documents/{id}
GET /api/v1/releases/{id}
GET /api/v1/releases/{id}/provenance
POST /api/v1/datasets/build
POST /api/v1/analysis/event-study
```

The API is a target until implemented and publicly deployed. Outside API users count only after documented external use.

## Distribution rule

Every published artifact should have a stable landing page that supports citation, download, machine access and reproduction. Social posts distribute artifacts; they do not substitute for them.

