# MENA Open Data & Evidence Lab

Economic data for the Middle East and North Africa is often public without being easy to use: a figure in a PDF, a table revised without an accessible vintage, or two releases that use the same label for different measures.

This lab reconstructs that trail. We publish small, documented datasets and the code needed to trace each observation back to its source.

The Lab is an independent project founded and maintained by [Layan Oraidi](https://orcid.org/0009-0005-0202-2582).

## Current work

| Project | What is available | Next step |
| --- | --- | --- |
| [MENA Funding & Procurement Intelligence](intelligence.html) | 32 open opportunities, 38 pipeline notices, 140 recent procurement plans and 11,799 normalized MENA contract-award records from official World Bank sources | Add independently normalized UNGM, EU and GIZ coverage without mixing it into the current World Bank counts |
| [Official Price Release Observatory](https://github.com/layan985/mena-economic-narrative-stress-observatory) | Release candidate covering January–June 2026: 48 geography-month rows, 195 numeric observations and 30 official release links | Independent source audit, source-file hashes and DOI |
| [MENA Firm AI Adoption and Labor Adjustment](https://github.com/layan985/mena-firm-ai-labor-adjustment) | Collection alpha for a 50-firm, 2018–2025 panel: 176 numeric employment firm-years, 168 linked to a saved source hash | Finish collection and complete the independent second-coding exercise |
| Workshop 001 | A 90-minute workshop on reproducing an economics paper from raw data; slides, notebook, exercise and answer key are ready | Live delivery on 23 August 2026 |

These are works in progress. Automated checks are useful, but a release is described as independently reviewed only after someone other than its author has rerun the relevant sources and code.

## Start here

- Explore the two research projects above.
- Use the [procurement-intelligence desk](intelligence.html) to qualify opportunities, inspect disclosed awards, compare benchmark ranges and search forward procurement plans.
- Run the [MENA Labor Intelligence work sample](work_samples/mena-labor-intelligence/) for a compact example using World Bank HCI+ data, SQL, tests and a Streamlit view.
- Browse the [Evidence Terminal prototype](index.html) and its [technical specification](TERMINAL_SPEC.md).
- Read the materials for [MODERN](programs/modern/), the Lab's contributor and methods-training programme.
- See the current [contribution tasks](programs/modern/CONTRIBUTION_TASKS.md) or [apply to the first cohort](APPLY.md).

## How a release is made

A Lab release should make it possible to answer five questions:

1. Where did each value come from?
2. When was the source retrieved, and which version was used?
3. What changed between the source and the published data?
4. Which checks were run?
5. What remains uncertain or incomparable?

The practical sequence is source capture, scripted processing, validation, independent review, then a versioned release with a changelog and citation information. Project repositories contain the detailed methodology and limitations for each dataset.

## Repository guide

| Path | Contents |
| --- | --- |
| [programs/modern/](programs/modern/) | Workshops, contributor guidance and review materials |
| [work_samples/](work_samples/) | Small examples that can be run independently |
| [index.html](index.html) | Static Evidence Terminal prototype |
| [intelligence.html](intelligence.html) | Interactive procurement-intelligence product |
| `data/manifest.json` + `data/procurement-*.part` | Browser-ready normalized official-source snapshot used by the product |
| [scripts/fetch-procurement-data.mjs](scripts/fetch-procurement-data.mjs) | Reproducible World Bank refresh pipeline |
| [scripts/prepare-procurement-parts.mjs](scripts/prepare-procurement-parts.mjs) | Deterministic browser-data packaging step |
| [PEOPLE.md](PEOPLE.md) | Maintainers, contributors and open roles |
| [TRANSPARENCY.md](TRANSPARENCY.md) | Versioning, corrections, credit and conflicts of interest |

## Contributing

The most useful contributions are bounded and checkable: verify a source against a release table, reproduce a build from a clean environment, review a coding sample, or improve a test or method note. Open an issue in the relevant project before beginning a large contribution so the scope is clear.

## License

Original code and documentation in this repository are released under the [MIT License](LICENSE). Source data retain the terms set by their publishers; redistribution details are documented in the relevant project.
