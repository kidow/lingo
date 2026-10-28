import ast,json,re,hashlib
from pathlib import Path
from fractions import Fraction as F
B=Path(__file__).resolve().parents[2]
PINS={"docs/hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/fixtures-execution-draft.json":"b6889acd4fdf6234ae8ad4000d088057dd8fb3b1216cd1e71ad10c329e3c8d98","docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py":"945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea"}
for p,h in PINS.items():assert hashlib.sha256((B/p).read_bytes()).hexdigest()==h
u="docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py"
tree=ast.parse((B/u).read_text());exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)],type_ignores=[]),u,'exec'))
f=json.loads((B/"docs/hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/fixtures-execution-draft.json").read_text());assert len(f['strokes'])==25
def polys(s):
 out=[]
 for c in s.split('M')[1:]:
  assert c.strip().endswith('Z');ns=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?(?:e[-+]?\d+)?',c)];out.append(clean(list(zip(ns[::2],ns[1::2]))))
 return out
a,b=f['strokes'][11];prior,nexts=polys(a['outline']),polys(b['outline']);assert len(prior)==1 and len(nexts)==3;assert all(simple(p)for p in prior+nexts)
contacts=[]
for pi,p in enumerate(prior):
 for qi,q in enumerate(nexts):
  for t in ears(p):
   for v in ears(q):
    cell=clip(t,v);area=abs(area2(cell))/2
    if area:contacts.append((area,cell,pi+1,qi+1))
ar,c,pi,qi=max(contacts,key=lambda r:r[0]);seed=tuple(sum(p[i]for p in c)/len(c)for i in[0,1]);assert any(relation(seed,p)==1for p in prior)and any(relation(seed,p)==1for p in nexts)
xs={v[0]for p in nexts for v in p};es=[e for p in nexts for e in edges(p)]
for aa,bb in es:
 for cc,dd in es:
  x=crossingX(aa,bb,cc,dd)
  if x is not None:xs.add(x)
xs=sorted(xs);checks=sorted(set(xs+[(x+y)/2for x,y in zip(xs,xs[1:])]))
violations=[str(x)for x in checks if len(merge([i for p in nexts for i in vertical(p,x)]))!=1]
weightA=F(str(a['weight']));weightB=F(str(b['weight']));p=F(3,8);boundary=weightA/(weightA+weightB);local=(p-boundary)/(1-boundary);head=(F('49.945'),F(43));headOutsidePrior=all(relation(head,t)<0 for t in prior)
print(json.dumps(dict(shape=[25,sum(len(r)for r in f['strokes']),sum(s['outline'].count('M')for r in f['strokes']for s in r)],sourceRaw=[14,15],priorP=1,nextP=3,oldBoundary=str(boundary),oldBoundaryFloat=float(boundary),observedGlobal=float(p),observedActiveMask=2,observedNextLocal=float(local),priorCompletedAtObservation=True,sourceQStart100=list(map(str,head)),sourceQStartOutsidePrior=headOutsidePrior,positiveContactArea100=str(sum(r[0]for r in contacts)),maxPositiveCellArea100=str(ar),contactComponent=[pi,qi],strictSeed100=list(map(str,seed)),criticalX=len(xs),sliceChecks=len(checks),nextUnionXMonotone=not violations,violations=violations,nextBounds100=[str(min(v[i]for poly in nexts for v in poly))for i in[0,1]]+[str(max(v[i]for poly in nexts for v in poly))for i in[0,1]],nativeApproval=False,runtimeApplied=False)))
