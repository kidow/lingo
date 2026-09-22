import sys
sys.dont_write_bytecode=True
import json,importlib.util,os
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
metadata=json.loads((HERE/'metadata.json').read_text())
engine=json.loads((HERE/'engine-proof.json').read_text())
spec=importlib.util.spec_from_file_location('review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
groups=[[0],[1],[3],[2],[4,5],[6],[7],[8]]
def outline(end=None):
 selected=groups if end is None else groups[:end]
 parts=['<svg viewBox="0 0 200 200"><g fill="#222">']
 for group in selected:
  for idx in group:
   for polygon in engine['groups'][idx]['polygons']:
    assert all(p['off']==0 for p in polygon)
    parts.append('<polygon points="'+' '.join(str(p['x'])+','+str(p['y']) for p in polygon)+'"/>')
 return ''.join(parts)+'</g></svg>'
r.ENTRIES=[{'glyph':'芭','id':'glyphwiki-u82ad-k-engine-outline','dictionaryStrokes':8,'dictionary':metadata['dictionary'],'viewBox':'0 0 200 200','strokes':[{'sourceGroups':g} for g in groups]}]
r.base.renderer.ENTRIES['芭']={'strokes':8,'dictionary':metadata['dictionary']}
r.candidate=lambda entry,end=None:outline(end)
code=(ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
handler=code[code.index('class Handler('):code.index("\nif __name__")].replace('Right KanjiVG','Right complete source-rendered outline (not a trajectory)').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','GlyphWiki contributors; source-derived polygons. Engine code is not embedded.')
exec(handler,r.__dict__)
print(json.dumps({'port':51896,'pid':os.getpid(),'groups':len(groups),'lastStrokePolygons':len(engine['groups'][-1]['polygons'])}),flush=True)
r.ThreadingHTTPServer(('127.0.0.1',51896),r.Handler).serve_forever()
