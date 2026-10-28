import json,hashlib
from pathlib import Path
from decimal import Decimal
from fractions import Fraction as F
SOURCE="/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch126-2026-09-27/engine-proof.json"
raw=Path(SOURCE).read_bytes();assert hashlib.sha256(raw).hexdigest()=="fef26dbd710dac54ff97f9040e0636f5e3f45fd0687ee47f46f8ae5e444e2242"
s=json.loads(raw,parse_float=Decimal)
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def on(p,a,b):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def edges(p):return list(zip(p,p[1:]+p[:1]))
def intersect(a,b,c,d):
 c1,c2,c3,c4=cross(a,b,c),cross(a,b,d),cross(c,d,a),cross(c,d,b)
 return c1*c2<0 and c3*c4<0 or on(a,c,d)or on(b,c,d)or on(c,a,b)or on(d,a,b)
def relation(p,poly):
 if any(on(p,a,b)for a,b in edges(poly)):return 0
 w=0
 for a,b in edges(poly):
  if a[1]<=p[1]<b[1]and cross(a,b,p)>0:w+=1
  if b[1]<=p[1]<a[1]and cross(a,b,p)<0:w-=1
 return 1 if w else -1
def contact(p,q):return any(intersect(a,b,c,d)for a,b in edges(p)for c,d in edges(q))or any(relation(v,q)>=0 for v in p)or any(relation(v,p)>=0 for v in q)
def clean(p):
 a=[]
 for v in p:
  if not a or a[-1]!=v:a.append(v)
 if len(a)>1 and a[0]==a[-1]:a.pop()
 return a
def simple(p):
 e=edges(p)
 return len(p)>=3 and all(not intersect(a,b,c,d)for i,(a,b)in enumerate(e)for j,(c,d)in enumerate(e)if i<j and j!=i+1 and not(i==0 and j==len(e)-1))
def area2(p):return sum((a[0]*b[1]-b[0]*a[1]for a,b in edges(p)),F(0))if p else F(0)
def convex(p):return len(p)>=3 and all(cross(p[i],p[(i+1)%len(p)],p[(i+2)%len(p)])>=0 for i in range(len(p)))
def clip(subject,clipper):
 out=subject
 for a,b in edges(clipper):
  incoming,out=out,[]
  if not incoming:break
  v=incoming[-1]
  for w in incoming:
   cv,cw=cross(a,b,v),cross(a,b,w);vi,wi=cv>=0,cw>=0
   if wi:
    if not vi:
     t=cv/(cv-cw);out.append((v[0]+t*(w[0]-v[0]),v[1]+t*(w[1]-v[1])))
    out.append(w)
   elif vi:
    t=cv/(cv-cw);out.append((v[0]+t*(w[0]-v[0]),v[1]+t*(w[1]-v[1])))
   v=w
 return clean(out)
groups={i+1:[clean([(F(v['x']),F(v['y']))for v in p])for p in g['polygons']]for i,g in enumerate(s['groups'])}
assert len(groups)==10 and sum(len(ps)for ps in groups.values())==23
assert all(v['off']==0 for g in s['groups']for p in g['polygons']for v in p)
assert all(simple(p)for ps in groups.values()for p in ps)
def ears(poly):
 p=clean(poly)
 changed=True
 while changed and len(p)>3:
  changed=False
  for i in range(len(p)):
   a,b,c=p[(i-1)%len(p)],p[i],p[(i+1)%len(p)]
   if on(b,a,c):p.pop(i);changed=True;break
 if area2(p)<0:p=list(reversed(p))
 out=[]
 while len(p)>3:
  for i in range(len(p)):
   a,b,c=p[(i-1)%len(p)],p[i],p[(i+1)%len(p)]
   if cross(a,b,c)<=0:continue
   if any(j not in[(i-1)%len(p),i,(i+1)%len(p)]and cross(a,b,x)>=0 and cross(b,c,x)>=0 and cross(c,a,x)>=0 for j,x in enumerate(p)):continue
   out.append([a,b,c]);p.pop(i);break
  else:raise ValueError('exact ear decomposition blocked')
 out.append(p);assert sum(abs(area2(t))for t in out)==abs(area2(poly));return out
