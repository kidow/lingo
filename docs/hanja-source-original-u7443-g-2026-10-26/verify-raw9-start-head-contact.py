from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2];FULL='docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json';b=(R/FULL).read_bytes();assert hashlib.sha256(b).hexdigest()=='709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2';f=json.loads(b)
U='docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';ub=(R/U).read_bytes();assert hashlib.sha256(ub).hexdigest()=='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76';names={'vec','det','value','union_row','events'};nodes=[n for n in ast.parse(ub).body if isinstance(n,ast.FunctionDef)and n.name in names];assert {n.name for n in nodes}==names;exec(compile(ast.Module(body=nodes,type_ignores=[]),str(R/U),'exec'),globals())
def get(raw):return[[(F(str(v['x']/2)),F(str(v['y']/2)))for v in p]for p in f['groups'][raw-1]['polygons']]
INPUT_PINS={"docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json":"709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2","docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json":"060c2507167ccad9458a4e917117ca43f58578e626d783a95266c535e8700f66","docs/hanja-source-original-u7443-g-2026-10-26/source-projection.json":"6e369213624b447a4bfbab85f489d6ca8e8c61a79aa1c86b2067166aef1dbf9a","docs/hanja-source-original-u7443-g-2026-10-26/paint-and-compound-contacts-proof.json":"dde246efff50a5c08d9548f655deb082db7a178ed37f042784304d1d5f2fb5b7","docs/hanja-source-original-u7443-g-2026-10-26/curve-union-start-kernel-proof.json":"c464d8d4d9f2f25aada66344e8f613ddc25c2cc5715df67ddb6803627fd28bf8","docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py":"2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76"}
for name,pin in INPUT_PINS.items():assert hashlib.sha256((R/name).read_bytes()).hexdigest()==pin
P,H=get(9),get(7);A=(F(73),F(179,4));Q0=tuple(F(str(x/2))for x in f['trace'][8][0]['args'][:2]);delta=F(1,100)
def cross(a,b,p):return(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
def state(p,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  c=cross(a,b,p)
  if c==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1]):return 0
  if a[1]<=p[1]<b[1]and c>0:w+=1
  if b[1]<=p[1]<a[1]and c<0:w-=1
 return 1 if w else-1
assert state(A,P[0])==state(A,H[0])==1 and state(A,P[1])==-1
margin=[]
for poly in[P[0],H[0]]:
 for a,b in zip(poly,poly[1:]+poly[:1]):
  den=abs(b[0]-a[0])+abs(b[1]-a[1]);c=abs(cross(a,b,A));m=c/den if c else max(min(a[0],b[0])-A[0],A[0]-max(a[0],b[0]),min(a[1],b[1])-A[1],A[1]-max(a[1],b[1]));assert m>delta;margin.append(m)
corners=[]
for x in[A[0]-delta,A[0]+delta]:
 for y in[A[1]-delta,A[1]+delta]:
  W=(x,y);d2=sum((W[j]-Q0[j])**2 for j in[0,1]);assert d2<49 and state(W,P[0])==state(W,H[0])==1;corners.append({'point':W,'distanceSquaredToOriginalQ0':d2})
ys=events(P+H,min(v[1]for p in P+H for v in p),max(v[1]for p in P+H for v in p));area=F(0);positive=[]
for lo,hi in zip(ys,ys[1:]):
 mid=(lo+hi)/2
 for l1,r1 in union_row(P,mid):
  for l2,r2 in union_row(H,mid):
   left=max([l1,l2],key=lambda fn:value(fn,mid));right=min([r1,r2],key=lambda fn:value(fn,mid));w=value(right,mid)-value(left,mid)
   if w<=0:continue
   wl=value(right,lo)-value(left,lo);wh=value(right,hi)-value(left,hi);assert wl>=0 and wh>=0;part=(wl+wh)*(hi-lo)/2;assert part>0;area+=part;positive.append({'ySlab':[lo,hi],'area':part})
assert area>0
out={'raw':9,'completedPriorRaw':7,'candidateStartAnchor':A,'candidateIsOriginalQ0':False,'originalQ0':Q0,'anchorMinusOriginalQ0':[A[j]-Q0[j]for j in[0,1]],'candidateInOriginalStartDisk7':True,'sourceInitialBodyPIndex1Based':1,'sourceOtherTrianglePIndex1Based':2,'otherTriangleIsNearEndNotStart':True,'strictCommonBodyAndPriorBarBoxHalfWidth':delta,'minimumBoundaryLInfinityMargin':min(margin),'boxAreaLowerBound':4*delta*delta,'boxCorners':corners,'exactP9IntersectH7Area':area,'positiveAreaSlabs':positive,'candidateIsCentralKernelAnchor':False,'allTimeRectConnectivityApproved':False,'nativeStartOrClockApproved':False,'sourcePOrQOrWidthOrWeightChanged':False,'engine':0,'projection':0}
out.update({"schema":"hanja-source-start-head-prior-contact-candidate/v1","date":"2026-10-26","glyph":"瑃","root":"u7443-g","inputs":{"docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json":"709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2","docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json":"060c2507167ccad9458a4e917117ca43f58578e626d783a95266c535e8700f66","docs/hanja-source-original-u7443-g-2026-10-26/source-projection.json":"6e369213624b447a4bfbab85f489d6ca8e8c61a79aa1c86b2067166aef1dbf9a","docs/hanja-source-original-u7443-g-2026-10-26/paint-and-compound-contacts-proof.json":"dde246efff50a5c08d9548f655deb082db7a178ed37f042784304d1d5f2fb5b7","docs/hanja-source-original-u7443-g-2026-10-26/curve-union-start-kernel-proof.json":"c464d8d4d9f2f25aada66344e8f613ddc25c2cc5715df67ddb6803627fd28bf8","docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py":"2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76"},"logicalPen":9,"mask":1,"priorLogicalPen":7,"priorIsTwoPensEarlierNotSamePenMask":True,"marginInterpretation":{"certifiedPointLInfinityBoundaryAvoidanceRadius":"1/50","selectedBoxHalfWidth":"1/100","certifiedRemainingBoxBoundaryAvoidanceLowerBound":"1/100","pointMarginIsNotBoxMargin":True,"entireBoxInIndependentOriginalBodyPAndH7BarAndConvexR7":True},"candidateInGlobalStrictKernel":False,"globalStrictKernelOutsideOriginalStartDiskResultPreserved":True,"sourceOriginalPCount":25,"originalDirectionBasis":"ROOT original39 review reports original pen9 starts on thirdH and descends right. This geometric anchor candidate is not new timing/native approval.","futurePriorDOMRequired":{"completedLogicalStroke":7,"targetLogicalStroke":9,"sameOwner":True,"sameCommittedFrame":True,"exactOriginalH7Outline":True,"opaqueOriginalH7":True,"sourceFactoryDoesNotGuaranteeDOM":True},"authorRectClockNotOriginalQClock":True,"newPolicyApproved":False,"nativeApproval":False,"runtimeApplied":False})
assert min(margin)-delta==F(1,100)
def enc(x):
 if isinstance(x,F):return str(x)
 if isinstance(x,(list,tuple)):return[enc(v)for v in x]
 if isinstance(x,dict):return{k:enc(v)for k,v in x.items()}
 return x
print(json.dumps(enc(out)))
