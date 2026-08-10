from pathlib import Path

import pandas as pd

from src.mena_labor.quality import validate

ROOT = Path(__file__).resolve().parents[1]


def test_public_extract_quality():
    df = pd.read_csv(ROOT / "data/raw/worldbank_hci_plus_mena_extract.csv")
    out = validate(df)
    assert out["duplicate_country_year"] == 0
    assert out["rate_violations"] == 0
    assert out["countries"] == 8