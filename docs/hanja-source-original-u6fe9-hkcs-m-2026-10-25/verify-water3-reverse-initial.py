from pathlib import Path
from fractions import Fraction as F
import json,hashlib,ast
ROOT=Path('/Users/kidow/Documents/dev/kidow/lingo')
FULL='docs/hanja-actual-engine-capture-u6fe9-hkcs-m-2026-10-25/engine-whole-hkcs_m6fe9.json'
b=(ROOT/FULL).read_bytes();assert hashlib.sha256(b).hexdigest()=='fe2644ffc692b3eb4133fb4f9a9a26bd1d6f92da46eea97488991ab4fe4b7456'
f=json.loads(b);groups=[[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in g['polygons']]for g in f['groups'][2:6]]
predicate=ROOT/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-p3-attached-frontier.py'
raw=predicate.read_bytes();assert hashlib.sha256(raw).hexdigest()=='b31d4fcdd87f1b29e2b4186b220daeb0ed40f1d5f6389991bc64456447e6ff80'
for node in ast.parse(raw.decode()).body:
 if isinstance(node,ast.FunctionDef)and node.name in {'cross','signed_area','triangle_contains','winding','edge_hits_triangle_interior'}:exec(compile(ast.Module(body=[node],type_ignores=[]),str(predicate),'exec'))
bands=ROOT/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py'
raw=bands.read_bytes();assert hashlib.sha256(raw).hexdigest()=='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
for node in ast.parse(raw.decode()).body:
 if isinstance(node,ast.FunctionDef)and node.name in {'vec','det','value','union_row','events','certify'}:exec(compile(ast.Module(body=[node],type_ignores=[]),str(bands),'exec'))
foot=groups[0];body=groups[1]+groups[2];rising=groups[3];nonfoot=body+rising
cut=F('72.5');bottom=F('93.45');riseBottom=F('72.85');top=F('26.85')
a=f['trace'][2][0]['args'];original=[tuple(F(str(a[k+j]))/2 for j in[0,1])for k in[0,2,4]];q0,q1,q2=list(reversed(original));T=F(1,2);K=F(1,20)
u=tuple(q1[j]-q0[j]for j in[0,1]);v=tuple(q2[j]-2*q1[j]+q0[j]for j in[0,1]);vv=sum(x*x for x in v);at=max(F(0),min(T,-sum(u[j]*v[j]for j in[0,1])/vv))if vv else F(0)
lam=sum((u[j]+at*v[j])**2 for j in[0,1]);cr=u[0]*v[1]-u[1]*v[0];chord=sum((2*T*u[j]+T*T*v[j])**2 for j in[0,1])-49;curvature=4*K*K*lam**3-cr*cr;cos=1-(7*K)**2/2;axes=[j for j in[0,1]if u[j]*(u[j]+T*v[j])>0]
assert chord>0 and curvature>0 and cos-7*K>0 and axes
assert winding(q0,foot[0])!=0
dists=[]
for a,b in zip(foot[0],foot[0][1:]+foot[0][:1]):
 e=vec(b,a);ee=sum(z*z for z in e);t=max(F(0),min(F(1),sum((q0[j]-a[j])*e[j]for j in[0,1])/ee));dists.append(sum((q0[j]-a[j]-t*e[j])**2 for j in[0,1]))
assert min(dists)>0
out={'schema':'hanja-original-q-reverse-initial-conditions/v1','date':'2026-10-25','glyph':'濩','logical':3,'sourceRaw':3,'sourceOriginalQUnchanged':True,'reverseUAClockTraversalOnly':True,'sourcePChanged':False,'T':str(T),'K':str(K),'qStartOriginalEndpoint':[str(x)for x in q0],'qStartInsideActualP1':True,'qStartMinimumSquaredDistanceToP1Boundary':str(min(dists)),'u':[str(x)for x in u],'v':[str(x)for x in v],'lambdaAt':str(at),'lambda':str(lam),'cross':str(cr),'chordSquaredMinusRadiusSquared':str(chord),'curvatureMargin':str(curvature),'cosMinusRK':str(cos-7*K),'strictAxis':'xy'[axes[0]],'initialSufficientConditions':True,'actualGrowingPIntersectionConnectivityProved':False,'sourceEngine':0,'sourceProjection':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(out,separators=(',',':')))
