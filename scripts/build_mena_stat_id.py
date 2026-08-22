#!/usr/bin/env python3
"""Build the MENA-STAT-ID public alpha from existing Lab evidence records."""

from __future__ import annotations

import csv
import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source" / "data"
OUT = ROOT / "release"
DATA_OUT = OUT / "data"

BADGES = ["OFFICIAL SOURCE", "REAL PUBLIC DATA", "PENDING VALIDATION"]
RELEASE_DATE = "2026-08-22"

AR_COUNTRY = {
    "Saudi Arabia": "السعودية",
    "Jordan": "الأردن",
    "Morocco": "المغرب",
    "Tunisia": "تونس",
    "Egypt": "مصر",
    "Oman": "عُمان",
    "Qatar": "قطر",
    "United Arab Emirates": "الإمارات العربية المتحدة",
    "Bahrain": "البحرين",
    "Lebanon": "لبنان",
    "Kuwait": "الكويت",
}

AR_LABEL = {
    "Unemployment rate among Saudis": "معدل البطالة بين السعوديين",
    "Overall unemployment rate": "معدل البطالة لإجمالي السكان",
    "Unemployment rate for the total population": "معدل البطالة لإجمالي السكان",
    "Unemployment rate among Jordanians": "معدل البطالة بين الأردنيين",
}


def load_json(name: str):
    return json.loads((SOURCE / name).read_text(encoding="utf-8"))


def load_csv(name: str):
    with (SOURCE / name).open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def case(
    case_id: str,
    family: str,
    error_class: str,
    prompt_en: str,
    prompt_ar: str,
    answer: dict,
    required_fields: list[str],
    source_urls: list[str],
    derived_from: list[str],
    claim_boundary: str,
    difficulty: str = "adversarial",
    manual_review_fields: list[str] | None = None,
):
    return {
        "id": case_id,
        "task_family": family,
        "error_class": error_class,
        "difficulty": difficulty,
        "prompts": {"en": prompt_en, "ar": prompt_ar},
        "gold": {
            "answer": answer,
            "required_fields": required_fields,
            "manual_review_fields": manual_review_fields or [],
        },
        "evidence": {
            "source_urls": list(dict.fromkeys(source_urls)),
            "derived_from": derived_from,
            "evidence_badges": BADGES,
        },
        "claim_boundary": claim_boundary,
        "review_status": "founder-produced; independent review pending",
    }


