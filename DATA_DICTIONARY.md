# MODE data dictionary

| Field | Meaning |
|---|---|
| `observation_id` | Stable unique observation identifier |
| `country_iso3` | ISO alpha-3 country code |
| `geography` | Country or explicitly disaggregated geography |
| `layer` | `macro`, `market`, `policy`, or `narrative` |
| `indicator` | Machine-readable indicator name |
| `value` | Numeric value; null when explicitly missing |
| `unit` | Unit or scale |
| `period_start` / `period_end` | Reference period |
| `release_date` | Official publication date where known |
| `source_institution` | Originating institution |
| `source_url` | Direct source URL where possible |
| `source_language` | `ar`, `en`, `fr`, or `other` |
| `retrieval_date` | Date source was checked |
| `status` | `raw`, `verified`, `flagged`, or `missing` |
| `verification_stage` | Human-readable audit stage |
| `comparability_group` | Prevents incompatible rates from being silently ranked together |
| `notes` | Methodological/source caveats |

Missing observations are never silently imputed in the canonical layer. Any imputation belongs only in derived analytical products and must be documented separately.
