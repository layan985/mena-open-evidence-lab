#!/usr/bin/env python3
"""Narrative fragility experiment.

Measures the probability that a later statistical revision moves an estimate
across a qualitative threshold. The experiment compares a zero-mean Normal
revision process with a unit-variance Student-t(3) process and validates the
Normal closed form with seeded Monte Carlo draws.

No empirical MENA revision distribution is assumed here. Distances are
standardized by the revision standard deviation, so the output is a methods
benchmark rather than an estimate for any particular country or indicator.
"""

from __future__ import annotations

import argparse
import csv
import json
import math
import random
from pathlib import Path

DISTANCES = [0.25, 0.50, 0.80, 1.00, 1.50, 2.00, 2.10, 2.50, 3.00]
BIASES = [-0.50, -0.25, 0.00, 0.25, 0.50]


def normal_cdf(x: float) -> float:
    return 0.5 * (1.0 + math.erf(x / math.sqrt(2.0)))


def normal_flip_probability(distance_sd: float, bias_sd: float = 0.0) -> float:
    """Flip probability for an estimate below a threshold.

    distance_sd = (threshold - first_estimate) / revision_sd, positive.
    bias_sd = expected revision / revision_sd. Positive bias means revisions
    tend to move upward, toward and potentially across the threshold.
    """
    return normal_cdf(bias_sd - distance_sd)


def standardized_t3_draw(rng: random.Random) -> float:
    """Draw from Student-t(3) rescaled to variance one.

    If T ~ t_3 then Var(T)=3. Therefore T/sqrt(3) has unit variance.
    Using T = Z/sqrt(V/3), T/sqrt(3) = Z/sqrt(V), where V ~ chi-square(3).
    """
    z = rng.gauss(0.0, 1.0)
    v = sum(rng.gauss(0.0, 1.0) ** 2 for _ in range(3))
    return z / math.sqrt(v)


def run(seed: int, draws: int) -> tuple[list[dict], list[dict]]:
    rng = random.Random(seed)
    normal_samples = [rng.gauss(0.0, 1.0) for _ in range(draws)]
    t3_samples = [standardized_t3_draw(rng) for _ in range(draws)]

    distribution_rows = []
    for d in DISTANCES:
        normal_closed = normal_flip_probability(d)
        normal_mc = sum(x > d for x in normal_samples) / draws
        t3_mc = sum(x > d for x in t3_samples) / draws
        distribution_rows.append(
            {
                "distance_sd": d,
                "normal_closed": normal_closed,
                "normal_mc": normal_mc,
                "t3_mc": t3_mc,
                "t3_vs_normal_ratio": t3_mc / normal_closed if normal_closed else None,
            }
        )

    bias_rows = []
    for d in [0.50, 1.00, 1.50, 2.00]:
        for b in BIASES:
            bias_rows.append(
                {
                    "distance_sd": d,
                    "revision_bias_sd": b,
                    "normal_flip_probability": normal_flip_probability(d, b),
                }
            )

    return distribution_rows, bias_rows


def write_csv(path: Path, rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--draws", type=int, default=1_000_000)
    parser.add_argument("--seed", type=int, default=20260822)
    parser.add_argument("--distribution-output", default="data/narrative-fragility-simulation.csv")
    parser.add_argument("--bias-output", default="data/narrative-fragility-bias-grid.csv")
    parser.add_argument("--json-output", default="data/narrative-fragility-experiment.json")
    args = parser.parse_args()

    distribution_rows, bias_rows = run(args.seed, args.draws)
    write_csv(Path(args.distribution_output), distribution_rows)
    write_csv(Path(args.bias_output), bias_rows)

    crossover = next(
        (r for r in distribution_rows if r["t3_vs_normal_ratio"] is not None and r["t3_vs_normal_ratio"] >= 1.0),
        None,
    )
    payload = {
        "experiment_id": "MENALAB-NF-EXP-001",
        "status": "simulation_methods_experiment",
        "seed": args.seed,
        "draws_per_distribution": args.draws,
        "estimand": "P[(y-c)(y+R-c)<0]",
        "interpretation": "Probability that a future revision crosses a qualitative threshold c.",
        "assumptions": {
            "normal_benchmark": "Revision standardized to mean 0 and variance 1 unless bias grid is used.",
            "heavy_tail_benchmark": "Student-t with 3 degrees of freedom, rescaled to variance 1.",
            "empirical_calibration": "None. Standardized methods benchmark only."
        },
        "headline_results": {
            "normal_flip_at_half_sd": normal_flip_probability(0.5),
            "normal_flip_at_one_sd": normal_flip_probability(1.0),
            "normal_flip_at_two_sd": normal_flip_probability(2.0),
            "normal_flip_at_three_sd": normal_flip_probability(3.0),
            "heavy_tail_crossover_grid_point_sd": crossover["distance_sd"] if crossover else None,
            "heavy_tail_ratio_at_three_sd": next(r["t3_vs_normal_ratio"] for r in distribution_rows if r["distance_sd"] == 3.0),
        },
        "claim_boundary": "These are simulated revision processes. They do not estimate the revision distribution of Saudi Arabia or any other MENA statistical system.",
    }
    Path(args.json_output).write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload["headline_results"], indent=2))


if __name__ == "__main__":
    main()
