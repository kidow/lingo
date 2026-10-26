from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2]
PINS={"docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json":"a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87","docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-whole-u655d.json":"aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af","docs/hanja-source-original-u655d-2026-10-26/fixtures.json":"a120891aa1745a7ecf885b71b665396c6977f95c69021d83025a38523da2cbd6","docs/hanja-source-original-u655d-2026-10-26/source-projection.json":"25540ad408269f15b544896e28162e37ffd4232748198de95373c9a7abddfb9d","docs/hanja-source-original-u655d-2026-10-26/q7-initial-risk-proof.json":"564eccc7b899422d3cacee4a16aa8a51d2fb57532390d4e0e197b50814bb24ec","docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py":"95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396","docs/hanja-source-original-u655d-2026-10-26/mask-union-start-kernel-proof.json":"7e1f34c33298e906859acb6fbc5be535c2801941fc04f0e3839c4be0e680070a","docs/hanja-source-original-u655d-2026-10-26/verify-mask-union-start-kernels.py":"cbe9bde4ad8335a81529f1233306778e99ae5d444a32ece73533b9e68390ce6f","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py":"62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b","docs/hanja-source-original-u7443-g-2026-10-26/verify-raw9-point-rect.py":"4925401a247d15236789debce8eb467359569187a0bc99b761fb1921e8400cc3","docs/hanja-source-original-u655d-2026-10-26/4-11-point-rect-conditions-proof.json":"4803887af31298dfc03f136ee7e4adc7b700ae0f35428e00dab638e6275d976a"}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
proof=json.loads((R/'docs/hanja-source-original-u655d-2026-10-26/mask-union-start-kernel-proof.json').read_bytes());r=next(r for r in proof['results']if r['pen']==4)
assert r['raw']==6 and r['singleCCWOuterCycleVerified']and not r['strictUnionKernelPositiveArea']
f=json.loads((R/'docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json').read_bytes())
RP=[[(F(str(v['x']/2)),F(str(v['y']/2)))for v in p]for p in f['groups'][5]['polygons']]
EX='docs/hanja-source-original-u7443-g-2026-10-26/verify-raw9-point-rect.py';nodes=[n for n in ast.parse((R/EX).read_bytes()).body if isinstance(n,ast.FunctionDef)and n.name=='exterior'];assert len(nodes)==1;exec(compile(ast.Module(body=nodes,type_ignores=[]),str(R/EX),'exec'),globals())
boundary=exterior(RP[:4]);nxt={}
for a,b in boundary:assert a not in nxt;nxt[a]=b
start=min(nxt);v=start;P=[]
while v not in P:P.append(v);v=nxt[v]
assert v==start and len(P)==len(boundary)
E=list(zip(P,P[1:]+P[:1]));assert set(E)==boundary
s=json.loads((R/'docs/hanja-source-original-u655d-2026-10-26/fixtures.json').read_bytes())['u655d']['strokes'][3][1]
anchor=tuple(map(F,r['originalMaskStart']));ax,ay=anchor;assert anchor==(F(99,2),F(79,2))
bounds=list(map(lambda x:F(str(x)),s['bounds']));x0,y0,x1,y1=bounds;left=x0-ax;right=x1-ax;up=y0-ay;down=y1-ay
UTIL='docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py';ub=(R/UTIL).read_bytes();allowed={'cross','state','merge','closed_line','fv','topology','enc','equation'};fn=[n for n in ast.parse(ub).body if isinstance(n,ast.FunctionDef)and n.name in allowed];assert {n.name for n in fn}==allowed;exec(compile(ast.Module(body=fn,type_ignores=[]),str(R/UTIL),'exec'),globals())
assert state(anchor)==1
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
 signs.append({'interval':[l,u],'affineSignsConstantNonzero':True,'SHA256':hashlib.sha256(json.dumps(sg,separators=(',',':')).encode()).hexdigest()})
