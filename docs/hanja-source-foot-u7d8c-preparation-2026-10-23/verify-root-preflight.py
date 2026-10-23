import json,math
from fractions import Fraction as F
from pathlib import Path
import hashlib
R=Path(__file__).resolve().parents[2]
raw=(R/'docs/hanja-source-original-full-u7d8c-2026-10-23/engine-proof.json').read_bytes()
assert hashlib.sha256(raw).hexdigest()=='d025868602d7d0e1de4a06676126549ba88bd304e3d1695098b85d673b1d6713'
full=json.loads(raw)
def point_inside(p,poly):
 x,y=p; hit=False
 for i,a in enumerate(poly):
  b=poly[i-1]
  if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:hit=not hit
 return hit
def dseg(p,a,b):
 dx,dy=b[0]-a[0],b[1]-a[1]; u=((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy);u=max(0,min(1,u));return (p[0]-a[0]-u*dx)**2+(p[1]-a[1]-u*dy)**2
def mind(p,poly):return min(dseg(p,poly[i-1],a)for i,a in enumerate(poly))
def rpoly(poly):return [(F(str(v['x']))/2,F(str(v['y']))/2)for v in poly]
results=[]
for pen,(a,b)in enumerate([(0,1),(2,3)],1):
 ca,cb=full['trace'][a][0],full['trace'][b][0];pa,pb=rpoly(ca['polygons'][0]),rpoly(cb['polygons'][0]);paf,pbf=[[(float(x),float(y))for x,y in p]for p in [pa,pb]];endpoint=(F(str(ca['args'][4]))/2,F(str(ca['args'][5]))/2);ef=tuple(map(float,endpoint))
 xmin=max(min(x for x,y in paf),min(x for x,y in pbf));xmax=min(max(x for x,y in paf),max(x for x,y in pbf));ymin=max(min(y for x,y in paf),min(y for x,y in pbf));ymax=min(max(y for x,y in paf),max(y for x,y in pbf));best=None
 for ix in range(math.ceil(xmin*10),math.floor(xmax*10)+1):
  for iy in range(math.ceil(ymin*10),math.floor(ymax*10)+1):
   q=(ix/10,iy/10)
   if not(point_inside(q,paf)and point_inside(q,pbf)):continue
   margin=min(math.sqrt(mind(q,paf)),math.sqrt(mind(q,pbf)),7-math.hypot(q[0]-ef[0],q[1]-ef[1]))
   if best is None or margin>best[0]:best=(margin,ix,iy)
 if not best or best[0]<=.1:results.append({'pen':pen,'strictEndpointDiskFound':False});continue
 seed=(F(best[1],10),F(best[2],10));r=F(max(1,math.floor(best[0]*10)-1),10);da,db=mind(seed,pa),mind(seed,pb);de=(seed[0]-endpoint[0])**2+(seed[1]-endpoint[1])**2
 assert point_inside(seed,pa)and point_inside(seed,pb)and da>r*r and db>r*r and de<(7-r)**2
 results.append({'pen':pen,'rawPairZeroBased':[a,b],'strictEndpointDiskFound':True,'normalizedSeed':list(map(str,seed)),'openDiskRadius':str(r),'primaryPBoundaryDistanceSquared':[str(da),str(db)],'previousGuideEndpoint':list(map(str,endpoint)),'seedToEndpointSquared':str(de),'endpointDiskRadius':'7','endpointContainmentThresholdSquared':str((7-r)**2),'oldCenterlineGapPreserved':True,'fullPrefixProofApproved':False,'nativeApproved':False})
print(json.dumps({'strictRootPreflight':results,'sourceEngine':0,'sourceProjection':0,'sourcePGuideUnchanged':True}))
