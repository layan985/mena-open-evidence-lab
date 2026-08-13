from pathlib import Path
import csv
import json

DATA = Path(__file__).parent / "data" / "panel.csv"
OUTPUTS = Path(__file__).parent / "outputs"

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

required = {"region", "year", "employment_rate", "treated", "post"}
assert required.issubset(rows[0]), f"Missing required columns: {sorted(required - set(rows[0]))}"
assert all(all(str(r[k]).strip() for k in required) for r in rows), "Missing values detected"

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


def solve_linear_system(matrix, vector):
    """Solve a small dense linear system with partial pivoting."""
    augmented = [list(row) + [value] for row, value in zip(matrix, vector)]
    n = len(augmented)
    for col in range(n):
        pivot = max(range(col, n), key=lambda i: abs(augmented[i][col]))
        assert abs(augmented[pivot][col]) > 1e-12, "Singular regression design"
        augmented[col], augmented[pivot] = augmented[pivot], augmented[col]
        scale = augmented[col][col]
        augmented[col] = [value / scale for value in augmented[col]]
        for row in range(n):
            if row == col:
                continue
            factor = augmented[row][col]
            augmented[row] = [
                value - factor * pivot_value
                for value, pivot_value in zip(augmented[row], augmented[col])
            ]
    return [row[-1] for row in augmented]


design = [[1.0, r["treated"], r["post"], r["did"]] for r in rows]
outcome = [r["employment_rate"] for r in rows]
xtx = [[sum(x[i] * x[j] for x in design) for j in range(4)] for i in range(4)]
xty = [sum(x[i] * y for x, y in zip(design, outcome)) for i in range(4)]
intercept, treated_coef, post_coef, interaction_coef = solve_linear_system(xtx, xty)

print("Workshop 001 reproduction check")
print(f"rows: {len(rows)}")
for key, value in means.items():
    print(f"{key}: {value:.6f}")
print(f"simple_did: {did:.7f}")

EXPECTED = 2.6679167
assert abs(did - EXPECTED) < 1e-6, f"Unexpected DiD result: {did}"
assert abs(interaction_coef - did) < 1e-9, "Regression interaction does not match simple DiD"
print("status: PASS")

OUTPUTS.mkdir(exist_ok=True)

with (OUTPUTS / "group_means.csv").open("w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["group", "period", "mean_employment_rate"])
    for key, value in means.items():
        group, period = key.split("_")
        writer.writerow([group, period, f"{value:.6f}"])

result = {
    "status": "reference_solution",
    "data_contract": {"rows": len(rows), "unique_region_year_keys": len(pairs)},
    "group_means": {key: round(value, 6) for key, value in means.items()},
    "simple_difference_in_differences": round(did, 7),
    "ols": {
        "formula": "employment_rate ~ treated + post + treated:post",
        "intercept": round(intercept, 7),
        "treated": round(treated_coef, 7),
        "post": round(post_coef, 7),
        "treated_post": round(interaction_coef, 7),
    },
    "claim_boundary": "Synthetic teaching result; no claim about a real policy.",
}
(OUTPUTS / "result.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")


def svg_line(x1, y1, x2, y2, color):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="5" />'


def y_position(value):
    return 300 - (value - 58) * 28


treated_pre_y = y_position(means["treated_pre"])
treated_post_y = y_position(means["treated_post"])
control_pre_y = y_position(means["control_pre"])
control_post_y = y_position(means["control_post"])
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="760" height="400" viewBox="0 0 760 400">
<rect width="760" height="400" fill="#f4f1e8"/>
<text x="48" y="48" font-family="Arial" font-size="24" font-weight="700" fill="#11110f">Mean employment rate, synthetic panel</text>
<line x1="90" y1="320" x2="700" y2="320" stroke="#9b9d96"/>
<line x1="160" y1="90" x2="160" y2="320" stroke="#c8c7bf"/>
<line x1="610" y1="90" x2="610" y2="320" stroke="#c8c7bf"/>
{svg_line(160, treated_pre_y, 610, treated_post_y, "#2448ff")}
{svg_line(160, control_pre_y, 610, control_post_y, "#11110f")}
<circle cx="160" cy="{treated_pre_y}" r="8" fill="#2448ff"/><circle cx="610" cy="{treated_post_y}" r="8" fill="#2448ff"/>
<circle cx="160" cy="{control_pre_y}" r="8" fill="#11110f"/><circle cx="610" cy="{control_post_y}" r="8" fill="#11110f"/>
<text x="135" y="352" font-family="Arial" font-size="18" fill="#676a64">PRE</text>
<text x="580" y="352" font-family="Arial" font-size="18" fill="#676a64">POST</text>
<rect x="486" y="30" width="18" height="18" fill="#2448ff"/><text x="514" y="45" font-family="Arial" font-size="16">Treated</text>
<rect x="594" y="30" width="18" height="18" fill="#11110f"/><text x="622" y="45" font-family="Arial" font-size="16">Control</text>
<text x="48" y="386" font-family="Arial" font-size="14" fill="#676a64">Reference figure. Difference-in-differences = {did:.7f} percentage points.</text>
</svg>'''
(OUTPUTS / "mean_employment_by_group.svg").write_text(svg + "\n", encoding="utf-8")
