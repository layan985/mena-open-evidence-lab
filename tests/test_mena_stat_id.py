import json
import subprocess
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATASET = ROOT / "release" / "data" / "mena-stat-id-alpha.json"
SCORER = ROOT / "scripts" / "score_mena_stat_id.py"


class BenchmarkTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        subprocess.run(
            ["python3", str(ROOT / "scripts" / "build_mena_stat_id.py")],
            cwd=ROOT,
            check=True,
            capture_output=True,
            text=True,
        )
        cls.dataset = json.loads(DATASET.read_text(encoding="utf-8"))

    def test_release_shape_and_counts(self):
        self.assertEqual(self.dataset["case_count"], 42)
        self.assertEqual(self.dataset["prompt_variant_count"], 84)
        self.assertEqual(len(self.dataset["cases"]), 42)
        self.assertEqual(len({row["id"] for row in self.dataset["cases"]}), 42)
        self.assertTrue(all(set(row["prompts"]) == {"en", "ar"} for row in self.dataset["cases"]))
        self.assertEqual(self.dataset["reviewers"], 0)
        self.assertIn("PENDING VALIDATION", self.dataset["evidence_badges"])

    def test_every_case_has_sources_and_required_gold(self):
        for row in self.dataset["cases"]:
            self.assertTrue(row["evidence"]["source_urls"], row["id"])
            for field in row["gold"]["required_fields"]:
                self.assertIn(field, row["gold"]["answer"], (row["id"], field))

    def score(self, predictions):
        with tempfile.TemporaryDirectory() as temp:
            pred = Path(temp) / "predictions.json"
            out = Path(temp) / "score.json"
            pred.write_text(json.dumps(predictions, ensure_ascii=False), encoding="utf-8")
            subprocess.run(
                ["python3", str(SCORER), str(DATASET), str(pred), "--output", str(out)],
                cwd=ROOT,
                check=True,
            )
            return json.loads(out.read_text(encoding="utf-8"))

    def perfect_predictions(self):
        return [
            {
                "id": row["id"],
                "language": language,
                "answer": row["gold"]["answer"],
                "confidence": 1.0,
            }
            for row in self.dataset["cases"]
            for language in ("en", "ar")
        ]

    def test_perfect_predictions_score_one(self):
        result = self.score(self.perfect_predictions())
        self.assertEqual(result["coverage"], 1.0)
        self.assertEqual(result["statistical_identity_exact_match_full"], 1.0)
        self.assertEqual(result["required_field_accuracy"], 1.0)
        self.assertEqual(result["confidently_wrong_rate"], 0.0)

    def test_correct_number_wrong_population_fails_exact_match(self):
        predictions = self.perfect_predictions()
        predictions[0]["answer"] = dict(predictions[0]["answer"])
        predictions[0]["answer"]["population_scope"] = "All residents"
        result = self.score(predictions)
        self.assertLess(result["statistical_identity_exact_match_full"], 1.0)
        self.assertGreater(result["confidently_wrong_rate"], 0.0)
        self.assertTrue(
            any(
                error.get("id") == predictions[0]["id"]
                and "population_scope" in error.get("fields", [])
                for error in result["errors"]
            )
        )


if __name__ == "__main__":
    unittest.main()

