#!/usr/bin/env python3
"""Replay approved GlyphWiki geometry and held 庾 against RAM-only dictionary graphics."""
import sys
sys.dont_write_bytecode = True
import json, importlib.util, subprocess
from pathlib import Path
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
spec = importlib.util.spec_from_file_location('review', ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r = importlib.util.module_from_spec(spec); spec.loader.exec_module(r)
metadata = {e['glyph']: e for e in json.loads((HERE/'metadata.json').read_text())}
approved = json.loads(subprocess.check_output(['node', str(HERE/'build.mjs')], cwd=ROOT))
held = json.loads((HERE/'yu-candidate.json').read_text())
r.ENTRIES = [
    {'glyph':'芥','id':'glyphwiki-u82a5-k','viewBox':'0 0 100 100','strokeWidth':4,'strokes':[{'path':p} for p in approved[0]['paths']],**metadata['芥']},
    {'glyph':'庾','id':'glyphwiki-koseki-106330','viewBox':'0 0 100 100','strokeWidth':4,'strokes':[{'path':p} for p in held['paths']],**metadata['庾']},
]
for entry in r.ENTRIES:
    r.base.renderer.ENTRIES[entry['glyph']] = {'strokes':entry['dictionaryStrokes'],'dictionary':entry['dictionary']}
original_candidate = r.candidate
def candidate(entry, end=None):
    return original_candidate(entry,end).replace('stroke-width="5"','stroke-width="4"')
r.candidate = candidate
code = (ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
handler = code[code.index('class Handler('):code.index("\nif __name__")]
handler = handler.replace('Right KanjiVG','Right GlyphWiki/KAGE').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','GlyphWiki contributors; custom permissive license.')
exec(handler,r.__dict__)
if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv)>1 else 51860
    print('RAM comparison server: '+str(port),flush=True)
    r.ThreadingHTTPServer(('127.0.0.1',port),r.Handler).serve_forever()
