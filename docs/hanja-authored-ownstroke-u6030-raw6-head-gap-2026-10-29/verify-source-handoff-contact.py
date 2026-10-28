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
rows=[]
for logical,prev,nxt in [(6,6,7),(7,8,9)]:
 start=tuple(F(v)for v in trace[nxt-1][0]['args'][:2]);end=tuple(F(v)for v in trace[prev-1][0]['args'][4:6]);
 if prev==6:end=(end[0],F(89,93)*end[1]+F(130,31))
 ds=F(0)if any(relation(start,p)>=0 for p in groups[prev])else min(distance2(start,a,b)for p in groups[prev]for a,b in edges(p));radius=F(14);ip=[]
 for pi,p in enumerate(groups[prev]):
  for qi,q in enumerate(groups[nxt]):
   ar=exact_area(p,q)
   if ar>0:
    vs=[v for a in ears(p)for b in ears(q)for v in clip(a,b)]
    ip.append({'priorP':pi+1,'nextP':qi+1,'area200':str(ar),'contactBBox200':[str(min(v[i]for v in vs))for i in [0,1]]+[str(max(v[i]for v in vs))for i in [0,1]]})
 rows.append({'logical':logical,'priorRaw':prev,'nextRaw':nxt,'nextGuideStart200':list(map(str,start)),'priorGuideEnd200':list(map(str,end)),'startInsidePriorP':any(relation(start,p)>=0 for p in groups[prev]),'priorMinProjectionRelativeToNextFirstTangent':str(min(sum((p[i]-start[i])*(F(trace[nxt-1][0]['args'][i+2])-start[i])for i in range(2))for poly in groups[prev]for p in poly)),'distanceSquaredStartToPriorP200':str(ds),'distanceSquaredStartToPriorP100':str(ds/4),'radius7DiskAtOriginalGuideStartDisjointPriorP':ds>radius**2,'positiveContactPairs':ip})
print(json.dumps({'rows':rows,'scope':'Source200 positiveP contact and startpoint-distance only. Not actual progressive mask/image proof.'}))
