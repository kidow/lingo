"""Compare normalized, reordered licensed paths with dictionary graphics in RAM."""
import sys
sys.dont_write_bytecode = True
import importlib.util
import json
import subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('review', HERE.parent / 'hanja-special2-alternatives-2026-09-21/serve.py')
review = importlib.util.module_from_spec(spec)
spec.loader.exec_module(review)
candidate = json.loads((HERE / 'candidate.json').read_text())
review.base.renderer.ENTRIES['兎'] = {'strokes': 8, 'dictionary': candidate['dictionary']}
review.base.renderer.source('兎')
generated = json.loads(subprocess.check_output(['node', str(HERE / 'build.mjs')]))[0]
review.ENTRIES = [{'id': 'rabbit-normalized', 'glyph': '兎', 'dictionaryStrokes': 8,
    'viewBox': '0 0 100 100', 'strokes': [{'path': p} for p in generated['paths']]}]

if __name__ == '__main__':
    review.ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv) > 1 else 51835), review.Handler).serve_forever()
