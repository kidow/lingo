#!/usr/bin/env python3
"""Hash-check Tomoe sources; keep domestic reference graphics in RAM."""
import sys
sys.dont_write_bytecode = True
import json, importlib.util
from pathlib import Path
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('tomoe_base', HERE.parent / 'hanja-goal-tomoe-batch18-2026-09-22' / 'serve.py')
base = importlib.util.module_from_spec(spec); spec.loader.exec_module(base)
base.METADATA = json.loads((HERE / 'metadata.json').read_text())
fetch_public = base.fetch_public
if __name__ == '__main__':
 spec = importlib.util.spec_from_file_location('review', HERE.parent / 'hanja-special2-alternatives-2026-09-21' / 'serve.py')
 r = importlib.util.module_from_spec(spec); spec.loader.exec_module(r)
 entries = fetch_public()
 for entry in entries:
  r.base.renderer.ENTRIES[entry['glyph']]={'strokes':entry['dictionaryStrokes'],'dictionary':entry['dictionary']}
  if entry['glyph']=='饐':
   order=[1,2,3,5,6,7,4,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
   entry['strokes']=[entry['strokes'][i-1] for i in order]
 r.ENTRIES=entries
 original=r.candidate
 def candidate(entry,end=None):
  rendered=original(entry,end)
  if entry['glyph']=='饐':
   rendered=rendered.replace('stroke-width="5"','stroke-width="2.6"').replace('stroke-width="4"','stroke-width="2.6"')
  return rendered
 r.candidate=candidate
 source=(HERE.parent/'hanja-special2-alternatives-2026-09-21/serve.py').read_text()
 handler=source[source.index('class Handler('):source.index("\nif __name__")]
 handler=handler.replace('Right KanjiVG','Right Tomoe').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','Tomoe project contributors, LGPL-2.1; source order corrected for 饐.')
 exec(handler,r.__dict__)
 port=int(sys.argv[1]) if len(sys.argv)>1 else 51854
 print(json.dumps({'port':port,'glyphs':[e['glyph'] for e in entries]},ensure_ascii=False),flush=True)
 r.ThreadingHTTPServer(('127.0.0.1',port),r.Handler).serve_forever()
