from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib,re
R=Path(__file__).resolve().parents[2]
FIX='docs/hanja-source-original-u85c7-hkcs-2026-10-26/fixtures.json'
b=(R/FIX).read_bytes();assert hashlib.sha256(b).hexdigest()=='fbb7b817d68a9c1a70064f8ab31b49237dbdfbc0ab69e33b6f77f5dd9aa0aed1'
f=json.loads(b)['hkcs_m85c7'];s=f['strokes'][17][0];prior=f['strokes'][16]
PURE='docs/hanja-source-original-u85c7-hkcs-2026-10-26/verify-initial-wide-strip-risks.py'
pb=(R/PURE).read_bytes();tree=ast.parse(pb.decode());ns={}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,(ast.Import,ast.ImportFrom,ast.FunctionDef))],type_ignores=[]),PURE,'exec'),ns)
polys,state,cross,enc=ns['polys'],ns['state'],ns['cross'],ns['enc']
P=polys(s['outline']);priorP=[p for z in prior for p in polys(z['outline'])]
a=[F(x) for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])]
assert len(a)==6 and s['revealWidth']==14
q0,q1,q2=tuple(a[:2]),tuple(a[2:4]),tuple(a[4:])
W=(F(64),F(79));half=F(1,1000)
chosen=next(p for p in P if state(W,p)==1)
edgeMargins=[]
for x,y in zip(chosen,chosen[1:]+chosen[:1]):
 den=abs(y[0]-x[0])+abs(y[1]-x[1])
 assert den>0
 edgeMargins.append(abs(cross(x,y,W))/den)
assert min(edgeMargins)>half
corners=[(W[0]+i*half,W[1]+j*half) for i in [-1,1] for j in [-1,1]]
diskMargin=min(49-sum((c[k]-q0[k])**2 for k in [0,1]) for c in corners)
assert diskMargin>0
priorXMax=max(v[0] for p in priorP for v in p)
earlierP=[p for slot in f['strokes'][:16] for z in slot for p in polys(z['outline'])]
earlierMaxY=max(v[1] for p in earlierP for v in p)
assert earlierMaxY==F(729,10)
assert W[0]-half>priorXMax and W[1]-half>earlierMaxY
u=tuple(q1[j]-q0[j] for j in [0,1]);v=tuple(q2[j]-2*q1[j]+q0[j] for j in [0,1])
vv=sum(x*x for x in v);attempts=[]
for T,K in [(F(1,2),F(1,20)),(F(1),F(1,20)),(F(1,2),F(1,10)),(F(1),F(1,10))]:
 at=max(F(0),min(T,-sum(u[j]*v[j] for j in [0,1])/vv)) if vv else F(0)
 lam=sum((u[j]+at*v[j])**2 for j in [0,1])
 cr=u[0]*v[1]-u[1]*v[0]
 chord=sum((2*T*u[j]+T*T*v[j])**2 for j in [0,1])-49
 curvature=4*K*K*lam**3-cr*cr
 cos=1-(7*K)**2/2
 axes=[j for j in [0,1] if u[j]*(u[j]+T*v[j])>0]
 ok=chord>0 and curvature>0 and cos-7*K>0 and bool(axes)
 attempts.append(dict(T=T,K=K,ok=ok,chordSquaredMinus49=chord,curvatureMargin=curvature,cosMinusRK=cos-7*K,lambdaAt=at,lambdaMinimum=lam,cross=cr,strictAxes=axes))
assert attempts[0]['ok']
out=dict(schema='hanja-source-start-cap-18-conditions/v1',glyph='藇',pen=18,mask=1,fixture=dict(path=FIX,SHA256=hashlib.sha256(b).hexdigest()),purePredicates=dict(path=PURE,SHA256=hashlib.sha256(pb).hexdigest(),oldTargetLoopsExecuted=False),sourceSegment=s,priorPen=17,originalQ0=q0,width=14,radius=7,witness=dict(point=W,strictBoxHalfWidth=half,originalSubpath=P.index(chosen),minimumEdgeLInfinityMargin=min(edgeMargins),minimumRadiusSquaredMarginForBox=diskMargin,pen17MaximumX=priorXMax,minimumXGapFromPen17=W[0]-half-priorXMax,prefix1to16MaximumY=earlierMaxY,minimumYGapFromPrefix1to16=W[1]-half-earlierMaxY,allCompletedPrefix1to17Excluded=True,positiveAreaBox=4*half*half),fixedRoundStartCap=dict(pointInOriginalPAndRadius7StartDisk=True,outsideAllCompletedPrior17=True,p0HiddenVsAnyPositivePrefixStartRoundDisk='The fixed round start disk contains this positive-area box for every positive dash prefix. The witness box is absent at p0 when the target is hidden; the local visible extent therefore does not shrink to zero.',visibleDiameterLowerBound=2*half,notUAOrAAEquivalenceProof=True),initialGrowingCap=dict(method='Existing sufficient-condition arithmetic only; no full-Q coverage rerun',attempts=attempts,selected=attempts[0],T=F(1,2),K=F(1,20),initialArcMax=7),existingFullQ7CoverageReplayed=0,limits=['No-witness in the old t0-normal-section search was not a safety certificate. This witness lies in the start disk, not necessarily that exact normal section.','Pen17 alone has maximum x40; prefix1..16 has maximum y72.9. The witness box is to the right of pen17 and below prefix1..16 in source coordinates, so it is outside the entire completed prefix1..17.','Growing-cap sufficient conditions do not prove all-time original-P intersection connectivity, publisher micro-clock equivalence, DOM owner correctness, actual display approval or runtime registration.'],sourcePOrQOrWidthOrWeightChanged=False,engine=0,projection=0,sharedChanges=0,server=0,nativeApproval=False,runtimeApplied=False)
print(json.dumps(enc(out),ensure_ascii=False,separators=(',',':')))
