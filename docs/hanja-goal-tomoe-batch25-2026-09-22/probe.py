import sys,importlib.util,json,re,math
from pathlib import Path
sys.dont_write_bytecode=True
root=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('base',root/'docs/hanja-goal-tomoe-batch18-2026-09-22/serve.py')
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
base.METADATA=json.loads((Path(__file__).parent/'metadata.json').read_text())
entries=base.fetch_public()
def pts(path):
 n=list(map(float,re.findall(r'-?\d+(?:\.\d+)?',path)))
 return list(zip(n[::2],n[1::2]))
def pd(p,a,b):
 x,y=b[0]-a[0],b[1]-a[1];v=x*x+y*y
 t=max(0,min(1,((p[0]-a[0])*x+(p[1]-a[1])*y)/v)) if v else 0
 return math.hypot(p[0]-a[0]-t*x,p[1]-a[1]-t*y)
def pointline(p,line):return min(pd(p,a,b) for a,b in zip(line,line[1:]))
def endpoint(e,s,which,target):
 lines=[pts(v['path']) for v in e['strokes']]
 return pointline(lines[s-1][0 if which=='start' else -1],lines[target-1])

out={}
for e in entries:
 if e['glyph']=='敝':
  out[e['glyph']]={'requiredStart11To9':endpoint(e,11,'start',9),'requiredStart11To8':endpoint(e,11,'start',8),'forbiddenEnd7To4':endpoint(e,7,'end',4),'forbiddenStart7To5':endpoint(e,7,'start',5),'forbiddenStart6To5':endpoint(e,6,'start',5)}
 else:
  out[e['glyph']]={'requiredEnd7To5':endpoint(e,7,'end',5),'forbiddenEnd6To5':endpoint(e,6,'end',5),'forbiddenStart3To1':endpoint(e,3,'start',1),'requiredStart21To17':endpoint(e,21,'start',17),'forbiddenStart21To18':endpoint(e,21,'start',18)}
print(json.dumps(out,ensure_ascii=False))
