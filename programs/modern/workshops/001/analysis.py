from pathlib import Path
import csv

DATA = Path(__file__).parent / "data" / "panel.csv"

with DATA.open(newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))

assert len(rows) == 56, f"Expected 56 rows, found {len(rows)}"

pairs = {(r["region"], r["year"]) for r in rows}
assert len(pairs) == 56, "Duplicate region-year rows detected"

regions = {}
for r in rows:
    regions.setdefault(r["region"], set()).add(r["treated"])
assert all(len(v) == 1 for v in regions.values()), "Treatment varies within region"

assert all(int(r["post"]) == (int(r["year"]) >= 2022) for r in rows), "Post indicator is inconsistent"

for r in rows:
    r["employment_rate"] = float(r["employment_rate"])
    r["treated"] = int(r["treated"])
    r["post"] = int(r["post"])
    r["did"] = r["treated"] * r["post"]


def mean(values):
    return sum(values) / len(values)


def group_mean(treated, post):
    vals = [r["employment_rate"] for r in rows if r["treated"] == treated and r["post"] == post]
    return mean(vals)

means = {
    "treated_pre": group_mean(1, 0),
    "treated_post": group_mean(1, 1),
    "control_pre": group_mean(0, 0),
    "control_post": group_mean(0, 1),
}

did = (means["treated_post"] - means["treated_pre"]) - (means["control_post"] - means["control_pre"])

print("Workshop 001 reproduction check")
print(f"rows: {len(rows)}")
for key, value in means.items():
    print(f"{key}: {value:.6f}")
print(f"simple_did: {did:.7f}")

EXPECTED = 2.6679167
assert abs(did - EXPECTED) < 1e-6, f"Unexpected DiD result: {did}"
print("status: PASS")
