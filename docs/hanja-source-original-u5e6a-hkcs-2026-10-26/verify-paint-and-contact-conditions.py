from pathlib import Path
from fractions import Fraction as F
import json,hashlib,ast
R=Path(__file__).resolve().parents[2]
P=R/'docs/hanja-actual-engine-capture-u5e6a-hkcs-2026-10-26/engine-whole-hkcs_m5e6a.json';b=P.read_bytes();assert hashlib.sha256(b).hexdigest()=='e8831644fbe62a6af83581d45c4024cf2c324732b731ada72372309ef62ccb11'
f=json.loads(b)
T=R/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';b=T.read_bytes();assert hashlib.sha256(b).hexdigest()=='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
for n in ast.parse(b.decode()).body:
 if isinstance(n,ast.FunctionDef)and n.name in {'vec','det','value','union_row','events'}:exec(compile(ast.Module(body=[n],type_ignores=[]),str(T),'exec'))
groups=[[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in g['polygons']]for g in f['groups']]
def positive(A,B):
 lo=max(min(y for p in A for x,y in p),min(y for p in B for x,y in p));hi=min(max(y for p in A for x,y in p),max(y for p in B for x,y in p))
 if lo>=hi:return dict(positiveArea=False,openSlabs=0,witness=None)
 es=events(A+B,lo,hi);count=0;witness=None
 for a,b in zip(es,es[1:]):
  y=(a+b)/2;aa=union_row(A,y);bb=union_row(B,y);count+=1
  for l,r in aa:
   for v,w in bb:
    left=max(value(l,y),value(v,y));right=min(value(r,y),value(w,y))
    if left<right and witness is None:witness=dict(y=str(y),x=str((left+right)/2),width=str(right-left),ySlab=[str(a),str(b)])
 return dict(positiveArea=witness is not None,openSlabs=count,witness=witness)
def sg(v):return '+'if v>0 else'-'if v<0 else'0'
def summed_row(ps,y):
 hits=[]
 for poly in ps:
  for a,b in zip(poly,poly[1:]+poly[:1]):
   if(a[1]<=y<b[1])or(b[1]<=y<a[1]):
    slope=(b[0]-a[0])/(b[1]-a[1]);fn=(slope,a[0]-slope*a[1]);hits.append((value(fn,y),1 if b[1]>a[1]else-1,fn))
 hits.sort(key=lambda v:v[0]);w=0;prev=None;k=0;out=[]
 while k<len(hits):
  x=hits[k][0];same=[]
  while k<len(hits)and hits[k][0]==x:same.append(hits[k]);k+=1
  fn=same[0][2];assert all(v[2]==fn for v in same)
  if prev is not None and w!=0 and prev[0]<x:out.append((prev[1],fn))
  w+=sum(v[1]for v in same);prev=(x,fn)
 assert w==0
 return out

ORIENT=[{"raw":0,"call":0,"signs":[1,1]},{"raw":1,"call":0,"signs":[1]},{"raw":2,"call":0,"signs":[1]},{"raw":3,"call":0,"signs":[1,1,-1]},{"raw":3,"call":1,"signs":[1,-1]},{"raw":4,"call":0,"signs":[1,1]},{"raw":5,"call":0,"signs":[1,1]},{"raw":6,"call":0,"signs":[1,1]},{"raw":7,"call":0,"signs":[1,1]},{"raw":8,"call":0,"signs":[1,1]},{"raw":9,"call":0,"signs":[1]},{"raw":10,"call":0,"signs":[1,1]},{"raw":11,"call":0,"signs":[1,1]},{"raw":12,"call":0,"signs":[1,1]},{"raw":13,"call":0,"signs":[1]},{"raw":14,"call":0,"signs":[1,1]},{"raw":14,"call":1,"signs":[1,-1]},{"raw":15,"call":0,"signs":[1]},{"raw":16,"call":0,"signs":[1]},{"raw":17,"call":0,"signs":[1,-1,1]},{"raw":18,"call":0,"signs":[1,1]}]
full=f;rows=[];different=[]
for item in ORIENT:
 raw,j=item['raw'],item['call'];polys=full['trace'][raw][j]['polygons'];assert len(polys)==len(item['signs'])
 ps=[[(F(str(v['x'])),F(str(v['y'])))for v in poly]for poly in polys]
 normalized=[p if sign>0 else[p[0],*reversed(p[1:])]for p,sign in zip(ps,item['signs'])]
 if len(ps)==1:rows.append({'raw':raw+1,'call':j+1,'singleP':True,'same':True});continue
 lo=min(y for p in ps for x,y in p);hi=max(y for p in ps for x,y in p);ys=events(ps,lo,hi);bad=None;cells=0
 for l,h in zip(ys,ys[1:]):
  y=(l+h)/2;ind=union_row(ps,y);joined=summed_row(normalized,y);ends=sorted({value(fn,y)for a,b in ind+joined for fn in[a,b]})
  for a,b in zip(ends,ends[1:]):
   x=(a+b)/2;I=any(value(l,y)<x<value(r,y)for l,r in ind);J=any(value(l,y)<x<value(r,y)for l,r in joined);cells+=1
   assert I or not J
   if I!=J:bad={'witness':[str(x),str(y)],'independent':I,'joined':J,'criticalY':[str(l),str(h)]};break
  if bad:break
 row={'raw':raw+1,'call':j+1,'polygons':len(ps),'criticalOpenSlabs':len(ys)-1,'testedCells':cells,'same':bad is None}
 if bad:row['difference']=bad;different.append([raw+1,j+1])
 rows.append(row)

