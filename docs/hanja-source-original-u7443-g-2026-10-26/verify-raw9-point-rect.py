from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2]
INPUT_PINS={"docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json":"709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2","docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json":"060c2507167ccad9458a4e917117ca43f58578e626d783a95266c535e8700f66","docs/hanja-source-original-u7443-g-2026-10-26/source-projection.json":"6e369213624b447a4bfbab85f489d6ca8e8c61a79aa1c86b2067166aef1dbf9a","docs/hanja-source-original-u7443-g-2026-10-26/paint-and-compound-contacts-proof.json":"dde246efff50a5c08d9548f655deb082db7a178ed37f042784304d1d5f2fb5b7","docs/hanja-source-original-u7443-g-2026-10-26/raw9-start-head-contact-proof.json":"ec675f3f61a96e538a9ef28d9670615186f838b214351a31f01d9afc2be02e70","docs/hanja-source-original-u7443-g-2026-10-26/curve-union-start-kernel-proof.json":"c464d8d4d9f2f25aada66344e8f613ddc25c2cc5715df67ddb6803627fd28bf8","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py":"62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b"}
for name,pin in INPUT_PINS.items():assert hashlib.sha256((R/name).read_bytes()).hexdigest()==pin
FULL='docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json';b=(R/FULL).read_bytes();assert hashlib.sha256(b).hexdigest()=='709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2';original=json.loads(b)
FP='docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json';fb=(R/FP).read_bytes();assert hashlib.sha256(fb).hexdigest()=='060c2507167ccad9458a4e917117ca43f58578e626d783a95266c535e8700f66';s=json.loads(fb)['u7443-g']['strokes'][8][0]
RP=[[(F(str(v['x']/2)),F(str(v['y']/2)))for v in p]for p in original['groups'][8]['polygons']]
def exterior(originalP):
 P=[p[:]for p in originalP]
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
 return boundary
boundary=exterior(RP);assert len(boundary)==23
nexts={}
for a,z in boundary:assert a not in nexts;nexts[a]=z
start=min(nexts);v=start;P=[]
while v not in P:P.append(v);v=nexts[v]
assert v==start and len(P)==len(boundary)==23
E=list(zip(P,P[1:]+P[:1]));assert set(E)==boundary
UTIL='docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py';ub=(R/UTIL).read_bytes();assert hashlib.sha256(ub).hexdigest()=='62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b'
allowed={'cross','state','merge','closed_line','fv','topology','enc','equation'};fn=[n for n in ast.parse(ub).body if isinstance(n,ast.FunctionDef)and n.name in allowed];assert {n.name for n in fn}==allowed;exec(compile(ast.Module(body=fn,type_ignores=[]),str(R/UTIL),'exec'),globals())
anchor=(F(73),F(179,4));ax,ay=anchor
HP='docs/hanja-source-original-u7443-g-2026-10-26/raw9-start-head-contact-proof.json';hb=(R/HP).read_bytes();assert hashlib.sha256(hb).hexdigest()=='ec675f3f61a96e538a9ef28d9670615186f838b214351a31f01d9afc2be02e70';headProof=json.loads(hb);assert list(anchor)==list(map(F,headProof['candidateStartAnchor']))
originalQ0=tuple(F(str(x/2))for x in original['trace'][8][0]['args'][:2]);assert list(originalQ0)==list(map(F,headProof['originalQ0'])) and [anchor[j]-originalQ0[j]for j in[0,1]]==list(map(F,headProof['anchorMinusOriginalQ0']))
bounds=list(map(lambda x:F(str(x)),s['bounds']));assert bounds==[F(1447,20),F(887,20),F(379,4),F(1379,20)];x0,y0,x1,y1=bounds;left=x0-ax;right=x1-ax;up=y0-ay;down=y1-ay
delta=F(headProof['strictCommonBodyAndPriorBarBoxHalfWidth']);assert delta==F(1,100) and F(headProof['minimumBoundaryLInfinityMargin'])==F(1,50)
assert min(-left,right,-up,down)>delta and state(anchor)==1
completeEvents={F(0),F(1)};eventReasons={};equations=[];always=[]
def addEquation(kind,index,label,c0,c1):
 if not(c0 or c1):always.append((kind,index,label));return
 equation(kind,index,label,c0,c1)
for i,v in enumerate(P):
 for axis,base,d,label in[(0,ax,left,'left'),(0,ax,right,'right'),(1,ay,up,'top'),(1,ay,down,'bottom')]:addEquation('vertex-side',i,label,v[axis]-base,-d)
for i,(a,z)in enumerate(E):
 for dx in[left,right]:
  for dy in[up,down]:addEquation('corner-edge',i,(dx,dy),cross(a,z,anchor),(z[0]-a[0])*dy-(z[1]-a[1])*dx)
events=sorted(completeEvents);closed=[topology(p)for p in events if p>0];opened=[topology((l+u)/2)for l,u in zip(events,events[1:])]
bad=[x for x in closed+opened if not x['connected']or x['positiveAreaComponents']!=1 or x['boundaryOnly']]
signs=[]
for l,u in zip(events,events[1:]):
 m=(l+u)/2;sg=[]
 for kind,index,label,c0,c1 in equations:
  assert(c0+c1*l)*(c0+c1*u)>=0 and c0+c1*m!=0;sg.append(1 if c0+c1*m>0 else-1)
 signs.append({'interval':[l,u],'allAffineOrientationsConstantAndNonzero':True,'signPatternSHA256':hashlib.sha256(json.dumps(sg,separators=(',',':')).encode()).hexdigest()})
