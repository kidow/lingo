import pathlib,json,hashlib
from fractions import Fraction as F
r=pathlib.Path(__file__).resolve().parents[2]
def frac(v):return F(str(v))
def inside(p,poly):
 hit=False
 for i,a in enumerate(poly):
  b=poly[i-1]
  if (a[1]>p[1])!=(b[1]>p[1]) and p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0]:hit=not hit
 return hit
def ds(p,poly):
 out=[]
 for i,a in enumerate(poly):
  b=poly[i-1];d=(b[0]-a[0],b[1]-a[1]);den=d[0]**2+d[1]**2
  t=max(F(0),min(F(1),((p[0]-a[0])*d[0]+(p[1]-a[1])*d[1])/den)) if den else F(0)
  out.append((p[0]-a[0]-t*d[0])**2+(p[1]-a[1]-t*d[1])**2)
 return min(out)
out=[]
for u,pairs,seeds in [('u785c',[(7,8),(9,10),(11,12)],[(84.7,77.2),(117.5,77.2),(149.4,77.2)]),('u727c',[(6,7),(8,9),(10,11)],[(82.3,77.2),(115.8,77.2),(148.4,77.2)])]:
 path=r/('docs/hanja-source-original-full-'+u+'-2026-10-23/engine-proof.json');a=json.loads(path.read_text());tr=a['trace'];rows=[]
 for (i,j),seed in zip(pairs,seeds):
  first,second=tr[i][0],tr[j][0];assert first['kind']==second['kind']=='cdDrawCurve'
  p=tuple(frac(v)/2 for v in seed);radius=F(9,20);chosen=[]
  for call in [first,second]:
   options=[]
   for ix,poly in enumerate(call['polygons']):
    assert all(v['off']==0 for v in poly)
    points=[(frac(v['x'])/2,frac(v['y'])/2)for v in poly]
    if inside(p,points):
     d=ds(p,points)
     if d>radius**2:options.append((d,ix))
   assert options
   d,ix=max(options);chosen.append({'polygon':ix,'boundaryDistanceSquared':str(d)})
  endpoint=tuple(frac(v)/2 for v in first['args'][4:6]);enddist=sum((p[k]-endpoint[k])**2 for k in [0,1]);assert enddist<(F(7)-radius)**2
  rows.append({'originalRawPairZeroBased':[i,j],'normalizedSeed':[str(v)for v in p],'openDiskRadius':str(radius),'radiusSquared':str(radius**2),'originalFilledContourWitnesses':chosen,'previousCompletedQEndpoint':[str(v)for v in endpoint],'previousRoundMaskRadius':'7','seedToPreviousEndpointSquared':str(enddist),'endpointContainmentUpperBoundSquared':str((F(7)-radius)**2)})
 out.append({'glyphId':u,'sourceFullProofSHA256':hashlib.sha256(path.read_bytes()).hexdigest(),'strictRootCertificates':rows})
print(json.dumps(out,separators=(',',':')))
