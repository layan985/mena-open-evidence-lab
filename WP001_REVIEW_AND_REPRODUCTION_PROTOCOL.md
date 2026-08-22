# WP001 External Review and Reproduction Protocol

## Purpose

Working Paper 001 — *When Does a Statistical Time Series Stop Being the Same Series?* — is currently a source-verified pilot. Version 0.2 will not promote the pilot into a descriptive regional result until at least one non-author reviewer and one independent reproducer have completed the checks below.

## Reviewer task

The reviewer receives:

- `data/method-change-registry-v0.1.json`
- `data/series-compatibility-table-v0.1.csv`
- `WORKING_PAPER_001_METHOD_DISCONTINUITIES.md`
- the first-party source URLs listed in each record

For a minimum of 10 records, the reviewer independently answers:

1. Does the first-party source actually document the stated method change?
2. Is the affected period correctly represented?
3. Is the old/new statistical object described accurately?
4. Is the bridge/backcast status supported by the source?
5. Is the recommended user action defensible?
6. Is any claim stronger than the source permits?

Allowed decisions:

- `agree`
- `agree_with_minor_edit`
- `disagree_change_classification`
- `disagree_bridge_status`
- `disagree_user_action`
- `insufficient_source_evidence`

Every disagreement must include a reason and, where possible, a replacement wording or source.

## Independent reproduction task

The reproducer must work from the published release files rather than private notes.

For each assigned case, reproduce a structured row containing:

- country
- producer
- series
- earlier regime
- later regime
- documented change
- affected period
- bridge/backcast availability
- direct-comparability decision
- recommended user action
- source URL(s)

The reproduction succeeds only if the reproducer can reconstruct the substantive record from the public sources without asking the author what the intended answer was.

## Disagreement handling

The Lab will publish a disagreement log containing:

- record ID
- reviewer/reproducer decision
- original wording
- proposed correction
- final resolution
- date resolved
- version in which the change appeared

Disagreement is not treated as failure. A visible correction trail is part of the research object.

## Promotion gate for WP001 v0.2

WP001 may be promoted to v0.2 only when all of the following are true:

- at least 10 source-verified records are public;
- every record has a bridge/backcast status;
- one non-author methodological review is complete;
- one independent reproduction is complete;
- all material disagreements are either resolved or explicitly left open;
- a public correction/disagreement log exists;
- aggregate descriptive claims are generated from the frozen reviewed dataset rather than manually counted in prose.

## Claims still prohibited before the gate is met

The Lab will not claim:

- a regional prevalence rate for undocumented method breaks;
- that one statistical agency is more reliable than another;
- that larger or more frequent revisions imply lower statistical quality;
- that the ten pilot records are representative of all MENA official statistics;
- that a methodological break necessarily creates a quantitatively large bias in downstream research.

Those claims require separate sampling, validation or identification designs.

## Suggested reviewer acknowledgement

Reviewers may choose to be named, anonymous, or acknowledged only by institution/field. Review does not imply endorsement of the paper's broader programme.
