from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json

R=Path(__file__).resolve().parents[2]
FULL='docs/hanja-actual-engine-capture-u83f0-var-001-2026-10-27/engine-whole-u83f0-var-001.json'
METHOD='docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py'
PINS={FULL:'1cb6611538476804f6657d3b4d9d8b8e09828cbc8a53c076324531f038474629',METHOD:'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396'}
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
 if isinstance(v,(list,tuple)):return[encode(x)for x in v]
 return v
for path,h in PINS.items():assert hashlib.sha256((R/path).read_bytes()).hexdigest()==h
f=json.loads((R/FULL).read_text());assert len(f['groups'])==13 and len(f['trace'])==13
assert len(f['trace'][9])==len(f['trace'][10])==1 and f['trace'][9][0]['kind']=='cdDrawLine'and f['trace'][10][0]['kind']=='cdDrawCurve'
assert f['groups'][9]['polygons']==f['trace'][9][0]['polygons']and f['groups'][10]['polygons']==f['trace'][10][0]['polygons']
q0=tuple(F(str(x))/2 for x in f['trace'][10][0]['args'][:2])
prior=[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in f['groups'][9]['polygons']]
Q=[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in f['groups'][10]['polygons']]
assert len(prior)==2 and len(Q)==3 and all(v['off']==0 for g in (f['groups'][9],f['groups'][10])for p in g['polygons']for v in p)
priorMaxY=max(v[1]for p in prior for v in p);assert q0[1]>priorMaxY
method=(R/METHOD).read_text();fn=next(n for n in ast.parse(method).body if isinstance(n,ast.FunctionDef)and n.name=='audit')
code=ast.get_source_segment(method,fn);needle='\n anchor=tuple';assert code.count(needle)==1
code=code.split(needle,1)[0]
assert code.count("F(str(v['x']/2))")==code.count("F(str(v['y']/2))")==1
code=code.replace("F(str(v['x']/2))","F(str(v['x']))/2").replace("F(str(v['y']/2))","F(str(v['y']))/2")
assert all(x not in code for x in ['anchor=','startAnchor','minD','nearest='])
code+='\n return P,boundary,kernel'
ns={'F':F,'f':f};exec(compile(code,METHOD+'::union-and-kernel-prefix-only','exec'),ns)
normalised,boundary,kernel=ns['audit'](11)
assert normalised==[p if area2(p)>0 else list(reversed(p))for p in Q]
nxt=dict(boundary);assert len(nxt)==len(boundary);incoming={}
for a,b in boundary:incoming[b]=incoming.get(b,0)+1
assert set(nxt)==set(incoming)and all(x==1 for x in incoming.values())
start=min(nxt);v=start;cycle=[]
while v not in cycle:cycle.append(v);v=nxt[v]
assert v==start and len(cycle)==len(boundary)
negative=sorted((cross(a,b,q0),a,b)for a,b in boundary if cross(a,b,q0)<0)
kernelArea=abs(area2(kernel))/2 if kernel else F(0)
out={'schema':'hanja-public-original-q0-feasibility/v1','date':'2026-10-27','glyph':'菰','root':'u83f0-var-001','inputs':PINS,'sourceRowsOneBased':{'priorV':10,'Q':11},'coordinateFrame':'original actual P and call coordinates divided exactly by2; no input geometry changed','sourceQ0':q0,'prior':{'originalPolygons':2,'pointStates':[state(q0,p)for p in prior],'maxY':priorMaxY,'sourceQ0AboveMaxYBy':q0[1]-priorMaxY,'Q0OutsideAllPriorInk':all(state(q0,p)==-1 for p in prior)},'QUnion':{'originalPolygons':3,'originalSignedDoubleAreas':[area2(p)for p in Q],'normalisation':'Only independent opaque polygon orientations are normalised in analysis; untouched actual source P remains pinned.','sourceQ0PointStates':[state(q0,p)for p in Q],'sourceQ0InsideAnyOriginalPolygon':any(state(q0,p)==1 for p in Q),'boundaryEdges':len(boundary),'oneRegularBoundaryCycle':True,'kernelArea':kernelArea,'sourceQ0InClosedVisibilityKernel':bool(kernel)and not negative,'sourceQ0InStrictVisibilityKernel':bool(kernel)and all(cross(a,b,q0)>0 for a,b in boundary),'negativeBoundaryHalfPlanes':len(negative),'oneExactNegativeWitness':{'cross':negative[0][0],'edge':[negative[0][1],negative[0][2]]}if negative else None},'strictOriginalQ0AndPriorKernelConditionPassed':False,'inventedAnchorChosen':False,'sourceGeometryChanged':False,'wholeShapeApproved':False,'partReuseApproved':False,'sourceClockApproved':False,'nativeApproval':False,'runtimeApplied':False,'engineRuns':0,'newPrivateMedia':0,'limits':['This is only exact feasibility for the original Q0 under this pinned source. It is not a proof that all possible source-conforming animation families fail.','No alternate anchor, substituted part, composite glyph, guide join, source reversal or new reveal policy is proposed.','The union/kernel algorithm prefix runs without its anchor-search or start-disk candidate code.'],'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
print(json.dumps(encode(out),separators=(',',':')))
