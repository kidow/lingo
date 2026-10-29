import json,sys
from fractions import Fraction as F
d=json.load(sys.stdin,parse_float=F,parse_int=F)
def pts(g):
 return [[(p['x'],p['y'])for p in ps]for ps in g['polygons']]
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def on(a,b,p):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def edge(a,b,c,e):
 x,y,z,w=cross(a,b,c),cross(a,b,e),cross(c,e,a),cross(c,e,b)
 return(x*y<0 and z*w<0)or on(a,b,c)or on(a,b,e)or on(c,e,a)or on(c,e,b)
def inside(p,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  if on(a,b,p):return True
  if a[1]<=p[1]<b[1]and cross(a,b,p)>0:w+=1
  if b[1]<=p[1]<a[1]and cross(a,b,p)<0:w-=1
 return w!=0
def contact(a,b):
 if max(p[0]for p in a)<min(p[0]for p in b)or max(p[0]for p in b)<min(p[0]for p in a)or max(p[1]for p in a)<min(p[1]for p in b)or max(p[1]for p in b)<min(p[1]for p in a):return False
 return any(edge(x,y,z,w)for x,y in zip(a,a[1:]+a[:1])for z,w in zip(b,b[1:]+b[:1]))or inside(a[0],b)or inside(b[0],a)
def rawcontact(a,b):return any(contact(x,y)for x in pts(a)for y in pts(b))

EPS=F(1,1000)
def sub(a,b):return(a[0]-b[0],a[1]-b[1])
def sq(a):return a[0]*a[0]+a[1]*a[1]
def ds(p,a,b):
 v=sub(b,a);u=sub(p,a);n=sq(v)
 if n==0:return sq(u)
 t=(u[0]*v[0]+u[1]*v[1])/n
 if t<=0:return sq(u)
 if t>=1:return sq(sub(p,b))
 return cross(a,b,p)**2/n
def mid(a,b):return((a[0]+b[0])/2,(a[1]+b[1])/2)
def strict(p,poly):return inside(p,poly)and not any(on(a,b,p)for a,b in zip(poly,poly[1:]+poly[:1]))
bbox=[F(str(x))for x in d['targetBBox']];source=[F(480),F(400),F(970),F(882)]
sx=(bbox[2]-bbox[0])/(source[2]-source[0]);sy=(bbox[3]-bbox[1])/(source[3]-source[1]);tx=bbox[0]-sx*source[0];ty=bbox[1]-sy*source[1]
def fit(x,y):return(sx*x+tx,sy*y+ty)
poly=[];flatPieces=0;depthMax=0
def cubic(p,depth=0):
 global flatPieces,depthMax
 if max(ds(p[1],p[0],p[3]),ds(p[2],p[0],p[3]))<=EPS**2:
  poly.append(p[3]);flatPieces+=1;depthMax=max(depthMax,depth);return
 assert depth<20
 a=mid(p[0],p[1]);b=mid(p[1],p[2]);c=mid(p[2],p[3]);ab=mid(a,b);bc=mid(b,c);m=mid(ab,bc)
 cubic([p[0],a,ab,m],depth+1);cubic([m,bc,c,p[3]],depth+1)
for row in d['commands']:
 c=row['command'];a=row['args']
 if c=='M':cur=fit(a[0],a[1]);poly.append(cur)
 elif c=='C':n=[cur]+[fit(a[i],a[i+1])for i in range(0,6,2)];cubic(n);cur=n[-1]
 elif c=='Z':pass
 else:raise ValueError('unsupported C source command')
if poly[-1]==poly[0]:poly.pop()
old=d['recipient']['groups'];others=[(i+1,g)for i,g in enumerate(old)if i not in[2,3]]
oldcontacts=[[i+1,j]for i in[2,3]for j,g in others if rawcontact(old[i],g)]
witnesses=[];unknown=[];separated=[]
for raw,g in others:
 bb=[min(p['x']for s in g['polygons']for p in s),min(p['y']for s in g['polygons']for p in s),max(p['x']for s in g['polygons']for p in s),max(p['y']for s in g['polygons']for p in s)]
 if bb[0]>bbox[2]or bb[2]<bbox[0]or bb[1]>bbox[3]or bb[3]<bbox[1]:separated.append(raw);continue
 found=None
 for index,q in enumerate(pts(g)):
  cand=[(sum(p[0]for p in q)/len(q),sum(p[1]for p in q)/len(q))]
  cand += [((q[0][0]+q[i][0]+q[i+1][0])/3,(q[0][1]+q[i][1]+q[i+1][1])/3)for i in range(1,len(q)-1)]
  for k,v in enumerate(poly):
   if strict(v,q):
    w=poly[(k+1)%len(poly)];dx=w[0]-v[0];dy=w[1]-v[1];scale=abs(dx)+abs(dy)
    if scale:
     for sign in[-1,1]:cand.append((v[0]-sign*dy*EPS*8/scale,v[1]+sign*dx*EPS*8/scale))
  for p in cand:
   if strict(p,q)and strict(p,poly)and all(ds(p,a,b)>EPS**2 for a,b in zip(poly,poly[1:]+poly[:1])):
    found={'raw':raw,'originalPolygonOneBased':index+1,'point':[str(p[0]),str(p[1])],'oldTargetContactExists':any(x[1]==raw for x in oldcontacts),'strictOldFilledPInside':True,'exactCubicWindingInsideByHomotopy':True,'curveBoundaryDistanceLowerBound':str(EPS)};break
  if found:break
 if found:witnesses.append(found)
 else:unknown.append(raw)
print(json.dumps({'matrixExact':[str(sx),'0','0',str(sy),str(tx),str(ty)],'determinantExact':str(sx*sy),'oldTargetToOtherContacts':oldcontacts,'newExactCubicPositiveAreaWitnesses':witnesses,'bboxSeparatedOtherRaw':separated,'possibleButUnprovedOtherRaw':unknown,'certificate':{'epsilon':str(EPS),'flatPieces':flatPieces,'maxSubdivisionDepth':depthMax,'arithmetic':'Exact rational affine/control points/deCasteljau/chord capsule and point winding. Analysis polygon is not product geometry.','basis':'Every source cubic fragment stays within EPS of its chord by convex control hull; a test point farther than EPS from every chord has identical nonzero winding under the curve-to-chord homotopy.'},'shapeApproved':False,'runtimeApplied':False}))
