from pathlib import Path

import pandas as pd

from mode.validate import validate_csv


def test_valid_minimal_csv(tmp_path: Path):
    p = tmp_path / "x.csv"
    pd.DataFrame([{
        "observation_id": "JOR-CPI-2026-01",
        "country_iso3": "JOR",
        "geography": "Jordan",
        "layer": "macro",
        "indicator": "cpi_yoy",
        "value": 2.0,
        "source_institution": "Example",
        "source_url": "https://example.org",
        "source_language": "en",
        "retrieval_date": "2026-08-08",
        "status": "raw",
        "verification_stage": "test",
        "comparability_group": "monthly-yoy",
    }]).to_csv(p, index=False)
    assert validate_csv(p)["valid"] is True
