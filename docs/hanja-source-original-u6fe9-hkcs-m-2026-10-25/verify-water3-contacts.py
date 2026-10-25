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
rect=[(F(17),cut),(F(18),cut),(F(18),F('72.6')),(F(17),F('72.6'))]
triangles=[[rect[0],rect[1],rect[2]],[rect[0],rect[2],rect[3]]]
for tri in triangles:
 c=tuple(sum(v[j]for v in tri)/3 for j in[0,1])
 for poly in[foot[1],groups[1][0]]:
  assert winding(c,poly)!=0
  assert not any(edge_hits_triangle_interior(a,b,tri)for a,b in zip(poly,poly[1:]+poly[:1]))
tip=rising[1][2];assert tip==(F('19.9'),riseBottom);assert winding(tip,groups[1][0])!=0
dists=[]
for a,b in zip(groups[1][0],groups[1][0][1:]+groups[1][0][:1]):
 v=vec(b,a);vv=sum(z*z for z in v);t=max(F(0),min(F(1),sum((tip[j]-a[j])*v[j]for j in[0,1])/vv));dists.append(sum((tip[j]-a[j]-t*v[j])**2 for j in[0,1]))
delta=F(1,4);assert min(dists)>delta*delta
small=[tip]+[tuple(tip[j]+(v[j]-tip[j])/32 for j in[0,1])for v in rising[1][:2]]
assert all(sum((v[j]-tip[j])**2 for j in[0,1])<delta*delta for v in small)
area=abs(signed_area(small));height=max(tip[1]-v[1]for v in small);assert area>0 and height>0
out={'rejectedSimpleHorizontalFoot':json.loads("{\"label\":\"original P3 left-to-right foot\",\"range\":[\"8\",\"22\"],\"criticalY\":[\"8\",\"41/5\",\"39/4\",\"10\",\"113/10\",\"47/4\",\"253/20\",\"267/20\",\"277/20\",\"74/5\",\"297/20\",\"313/20\",\"161/10\",\"65/4\",\"33/2\",\"83/5\",\"249071/14960\",\"333/20\",\"341/20\",\"347/20\",\"92/5\",\"18629/1010\",\"369/20\",\"389/20\",\"409/20\",\"427/20\",\"22\"],\"openSlabs\":26,\"singleIntervalEveryOpenSlab\":false,\"bad\":[{\"lo\":\"33/2\",\"hi\":\"83/5\",\"intervals\":2},{\"lo\":\"83/5\",\"hi\":\"249071/14960\",\"intervals\":2}],\"positiveWidthAcrossEveryInternalCriticalY\":false,\"minimumCriticalJoinWidth\":null}"),'footToBody':{'footRaw':3,'footPolygon':1,'bodyRaw':4,'bodyPolygon':0,'rectangle':[[str(x)for x in p]for p in rect],'rectangleArea':str(abs(signed_area(rect))),'positiveContactLowerBound':'min(newBodyHeight,1/10)','triangleInteriorAndNoBoundaryCrossing':True},'bodyToRise':{'bodyRaw':4,'bodyPolygon':0,'riseRaw':6,'risePolygon':1,'tip':[str(x)for x in tip],'delta':str(delta),'minimumSquaredTipToBodyBoundary':str(min(dists)),'triangle':[[str(x)for x in p]for p in small],'triangleArea':str(area),'height':str(height),'positiveContactLowerBound':'min(newRiseHeight/contactHeight,1)^2 * contactTriangleArea'},'oldTargetLoopsExecuted':0,'sourceEngine':0,'sourceProjection':0,'sourcePChanged':False,'nativeApproved':False,'runtimeApplied':False}
print(json.dumps(out,separators=(',',':')))
