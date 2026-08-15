# Public Quantitative Release Standard

_Last updated: 16 August 2026_

This standard applies to public quantitative releases produced by the MENA Open Data & Evidence Lab. A release is not promoted because it looks complete. It is promoted only when its evidence package and release gate are satisfied.

## Required evidence package

Every serious release should expose, where applicable and legally permitted:

- publication page;
- executive brief;
- full report when appropriate;
- dataset and CSV, plus Parquet for larger structured data;
- data dictionary and metric dictionary;
- methodology;
- source register and source-file manifest;
- source hashes;
- QA report and missingness report;
- limitations register;
- claim ledger;
- code and environment lock;
- reproduction instructions;
- change log and correction path;
- suggested citation;
- DOI for flagships;
- external-review record only when completed;
- independent-reproduction record only when completed;
- machine-readable metadata;
- a “What would falsify this?” section for major analytical releases.

## Release gate

A public quantitative release must not be marked frozen/final until the applicable checks pass:

1. source completeness;
2. schema validation;
3. duplicate checks;
4. type validation;
5. range validation;
6. missingness review;
7. referential integrity;
8. expected-count checks;
9. hash manifest;
10. unit tests;
11. analysis tests;
12. chart regeneration from code;
13. clean-environment run;
14. claim ledger review;
15. limitations register;
16. citation metadata;
17. release metadata.

CI should enforce every machine-checkable gate. Human review gates must remain explicitly pending until review evidence exists.

## Provenance chain

Every material public number should be traceable through:

`public claim → metric definition → analysis output → processed variable → transformation script → raw observation → source file → publisher → release date → source URL → file hash`

Where source redistribution is prohibited, retain metadata and a hash rather than republishing the source file.

## Data layout

Research repositories should keep raw data distinct from analysis data:

`raw/` → `interim/` → `processed/` → `analysis/` → `outputs/`

Supporting material belongs in `docs/`, `tests/`, `metadata/` and `release/`. Raw objects are immutable; transformations are scripted.

## Freshness metadata

Live products should display, where meaningful:

- **LAST REFRESHED**
- **DATA THROUGH**
- **SOURCE RELEASE**
- **PIPELINE VERSION**
- **NEXT EXPECTED UPDATE**

Freshness is a data property, not decorative copy.

## Validation labels

Evidence labels describe what has actually happened. Internal QA is not external review. Founder reruns are not independent reproduction. A release may remain useful while carrying `PENDING VALIDATION`; the label changes only when the corresponding reviewable record exists.