def build_cases() -> list[dict]:
    cases: list[dict] = []

    comparability = load_json("menalab-ev-001-comparability-record.json")
    for i, record in enumerate(comparability["records"], 1):
        country_ar = AR_COUNTRY[record["country"]]
        label_ar = AR_LABEL[record["display_label"]]
        cases.append(
            case(
                f"MSID-IDENTITY-{i:03d}",
                "statistical_identity",
                "population_scope",
                (
                    f"According to the official {record['source_release']}, what was the "
                    f"{record['display_label']} in {record['country']}? Return the value, unit, "
                    "population scope, nationality scope, age scope, denominator, reference period, "
                    "vintage and source URL."
                ),
                (
                    f"وفقاً للإصدار الرسمي «{record['source_release']}»، ما قيمة {label_ar} في "
                    f"{country_ar}؟ أعد القيمة والوحدة ونطاق السكان ونطاق الجنسية والفئة العمرية "
                    "والمقام والفترة المرجعية ونسخة الإصدار ورابط المصدر."
                ),
                {
                    "value": record["value_pct"],
                    "unit": "percent",
                    "concept": "unemployment_rate",
                    "population_scope": record["population_scope"],
                    "nationality_scope": record["nationality_scope"],
                    "age_scope": record["age_scope"],
                    "denominator": record["denominator"],
                    "geography": record["country"],
                    "reference_period": record["reference_period"],
                    "vintage": record["vintage"],
                    "source_url": record["source_url"],
                },
                [
                    "value",
                    "unit",
                    "concept",
                    "population_scope",
                    "nationality_scope",
                    "age_scope",
                    "denominator",
                    "geography",
                    "reference_period",
                    "vintage",
                    "source_url",
                ],
                [record["source_url"]],
                ["data/menalab-ev-001-comparability-record.json"],
                "The answer identifies one observation. It does not establish cross-country comparability.",
            )
        )

    comparison_pairs = [
        (
            "Saudi Arabia 6.4% among Saudis and Jordan 16.1% total population",
            "FAIL",
            "national_only_vs_all_residents",
            "هل تصلح المقارنة المباشرة بين بطالة السعوديين 6.4% في السعودية وبطالة إجمالي السكان 16.1% في الأردن من حيث نطاق السكان؟",
        ),
        (
            "Saudi Arabia 3.1% total population and Jordan 16.1% total population",
            "CAUTION",
            "nationality_scope_aligned_further_method_checks_pending",
            "هل تصلح المقارنة المباشرة بين بطالة إجمالي السكان 3.1% في السعودية و16.1% في الأردن؟",
        ),
        (
            "Saudi Arabia 6.4% among Saudis and Jordan 21.1% among Jordanians",
            "CAUTION",
            "nationality_scope_aligned_further_method_checks_pending",
            "هل تصلح المقارنة المباشرة بين بطالة السعوديين 6.4% وبطالة الأردنيين 21.1%؟",
        ),
    ]
    comp_urls = [row["source_url"] for row in comparability["records"]]
    for i, (pair, verdict, reason_code, prompt_ar) in enumerate(comparison_pairs, 1):
        cases.append(
            case(
                f"MSID-COMP-{i:03d}",
                "comparison_validity",
                "false_comparability",
                (
                    f"Audit this comparison using population and nationality scope: {pair}. "
                    "Return verdict as PASS, CAUTION, FAIL or UNKNOWN and a controlled reason code."
                ),
                prompt_ar
                + " أعد الحكم PASS أو CAUTION أو FAIL أو UNKNOWN، مع رمز السبب المعتمد.",
                {"verdict": verdict, "reason_code": reason_code},
                ["verdict", "reason_code"],
                comp_urls,
                ["data/menalab-ev-001-comparability-record.json"],
                "The verdict covers population/nationality scope only. CAUTION retains unresolved cross-country method checks.",
            )
        )

    vintage_rows = {row["record_id"]: row for row in load_csv("saudi-gdp-2023-vintage-pair.csv")}
    selected = [
        ("SAU-GDP-2023-REAL-PRE", "MSID-VINTAGE-001"),
        ("SAU-GDP-2023-REAL-REV", "MSID-VINTAGE-002"),
    ]
    for record_id, case_id in selected:
        row = vintage_rows[record_id]
        cases.append(
            case(
                case_id,
                "vintage_retrieval",
                "vintage_leakage",
                (
                    f"What value for {row['indicator']} in {row['reference_period']} is reported by "
                    f"the official {row['vintage_state']} vintage dated {row['release_date']}? "
                    "Return the value, unit, vintage state, release date, geography, reference period and source URL."
                ),
                (
                    f"ما القيمة التي أوردتها النسخة الرسمية المؤرخة {row['release_date']} لمؤشر "
                    f"{row['indicator']} عن {row['reference_period']}؟ أعد القيمة والوحدة وحالة النسخة "
                    "وتاريخ الإصدار والجغرافيا والفترة المرجعية ورابط المصدر."
                ),
                {
                    "value": float(row["value"]),
                    "unit": row["unit"],
                    "concept": row["indicator"],
                    "geography": row["country"],
                    "reference_period": row["reference_period"],
                    "vintage_state": row["vintage_state"],
                    "release_date": row["release_date"],
                    "source_url": row["source_url"],
                },
                [
                    "value",
                    "unit",
                    "concept",
                    "geography",
                    "reference_period",
                    "vintage_state",
                    "release_date",
                    "source_url",
                ],
                [row["source_url"]],
                ["data/saudi-gdp-2023-vintage-pair.csv"],
                "The requested value is tied to the named vintage; substituting the later official value is time leakage.",
            )
        )

    pre = vintage_rows["SAU-GDP-2023-REAL-PRE"]
    rev = vintage_rows["SAU-GDP-2023-REAL-REV"]
    cases.append(
        case(
            "MSID-VINTAGE-003",
            "decision_time_retrieval",
            "vintage_leakage",
            "As of 10 March 2025, what official value was available for Saudi Arabia's 2023 real GDP growth? Do not use later revisions.",
            "في 10 مارس/آذار 2025، ما القيمة الرسمية المتاحة لنمو الناتج المحلي الإجمالي الحقيقي للسعودية في 2023؟ لا تستخدم مراجعات لاحقة.",
            {
                "value": float(pre["value"]),
                "unit": pre["unit"],
                "concept": pre["indicator"],
                "geography": pre["country"],
                "reference_period": pre["reference_period"],
                "vintage_state": pre["vintage_state"],
                "available_by_cutoff": True,
                "source_url": pre["source_url"],
            },
            [
                "value",
                "unit",
                "concept",
                "geography",
                "reference_period",
                "vintage_state",
                "available_by_cutoff",
                "source_url",
            ],
            [pre["source_url"], rev["source_url"]],
            ["data/saudi-gdp-2023-vintage-pair.csv"],
            "The cutoff precedes the 1 May 2025 comprehensive revision.",
        )
    )
    cases.append(
        case(
            "MSID-VINTAGE-004",
            "revision_interpretation",
            "narrative_flip",
            "Did Saudi Arabia's official description of 2023 real GDP growth change sign across the preserved vintages? Return both values, the revision in percentage points and the direction change.",
            "هل تغيرت إشارة نمو الناتج المحلي الإجمالي الحقيقي الرسمي للسعودية في 2023 بين النسختين المحفوظتين؟ أعد القيمتين وحجم المراجعة بالنقاط المئوية واتجاه التغير.",
            {
                "first_value": float(pre["value"]),
                "later_value": float(rev["value"]),
                "revision_pp": 1.3,
                "unit": "percentage_points",
                "direction_change": "contraction_to_growth",
            },
            ["first_value", "later_value", "revision_pp", "unit", "direction_change"],
            [pre["source_url"], rev["source_url"]],
            ["data/saudi-gdp-2023-vintage-pair.csv"],
            "This is a statistical-vintage event; it does not mean underlying 2023 activity changed retroactively.",
        )
    )

    for i, row in enumerate(load_csv("release-003-revision-pairs.csv"), 1):
        cases.append(
            case(
                f"MSID-REVISION-{i:03d}",
                "revision_pair",
                "revision_omission",
                (
                    f"For {row['country']} {row['series']} ({row['reference_period']}, {row['metric']}), "
                    f"compare the first vintage dated {row['first_vintage_date']} with the later vintage "
                    f"dated {row['later_vintage_date']}. Return first value, later value, revision in "
                    "percentage points and whether the old vintage remains public."
                ),
                (
                    f"بالنسبة إلى {AR_COUNTRY.get(row['country'], row['country'])}، {row['series']} "
                    f"({row['reference_period']}، {row['metric']}): قارن النسخة الأولى المؤرخة "
                    f"{row['first_vintage_date']} بالنسخة اللاحقة المؤرخة {row['later_vintage_date']}. "
                    "أعد القيمة الأولى والقيمة اللاحقة والمراجعة بالنقاط المئوية وهل بقيت النسخة القديمة متاحة."
                ),
                {
                    "first_value": float(row["first_value"]),
                    "later_value": float(row["later_value"]),
                    "revision_pp": float(row["revision_pp"]),
                    "old_vintage_still_public": row["old_vintage_still_public"] == "yes",
                    "reference_period": row["reference_period"],
                    "metric": row["metric"],
                },
                [
                    "first_value",
                    "later_value",
                    "revision_pp",
                    "old_vintage_still_public",
                    "reference_period",
                    "metric",
                ],
                [row["first_source"], row["later_source"]],
                ["data/release-003-revision-pairs.csv"],
                "Revision equals later minus first vintage. The case is descriptive and does not assign a cause beyond the documented release type.",
            )
        )

    for i, row in enumerate(load_csv("release-001-jordan-language-timing.csv"), 1):
        cases.append(
            case(
                f"MSID-LANGUAGE-{i:03d}",
                "bilingual_archive",
                "language_asymmetry",
                (
                    f"For Jordan archive pair {row['pair_id']}, what is the calendar-day gap between "
                    "the Arabic and English public file timestamps? Return the gap, both filenames and "
                    "the exact measurement boundary."
                ),
                (
                    f"بالنسبة إلى زوج الأرشيف الأردني {row['pair_id']}، ما الفارق بالأيام التقويمية "
                    "بين الطابعين الزمنيين للملفين العربي والإنجليزي؟ أعد الفارق واسمي الملفين وحد القياس."
                ),
                {
                    "calendar_day_gap": int(row["calendar_day_gap"]),
                    "arabic_file": row["arabic_file"],
                    "english_file": row["english_file"],
                    "measurement_boundary": "public_directory_file_timestamps_not_first_dissemination",
                },
                ["calendar_day_gap", "arabic_file", "english_file", "measurement_boundary"],
                [row["source_directory"]],
                ["data/release-001-jordan-language-timing.csv"],
                row["measurement_note"],
            )
        )

    method_registry = load_json("method-change-registry-v0.2.json")
    for i, row in enumerate(method_registry["records"], 1):
        country_ar = AR_COUNTRY.get(row["country"], row["country"])
        cases.append(
            case(
                f"MSID-METHOD-{i:03d}",
                "method_regime",
                "method_version_loss",
                (
                    f"For {row['country']} — {row['series']} — identify the producer-documented bridge "
                    "class and direct-comparability decision in the MENA Statistical Method Change Registry. "
                    "Return the controlled fields bridge_class and direct_comparability."
                ),
                (
                    f"بالنسبة إلى {country_ar} — {row['series']} — حدّد فئة الجسر الموثقة وقرار "
                    "المقارنة المباشرة في سجل تغير المناهج الإحصائية. أعد الحقلين المضبوطين "
                    "bridge_class وdirect_comparability كما يردان في السجل."
                ),
                {
                    "bridge_class": row["bridge_class"],
                    "direct_comparability": row["direct_comparability"],
                    "effective_period": row["effective_period"],
                    "user_action": row["user_action"],
                },
                ["bridge_class", "direct_comparability", "effective_period"],
                row["source_urls"],
                ["data/method-change-registry-v0.2.json"],
                method_registry["claim_boundary"],
                manual_review_fields=["user_action"],
            )
        )

    return cases


