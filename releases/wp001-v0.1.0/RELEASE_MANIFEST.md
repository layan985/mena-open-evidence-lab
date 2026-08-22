# Release Manifest — Working Paper 001 v0.1.0

## Release

**Title:** When Does a Statistical Time Series Stop Being the Same Series?  
**Release ID:** `MENA-LAB-WP001-v0.1.0`  
**Date:** 2026-08-22  
**Author:** Layan Aloreidi  
**Institution:** MENA Open Data & Evidence Lab  
**Status:** Pilot working paper; source-verified cases; external methodological review pending

## Files in the release

1. `research/working-paper-001-method-discontinuities.md` — narrative working paper.
2. `data/method-change-registry-v0.1.json` — machine-readable case ledger.
3. `method-change-registry.html` — public rendering of the registry.
4. `EVIDENCE_PROVENANCE_STANDARD.md` — Lab provenance requirements.
5. `CONTRIBUTING_EVIDENCE.md` — correction and contribution protocol.
6. `CITATION.cff` — repository citation metadata.

## Review state

### Source verification

Required for every case before entry. A case must be traceable to the statistical producer or another preserved first-party source.

Current pilot status:

- Saudi Arabia — source verified
- Jordan — source verified
- Morocco — source verified; producer method-confirmation request sent 22 Aug 2026
- Tunisia — source verified at registry-entry level; additional bridge documentation should be retrieved before stronger historical comparability claims
- Egypt — source verified at registry-entry level; official linked-series documentation should be retrieved before stronger level-comparison claims

### Independent review

Not yet complete. The paper must remain labelled `working paper / pilot` until at least one non-author reviewer checks:

- case-source correspondence;
- change-type classification;
- bridge-status classification;
- user-action wording;
- claim boundaries.

## Reproduction test

A reproducer should be able to perform the following without contacting the author:

1. Open the machine-readable registry.
2. Select one record.
3. Follow the first-party source URL(s).
4. Verify that the documented change occurred.
5. Determine whether the stated comparability consequence follows from the producer documentation.
6. Confirm that the working-paper description matches the registry record.
7. Record any disagreement through the public contribution/correction process.

A reproduction is considered successful when steps 1–6 can be completed and no material undocumented assumption is required.

## Claims deliberately withheld

This release does not claim:

- that methodological breaks are unusually frequent in MENA;
- that any country or statistical producer is less credible because revisions occur;
- that the five cases are representative of the region;
- that a composite quality or revision score is currently justified;
- that every historical observation crossing a method change is unusable.

## Next release gates

Version 0.2 should not be released until:

- at least 10 source-verified records exist;
- bridge status is explicitly coded for every record;
- at least one non-author review is completed;
- any material disagreement is published in a review log;
- the machine-readable schema is validated against all cases;
- a frozen source snapshot or hash is preserved where licensing and access conditions permit.

## Suggested citation

Aloreidi, L. (2026). *When Does a Statistical Time Series Stop Being the Same Series? A source-linked pilot audit of methodological discontinuities in MENA official statistics.* MENA Open Data & Evidence Lab Working Paper 001, v0.1.0.

## Corrections

Corrections must be visible and versioned. A factual or classification correction should update the registry, paper, and manifest together and record the reason for the change in the commit history and, for material changes, a public correction note.
