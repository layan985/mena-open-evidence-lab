# MENA Procurement Intelligence Quarterly

## Executive brief

The current public procurement intelligence layer is built from normalized official World Bank records for MENA. The live evidence base contains **32 open opportunities**, **38 pipeline notices**, **140 recent procurement plans**, and **11,799 normalized contract-award records**. These counts are source-specific and must not be represented as complete MENA procurement coverage.

| Claim | Number | Evidence label | Status |
| --- | ---: | --- | --- |
| Open opportunities | **32** | `OFFICIAL SOURCE` `REAL PUBLIC DATA` | Public-source product evidence |
| Pipeline notices | **38** | `OFFICIAL SOURCE` `REAL PUBLIC DATA` | Public-source product evidence |
| Recent procurement plans | **140** | `OFFICIAL SOURCE` `REAL PUBLIC DATA` | Public-source product evidence |
| Normalized MENA contract awards | **11,799** | `OFFICIAL SOURCE` `REAL PUBLIC DATA` | Public-source product evidence |

## What the evidence can answer

- Which official opportunities are currently open in the covered source?
- Which pipeline notices and procurement plans indicate future demand?
- What award records are available for benchmark exploration?
- Which suppliers, sectors, countries and project categories recur in the normalized source data?
- Which opportunities deserve manual qualification before pursuit?

## What the evidence cannot answer yet

- It is **not** a complete MENA procurement census.
- It does not yet count independently normalized UNGM, EU or GIZ coverage inside the headline totals.
- Disclosed award value is not the same as addressable market size.
- Historical award concentration does not prove future win probability.
- No client conversion, bid-win or revenue outcome is claimed.

## Provenance spine

Primary public product: `intelligence.html`  
Browser-ready manifest: `data/manifest.json`  
Refresh pipeline: `scripts/fetch-procurement-data.mjs`  
Packaging pipeline: `scripts/prepare-procurement-parts.mjs`  
Claim-level evidence: `PROOF_LEDGER.md`

## QA expectations

Every refresh should verify record counts, required identifiers, country normalization, duplicate handling, amount parsing, date parsing and source-link availability. A failed refresh or material schema change should block a publication update until reviewed.

## Decision use

This report is useful as a **pursuit-screening and market-mapping layer**, not as an automated bid/no-bid engine. Human review is still required for eligibility, scope fit, procurement method, deadlines and commercial attractiveness.

## What would falsify or weaken this report?

- Headline counts cannot be reproduced from the published manifest and refresh pipeline.
- Source records are duplicated or materially misclassified.
- Country or project filters include out-of-scope records.
- Source URLs no longer resolve and no retained provenance record exists.
- A headline is described as region-wide coverage when it actually represents one source family.

## Download / inspect

- **VIEW DASHBOARD:** `intelligence.html`
- **VIEW SOURCES / CLAIMS:** `PROOF_LEDGER.md`
- **VIEW CODE:** `scripts/fetch-procurement-data.mjs`
- **VIEW DATA MANIFEST:** `data/manifest.json`
- **VIEW LIMITATIONS:** this report + `TRANSPARENCY.md`

PDF publication remains `PENDING VALIDATION` until a frozen versioned render is produced from this source object.