def make_schema() -> dict:
    return {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://menaevidencelab.org/data/mena-stat-id-schema.json",
        "title": "MENA-STAT-ID public alpha",
        "type": "object",
        "required": [
            "schema_version",
            "release_version",
            "status",
            "case_count",
            "prompt_variant_count",
            "cases",
        ],
        "properties": {
            "schema_version": {"const": "0.1.0"},
            "release_version": {"type": "string"},
            "status": {"type": "string"},
            "case_count": {"type": "integer", "minimum": 1},
            "prompt_variant_count": {"type": "integer", "minimum": 2},
            "cases": {
                "type": "array",
                "items": {
                    "type": "object",
                    "required": [
                        "id",
                        "task_family",
                        "error_class",
                        "prompts",
                        "gold",
                        "evidence",
                        "claim_boundary",
                        "review_status",
                    ],
                    "properties": {
                        "id": {"type": "string", "pattern": "^MSID-[A-Z]+-[0-9]{3}$"},
                        "prompts": {
                            "type": "object",
                            "required": ["en", "ar"],
                            "properties": {
                                "en": {"type": "string", "minLength": 20},
                                "ar": {"type": "string", "minLength": 20},
                            },
                            "additionalProperties": False,
                        },
                        "gold": {
                            "type": "object",
                            "required": ["answer", "required_fields", "manual_review_fields"],
                        },
                        "evidence": {
                            "type": "object",
                            "required": ["source_urls", "derived_from", "evidence_badges"],
                        },
                    },
                },
            },
        },
    }


