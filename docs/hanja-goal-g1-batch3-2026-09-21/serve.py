"""RAM-only source comparison for the third goal batch."""
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
review.ENTRIES = []
for entry in (json.loads((HERE / "candidates.json").read_text())["entries"]
              + json.loads((HERE / "alternatives.json").read_text())["entries"]):
    glyph = entry["glyph"]
    review.base.renderer.ENTRIES[glyph] = {"strokes": entry["dictionaryStrokes"], "dictionary": entry["dictionary"]}
    review.base.renderer.source(glyph)
    review.ENTRIES.append({"id": entry["candidate"]["id"], "glyph": glyph,
                          "dictionaryStrokes": entry["dictionaryStrokes"], "viewBox": "0 0 109 109",
                          "strokes": [{"path": path} for path in entry["paths"]]})

normalized = json.loads(subprocess.check_output([
    "node", "--experimental-strip-types", "--input-type=module", "-e",
    "import {readFileSync} from 'node:fs';"
    "import {normalizeKanjiVGPath} from './lib/hanja-stroke-kanjivg-geometry.ts';"
    "const e=JSON.parse(readFileSync('docs/hanja-goal-g1-batch3-2026-09-21/candidates.json')).entries.find(e=>e.glyph==='餞');"
    "console.log(JSON.stringify([1,2,3,5,6,7,4,8,9,10,11,12,13,14,15,16,17].map(i=>normalizeKanjiVGPath(e.paths[i-1]))));"
], cwd=HERE.parent.parent))
review.ENTRIES.append({"id": "餞-normalized", "glyph": "餞", "dictionaryStrokes": 17,
                       "viewBox": "0 0 100 100", "strokes": [{"path": p} for p in normalized]})

if __name__ == "__main__":
    print(json.dumps({"ready": True, "entries": len(review.ENTRIES), "port": 51837}), flush=True)
    review.ThreadingHTTPServer(("127.0.0.1", 51837), review.Handler).serve_forever()
