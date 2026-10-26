from pathlib import Path
from fractions import Fraction as F
import ast, hashlib, json, re

R=Path(__file__).resolve().parents[2]
PINS={
 'docs/hanja-source-original-u5a93-2026-10-26/fixtures.json':'a7ad43dd32a18ac22628c77d942fc53ab26d3642bcabce108248a74babf79733',
 'docs/hanja-goal-glyphwiki-batch1039-2026-10-13/engine-whole-u5a93.json':'689e2d502a5cf1bf337192a939dc0efad1f877c476e0d980bc404d9ddf5c25f8',
 'docs/hanja-goal-glyphwiki-batch1039-2026-10-13/boundary-source-candidate.mjs':'02431a4c44f47fe4326cd3f60e7d276cfcdcec27b16f9576fda0a79e9f9b2cbb',
 'docs/hanja-source-original-u7443-g-2026-10-26/verify-raw9-point-rect.py':'4925401a247d15236789debce8eb467359569187a0bc99b761fb1921e8400cc3'
}
for file, expected in PINS.items():assert hashlib.sha256((R/file).read_bytes()).hexdigest()==expected
f=json.loads((R/next(iter(PINS))).read_text())['u5a93']
assert hashlib.sha256(json.dumps(f['strokes'],ensure_ascii=False,separators=(',',':')).encode()).hexdigest()=='79aea820e2f76cc4fa9bbe75a4f65fb75bb62c261060b1aa4e2e3bf1e3d71752'
util=R/'docs/hanja-source-original-u7443-g-2026-10-26/verify-raw9-point-rect.py'
function=next(n for n in ast.parse(util.read_text()).body if isinstance(n,ast.FunctionDef) and n.name=='exterior')
# Execute this exact nonzero exterior utility only, not the old target proof.
exec(compile(ast.Module(body=[function],type_ignores=[]),str(util),'exec'))

