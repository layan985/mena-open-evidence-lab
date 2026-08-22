# Working Paper 001

## When Does a Statistical Time Series Stop Being the Same Series?
### A source-linked pilot audit of methodological discontinuities in MENA official statistics

**Author:** Layan Aloreidi  
**Institution:** MENA Open Data & Evidence Lab  
**Version:** 0.2.0-rc1  
**Date:** 22 August 2026  
**Status:** Working paper / release candidate; independent reproduction pending

## Research question

When an official statistical series changes concept, base, weights, classification, survey design, sampling frame, compilation method or historical treatment, what determines whether observations on either side of that change can still be compared directly?

## Contribution

The paper treats method version as part of the statistical observation. It classifies documented discontinuities by the nature of the change, whether the producer supplies an official bridge or backcast, and the action a researcher should take before joining the series across regimes.

The pilot currently contains 15 source-verified records across 11 countries. These records are purposively selected because producer documentation is strong enough to support a concrete user action. They are not a representative sample of all MENA official statistics.

## Data objects

- `data/method-change-registry-v0.2.json` — 15 source-verified discontinuities.
- `data/series-compatibility-table-v0.2.csv` — one researcher-facing compatibility decision per record.
- `WP001_REVIEW_AND_REPRODUCTION_PROTOCOL.md` — independent review and reproduction criteria.

## Bridge classes

### official_bridge
The producer supplies a revised, reconstructed, restated or overlapping historical series sufficient for the stated comparison use.

### partial_or_provisional_bridge
The producer supplies some overlap, backcast or multiple-base history, but the bridge is provisional or does not resolve every comparison question.

### no_verified_bridge
The Lab has not verified a producer-supplied bridge for the relevant transition.

## Pilot descriptive result

Within the 15 purposively selected, source-verified cases:

- 7 have a verified `official_bridge`;
- 3 have a `partial_or_provisional_bridge`;
- 5 have `no_verified_bridge`.

These counts are a description of the pilot only. They must not be interpreted as estimates of the prevalence of bridge provision across MENA statistical systems.

## Main methodological finding

A statistical discontinuity does not imply a single universal response. The correct action depends on what changed and what the producer preserves.

In some cases, the producer reconstructs history and the researcher should use the reconstructed series for current analysis while preserving superseded vintages for real-time work. In other cases, the producer supplies only a provisional backcast or overlapping base history. Some transitions require explicit rebasing, classification concordance, or preservation of a method break because no official bridge has yet been verified.

Therefore, a time-series observation should be treated as at least:

`value × reference_period × release_vintage × method_version × source`

rather than as `value × date` alone.

## Claim boundary

This paper does not rank statistical agencies, does not treat revisions or redesigns as evidence of poor statistical quality, and does not claim that the 15 pilot cases are representative of the region. Method changes can improve measurement. The research object is the comparability consequence for downstream users.

## Reproduction gate

The paper will not be promoted beyond release-candidate status until at least one non-author reproducer can reconstruct at least five records from the public first-party sources without asking the author for the intended answer.

Material disagreements will be published and versioned.

## Suggested citation

Aloreidi, L. (2026). *When Does a Statistical Time Series Stop Being the Same Series? A source-linked pilot audit of methodological discontinuities in MENA official statistics.* MENA Open Data & Evidence Lab Working Paper 001, v0.2.0-rc1.
