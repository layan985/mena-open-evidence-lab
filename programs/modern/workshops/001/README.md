# MODERN Workshop 001 — Reproduce an Economics Result from Raw Data

**Format:** 90 minutes  
**Level:** undergraduate / early graduate / research assistant  
**Prerequisites:** basic Python or willingness to follow a script  
**Output:** every participant produces a clean table, regression result, figure, and reproducibility check from the same raw file.

## Research question
Did the introduction of a hypothetical employment-support policy increase employment in treated regions relative to untreated regions?

The exercise uses a **synthetic teaching dataset** created for MODERN. It contains no real individuals and makes no empirical claim about an actual policy.

## Files
- `data/panel.csv` — raw synthetic region-year panel
- `analysis.py` — reference analysis using only Python standard library + numpy/pandas/statsmodels if available
- `exercise.md` — participant tasks
- `answer_key.md` — expected reasoning and checks
- `instructor_guide.md` — 90-minute facilitation plan

## Learning objectives
Participants should leave able to:
1. distinguish raw from processed data
2. inspect treatment timing and panel structure
3. document exclusions and transformations
4. estimate a simple difference-in-differences specification
5. understand why clustering and pre-trend diagnostics matter
6. reproduce another person's output from a clean environment
7. record provenance and limitations rather than hiding them

## Completion evidence
Workshop 001 counts toward MODERN impact metrics only after:
- registration link is public
- materials are public
- attendance is archived
- at least one participant other than the instructor completes the reproduction check

## Integrity boundary
The dataset is synthetic and the workshop is pedagogical. No result from this exercise should be presented as evidence about a real MENA policy or labor market.
