from __future__ import annotations

import hashlib
import json
from pathlib import Path

import pandas as pd

REQUIRED_COLUMNS = {
    "observation_id", "country_iso3", "geography", "layer", "indicator", "value",
    "source_institution", "source_url", "source_language", "retrieval_date",
    "status", "verification_stage", "comparability_group",
}


def sha256(path: str | Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def validate_csv(path: str | Path) -> dict:
    df = pd.read_csv(path)
    missing = sorted(REQUIRED_COLUMNS - set(df.columns))
    duplicate_ids = int(df["observation_id"].duplicated().sum()) if "observation_id" in df else None
    missing_sources = int(df["source_url"].isna().sum()) if "source_url" in df else None
    missing_institutions = int(df["source_institution"].isna().sum()) if "source_institution" in df else None
    valid = not missing and duplicate_ids == 0 and missing_sources == 0 and missing_institutions == 0
    return {
        "rows": len(df),
        "numeric_observations": int(df["value"].notna().sum()) if "value" in df else None,
        "missing_required_columns": missing,
        "duplicate_observation_ids": duplicate_ids,
        "missing_source_urls": missing_sources,
        "missing_source_institutions": missing_institutions,
        "sha256": sha256(path),
        "valid": bool(valid),
    }


def write_manifest(path: str | Path, output: str | Path) -> None:
    Path(output).write_text(json.dumps(validate_csv(path), indent=2), encoding="utf-8")
