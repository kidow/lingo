#!/usr/bin/env python3
"""Pinned direction comparison; proprietary videos and SVGs stay in RAM."""
import importlib.util
import json
from pathlib import Path
from http.server import ThreadingHTTPServer

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('direction_comparison', HERE.parent / 'hanja-g3-batch2-followup-2026-09-14/serve.py')
comparison = importlib.util.module_from_spec(spec)
spec.loader.exec_module(comparison)
comparison.HERE = HERE
scope = json.loads((HERE / 'scope.json').read_text())
queue = json.loads((HERE / 'queue.json').read_text())
comparison.BASE.QUEUE = {r['glyph']: r for r in queue['entries']}
comparison.BASE.REVIEW = comparison.BASE.QUEUE
comparison.DICT.SOURCES = {r['glyph']: r for r in json.loads((HERE / 'dictionary.json').read_text())['records']}

if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 51741), comparison.Handler)
    print('Direction comparison: http://127.0.0.1:51741', flush=True)
    server.serve_forever()
