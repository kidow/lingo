from pathlib import Path
from fractions import Fraction as F
import json,hashlib
R=Path(__file__).resolve().parents[2]
INPUT_PINS={"docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json":"a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87","docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-whole-u655d.json":"aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af","docs/hanja-source-original-u655d-2026-10-26/fixtures.json":"a120891aa1745a7ecf885b71b665396c6977f95c69021d83025a38523da2cbd6","docs/hanja-source-original-u655d-2026-10-26/source-projection.json":"25540ad408269f15b544896e28162e37ffd4232748198de95373c9a7abddfb9d","docs/hanja-source-original-u655d-2026-10-26/q7-initial-risk-proof.json":"564eccc7b899422d3cacee4a16aa8a51d2fb57532390d4e0e197b50814bb24ec","docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py":"95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396"}
for name,expected in INPUT_PINS.items():assert hashlib.sha256((R/name).read_bytes()).hexdigest()==expected
f=json.loads((R/"docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json").read_bytes());body=json.loads((R/"docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-whole-u655d.json").read_bytes());assert set(body)=={'groups','trace','defaults'} and all(body[k]==f[k]for k in body)
fixture=json.loads((R/"docs/hanja-source-original-u655d-2026-10-26/fixtures.json").read_bytes())['u655d'];assert fixture['fullProof']==f
assert len(f['groups'])==len(f['trace'])==13 and sum(map(len,f['trace']))==14 and sum(len(g['polygons'])for g in f['groups'])==28
TARGETS=[[1,1,2],[2,1,3],[4,2,6],[6,1,8],[7,1,9],[8,1,10],[10,1,12],[11,1,13]]
for pen,mask,raw in TARGETS:
 start=f['trace'][raw-1][0]['args'][:2];guide=fixture['strokes'][pen-1][mask-1]['revealPath'];assert guide.startswith('M'+str(start[0]/2).removesuffix('.0')+' '+str(start[1]/2).removesuffix('.0'))
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
 zeroEdges=sum(a==b for p in P for a,b in zip(p,p[1:]+p[:1]));E=[(a,b)for p in P for a,b in zip(p,p[1:]+p[:1])if a!=b];cuts=[{F(0),F(1)}for e in E]
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
 q0KernelMargins=[]
 for a,b in zip(kernel,kernel[1:]+kernel[:1]):
  den=abs(b[0]-a[0])+abs(b[1]-a[1])
  if den:q0KernelMargins.append(cross(a,b,q0)/den)
 q0StrictMargin=min(q0KernelMargins)if q0KernelMargins else None
 cycles=[]
 if regular:
  nextVertex={a:b for a,b in boundary};unused=set(nextVertex)
  while unused:
   start=min(unused);v=start;cycle=[]
   while v in unused:
    unused.remove(v);cycle.append(v);v=nextVertex[v]
   assert v==start and len(cycle)>=3;cycles.append(cycle)
 single=regular and len(cycles)==1 and area(cycles[0])>0
 def clip(poly,a,b):
  out=[]
  for p,q in zip(poly,poly[1:]+poly[:1]):
   cp,cq=cross(a,b,p),cross(a,b,q)
   if cp>=0:out.append(p)
   if (cp<0<cq)or(cq<0<cp):
    t=cp/(cp-cq);out.append(tuple(p[k]+t*(q[k]-p[k])for k in[0,1]))
  return out
 def minDistance(poly):
  if not poly:return None,None
  if all(cross(a,b,q0)>=0 for a,b in zip(poly,poly[1:]+poly[:1])if a!=b):return F(0),q0
  choices=[]
  for a,b in zip(poly,poly[1:]+poly[:1]):
   v=sub(b,a);nn=sum(x*x for x in v)
   if nn==0:continue
   t=max(F(0),min(F(1),sum((q0[j]-a[j])*v[j]for j in[0,1])/nn));point=tuple(a[j]+t*v[j]for j in[0,1]);choices.append((sum((point[j]-q0[j])**2 for j in[0,1]),point))
  return min(choices)if choices else(None,None)
 common=None
 if raw==6:
  assert len(f['groups'][4]['polygons'])==1;H=[(F(str(v['x']/2)),F(str(v['y']/2)))for v in f['groups'][4]['polygons'][0]]
  if area(H)<0:H.reverse()
  assert all(cross(a,b,p)>=0 for a,b in zip(H,H[1:]+H[:1])for p in H)
  K=kernel
  for a,b in zip(H,H[1:]+H[:1]):K=clip(K,a,b)
  d,near=minDistance(K);ak=area(K)if K else F(0)
  common={'priorLogicalPen':4,'priorMask':1,'priorRaw':5,'priorOriginalH':H,'priorConvexVerified':True,'kernelIntersectPriorHVertices':K,'strictCommonArea':ak,'positiveArea':ak>0,'minimumDistanceSquaredToOriginalLStart':d,'nearestClosurePointOnly':near,'strictCommonRegionMeetsOpenStartDisk7':ak>0 and d is not None and d<49,'policyAnchorSelected':False}
 classification='union-boundary-not-single-cycle'if not single else'empty-or-no-positive-area-kernel'if areaK<=0 else'positive-kernel-outside-open-start-disk7'if minD is None or minD>=49 else'original-start-is-strict-kernel-point'if q0StrictMargin is not None and q0StrictMargin>0 else'strict-kernel-region-meets-open-start-disk7'
 return{'raw':raw,'P':len(P),'originalFirstCallKind':f['trace'][raw-1][0]['kind'],'sourceMaskSyntax':'MLQ'if raw==6 else'MQ','boundaryEdges':len(boundary),'boundarySegments':sorted(boundary),'splitEdgePieces':pieces,'ignoredZeroLengthEdges':zeroEdges,'regularBoundaryGraph':regular,'boundaryCycles':cycles,'singleCCWOuterCycleVerified':single,'classification':classification,'strictUnionKernelPositiveArea':areaK>0,'kernelArea':areaK,'kernelVertices':kernel,'originalMaskStart':q0,'originalMaskStartUsed':'first-original-L'if raw==6 else'original-MQ','raw6QRestarted':False,'startPointOriginalPIndicesStrict':[i+1 for i,p in enumerate(P)if state(q0,p)==1],'startPointOriginalPIndicesBoundary':[i+1 for i,p in enumerate(P)if state(q0,p)==0],'kernelMinDistanceSquaredToOriginalStart':minD,'nearestKernelClosurePointOnly':nearest,'strictKernelMeetsOpenOriginalStartDisk7':single and areaK>0 and minD is not None and minD<49,'Q0StrictKernelMarginLInfinity':q0StrictMargin,'Q0IsStrictKernelPoint':single and q0StrictMargin is not None and q0StrictMargin>0,'prior4m1CommonRegion':common,'selectedAnchor':None,'originalStartOrMicroClockApproved':False,'nativeApproval':False}
