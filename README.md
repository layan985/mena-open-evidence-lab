# MENA Open Data & Evidence Lab

Many MENA economic series are available only as separate releases, PDFs, or tables whose definitions change over time. The Lab is a public research-infrastructure project for turning those sources into traceable datasets, reproducible analysis objects, and methods training without hiding revisions, comparability breaks, or uncertainty.

The **operating infrastructure is now live in this repository**: contributor intake, selection/QA rules, workshop materials, tracking registries, a real-data labor analytics work sample, and the first MENA Evidence Terminal prototype are committed on `main`. The Lab is not yet a completed external research network: contributor, partner, workshop-delivery, reviewer, and policy-use counts remain evidence-gated.

## Current status

As of 10 August 2026:

| Item | Count or status |
| --- | --- |
| Public Lab/Terminal prototype | Shipped on `main` |
| Contributor application route | Open infrastructure shipped |
| Workshop 001 materials | Complete; live delivery pending |
| Real-data author work sample | Shipped |
| Observatory v0.2 founder-produced pilot | Complete in its dedicated repo; external validation pending |
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

## First canonical pilot

The [MENA Economic Narrative and Market Stress Observatory](https://github.com/layan985/mena-economic-narrative-stress-observatory) now has a frozen **complete v0.2 founder-produced pilot**: eight release/geography rows, 24 populated numeric observations, five official statistical institutions, methodology, provenance, rights notes and automated validation. It is intentionally not counted as an independently validated Lab release until a non-author rerun and provenance review exist.

## Author work sample: MENA Labor Intelligence

[`work_samples/mena-labor-intelligence/`](work_samples/mena-labor-intelligence/) is a compact real-public-data analytics example built from the World Bank HCI+ country-year panel. It includes the provenance-preserving extract, a data dictionary, quality checks, SQL, a Streamlit view, derived change tables and a dedicated CI workflow.

It demonstrates the expected technical standard but does not count as an externally validated release because it is founder-authored and has not been independently rerun.

## MODERN contributor intake

[`programs/modern/APPLY.md`](programs/modern/APPLY.md) contains the application route and reproducibility task. Applicant status alone does not create contributor credit. A person enters the public contributor count only after a substantive, traceable contribution is accepted.

The operating files under [`programs/modern/`](programs/modern/) include onboarding, selection, QA, reviewer materials, tracking registries and Workshop 001.

## What counts as finished

A software/tooling artifact can be versioned and complete while data coverage continues. A founder-produced pilot can be complete while external validation remains pending. A workshop can have complete materials while the delivered-workshop count remains zero until it is actually taught. The repository keeps those states separate so progress is visible without turning plans into claims.

## What I am not claiming

No university, government office, policy organization, researcher, workshop attendee, reviewer or contributor is counted without evidence of the relevant completed action. No dataset is called independently validated because its producer's own tests pass. No API user or policy use is inferred from page views, downloads, or outreach.

[notes/2026-08-10-zero-state.md](notes/2026-08-10-zero-state.md) records the zero-state counting rule.
