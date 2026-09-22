import sys
sys.dont_write_bytecode=True
import json,importlib.util,os
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
source=json.loads((HERE/'sources.json').read_text())
metadata=json.loads((HERE/'metadata.json').read_text())
paths=[]
def point(p): return ' '.join(str(round(v,6)).rstrip('0').rstrip('.') if '.' in str(round(v,6)) else str(round(v,6)) for v in p)
def expand(name,t=(1,1,0,0)):
 for row in source['records'][name]['data'].split('$'):
  f=row.split(':'); typ=int(f[0])
  if typ==99:
   x0,y0,x1,y1=map(float,f[3:7]);assert f[1:3]==['0','0']
   expand(f[7],(t[0]*(x1-x0)/200,t[1]*(y1-y0)/200,t[0]*x0+t[2],t[1]*y0+t[3]))
  else:
   assert typ in (1,2,7)
   nums=list(map(float,f[3:]));pts=[((nums[i]*t[0]+t[2])/2,(nums[i+1]*t[1]+t[3])/2) for i in range(0,len(nums),2)]
   paths.append('M '+point(pts[0])+(' L '+point(pts[1])+' Q '+' '.join(map(point,pts[2:])) if typ==7 else (' L ' if typ==1 else ' Q ')+' '.join(map(point,pts[1:]))))
expand(source['root'])
assert len(paths)==16
assert paths[6].split(' L ')[1]==paths[7].split(' Q ')[0].removeprefix('M ')
assert paths[13].split(' L ')[1]==paths[14].split(' L ')[0].removeprefix('M ')
paths=paths[:6]+[paths[6]+' Q '+paths[7].split(' Q ')[1]]+paths[8:13]+[paths[13]+' L '+paths[14].split(' L ')[1]]+[paths[15]]
paths[2],paths[3]=paths[3],paths[2]
spec=importlib.util.spec_from_file_location('review',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.ENTRIES=[{'glyph':'蓉','id':'glyphwiki-u84c9-k-width3','dictionaryStrokes':14,'dictionary':metadata['dictionary'],'viewBox':'0 0 100 100','strokes':[{'path':p}for p in paths]}]
r.base.renderer.ENTRIES['蓉']={'strokes':14,'dictionary':metadata['dictionary']}
original=r.candidate
def candidate(entry,end=None):return original(entry,end).replace('stroke-width="5"','stroke-width="3"').replace('stroke-width="4"','stroke-width="3"')
r.candidate=candidate
code=(ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
handler=code[code.index('class Handler('):code.index("\nif __name__")].replace('Right KanjiVG','Right source-declared corner (candidate)').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.','GlyphWiki contributors; custom permissive license. Candidate for full domestic review.')
exec(handler,r.__dict__)
print(json.dumps({'port':51894,'pid':os.getpid(),'primitives':len(paths),'boundaryPaths':paths[4:6]}),flush=True)
r.ThreadingHTTPServer(('127.0.0.1',51894),r.Handler).serve_forever()
