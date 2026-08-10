# MENA Labor Intelligence

A real-public-data analytics work sample built from the World Bank **Human Capital Index Plus (HCI+)** country-year panel.

> How do working-age labor-force participation, employment, and gender gaps differ across selected MENA economies, and what changed from 2020 to 2025?

The portfolio extract contains **8 economies × 2 years = 16 country-year observations**. It is intentionally compact enough to audit by hand while still exercising a real ingestion/analysis workflow.

**This folder is an author work sample. It is not counted as a Lab release or an independently reproduced object.**

## Stack

`World Bank public data → provenance-preserving CSV → Python/pandas → quality gates → SQLite/SQL analysis → dashboard/BI output`

## Snapshot findings

Descriptive, not causal:

- Highest female working-age participation in the selected 2025 sample: **United Arab Emirates (61.5%)**
- Largest male–female participation gap: **Egypt, Arab Rep. (60.7 pp)**
- Largest 2020→2025 aggregate working-age participation increase: **Saudi Arabia (+6.5 pp)**

## Provenance

Source of record:
`https://github.com/worldbank/HCI-Plus/blob/main/03_output/hci_plus/hci_plus_index_panel.csv`

Every extracted row retains the exact source URL and access date.

## Run the quality check

```bash
cd work_samples/mena-labor-intelligence
python -m pip install -r requirements.txt
pytest -q
```

Run the dashboard:

```bash
streamlit run dashboard/app.py
```

## Limits

This is a selected descriptive panel. It is not suitable for causal claims, and public-source values are not silently imputed.