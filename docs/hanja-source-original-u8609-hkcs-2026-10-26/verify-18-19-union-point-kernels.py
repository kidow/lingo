from pathlib import Path
from fractions import Fraction as F
import json,hashlib,re
R=Path(__file__).resolve().parents[2] if '__file__'in globals()else Path('/Users/kidow/Documents/dev/kidow/lingo')
FIXTURE='docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json';raw=(R/FIXTURE).read_bytes();assert hashlib.sha256(raw).hexdigest()=='35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6'
f=json.loads(raw)['hkcs_m8609']
def sub(a,b):return(a[0]-b[0],a[1]-b[1])
def det(a,b):return a[0]*b[1]-a[1]*b[0]
def cross(a,b,p):return det(sub(b,a),sub(p,a))
def area(p):return sum(det(a,b)for a,b in zip(p,p[1:]+p[:1]))/2
def parse(outline):
 out=[]
 for part in re.findall(r'M([^Z]+)Z',outline):
  v=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',part)];assert len(v)%2==0;out.append(list(zip(v[::2],v[1::2])))
 return out
def clip(poly,a,b,orient):
 out=[]
 for u,v in zip(poly,poly[1:]+poly[:1]):
  fu=orient*cross(a,b,u);fv=orient*cross(a,b,v)
  if fu>=0:out.append(u)
  if (fu<0<fv)or(fv<0<fu):
   t=fu/(fu-fv);out.append((u[0]+t*(v[0]-u[0]),u[1]+t*(v[1]-u[1])))
 clean=[]
 for p in out:
  if not clean or clean[-1]!=p:clean.append(p)
 if len(clean)>1 and clean[0]==clean[-1]:clean.pop()
 return clean
def state(p,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  c=cross(a,b,p)
  if c==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1]):return 0
  if a[1]<=p[1]<b[1]and c>0:w+=1
  if b[1]<=p[1]<a[1]and c<0:w-=1
 return 1 if w else -1
def union_boundary(P):
 E=[(a,b)for p in P for a,b in zip(p,p[1:]+p[:1])];cuts=[{F(0),F(1)}for e in E]
 for i,(a,b)in enumerate(E):
  v=sub(b,a)
  for j,(c,d)in enumerate(E):
   if j<=i:continue
   u=sub(d,c);den=det(v,u)
   if den:
    t=det(sub(c,a),u)/den;k=det(sub(c,a),v)/den
    if 0<=t<=1 and 0<=k<=1:cuts[i].add(t);cuts[j].add(k)
   elif det(sub(c,a),v)==0:
    axis=0 if v[0]else 1
    for x in[c,d]:
     t=(x[axis]-a[axis])/v[axis]
     if 0<=t<=1:cuts[i].add(t)
    axis=0 if u[0]else 1
    for x in[a,b]:
     t=(x[axis]-c[axis])/u[axis]
     if 0<=t<=1:cuts[j].add(t)
 boundary=set();pieces=0
 for (a,b),ts in zip(E,cuts):
  v=sub(b,a);ts=sorted(ts)
  for l,h in zip(ts,ts[1:]):
   A=tuple(a[k]+l*v[k]for k in[0,1]);B=tuple(a[k]+h*v[k]for k in[0,1]);m=tuple((A[k]+B[k])/2 for k in[0,1]);n=(-v[1],v[0]);eps=F(1)
   for c,d in E:
    c0=cross(c,d,m);cn=det(sub(d,c),n)
    if c0 and cn:eps=min(eps,abs(c0/cn)/2)
   left=tuple(m[k]+eps*n[k]for k in[0,1]);right=tuple(m[k]-eps*n[k]for k in[0,1]);ls=[state(left,p)for p in P];rs=[state(right,p)for p in P];assert 0 not in ls+rs
   lin=1 in ls;rin=1 in rs;pieces+=1
   if lin and not rin:boundary.add((A,B))
   elif rin and not lin:boundary.add((B,A))
   else:assert lin and rin
 nexts={};incoming={}
 for a,b in boundary:nexts.setdefault(a,[]).append(b);incoming.setdefault(b,[]).append(a)
 assert set(nexts)==set(incoming);assert all(len(x)==1 for x in nexts.values())and all(len(x)==1 for x in incoming.values())
 remaining=set(nexts);cycles=[]
 while remaining:
  start=next(iter(remaining));p=start;cycle=[]
  while p in remaining:
   remaining.remove(p);cycle.append(p);p=nexts[p][0]
  assert p==start;cycles.append(cycle)
 return boundary,cycles,pieces
def hit(a,b,c,d):
 A,B,C,D=cross(a,b,c),cross(a,b,d),cross(c,d,a),cross(c,d,b)
 if A*B<0 and C*D<0:return True
 return (A==0 and min(a[0],b[0])<=c[0]<=max(a[0],b[0])and min(a[1],b[1])<=c[1]<=max(a[1],b[1]))or(B==0 and min(a[0],b[0])<=d[0]<=max(a[0],b[0])and min(a[1],b[1])<=d[1]<=max(a[1],b[1]))or(C==0 and min(c[0],d[0])<=a[0]<=max(c[0],d[0])and min(c[1],d[1])<=a[1]<=max(c[1],d[1]))or(D==0 and min(c[0],d[0])<=b[0]<=max(c[0],d[0])and min(c[1],d[1])<=b[1]<=max(c[1],d[1]))
