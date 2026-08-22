# MENA-STAT-ID

**The number is not the statistic.**

MENA-STAT-ID is a bilingual, vintage-aware benchmark for testing whether a system preserves the identity of an official statistic while retrieving, comparing or summarising it.

## Public alpha

- Version: `0.1.0-alpha`
- Cases: 42
- Arabic/English prompt variants: 84
- Review state: founder-produced; independent methodological review pending
- Claim badges: `OFFICIAL SOURCE` · `REAL PUBLIC DATA` · `PENDING VALIDATION`

The alpha is a public construction and scoring release. It is not a blind leaderboard, a representative sample of MENA official statistics, or an assessment of statistical-office competence.

## Statistical identity

A response is evaluated as an identified object rather than a scalar:

`value · concept · population · geography · reference period · unit · adjustment · method version · vintage · source`

Only fields required by a case enter the exact-match score. A correct numeric value attached to a wrong population, method regime or vintage fails Statistical Identity Exact Match.

## Files

- `../../data/mena-stat-id-alpha.json` — canonical benchmark release
- `../../data/mena-stat-id-prompts.csv` — 84 prompt variants
- `../../data/mena-stat-id-schema.json` — JSON Schema
- `../../scripts/build_mena_stat_id.py` — deterministic builder
- `../../scripts/score_mena_stat_id.py` — dependency-free scorer
- `METHODOLOGY.md` — construction and metrics
- `REVIEW_PROTOCOL.md` — external-review contract
- `LAUNCH_POST.md` — public launch copy

## Rebuild

Run from the repository root:

```bash
python3 scripts/build_mena_stat_id.py
python3 -m unittest tests/test_mena_stat_id.py
```

## Prediction format

Submit JSON or JSONL records:

```json
{
  "id": "MSID-IDENTITY-001",
  "language": "en",
  "answer": {
    "value": 6.4,
    "unit": "percent",
    "population_scope": "LFS resident population subset"
  },
  "confidence": 0.92
}
```

The scorer uses only the case's declared `required_fields`. Extra answer fields are retained but do not improve the score.

## Source perimeter

The alpha is built deterministically from five already-published Lab evidence objects:

- unemployment comparability record;
- Saudi 2023 GDP vintage pair;
- ten first/later GDP revision pairs;
- six Jordan Arabic/English archive-timestamp pairs;
- fifteen statistical method-change records.

All underlying official-source links remain visible in each case. No source document is silently redistributed by this package.

## Citation

Aloreidi, L. (2026). *MENA-STAT-ID: Statistical Identity Benchmark*, v0.1.0-alpha. MENA Open Data & Evidence Lab.
