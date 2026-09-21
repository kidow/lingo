"""Special batch 5 comparison; private graphics remain in RAM."""
import sys
sys.dont_write_bytecode = True
import importlib.util
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("review", HERE.parent / "hanja-special2-alternatives-2026-09-21/serve.py")
review = importlib.util.module_from_spec(spec)
spec.loader.exec_module(review)
review.ENTRIES = []
for entry in json.loads((HERE / "candidates.json").read_text())["entries"]:
    glyph = entry["glyph"]
    review.base.renderer.ENTRIES[glyph] = {"strokes": entry["dictionaryStrokes"], "dictionary": entry["dictionary"]}
    review.base.renderer.source(glyph)
    review.ENTRIES.append({"id": entry["candidate"]["id"], "glyph": glyph,
                          "dictionaryStrokes": entry["dictionaryStrokes"], "viewBox": "0 0 109 109",
                          "strokes": [{"path": path} for path in entry["paths"]]})
if (HERE / "normalized.json").exists():
    for entry in json.loads((HERE / "normalized.json").read_text())["entries"]:
        review.ENTRIES.append({"id": entry["glyph"] + "-normalized", "glyph": entry["glyph"],
                              "dictionaryStrokes": len(entry["paths"]), "viewBox": "0 0 100 100",
                              "strokes": [{"path": path} for path in entry["paths"]]})
original_candidate = review.candidate
def candidate(entry, end=None):
    # Only 闍 was approved at the source-derived width; held candidates keep the comparison width.
    width = (3 if entry["viewBox"] == "0 0 109 109" else 300 / 109) if entry["glyph"] == "闍" else 5
    return original_candidate(entry, end).replace('stroke-width="5"', 'stroke-width="' + str(width) + '"').replace('stroke-width="4"', 'stroke-width="' + str(width) + '"')
review.candidate = candidate
if __name__ == "__main__":
    print(json.dumps({"ready": True, "entries": len(review.ENTRIES), "port": 51837}), flush=True)
    review.ThreadingHTTPServer(("127.0.0.1", 51837), review.Handler).serve_forever()
