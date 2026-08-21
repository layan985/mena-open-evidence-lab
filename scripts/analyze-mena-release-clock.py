#!/usr/bin/env python3
"""Core analysis utilities for the MENA-RTD release clock.

No network access. The script only analyzes frozen repository inputs.
"""

from __future__ import annotations

import argparse
import csv
import json
from collections import defaultdict
from datetime import date
from pathlib import Path


def iso_date(value: str) -> date:
    return date.fromisoformat(value)


def load_rows(path: Path) -> list[dict]:
    with path.open(newline="", encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))
    required = {
        "country", "iso3", "reference_period", "period_end", "indicator",
        "release_channel", "release_type", "observed_public_date",
        "formal_catalog_date", "latency_days", "date_status", "source_url",
    }
    missing = required.difference(rows[0].keys() if rows else set())
    if missing:
        raise ValueError(f"Missing fields: {sorted(missing)}")
    return rows


def validate(rows: list[dict]) -> list[str]:
    errors: list[str] = []
    seen: set[tuple[str, ...]] = set()
    for i, row in enumerate(rows, start=2):
        key = (
            row["country"], row["reference_period"], row["indicator"],
            row["release_channel"], row["release_type"], row["observed_public_date"],
        )
        if key in seen:
            errors.append(f"line {i}: duplicate primary key {key}")
        seen.add(key)

        expected = (iso_date(row["observed_public_date"]) - iso_date(row["period_end"])).days
        if expected != int(row["latency_days"]):
            errors.append(
                f"line {i}: latency_days={row['latency_days']} but dates imply {expected}"
            )
        if not row["source_url"].startswith("http"):
            errors.append(f"line {i}: missing canonical source URL")
    return errors


def clock_summary(rows: list[dict]) -> dict:
    grouped: dict[str, list[int]] = defaultdict(list)
    for row in rows:
        grouped[row["release_type"]].append(int(row["latency_days"]))
    out = {}
    for release_type, values in sorted(grouped.items()):
        ordered = sorted(values)
        n = len(ordered)
        median = ordered[n // 2] if n % 2 else (ordered[n // 2 - 1] + ordered[n // 2]) / 2
        out[release_type] = {
            "n": n,
            "min_days": min(ordered),
            "median_days": median,
            "max_days": max(ordered),
        }
    return out


def completeness(rows: list[dict], weights: dict[str, float], release_types: set[str]) -> list[dict]:
    selected: dict[str, date] = {}
    period_ends: set[date] = set()
    for row in rows:
        if row["release_type"] not in release_types:
            continue
        country = row["iso3"]
        d = iso_date(row["observed_public_date"])
        period_ends.add(iso_date(row["period_end"]))
        selected[country] = min(d, selected.get(country, d))

    if len(period_ends) != 1:
        raise ValueError("Completeness calculation requires one common reference-period end.")
    period_end = next(iter(period_ends))
    eligible = {c: w for c, w in weights.items() if c in selected}
    if not eligible:
        return []
    denom = sum(eligible.values())
    event_days = sorted({(d - period_end).days for d in selected.values()})
    curve = []
    for days in event_days:
        visible = sum(
            w for c, w in eligible.items()
            if (selected[c] - period_end).days <= days
        )
        curve.append({"days_after_period_end": days, "completeness": visible / denom})
    return curve


def threshold(curve: list[dict], p: float) -> int | None:
    for point in curve:
        if point["completeness"] >= p:
            return int(point["days_after_period_end"])
    return None


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", default="data/mena_release_clock.csv")
    ap.add_argument("--output", default="data/mena-rtd-seed-metrics.json")
    args = ap.parse_args()

    rows = load_rows(Path(args.input))
    errors = validate(rows)
    if errors:
        raise SystemExit("\n".join(errors))

    # Equal weights are the only seed metric that requires no external GDP/population file.
    weights = {row["iso3"]: 1.0 for row in rows}
    # A deliberately narrow demonstration clock: one earliest recorded release per economy,
    # regardless of architecture. It is labelled as such and is not a harmonized full-release clock.
    release_types = {row["release_type"] for row in rows}
    curve = completeness(rows, weights, release_types)

    payload = {
        "schema_version": "0.1.0",
        "dataset_status": "seed",
        "row_count": len(rows),
        "economy_count": len({r["iso3"] for r in rows}),
        "reference_periods": sorted({r["reference_period"] for r in rows}),
        "clock_summary": clock_summary(rows),
        "equal_weight_earliest_recorded_release_demo": {
            "qualification": "Illustrative seed only. Release architecture is heterogeneous; do not treat this as a harmonized full-release comparison.",
            "curve": curve,
            "T50_days": threshold(curve, 0.50),
            "T75_days": threshold(curve, 0.75),
            "T90_days": threshold(curve, 0.90),
        },
        "metadata_conflicts": [
            {k: r[k] for k in ("country", "reference_period", "observed_public_date", "formal_catalog_date", "date_status", "source_note")}
            for r in rows if r["date_status"] == "metadata_conflict"
        ],
    }
    Path(args.output).write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, indent=2))


if __name__ == "__main__":
    main()
