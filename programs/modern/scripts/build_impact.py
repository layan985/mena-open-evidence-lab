from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TRACK = ROOT / "tracking"


def read_csv(name: str):
    path = TRACK / name
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def truthy(value: str) -> bool:
    return str(value).strip().lower() in {"1", "true", "yes", "y"}


def main():
    contributors = read_csv("contributors.csv")
    releases = read_csv("releases.csv")
    workshops = read_csv("workshops.csv")
    partners = read_csv("partners.csv")
    policy_uses = read_csv("policy_uses.csv")

    active_contributors = [r for r in contributors if r.get("status") == "active" and r.get("evidence_url")]
    universities = {r.get("university", "").strip() for r in active_contributors if r.get("university", "").strip()}
    public_releases = [r for r in releases if r.get("status") == "released" and r.get("evidence_url")]
    released_rows = sum(int(r.get("rows") or 0) for r in public_releases)
    completed_workshops = [r for r in workshops if r.get("status") == "completed" and r.get("evidence_url")]
    verified_partners = [r for r in partners if r.get("status") == "active" and r.get("evidence_url")]
    verified_policy_uses = [r for r in policy_uses if r.get("evidence_url") and r.get("verified_by")]
    fellows = [r for r in active_contributors if r.get("role") == "fellow"]

    payload = {
        "program": "MODERN Cohort 01",
        "generated_from": [
            "contributors.csv",
            "releases.csv",
            "workshops.csv",
            "partners.csv",
            "policy_uses.csv",
        ],
        "metrics": {
            "contributors": {"current": len(active_contributors), "target": 23},
            "universities": {"current": len(universities), "target": 7},
            "datasets": {"current": len(public_releases), "target": 18},
            "observations": {"current": released_rows, "target": 42000},
            "workshops": {"current": len(completed_workshops), "target": 6},
            "fellows_trained": {"current": len(fellows), "target": 11},
            "institutional_partners": {"current": len(verified_partners), "target": 3},
            "policy_users": {"current": len(verified_policy_uses), "target": 2},
        },
    }

    out = TRACK / "impact.generated.json"
    out.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(out)


if __name__ == "__main__":
    main()
