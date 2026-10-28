import json,hashlib
from pathlib import Path
from decimal import Decimal
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/"docs/hanja-goal-glyphwiki-batch1056-2026-10-13/engine-whole-u91c1-ue0106.json"
raw=Path(SOURCE).read_bytes();assert hashlib.sha256(raw).hexdigest()=="259e4a48fc191f53f417ccc14969016808405b6566f6c5741a94a32e3b19fe6f"
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
groups={}
for i,g in enumerate(s['groups'],1):
 if i==29:continue
 assert all(v['off']==0 for p in g['polygons']for v in p)
 groups[i]=[clean([(F(v['x']),F(v['y']))for v in p])for p in g['polygons']]
body=groups[27][0];assert body==[(F(45),F(127)),(F(155),F(127)),(F(155),F(131)),(F(45),F(131))]
modified={};facts=[]
for index in[28,30]:
 ps=groups[index];lo=min(v[1]for p in ps for v in p);hi=max(v[1]for p in ps for v in p);a=(hi-F(130))/(hi-lo);b=hi*(1-a);assert a>0 and a*lo+b==130 and a*hi+b==hi
 qs=[[(x,a*y+b)for x,y in p]for p in ps];modified[index]=qs
 clips=[clip(p,body)for p in qs];areas=[abs(area2(p))/2 for p in clips];nonempty=[p for p in clips if area2(p)!=0];convexclips=all(convex(p if area2(p)>0 else list(reversed(p)))for p in nonempty);union=None
 if convexclips and len(nonempty)<=2:
  union=sum(areas,F(0))
  if len(nonempty)==2:union-=abs(area2(clip(nonempty[0],nonempty[1]if area2(nonempty[1])>0 else list(reversed(nonempty[1])))))/2
 facts.append({'raw':index,'sourceMinY':str(lo),'sourceMaxY':str(hi),'matrixExact':['1','0','0',str(a),'0',str(b)],'determinantExact':str(a),'newMinY':'130','newMaxY':str(hi),'bodyOverlapBand':'1','bodyPerPArea':[str(x)for x in areas],'bodyUnionAreaExact':str(union)if union is not None else None,'clippedContactPiecesConvex':convexclips,'guideAffineRequired':True})
all_before=[];all_after=[]
for i in[28,30]:
 for j,ps in groups.items():
  if j==i or j in[28,30]and j<i:continue
  before=any(contact(p,q)for p in groups[i]for q in ps)
  after=any(contact(p,q)for p in modified[i]for q in modified.get(j,ps))
  if before:all_before.append([i,j])
  if after:all_after.append([i,j])
new=[p for p in all_after if p not in all_before];lost=[p for p in all_before if p not in all_after]
non_simple=[{'raw':i,'P':j+1}for i,ps in groups.items()for j,p in enumerate(ps)if not simple(p)]
print(json.dumps({'facts':facts,'beforeContacts':all_before,'afterContacts':all_after,'newContacts':new,'lostContacts':lost,'nonSimpleOriginalPolygons':non_simple,'contactsExpectedOnly':new==[[28,27],[30,27]],'newGeometrySaved':False}))
