from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json

R=Path(__file__).resolve().parents[2]
FULL='docs/hanja-actual-engine-capture-u83f0-var-001-2026-10-27/engine-whole-u83f0-var-001.json'
BASE='docs/hanja-source-original-u83f0-var-001-2026-10-27/original-q0-conditions-proof.json'
METHOD='docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py'
PINS={FULL:'1cb6611538476804f6657d3b4d9d8b8e09828cbc8a53c076324531f038474629',BASE:'e73a25d16c038d1eaaf878e5a815f22864a92020823fc6f3831fbe06437d4749',METHOD:'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396'}
for name,h in PINS.items():assert hashlib.sha256((R/name).read_bytes()).hexdigest()==h
f=json.loads((R/FULL).read_text());baseline=json.loads((R/BASE).read_text())
assert baseline['prior']['Q0OutsideAllPriorInk']and baseline['prior']['sourceQ0AboveMaxYBy']=='41/80'
assert len(f['trace'][10])==1 and f['trace'][10][0]['kind']=='cdDrawCurve'
args=f['trace'][10][0]['args'];assert len(args)==8 and args[6:]==[0,7]
Q0,C,Q1=[tuple(F(str(v))/2 for v in args[i:i+2])for i in(0,2,4)]
assert list(map(str,Q0))==baseline['sourceQ0']
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def area2(p):return sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(p,p[1:]+p[:1]))
def state(v,p):
 w=0
 for a,b in zip(p,p[1:]+p[:1]):
  c=cross(a,b,v)
  if c==0 and min(a[0],b[0])<=v[0]<=max(a[0],b[0])and min(a[1],b[1])<=v[1]<=max(a[1],b[1]):return 0
  if a[1]<=v[1]<b[1]and c>0:w+=1
  if b[1]<=v[1]<a[1]and c<0:w-=1
 return 1 if w else-1
def encode(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return{k:encode(x)for k,x in v.items()}
 if isinstance(v,(tuple,list)):return[encode(x)for x in v]
 return v
prior=[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in f['groups'][9]['polygons']]
assert len(prior)==2 and all(v['off']==0 for p in f['groups'][9]['polygons']for v in p)
for p in prior:
 sg=1 if area2(p)>0 else-1;assert area2(p)!=0 and all(sg*cross(a,b,c)>=0 for a,b in zip(p,p[1:]+p[:1])for c in p)
method=(R/METHOD).read_text();fn=next(n for n in ast.parse(method).body if isinstance(n,ast.FunctionDef)and n.name=='audit');code=ast.get_source_segment(method,fn);assert code.count('\n anchor=tuple')==1
code=code.split('\n anchor=tuple',1)[0];assert code.count("F(str(v['x']/2))")==code.count("F(str(v['y']/2))")==1
code=code.replace("F(str(v['x']/2))","F(str(v['x']))/2").replace("F(str(v['y']/2))","F(str(v['y']))/2")
assert all(x not in code for x in ['anchor=','startAnchor','minD','nearest=']);code+='\n return P,boundary,kernel'
ns={'F':F,'f':f};exec(compile(code,METHOD+'::union-and-kernel-prefix-only','exec'),ns);P,boundary,kernel=ns['audit'](11)
assert len(boundary)==baseline['QUnion']['boundaryEdges']==24 and abs(area2(kernel))/2==F(baseline['QUnion']['kernelArea'])
results=[]
for t in(F(1,16),F(1,8),F(1,4)):
 point=tuple((1-t)**2*Q0[i]+2*t*(1-t)*C[i]+t*t*Q1[i]for i in(0,1));assert point!=Q0
 priorStates=[state(point,p)for p in prior];assert 0 not in priorStates
 priorMargins=[]
 for p in prior:
  sg=1 if area2(p)>0 else-1
  priorMargins.append(min(sg*cross(a,b,point)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in zip(p,p[1:]+p[:1])))
 priorPass=any(v>0 for v in priorMargins);assert priorPass==any(v==1 for v in priorStates)
 qMargins=sorted((cross(a,b,point)/(abs(b[0]-a[0])+abs(b[1]-a[1])),a,b)for a,b in boundary)
 qPass=bool(kernel)and qMargins[0][0]>0
 cert=next((i for i,v in enumerate(priorMargins)if v>0),None)
 results.append({'t':t,'originalQuadraticPoint':point,'isSourceQ0':False,'priorVPointStates':priorStates,'priorVOriginalConvexMarginsLInfinity':priorMargins,'strictCompletedPriorVInk':priorPass,'certifyingPriorVOriginalP':cert+1 if cert is not None else None,'priorVCertificateMarginLInfinity':priorMargins[cert]if cert is not None else None,'strictQUnionVisibilityKernel':qPass,'QKernelMinimumMarginLInfinity':qMargins[0][0],'minimumKernelConstraintEdge':(qMargins[0][1],qMargins[0][2]),'bothStrictConditions':priorPass and qPass})
first=next((r for r in results if r['bothStrictConditions']),None)
out={'schema':'hanja-public-original-Q-dyadic-joint-feasibility/v1','date':'2026-10-27','glyph':'菰','originalRoot':'u83f0-var-001','inputs':PINS,'scope':'original public VAR geometry only','coordinateFrame':'actual original capture decimals converted exactly to Fraction then divided by2; no rounding','originalQuadraticControls':[Q0,C,Q1],'formula':'Q(t)=(1-t)^2 Q0+2t(1-t) C+t^2 Q1','testedDyadicsOnly':[F(1,16),F(1,8),F(1,4)],'sourceQ0Baseline':{'point':Q0,'strictPriorContainmentFailed':True,'YExceedsPriorMaxYBy':'41/80','newPointMustNotBeCalledOriginalStart':True},'QUnionBoundaryEdges':len(boundary),'QUnionKernelArea':abs(area2(kernel))/2,'results':results,'firstPassingTestedDyadic':first['t']if first else None,'sourceQ0EqualsFirstPassingPoint':False,'sourceQ0GapClaimedGone':False,'newAuthorStartAndClockWouldDifferFromOriginal':True,'anchorPolicyAdopted':False,'originalPOrQFieldsChanged':False,'partReuseApproved':False,'wholeShapeApproved':False,'sourceOrderApproved':False,'sourceDirectionApproved':False,'sourceClockApproved':False,'nativeApproval':False,'runtimeApplied':False,'engineRuns':0,'networkRequests':0,'newPrivateMedia':0,'limits':['Only the three requested original-Q dyadics are evaluated; no grid scan, alternate Q, invented point or author reveal policy is produced.','A passing point establishes only strict geometric prior-V/kernel membership. Starting at a positive source t would require a new author start and clock; it does not preserve Q0 or prove publisher-forward timing.','Original Q0 remains outside completed V ink by the pinned baseline result. The original gap is not hidden or declared repaired.','No candidate composition or component identity is an input to this original-source-only proof. No part, whole, order, direction or runtime approval is transferred.','The existing union/kernel prefix executes without anchor-search code. No renderer, phase, smoothing, engine replay or private media is involved.'],'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
out['scopeHistory']='The initial computation used original VAR geometry and also checked local provenance bindings allowed by the then-current task; those bindings were removed when scope narrowed. Current proof reads original public VAR data only.'
out['recordedPreparationMathExecutions']=2
out['forwardApproved']=False
print(json.dumps(encode(out),separators=(',',':')))