out={'schema':'hanja-source-start-rect-conditions/v1','date':'2026-10-26','glyph':'敝','logicalPen':4,'mask':2,'raw':6,'inputs':PINS,'anchor':anchor,'anchorIsOriginalQ0':True,'sourceBounds':bounds,'extents':[-left,right,-up,down],'sourceUnionExteriorReused':False,'exteriorEdges':len(E),'bodyOnlyOriginalP1based':[1,2,3,4],'events':events,'equations':len(equations),'alwaysCollinearEquations':always,'closed':closed,'open':opened,'signCertificates':signs,'bad':bad,'allStatesConnectedPositiveAndNoZeroTail':not bad and not always,'initialDiameterSquaredCoefficient':(x1-x0)**2+(y1-y0)**2,'nestedRectangles':True,'p0HiddenRequired':True,'p1DirectOriginalPRequired':True,'sourceKernelRecomputed':0,'oldCoverageReplayed':0,'engine':0,'projection':0,'sourceP_Q_WidthWeightChanged':False,'nativeApproval':False,'runtimeApplied':False,'limits':['Only the P1..4 first-L-centered nested rectangle phase is evaluated; P5 is delayed separately.','The author rect clock is not source Q arc timing or publisher microtime.','p0 hidden and p1 direct originalP are future display contracts; no renderer change or native approval.']}


T=RP[4];A=(F(89,2),F(88));area=sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(T,T[1:]+T[:1]))/2;sgn=1 if area>0 else-1
assert len(T)==4 and all(sgn*cross(T[i],T[(i+1)%4],T[(i+2)%4])>0 for i in range(4))
assert A[0]==T[0][0]==T[1][0] and T[1][1]<A[1]<T[0][1]
sharedA=(F(89,2),F(173,2));sharedB=(F(89,2),F(179,2))
assert any(all(cross(a,b,c)==0 and min(a[0],b[0])<=c[0]<=max(a[0],b[0])and min(a[1],b[1])<=c[1]<=max(a[1],b[1])for c in[sharedA,sharedB])for a,b in zip(RP[3],RP[3][1:]+RP[3][:1]))
assert {T[0],T[1]}=={sharedA,sharedB};assert abs(area)==F(45,4)
assert all(p[0]>=A[0]for po in RP[:4]for p in po)and all(p[0]<=A[0]for p in T)
# Convex T and A in T imply A+s(T-A) is nested and inside original T, s0->zero diameter.
# Shared edge maps to x=44.5,y=88+-1.5s, contained in the original P4 edge for every0<s<=1.
attach={'anchor':A,'anchorOnActualSharedP4P5Edge':True,'sharedOriginalEdge':[sharedA,sharedB],'sourceP5':T,'P5StrictConvex':True,'P5Area':abs(area),'sourceP5PaintPathChanged':False,'frontier':'clip=A+s*(originalP5-A),0<=s<=1','nestedInsideOriginalP5':True,'diameterSquaredCoefficient':max(sum((a[j]-b[j])**2 for j in[0,1])for a in T for b in T),'areaFormula':'45/4*s^2','sharedEdgeFormula':'x=89/2,88-3s/2<=y<=88+3s/2','sharedEdgeLengthFormula':'3s','positiveSConnectedAndPositiveArea':True,'touchesCompletedP4ForEveryPositiveS':True,'P4P5AreaOverlap':'0 (boundary-only attachment, not a strict-overlap frontier)','p0HiddenRequired':True,'p1DirectOriginalP5Required':True,'noBoundaryOnlyTailBeyondPositiveP5Closure':True,'originalLQUnchanged':True,'actualCompletedOpaqueP4SameOwnerFrameNotGuaranteed':True}
out['schema']='hanja-source-body-plus-attached-original-tail-conditions/v1';out['attachedOriginalP5']=attach;out['priorHLowerBoundReused']='p^2/8 in body phase; completed original body retains actual H contact in tail phase';out['bodyThenTailAuthorClockNotOriginalQClock']=True;out['phaseTransitionShapeIdentityRequired']='bodyComplete + tailHidden == complete original P1..4';out['allOriginalFivePExactlyAtFinal']=True;out['existingSingleRectCounterexamplePreserved']={'p':'47/53','proof':'docs/hanja-source-original-u655d-2026-10-26/4-11-point-rect-conditions-proof.json'};out['calculationExecutions']={'newBodyFinite':2,'tailConvexAttachmentSuccessful':1,'sharedEdgeEqualityPreparationFailures':3,'finalResultRetained':1,'oldFullP5FiniteReplayed':0};out['limits']=['Only a source-bound two-phase candidate is proved: original P1..4 rect, then original convex P5 attached frontier.','Boundary attachment is not positive-area P4/P5 overlap; no strict-overlap certificate is claimed.','Actual completed original P4 opacity/owner/frame and phase-transition DOM guards remain future requirements.','New author phase clock is not original LQ arc timing or publisher micro timing; native/registration unapproved.']
print(json.dumps(enc(out),separators=(',',':')))
