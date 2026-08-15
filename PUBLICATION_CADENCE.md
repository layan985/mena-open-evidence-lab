# Publication Cadence & Data Freshness Standard

_Last updated: 16 August 2026_

## Operating cadence

| Cadence | Output |
| --- | --- |
| Continuous | Procurement / Evidence Terminal updates when source and QA gates permit |
| Monthly | Official statistics release monitor |
| Monthly | Procurement watch |
| Quarterly | MENA Procurement Intelligence Quarterly |
| Quarterly | One evidence brief |
| Quarterly | One methods or replication note |
| Semiannual | Data availability / revision analysis |
| Annual | State of MENA Evidence Infrastructure |
| Annual | Institutional transparency report |

The cadence is an operating target, not permission to publish filler. A missed cadence is preferable to releasing an object that fails the release standard.

## Freshness metadata

Every live data product must expose, where applicable:

- **Last refreshed** — timestamp of the successful pipeline run;
- **Data through** — latest reference period represented;
- **Source release** — latest source release included;
- **Pipeline version** — code/pipeline version used;
- **Next expected update** — expected refresh window or trigger.

Freshness metadata describes the data state, not the age of the webpage. Failed refresh attempts must not advance `last_refreshed`.
