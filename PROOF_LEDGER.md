# MENA Open Data & Evidence Lab — Proof Ledger

Every material public claim should resolve to a number, evidence class, source, date, code or transformation trail where relevant, a reproducibility statement, a limitation, and a current status.

## Evidence badges

`REAL PUBLIC DATA` — official external source material.  
`CLIENT DATA` — real client data with explicit disclosure approval.  
`PROVIDER TEST` — provider-controlled sandbox or test environment.  
`SYNTHETIC` — generated or simulated data.  
`RANDOMIZED SYNTHETIC` — randomized generated experiment.  
`EXTERNALLY VERIFIED` — independently rerun, reviewed, or externally recorded.  
`FOUNDER PRODUCED` — produced by the Lab/founder.  
`PENDING VALIDATION` — awaiting an external rerun, reviewer, user, client, or release check.

## Lab Evidence Scoreboard

| Claim | Number | Evidence type | Source | Date | Code | Reproducible? | Limitation | Status |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| Founder-maintained Lab releases/projects currently listed | 4 current work objects | `FOUNDER PRODUCED` | `README.md` current work table | 2026-08-13 | repository-specific | Yes in part | Mixes release candidates, collection alpha, workshop materials, and procurement intelligence; not equivalent maturity | Public |
| Official Price Release Observatory release-candidate rows | 48 geography-month rows | `REAL PUBLIC DATA` `FOUNDER PRODUCED` | `README.md`; observatory repository | 2026-08-13 status | observatory pipeline | Yes | Release candidate; independent audit, source hashes, DOI still pending | Pending validation |
| Official Price Release Observatory populated observations | 195 numeric observations | `REAL PUBLIC DATA` `FOUNDER PRODUCED` | `README.md`; observatory repository | 2026-08-13 status | observatory pipeline | Yes | Same release-candidate limitation | Pending validation |
| Official Price Release Observatory release links | 30 official release links | `REAL PUBLIC DATA` `FOUNDER PRODUCED` | `README.md`; observatory repository | 2026-08-13 status | provenance records | Yes | Link count is not equivalent to independent validation | Pending validation |
| AI × labor collection numeric employment firm-years | 176 | `REAL PUBLIC DATA` `FOUNDER PRODUCED` | `README.md`; `mena-firm-ai-labor-adjustment` | 2026-08-13 status | collection pipeline | Yes in part | Alpha collection; second-coding incomplete | Pending validation |
| AI × labor firm-years linked to saved source hash | 168 | `REAL PUBLIC DATA` `FOUNDER PRODUCED` | `README.md`; `mena-firm-ai-labor-adjustment` | 2026-08-13 status | provenance pipeline | Yes | Hash linkage is not independent coding | Pending validation |
| World Bank procurement open opportunities | 32 | `REAL PUBLIC DATA` `FOUNDER PRODUCED` | `README.md`; `intelligence.html`; browser-ready manifest | 2026-08-13 status | `scripts/fetch-procurement-data.mjs` | Yes subject to source availability | Coverage currently World Bank-centered | Public-source product evidence |
| World Bank procurement pipeline notices | 38 | `REAL PUBLIC DATA` `FOUNDER PRODUCED` | `README.md`; procurement intelligence | 2026-08-13 status | procurement pipeline | Yes | Does not yet include independently normalized UNGM/EU/GIZ in the count | Public-source product evidence |
| Recent procurement plans | 140 | `REAL PUBLIC DATA` `FOUNDER PRODUCED` | `README.md`; procurement intelligence | 2026-08-13 status | procurement pipeline | Yes | Source-specific coverage | Public-source product evidence |
| Normalized MENA contract-award records | 11,799 | `REAL PUBLIC DATA` `FOUNDER PRODUCED` | `README.md`; procurement intelligence | 2026-08-13 status | procurement pipeline | Yes | Normalized official World Bank records, not all MENA procurement | Public-source product evidence |
| Externally rerun Lab releases | 0 recorded | `PENDING VALIDATION` | homepage scoreboard / repository standards | 2026-08-13 | N/A | N/A | Requires outside rerun with public evidence | Open zero |
| External reviewers | 0 recorded | `PENDING VALIDATION` | repository status | 2026-08-13 | N/A | N/A | A conversation or invitation does not count as review | Open zero |
| Institutional clients | 0 recorded | `PENDING VALIDATION` | commercial evidence registry | 2026-08-13 | N/A | N/A | Membership, partnership discussions, and applications do not count as clients | Open zero |
| Documented policy uses | 0 recorded | `PENDING VALIDATION` | impact registry | 2026-08-13 | N/A | N/A | Must show substantive documented use | Open zero |
| Workshop graduates | 0 | `PENDING VALIDATION` | Workshop 001 status | 2026-08-13 | workshop materials | N/A until delivery | Materials ready; delivery scheduled, completion standard not yet met | Open zero |
| Independent reproductions | 0 | `PENDING VALIDATION` | public scoreboard | 2026-08-13 | N/A | N/A | Internal tests do not count | Open zero |

## Evidence-room contract

The commercial evidence room should expose one coherent, paid-looking sample package rather than many partial products. The target object contains:

| Object | Buyer sees |
| --- | --- |
| Sample Evidence Sprint | 8–12 page donor-grade PDF |
| Sample dataset | CSV + Parquet |
| Data dictionary | definitions, units, coverage |
| Source ledger | every source + access date |
| Provenance graph | number → transformation → source |
| Reproduction notebook | one-click runnable workflow |
| QA report | failures, warnings, missingness |
| Methodology | inclusion/exclusion decisions |
| Limitations | explicit failure boundaries |
| Change log | every correction |
| Evidence grades | A/B/C confidence |
| Commercial scope | exact deliverable + price |

## Counting rule

Do not hide zeroes. Convert them only when evidence exists. Applications, conversations, intentions, planned work, stars, internal checks, and founder reruns do not become external validation by wording.

Every public chart should show:

**SOURCE / N / WINDOW / FILTER / STATUS / LIMITATION / DOWNLOAD DATA**
