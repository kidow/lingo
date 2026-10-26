from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2]
INPUT_PINS={"docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json":"709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2","docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json":"060c2507167ccad9458a4e917117ca43f58578e626d783a95266c535e8700f66","docs/hanja-source-original-u7443-g-2026-10-26/source-projection.json":"6e369213624b447a4bfbab85f489d6ca8e8c61a79aa1c86b2067166aef1dbf9a","docs/hanja-source-original-u7443-g-2026-10-26/paint-and-compound-contacts-proof.json":"dde246efff50a5c08d9548f655deb082db7a178ed37f042784304d1d5f2fb5b7","docs/hanja-source-original-u7443-g-2026-10-26/curve-union-start-kernel-proof.json":"c464d8d4d9f2f25aada66344e8f613ddc25c2cc5715df67ddb6803627fd28bf8","docs/hanja-source-original-u7443-g-2026-10-26/q7-initial-risk-proof.json":"7fa53092992515c532156cffc55049bef688fe7f79411013d100de4780ff2dd6","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py":"62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b"}
for name,pin in INPUT_PINS.items():assert hashlib.sha256((R/name).read_bytes()).hexdigest()==pin
FULL='docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json';b=(R/FULL).read_bytes();assert hashlib.sha256(b).hexdigest()=='709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2';original=json.loads(b)
FP='docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json';fb=(R/FP).read_bytes();assert hashlib.sha256(fb).hexdigest()=='060c2507167ccad9458a4e917117ca43f58578e626d783a95266c535e8700f66';s=json.loads(fb)['u7443-g']['strokes'][7][0]
RP=[[(F(str(v['x']/2)),F(str(v['y']/2)))for v in p]for p in original['groups'][7]['polygons']]
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
boundary=exterior(RP);assert len(boundary)==26
nexts={}
for a,z in boundary:assert a not in nexts;nexts[a]=z
start=min(nexts);v=start;P=[]
while v not in P:P.append(v);v=nexts[v]
assert v==start and len(P)==len(boundary)==26
E=list(zip(P,P[1:]+P[:1]));assert set(E)==boundary
UTIL='docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py';ub=(R/UTIL).read_bytes();assert hashlib.sha256(ub).hexdigest()=='62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b'
allowed={'cross','state','merge','closed_line','fv','topology','enc','equation'};fn=[n for n in ast.parse(ub).body if isinstance(n,ast.FunctionDef)and n.name in allowed];assert {n.name for n in fn}==allowed;exec(compile(ast.Module(body=fn,type_ignores=[]),str(R/UTIL),'exec'),globals())
anchor=tuple(F(str(x/2))for x in original['trace'][7][0]['args'][:2]);assert anchor==(F(129,2),F(687,100));ax,ay=anchor
bounds=list(map(lambda x:F(str(x)),s['bounds']));assert bounds==[F(701,20),F(121,20),F(689,10),F(352,5)];x0,y0,x1,y1=bounds;left=x0-ax;right=x1-ax;up=y0-ay;down=y1-ay
head=RP[1][:];assert len(head)==3
headArea=sum(a[0]*z[1]-a[1]*z[0]for a,z in zip(head,head[1:]+head[:1]))/2;assert headArea!=0
if headArea<0:head.reverse() # Analysis-only winding orientation; same original nonzero filled triangle.
margins=[cross(a,z,anchor)/(abs(z[0]-a[0])+abs(z[1]-a[1]))for a,z in zip(head,head[1:]+head[:1])];assert min(margins)>0;delta=min(margins)/2
for x in[ax-delta,ax+delta]:
 for y in[ay-delta,ay+delta]:assert all(cross(a,z,(x,y))>0 for a,z in zip(head,head[1:]+head[:1]))
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
out={'glyph':'瑃','raw':8,'anchor':anchor,'anchorIsOriginalQ0':True,'strictHeadBoxHalfWidth':delta,'headMargins':margins,'sourceBounds':bounds,'extents':[-left,right,-up,down],'unionExteriorCycle':P,'unionExteriorEdges':E,'exteriorEdges':26,'equations':len(equations),'alwaysCollinearEquations':always,'events':events,'closed':closed,'open':opened,'signCertificates':signs,'bad':bad,'allStatesConnectedPositiveAndNoZeroTail':not bad and not always,'p0HiddenContractRequired':True,'p1DirectSourcePContractRequired':True,'nestedRectangles':True,'initialDiameterSquaredCoefficient':(x1-x0)**2+(y1-y0)**2,'positiveAreaLowerCoefficient':4*delta*delta,'nativeApproval':False,'sourcePOrQOrWidthOrWeightChanged':False,'engine':0,'projection':0}
out.update({"schema":"hanja-source-specific-Q0-nested-rect-conditions/v1","date":"2026-10-26","root":"u7443-g","sourceOriginalP":25,"targetOriginalP":3,"logicalPen":8,"mask":1,"inputs":{"docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json":"709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2","docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json":"060c2507167ccad9458a4e917117ca43f58578e626d783a95266c535e8700f66","docs/hanja-source-original-u7443-g-2026-10-26/source-projection.json":"6e369213624b447a4bfbab85f489d6ca8e8c61a79aa1c86b2067166aef1dbf9a","docs/hanja-source-original-u7443-g-2026-10-26/paint-and-compound-contacts-proof.json":"dde246efff50a5c08d9548f655deb082db7a178ed37f042784304d1d5f2fb5b7","docs/hanja-source-original-u7443-g-2026-10-26/curve-union-start-kernel-proof.json":"c464d8d4d9f2f25aada66344e8f613ddc25c2cc5715df67ddb6803627fd28bf8","docs/hanja-source-original-u7443-g-2026-10-26/q7-initial-risk-proof.json":"7fa53092992515c532156cffc55049bef688fe7f79411013d100de4780ff2dd6","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py":"62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b"},"analysisExteriorNotRenderInk":True,"normalizedHalfFingerprint":"028f914dca91f90a312adf5f08c00e2052219156fcb08b9cd8b0c8f166649ce9","preparationHistory":{"headPositiveWindingAssumptionFailureBeforeAnyFiniteEvents":1,"analysisOnlyHeadOrientationCorrectedSameFilledTriangle":True,"finiteEventCalculationExecutions":1,"finiteEventCalculationPasses":1,"sourceKernelRecomputed":0},"method":{"sharedFiniteFunctions":["closed_line","cross","enc","equation","fv","merge","state","topology"],"oldUtilityTargetLoopsExecuted":0,"sourceExteriorSingleCycle":True,"allOriginalBoundaryVertexAndRectCornerAffineRootsEnumerated":True,"allOpenIntervalOrientationsConstantNonzero":True,"criticalClosedSectionsAndOpenSlabsExactlyCovered":True,"sourcePRemainsOriginalIndependentNonzeroUnion":True},"authorClockNotPublisherOrSourceQClock":True,"p0AndP1AreFutureDisplayContracts":True,"sourceGuideWidth14AndWeightPreserved":True,"policyOrRendererApproved":False,"runtimeApplied":False,"limits":["The source-head halfplane analysis uses an oriented copy only; original source P coordinates/order/winding/raw/Q are not edited.","Only this Q0-centered two-axis source-bounds rectangle family is certified; kernel-empty does not rule out all clipping methods.","p0 must hide the target and p1 must display exact original sourceP; this proof does not install either behavior.","Point-rectangle progress is an author clock; original guide arc/microtime equivalence and native playback approval remain absent."]})
print(json.dumps(enc(out)))
