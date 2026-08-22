#!/usr/bin/env python3
"""Score predictions against MENA-STAT-ID without external dependencies."""

from __future__ import annotations

import argparse
import json
import math
import re
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any


def read_predictions(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        return []
    if text.startswith("["):
        payload = json.loads(text)
        if not isinstance(payload, list):
            raise ValueError("JSON prediction payload must be a list")
        return payload
    return [json.loads(line) for line in text.splitlines() if line.strip()]


def normalize(value: Any) -> Any:
    if isinstance(value, str):
        return re.sub(r"\s+", " ", value.strip()).casefold()
    return value


def values_match(gold: Any, predicted: Any) -> bool:
    if isinstance(gold, bool):
        return isinstance(predicted, bool) and gold is predicted
    if isinstance(gold, (int, float)) and not isinstance(gold, bool):
        try:
            number = float(predicted)
        except (TypeError, ValueError):
            return False
        return math.isclose(float(gold), number, rel_tol=1e-9, abs_tol=1e-6)
    return normalize(gold) == normalize(predicted)


def score(dataset: dict, predictions: list[dict]) -> dict:
    expected = {
        (row["id"], language): row
        for row in dataset["cases"]
        for language in ("en", "ar")
    }
    supplied = {}
    duplicates = []
    unknown = []
    for prediction in predictions:
        key = (prediction.get("id"), prediction.get("language"))
        if key not in expected:
            unknown.append(key)
            continue
        if key in supplied:
            duplicates.append(key)
        supplied[key] = prediction

    exact_full = 0
    exact_submitted = 0
    submitted_count = 0
    field_correct = 0
    field_total = 0
    high_confidence_wrong = 0
    high_confidence_total = 0
    by_family = defaultdict(lambda: Counter(expected=0, submitted=0, exact=0))
    by_language = defaultdict(lambda: Counter(expected=0, submitted=0, exact=0))
    errors = []

    for key, row in expected.items():
        language = key[1]
        family = row["task_family"]
        by_family[family]["expected"] += 1
        by_language[language]["expected"] += 1
        prediction = supplied.get(key)
        if prediction is None:
            errors.append({"id": key[0], "language": language, "error": "missing_prediction"})
            continue
        submitted_count += 1
        by_family[family]["submitted"] += 1
        by_language[language]["submitted"] += 1
        answer = prediction.get("answer")
        if not isinstance(answer, dict):
            answer = {}
        missing_or_wrong = []
        for field in row["gold"]["required_fields"]:
            field_total += 1
            if field in answer and values_match(row["gold"]["answer"].get(field), answer[field]):
                field_correct += 1
            else:
                missing_or_wrong.append(field)
        is_exact = not missing_or_wrong
        if is_exact:
            exact_full += 1
            exact_submitted += 1
            by_family[family]["exact"] += 1
            by_language[language]["exact"] += 1
        else:
            errors.append(
                {
                    "id": key[0],
                    "language": language,
                    "error": "identity_mismatch",
                    "fields": missing_or_wrong,
                }
            )
        confidence = prediction.get("confidence")
        if isinstance(confidence, (int, float)) and confidence >= 0.8:
            high_confidence_total += 1
            if not is_exact:
                high_confidence_wrong += 1

    expected_count = len(expected)
    return {
        "benchmark": dataset["title"],
        "release_version": dataset["release_version"],
        "expected_prompt_variants": expected_count,
        "submitted_prompt_variants": submitted_count,
        "coverage": submitted_count / expected_count if expected_count else 0.0,
        "statistical_identity_exact_match_full": exact_full / expected_count if expected_count else 0.0,
        "statistical_identity_exact_match_submitted": (
            exact_submitted / submitted_count if submitted_count else 0.0
        ),
        "required_field_accuracy": field_correct / field_total if field_total else 0.0,
        "confidently_wrong_rate": (
            high_confidence_wrong / high_confidence_total if high_confidence_total else None
        ),
        "duplicate_prediction_keys": duplicates,
        "unknown_prediction_keys": unknown,
        "by_task_family": {
            name: {
                **counts,
                "exact_match": counts["exact"] / counts["expected"] if counts["expected"] else 0.0,
            }
            for name, counts in sorted(by_family.items())
        },
        "by_language": {
            name: {
                **counts,
                "exact_match": counts["exact"] / counts["expected"] if counts["expected"] else 0.0,
            }
            for name, counts in sorted(by_language.items())
        },
        "errors": errors,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("dataset", type=Path)
    parser.add_argument("predictions", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    dataset = json.loads(args.dataset.read_text(encoding="utf-8"))
    result = score(dataset, read_predictions(args.predictions))
    text = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
    if args.output:
        args.output.write_text(text, encoding="utf-8")
    else:
        print(text, end="")


if __name__ == "__main__":
    main()

