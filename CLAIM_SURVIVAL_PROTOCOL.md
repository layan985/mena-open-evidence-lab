# Claim Survival Project — Protocol 0.1

_Last updated: 22 August 2026_

## Research question

When an economic claim about a MENA economy was made using the official data available at the time, does the claim still hold after later official revisions?

The project studies the stability of claims, not whether an author acted reasonably when the claim was originally made.

## Core design

Each observation is a claim made in a dated public document that can be linked to an official statistical series available before or on the claim date.

Examples include claims about:

- contraction versus growth;
- acceleration versus deceleration;
- unemployment increasing or decreasing;
- inflation crossing a threshold;
- fiscal or debt ratios crossing a threshold;
- country or sector rankings;
- record highs/lows;
- convergence/divergence statements.

## Inclusion criteria

A claim enters the study only if:

1. the exact publication date is known;
2. the claim can be stated as a falsifiable proposition;
3. the underlying statistic or derived statistic can be identified;
4. the contemporaneous official vintage can be recovered or otherwise independently verified;
5. a later comparable official vintage exists;
6. the claim does not depend mainly on private forecasts or undisclosed data.

## Sampling

Pilot target: 100 claims.

Pre-register strata before coding outcomes:

- 25 government/official reports;
- 25 multilateral or development-institution reports;
- 25 financial/economic research outputs;
- 25 major media or public-policy claims.

The initial pilot covers Saudi Arabia, Jordan, Morocco and Tunisia. Expansion to other countries happens only after historical-vintage recoverability is established.

Claims are sampled from a fixed search window and source list established before outcome coding. Researchers must not preferentially select claims known to reverse.

## Information sets

For every claim store:

- `claim_id`
- source title and publisher
- publication date
- verbatim claim excerpt, subject to quotation limits in public outputs
- normalized proposition
- referenced indicator
- reference period
- contemporaneous vintage date
- contemporaneous value
- latest comparable vintage date
- latest comparable value
- methodology regime at both dates
- transformation needed to reproduce the claim
- source hashes
- code commit
- coder ID
- validation state

## Outcomes

### Exact survival

The proposition has the same truth value under the later comparable official vintage.

### Direction survival

For directional claims, the sign/direction remains unchanged.

### Threshold survival

A threshold-based conclusion remains on the same side of the pre-specified threshold.

### Ranking survival

An ordering statement remains unchanged.

### Magnitude-class survival

A claim remains within the same pre-registered magnitude bin. Bins must be defined before outcome coding and tailored to the indicator.

### Narrative reversal

The later vintage changes the qualitative conclusion, such as:

- contraction → growth;
- falling → rising;
- below threshold → above threshold;
- A > B → B > A.

## Primary estimands

Report:

- overall exact Claim Survival Rate;
- direction survival rate;
- threshold survival rate;
- ranking survival rate;
- narrative-reversal rate;
- results by publisher class;
- results by indicator;
- results by revision type: routine revision versus methodology shock.

All estimates include Wilson confidence intervals. Small strata are shown descriptively and not over-interpreted.

## Important confound: methodology shocks

A claim that changes only because a statistical office changes base year, coverage, classification or benchmark data is not pooled blindly with routine revisions.

Primary tables separate:

1. routine-vintage revisions;
2. comprehensive/methodological revisions;
3. claims for which the later series is no longer sufficiently comparable.

Category 3 is not coded as a failure. It is coded `comparability_lost`.

## Double coding

At least 20% of the pilot claims are independently coded by a second researcher.

Report inter-coder agreement for:

- normalized proposition;
- underlying indicator match;
- outcome classification.

Disagreements are preserved in a public adjudication log.

## Null and negative results

A high survival rate is a publishable result. The project is not designed to manufacture reversals.

If 97 of 100 claims survive, that is the finding.

## Public release package

A publishable release must include:

- protocol version;
- sampling manifest;
- claim dataset with legally safe excerpts/links;
- historical and current source manifest;
- transformation code;
- coder decision log;
- robustness tables;
- correction mechanism.

## Pilot hypotheses

These are directional hypotheses, not claims:

H1: claims relying on first-release quarterly GDP will exhibit lower survival than claims based on mature annual estimates.

H2: claims spanning methodology shocks will have lower comparability than claims within a fixed methodological regime.

H3: archive reconstructability will be a binding constraint on sample construction and should itself be reported as a result.
