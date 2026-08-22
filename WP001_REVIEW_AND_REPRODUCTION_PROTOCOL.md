# WP001 External Review and Reproduction Protocol

## Purpose

Working Paper 001 — *When Does a Statistical Time Series Stop Being the Same Series?* — is a source-verified release candidate. Promotion beyond v0.2.0-rc1 requires external review and non-author reproduction.

## Release under review

- `WORKING_PAPER_001_METHOD_DISCONTINUITIES.md`
- `data/method-change-registry-v0.2.json`
- `data/series-compatibility-table-v0.2.csv`

The current registry contains 15 purposively selected, source-verified discontinuities across 11 countries. It is not a representative sample of MENA official statistics.

## Reviewer task

For a minimum of 10 records, independently answer:

1. Does the first-party source document the stated method change?
2. Is the affected period represented correctly?
3. Are the earlier and later statistical regimes described accurately?
4. Is the normalized bridge class supported?
5. Is the direct-comparability decision defensible?
6. Is the recommended user action defensible?
7. Is any claim stronger than the source permits?

Allowed decisions:

- `agree`
- `agree_with_minor_edit`
- `disagree_change_classification`
- `disagree_bridge_status`
- `disagree_user_action`
- `insufficient_source_evidence`

Every disagreement should include a reason and, where possible, a replacement source or wording.

## Independent reproduction task

The reproducer works only from the published release files and cited first-party sources.

For at least five assigned cases, reconstruct:

- country
- producer
- series
- earlier regime
- later regime
- affected period
- documented change
- bridge class and bridge status
- direct-comparability decision
- recommended user action
- source URLs

The reproduction succeeds only if the substantive record can be reconstructed without asking the author what the intended answer was.

## Disagreement handling

The Lab will publish material disagreements and corrections with:

- record ID
- reviewer/reproducer decision
- original wording
- proposed correction
- final disposition
- date resolved
- release version containing the change

Disagreement is not treated as failure. A visible correction trail is part of the research object.

## Promotion gate

WP001 may move from release candidate to a reviewed release only when:

- all 15 candidate records have a documented bridge class;
- one non-author methodological review covers at least 10 records;
- one independent reproduction covers at least 5 records;
- material disagreements are resolved or explicitly left open;
- the frozen reviewed registry and compatibility table generate all aggregate descriptive claims;
- the correction/disagreement record is public.

## Claims prohibited before broader sampling

Even after reproduction, this pilot will not support claims about:

- the regional prevalence of undocumented method breaks;
- rankings of statistical agencies;
- whether revision frequency or size measures statistical quality;
- the share of all MENA series with official bridges;
- causal downstream bias from methodology breaks.

Those questions require separate sampling and identification designs.

## Reviewer acknowledgement

Reviewers may be named, anonymous, or acknowledged only by institution or field. Review does not imply endorsement of the broader research programme.
