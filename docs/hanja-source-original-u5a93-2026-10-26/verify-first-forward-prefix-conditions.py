from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2]
PINS={"docs/hanja-goal-glyphwiki-batch1039-2026-10-13/engine-whole-u5a93.json":"689e2d502a5cf1bf337192a939dc0efad1f877c476e0d980bc404d9ddf5c25f8","docs/hanja-goal-glyphwiki-batch1039-2026-10-13/boundary-source-preparation.json":"7e044b948b0b8ea95ab403318b13b6eb30b397f09aea2150d161778d5d21a567","docs/hanja-goal-glyphwiki-batch1039-2026-10-13/boundary-native-review.json":"50ead7d1648942391779e794ab0c19d20d3a759d8b73771c4e8262a44452abe7","docs/hanja-official-media-compare-u5a93-2026-10-25/native-first1-supplemental-review.json":"8cad4a325f3f6bf5ae0545fd512f0746d042136e46c1ebfc63ac13abffd1c1bb","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py":"62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b","docs/hanja-source-original-u7443-g-2026-10-26/verify-raw9-point-rect.py":"4925401a247d15236789debce8eb467359569187a0bc99b761fb1921e8400cc3","docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py":"2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76"}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
f=json.loads((R/'docs/hanja-goal-glyphwiki-batch1039-2026-10-13/engine-whole-u5a93.json').read_bytes());RP=[[(F(str(v['x']/2)),F(str(v['y']/2)))for v in p]for g in f['groups'][:2]for p in g['polygons']];assert len(RP)==4 and all(v['off']==0 for g in f['groups'][:2]for po in g['polygons']for v in po)
EX='docs/hanja-source-original-u7443-g-2026-10-26/verify-raw9-point-rect.py';nodes=[n for n in ast.parse((R/EX).read_bytes()).body if isinstance(n,ast.FunctionDef)and n.name=='exterior'];assert len(nodes)==1;exec(compile(ast.Module(body=nodes,type_ignores=[]),str(R/EX),'exec'),globals())
boundary=exterior(RP);nxt={}
for a,b in boundary:assert a not in nxt;nxt[a]=b
start=min(nxt);v=start;P=[]
while v not in P:P.append(v);v=nxt[v]
assert v==start and len(P)==len(boundary);E=list(zip(P,P[1:]+P[:1]));assert set(E)==boundary
x0=min(p[0]for po in RP for p in po);x1=max(p[0]for po in RP for p in po);y0=min(p[1]for po in RP for p in po);y1=max(p[1]for po in RP for p in po)
UTIL='docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py';ub=(R/UTIL).read_bytes();allow={'cross','state','merge','closed_line','fv','topology','enc','equation'};fn=[n for n in ast.parse(ub).body if isinstance(n,ast.FunctionDef)and n.name in allow];assert {n.name for n in fn}==allow
for n in fn:
 if n.name=='topology':
  n.body=ast.parse('L=x0-1;U=x1+1;B=y0-1;T=y0+(y1-y0)*p').body+n.body[4:]
exec(compile(ast.fix_missing_locations(ast.Module(body=fn,type_ignores=[])),str(R/UTIL),'exec'),globals())
# Exact halfplane kernel of the preserved union exterior, separately from prefix topology.
kernel=[(x0-1,y0-1),(x1+1,y0-1),(x1+1,y1+1),(x0-1,y1+1)]
for a,b in E:
 out=[]
 for c,d in zip(kernel,kernel[1:]+kernel[:1]):
  u=cross(a,b,c);w=cross(a,b,d)
  if u>=0:out.append(c)
  if(u<0<w)or(w<0<u):out.append(tuple(c[j]+u/(u-w)*(d[j]-c[j])for j in[0,1]))
 kernel=[]
 for q in out:
  if not kernel or q!=kernel[-1]:kernel.append(q)
 if len(kernel)>1 and kernel[0]==kernel[-1]:kernel.pop()
 if not kernel:break
kernelArea=abs(sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(kernel,kernel[1:]+kernel[:1]))/2)if kernel else F(0)
q0=tuple(F(str(x/2))for x in f['trace'][0][0]['args'][:2]);startInside=state(q0)==1;startKernelMargin=min(cross(a,b,q0)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in E)
# Original raw0/raw1 independent nonzero-fill overlap, no guide-based contact inference.
U='docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';un=[n for n in ast.parse((R/U).read_bytes()).body if isinstance(n,ast.FunctionDef)and n.name in{'vec','det','value','union_row','events'}];exec(compile(ast.Module(body=un,type_ignores=[]),str(R/U),'exec'),globals())
ys=events(RP,y0,y1);contactArea=F(0)
for a,b in zip(ys,ys[1:]):
 m=(a+b)/2
 for l,r in union_row(RP[:2],m):
  for c,d in union_row(RP[2:],m):
   L=max([l,c],key=lambda z:value(z,m));H=min([r,d],key=lambda z:value(z,m))
   if value(H,m)>value(L,m):contactArea+=(H[0]-L[0])*(b*b-a*a)/2+(H[1]-L[1])*(b-a)