def enc(x):
 if isinstance(x,F):return str(x)
 if isinstance(x,(list,tuple)):return[enc(v)for v in x]
 if isinstance(x,dict):return{k:enc(v)for k,v in x.items()}
 return x
out={'schema':'hanja-source-mask-union-start-kernels/v1','date':'2026-10-26','glyph':'敝','root':'u655d','inputs':INPUT_PINS,'sourceCounts':{'raw':13,'calls':14,'P':28,'logicalPens':11,'masks':13,'targets':8},'sourceNormalizationEvidenceReused':{'path':"docs/hanja-source-original-u655d-2026-10-26/q7-initial-risk-proof.json",'scalars':574,'newNormalizationReplay':0},'method':['Split all original P edges at exact intersections, retain the exterior union boundary by rational winding side tests.','Require a regular directed boundary graph with one CCW cycle before using a union-kernel point-window sufficient condition.','Intersect all oriented union exterior halfplanes; compute exact nearest squared distance from the original mask start to the closed convex kernel. Positive-area kernel and strict distance below49 establish a nonempty strict region inside the open radius7 source-start disk.','No centroid or nearest point is selected as a policy anchor. Original-start eligibility is classified separately.','Raw6 includes all original five L+Q polygons as one MLQ mask, starts at the first L, never restarts at Q; intersect its kernel with the exact convex prior4m1 H separately.'],'results':[],'limits':['Classification only; a nonempty region does not approve an anchor, source-start shape, dynamic clock, original timing or native playback.','Empty kernel or no start-disk intersection rejects this sufficient family only; source-bound finite-event rect connectivity remains a separate investigation.','Nearest points lie in the closure and may be on the kernel boundary; they are diagnostic witnesses only and are never policy anchors.','Source P/Q/flags/width and calculated weight unchanged; prior Q7/initial results reused without re-executing them.'],'selectedPolicyAnchors':0,'sourceGeometryChanged':False,'engine':0,'projection':0,'previousCoverageReplayed':0,'sharedChanges':0,'nativeApproval':False,'runtimeApplied':False}
for pen,mask,raw in TARGETS:
 result=audit(raw);result.update(pen=pen,mask=mask);out['results'].append(result)
assert len(out['results'])==8
print(json.dumps(enc(out),ensure_ascii=False))
