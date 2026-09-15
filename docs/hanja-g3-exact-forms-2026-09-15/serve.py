#!/usr/bin/env python3
"""Review exact dictionary forms; all proprietary source media stay in RAM."""
import importlib.util
import json
from pathlib import Path
from http.server import ThreadingHTTPServer
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('exact_comparison', HERE.parent / 'hanja-g3-batch2-followup-2026-09-14/serve.py')
comparison = importlib.util.module_from_spec(spec)
spec.loader.exec_module(comparison)
comparison.HERE = HERE
data = json.loads((HERE / 'sources.json').read_text())
comparison.BASE.QUEUE = {e['glyph']: {**e, 'candidate': 'Ja'} for e in data['videos']}
comparison.BASE.REVIEW = {e['glyph']: e for e in data['videos']}
comparison.DICT.SOURCES = {e['glyph']: e for e in data['dictionary']}
if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 51742), comparison.Handler)
    print('Exact-form comparison http://127.0.0.1:51742', flush=True)
    server.serve_forever()