assert contactArea>0
completeEvents={F(0),F(1)};eventReasons={};equations=[];always=[]
def add(kind,i,label,c0,c1):
 if not(c0 or c1):always.append((kind,i,label));return
 equation(kind,i,label,c0,c1)
for i,(x,y)in enumerate(P):add('vertex-bottom',i,'down',y-y0,-(y1-y0))
for i,(a,b)in enumerate(E):
 for x in[x0-1,x1+1]:add('bottom-corner-edge',i,x,cross(a,b,(x,y0)),(b[0]-a[0])*(y1-y0))
eventsList=sorted(completeEvents);closed=[topology(p)for p in eventsList if p>0];opened=[topology((l+h)/2)for l,h in zip(eventsList,eventsList[1:])];bad=[r for r in closed+opened if not r['connected']or r['positiveAreaComponents']!=1 or r['boundaryOnly']]
signChecks=[]
for l,h in zip(eventsList,eventsList[1:]):
 m=(l+h)/2
 for _,_,_,c0,c1 in equations:assert(c0+c1*l)*(c0+c1*h)>=0 and c0+c1*m!=0
 signChecks.append([l,h])
minVertices=sorted(set(p for po in RP for p in po if p[1]==y0));assert len(minVertices)==1
V=minVertices[0];idx=P.index(V);neighbors=[P[idx-1],P[(idx+1)%len(P)]];assert all(n[1]>y0 for n in neighbors)
firstNextY=min(p[1]for po in RP for p in po if p[1]>y0);slopes=[(n[0]-V[0])/(n[1]-y0)for n in neighbors];initialPUpper=(firstNextY-y0)/(y1-y0);initialDiameterCoefficient=((max(slopes)-min(slopes))**2+1)*(y1-y0)**2
raw1FirstY=min(p[1]for po in RP[2:]for p in po);raw0FinalY=max(p[1]for po in RP[:2]for p in po);assert raw1FirstY<raw0FinalY
out={'schema':'hanja-original-union-forward-y-prefix-conditions/v1','date':'2026-10-26','glyph':'媓','inputs':PINS,'sourceRaw0based':[0,1],'originalP':4,'originalRaw0Guide':f['trace'][0][0]['args'],'originalRaw1Guide':f['trace'][1][0]['args'],'coordinateSpace':'actualJS scalar/2 serialized decimal rational,viewBox100','sourceBounds':[x0,y0,x1,y1],'originalFirstLStart':q0,'firstLStartInsideUnion':startInside,'unionExterior':P,'unionEdges':len(E),'regularSingleCCWUnion':True,'kernel':kernel,'kernelArea':kernelArea,'originalLStartKernelMargin':startKernelMargin,'sourceRaw0Raw1PositiveContactArea':contactArea,'prefix':'original union P intersect y<=y0+(y1-y0)*p,0<p<=1','rectOuterX':[x0-1,x1+1],'rectTop':y0-1,'events':eventsList,'equations':len(equations),'alwaysCollinear':always,'closed':closed,'open':opened,'bad':bad,'allPositiveStatesConnectedAreaAndNoZeroTail':not bad,'affineSignsConstantInEveryOpenInterval':signChecks,'initialMinimumYVertices':minVertices,'initialPrefixDiameterTendsToZero':True,'initialIncidentEdgesNeighbors':neighbors,'initialIncidentSlopes':slopes,'firstPositiveYSlabUpperProgress':initialPUpper,'initialDiameterSquaredUpperCoefficient':initialDiameterCoefficient,'raw1PFirstExposureProgress':(raw1FirstY-y0)/(y1-y0),'raw0PCompletionProgress':(raw0FinalY-y0)/(y1-y0),'initialReason':'A unique minimum-y vertex in a finite regular polygon union; all other vertices have strictly larger y. The first slab is bounded by two incident affine edges and its extent tends to0.','sourceGuideOrWidthOrWeightChanged':False,'originalTwoSourceMasksPreserved':True,'p0HiddenFutureContract':True,'p1FullOriginalFourPFutureContract':True,'authorPrefixClockNotOriginalGuideOrWeightClock':True,'nativeForwardDirectionApproved':False,'previousNativeOrMathReplayed':0,'engine':0,'projection':0,'runtimeApplied':False,'limits':['Positive original P contact is not source guide/clock correspondence.','This tests a monotone whole-P prefix only; the existing sequential source backtrack HOLD remains preserved.','No clock agreement, exact original mask-weight clock equivalence, native forwarding or registration approval.']}
print(json.dumps(enc(out),separators=(',',':')))
