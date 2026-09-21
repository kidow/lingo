#!/usr/bin/env python3
"""Reuse the verified RAM-only Tomoe loader with this batch's metadata."""
import sys
sys.dont_write_bytecode = True
import json, importlib.util
from pathlib import Path
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('tomoe_base', HERE.parent / 'hanja-goal-tomoe-batch18-2026-09-22/serve.py')
base = importlib.util.module_from_spec(spec); spec.loader.exec_module(base)
base.METADATA = json.loads((HERE / 'metadata.json').read_text())
fetch_public = base.fetch_public
if __name__ == '__main__': base.main()
