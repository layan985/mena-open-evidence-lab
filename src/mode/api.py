from __future__ import annotations

import os
from pathlib import Path

import pandas as pd
from fastapi import FastAPI, HTTPException

app = FastAPI(title="MODE Research API", version="0.2.0")


def _data_path() -> Path:
    env = os.getenv("MODE_DATA_PATH")
    if env:
        return Path(env)
    return Path(__file__).resolve().parents[2] / "data/processed/MODE-DATA-0001-v0.2.0.csv"


def _load() -> pd.DataFrame:
    path = _data_path()
    if not path.exists():
        raise HTTPException(status_code=503, detail=f"Released dataset unavailable: {path}")
    return pd.read_csv(path)


@app.get("/health")
def health():
    return {"status": "ok", "release": "MODE-DATA-0001", "version": "0.2.0"}


@app.get("/layers")
def layers():
    return {"layers": ["macro", "market", "policy", "narrative"]}


@app.get("/countries")
def countries():
    df = _load()
    return {"countries": sorted(df["country_iso3"].dropna().unique().tolist())}


@app.get("/observations")
def observations(country: str | None = None, indicator: str | None = None, geography: str | None = None):
    df = _load()
    if country:
        df = df[df["country_iso3"].str.upper() == country.upper()]
    if indicator:
        df = df[df["indicator"] == indicator]
    if geography:
        df = df[df["geography"].str.casefold() == geography.casefold()]
    clean = df.astype(object).where(pd.notnull(df), None)
    return {"count": len(clean), "records": clean.to_dict(orient="records")}


@app.get("/sources")
def sources():
    df = _load()
    cols = ["source_institution", "source_url", "source_language"]
    records = df[cols].drop_duplicates().to_dict(orient="records")
    return {"count": len(records), "records": records}


@app.get("/releases")
def releases():
    return [{
        "release_id": "MODE-DATA-0001",
        "version": "0.2.0",
        "numeric_observations": 24,
        "composite_scores": 0,
        "audit_status": "independent audit pending",
    }]
