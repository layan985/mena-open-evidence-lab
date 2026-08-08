from pathlib import Path

import pandas as pd


def test_release_shape():
    path = Path(__file__).resolve().parents[1] / "data/processed/MODE-DATA-0001-v0.2.0.csv"
    df = pd.read_csv(path)
    assert len(df) == 24
    assert df["observation_id"].is_unique
    assert df["source_url"].notna().all()
    assert set(df["layer"]) == {"macro"}
    assert len(df[["source_institution"]].drop_duplicates()) == 5
