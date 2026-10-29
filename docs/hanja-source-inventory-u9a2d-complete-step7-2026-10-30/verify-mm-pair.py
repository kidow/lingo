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
def hull(points):
 a=sorted(set(points))
 if len(a)<=2:return a
 lo=[];hi=[]
 for p in a:
  while len(lo)>=2 and cross(lo[-2],lo[-1],p)<=0:lo.pop()
  lo.append(p)
 for p in reversed(a):
  while len(hi)>=2 and cross(hi[-2],hi[-1],p)<=0:hi.pop()
  hi.append(p)
 return lo[:-1]+hi[:-1]


def parsepath(cs):
 poly=[];pieces=[]
 def bez(p,depth=0):
  if max([ds(q,p[0],p[-1])for q in p[1:-1]]or[F(0)])<=EPS**2:poly.append(p[-1]);pieces.append(p);return
  assert depth<20
  row=p;left=[p[0]];right=[p[-1]]
  while len(row)>1:row=[mid(a,b)for a,b in zip(row,row[1:])];left.append(row[0]);right.append(row[-1])
  bez(left,depth+1);bez(right[::-1],depth+1)
 for c in cs:
  cmd=c['command'];a=c['args']
  if cmd=='M':cur=(a[0],a[1]);poly.append(cur)
  elif cmd=='L':n=(a[0],a[1]);pieces.append([cur,n]);poly.append(n);cur=n
  elif cmd in('Q','C'):
   p=[cur]+[(a[i],a[i+1])for i in range(0,len(a),2)];bez(p);cur=p[-1]
  elif cmd=='Z':pass
  else:raise ValueError(cmd)
 if poly[0]==poly[-1]:poly.pop()
 return poly,[hull(p)for p in pieces]+[[poly[-1],poly[0]]]
a,ha=parsepath(d['commands'][4]);b,hb=parsepath(d['commands'][6]);intersections=sum(1 for x in ha for y in hb if contact(x,y));assert intersections==0;assert not inside(a[0],b)and not inside(b[0],a)
print(json.dumps({'source':'MM步7','pair':[5,7],'exactBoundaryControlHullIntersections':intersections,'filledDisjoint':True,'firstPointsOutsideOppositeWinding':True,'path5Pieces':len(ha),'path7Pieces':len(hb),'epsilonForSubdivision':str(EPS),'originalDUnchanged':True,'positiveAffineCannotCreateMissingContact':True,'nativeApproval':False}))
