"""Pinned licensed candidates against proprietary dictionary graphics in RAM."""
import sys
sys.dont_write_bytecode = True
import importlib.util
import json
import subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("review", HERE.parent / "hanja-special2-alternatives-2026-09-21/serve.py")
review = importlib.util.module_from_spec(spec)
spec.loader.exec_module(review)
manifest = json.loads((HERE / "candidates.json").read_text())
review.ENTRIES = []
for entry in manifest["entries"]:
    glyph = entry["glyph"]
    review.base.renderer.ENTRIES[glyph] = {"strokes": entry["dictionaryStrokes"], "dictionary": entry["dictionary"]}
    review.base.renderer.source(glyph)
    review.ENTRIES.append({"id": entry["candidate"]["id"], "glyph": glyph,
                          "dictionaryStrokes": entry["dictionaryStrokes"], "viewBox": "0 0 109 109",
                          "strokes": [{"path": path} for path in entry["paths"]]})

if (HERE / "build.mjs").exists():
    for entry in json.loads(subprocess.check_output(["node", str(HERE / "build.mjs")])):
        review.ENTRIES.append({"id": entry["glyph"] + "-normalized", "glyph": entry["glyph"],
                              "dictionaryStrokes": len(entry["paths"]), "viewBox": "0 0 100 100",
                              "strokes": [{"path": path} for path in entry["paths"]]})

if __name__ == "__main__":
    print(json.dumps({"ready": True, "entries": len(review.ENTRIES), "port": 51837}), flush=True)
    review.ThreadingHTTPServer(("127.0.0.1", 51837), review.Handler).serve_forever()
