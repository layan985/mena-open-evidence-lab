# MENA Open Data & Evidence Lab

Open, auditable economic measurement infrastructure for the Middle East and North Africa.

## Current release
**MODE-DATA-0001 v0.2.0** — 24 numeric observations, 8 geography/release rows, 5 official institutions, 0 composite scores.

The pilot preserves comparability problems rather than hiding them: Jordan's H1 rate is not treated as a monthly YoY observation; Tunisia remains July rather than being relabeled June; Palestine is disaggregated and conflict-sensitive.

All records are first-party source-checked but remain `raw` until an independent verifier reruns the release.

## Components
- `data/processed/` — released observations
- `provenance/` — source and checksum records
- `src/mode/` — validation CLI and read-only FastAPI API
- `benchmark/` — MENA-EconBench specification
- `recruitment/` — founding researcher work test
- `GOVERNANCE.md` / `RELEASE_POLICY.md` — institutional rules

## API
Run `uvicorn mode.api:app --reload`, then inspect `/countries`, `/observations`, `/sources`, and `/releases`.

## Principle
**Real numbers first. Composite later—after the missing layers survive audit.**
