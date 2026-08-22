# MENA Statistical Comparability Graph — Specification v0.1

Released: 22 August 2026

## Purpose

The graph represents official statistics as statistical objects rather than isolated values. A shared label is not sufficient evidence that two values can be compared.

## Atomic node

Each node should identify, at minimum:

- country or geography
- indicator label
- numeric value and unit
- reference period
- population universe / denominator
- statistical concept
- source institution
- method regime or methodology version
- release date
- vintage identifier where available
- primary-source URL

The target production schema extends this with age universe, sex, labour-force status rules, survey or administrative source, frequency, seasonal-adjustment state, geographic coverage, transformation history, license, retrieval timestamp and content hash.

## Edge vocabulary

`exact` — same concept, population, period basis and method regime; direct comparison supported.

`comparable_with_adjustment` — comparison is defensible after a documented transformation or harmonization.

`different_population` — denominator or population universe differs materially.

`different_concept` — the measures answer different statistical questions despite similar language.

`different_method` — survey, register, estimator or methodological regime differs enough to require qualification.

`historical_break` — a change in classification, methodology, coverage, rebasing or data source creates a time-series break.

`requires_method_review` — surface metadata are insufficient to authorize a direct comparison.

`not_comparable` — evidence supports withholding a direct numerical comparison.

## Rule for direct comparability

Two nodes are not marked directly comparable merely because they share a country, period, unit or label. Direct comparability requires an affirmative match on the dimensions material to the question being asked.

Unknown is different from no. When the documentation needed to decide is missing, the graph records `requires_method_review` rather than manufacturing a binary answer.

## Claim boundary

The graph is a comparability instrument, not a ranking of national statistical systems or economic outcomes. A `not_comparable` edge is not evidence that either underlying statistic is wrong.

## Pilot

Version 0.1 contains labour-market examples from Saudi Arabia, Jordan and Morocco. It is deliberately small so the edge logic can be reviewed before scale-up.

Machine-readable release: `data/comparability-graph-v0.1.json`

Public interface: `comparability-graph.html`

## Planned validation gates

1. exact source excerpt attached to every material definition;
2. second-human review of edge classification;
3. reproducible source snapshot or hash where rights permit;
4. published change log for edge reclassification;
5. method-version identifiers for historical comparisons;
6. external review of the ontology before a region-wide release.