out={'glyph':'瑃','raw':9,'anchor':anchor,'anchorIsOriginalQ0':False,'originalQ0':originalQ0,'anchorMinusOriginalQ0':[anchor[j]-originalQ0[j]for j in[0,1]],'headContactProof':{'path':HP,'SHA256':hashlib.sha256(hb).hexdigest()},'strictHeadBoxHalfWidth':delta,'commonBodyPriorStrictBoxReused':True,'priorRaw':7,'sourceBounds':bounds,'extents':[-left,right,-up,down],'unionExteriorCycle':P,'unionExteriorEdges':E,'exteriorEdges':23,'equations':len(equations),'alwaysCollinearEquations':always,'events':events,'closed':closed,'open':opened,'signCertificates':signs,'bad':bad,'allStatesConnectedPositiveAndNoZeroTail':not bad and not always,'p0HiddenContractRequired':True,'p1DirectSourcePContractRequired':True,'nestedRectangles':True,'initialDiameterSquaredCoefficient':(x1-x0)**2+(y1-y0)**2,'positiveCommonP9AndH7AreaLowerCoefficient':4*delta*delta,'positiveCommonPriorAreaLowerBound':'coefficient*p^2 for every0<p<=1','sameFrameOpaquePrior7DOMIsFutureRequirement':True,'nativeApproval':False,'sourcePOrQOrWidthOrWeightChanged':False,'engine':0,'projection':0}
assert min(-left,right,-up,down)==F(2,5)>delta and 4*delta*delta==F(1,2500)
out.update({"schema":"hanja-source-specific-head-prior-nested-rect-conditions/v1","date":"2026-10-26","root":"u7443-g","inputs":{"docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json":"709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2","docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json":"060c2507167ccad9458a4e917117ca43f58578e626d783a95266c535e8700f66","docs/hanja-source-original-u7443-g-2026-10-26/source-projection.json":"6e369213624b447a4bfbab85f489d6ca8e8c61a79aa1c86b2067166aef1dbf9a","docs/hanja-source-original-u7443-g-2026-10-26/paint-and-compound-contacts-proof.json":"dde246efff50a5c08d9548f655deb082db7a178ed37f042784304d1d5f2fb5b7","docs/hanja-source-original-u7443-g-2026-10-26/raw9-start-head-contact-proof.json":"ec675f3f61a96e538a9ef28d9670615186f838b214351a31f01d9afc2be02e70","docs/hanja-source-original-u7443-g-2026-10-26/curve-union-start-kernel-proof.json":"c464d8d4d9f2f25aada66344e8f613ddc25c2cc5715df67ddb6803627fd28bf8","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py":"62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b"},"sourceOriginalP":25,"targetOriginalP":2,"logicalPen":9,"mask":1,"priorLogicalStroke":7,"strictCommonP9AndH7BoxHalfWidth":"1/100","positiveCommonPriorAreaProof":{"fixedCommonBoxHalfWidth":"1/100","fixedBoxIsStrictlyInsideOriginalP9AndCompletedH7":True,"sourceHeadProofReused":True,"smallestRectExtent":"2/5","scaledBoxHalfWidth":"p/100","scaledBoxSubsetRectAndFixedCommonBox":True,"areaLowerCoefficient":"1/2500","formula":"area(P9 ∩ rect(p) ∩ H7) >= p^2/2500 for all0<p<=1","doesNotGuaranteeActualH7OpacityOrFrame":True},"futureDOMPrior":{"priorIsNonAdjacentCompletedStroke7":True,"targetStroke9Mask1":True,"exactOriginalH7Outline":True,"sameOwner":True,"sameCommittedFrame":True,"opacityAndFillOpacityOne":True,"opaqueRGBFillRequired":True,"sourceFactoryDoesNotGuaranteeDOM":True},"authorRectClockNotOriginalQOrPublisherMicroClock":True,"originalSourceQ0NotMoved":True,"kernelStartRegionMismatchPreserved":True,"analysisExteriorNotRenderInk":True,"preparationHistory":{"finiteEventCalculationExecutions":1,"preparationFailures":0,"raw8GeometryOrFiniteCalculationReplayed":0,"headContactAreaRecomputed":0,"sourceKernelRecomputed":0},"method":{"sharedFiniteFunctions":["closed_line","cross","enc","equation","fv","merge","state","topology"],"oldUtilityTargetLoopsExecuted":0,"allVertexSideAndCornerEdgeAffineRootsEnumerated":True,"allOpenIntervalOrientationsConstantNonzero":True,"sourceOriginalP2RemainUnchanged":True},"limits":["This certifies the stated A-centered source-bounds rectangle family only; it does not change the original Q0, Q controls, P, revealWidth14 or weight.","The common prior area lower bound is a source geometric fact; an actual nonadjacent completed opaque stroke7 DOM guard is a separate future requirement.","p0 hidden and p1 direct exact originalP are future display contracts, not installed renderer behavior.","The author rect clock is not source-Q arc timing or original publisher microtime."],"newPolicyApproved":False,"runtimeApplied":False})
print(json.dumps(enc(out)))
