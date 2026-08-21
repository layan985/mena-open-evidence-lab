# MENA-RTD — Real-Time Data and Vintages Database

Version 0.1.0 · 21 August 2026

## Research object

MENA-RTD reconstructs the information set that was publicly available at a historical date. It does not treat today's revised historical database as if it had always existed.

For historical date `d`, define the information set

`I(d) = {all source-verified observations publicly available on or before d}`.

The core question is therefore not only “what was GDP growth in Q1?” but “what could an analyst actually have known about Q1 on date d?”

## Release clocks

A single indicator can have several valid clocks. MENA-RTD never silently merges them.

1. **first-public clock** — earliest source-verified public appearance of an estimate;
2. **flash clock** — a statistical agency's explicitly labeled flash estimate;
3. **full-release clock** — the agency's fuller quarterly release;
4. **catalogue clock** — the date attached to the release in the agency publication catalogue/archive;
5. **revision clock** — every subsequent release that changes a previously published value.

Every latency claim must name the clock used. A catalogue date is not automatically a first-public date.

## Observation model

Every release record should preserve, at minimum:

- country / ISO3;
- indicator and reference period;
- reference-period end;
- observed public date;
- formal catalogue date where available;
- release channel and release type;
- vintage / revision number;
- preliminary / final status;
- value and unit;
- base year / seasonal adjustment / methodology version where relevant;
- source URL, retrieval timestamp and source hash;
- transformation and code commit;
- license and validation status;
- explicit date-status flag when official metadata disagree.

## Statistical asynchrony

For country `c`, indicator `i`, reference period `t`, and a declared release clock, latency is

`L(c,i,t) = release_date(c,i,t) - period_end(t)`.

The Q1 2026 seed is designed as a release-architecture demonstration: Saudi Arabia exposes both a flash and fuller Q1 release, while other systems expose different publication structures. Cross-country latency must therefore be compared only after choosing a common clock or after reporting release architecture explicitly.

## Regional information completeness

For reference period `t` and historical date `d`:

`C(t,d) = sum_c w_c * 1{release(c,t) <= d} / sum_c w_c`.

Supported weight systems are:

- equal-country weights;
- GDP weights;
- population weights.

The weight system, source vintage and release clock are part of the statistic. They may not be omitted from publication.

## Information thresholds

For `p ∈ {0.50, 0.75, 0.90}`, define `T_p` as the first number of days after the end of the reference period at which `C(t,d) >= p`.

`T50` is the regional economic-information half-life. `T75` and `T90` describe deeper information completeness.

## Revision risk

For an initial estimate `Y_first` and later comparison vintage `Y_v`:

`R = Y_v - Y_first`.

Published revision-risk intervals are empirical distributions of historical revisions, not sampling confidence intervals. Every interval must declare the comparison horizon, e.g. first-to-next, first-to-one-year or first-to-latest.

## News versus noise

Revision analysis tests whether later revisions are approximately orthogonal to information in the initial estimate (“news”) or systematically predictable from the preliminary estimate (“noise”). Results are reported as model diagnostics, not as accusations of statistical error.

## Speed versus revision magnitude

The planned panel relates absolute subsequent revision magnitude to declared release latency, with country, indicator and time effects where support permits. Nonlinear and robust specifications are required because revision distributions need not be Gaussian.

No causal interpretation is permitted from the latency coefficient without an identification strategy.

## Pseudo-real-time validation

Nowcasting or latent-state models must be evaluated with information that actually existed at each historical date:

1. train on data available through historical date `d`;
2. freeze the model;
3. predict the next target;
4. reveal the first official release;
5. score;
6. advance the historical clock.

Current revised data may not leak backward into a historical information set.

## Forecast scoring

Where forecasting is used, report at least MAE and RMSE, and where probabilistic forecasts are produced also report calibration, interval coverage and CRPS. Model comparisons may use Diebold–Mariano tests when assumptions and sample support are adequate.

## Hostile specification rule

Every material finding must be subjected to at least one deliberately unfavorable but defensible specification. If the headline result depends on one convenient release clock, weight system, vintage definition or sample restriction, that dependence must be visible in the publication.

## Build state

The repository currently contains a source-verified Q1 2026 release-clock seed. The 2015–2026, ten-economy, five-indicator backfill is a build target, not a completed dataset. No release-count claim is made until the registry can substantiate it.
