from pathlib import Path
from fractions import Fraction as F
import json,hashlib,gzip,base64
ROOT=Path('/Users/kidow/Documents/dev/kidow/lingo')
FIXTURE='docs/hanja-source-original-u840d-hkcs-2026-10-25/fixtures.json'
NATIVE='docs/hanja-source-original-u840d-hkcs-2026-10-25/reverse-front-foot-only-native-review.json'
fbytes=(ROOT/FIXTURE).read_bytes()
assert hashlib.sha256(fbytes).hexdigest()=='86cafe4a029685e7c842156e7bc1016174c463d945c893aa2da0f50674e1a1c7'
f=json.loads(fbytes)['hkcs_m840d'];native=json.loads((ROOT/NATIVE).read_bytes())
polys=[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in f['fullProof']['groups'][6]['polygons']]
p1,p2,p3=polys;triangle=p1[-3:];anchor=tuple(sum(p[j]for p in triangle)/3 for j in[0,1])
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def signed_area(p):return sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(p,p[1:]+p[:1]))/2
def triangle_contains(p,t,strict=False):
 orientation=1 if signed_area(t)>0 else-1
 values=[orientation*cross(t[i],t[(i+1)%3],p)for i in range(3)]
 return all(v>0 for v in values)if strict else all(v>=0 for v in values)
def winding(p,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  z=cross(a,b,p)
  if a[1]<=p[1]<b[1]and z>0:w+=1
  elif b[1]<=p[1]<a[1]and z<0:w-=1
 return w
def edge_hits_triangle_interior(a,b,t):
 lo,hi=F(0),F(1);orientation=1 if signed_area(t)>0 else-1
 for i in range(3):
  alpha=orientation*cross(t[i],t[(i+1)%3],a)
  beta=orientation*cross(t[i],t[(i+1)%3],b)-alpha
  if beta==0:
   if alpha<=0:return False
  elif beta>0:lo=max(lo,-alpha/beta)
  else:hi=min(hi,-alpha/beta)
 if lo>=hi:return False
 s=(lo+hi)/2;p=tuple(a[j]+s*(b[j]-a[j])for j in[0,1])
 return triangle_contains(p,t,True)
assert signed_area(triangle)>0 and triangle_contains(anchor,triangle,True)
assert winding(anchor,p1)==1 and triangle_contains(anchor,p3,True)
assert not any(edge_hits_triangle_interior(a,b,triangle)for a,b in zip(p1,p1[1:]+p1[:1]))
assert all(triangle_contains(p,p3)for p in triangle)
# The open triangle is connected, contains no original P1 boundary, and its
# centroid has nonzero winding. Thus the triangle lies inside actual P1 fill.
area=signed_area(triangle);assert area==F(19,160)
box=(F('16.7'),F('74.9'),F('19.25'),F('76.35'))
corners=[(x,y)for x in[box[0],box[2]]for y in[box[1],box[3]]]
distances=[sum((p[j]-c[j])**2 for j in[0,1])for p in p3 for c in corners]
maximum=max(distances);assert maximum<49
at75=next(x for x in native['UA']['frames']if x['p']==0.75)
assert at75['rho']==7
q=tuple(F(str(x))for x in at75['point']);assert box[0]<=q[0]<=box[2]and box[1]<=q[1]<=box[3]
# For p>3/4 let s=4p-3 and C_s=A+s(P3-A). Source P3 is convex and A is
# inside it, hence C_s is nested, connected, contained in P3, area=s^2*area(P3).
# It contains A+s(T-A), where T is the certified triangle above. Since A is
# inside convex T, that smaller triangle is inside T and thus inside P1.
# Its area=s^2*19/160>0 for every s>0. No isolated P3 component can be born.
# Require each committed UA frame p>=3/4 to keep rho=7 and its measured Q point
# inside the exact box. Then the endpoint disk alone contains all P3, so the
# original Q mask cannot sever the attached frontier. Guard failure hides P3.
out={'schema':'hanja-p3-attached-frontier-feasibility/v1','date':'2026-10-25','glyph':'萍','logical':7,'coordinateSpace':'normalized100','fixture':{'path':FIXTURE,'SHA256':hashlib.sha256(fbytes).hexdigest()},'nativeGate':{'path':NATIVE,'SHA256':hashlib.sha256((ROOT/NATIVE).read_bytes()).hexdigest()},'sourceOriginalP3':[[str(v)for v in p]for p in p3],'sourceQUnchanged':f['strokes'][6][0]['revealPath'],'widthUnchanged':14,'anchor':[str(x)for x in anchor],'actualP1P3OverlapTriangle':[[str(v)for v in p]for p in triangle],'overlapTriangleArea':str(area),'P1BoundaryEntersTriangleInterior':False,'anchorP1Winding':1,'anchorStrictInsideP3':True,'gate':'3/4','gateIsNotOriginalPublisherClockFraction':True,'gateChoice':'safe geometric/observed-UA bound within the foot-only candidate phase; no one-to-one publisher clock mapping claimed','measuredPointBox':[str(x)for x in box],'endpointRadius':7,'maximumVertexToBoxCornerSquared':str(maximum),'strictFullP3DiskMargin':str(49-maximum),'requiredEveryCommittedFrameGuard':{'pAtLeastGate':True,'rhoExactly7':True,'sameOriginalQWidthAndCoordinateOwner':True,'measuredQPointInExactBox':True,'actualOriginalP1PaintPresentOpaqueSameMask':True,'guardFailureHidesP3':True},'frontier':{'beforeOrAtGate':'P3 hidden','afterGate':'s=4p-3; clip is anchor+s*(original P3-anchor)','sourceP3PathDataChanged':False,'sourceQChanged':False,'sourceWidthChanged':False,'newInkAdded':False,'connectedForEverySPositive':True,'nestedForAllS0to1':True,'subsetOriginalP3ForAllS0to1':True,'positiveExistingP1ContactAreaWitness':'s^2*19/160','areaZeroContinuouslyAtS0':True,'fullOriginalP3ExactlyAtS1':True},'scopeLimits':['This proves only the delayed original-P3 paint frontier and its attachment under the required measured-frame guard.','The existing P1/P2 reverse-front sweep and complete logical7 three-phase policy are not thereby proved or approved.','Original .05/.25 observation constrains broad foot then body then rising order; gate3/4 is not a publisher timing claim and still requires finite browser observation.'],'sharedRendererChanged':False,'sourceEngine':0,'sourceProjection':0,'nativeApproved':False,'runtimeApplied':False}
print(json.dumps({'encoded':base64.b64encode(gzip.compress(json.dumps(out,separators=(',',':')).encode(),mtime=0)).decode(),'summary':{'anchor':out['anchor'],'overlapArea':str(area),'maxP3DistanceSquared':str(maximum),'strictDiskMargin':str(49-maximum),'nestedConnectedAndCompleteP3':True,'fullLogical7Approved':False}}))
