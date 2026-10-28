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

row=next(r for r in rows if r['logical']==7);donorpts=[tuple(F(v)for v in p)for p in row['sourcePoints']];targets=[tuple(F(v)/2 for v in trace[7][0]['args'][:2]),tuple(F(v)/2 for v in trace[7][0]['args'][4:6]),tuple(F(v)/2 for v in trace[8][0]['args'][:2]),tuple(F(v)/2 for v in trace[8][0]['args'][4:6])]
def sim(s0,s1,t0,t1):
 u=tuple(s1[i]-s0[i]for i in[0,1]);v=tuple(t1[i]-t0[i]for i in[0,1]);den=sum(x*x for x in u);a=(v[0]*u[0]+v[1]*u[1])/den;b=(v[1]*u[0]-v[0]*u[1])/den;return(a,b,-b,a,t0[0]-a*s0[0]+b*s0[1],t0[1]-b*s0[0]-a*s0[1])
parts=[];whole=[]
for lo,hi,i in[(0,3,0),(3,4,1),(4,5,2)]:
 m=sim(donorpts[lo],donorpts[hi],targets[i],targets[i+1]);placed=[transform(m,p)for p in donorpts[lo:hi+1]];assert placed[0]==targets[i]and placed[-1]==targets[i+1];det=m[0]*m[3]-m[1]*m[2];assert det>0
 if whole:assert whole[-1]==placed[0];whole.extend(placed[1:])
 else:whole=placed
 parts.append({'donorIndicesZeroBased':list(range(lo,hi+1)),'matrixExact':list(map(str,m)),'determinantExact':str(det),'receiverStart100':list(map(str,targets[i])),'receiverEnd100':list(map(str,targets[i+1])),'placed100':[[str(x),str(y)]for x,y in placed]})
ps=[[tuple(F(v)for v in p)for p in poly]for poly in row['sourceP']];tip,head=targets[1:3];V=tuple(head[i]-tip[i]for i in[0,1]);positiveVertices=[]
for poly in ps:
 for a,b in edges(poly):
  da=sum((a[i]-tip[i])*V[i]for i in[0,1]);db=sum((b[i]-tip[i])*V[i]for i in[0,1]);
  if da>=0:positiveVertices.append(a)
  if(da<0<db)or(db<0<da):
   t=da/(da-db);positiveVertices.append(tuple(a[i]+t*(b[i]-a[i])for i in[0,1]))
maxsq,witness=max((sum((p[i]-tip[i])**2 for i in[0,1]),p)for p in positiveVertices);R=F(12);repositionNoNewInk=maxsq<=R*R
ds=[(min(dseg(p,a,b)for a,b in zip(whole,whole[1:])),p)for poly in ps for p in poly];maxd,w=max(ds)
rows=[r for r in rows if r['logical']==7];rows[0]['placedPoints100']=[[str(x),str(y)]for x,y in whole]
cover=[]
for row in rows:
 mapped=[tuple(F(v)for v in p)for p in row['placedPoints100']];ps=[[tuple(F(v)for v in p)for p in poly]for poly in row['sourceP']];radius=12;triangles=[t for p in ps for t in ears(p)];stack=[(t,0)for t in triangles];nodes=0;maxdepth=0;maxbound=0;unproved=False
 while stack:
  tri,depth=stack.pop();nodes+=1;maxdepth=max(maxdepth,depth);center=tuple(sum(p[i]for p in tri)/3 for i in [0,1]);dist=math.sqrt(float(min(dseg(center,a,b)for a,b in zip(mapped,mapped[1:]))));bound=dist+max(math.sqrt(float(sum((p[i]-center[i])**2 for i in [0,1])))for p in tri)+1e-8
  if bound<=radius:maxbound=max(maxbound,bound);continue
  if depth>=16 or nodes>=60000:unproved=True;break
  a,b,c=tri;ab=tuple((a[i]+b[i])/2 for i in [0,1]);bc=tuple((b[i]+c[i])/2 for i in [0,1]);ca=tuple((c[i]+a[i])/2 for i in [0,1]);stack.extend([(t,depth+1)for t in[(a,ab,ca),(ab,b,bc),(ca,bc,c),(ab,bc,ca)]])
 cover.append({'logical':7,'radius':12,'status':'UNPROVED'if unproved else'PASS-CONSERVATIVE-FULL-P-COVERAGE','nodes':nodes,'maxDepth':maxdepth,'maxAcceptedUpperDistance':maxbound})

