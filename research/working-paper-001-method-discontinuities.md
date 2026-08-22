# Working Paper 001

## When Does a Statistical Time Series Stop Being the Same Series?
### A source-linked pilot audit of methodological discontinuities in MENA official statistics

**Author:** Layan Aloreidi  
**Institution:** MENA Open Data & Evidence Lab  
**Version:** 0.1.0  
**Release date:** 22 August 2026  
**Status:** Working paper / pilot  

## Abstract

A statistical series can remain visually continuous after the measurement system underneath it has changed. This working paper develops a source-linked audit framework for identifying such discontinuities and classifying their consequences for empirical use. The pilot covers five documented cases in Saudi Arabia, Jordan, Morocco, Tunisia and Egypt. For each case, the Lab records the statistical producer, affected series, effective period, documented methodological change, whether an official bridge or backcast exists, and the user action required for defensible historical comparison.

The pilot does not rank national statistical systems or treat revisions and methodology changes as evidence of poor quality. The object of study is statistical identity through time. The central result is practical: a researcher cannot infer continuity from a stable series label alone. At minimum, historical work should preserve the method version and test whether a methodological break changes the population, concept, classification, source regime, base year, sampling design or historical series. Where an official backcast exists, that bridge should generally replace a naive splice across the break. Where no bridge exists, the series boundary should remain explicit.

## Research question

When an official economic or social-statistical series undergoes a documented methodological change, what information is required to determine whether observations before and after the change can be treated as one comparable time series?

## Contribution

The contribution is a reproducible audit structure rather than a regional score. Each case is represented as:

`producer × series × affected period × method change × bridge availability × comparability consequence × user action × source`

This structure is designed to be independently checked and extended.

## Pilot cases

### 1. Saudi Arabia — national accounts comprehensive revision

GASTAT documents a comprehensive revision of national accounts around the 2023 revision cycle, including expanded data sources and methodological updates, with chain-linking introduced for real GDP in 2024.

**Comparability consequence:** archived and revised releases should retain explicit vintage identity for real-time analysis.  
**User action:** preserve release vintage; do not assume pre- and post-revision histories are interchangeable when reconstructing what information was available at a historical decision date.

### 2. Jordan — quarterly GDP comprehensive revision

Jordan's Department of Statistics states that quarterly GDP estimates from 2008 through Q2 2025 underwent a comprehensive revision. The revised system adopts ISIC Rev.4 and expands sector detail.

**Comparability consequence:** pre-revision and revised sector histories belong to different documented method states.  
**User action:** record the method version and avoid silently splicing archived sector histories into the revised series without an explicit bridge.

### 3. Morocco — EMO2026 labour-force survey

Morocco's HCP introduced EMO2026 with changes to employment and unemployment concepts, sample size, sampling frame and rotation design. HCP states that the new results are not directly comparable with the previously published ENE series and is publishing EMO-compatible backcast indicators for 2017–2025.

**Comparability consequence:** an apparent 2025–2026 jump can mix real labour-market change with methodological change.  
**User action:** use the EMO-compatible backcast for historical comparison where available; do not treat a direct splice from old ENE releases to EMO2026 as a clean economic trend.

### 4. Tunisia — residential property-price index methodology revision

Tunisia's INS interrupted publication of the quarterly property-price index during 2022–2023 while revising its calculation methodology, then resumed publication under the revised treatment.

**Comparability consequence:** the interruption and revised method must be preserved when constructing long property-price histories.  
**User action:** do not treat the publication gap as missing-at-random observations; identify the revised series boundary and any official retrospective treatment before joining periods.

### 5. Egypt — CPI base-year regime change

CAPMAS introduced a new CPI series in 2019 using 2018/19 as the base period, replacing the earlier CPI base regime.

**Comparability consequence:** index levels across base regimes are not directly comparable without rebasing or a documented bridge, although inflation rates may be comparable under narrower conditions if concepts and coverage remain aligned.  
**User action:** preserve the base regime and use official linked or rebased series for level comparisons.

## Classification framework

A method discontinuity is coded against one or more of the following fields:

- concept change
- population / denominator change
- classification change
- base or reference-year change
- survey replacement
- sampling-frame change
- sample-size change
- rotation-design change
- source expansion or administrative-data integration
- seasonal-adjustment change
- comprehensive historical revision
- chain-linking or index-construction change

## Bridge status

Each record receives one of four bridge states:

- `official_backcast_available`
- `official_linked_series_available`
- `bridge_documented_but_not_yet_retrieved`
- `no_verified_bridge`

The bridge state is central to user guidance. A methodological break does not automatically require discarding historical analysis; it requires explicit treatment.

## Claim boundary

This pilot does **not** estimate the prevalence of methodological discontinuities across all MENA statistics. The five cases were selected because first-party documentation was available and the comparability consequence could be described without speculation. No inference is made from the pilot about the relative quality, credibility or competence of statistical institutions.

## Reproducibility

Underlying records are available in:

`data/method-change-registry-v0.1.json`

The contribution protocol is available in:

`CONTRIBUTING_EVIDENCE.md`

All material corrections should be versioned rather than silently overwritten.

## Suggested citation

Aloreidi, L. (2026). *When Does a Statistical Time Series Stop Being the Same Series? A source-linked pilot audit of methodological discontinuities in MENA official statistics.* MENA Open Data & Evidence Lab Working Paper 001, v0.1.0.

## Primary-source register

See the machine-readable Method Change Registry for case-level first-party URLs and review status.
