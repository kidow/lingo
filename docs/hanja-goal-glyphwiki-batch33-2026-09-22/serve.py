#!/usr/bin/env python3
"""Compare 菖 source strokes without saving dictionary graphics."""
import sys
sys.dont_write_bytecode = True
import json, importlib.util, subprocess
from pathlib import Path
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
spec = importlib.util.spec_from_file_location('review', ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r = importlib.util.module_from_spec(spec); spec.loader.exec_module(r)
meta = json.loads((HERE/'metadata.json').read_text())[0]
approved = json.loads(subprocess.check_output(['node', str(HERE/'build.mjs')], cwd=ROOT))[0]
r.ENTRIES = [{'glyph':'菖','id':'glyphwiki-u83d6-k-grouped','dictionaryStrokes':12,
    'dictionary':meta['dictionary'],'viewBox':'0 0 100 100','strokeWidth':4,
    'strokes':[{'path':p} for p in approved['paths']]}]
r.base.renderer.ENTRIES['菖'] = {'strokes':12,'dictionary':meta['dictionary']}
original_candidate = r.candidate
def candidate(entry, end=None):
    return original_candidate(entry,end).replace('stroke-width="5"','stroke-width="4"')
r.candidate = candidate
code = (ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
handler = code[code.index('class Handler('):code.index("\nif __name__")]
handler = handler.replace('Right KanjiVG','Right GlyphWiki/KAGE').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','GlyphWiki contributors; custom permissive license.')
exec(handler,r.__dict__)
if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv)>1 else 51879
    print('RAM comparison server: '+str(port),flush=True)
    r.ThreadingHTTPServer(('127.0.0.1',port),r.Handler).serve_forever()
