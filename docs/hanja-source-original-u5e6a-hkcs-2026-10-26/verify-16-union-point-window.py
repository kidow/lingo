from fractions import Fraction as F
from pathlib import Path
import json,re,hashlib
r=Path(__file__).resolve().parents[2];FIX='docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json';fb=(r/FIX).read_bytes();assert hashlib.sha256(fb).hexdigest()=='9a4f42f0206be94e4905f2a177caef251dbce5f0d7073772a52a7d47f84eace8';f=json.loads(fb)['hkcs_m5e6a'];s=f['strokes'][15][0]
P=[]
for text in s['outline'].split('M')[1:]:
 a=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',text)];P.append(list(zip(a[::2],a[1::2])))
def sub(a,b):return(a[0]-b[0],a[1]-b[1])
def det(a,b):return a[0]*b[1]-a[1]*b[0]
def cross(a,b,p):return det(sub(b,a),sub(p,a))
def area(p):return sum(det(a,b)for a,b in zip(p,p[1:]+p[:1]))/2
for p in P:
 if area(p)<0:p.reverse()
def state(p,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  c=cross(a,b,p)
  if c==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1]):return 0
  if a[1]<=p[1]<b[1]and c>0:w+=1
  if b[1]<=p[1]<a[1]and c<0:w-=1
 return 1 if w else -1
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
x0,y0,x1,y1=map(lambda x:F(str(x)),s['bounds']);kernel=[(x0-1,y0-1),(x1+1,y0-1),(x1+1,y1+1),(x0-1,y1+1)]
for a,b in boundary:
 out=[]
 for p,q in zip(kernel,kernel[1:]+kernel[:1]):
  cp,cq=cross(a,b,p),cross(a,b,q)
  if cp>=0:out.append(p)
  if (cp<0<cq)or(cq<0<cp):
   t=cp/(cp-cq);out.append(tuple(p[k]+t*(q[k]-p[k])for k in[0,1]))
 kernel=out
 if not kernel:break
anchor=tuple(sum(p[k]for p in kernel)/len(kernel)for k in[0,1])if kernel else None
margins=[cross(a,b,anchor)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in boundary]if anchor else[]
delta=min(margins)/2 if margins else None
if anchor:
 assert any(state(anchor,p)==1 for p in P)
 if delta>0:
  for x in[anchor[0]-delta,anchor[0]+delta]:
   for y in[anchor[1]-delta,anchor[1]+delta]:assert all(cross(a,b,(x,y))>0 for a,b in boundary)
def enc(x):
 if isinstance(x,F):return str(x)
 if isinstance(x,(list,tuple)):return[enc(v)for v in x]
 if isinstance(x,dict):return{k:enc(v)for k,v in x.items()}
 return x
assert len(cycles)==1 and delta>0 and len(P)==3
assert all(state((F(87),F(55)),p)==-1 for p in P)
ax,ay=anchor;ext=[ax-x0,x1-ax,ay-y0,y1-ay];assert all(v>delta for v in ext)
for x in[ax-delta,ax+delta]:
 for y in[ay-delta,ay+delta]:assert any(state((x,y),p)==1 for p in P)
PAINT='docs/hanja-source-original-u5e6a-hkcs-2026-10-26/paint-and-contact-conditions-proof.json';pb=(r/PAINT).read_bytes();assert hashlib.sha256(pb).hexdigest()=='c3d052d3725ae13230cd6ab6449b5b5d36375c2c40a2d7eda103c06701446fa7';paint=json.loads(pb)
assert paint['independentAndJoinedEquivalent']and next(x for x in paint['paintCalls']if x['raw']==18 and x['call']==1)['same']
PROJ='docs/hanja-source-original-u5e6a-hkcs-2026-10-26/source-projection.json';pr=(r/PROJ).read_bytes();projection=json.loads(pr);assert projection['logicalRawOneBased'][15]==[18]and projection['sourceInkPathsNotRequiredBecauseExactPaintEquivalencePassed']
out={'schema':'hanja-source-union-kernel-point-window/v1','date':'2026-10-26','glyph':'幪','pen':16,'mask':1,
 'inputs':[{'path':FIX,'SHA256':hashlib.sha256(fb).hexdigest()},{'path':PAINT,'SHA256':hashlib.sha256(pb).hexdigest()},{'path':PROJ,'SHA256':hashlib.sha256(pr).hexdigest()}],
 'originalP':len(P),'sourceSignedAreas':[area(p)for p in P],'splitOriginalEdgePieces':pieces,'exactExteriorBoundary':sorted(boundary),'exteriorSegments':len(boundary),'boundaryCycles':len(cycles),'singleCycleVertices':cycles[0],
 'kernel':kernel,'kernelArea':area(kernel),'anchor':anchor,'strictKernelBoxHalfWidth':delta,'strictKernel':True,
 'originalSourceGuide':s['revealPath'],'originalQ0':[87,55],'originalQ0OutsideInk':True,'anchorIsNotSourceQ0':True,
 'rectangleExtentsLeftRightUpDown':ext,'originalBounds':[x0,y0,x1,y1],'initialDiameterSquaredUpperBoundCoefficient':(x1-x0)**2+(y1-y0)**2,
 'positiveInkAreaLowerBoundCoefficient':4*delta*delta,'originalOutlinePaintUnionEquivalenceReused':{'raw':18,'call':1,'same':True,'newReplay':0},
 'method':['Split every original straight edge at all exact intersections and collinear endpoints. Classify local union interior on both sides using rational line-distance bounds. Retain only oriented exterior pieces.','Exterior endpoint graph has exactly one incoming/outgoing edge at every vertex and one cycle; all original crossing events were split. The retained boundary is a simple positive union boundary.','Clip the source bounding rectangle by every oriented exterior halfplane. Positive kernel area, strict anchor margins and a strict L-infinity box are checked. No convexity is attributed to each original P.','For p in(0,1], intersect the unchanged original P3 union with the rectangle centered at this certified kernel anchor whose four source-bound extents are multiplied by p. Intersection with an anchor-containing convex rectangle remains star-shaped. The scaled strict kernel box supplies positive area at every p.','Nested rectangles preserve monotone original ink inclusion; both dimensions tend to zero. p0 must be hidden and p1 uses the exact original complete outline. Existing raw18 independent-P/joined-outline equality is reused.'],
 'candidateConditions':{'allPositivePConnected':True,'nestedOriginalPSubset':True,'p0HiddenRequired':True,'p1ExactlyOriginalOutline':True,'sourceQUnchanged':True,'authorAnchorDifferentFromSourceQ0':True},
 'limits':['Authored point-window clock and new anchor are not equivalent to source-Q traversal or publisher timing.','The whole original outline and original Q/width/weight remain unchanged. Fresh browser review of start, sweep and completion is still required.','No statement about raster antialiasing or all components of the previous growing-mask frame is made.'],
 'sourcePOrQOrWidthOrWeightChanged':False,'engine':0,'projection':0,'privateOriginalFetch':0,'sharedChanges':0,'server':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(enc(out),separators=(',',':')))