results=[]
for pen in[18,19]:
 s=f['strokes'][pen-1][1];prior=f['strokes'][pen-1][0];P=parse(s['outline']);H=parse(prior['outline'])[0];assert len(P)==2 and len(H)==4
 signed=[area(p)for p in P];assert all(a>0 for a in signed)or all(a<0 for a in signed)
 boundary,cycles,pieces=union_boundary(P);assert len(cycles)==1 and area(cycles[0])>0
 kernel=[(F(0),F(0)),(F(100),F(0)),(F(100),F(100)),(F(0),F(100))];constraints=[(a,b,1)for a,b in sorted(boundary)];ho=1 if area(H)>0 else-1;constraints.extend((a,b,ho)for a,b in zip(H,H[1:]+H[:1]))
 for a,b,o in constraints:
  kernel=clip(kernel,a,b,o)
  if not kernel:break
 result=dict(pen=pen,mask=2,sourceP=2,sourceSignedAreas=signed,exactExteriorBoundary=sorted(boundary),exteriorSegments=len(boundary),splitOriginalEdgePieces=pieces,boundaryCycles=len(cycles),singleCycle=cycles[0],commonPriorAndUnionKernel=kernel)
 if kernel and area(kernel)>0:
  centroid=tuple(sum(p[k]for p in kernel)/len(kernel)for k in[0,1]);anchor=tuple(F(round(v*100),100)for v in centroid)
  if min(o*cross(a,b,anchor)for a,b,o in constraints)<=0:anchor=centroid
  margins=[o*cross(a,b,anchor)for a,b,o in constraints];assert min(margins)>0
  delta=min(m/(abs(b[0]-a[0])+abs(b[1]-a[1]))for m,(a,b,o)in zip(margins,constraints))/2
  xmin,ymin,xmax,ymax=[F(str(v))for v in s['bounds']];ax,ay=anchor;ext=[ax-xmin,xmax-ax,ay-ymin,ymax-ay];assert min(ext)>delta>0
  hx0=min(x for x,y in H);hx1=max(x for x,y in H);hy0=min(y for x,y in H);hy1=max(y for x,y in H)
  hidden=min((ax-hx0)/ext[0],(hx1-ax)/ext[1],(ay-hy0)/ext[2],(hy1-ay)/ext[3]);assert hidden>0
  for x in[ax-delta,ax+delta]:
   for y in[ay-delta,ay+delta]:assert all(o*cross(a,b,(x,y))>0 for a,b,o in constraints)and any(state((x,y),p)==1 for p in P)
  result.update(strictKernel=True,anchor=anchor,strictBoxHalfWidth=delta,allEdgeMargins=margins,sourceBoundExtentsLeftRightUpDown=ext,initialAllWindowInsidePriorProgressUpper=hidden,initialDiameterSquaredUpperBoundCoefficient=(xmax-xmin)**2+(ymax-ymin)**2,positiveSourceInkAreaLowerBoundCoefficient=4*delta*delta)
 else:result.update(strictKernel=False)
 results.append(result)

for result in results:
 P=parse(f['strokes'][result['pen']-1][1]['outline']);checks=[]
 for p in P:
  count=0;n=len(p)
  for i in range(n):
   for j in range(i+1,n):
    if j in[(i+1)%n,(i-1)%n]:continue
    count+=1;assert not hit(p[i],p[(i+1)%n],p[j],p[(j+1)%n])
  checks.append({'vertices':n,'nonadjacentPairs':count,'simple':True,'signedArea':area(p)})
 result['simpleOriginalPolygons']=checks
 result['sameNonzeroOrientation']=all(area(p)>0 for p in P)or all(area(p)<0 for p in P)
 assert result['sameNonzeroOrientation']

from itertools import combinations
row=results[1]
E=[(tuple(map(F,a)),tuple(map(F,b)))for a,b in row['exactExteriorBoundary']]
def det(a,b):return a[0]*b[1]-a[1]*b[0]
C=[(-(b[1]-a[1]),b[0]-a[0],(b[1]-a[1])*a[0]-(b[0]-a[0])*a[1])for a,b in E]
answer=None
for ids in combinations(range(len(C)),3):
 ns=[C[i][:2]for i in ids];w=[det(ns[1],ns[2]),det(ns[2],ns[0]),det(ns[0],ns[1])]
 if all(x<=0 for x in w):w=[-x for x in w]
 if min(w)<0 or max(w)==0:continue
 sums=[sum(w[j]*C[ids[j]][k]for j in range(3))for k in range(3)]
 if sums[0]==sums[1]==0 and sums[2]<0:
  answer={'edges':[row['exactExteriorBoundary'][i]for i in ids],'indices':list(ids),'coefficients':[[str(z)for z in C[i]]for i in ids],'nonnegativeMultipliers':[str(x)for x in w],'sum':[str(x)for x in sums],'conclusion':'No point satisfies these three source-union exterior closed halfplanes; common strict kernel sufficient family is unavailable, not an impossibility of other animation families.'};break
assert answer

row['sourceUnionKernelEmptyCertificate']=answer
assert results[0]['strictKernel'] and not results[1]['strictKernel']
INPUTS={FIXTURE:'35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6','lib/hanja-stroke-start-caps-u8609-hkcs.ts':'de9bdab530cc74ecf98ac21776ee8f604d7538ad47ea7e075bff6fa7330dad50'}
for path,sha in INPUTS.items():assert hashlib.sha256((R/path).read_bytes()).hexdigest()==sha
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
print(json.dumps(enc({'schema':'hanja-source-union-point-kernel-conditions/v1','date':'2026-10-26','glyph':'蘉','inputs':INPUTS,'geometrySHA256':'36c6d68c80e42dd733c2a293a9cbf7f4dd5e72f15d1e9fd5c4109b4253ab19b2','results':results,'engine':0,'projection':0,'server':0,'sourcePOrQOrWidthOrWeightChanged':False,'sharedModuleChanged':False,'nativeApproval':False,'runtimeApplied':False}),ensure_ascii=False))
