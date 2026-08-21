#!/usr/bin/env python3
"""Analyze the first source-linked Narrative Reversal pilot panel.

This script intentionally treats the pilot as a selected evidence set, not a
random or representative sample. It reports descriptive revision magnitudes
and boundary crossings only.
"""

from __future__ import annotations

import csv
import json
import statistics
from pathlib import Path

INPUT = Path("data/narrative-reversal-pilot.csv")
OUTPUT = Path("data/narrative-reversal-pilot-analysis.json")


def parse_bool(x: str) -> bool:
    return x.strip().lower() == "true"


def main() -> None:
    with INPUT.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    revisions = [float(r["revision_pp"]) for r in rows]
    abs_revisions = [abs(x) for x in revisions]
    sign_reversals = [r for r in rows if parse_bool(r["sign_reversal"])]

    by_country = {}
    for r in rows:
        c = r["country_code"]
        by_country.setdefault(c, {"country": r["country"], "comparisons": 0, "sign_reversals": 0, "mean_absolute_revision_pp": None})
        by_country[c]["comparisons"] += 1
        by_country[c]["sign_reversals"] += int(parse_bool(r["sign_reversal"]))

    for c in by_country:
        vals = [abs(float(r["revision_pp"])) for r in rows if r["country_code"] == c]
        by_country[c]["mean_absolute_revision_pp"] = sum(vals) / len(vals)

    payload = {
        "analysis_id": "MENALAB-NR-PILOT-001",
        "status": "selected_primary_source_pilot",
        "comparisons": len(rows),
        "countries": len(by_country),
        "sign_reversals": len(sign_reversals),
        "sign_reversal_share_selected_pilot": len(sign_reversals) / len(rows),
        "mean_absolute_revision_pp": sum(abs_revisions) / len(abs_revisions),
        "median_absolute_revision_pp": statistics.median(abs_revisions),
        "largest_absolute_revision": {
            "record_id": rows[max(range(len(rows)), key=lambda i: abs_revisions[i])]["record_id"],
            "revision_pp": revisions[max(range(len(rows)), key=lambda i: abs_revisions[i])],
        },
        "confirmed_reversal_ids": [r["record_id"] for r in sign_reversals],
        "by_country": by_country,
        "claim_boundary": "This is a deliberately selected pilot of source-linked comparable pairs. The reversal share is not an estimate of population prevalence across MENA statistics, countries, years, or revision events.",
        "next_gate": "Expand within-country archived vintage panels before estimating empirical reversal frequencies or calibrating Narrative Fragility probabilities."
    }

    OUTPUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, indent=2))


if __name__ == "__main__":
    main()
