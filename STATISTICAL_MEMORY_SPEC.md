# MENA Statistical Memory — Specification v0.1

## Research object

MENA Statistical Memory preserves **what an official statistic said at each release time**, how later releases changed it, and whether the change altered the substantive interpretation of the historical record.

The atomic observation is:

`country × indicator × reference_period × release_time × vintage × value × unit × status × method_version × source`

The linked event is:

`from_vintage → to_vintage × numerical_delta × event_class × documented_reason × comparability_action`

The project is not a ranking of statistical agencies. Revisions are a normal and often desirable part of official statistics. The object of study is the **time structure of public information**: what analysts, journalists, researchers and policymakers could have known from the official record at a given date, and how that record later changed.

## Why this exists

Most public data portals optimize for the latest value. That is useful for current analysis but can erase the information state under which earlier decisions, forecasts, headlines and research were produced.

A current series can therefore answer:

> What is the official estimate now?

MENA Statistical Memory is designed to answer a different question:

> What was the official estimate then, when did it change, why did it change, and did the change alter the conclusion?

## Vintage record

Required fields:

- `country`
- `indicator_id`
- `indicator_label`
- `reference_period`
- `release_date`
- `vintage_id`
- `value`
- `unit`
- `status` — flash / preliminary / revised / final / comprehensive_revision / other
- `method_version`
- `source_url`
- `source_title`
- `retrieved_at`

Recommended fields:

- `population_or_sector_scope`
- `seasonal_adjustment`
- `price_basis`
- `reference_year`
- `classification_version`
- `source_hash`
- `archived_source_uri`
- `exact_source_excerpt`
- `notes`

## Revision event

A revision event links two verified vintages of the same statistical object.

Required fields:

- `event_id`
- `indicator_id`
- `reference_period`
- `from_vintage_id`
- `to_vintage_id`
- `old_value`
- `new_value`
- `absolute_delta`
- `delta_unit`
- `event_class`
- `documented_reason`
- `comparability_action`
- `claim_boundary`

## Event classes

Version 0.1 uses deliberately interpretable event classes rather than a composite score:

- `sign_reversal` — the sign of a growth/change estimate reverses.
- `threshold_reversal` — the estimate crosses a pre-specified analytical threshold.
- `ranking_reversal` — the ordering of two comparable objects changes.
- `acceleration_reversal` — the direction of acceleration/deceleration changes.
- `level_revision` — value changes without one of the above narrative reversals.
- `method_regime_change` — classification, base/reference year, concept, compilation method or source regime changes enough that version identity must be explicit.
- `correction` — an error correction explicitly identified by the producer.

One event may carry more than one class when justified.

## Comparability actions

- `replace_old_with_new_for_current_analysis`
- `preserve_old_for_real_time_analysis`
- `do_not_splice_method_regimes`
- `recompute_downstream_result`
- `method_review_required`

## First verified event

Saudi Arabia, real GDP growth, 2023:

- Earlier official vintage: **−0.8%** year-on-year real GDP growth for 2023, published with the Q4 2023 GDP release.
- Later official vintage after the comprehensive revision: **+0.5%** real GDP growth for 2023.
- Change: **+1.3 percentage points**.
- Event class: `sign_reversal` and `method_regime_change`.

GASTAT documents a comprehensive revision using richer surveys, administrative data, supply-and-use work, updated classifications and historical backcasting. The correct inference is not that one release was illegitimate. The research object is that the official historical interpretation changed from contraction to growth, and users studying real-time information need both vintages.

Primary sources:

- Q4 2023 GDP release: https://www.stats.gov.sa/documents/20117/2066979/GDP%2BFQ42023E_0.pdf/145eeef3-ea98-4826-5ad8-7a882d486564
- Annual National Accounts Publication 2023 after comprehensive revision: https://www.stats.gov.sa/documents/20117/2435267/Annual%2BNational%2BAccounts%2BPublication%2B2023%2BEN%2B28-4-2025.pdf/fe77080e-dd5a-bf4b-820c-da362b4b1bbe
- GASTAT comprehensive revision FAQ: https://stats.gov.sa/en/w/frequently-asked-questions-gdp-comprehensive-revision
- GASTAT revision policy: https://www.stats.gov.sa/en/w/revisions-and-revision-policy

## Validation gates

A revision event does not enter the public ledger unless:

1. both vintages are traceable to the statistical producer or a preserved first-party release;
2. the reference period and statistical object are matched explicitly;
3. any method/classification/reference-year change is recorded;
4. the numerical delta is reproducible;
5. the documented reason is separated from Lab interpretation;
6. a second-human review confirms the event classification for material cases;
7. corrections are versioned rather than silently overwritten.

## Research programme

### Phase 1 — 25 events

National accounts, labour-market headline measures and CPI across Saudi Arabia, Jordan and Morocco.

### Phase 2 — 100 events

Expand to Egypt, Tunisia, UAE, Qatar, Bahrain, Oman and Kuwait, with explicit method-version tracking.

### Phase 3 — real-time evidence research

Use the preserved vintages to study:

- how much first estimates differ from later estimates;
- which indicators are most revision-sensitive;
- whether sign/threshold/ranking reversals are common or rare;
- whether major public narratives were robust to later official revisions;
- whether forecasting or policy models trained on final data overstate real-time performance.

## Claim boundary

MENA Statistical Memory does **not** treat revision size as a measure of institutional competence, credibility or data quality. Large revisions can result from improved coverage and better methods. The project measures how the official information set evolves through time and gives users the evidence needed to reproduce analysis under the information actually available at the time.
