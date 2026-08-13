# MENA Open Data & Evidence Lab — Proof Ledger

Every material public claim must resolve to a number, one or more canonical evidence labels, source, date/window, code or transformation trail where relevant, reproducibility statement, limitation and current validation status.

## Canonical evidence labels

`OFFICIAL SOURCE` · `REAL PUBLIC DATA` · `PROVIDER TEST` · `SYNTHETIC` · `RANDOMIZED SYNTHETIC` · `PRODUCTION CLIENT DATA` · `EXTERNAL REVIEW` · `INDEPENDENT REPRODUCTION` · `PENDING VALIDATION`

No other public badge vocabulary is used. Internal/founder production is described in the source/code columns, not promoted into an evidence class.

## Lab Evidence Scoreboard

| Claim | Number | Evidence label | Source | Date | Code / transformation | Reproducible? | Limitation | Status |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| Current Lab work objects listed | 4 | `PENDING VALIDATION` | `README.md` current evidence base | 2026-08-13 | repository-specific | In part | Mixes products, release candidates, collection alpha and workshop material; not equivalent maturity | Public inventory |
| Official Price Release Observatory rows | 48 geography-month rows | `OFFICIAL SOURCE` `REAL PUBLIC DATA` `PENDING VALIDATION` | `README.md`; observatory repository | 2026-08-13 | observatory pipeline | Yes | Release candidate; independent audit, source hashes and DOI still pending | Release candidate |
| Official Price Release Observatory populated observations | 195 numeric observations | `OFFICIAL SOURCE` `REAL PUBLIC DATA` `PENDING VALIDATION` | `README.md`; observatory repository | 2026-08-13 | observatory pipeline | Yes | Same release-candidate limitation | Release candidate |
| Official Price Release Observatory release links | 30 official links | `OFFICIAL SOURCE` `REAL PUBLIC DATA` `PENDING VALIDATION` | `README.md`; observatory provenance records | 2026-08-13 | provenance records | Yes | Link count is not independent validation | Release candidate |
| AI × labor numeric employment firm-years | 176 | `REAL PUBLIC DATA` `PENDING VALIDATION` | `README.md`; `mena-firm-ai-labor-adjustment` | 2026-08-13 | collection pipeline | In part | Alpha collection; second coding incomplete | Collection alpha |
| AI × labor firm-years linked to saved source hash | 168 | `REAL PUBLIC DATA` `PENDING VALIDATION` | `README.md`; `mena-firm-ai-labor-adjustment` | 2026-08-13 | provenance pipeline | Yes | Hash linkage is not independent coding or external review | Collection alpha |
| World Bank procurement open opportunities | 32 | `OFFICIAL SOURCE` `REAL PUBLIC DATA` | `README.md`; `intelligence.html`; browser manifest | 2026-08-13 | `scripts/fetch-procurement-data.mjs` | Yes, subject to source availability | Current headline coverage is World Bank-centered | Public-source product evidence |
| World Bank procurement pipeline notices | 38 | `OFFICIAL SOURCE` `REAL PUBLIC DATA` | `README.md`; procurement intelligence | 2026-08-13 | procurement pipeline | Yes | Does not include independently normalized UNGM/EU/GIZ in this count | Public-source product evidence |
| Recent procurement plans | 140 | `OFFICIAL SOURCE` `REAL PUBLIC DATA` | `README.md`; procurement intelligence | 2026-08-13 | procurement pipeline | Yes | Source-specific coverage | Public-source product evidence |
| Normalized MENA contract-award records | 11,799 | `OFFICIAL SOURCE` `REAL PUBLIC DATA` | `README.md`; procurement intelligence | 2026-08-13 | procurement pipeline | Yes | Normalized official World Bank records, not all MENA procurement | Public-source product evidence |
| Externally reviewed Lab releases | 0 recorded | `PENDING VALIDATION` | public registry / repository status | 2026-08-13 | N/A | N/A | Outside documented review required | Open zero |
| Independent reproductions | 0 recorded | `PENDING VALIDATION` | public registry / repository status | 2026-08-13 | N/A | N/A | Internal tests and founder reruns do not count | Open zero |
| Production institutional/client datasets disclosed | 0 | `PENDING VALIDATION` | commercial evidence boundary | 2026-08-13 | N/A | N/A | No production client data is claimed | Open zero |
| Institutional clients | 0 recorded | `PENDING VALIDATION` | commercial evidence registry | 2026-08-13 | N/A | N/A | Memberships, applications, conversations and partnership discussions do not count | Open zero |
| Documented policy uses | 0 recorded | `PENDING VALIDATION` | impact registry | 2026-08-13 | N/A | N/A | Requires substantive documented use | Open zero |
| Workshop graduates | 0 | `PENDING VALIDATION` | Workshop 001 status | 2026-08-13 | workshop materials | N/A until delivery | Materials ready; delivery is not yet completion | Open zero |

## Evidence-room contract

The public/commercial evidence room should expose one coherent, inspectable package rather than many partial claims:

| Object | Required content |
| --- | --- |
| Executive Brief | decision-relevant findings with claim badges |
| Sample Evidence Sprint | 8–12 page institutional sample built from real public evidence |
| Sample dataset | CSV + Parquet when redistribution permits |
| Data dictionary | definitions, units, coverage, missing-value rules |
| Source / provenance register | source URL, publisher, access date, release/vintage, hash where available |
| Provenance graph | number → transformation → source |
| Reproduction notebook | clean rerun path |
| QA report | checks, failures, warnings, missingness |
| Methodology | inclusion/exclusion and transformation decisions |
| Limitations register | explicit failure boundaries |
| Change log | every correction and release difference |
| Validation pack | external review / independent reproduction only when documented |
| Commercial scope | exact deliverable, inputs, exclusions, timing and price boundaries |
| What would falsify this? | conditions that would invalidate or materially weaken the claim |

## Counting rule

Do not hide zeroes. Convert them only when evidence exists. Applications, conversations, plans, stars, internal checks, founder reruns and invitations do not become external validation by wording.

Every public chart or KPI must show:

**SOURCE / N / WINDOW / FILTER / STATUS / LIMITATION / DOWNLOAD DATA**
