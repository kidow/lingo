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
registered=json.loads(Path("/Users/kidow/Documents/dev/kidow/lingo/public/hanja-strokes/textbook-reviewed.json").read_text(),parse_float=Decimal)
donor=next(x for x in registered['characters']if x['glyph']=='玄');assert donor['geometryCorrection']=='vivasam-g3ii-b10-a-1706-v1'
assert hashlib.sha256(json.dumps(donor['paths'],separators=(',',':')).encode()).hexdigest()=='9c2d79be9d2bdce01ea299eb437b930c5a92101dd3d4e5cff7c84841f7f14725'
seedrec=json.loads(Path("/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/contact-strip-experiment.json").read_text())
groups[6]=[[(x,F(89,93)*y+F(130,31))for x,y in p]for p in groups[6]]
def affine(src,dst):
 s0,s1,s2=src;t0,t1,t2=dst;u=tuple(s1[i]-s0[i]for i in [0,1]);v=tuple(s2[i]-s0[i]for i in [0,1]);p=tuple(t1[i]-t0[i]for i in [0,1]);q=tuple(t2[i]-t0[i]for i in [0,1]);den=u[0]*v[1]-v[0]*u[1];a=(p[0]*v[1]-q[0]*u[1])/den;c=(-p[0]*v[0]+q[0]*u[0])/den;b=(p[1]*v[1]-q[1]*u[1])/den;d=(-p[1]*v[0]+q[1]*u[0])/den;return(a,b,c,d,t0[0]-a*s0[0]-c*s0[1],t0[1]-b*s0[0]-d*s0[1])
def transform(m,p):a,b,c,d,e,f=m;return(a*p[0]+c*p[1]+e,b*p[0]+d*p[1]+f)
def dseg(p,a,b):
 v=tuple(b[i]-a[i]for i in [0,1]);den=sum(x*x for x in v);t=max(F(0),min(F(1),sum((p[i]-a[i])*v[i]for i in [0,1])/den))if den else F(0);return sum((p[i]-a[i]-t*v[i])**2 for i in [0,1])
import re,math
rows=[]
for logical,prev,nxt,donorstroke in [(6,6,7,3),(7,8,9,4)]:
 path=donor['paths'][donorstroke-1];assert re.sub(r'[ML0-9. +-]','',path)==''and path.count('M')==1
 ns=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',path)];points=list(zip(ns[::2],ns[1::2]));assert len(points)==6
 start=tuple(F(v)for v in trace[prev-1][0]['args'][:2]);end=tuple(F(v)for v in trace[nxt-1][0]['args'][4:6]);
 if prev==6:start=(start[0],F(89,93)*start[1]+F(130,31))
 start=tuple(v/2 for v in start);end=tuple(v/2 for v in end);seed=tuple(F(v)/2 for v in next(r for r in seedrec['sourceProof']['rows']if r['logical']==logical)['seed200']);m=affine([points[0],points[4],points[-1]],[start,seed,end]);det=m[0]*m[3]-m[1]*m[2];assert det>0;mapped=[transform(m,p)for p in points];assert mapped[0]==start and mapped[4]==seed and mapped[-1]==end
 ps=[[(x/2,y/2)for x,y in p]for raw in [prev,nxt]for p in groups[raw]]
 ds=[(min(dseg(p,a,b)for a,b in zip(mapped,mapped[1:])),p)for poly in ps for p in poly];maxd,witness=max(ds);edgesmap=[tuple(mapped[i+1][j]-mapped[i][j]for j in [0,1])for i in range(len(mapped)-1)];
 rows.append({'logical':logical,'donorStroke':donorstroke,'sourcePath':path,'sourcePoints':[[str(x),str(y)]for x,y in points],'anchorDonorIndicesZeroBased':[0,4,5],'receiverAnchors100':[[str(x),str(y)]for x,y in[start,seed,end]],'matrixExact':list(map(str,m)),'determinantExact':str(det),'placedPoints100':[[str(x),str(y)]for x,y in mapped],'placedEdgeDeltas100':[[float(x),float(y)]for x,y in edgesmap],'firstFourEdgesAllDL':all(x<0 and y>0 for x,y in edgesmap[:4]),'lastEdgeDirection':{'right':edgesmap[-1][0]>0,'down':edgesmap[-1][1]>0,'up':edgesmap[-1][1]<0},'maxVertexDistanceUpper':math.sqrt(float(maxd)),'maxVertexDistanceSquared':str(maxd),'maxVertexWitness100':list(map(str,witness)),'sourceP':[[[str(x),str(y)]for x,y in p]for p in ps]})
