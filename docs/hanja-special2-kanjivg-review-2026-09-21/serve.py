#!/usr/bin/env python3
"""Review reordered licensed curves against dictionary graphics kept in RAM."""
import sys
sys.dont_write_bytecode = True
import importlib.util
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('alternatives', HERE.parent / 'hanja-special2-alternatives-2026-09-21/serve.py')
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
proposals = json.loads((HERE / 'proposals.json').read_text())['entries']
originals = {entry['id']: entry for entry in base.ENTRIES}
base.ENTRIES = []
for proposal in proposals:
    original = originals[proposal['id']]
    order = proposal['dictionaryToCandidate']
    assert sorted(order) == list(range(1, len(original['strokes']) + 1))
    base.ENTRIES.append({**original, 'strokes': [original['strokes'][i - 1] for i in order]})

if __name__ == '__main__':
    base.ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv) > 1 else 51829), base.Handler).serve_forever()
