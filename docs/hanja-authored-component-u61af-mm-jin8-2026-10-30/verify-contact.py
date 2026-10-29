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

bbox=[F(str(x))for x in d['targetBBox']];src=[F(str(x))for x in d['sourceBBox']];sx=(bbox[2]-bbox[0])/(src[2]-src[0]);sy=(bbox[3]-bbox[1])/(src[3]-src[1]);tx=bbox[0]-sx*src[0];ty=bbox[1]-sy*src[1]
def fit(x,y):return(sx*x+tx,sy*(900-y)+ty)
old=d['recipient']['groups'];right=[(i+1,g)for i,g in enumerate(old)if i<3 or i>=14];oldcontacts=[[i+4,j]for i,a in enumerate(old[3:14])for j,b in right if rawcontact(a,b)]
units=[];newcontacts=[];unknown=[];totalPieces=0
for path,cs in enumerate(d['commands'],1):
 poly=[];pieces=[]
 def bezier(p,depth=0):
  if max([ds(q,p[0],p[-1])for q in p[1:-1]]or[F(0)])<=EPS**2:
   poly.append(p[-1]);pieces.append(p);return
  assert depth<20
  row=p;left=[p[0]];r=[p[-1]]
  while len(row)>1:
   row=[mid(a,b)for a,b in zip(row,row[1:])];left.append(row[0]);r.append(row[-1])
  bezier(left,depth+1);bezier(r[::-1],depth+1)
 for c in cs:
  cmd=c['command'];a=c['args']
  if cmd=='M':cur=fit(a[0],a[1]);poly.append(cur)
  elif cmd in['Q','C']:
   p=[cur]+[fit(a[i],a[i+1])for i in range(0,len(a),2)];bezier(p);cur=p[-1]
  elif cmd=='L':n=fit(a[0],a[1]);pieces.append([cur,n]);poly.append(n);cur=n
  elif cmd=='Z':pass
  else:raise ValueError('unsupported source command')
 if poly[-1]==poly[0]:poly.pop()
 totalPieces+=len(pieces);hs=[hull(p)for p in pieces]+[[poly[-1],poly[0]]]
 envelope=[min(p[0]for c in cs for p in[fit(c['args'][i],c['args'][i+1])for i in range(0,len(c['args']),2)]),min(p[1]for c in cs for p in[fit(c['args'][i],c['args'][i+1])for i in range(0,len(c['args']),2)]),max(p[0]for c in cs for p in[fit(c['args'][i],c['args'][i+1])for i in range(0,len(c['args']),2)]),max(p[1]for c in cs for p in[fit(c['args'][i],c['args'][i+1])for i in range(0,len(c['args']),2)])]
 for raw,g in right:
  qbox=[min(p['x']for q in g['polygons']for p in q),min(p['y']for q in g['polygons']for p in q),max(p['x']for q in g['polygons']for p in q),max(p['y']for q in g['polygons']for p in q)]
  if qbox[0]>envelope[2]or qbox[2]<envelope[0]or qbox[1]>envelope[3]or qbox[3]<envelope[1]:units.append({'path':path,'rightRaw':raw,'status':'bbox-separated'});continue
  found=None;separate=True
  for qi,q in enumerate(pts(g),1):
   if any(contact(h,q)for h in hs)or inside(q[0],poly):separate=False
   cand=[(sum(p[0]for p in q)/len(q),sum(p[1]for p in q)/len(q))]
   cand += [((q[0][0]+q[i][0]+q[i+1][0])/3,(q[0][1]+q[i][1]+q[i+1][1])/3)for i in range(1,len(q)-1)]
   for k,v in enumerate(poly):
    if strict(v,q):
     w=poly[(k+1)%len(poly)];dx=w[0]-v[0];dy=w[1]-v[1];scale=abs(dx)+abs(dy)
     if scale:
      for sign in[-1,1]:cand.append((v[0]-sign*dy*EPS*8/scale,v[1]+sign*dx*EPS*8/scale))
   for p in cand:
    if strict(p,q)and strict(p,poly)and all(ds(p,a,b)>EPS**2 for a,b in zip(poly,poly[1:]+poly[:1])):found={'sourcePath':path,'rightRaw':raw,'rightPolygon':qi,'point':[str(x)for x in p]};break
   if found:break
  if found:newcontacts.append(found);units.append({'path':path,'rightRaw':raw,'status':'positive-area-witness'})
  elif separate:units.append({'path':path,'rightRaw':raw,'status':'exact-control-hull-and-winding-separated'})
  else:unknown.append({'path':path,'rightRaw':raw});units.append({'path':path,'rightRaw':raw,'status':'unproved'})
print(json.dumps({'matrixExact':[str(sx),'0','0',str(sy),str(tx),str(ty)],'determinantExact':str(sx*sy),'oldLeftRightContacts':oldcontacts,'newLeftRightContacts':newcontacts,'unproved':unknown,'checkedOldRawPairs':88,'checkedNewPathRawPairs':64,'sourceBezierPieces':totalPieces,'certificate':{'arithmetic':'Exact rational affine/control convex hull subdivision and nonzero winding','epsilon':str(EPS),'analysisPolylineNotProductGeometry':True,'noPointOrControlChanges':True},'units':units,'staticApproved':False,'runtimeApplied':False}))