def area(p):return sum(a[0]*b[1]-a[1]*b[0] for a,b in zip(p,p[1:]+p[:1]))/2
def cross(a,b,p):return (b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
def polygons(outline):
 assert re.fullmatch(r'[MLZ0-9. e+\-]+',outline)
 result=[]
 for part in re.findall(r'M([^M]+)',outline):
  assert part.strip().endswith('Z')
  ns=re.findall(r'-?\d+(?:\.\d+)?',part)
  assert len(ns)%2==0
  result.append([(F(ns[i]),F(ns[i+1])) for i in range(0,len(ns),2)])
 return result
def clip(p,a,b):
 out=[]
 if not p:return out
 for u,v in zip(p,p[1:]+p[:1]):
  x,y=cross(a,b,u),cross(a,b,v)
  if x>=0:out.append(u)
  if (x<0 and y>0) or (x>0 and y<0):
   t=x/(x-y);out.append(tuple(u[k]+t*(v[k]-u[k]) for k in [0,1]))
 return list(dict.fromkeys(out))
def cycle(edges):
 nxt={}
 for a,b in edges:assert a not in nxt;nxt[a]=b
 start=min(nxt);p=[];q=start
 while q not in p:p.append(q);q=nxt[q]
 assert q==start and len(p)==len(edges) and area(p)>0
 return p
def strict_box_in_convex(poly,p,e):
 assert area(poly)>0
 assert all(cross(a,b,z)>=0 for a,b in zip(poly,poly[1:]+poly[:1]) for z in poly)
 return all(cross(a,b,(p[0]+sx*e,p[1]+sy*e))>0 for a,b in zip(poly,poly[1:]+poly[:1]) for sx in [-1,1] for sy in [-1,1])
def conditional_round_witness(poly,p,q0):
 e=F(1,100)
 assert strict_box_in_convex(poly,p,e)
 d=max((p[0]+sx*e-q0[0])**2+(p[1]+sy*e-q0[1])**2 for sx in [-1,1] for sy in [-1,1])
 assert 0<(p[0]-q0[0])**2+(p[1]-q0[1])**2 and d<49
 return {'point':p,'strictBoxHalf':e,'maxCornerDistanceSquaredFromOriginalQ0':d,'fixedRoundRadius':7,'positiveSourceInkAwayFromGuideStart':True,'conditionalOnly':True}
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return {k:enc(x) for k,x in v.items()}
 if isinstance(v,(list,tuple)):return [enc(x) for x in v]
 return v

result=[]
for pen in [2,4]:
 s=f['strokes'][pen-1][0];ps=polygons(s['outline'])
 assert len(f['strokes'][pen-1])==1 and all(area(p)>0 for p in ps)
 raw=f['sourceGroups'][pen-1]
 original=[[(F(str(v['x']))/2,F(str(v['y']))/2) for v in p] for i in raw for p in f['fullProof']['groups'][i]['polygons']]
 # The pinned original compiler keeps the first vertex and reverses only the
 # remaining vertices of negatively oriented polygons; it does not round them.
 expected=[p if area(p)>0 else [p[0],*reversed(p[1:])] for p in original]
 assert ps==expected
 E=exterior(ps);boundary=cycle(E);points=[q for p in ps for q in p]
 lo=[min(q[i] for q in points)-1 for i in [0,1]];hi=[max(q[i] for q in points)+1 for i in [0,1]]
 K=[(lo[0],lo[1]),(hi[0],lo[1]),(hi[0],hi[1]),(lo[0],hi[1])]
 for a,b in sorted(E):K=clip(K,a,b)
 ns=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])))
 assert len(ns)==6 and s['revealWidth']==14
 q0,q1,q2=[tuple(ns[i:i+2]) for i in [0,2,4]]
 violations=[{'edge':[a,b],'crossAtOriginalQ0':cross(a,b,q0)} for a,b in sorted(E) if cross(a,b,q0)<0]
 assert violations
 one={'pen':pen,'originalMaskCount':1,'originalPCount':len(ps),'sourceRawRows':raw,'originalCompiledPExactlyPreserved':True,'rawFull5SignedAreas':[area(p) for p in original],'existingCompilerWindingNormalized':True,'coordinatesRounded':False,'positiveSignedAreas':[area(p) for p in ps],'simpleExteriorEdges':len(boundary),'kernelVertices':K,'kernelArea':abs(area(K)) if K else F(0),'originalGuideStart':q0,'originalGuideStartInClosedKernel':False,'originalGuideStartViolations':violations}
 if pen==2:
  assert len(ps)==2 and len(E)==26 and K==[]
  one.update({'singleCommonPointWindowReusable':False,'reason':'Empty exact visibility kernel; do not force the existing one-anchor rectangle family.','fixedRoundStartWitnesses':[conditional_round_witness(ps[1],(F(37),F(30)),q0)]})
 else:
  assert len(ps)==3 and len(E)==28 and abs(area(K))==F(3256800763,4743552000)
  t=F(1,16);A=tuple((1-t)**2*q0[i]+2*(1-t)*t*q1[i]+t*t*q2[i] for i in [0,1])
  margins=[cross(a,b,A)/(abs(b[0]-a[0])+abs(b[1]-a[1])) for a,b in E]
  e=min(margins)/2
  assert e>0 and all(cross(a,b,(A[0]+sx*e,A[1]+sy*e))>0 for a,b in E for sx in [-1,1] for sy in [-1,1])
  one.update({'potentialStrictAnchor':{'point':A,'onUnchangedOriginalQuadraticAt':t,'strictKernelBoxHalf':e,'equalsOriginalGuideStart':False,'sourceMicroclockEquivalent':False},'singleCommonPointWindowGeometricallyPossible':True,'forwardApproval':False,'fixedRoundStartWitnesses':[conditional_round_witness(ps[1],(F('64.35'),F('8.7')),q0),conditional_round_witness(ps[2],(F(68),F(11)),q0)]})
 result.append(one)

out={'schema':'hanja-public-pen-kernel-conditions/v1','date':'2026-10-27','glyph':'媓','root':'u5a93','inputs':PINS,'utilityFunction':{'name':'exterior','astSHA256':hashlib.sha256(ast.dump(function,include_attributes=False).encode()).hexdigest(),'oldTargetProofExecuted':False},'method':'Exact rational original compiled positive nonzero-P union exterior, single-cycle check and oriented-halfplane visibility kernel. Coordinates exactly match full5/2 after the pre-existing winding-only normalization; no coordinate rounding.','results':result,'limits':['The pen2 empty kernel rejects only the common single-anchor visibility-kernel route; it does not prove all animation routes impossible.','The pen4 candidate lies at original quadratic parameter1/16, not Q0. It gives a strict geometric kernel point, not original head order, publisher microclock, or forward approval.','Conditional radius7 witnesses do not replace ROOT native observations and do not approve a new clipping policy.','No new connector, trim, reorder, source substitution, path interpolation, outline merge or source-guide edit.'],'sourceP_Q_WidthWeightsFlagsChanged':False,'newNative':0,'engine':0,'projection':0,'privateRequests':0,'runtimeApplied':False,'successfulVerifierExecutions':2,'artifactMaterializationIncluded':True,'failedSetupChecksBeforeSuccessfulRun':1}
print(json.dumps(enc(out),ensure_ascii=False,separators=(',',':')))
