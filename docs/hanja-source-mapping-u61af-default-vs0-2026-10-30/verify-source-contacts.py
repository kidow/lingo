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

def pointseg(p,a,b):
 v=(b[0]-a[0],b[1]-a[1]);w=(p[0]-a[0],p[1]-a[1]);den=v[0]*v[0]+v[1]*v[1]
 t=F(0)if den==0 else max(F(0),min(F(1),(w[0]*v[0]+w[1]*v[1])/den));q=(a[0]+t*v[0],a[1]+t*v[1]);return(p[0]-q[0])**2+(p[1]-q[1])**2
def dist(a,b):
 if rawcontact(a,b):return F(0)
 return min(min(pointseg(p,x,y)for p in[x1,x2])+[F(0)][0]for pa in pts(a)for pb in pts(b)for x1,x2 in zip(pa,pa[1:]+pa[:1])for x,y in zip(pb,pb[1:]+pb[:1]))
def exactdist(a,b):
 if rawcontact(a,b):return F(0)
 return min(min(pointseg(x,z,w),pointseg(y,z,w),pointseg(z,x,y),pointseg(w,x,y))for pa in pts(a)for pb in pts(b)for x,y in zip(pa,pa[1:]+pa[:1])for z,w in zip(pb,pb[1:]+pb[:1]))
pairs=[]
for variant,mapping in d['mappings'].items():
 gs=d[variant]['groups']
 assert len(gs)==19 and all(p['off']==0 for g in gs for ps in g['polygons']for p in ps)
 for pen,raws in enumerate(mapping,1):
  raws=list(map(int,raws))
  if len(raws)<2:continue
  for a,b in zip(raws,raws[1:]):
   value=exactdist(gs[a-1],gs[b-1]);pairs.append({'variant':variant,'nativeLogical':pen,'raws':[int(a),int(b)],'filledContact':rawcontact(gs[a-1],gs[b-1]),'minimumBoundaryDistanceSquaredExact':str(value)})
print(json.dumps({'boundaries':pairs,'allSourcePUnchanged':True,'allOff0':True,'runtimeApproved':False}))
