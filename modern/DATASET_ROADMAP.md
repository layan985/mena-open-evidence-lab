# MODERN Cohort 01 — 18-Release Dataset Roadmap

The roadmap is designed so the cohort target is structurally achievable: each of seven pods owns two releases, and the central Lab owns four cross-pod releases. Titles are working titles until source feasibility and licensing are verified.

| ID | Owner | Working release | Minimum target observations | Core output |
|---|---|---|---:|---|
| MODERN-LAB-01 | Labor Markets | MENA Youth Labor Market Harmonized Panel | 2,000 | country-year/indicator panel |
| MODERN-LAB-02 | Labor Markets | MENA Female Labor Force & Wage Indicators | 2,000 | harmonized labor/gender panel |
| MODERN-AI-01 | Firms + AI | MENA Firm Digitalization & AI Signals | 2,000 | firm/sector/country-year panel |
| MODERN-AI-02 | Firms + AI | MENA Technology Exposure by Occupation & Sector | 2,000 | occupation/sector exposure panel |
| MODERN-TRD-01 | Trade + Industrial Policy | MENA Export Complexity & Product Structure | 2,000 | country-product-year panel |
| MODERN-TRD-02 | Trade + Industrial Policy | MENA Tariff & Industrial Policy Measures | 2,000 | country-product/policy panel |
| MODERN-CLM-01 | Water + Climate | MENA Water Stress & Economic Exposure Panel | 2,000 | region/country-year panel |
| MODERN-CLM-02 | Water + Climate | MENA Rainfall, Drought & Agricultural Exposure | 2,000 | geotemporal exposure panel |
| MODERN-PF-01 | Public Finance | MENA Public Debt & Fiscal Indicators Panel | 2,000 | country-year panel |
| MODERN-PF-02 | Public Finance | MENA Subsidy, Social Transfer & Public Spending Indicators | 2,000 | country-year/program panel |
| MODERN-FIN-01 | Financial Markets | MENA Market, FX & Rates Panel | 2,000 | market-day/month panel |
| MODERN-FIN-02 | Financial Markets | MENA Sovereign Risk & Banking Indicators | 2,000 | country/month-year panel |
| MODERN-NAR-01 | Narratives + Institutions | MENA Central Bank Communication Corpus | 2,000 | document-level corpus/index |
| MODERN-NAR-02 | Narratives + Institutions | MENA Economic Policy Document Corpus | 2,000 | document-level corpus/index |
| MODERN-CEN-01 | Central Lab | MENA Economic Indicators Harmonized Panel | 3,500 | cross-domain country-year panel |
| MODERN-CEN-02 | Central Lab | MENA Firm Digitalization & AI Adoption Integrated Dataset | 3,500 | integrated firm/sector panel |
| MODERN-CEN-03 | Central Lab | MENA Policy Communication Integrated Corpus | 3,500 | document corpus + metadata |
| MODERN-CEN-04 | Central Lab | MENA Climate–Economic Exposure Integrated Panel | 3,500 | harmonized exposure panel |

**Planned minimum:** 42,000 standardized observations.

## Release gates

A roadmap item becomes a counted release only when all of the following are true:

1. source/license compatibility verified;
2. raw-source provenance documented;
3. machine-readable processed data released;
4. data dictionary complete;
5. methodology and exclusions documented;
6. reproducibility entry point works from a clean environment;
7. automated validation passes;
8. DOI or permanent archival identifier exists where appropriate;
9. release tag and changelog exist;
10. contributor credits are evidence-backed.

## Recommended technical stack

- Python: ingestion, cleaning, API/scraping, NLP
- R or Stata: econometric validation where appropriate
- DuckDB/SQL: larger joins and transformations
- GitHub: version control, issues, PR review and CI
- Zenodo: archival releases and DOIs

## Source rule

No source is approved merely because it is public on the web. Each pod must verify terms of use, redistribution rights, licensing, citation requirements, and whether derived-data publication is allowed before ingestion into a public MODERN release.