def main() -> None:
    DATA_OUT.mkdir(parents=True, exist_ok=True)
    cases = build_cases()
    families = Counter(row["task_family"] for row in cases)
    unique_sources = sorted(
        {url for row in cases for url in row["evidence"]["source_urls"] if url}
    )
    release = {
        "schema_version": "0.1.0",
        "release_version": "0.1.0-alpha",
        "title": "MENA-STAT-ID: Statistical Identity Benchmark",
        "subtitle": "The number is not the statistic.",
        "released": RELEASE_DATE,
        "status": "public alpha; external methodological review pending",
        "case_count": len(cases),
        "prompt_variant_count": len(cases) * 2,
        "languages": ["ar", "en"],
        "unique_source_url_count": len(unique_sources),
        "task_family_counts": dict(sorted(families.items())),
        "primary_metric": "Statistical Identity Exact Match",
        "identity_contract": [
            "value",
            "concept",
            "population",
            "geography",
            "reference_period",
            "unit",
            "adjustment",
            "method_version",
            "vintage",
            "source",
        ],
        "claim_boundary": (
            "This public alpha tests the benchmark schema and scoring protocol on cases derived "
            "from existing source-verified Lab records. It is not a representative sample of MENA "
            "official statistics, not an assessment of statistical-office competence, not a blind "
            "leaderboard, and has not yet received independent methodological review."
        ),
        "evidence_badges": BADGES,
        "reviewers": 0,
        "cases": cases,
    }
    (DATA_OUT / "mena-stat-id-alpha.json").write_text(
        json.dumps(release, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (DATA_OUT / "mena-stat-id-schema.json").write_text(
        json.dumps(make_schema(), ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    with (DATA_OUT / "mena-stat-id-prompts.csv").open(
        "w", encoding="utf-8", newline=""
    ) as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["id", "language", "task_family", "error_class", "prompt"],
        )
        writer.writeheader()
        for row in cases:
            for language in ("en", "ar"):
                writer.writerow(
                    {
                        "id": row["id"],
                        "language": language,
                        "task_family": row["task_family"],
                        "error_class": row["error_class"],
                        "prompt": row["prompts"][language],
                    }
                )

    print(
        json.dumps(
            {
                "cases": len(cases),
                "prompt_variants": len(cases) * 2,
                "unique_source_urls": len(unique_sources),
                "task_families": dict(sorted(families.items())),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()

