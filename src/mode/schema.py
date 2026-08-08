from __future__ import annotations

from datetime import date
from typing import Literal

from pydantic import BaseModel, Field, HttpUrl

Layer = Literal["macro", "market", "policy", "narrative"]


class Observation(BaseModel):
    observation_id: str
    country_iso3: str = Field(min_length=3, max_length=3)
    geography: str
    layer: Layer
    indicator: str
    value: float | None
    unit: str | None = None
    period_start: date | None = None
    period_end: date | None = None
    release_date: date | None = None
    source_institution: str
    source_url: HttpUrl
    source_language: Literal["ar", "en", "fr", "other"]
    retrieval_date: date
    status: Literal["raw", "verified", "flagged", "missing"]
    verification_stage: str
    comparability_group: str | None = None
    notes: str | None = None
