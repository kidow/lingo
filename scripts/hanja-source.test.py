"""Offline tests of row normalization; XLS acquisition is verified separately."""

import copy
import importlib.util
import json
from pathlib import Path
import sys
import types
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parent.parent
SPEC = importlib.util.spec_from_file_location("hanja_source", ROOT / "scripts/hanja-source.py")
SOURCE = importlib.util.module_from_spec(SPEC)
# These tests never parse a workbook. Isolate that optional external dependency.
with patch.dict(sys.modules, {"xlrd": types.ModuleType("xlrd")}):
    SPEC.loader.exec_module(SOURCE)


class StrokeCountCorrectionTests(unittest.TestCase):
    def setUp(self):
        self.registry = copy.deepcopy(SOURCE.STROKE_COUNT_CORRECTIONS)
        self.addCleanup(setattr, SOURCE, "STROKE_COUNT_CORRECTIONS", self.registry)
        self.row = {
            "gradeCode": "32", "glyph": "弊", "hunEum": "폐단/해질 폐:",
            "radical": "廾", "strokes": "15", "sourceRow": 5316,
        }

    def test_original_xls_row_normalizes_to_corrected_catalog_record(self):
        grade = json.loads((ROOT / "content/hanja/characters/g3-2.json").read_text())
        expected = next(item for item in grade["characters"] if item["glyph"] == "弊")
        self.assertEqual(SOURCE.character_from_row(self.row, "3급II"), expected)
        self.assertEqual(self.row["strokes"], "15")

    def test_changed_source_count_or_row_requires_recheck(self):
        for change in [{"strokes": "14"}, {"sourceRow": 5317}]:
            with self.subTest(change=change), self.assertRaisesRegex(ValueError, "changed source"):
                SOURCE.character_from_row(self.row | change, "3급II")

    def test_changed_registry_version_glyph_or_duplicate_requires_recheck(self):
        variants = []
        version = copy.deepcopy(self.registry)
        version["version"] = 2
        variants.append(version)
        glyph = copy.deepcopy(self.registry)
        glyph["entries"][0]["sourceGlyph"] = "敝"
        variants.append(glyph)
        duplicate = copy.deepcopy(self.registry)
        duplicate["entries"].append(copy.deepcopy(duplicate["entries"][0]))
        variants.append(duplicate)
        for registry in variants:
            SOURCE.STROKE_COUNT_CORRECTIONS = registry
            with self.subTest(registry=registry), self.assertRaisesRegex(ValueError, "changed source"):
                SOURCE.character_from_row(self.row, "3급II")

    def test_changed_workbook_requires_recheck_before_roster_verification(self):
        with self.assertRaisesRegex(ValueError, "changed workbook"):
            SOURCE.verify_root({"source": {"sha256": "different-workbook"}}, ROOT)

    def test_shared_component_does_not_implicitly_correct_other_characters(self):
        row = {"gradeCode": "10", "glyph": "斃", "hunEum": "죽을 폐:",
               "radical": "攴", "strokes": "18", "sourceRow": 5319}
        result = SOURCE.character_from_row(row, "1급")
        self.assertEqual(result["strokes"], 18)
        self.assertNotIn("sourceStrokes", result)
        self.assertNotIn("strokeCountCorrection", result)

    def test_individually_reviewed_grade3_counts_preserve_source_and_identity(self):
        catalog = json.loads((ROOT / "content/hanja/characters/g3.json").read_text())
        for glyph, hun, radical, original, corrected, source_row in [
            ("幣", "화폐", "巾", 15, 14, 5317),
            ("蔽", "덮을", "艸", 16, 15, 5318),
        ]:
            row = {"gradeCode": "30", "glyph": glyph, "hunEum": hun + " 폐:",
                   "radical": radical, "strokes": str(original), "sourceRow": source_row}
            with self.subTest(glyph=glyph):
                result = SOURCE.character_from_row(row, "3급")
                self.assertEqual(result, next(c for c in catalog["characters"] if c["glyph"] == glyph))
                self.assertEqual(result["strokes"], corrected)
                self.assertEqual(result["sourceStrokes"], original)
                self.assertEqual(result["id"], f"u{ord(glyph):x}")
                for change in [{"strokes": str(corrected)}, {"sourceRow": source_row + 1}]:
                    with self.assertRaisesRegex(ValueError, "changed source"):
                        SOURCE.character_from_row(row | change, "3급")


    def test_display_variant_count_correction_preserves_the_exact_workbook_identity(self):
        row = {"gradeCode": "20", "glyph": "煕", "hunEum": "빛날 희",
               "radical": "火", "strokes": "13", "sourceRow": 5954}
        catalog = json.loads((ROOT / "content/hanja/characters/g2.json").read_text())
        expected = next(c for c in catalog["characters"] if c["glyph"] == "熙")
        result = SOURCE.character_from_row(row, "2급")
        self.assertEqual(result, expected)
        self.assertEqual(result["id"], "u7199")
        self.assertEqual(result["strokes"], 14)
        self.assertEqual(result["sourceStrokes"], 13)
        self.assertEqual(result["sourceGlyph"], "煕")
        self.assertEqual(result["glyphAliases"], ["煕"])
        for change in [{"glyph": "熙"}, {"sourceRow": 5955}, {"strokes": "14"}]:
            with self.subTest(change=change), self.assertRaisesRegex(ValueError, "changed source"):
                SOURCE.character_from_row(row | change, "2급")

if __name__ == "__main__":
    unittest.main()
