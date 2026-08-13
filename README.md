# MENA Open Data & Evidence Lab

Many MENA economic series are available only as separate releases, PDFs, or tables whose definitions change over time. The Lab is a public research-infrastructure project for turning those sources into traceable datasets, reproducible analysis objects, and methods training without hiding revisions, comparability breaks, or uncertainty.

The Lab is now operating around two flagships and one scheduled workshop. Contributor intake, selection/QA rules, workshop materials, tracking registries, and the MENA Evidence Terminal prototype remain public, but new project starts are frozen while the flagship release and independent-review gates are completed.

## Current status

As of 13 August 2026:

| Item | Count or status |
| --- | --- |
| Public Lab/Terminal prototype | Shipped on `main` |
| Contributor application route | Open infrastructure shipped |
| Workshop 001 materials | Complete; scheduled 23 August 2026; live delivery pending |
| Real-data author work sample | Shipped |
| Observatory v0.3.0-rc1 | 48 rows; automated validation passing; independent audit/DOI pending |
| AI × Labor v0.2.0a2 | 176/400 numeric firm-years; 168 source hashes; second coder pending |
| Accepted external contributors | 0 |
| Universities represented by validated contributors | 0 |
| Independently validated Lab releases | 0 |
| Workshops delivered | 0 |
| Institutional partners | 0 |
| Documented policy uses | 0 |
| Confirmed outside reviewers | 0 |

The zeros are deliberate. Infrastructure, applications, conversations, or founder-authored work do not become external impact merely because they are public.

## Three layers

- **MENA Open Data & Evidence Lab** — standards, governance, publication and research direction.
- **MODERN** — contributor intake, research pods, reproducibility training and review workflow.
- **MENA Evidence Terminal** — the searchable product layer for series, entities, events, documents, releases and provenance.

The product contract is in [`TERMINAL_SPEC.md`](TERMINAL_SPEC.md). The static prototype is implemented by [`index.html`](index.html), [`app.js`](app.js), and [`styles.css`](styles.css). Missing empirical fields remain missing rather than being filled with placeholder statistics.

The Terminal is a secondary publication interface during the flagship freeze. It is not a third active research-output stream.

## Flagship 1 — Official Price Release Observatory

The [MENA Economic Narrative and Market Stress Observatory](https://github.com/layan985/mena-economic-narrative-stress-observatory) has a **v0.3.0-rc1 founder-produced release candidate**: 48 January–June 2026 geography-month rows, 30 primary institution-month records, 18 Palestinian regional supplements, 195 populated numeric observations, 30 official release URLs, methodology, provenance ledger, and automated validation. Independent source audit, source-byte hashing, and DOI publication remain pending.

## Flagship 2 — AI × Labor 50-Firm Panel

The [MENA Firm AI Adoption and Labor Adjustment project](https://github.com/layan985/mena-firm-ai-labor-adjustment) is a **v0.2.0a2 collection/provenance alpha**. Its current machine-audited coverage is 176/400 numeric employment firm-years across 38/50 firms, with 168/176 numeric rows source-hash bound. A frozen 16-passage second-coder sample and public audit handoff exist; the non-author coding and reproduction gates remain pending. No preferred causal estimate has been inspected.

## Author work sample: MENA Labor Intelligence

[`work_samples/mena-labor-intelligence/`](work_samples/mena-labor-intelligence/) is a compact real-public-data analytics example built from the World Bank HCI+ country-year panel. It includes the provenance-preserving extract, a data dictionary, quality checks, SQL, a Streamlit view, derived change tables and a dedicated CI workflow.

It demonstrates the expected technical standard but does not count as an externally validated release because it is founder-authored and has not been independently rerun.

## MODERN contributor intake

[`programs/modern/APPLY.md`](programs/modern/APPLY.md) contains the application route and reproducibility task. Applicant status alone does not create contributor credit. A person enters the public contributor count only after a substantive, traceable contribution is accepted.

The operating files under [`programs/modern/`](programs/modern/) include onboarding, selection, QA, reviewer materials, tracking registries and Workshop 001.

Public identity, contributor status, and role openings are recorded in [`PEOPLE.md`](PEOPLE.md). Governance, versioning, licensing, corrections, conflict disclosure, and error reporting are summarized in [`TRANSPARENCY.md`](TRANSPARENCY.md).

## What counts as finished

A software/tooling artifact can be versioned and complete while data coverage continues. A founder-produced pilot can be complete while external validation remains pending. A workshop can have complete materials while the delivered-workshop count remains zero until it is actually taught. The repository keeps those states separate so progress is visible without turning plans into claims.

## What I am not claiming

No university, government office, policy organization, researcher, workshop attendee, reviewer or contributor is counted without evidence of the relevant completed action. No dataset is called independently validated because its producer's own tests pass. No API user or policy use is inferred from page views, downloads, or outreach.

[notes/2026-08-10-zero-state.md](notes/2026-08-10-zero-state.md) records the zero-state counting rule.
