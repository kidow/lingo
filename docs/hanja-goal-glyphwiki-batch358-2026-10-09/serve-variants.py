import sys
sys.dont_write_bytecode=True
import json,importlib.util,os
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
metadata=json.loads((HERE/'metadata.json').read_text())
inventory=json.loads((HERE/'whole-engine-inventory.json').read_text())
spec=importlib.util.spec_from_file_location('review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
groups=[[0],[1,2],[3],[4],[5],[6,7],[8],[9,10],[11],[12],[13],[14],[15],[16],[17],[18],[19,20],[21],[22]]
def outline(entry,end=None):
 engine=next(v for v in inventory['variants'] if v['root']==entry['id'])
 selected=groups if end is None else groups[:end]
 parts=['<svg viewBox="0 0 200 200"><g fill="#222">']
 for group in selected:
  for idx in group:
   for polygon in engine['groups'][idx]['polygons']:
    assert all(p['off']==0 for p in polygon)
    parts.append('<polygon points="'+' '.join(str(p['x'])+','+str(p['y']) for p in polygon)+'"/>')
 return ''.join(parts)+'</g></svg>'
r.ENTRIES=[{'glyph':'孼','id':v['root'],'dictionaryStrokes':19,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'sourceGroups':g} for g in groups]} for v in inventory['variants']]
r.base.renderer.ENTRIES['孼']={'strokes':19,'dictionary':metadata['dictionary']}
r.candidate=outline
code=(ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
handler=code[code.index('class Handler('):code.index("\nif __name__")].replace('Right KanjiVG','Right complete source-rendered outline (not a trajectory)').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','GlyphWiki contributors; source-derived polygons. Engine code is not embedded.')
exec(handler,r.__dict__)
print(json.dumps({'port':52772,'pid':os.getpid(),'roots':[v['root'] for v in inventory['variants']]}),flush=True)
r.ThreadingHTTPServer(('127.0.0.1',52772),r.Handler).serve_forever()
