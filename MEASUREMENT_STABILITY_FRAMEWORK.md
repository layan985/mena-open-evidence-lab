# MENA Measurement Stability Framework

_Last updated: 22 August 2026_

## Purpose

The Lab will not compress fundamentally different measurement problems into one arbitrary country score.

The core research object is a **Measurement Stability Matrix** with two separately reported axes:

1. **Statistical Revision Exposure (SRE)** — how much a published estimate changes across observed comparable vintages.
2. **Archive Reconstructability Grade (ARG)** — how completely an independent researcher can recover the information set that existed at a historical date.

Methodology changes, rebases, coverage expansions and classification changes are recorded as **measurement shocks** and analysed separately from ordinary revisions.

This structure prevents a country from appearing statistically 'bad' merely because it improves its methods, and prevents a well-documented large revision from being treated as equivalent to an unrecoverable historical record.

## Unit of analysis

The basic unit is an `entity × indicator × reference period × vintage` observation already defined by the MENA Data Revision Atlas.

Series-level metrics may be published only when all release records used in the calculation resolve to source evidence and validation state.

## Statistical Revision Exposure (SRE)

SRE is reported as a profile, not a black-box composite.

For each eligible series, calculate:

- **Median absolute revision**: median absolute change between first release and the selected later vintage.
- **Mean revision**: signed mean revision, to detect systematic upward/downward revision bias.
- **Revision dispersion**: interquartile range of revisions.
- **Large-revision rate**: share of observations exceeding a pre-registered materiality threshold appropriate to the indicator.
- **Sign-reversal rate**: share of eligible growth/rate observations that cross zero.
- **Direction-reversal rate**: share whose acceleration/deceleration conclusion changes after revision.
- **Threshold-reversal rate**: share crossing a pre-declared decision-relevant threshold.
- **Stabilisation lag**: elapsed time from first release until the latest observed material revision.

### Scaling

Do not pool raw revision magnitudes across unlike units. Percentage-point indicators, index growth rates and nominal levels remain separate unless transformed using an explicitly documented, domain-appropriate scale.

For cross-country comparison of the same indicator, report both the native-unit revision and a robust standardized revision:

`standardized revision = absolute revision / median absolute first-release movement`

The denominator must be estimated from the same country, indicator and frequency over a sufficiently long window. If the denominator is unstable or the sample is too small, standardized results are withheld.

## Archive Reconstructability Grade (ARG)

ARG is an evidence grade, not a judgement on statistical quality.

A historical release is tested on six recoverability conditions:

1. Original release can be retrieved from an official source or preserved official file.
2. Release date is independently verifiable.
3. Historical value is observable rather than reverse-engineered from a later vintage.
4. Methodology/base-year metadata applicable at release time is recoverable.
5. Source file is preservable with a stable hash.
6. A machine-readable or reproducibly extracted representation can be produced.

Grades:

- **A** — 6/6 conditions satisfied.
- **B** — 5/6 satisfied; no missing historical value or release-date evidence.
- **C** — 3–4/6 satisfied, or material metadata ambiguity remains.
- **D** — fewer than 3/6 satisfied or the historical published value cannot be independently recovered.

A later archive restoration may improve a grade. All grade changes remain in the provenance history.

## Measurement shocks

The following are never silently pooled with routine revisions:

- base-year changes;
- SNA implementation changes;
- new administrative sources;
- coverage expansions;
- informal-economy incorporation;
- classification changes;
- benchmark or census incorporation;
- seasonal-adjustment regime changes;
- break-in-series events.

For each shock, report before/after estimates, the documented methodological cause, denominator effects on derived ratios, and whether historical vintages remain recoverable.

## Minimum publication gates

No country or series ranking is released unless:

- at least 12 comparable reference periods are reconstructed for quarterly series or 8 for annual series;
- at least two distinct observed vintages exist per included reference period;
- at least 80% of included observations pass the Lab's source-resolution checks;
- missing-vintage patterns are disclosed;
- methodology shocks are separated from routine revisions;
- the calculation code and exact input manifest are released.

Small samples may appear only as **case studies**, not as ranked SRE results.

## First research outputs

1. Saudi Arabia: complete annual/quarterly GDP vintage chain around the comprehensive revision.
2. Morocco: 2007→2014 national-accounts base change as a measurement-shock case.
3. Tunisia: 1997→2015 national-accounts base change as a measurement-shock case.
4. Jordan: comprehensive national-accounts revision and reconstructed pre/post chain where sources permit.
5. Cross-country pilot: compare archive reconstructability before comparing revision exposure.

## Claim boundary

SRE measures instability in published statistical estimates. ARG measures recoverability of historical information sets. Neither measures institutional competence, political intent, truthfulness, or the underlying volatility of the economy.
