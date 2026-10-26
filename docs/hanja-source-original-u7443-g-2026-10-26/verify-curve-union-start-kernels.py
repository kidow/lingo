from pathlib import Path
from fractions import Fraction as F
import json,hashlib
R=Path(__file__).resolve().parents[2]
b=(R/'docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json').read_bytes();assert hashlib.sha256(b).hexdigest()=='709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2';f=json.loads(b)
INPUT_PINS={"docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json":"709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2","docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json":"060c2507167ccad9458a4e917117ca43f58578e626d783a95266c535e8700f66","docs/hanja-source-original-u7443-g-2026-10-26/source-projection.json":"6e369213624b447a4bfbab85f489d6ca8e8c61a79aa1c86b2067166aef1dbf9a","docs/hanja-source-original-u7443-g-2026-10-26/paint-and-compound-contacts-proof.json":"dde246efff50a5c08d9548f655deb082db7a178ed37f042784304d1d5f2fb5b7","docs/hanja-source-original-u7443-g-2026-10-26/q7-initial-risk-proof.json":"7fa53092992515c532156cffc55049bef688fe7f79411013d100de4780ff2dd6"}
for name,expected in INPUT_PINS.items():assert hashlib.sha256((R/name).read_bytes()).hexdigest()==expected
norm=[F(str(v[k]/2))for g in f['groups']for p in g['polygons']for v in p for k in['x','y']]+[F(str(v/2))for raw in[4,8,9]for v in f['trace'][raw-1][0]['args'][:6]];assert len(norm)==308 and hashlib.sha256(json.dumps([str(v)for v in norm],separators=(',',':')).encode()).hexdigest()=='028f914dca91f90a312adf5f08c00e2052219156fcb08b9cd8b0c8f166649ce9'
def audit(raw):
 P=[[(F(str(v['x']/2)),F(str(v['y']/2)))for v in p]for p in f['groups'][raw-1]['polygons']];flat=[v for p in P for v in p];s={'bounds':[min(x for x,y in flat),min(y for x,y in flat),max(x for x,y in flat),max(y for x,y in flat)]}
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

 outdegree={};indegree={}
 for a,b in boundary:outdegree[a]=outdegree.get(a,0)+1;indegree[b]=indegree.get(b,0)+1
 regular=set(outdegree)==set(indegree)and all(v==1 for v in outdegree.values())and all(v==1 for v in indegree.values())
 q0=tuple(F(str(x/2))for x in f['trace'][raw-1][0]['args'][:2]);areaK=area(kernel)if kernel else F(0);minD=None;nearest=None;startAnchor=None;startMargin=None
 if kernel:
  inside=all(cross(a,b,q0)>=0 for a,b in boundary)
  choices=[]
  if inside:choices.append((F(0),q0))
  for a,b in zip(kernel,kernel[1:]+kernel[:1]):
   v=sub(b,a);nn=sum(x*x for x in v)
   if nn==0:continue
   t=max(F(0),min(F(1),sum((q0[j]-a[j])*v[j]for j in[0,1])/nn));point=tuple(a[j]+t*v[j]for j in[0,1]);choices.append((sum((point[j]-q0[j])**2 for j in[0,1]),point))
  if choices:minD,nearest=min(choices)
  if areaK>0 and minD is not None and minD<49:
   center=tuple(sum(p[j]for p in kernel)/len(kernel)for j in[0,1]);t=F(1,2)
   for unused in range(128):
    A=tuple((1-t)*nearest[j]+t*center[j]for j in[0,1]);margins=[cross(a,b,A)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in boundary]
    if min(margins)>0 and sum((A[j]-q0[j])**2 for j in[0,1])<49:assert any(state(A,p)==1 for p in P);startAnchor=A;startMargin=min(margins)/2;break
    t/=2
   assert startAnchor is not None
 q0KernelMargins=[]
 for a,b in zip(kernel,kernel[1:]+kernel[:1]):
  den=abs(b[0]-a[0])+abs(b[1]-a[1])
  if den:q0KernelMargins.append(cross(a,b,q0)/den)
 q0StrictMargin=min(q0KernelMargins)if q0KernelMargins else None
 return{'raw':raw,'P':len(P),'boundaryEdges':len(boundary),'regularBoundaryGraph':regular,'strictUnionKernelPositiveArea':areaK>0,'kernelArea':areaK,'kernelVertices':kernel,'sourceQ0':q0,'Q0InsideOriginalUnion':any(state(q0,p)==1 for p in P),'Q0OnOriginalUnionBoundary':any(state(q0,p)==0 for p in P),'kernelMinDistanceSquaredToQ0':minD,'kernelIntersectsOpenOriginalStartDisk7':areaK>0 and minD is not None and minD<49,'strictStartRegionAnchorCandidate':startAnchor,'strictStartRegionBoxHalfWidthCandidate':startMargin,'Q0StrictKernelMarginLInfinity':q0StrictMargin,'Q0IsStrictKernelAnchorCandidate':q0StrictMargin is not None and q0StrictMargin>0,'originalStartOrMicroClockApproved':False,'nativeApproval':False}
