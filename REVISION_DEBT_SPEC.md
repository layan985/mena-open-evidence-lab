# Revision Debt — Experimental Research Specification v0.1

Released: 22 August 2026

## Question

How much policy-relevant economic knowledge remains provisionally authoritative before later official evidence changes it?

## Core object

A revision event is a pair or chain of comparable official vintages for the same statistical object.

Minimum fields:

- geography
- indicator
- reference period
- earlier release date
- earlier value
- later release date
- later value
- comparable-unit revision magnitude
- elapsed days between vintages
- qualitative state before and after
- methodology-break flag
- source evidence for each vintage

## Experimental components

Revision Debt is not yet a validated headline index. Version 0.1 separates three components instead of hiding them inside one score:

1. **Magnitude** — absolute change in the indicator's natural comparable unit, such as percentage points for a growth rate.
2. **Exposure duration** — number of days the earlier official vintage was the latest available comparable estimate.
3. **Narrative consequence** — whether the revision changes a qualitative claim such as sign, ranking, threshold crossing or acceleration/deceleration.

A later research release may test a composite function of these components. No weighting scheme is treated as established in v0.1.

## Event classes

- sign reversal
- threshold reversal
- ranking reversal
- acceleration/deceleration reversal
- level revision without narrative reversal
- method-regime break

## Claim boundary

Revision is a normal part of official statistics and can improve measurement. Revision Debt does not score institutional competence, accuse agencies of error or imply that the underlying historical economy changed retroactively. It studies the time structure of the public information set.

## First case

Saudi Arabia 2023 real GDP growth:

- earlier official annual-growth vintage: -0.8%
- comprehensive-revision vintage: +0.5%
- comparable revision: +1.3 percentage points
- narrative class: sign reversal, contraction to growth

Primary evidence is preserved in `evidence/saudi-gdp-revision-2023.html` and the Vintage Vault.

## Validation programme

Before a composite Revision Debt index is published, the Lab will:

1. assemble a multi-country sample of directly comparable vintage chains;
2. pre-specify event-class rules;
3. test robustness to alternative exposure windows and magnitude normalizations;
4. distinguish ordinary revisions from methodology breaks;
5. publish examples where revisions do not alter the narrative;
6. seek external methodological review.
