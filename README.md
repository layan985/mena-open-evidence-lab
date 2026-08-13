# MENA Open Data & Evidence Lab

Economic data for the Middle East and North Africa is often public without being easy to use: a figure in a PDF, a table revised without an accessible vintage, or two releases that use the same label for different measures.

This Lab reconstructs that trail. We publish documented datasets, source registers, QA, limitations and the code needed to trace each important claim back to evidence.

The Lab is an independent project founded and maintained by [Layan Oraidi](https://orcid.org/0009-0005-0202-2582).

## Current evidence base

| Project | What is available | Evidence status | Next step |
| --- | --- | --- | --- |
| [MENA Funding & Procurement Intelligence](intelligence.html) | 32 open opportunities, 38 pipeline notices, 140 recent procurement plans and 11,799 normalized MENA contract-award records from official World Bank sources | `OFFICIAL SOURCE` `REAL PUBLIC DATA` | Add independently normalized UNGM, EU and GIZ coverage without mixing it into current World Bank counts |
| [Official Price Release Observatory](https://github.com/layan985/mena-economic-narrative-stress-observatory) | January–June 2026 release candidate: 48 geography-month rows, 195 numeric observations and 30 official release links | `OFFICIAL SOURCE` `REAL PUBLIC DATA` `PENDING VALIDATION` | Independent source audit, source-file hashes and DOI |
| [MENA Firm AI Adoption and Labor Adjustment](https://github.com/layan985/mena-firm-ai-labor-adjustment) | Collection alpha for a 50-firm, 2018–2025 panel: 176 numeric employment firm-years, 168 linked to a saved source hash | `REAL PUBLIC DATA` `PENDING VALIDATION` | Finish collection and complete independent second-coding |
| Workshop 001 | 90-minute workshop on reproducing an economics paper from raw data; slides, notebook, exercise and answer key ready | `PENDING VALIDATION` until delivered | Live delivery on 23 August 2026 |

Automated checks, founder reruns and source links are not independent review. A release becomes externally reviewed or independently reproduced only when outside evidence exists.

## Research Library

The [Research Library](RESEARCH_LIBRARY.md) organizes publication-quality outputs around the evidence that already exists. It includes the MENA Procurement Intelligence Quarterly, MENA Price Release Monitor, MENA AI & Labor Evidence Brief, Jordan Evidence Brief, Regional Macro Data Quality Report, Official Statistics Revision Tracker, Procurement Market Map, Institutional Source Reliability Report, MENA Data Availability Index, Methods Notes, Replication Notes and an Evidence Sprint sample deliverable.

Every released report is expected to expose **DOWNLOAD PDF · DOWNLOAD DATA · VIEW METHODOLOGY · VIEW SOURCES · VIEW CODE · VIEW QA · VIEW LIMITATIONS**. Missing objects are shown as `PENDING VALIDATION`, never replaced with decorative placeholders.

## Claim discipline

The canonical [claim badge standard](CLAIM_BADGES.md) is:

`OFFICIAL SOURCE` · `REAL PUBLIC DATA` · `PROVIDER TEST` · `SYNTHETIC` · `RANDOMIZED SYNTHETIC` · `PRODUCTION CLIENT DATA` · `EXTERNAL REVIEW` · `INDEPENDENT REPRODUCTION` · `PENDING VALIDATION`

Every headline number must expose its source, date/window, denominator, filter, transformation/code, reproducibility status, limitation and validation status.

## Start here

- Open the [Research Library](RESEARCH_LIBRARY.md).
- Read the [Evidence Room](EVIDENCE_ROOM.md) and [Proof Ledger](PROOF_LEDGER.md).
- Use the [procurement-intelligence desk](intelligence.html) to inspect opportunities, disclosed awards, benchmark ranges and forward plans.
- Run the [MENA Labor Intelligence work sample](work_samples/mena-labor-intelligence/) for a compact public-data example using World Bank HCI+ data, SQL, tests and a Streamlit view.
- Browse the [Evidence Terminal prototype](index.html) and [technical specification](TERMINAL_SPEC.md).
- Read [Transparency](TRANSPARENCY.md) before interpreting any maturity or impact claim.
- Browse [MODERN](programs/modern/), the Lab's contributor and methods-training programme.

## Institutional publication stack

Executive Brief · Evidence Room · Proof Ledger · Methodology · Data Dictionary · Source/Provenance Register · QA Report · Limitations Register · Results Report · Technical Appendix · Sample Institutional Report · Chart Catalog · Metric Dictionary · Reproducibility Guide · Validation/External Review Pack · Commercial Capability Sheet · Exact Deliverables + Scope · Case Study Library · Release Notes/Changelog · Downloads · Buyer FAQ · Decision Memos · One-page Briefs · Public Dashboard/Terminal · **What Would Falsify This?**

Depth comes from traceability, not document count. A report exists only when its claims resolve to real repository evidence.

## How a release is made

A Lab release should make it possible to answer six questions:

1. Where did each value come from?
2. When was the source retrieved, and which version was used?
3. What changed between the source and the published data?
4. Which checks were run and what failed or remained missing?
5. What remains uncertain or incomparable?
6. What evidence would falsify or materially weaken the conclusion?

The practical sequence is source capture, scripted processing, validation, clean-environment rerun, independent review when available, then a versioned release with a changelog and citation information.

## Repository guide

| Path | Contents |
| --- | --- |
| [RESEARCH_LIBRARY.md](RESEARCH_LIBRARY.md) | Evidence-backed report and note series |
| [CLAIM_BADGES.md](CLAIM_BADGES.md) | Canonical public evidence labels and metric display contract |
| [EVIDENCE_ROOM.md](EVIDENCE_ROOM.md) | Evidence-room structure and proof objects |
| [PROOF_LEDGER.md](PROOF_LEDGER.md) | Claim-level evidence, limitations and open zeroes |
| [programs/modern/](programs/modern/) | Workshops, contributor guidance and review materials |
| [work_samples/](work_samples/) | Small examples that can be run independently |
| [index.html](index.html) | Static Evidence Terminal prototype |
| [intelligence.html](intelligence.html) | Interactive procurement-intelligence product |
| `data/manifest.json` + `data/procurement-*.part` | Browser-ready normalized official-source snapshot |
| [scripts/fetch-procurement-data.mjs](scripts/fetch-procurement-data.mjs) | Reproducible World Bank refresh pipeline |
| [PEOPLE.md](PEOPLE.md) | Maintainers, contributors and open roles |
| [TRANSPARENCY.md](TRANSPARENCY.md) | Versioning, corrections, credit and conflicts of interest |

## Contributing

The most useful contributions are bounded and checkable: verify a source against a release table, reproduce a build from a clean environment, review a coding sample, or improve a test or method note. Open an issue in the relevant project before beginning a large contribution so the scope is clear.

## License

Original code and documentation in this repository are released under the [MIT License](LICENSE). Source data retain the terms set by their publishers; redistribution details are documented in the relevant project.