assert len(rows)==21
contacts=[dict(raw=[a+1,b+1],**positive(groups[a],groups[b])) for a,b in [(2,3),(9,10)]]
seam=[dict(P=[a+1,b+1],**positive([groups[3][a]],[groups[3][b]]))for a in range(5)for b in range(a+1,5)]

def boundary_segments(A,B):
 out=[]
 for a,b in zip(A,A[1:]+A[:1]):
  r=vec(b,a)
  for c,d in zip(B,B[1:]+B[:1]):
   s=vec(d,c)
   if det(r,s)!=0 or det(vec(c,a),r)!=0:continue
   axis=0 if r[0]!=0 else 1
   if r[axis]==0:continue
   low=max(min(a[axis],b[axis]),min(c[axis],d[axis]));high=min(max(a[axis],b[axis]),max(c[axis],d[axis]))
   if low<high:
    pts=[tuple(a[j]+(v-a[axis])/r[axis]*r[j]for j in[0,1])for v in[low,high]]
    out.append([[str(v)for v in p]for p in pts])
 return out
for i,ts in enumerate(f['trace']):
 assert [p for t in ts for p in t['polygons']]==f['groups'][i]['polygons']
 assert all(v.get('off',0)==0 for p in f['groups'][i]['polygons']for v in p)
qj=[]
for a,b in [(2,3),(9,10)]:
 t=f['trace'][a][-1];u=f['trace'][b][0];n=6 if t['kind']=='cdDrawCurve'else 4
 end=t['args'][n-2:n];start=u['args'][:2];assert end==start
 qj.append(dict(raw=[a+1,b+1],source200=end,normalized100=[str(F(str(v))/2)for v in end],exact=True))
seamBoundaries=[dict(P=[a+1,b+1],sharedSegments=boundary_segments(groups[3][a],groups[3][b]),positiveArea=positive([groups[3][a]],[groups[3][b]])['positiveArea'])for a,b in[(0,2),(0,3),(3,4)]]
assert len(groups)==19 and sum(map(len,groups))==38 and sum(map(len,f['trace']))==21
print(json.dumps(dict(schema='hanja-source-paint-and-contact-preparation/v1',date='2026-10-26',glyph='幪',root='hkcs_m5e6a',rootVersion=1,source=dict(path=str(P.relative_to(R)),SHA256=hashlib.sha256(P.read_bytes()).hexdigest()),coordinates='normalized100 for contacts; original200 for paint equivalence',purePredicates=dict(path=str(T.relative_to(R)),SHA256=hashlib.sha256(T.read_bytes()).hexdigest(),oldTargetLoopsExecuted=False),originalRaw19=True,originalCalls21=True,originalPolygons38=True,allTracePolygonsMatchRawGroups=True,offZero=True,normalizerOrientationsFromActualJS=ORIENT,paintCalls=rows,differentRawCalls=different,independentAndJoinedEquivalent=not different,exactQEndpointPairs=qj,completePContacts=contacts,raw4InternalPositivePairs=seam,raw4BoundaryContacts=seamBoundaries,limits=['Closed filled-P geometry only; no logical grouping, source order, publisher direction, dynamic connectivity or runtime approval.','Collinear boundary contact with zero area is not positive-overlap evidence. No source gap at raw4 P1/P3 shared y63 edge; antialiasing seam is not proved or removed by this arithmetic.','Source P/Q/width and call boundaries unchanged; no new ink, source engine or projection.'],engine=0,projection=0,geometryChanged=False,nativeApproval=False,runtimeApplied=False),ensure_ascii=False))
