import sys
sys.dont_write_bytecode=True
import json,importlib.util,os
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
metadata=json.loads((HERE/'metadata.json').read_text())
engines=json.loads((HERE/'whole-engine-inventory.json').read_text())
spec=importlib.util.spec_from_file_location('review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'邈','id':name,'dictionaryStrokes':18,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'sourceGroups':[i]} for i in range(len(engine['groups']))]} for name,engine in engines.items()]
r.base.renderer.ENTRIES['邈']={'strokes':18,'dictionary':metadata['dictionary']}
def outline(entry,end=None):
 engine=engines[entry['id']]
 parts=['<svg viewBox="0 0 200 200"><g fill="#222">']
 for group in engine['groups'][:end]:
  for polygon in group['polygons']:
   assert all(p['off']==0 for p in polygon)
   parts.append('<polygon points="'+' '.join(str(p['x'])+','+str(p['y']) for p in polygon)+'"/>')
 return ''.join(parts)+'</g></svg>'
r.candidate=outline
code=(ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
handler=code[code.index('class Handler('):code.index("\nif __name__")].replace('Right KanjiVG','Right complete source-rendered outline (not a trajectory)').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','GlyphWiki contributors; source-derived polygons. Engine code is not embedded.')
exec(handler,r.__dict__)
print(json.dumps({'port':52767,'pid':os.getpid(),'variants':len(engines)}),flush=True)
r.ThreadingHTTPServer(('127.0.0.1',52767),r.Handler).serve_forever()
