# MODERN Dataset Release Standard v1.0

A dataset counts toward the public MODERN scoreboard only when all mandatory gates pass.

## Mandatory release package

```text
dataset/
├── README.md
├── data/raw/
├── data/processed/
├── src/
├── tests/
├── data_dictionary.csv
├── PROVENANCE.md
├── METHODOLOGY.md
├── CHANGELOG.md
├── CITATION.cff
├── LICENSE
└── reproduce.sh
```

## Release gates
1. README states what the dataset measures and why it exists.
2. Every source has publisher, URL/identifier, retrieval date, coverage, and license/terms note.
3. Material transformations are documented.
4. Every processed variable has definition, type, unit, and source/transformation note.
5. A documented entry point rebuilds or validates processed output.
6. Scripted checks cover schema, duplicates, missingness, and meaningful ranges.
7. Release has a version identifier.
8. `CITATION.cff` names contributors accurately.
9. Code and data licensing are explicit.
10. Final release is archived durably when eligible.

## Observation counting
Only rows in canonical processed analytical tables count. Duplicate mirrors, raw/processed duplicates, mechanically expanded joins, test fixtures, and synthetic rows mixed into empirical totals do not count.

Only a reviewed, tagged **Public release** counts toward the 18-dataset target.