def exact_area(p,q):return sum((abs(area2(clip(a,b)))/2 for a in ears(p)for b in ears(q)),F(0))
trace=json.loads(Path("/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch126-2026-09-27/draw-trace.json").read_text(),parse_float=Decimal)
groups[6]=[[(x,F(89,93)*y+F(130,31))for x,y in p]for p in groups[6]]
def distance2(p,a,b):
 d=(b[0]-a[0],b[1]-a[1]);den=d[0]**2+d[1]**2;t=max(F(0),min(F(1),((p[0]-a[0])*d[0]+(p[1]-a[1])*d[1])/den))if den else F(0);return sum((p[i]-a[i]-t*d[i])**2 for i in range(2))

def vertical(poly,x):
 ys=set()
 for a,b in edges(poly):
  if min(a[0],b[0])<=x<=max(a[0],b[0]):
   if a[0]==b[0]:ys.update([a[1],b[1]])
   else:ys.add(a[1]+(x-a[0])*(b[1]-a[1])/(b[0]-a[0]))
 ys=sorted(ys);out=[(y,y)for y in ys if relation((x,y),poly)>=0]
 out +=[(a,b)for a,b in zip(ys,ys[1:])if relation((x,(a+b)/2),poly)>=0]
 return out
def merge(xs):
 out=[]
 for a,b in sorted(xs):
  if out and a<=out[-1][1]:out[-1]=(out[-1][0],max(out[-1][1],b))
  else:out.append((a,b))
 return out
def crossingX(a,b,c,d):
 ab=(b[0]-a[0],b[1]-a[1]);cd=(d[0]-c[0],d[1]-c[1]);den=ab[0]*cd[1]-ab[1]*cd[0]
 if not den:return None
 ac=(c[0]-a[0],c[1]-a[1]);t=(ac[0]*cd[1]-ac[1]*cd[0])/den;u=(ac[0]*ab[1]-ac[1]*ab[0])/den
 return a[0]+t*ab[0]if 0<=t<=1 and 0<=u<=1 else None
rows=[]
for logical,pr,nx in [(6,6,7),(7,8,9)]:
 ps=groups[nx];xs={p[0]for poly in ps for p in poly};es=[e for p in ps for e in edges(p)]
 for a,b in es:
  for c,d in es:
   x=crossingX(a,b,c,d)
   if x is not None:xs.add(x)
 xs=sorted(xs);testxs=sorted(set(xs+[(a+b)/2 for a,b in zip(xs,xs[1:])]))
 violations=[]
 for x in testxs:
  ints=merge([i for poly in ps for i in vertical(poly,x)])
  if len(ints)!=1:violations.append({'x':str(x),'intervals':[[str(a),str(b)]for a,b in ints]})
 contacts=[]
 for p in groups[pr]:
  for q in ps:
   for a in ears(p):
    for b in ears(q):
     c=clip(a,b);ar=abs(area2(c))/2
     if ar:contacts.append((ar,c))
 ar,c=max(contacts,key=lambda x:x[0]);seed=tuple(sum(v[i]for v in c)/len(c)for i in [0,1]);assert any(relation(seed,p)==1 for p in ps)and any(relation(seed,p)==1 for p in groups[pr])
 priorConnections=[[i+1,j+1]for i,p in enumerate(groups[pr])for j,q in enumerate(groups[pr])if i<j and contact(p,q)]
 rows.append({'logical':logical,'priorRaw':pr,'nextRaw':nx,'nextSourcePCount':len(ps),'criticalXSlices':len(xs),'criticalAndOpenIntervalSliceChecks':len(testxs),'xMonotoneUnionProved':not violations,'violations':violations,'seed200':[str(v)for v in seed],'seedFromPositiveConvexIntersectionArea200':str(ar),'seedStrictlyInsideBothFilledSets':True,'nextBBox200':[str(min(v[i]for p in ps for v in p))for i in [0,1]]+[str(max(v[i]for p in ps for v in p))for i in [0,1]],'priorPContactEdges':priorConnections})
print(json.dumps({'rows':rows,'method':'Exact rational vertical union intervals at all sourcevertex and all sourceedge-crossing x coordinates plus every intervening open interval midpoint; crosssection topology is constant between these events. Positive convex intersection interior centroid is the contact seed.','nativeApproval':False}))