def enc(x):
 if isinstance(x,F):return str(x)
 if isinstance(x,(list,tuple)):return[enc(v)for v in x]
 if isinstance(x,dict):return{k:enc(v)for k,v in x.items()}
 return x
out={"schema":"hanja-source-curve-union-start-kernels/v1","date":"2026-10-26","glyph":"瑃","root":"u7443-g","inputs":{"docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json":"709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2","docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json":"060c2507167ccad9458a4e917117ca43f58578e626d783a95266c535e8700f66","docs/hanja-source-original-u7443-g-2026-10-26/source-projection.json":"6e369213624b447a4bfbab85f489d6ca8e8c61a79aa1c86b2067166aef1dbf9a","docs/hanja-source-original-u7443-g-2026-10-26/paint-and-compound-contacts-proof.json":"dde246efff50a5c08d9548f655deb082db7a178ed37f042784304d1d5f2fb5b7","docs/hanja-source-original-u7443-g-2026-10-26/q7-initial-risk-proof.json":"7fa53092992515c532156cffc55049bef688fe7f79411013d100de4780ff2dd6"},"coordinates":"Actual JS numeric original /2; normalized100 and startRadius7. The prior308-scalar JS-vs-analysis equality is reused, not rerun.","normalizedHalfFingerprint":"028f914dca91f90a312adf5f08c00e2052219156fcb08b9cd8b0c8f166649ce9","sourceOriginalP":25,"targetRaw":[4,8,9],"canonicalPAndQIdentity":{"canonicalCurvesMatched":[4,8,9],"originalPCounts":[3,3,2],"allPAndQHalfValuesEqual":True},"results":[],"method":["Retain exact nonzero independent original-P union exterior edges after splitting all original segment intersections. Local winding classification determines interior side; no source polygon is trimmed.","Intersect oriented exterior halfplanes for the source union visibility kernel. Strict positive area is only a sufficient point-window family condition.","Compute exact minimum squared distance from sourceQ0 to the convex kernel by segment projection. Positive-area kernel with distance strictly below49 has a strict start-disk intersection.","raw4 sourceQ0 itself is in the strict kernel; kernel-polygon L-infinity edge margin61/4100 was evaluated from the already computed exact kernel. The central candidate is not selected as a product anchor."],"interpretation":{"raw4":"Positive strict kernel and originalQ0 in strict interior; point-window family candidate. New progress clock and native start approval remain absent.","raw8":"Exterior halfplane intersection empty. Strict-union-kernel point-window family unavailable; finite-event rect or other source-bound family is not excluded.","raw9":"Positive kernel is outside the original startdisk7. Its central anchor is not an eligible substitute for the source start. Existing finite-event rect family is a later candidate."},"limits":["No point-clock/guide-clock identity or original microtime equivalence is claimed.","No new renderer/policy/runtime registration or native animation approval.","SourceP/triangle ornaments/Q/width14/weight preserved. Existing Q7 and initial-risk proofs are not rerun."],"sourcePOrQOrWidthOrWeightChanged":False,"engine":0,"projection":0,"previousCoverageReplayed":0,"sharedChanges":0,"nativeApproval":False,"runtimeApplied":False}
out['results']=[audit(r)for r in[4,8,9]]
print(json.dumps(enc(out)))
