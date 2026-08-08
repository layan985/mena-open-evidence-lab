# MODERN Operating System

This file defines how MODERN moves work from an idea to a credited, public research object.

## Weekly cadence

### Monday — intake and assignment
- Review new dataset proposals, data-quality reports, partner leads, and workshop proposals.
- Research Coordinator assigns each accepted task an owner, reviewer, due date, and evidence requirement.
- No task enters production without a GitHub issue or equivalent public work item.

### Wednesday — production check
- Pod Leads review blockers, provenance, licensing, and methodological risks.
- Work that cannot identify a lawful source, reproducible transformation path, or reviewer is paused.

### Friday — review and merge
- Contributors submit work by pull request.
- A reviewer checks the QA checklist and either requests changes or approves.
- Merged work receives contribution credit; drafts and intentions do not.

### Monthly — release day
- Release candidates must pass dataset QA, provenance review, reproducibility review, and licensing review.
- A tagged public release is created with version, changelog, citation metadata, and evidence URL.
- The impact registry is rebuilt from evidence-backed registries.

## Work states
`proposed -> accepted -> in_progress -> review -> released`

A task may also be `blocked`, `rejected`, `withdrawn`, or `retracted`.

## Required ownership
Every active work item must have:
1. one accountable owner
2. one reviewer who is not the owner
3. one defined deliverable
4. one deadline
5. one evidence path

## Release gates
A dataset or research object is not released unless:
- source and retrieval date are recorded
- licensing/redistribution status is documented
- raw data are never silently overwritten
- transformations are scripted or explicitly documented
- identifiers and units are documented
- duplicate and missingness checks are run
- at least one independent reviewer reproduces the processed output or verifies hashes
- limitations are public
- citation metadata are present

## Meetings
MODERN defaults to asynchronous work. Meetings exist only for decisions, unblockers, methods review, workshops, or partner work. Meeting attendance alone never counts as a contribution.

## Credit
Credit follows verified contribution. Each release should record contribution roles using CRediT-style language when practical.

## Corrections
Any material correction must create a public issue, changelog entry, corrected release, and explanation of whether downstream results changed.
