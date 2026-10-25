from pathlib import Path
from fractions import Fraction as F
import json,hashlib,ast
ROOT=Path('/Users/kidow/Documents/dev/kidow/lingo')
FULL="docs/hanja-actual-engine-capture-u705d-hkcs-m-2026-10-26/engine-whole-hkcs_m705d.json"
b=(ROOT/FULL).read_bytes();assert hashlib.sha256(b).hexdigest()=='dc3df9f8e327a0b221fc7e71db05301905f15cc6ad919d98a5ed2da04e72a74b'
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

a=(F('14.06'),F('69.05'));delta=F(1,100);c0=F('181.62');c1=F('182')
box=[(a[0]+dx*delta,a[1]+dy*delta)for dx,dy in[(-1,-1),(1,-1),(1,1),(-1,1)]]
assert max(8*p[0]+p[1]for p in box)==c0
for tri in[[box[0],box[1],box[2]],[box[0],box[2],box[3]]]:
 center=tuple(sum(p[k]for p in tri)/3 for k in[0,1]);assert winding(center,groups[0][0])!=0
 assert not any(edge_hits_triangle_interior(x,y,tri)for x,y in zip(groups[0][0],groups[0][0][1:]+groups[0][0][:1]))
kernel=[]
for pi,p in enumerate(groups[1]):
 sign=1 if signed_area(p)>0 else -1;mm=[sign*cross(x,p[(j+1)%len(p)],a)for j,x in enumerate(p)]
 assert min(mm)>=0;zeros=[j for j,v in enumerate(mm)if v==0];assert zeros==([10]if pi==0 else[4])
 assert all(sign*cross(x,p[(j+1)%len(p)],v)>0 for j,x in enumerate(p)if j not in zeros for v in box)
 kernel.append(dict(polygon=pi,sharedEdge=zeros,minNonshared=str(min(v for v in mm if v>0))))
assert groups[1][0][10]==groups[1][1][0] and groups[1][0][11]==groups[1][1][-1]
base=[[(p[1],8*p[0]+p[1])for p in poly]for group in[groups[0],groups[2],groups[3]]for poly in group];body=[[(p[1],8*p[0]+p[1])for p in poly]for poly in groups[1]];allp=base+body
lo=min(p[1]for poly in allp for p in poly);hi=max(p[1]for poly in allp for p in poly);ys=sorted(set(events(allp,lo,hi)+[c0,c1]));rows=[union_row(base,(x+y)/2)for x,y in zip(ys,ys[1:])];bodyrows=[union_row(body,(x+y)/2)for x,y in zip(ys,ys[1:])]
assert len(rows[0])==1;bad=[];bridges=[];minbefore=[]
for i,row in enumerate(rows[1:],1):
 y=ys[i];mid=(ys[i]+ys[i+1])/2
 for j,z in enumerate(row):
  prior=[min(value(z[1],y),value(t[1],y))-max(value(z[0],y),value(t[0],y))for t in rows[i-1]]
  p=max(prior)if prior else F(-1)
  bm=[min(value(z[1],mid),value(t[1],mid))-max(value(z[0],mid),value(t[0],mid))for t in bodyrows[i]]
  b=max(bm)if bm else F(-1)
  if p<0:
   u=max(F(0),min(F(1),(y-c0)/(c1-c0)));z0=value(z[0],y);z1=value(z[1],y);q=((y-(z0+z1)/2)/8,(z0+z1)/2);found=None
   if u>0:
    for pi,poly in enumerate(groups[1]):
     sp=[tuple(a[k]+u*(v[k]-a[k])for k in[0,1])for v in poly]
     for ti,v in enumerate(sp):
      tri=[a,v,sp[(ti+1)%len(sp)]];m=[cross(tri[k],tri[(k+1)%3],q)for k in range(3)]
      if min(m)>0:found=dict(polygon=pi,fan=ti,triangle=[[str(x)for x in v]for v in tri],strictMargins=list(map(str,m)));break
     if found:break
   if found:bridges.append(dict(slab=i,lo=str(y),interval=j,bodyScale=str(u),sourceContactPoint=list(map(str,q)),bodyCertificate=found))
   else:bad.append(dict(slab=i,lo=str(y),interval=j,reason='new-base-component-not-attached',prior=str(p),bodyScale=str(u),point=list(map(str,q))))
out=dict(axis='8x+y',authorSelectedNotPublisherClock=True,range=[str(lo),str(hi)],bodyStart=str(c0),bodyComplete=str(c1),bodySourceRaw=4,bodyAnchor=list(map(str,a)),bodyKernel=kernel,existingFootCommonBox=[[str(x)for x in p]for p in box],commonBoxArea='1/2500',openSlabs=len(rows),firstIntervals=len(rows[0]),bodyBridges=bridges,bad=bad,prefixConnectivityCandidate=not bad,fullBodyIsOriginalHomothetyClip=True,sourceGeometryChanged=False,officialSubphaseClaim=False,sourceProjection=0,engine=0,nativeApproval=False)
print(json.dumps(out,separators=(',',':')))