def gatepoly(poly,unit,cut):
 if cut is None:return poly
 out=[]
 if not poly:return out
 a=poly[-1];da=sum(a[i]*unit[i]for i in [0,1])-cut
 for b in poly:
  db=sum(b[i]*unit[i]for i in [0,1])-cut;ia=da<=0;ib=db<=0
  if ia!=ib:
   t=da/(da-db);out.append(tuple(a[i]+t*(b[i]-a[i])for i in [0,1]))
  if ib:out.append(b)
  a=b;da=db
 return clean(out)
def dp(p,poly):
 if not poly:return None
 if len(poly)>=3 and relation(p,poly)>=0:return F(0)
 return min(dseg(p,a,b)for a,b in edges(poly))
def ds(poly,a,b):
 if len(poly)>=3 and(relation(a,poly)>=0 or relation(b,poly)>=0):return F(0)
 if any(intersect(a,b,c,d)for c,d in edges(poly)):return F(0)
 return min([dseg(p,a,b)for p in poly]+[dp(a,poly),dp(b,poly)])
reports=[]
for row in rows:
 guide=[tuple(F(str(float(F(v))))for v in p)for p in row['placedPoints100']];ps=[[tuple(F(v)for v in p)for p in poly]for poly in row['sourceP']];triangles=[t for p in ps for t in ears(p)];R=F(12);v=tuple(guide[1][i]-guide[0][i]for i in [0,1]);ln=math.hypot(*map(float,v));unit=tuple(F(str(float(x)/ln))for x in v);padded=tuple(guide[0][i]-R*unit[i]for i in [0,1]);path=[padded]+guide;lengths=[math.hypot(*[float(b[i]-a[i])for i in [0,1]])for a,b in zip(path,path[1:])];total=sum(lengths);until=12/(total+1e-9);minimum=min(sum(p[i]*unit[i]for i in[0,1])for poly in ps for p in poly);first=sum(guide[0][i]*unit[i]for i in[0,1]);pairs=[]
 for i,a in enumerate(triangles):
  for j in range(i+1,len(triangles)):
   common=clip(a,triangles[j])
   if common:pairs.append((i,j,common))
 checks=[]
 for progress in [0,0.000001,.001,.01,.03,.1,until-1e-8,until,until+1e-8,.25,.35,.4,.45,.475,.49,.5,.51,.55,.6,.625,.75,.95,.99999999,1]:
  if progress==0:checks.append({'p':0,'visibleComponents':0,'idealPositiveArea':0});continue
  remain=progress*total;caps=[]
  for a,b,L in zip(path,path[1:],lengths):
   if remain<=0:break
   t=min(1,remain/L);end=tuple(a[i]+F(str(t))*(b[i]-a[i])for i in[0,1]);caps.append((a,end));remain-=L
  cut=None if progress>=until else minimum+(first+R-minimum)*F(str(progress/until));clipped=[gatepoly(t,unit,cut)for t in triangles];active=set()
  for i,t in enumerate(clipped):
   if len(t)<3 or area2(t)==0:continue
   for j,(a,b)in enumerate(caps):
    if ds(t,a,b)<R*R:active.add((i,j))
  links={n:[]for n in active}
  def join(a,b):
   if a in active and b in active:links[a].append(b);links[b].append(a)
  for i,j,common in pairs:
   region=gatepoly(common,unit,cut)
   if not region:continue
   for k,(a,b)in enumerate(caps):
    if(i,k)in active and(j,k)in active and ds(region,a,b)<R*R:join((i,k),(j,k))
  for i,t in enumerate(clipped):
   if not t:continue
   for k in range(len(caps)-1):
    if(i,k)in active and(i,k+1)in active and dp(caps[k][1],t)<R*R:join((i,k),(i,k+1))
  unseen=set(active);components=0;sizes=[]
  while unseen:
   components+=1;stack=[unseen.pop()];size=0
   while stack:
    n=stack.pop();size+=1
    for q in links[n]:
     if q in unseen:unseen.remove(q);stack.append(q)
   sizes.append(size)
  checks.append({'p':progress,'visibleComponentsUpperBound':components,'activeConvexCells':len(active),'componentCellCounts':sizes,'gateReleased':cut is None})
 reports.append({'logical':row['logical'],'width':24,'padding':12,'until':until,'sourceTriangles':len(triangles),'originalPositiveTriangleContacts':len(pairs),'finiteConnectedProofAll':all(c.get('visibleComponentsUpperBound',0)<=1 for c in checks),'checks':checks})
print(json.dumps({'finiteConnectivity':reports,'scope':'Sufficient finite convex-cell graph connectivity: sourceP ears clipped by start halfplane intersect each capsule are convex; exact Fraction polygon/segment distance and contact edges or common corner disks establish graph links. Binary64 placedguide/cap timing is rationalized; not a formal all-real-progress interval proof.','nativeApproval':False,'fullCoverage':cover}))
