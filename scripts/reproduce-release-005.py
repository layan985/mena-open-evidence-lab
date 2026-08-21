#!/usr/bin/env python3
"""Reproduce arithmetic checks for Research Release 005.

Uses only Python's standard library. The script does not scrape sources; it verifies
arithmetic in the frozen release CSV and prints the headline propagation results.
"""
from __future__ import annotations

import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "release-005-measurement-shock-propagation.csv"


def num(value: str):
    value = value.strip()
    if not value or value.startswith("~"):
        return None
    try:
        return float(value)
    except ValueError:
        return None


def main() -> None:
    with DATA.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    failures = []
    checked = 0
    for i, row in enumerate(rows, start=2):
        old = num(row["old_value"])
        new = num(row["new_value"])
        delta = num(row["delta"])
        # Only arithmetic-check numeric old/new/delta rows where delta is expressed
        # in the same unit as old/new. Percent level revisions are separate records.
        if old is None or new is None or delta is None:
            continue
        unit = row["unit"]
        if unit in {"category", "USD below threshold", "USD above threshold"}:
            continue
        checked += 1
        expected = round(new - old, 10)
        if abs(expected - delta) > 1e-8:
            failures.append((i, row["country"], row["measurement_object"], expected, delta))

    print(f"rows={len(rows)}")
    print(f"numeric_delta_checks={checked}")
    print(f"arithmetic_failures={len(failures)}")
    for failure in failures:
        print("FAIL", failure)

    # Headline facts used in the public release.
    headline = [
        ("Saudi Arabia", "real GDP growth", -0.8, 0.5, "pp"),
        ("Tunisia", "public debt/GDP", 88.6, 83.5, "pp"),
        ("Morocco", "tertiary-sector share", 51.6, 54.8, "pp"),
        ("Jordan", "FY27 threshold margin", 4636, 5260, "USD"),
    ]
    for country, label, old, new, unit in headline:
        print(f"{country}: {label}: {old} -> {new}; delta={new-old:+.1f} {unit}")

    if failures:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
