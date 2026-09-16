#!/usr/bin/env python3
"""Re-use the RAM-only stage renderer with this single-character review data."""
import sys
sys.dont_write_bytecode = True
import importlib.util
import json
from http.server import ThreadingHTTPServer
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('xi_review_renderer', HERE.parent / 'hanja-g2-batch10-2026-09-16/serve.py')
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)
renderer.HERE = HERE
renderer.DATA = json.loads((HERE / 'originals.json').read_text())
renderer.ENTRIES = {e['glyph']: e for e in renderer.DATA['entries']}

if __name__ == '__main__':
    print('熙 review http://127.0.0.1:51746', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 51746), renderer.Handler).serve_forever()
