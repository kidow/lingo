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

e=next(e for e in entries if e['glyph']=='駸')
line=pts(e['strokes'][7]['path'])
print(json.dumps({'glyph':'駸','stroke8':{'start':line[0],'end':line[-1],'dx':line[-1][0]-line[0][0],'dy':line[-1][1]-line[0][1]},'start17To16':endpoint(e,17,'start',16),'start17To14':endpoint(e,17,'start',14)},ensure_ascii=False))
