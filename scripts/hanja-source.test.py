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
        row = {"gradeCode": "30", "glyph": "幣", "hunEum": "화폐 폐:",
               "radical": "巾", "strokes": "15", "sourceRow": 5317}
        result = SOURCE.character_from_row(row, "3급")
        self.assertEqual(result["strokes"], 15)
        self.assertNotIn("sourceStrokes", result)
        self.assertNotIn("strokeCountCorrection", result)


if __name__ == "__main__":
    unittest.main()
