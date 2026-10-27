from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re
R=Path(__file__).resolve().parents[2]
FIXTURE='docs/hanja-source-original-u8587-local-components-2026-10-27/fixtures-draft.json'
METHOD='docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py'
PATH='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py'
PINS={FIXTURE:'da117bf26e5d70e342e5ab5ae44767e002d663f80da72c7b123b1a1522707fd5',METHOD:'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396',PATH:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf'}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
fixture=json.loads((R/FIXTURE).read_text())['u8587'];last=fixture['strokes'][12][3];prior=fixture['strokes'][12][2]
ns={'F':F,'re':re}
source=(R/PATH).read_text()
for fn in ast.parse(source).body:
 if isinstance(fn,ast.FunctionDef) and fn.name in ('polygons','cross','state'):exec(compile(ast.get_source_segment(source,fn),PATH+'::pure-path-function','exec'),ns)
polygons,cross,state=[ns[k] for k in ('polygons','cross','state')]
P=polygons(last['outline']);A=polygons(prior['outline']);assert len(P)==3 and len(A)==2
def area(p):return abs(sum(a[0]*b[1]-a[1]*b[0] for a,b in zip(p,p[1:]+p[:1])))/2 if p else F(0)
def convex(p):return all(cross(a,b,v)>=0 for a,b in zip(p,p[1:]+p[:1]) for v in p)
assert all(convex(p) and area(p)>0 for p in P);assert convex(A[1])
assert set(P[0])=={(F(59),F('77.5')),(F('64.5'),F('77.5')),(F('64.5'),F('83.5')),(F(59),F('83.5'))}
assert set(P[2])=={(F('64.5'),F('77.5')),(F('65.5'),F(65)),(F('64.5'),F(65)),(F('61.5'),F('77.5'))}
def on(v,a,b):return cross(a,b,v)==0 and min(a[0],b[0])<=v[0]<=max(a[0],b[0]) and min(a[1],b[1])<=v[1]<=max(a[1],b[1])
def shared(a,b):
 out=[]
 for u,v in zip(a,a[1:]+a[:1]):
  for w,z in zip(b,b[1:]+b[:1]):
   if cross(u,v,w)==cross(u,v,z)==0:
    points=sorted({p for p in (u,v,w,z) if on(p,u,v) and on(p,w,z)})
    if len(points)>=2 and points[0]!=points[-1]:out.append((points[0],points[-1]))
 return out
assert shared(P[0],P[2])==[((F('61.5'),F('77.5')),(F('64.5'),F('77.5')))]
assert shared(P[0],P[1])==[((F('64.5'),F('77.5')),(F('64.5'),F('83.5')))]
# Exact source-P connected-prefix reasoning: body starts first; every later
# convex piece meets it on a positive shared edge as soon as it has area.
assert min(x for x,y in P[0])==59 and min(x for x,y in P[2])==F('61.5') and min(x for x,y in P[1])==F('64.5')
assert all(F('64.5')<=x<=F('67.5') for x,y in P[1])
# Uniform strict prior-contact family: for any cut c>59, choose
# x=59+min(c-59,1)/2, y=80.5. Convexity and the two endpoint tests
# put this in both the current clipped body and completed prior cap.
left=(F(59),F('80.5'));inside=(F(60),F('80.5'))
assert state(left,A[1])==0 and state(inside,A[1])==1 and state(inside,P[0])==1
assert all(cross(a,b,left)>=0 and cross(a,b,inside)>0 for a,b in zip(A[1],A[1][1:]+A[1][:1]))
method=(R/METHOD).read_text();fn=next(n for n in ast.parse(method).body if isinstance(n,ast.FunctionDef) and n.name=='audit')
code=ast.get_source_segment(method,fn).split('\n anchor=tuple',1)[0]+'\n return P,boundary,kernel'
public={'groups':[{'polygons':[[{'x':2*x,'y':2*y} for x,y in p] for p in P]}]}
environment={'F':F,'f':public};exec(compile(code,METHOD+'::boundary-kernel-only','exec'),environment)
unused,boundary,kernel=environment['audit'](1)
def clip(poly,a,b):
 out=[]
 for p,q in zip(poly,poly[1:]+poly[:1]):
  cp,cq=cross(a,b,p),cross(a,b,q)
  if cp>=0:out.append(p)
  if (cp<0<cq) or (cq<0<cp):
   t=cp/(cp-cq);out.append(tuple(p[k]+t*(q[k]-p[k]) for k in (0,1)))
 return out
joint=kernel
for a,b in zip(A[1],A[1][1:]+A[1][:1]):joint=clip(joint,a,b)
anchor=tuple(sum(p[k] for p in joint)/len(joint) for k in (0,1)) if area(joint)>0 else None
margins=[cross(a,b,anchor)/(abs(b[0]-a[0])+abs(b[1]-a[1])) for a,b in list(boundary)+list(zip(A[1],A[1][1:]+A[1][:1])) if a!=b] if anchor else []
if anchor:assert min(margins)>0 and state(anchor,A[1])==1 and any(state(anchor,p)==1 for p in P)
q0=(F(59),F('80.5'));q0KernelMargins=[cross(a,b,q0)/(abs(b[0]-a[0])+abs(b[1]-a[1])) for a,b in boundary if a!=b]
def encode(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return{k:encode(x) for k,x in v.items()}
 if isinstance(v,(tuple,list)):return[encode(x) for x in v]
 return v
out={'schema':'hanja-local-u8587-pen13-terminal-source-P-feasibility/v1','glyph':'薇','inputs':PINS,'pen':13,'mask':4,'sourcePrimitive':'cdDrawLine right; original guide59,80.5 to64.5,80.5','sourceMaskBounds':last['bounds'],'sourcePolygons':3,'priorCurveBounds':prior['bounds'],'allTargetPolygonsConvex':True,'bodyStemPositiveSharedEdge':shared(P[0],P[2]),'bodyRoundCapPositiveSharedEdge':shared(P[0],P[1]),'allPositiveLeftPrefixesConnected':True,'allPositiveLeftPrefixesHaveStrictCompletedPriorInkContact':True,'priorContactWitnessFamily':'(59+min(cut-59,1)/2,80.5), cut>59','existingRightClipCanExposeOriginalUpwardP':{'cut':'59+(17/2)*p','upwardQuadFirstPositiveAreaAfter':'5/17','minimumYFor5Over17To11Over17':'155/2-(25/6)*(cut-123/2)','topY65ReachedAt':'11/17','upwardQuadFullyRevealedAt':'13/17','positivePrefixAreaUpperBound':'(629/4)*p','originalPOnly':True},'unionVisibilityKernel':{'area':area(kernel),'boundaryEdges':len(boundary),'Q0StrictKernel':min(q0KernelMargins)>0,'Q0MinimumMargin':min(q0KernelMargins)},'kernelAndPriorCapIntersection':{'area':area(joint),'positiveArea':area(joint)>0,'existenceWitnessOnly':anchor,'strictLInfinityMargin':min(margins) if margins else None,'authorAnchorAdopted':False},'publisherMacro':'right, then down, then obliquely up-right','macroCompatibilityStillPendingROOTNative':True,'source13HOLDPreserved':True,'originalMicroclockEquivalent':False,'newGeometryOrGuide':False,'newImplementation':False,'nativeApproval':False,'runtimeApplied':False,'engine':0,'compilerRuns':0,'server':0,'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
print(json.dumps(encode(out),ensure_ascii=False,indent=2))
