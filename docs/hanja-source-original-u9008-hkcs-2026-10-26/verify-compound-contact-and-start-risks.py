from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2]
PINS={"docs/hanja-actual-engine-capture-u9008-hkcs-2026-10-26/engine-whole-hkcs_m9008.json":"5c94337d91522ab21760d32fa40ea070984ef2621f8114fff78935fb0b2c8ce2","docs/hanja-actual-engine-capture-u9008-hkcs-2026-10-26/capture.json":"6afcb6fb448d79a32ac141b9f8e9d9de33daf72284c1f0f58e3618cf4e71c8b1","docs/hanja-source-alternative-u9008-hkcs-2026-10-26/sources.json":"966e792241d603fbde7bd3c2ec45615ce4e48d326b4294c34176942edc88de22","docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py":"2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76"}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
f=json.loads((R/'docs/hanja-actual-engine-capture-u9008-hkcs-2026-10-26/engine-whole-hkcs_m9008.json').read_bytes());assert len(f['groups'])==14 and sum(map(len,f['trace']))==15 and sum(len(g['polygons'])for g in f['groups'])==27
P=[[[tuple(F(str(v[k]))for k in['x','y'])for v in p]for p in g['polygons']]for g in f['groups']];assert all(v['off']==0 for g in f['groups']for po in g['polygons']for v in po)
U='docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';ub=(R/U).read_bytes();allow={'vec','det','value','union_row','events'};fn=[n for n in ast.parse(ub).body if isinstance(n,ast.FunctionDef)and n.name in allow];assert{n.name for n in fn}==allow;exec(compile(ast.Module(body=fn,type_ignores=[]),str(R/U),'exec'),globals())
def cross(a,b,p):return det(vec(b,a),vec(p,a))
def state(p,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  c=cross(a,b,p)
  if c==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1]):return 0
  if a[1]<=p[1]<b[1]and c>0:w+=1
  if b[1]<=p[1]<a[1]and c<0:w-=1
 return 1 if w else -1
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
results=[]
for ar,br,W in[(3,4,(F(48),F(104))),(5,6,(F(55),F(154)))]:
 A,B=P[ar-1],P[br-1];pts=[v for po in A+B for v in po];ys=events(A+B,min(v[1]for v in pts),max(v[1]for v in pts));area=F(0);slabs=[]
 for lo,hi in zip(ys,ys[1:]):
  m=(lo+hi)/2
  for a,b in union_row(A,m):
   for c,d in union_row(B,m):
    L=max([a,c],key=lambda x:value(x,m));H=min([b,d],key=lambda x:value(x,m))
    if value(H,m)<=value(L,m):continue
    z=(H[0]-L[0])*(hi*hi-lo*lo)/2+(H[1]-L[1])*(hi-lo);assert z>0;area+=z;slabs.append({'lo':lo,'hi':hi,'area':z})
 assert area>0
 ba=[min(v[0]for po in A for v in po),min(v[1]for po in A for v in po),max(v[0]for po in A for v in po),max(v[1]for po in A for v in po)]
 ac=f['trace'][ar-1][-1];bc=f['trace'][br-1][0];end=tuple(F(str(x))for x in(ac['args'][4:6]if ac['kind']=='cdDrawCurve'else ac['args'][2:4]));start=tuple(F(str(x))for x in bc['args'][:2]);delta=tuple(start[j]-end[j]for j in[0,1]);bp=next(po for po in B if state(W,po)==1);h=F(1,100)
 margin=min(abs(cross(a,b,W))/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in zip(bp,bp[1:]+bp[:1])if a!=b);assert h<margin
 corners=[(W[0]+sx*h,W[1]+sy*h)for sx in[-1,1]for sy in[-1,1]];assert all(state(c,bp)==1 and all(state(c,po)==-1 for po in A)and sum((c[j]-start[j])**2 for j in[0,1])<196 for c in corners)
 outsideByBounds=(W[0]+h<ba[0]or W[0]-h>ba[2]or W[1]+h<ba[1]or W[1]-h>ba[3]);assert outsideByBounds
 out={'rawPair':[ar,br],'contact':'positive-area-original-nonzero-fill-overlap','areaOriginal200':area,'areaNormalized100':area/4,'positiveSlabs':slabs,'firstEnd':end,'nextStart':start,'delta':delta,'guideExact':delta==(0,0),'gapSquaredOriginal200':sum(x*x for x in delta),'nextStartInFirstPStates':[state(start,po)for po in A],'nextStartInOwnPStates':[state(start,po)for po in B],'firstEndInNextPStates':[state(end,po)for po in B],'fixedRadius14StartDiskFutureInkWitness':{'W':W,'halfBox':h,'positiveArea':4*h*h,'headP1based':B.index(bp)+1,'strictHeadSupportingLineMargin':margin,'wholeBoxInsideStartDisk14':True,'wholeBoxStrictlyOutsideCompletedFirstPByBounds':True,'scope':'If a fixed radius7-normalized start cap displays at transition, positive future ink outside prior can appear immediately; not an actual native renderer verdict.'}}
 if br==4:
  N=(F(54),F(108));head=B[1];assert state(N,head)==1 and N[0]>ba[2];nm=min(abs(cross(a,b,N))/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in zip(head,head[1:]+head[:1])if a!=b);assert nm>0
  out['fixedButtNormalSectionRisk']={'point':N,'strictHeadMargin':nm,'outsidePriorByX':True,'normalToOriginalDownGuide':True,'distanceFromStart':F(6),'scope':'Finite horizontal initial reach may remain even when endpoint circles shrink; all-time guide strip intersection is not certified.'}
 else:
  v=(F(16),F(20));m=min(v[0]*(q[0]-start[0])+v[1]*(q[1]-start[1])for po in B for q in po);assert m==F(122,5)>0
  out['initialCubicNormalSection']={'originalStartDerivativeDirection':v,'minForwardDotOverAllOriginalVertices':m,'t0NormalLineIntersectsSourceP':False,'scope':'This excludes this precise t0 normal-line witness only, not later strip exposure, connectivity or clock mismatch.'}
 results.append(out)
out={'schema':'hanja-public-compound-static-contact-and-start-risk/v1','date':'2026-10-26','glyph':'逈','root':'hkcs_m9008','inputs':PINS,'results':results,'method':{'ASTAllowlist':sorted(allow),'oldUtilityTargetLoopsExecuted':0,'exactOriginalDecimalNonzeroFillUnion':True,'coordinateSpace':'original200;normalized100 distances/2 and areas/4','wholeBoxInSameHeadComponentBySupportingLineMargin':True},'limits':['HYPOTHESIS/static source conditions only; positive overlap does not justify logical merging, grouping, order or dynamic timing.','No forced guide join, coordinate edit, reversal, interpolation, trimming or new connector.','Fixed cap/strip risks are conditional source witnesses, not approved new policy or a fresh native observation.','The previous current-J7/400 contact result is a different input and was not recomputed or transferred.'],'originalQ_C_WidthWeightsCoordsRowsChanged':False,'engine':0,'projection':0,'privateRequests':0,'newNative':0,'runtimeApplied':False}
print(json.dumps(enc(out),separators=(',',':')))
