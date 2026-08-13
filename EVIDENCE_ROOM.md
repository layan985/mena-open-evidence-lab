# MENA Lab Evidence Room

This is the commercial proof room for the MENA Open Data & Evidence Lab. It is designed so a buyer can inspect the work before commissioning anything.

## Three commercial paths

**COMMISSION EVIDENCE**  
A bounded evidence sprint: source retrieval → indicator definition → provenance → clean dataset → QA → reproducible analysis → client-ready brief.

**AUDIT A DATASET**  
Independent review of definitions, provenance, transformations, revisions, missingness, reproducibility, and methodological risk.

**BUILD A MENA DATA PRODUCT**  
A documented, maintainable data object with source ledger, schema, QA, reproducible pipeline, and delivery package.

## Current proof objects

The current public repository supports these concrete claims:

- Official Price Release Observatory release candidate: **48 geography-month rows**, **195 numeric observations**, **30 official release links**.
- MENA Firm AI Adoption & Labor Adjustment collection alpha: **176 numeric employment firm-years**, **168 linked to a saved source hash**.
- Procurement intelligence: **32 open opportunities**, **38 pipeline notices**, **140 recent procurement plans**, and **11,799 normalized MENA contract-award records** from official World Bank sources.
- External reruns: **0 recorded**.
- External reviewers: **0 recorded**.
- Institutional clients: **0 recorded**.
- Documented policy uses: **0 recorded**.

The zeroes are evidence too. They should remain visible until a qualifying public record exists.

Full claim-level detail: [PROOF_LEDGER.md](PROOF_LEDGER.md).

## Sample Evidence Sprint — buyer package

A paid-looking public sample should contain one coherent flagship object, not a directory of unrelated experiments.

| Object | Buyer receives |
| --- | --- |
| Evidence brief | 8–12 page donor-grade PDF |
| Dataset | CSV + Parquet |
| Data dictionary | definitions, units, time/geography coverage |
| Source ledger | source title, institution, URL, access date, archive/hash where possible |
| Provenance graph | published number → transformation → raw source |
| Reproduction notebook | runnable analysis from input to outputs |
| QA report | failures, warnings, missingness, duplicates, range checks |
| Methodology | inclusion/exclusion rules and transformation choices |
| Limitations | explicit uncertainty, incomparability, missingness, source risk |
| Change log | every correction and material revision |
| Evidence grades | A/B/C confidence with rule-based criteria |
| Commercial scope | exact deliverable, timeline assumptions, price, exclusions |

## Flagship public brief standard

The first flagship brief should use the strongest current pilot and meet these rules:

1. One policy/research question only.
2. Every headline figure has a provenance path.
3. Every chart has a downloadable table.
4. Every source has an access date.
5. Every transformation is described in plain language and code.
6. Every limitation appears near the claim it limits.
7. Release candidate status is obvious until outside rerun is complete.
8. No institutional prestige language substitutes for validation.

## Chart footer standard

Under every visual:

**SOURCE / N / WINDOW / FILTER / STATUS / LIMITATION / DOWNLOAD DATA**

Evidence badges must be visible where relevant:

`REAL PUBLIC DATA` · `CLIENT DATA` · `PROVIDER TEST` · `SYNTHETIC` · `RANDOMIZED SYNTHETIC` · `EXTERNALLY VERIFIED` · `FOUNDER PRODUCED` · `PENDING VALIDATION`

## Evidence grades

**A — independently verified**  
Outside reviewer/rerun plus complete provenance and reproducibility package.

**B — internally reproducible, externally sourced**  
Official/public source, deterministic processing, QA complete, but no outside rerun yet.

**C — provisional / incomplete validation**  
Collection, source, methodology, or review work remains incomplete.

No object receives A because it looks polished.
