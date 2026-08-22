# External review protocol

MENA-STAT-ID v0.1.0-alpha is seeking hostile methodological review. Review is counted only when an attributable review artifact can be published or its existence can be documented under an agreed disclosure boundary.

## Reviewer task

Audit at least 20 cases, including:

- four statistical-identity cases;
- all three comparison-validity cases;
- four vintage/revision cases;
- three bilingual-archive cases;
- six method-regime cases.

For each case, verify:

1. the source resolves or its failure is recorded;
2. the gold value and unit follow the cited source;
3. population, period, geography and vintage are correctly identified;
4. the prompt does not disclose the answer unintentionally;
5. Arabic and English prompts ask the same substantive question;
6. required fields are sufficient and do not demand unsupported precision;
7. the claim boundary prevents an inference the evidence cannot support.

## Review record

Return one record per audited case:

```json
{
  "case_id": "MSID-IDENTITY-001",
  "reviewer": "Name or agreed identifier",
  "source_verified": true,
  "gold_verdict": "agree",
  "translation_verdict": "agree",
  "scoring_verdict": "revise",
  "severity": "material",
  "note": "Population wording should reproduce the producer term exactly.",
  "reviewed_at": "YYYY-MM-DD"
}
```

Allowed verdicts are `agree`, `minor_revision`, `material_revision`, `unable_to_verify`.

## Promotion rule

The release remains alpha while any audited case has an unresolved material error. Stable-pilot promotion requires two independent reviewers, at least 20 audited cases, complete source verification for the audited sample, and public adjudication of material disagreements.

Review of the schema or code alone does not become independent reproduction of empirical results.

