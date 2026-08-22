# WP001 Pilot Descriptive Summary — v0.2.0-rc1

## Scope

This summary describes only the **15 purposively selected, source-verified discontinuity records** in Method Change Registry v0.2. It is not an estimate of the prevalence of method breaks, bridge provision, or statistical practice across MENA official statistics.

## Bridge classification

The Registry uses three normalized bridge classes:

- `official_bridge` — producer supplies a revised, reconstructed, restated or overlapping historical series sufficient for the stated comparison use.
- `partial_or_provisional_bridge` — producer supplies some overlap/backcast/multiple-base history, but the bridge is provisional or incomplete for the comparison question.
- `no_verified_bridge` — the Lab has not yet verified a producer-supplied bridge for the relevant transition.

### Current 15-record pilot

| Bridge class | Records | Share of pilot |
|---|---:|---:|
| Official bridge | 7 | 46.7% |
| Partial/provisional bridge | 3 | 20.0% |
| No verified bridge | 5 | 33.3% |
| **Total** | **15** | **100%** |

## What this does support

Within the current selected cases, method discontinuities do not imply a single research response. Some producers provide a revised or reconstructed historical series, some provide partial or provisional overlap, and some transitions still require the researcher to preserve an explicit regime boundary until a bridge is verified.

The practical implication for users of the Registry is therefore not "always break the series" or "always use the latest series." The correct action depends on the producer's treatment of the transition and the research question:

- current historical analysis may appropriately use a producer-revised/reconstructed history;
- real-time analysis requires preserving the vintage actually available at the time;
- raw index levels across different bases require alignment or a producer-linked series;
- conceptual survey breaks may require a backcast rather than a direct splice;
- classification changes may require a concordance before detailed categories are joined.

## What this does NOT support

The pilot does not support claims such as:

- "46.7% of MENA statistical method breaks have official bridges";
- one country or producer is more transparent than another;
- missing bridge evidence means no bridge exists;
- methodological change is evidence of poor statistical quality;
- the current sample is representative by country, statistical domain, producer or time period.

## Review gate

These descriptive counts should remain labelled **pilot / release candidate** until:

1. every record has passed the public reproduction protocol;
2. at least one non-author reviewer has reconstructed a minimum of five records;
3. bridge classifications with unresolved producer questions are updated or explicitly frozen as unresolved;
4. disagreements and corrections are published in the version log.

## Reproduction

Source dataset: `data/method-change-registry-v0.2.json`

Reproduction logic:

```text
count records by bridge_class
share = count / total records
```

Expected output for v0.2.0-rc1:

```text
official_bridge: 7 / 15 = 46.7%
partial_or_provisional_bridge: 3 / 15 = 20.0%
no_verified_bridge: 5 / 15 = 33.3%
```

## Suggested citation

Aloreidi, L. (2026). *WP001 Pilot Descriptive Summary: Bridge Provision Across 15 Source-Verified Statistical Discontinuities*. MENA Open Data & Evidence Lab, v0.2.0-rc1.