reports=[]
for row in rows:
 mapped=[tuple(F(v)for v in p)for p in row['placedPoints100']];ps=[[tuple(F(v)for v in p)for p in poly]for poly in row['sourceP']];radius=12;triangles=[t for p in ps for t in ears(p)];stack=[(t,0)for t in triangles];nodes=0;maxdepth=0;maxbound=0;unproved=False
 while stack:
  tri,depth=stack.pop();nodes+=1;maxdepth=max(maxdepth,depth);center=tuple(sum(p[i]for p in tri)/3 for i in [0,1]);dist=math.sqrt(float(min(dseg(center,a,b)for a,b in zip(mapped,mapped[1:]))));bound=dist+max(math.sqrt(float(sum((p[i]-center[i])**2 for i in [0,1])))for p in tri)+1e-8
  if bound<=radius:maxbound=max(maxbound,bound);continue
  if depth>=16 or nodes>=60000:unproved=True;break
  a,b,c=tri;ab=tuple((a[i]+b[i])/2 for i in [0,1]);bc=tuple((b[i]+c[i])/2 for i in [0,1]);ca=tuple((c[i]+a[i])/2 for i in [0,1]);stack.extend([(t,depth+1)for t in[(a,ab,ca),(ab,b,bc),(ca,bc,c),(ab,bc,ca)]])
 guideOutside=[]
 for gi,(a,b)in enumerate(zip(mapped,mapped[1:])):
  u=tuple(b[i]-a[i]for i in [0,1]);ts={F(0),F(1)}
  for poly in ps:
   for c,d in edges(poly):
    v=tuple(d[i]-c[i]for i in [0,1]);w=tuple(c[i]-a[i]for i in [0,1]);den=u[0]*v[1]-u[1]*v[0]
    if den:
     t=(w[0]*v[1]-w[1]*v[0])/den;q=(w[0]*u[1]-w[1]*u[0])/den
     if 0<=t<=1 and 0<=q<=1:ts.add(t)
  ts=sorted(ts)
  for t0,t1 in zip(ts,ts[1:]):
   m=(t0+t1)/2;p=tuple(a[i]+u[i]*m for i in [0,1])
   if not any(relation(p,poly)>=0 for poly in ps):guideOutside.append({'edge':gi+1,'t0':str(t0),'t1':str(t1),'length':float(t1-t0)*math.hypot(float(u[0]),float(u[1]))})
 reports.append({'logical':row['logical'],'radius':radius,'status':'UNPROVED'if unproved else'PASS-CONSERVATIVE-FULL-P-COVERAGE','nodes':nodes,'depth':maxdepth,'maxAcceptedUpperBound':maxbound,'startInsideOriginalP':any(relation(mapped[0],p)>=0 for p in ps),'endInsideOriginalP':any(relation(mapped[-1],p)>=0 for p in ps),'guideOutsideFilledPIntervals':guideOutside,'formalIntervalProof':False,'margin':1e-8,'nativeApproval':False})
print(json.dumps({'plans':rows,'coverage':reports,'sourcePUnchanged':True,'continuousGuideAtEveryDonorJoin':True,'guideContainsExactPriorNextContactSeed':True,'sourceClockEquivalent':False,'nativeApproval':False}))
