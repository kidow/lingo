# Existing exact source-foot generator adapted only to three original 硜 QQ pieces.
# Do not rerun unchanged successful proof. No source engine or browser is invoked.
def prove(RAW,CUT,GX0,GX1,GY0,GY1):
 # Existing successful 澐 exact source-foot generator, retained for new-source adaptation.
 # Do not execute unchanged: that would repeat the already successful 澐 certificate.
 
 from pathlib import Path
 from fractions import Fraction as F
 import json,re,hashlib
 r=Path(__file__).resolve().parents[2]
 proofPath='docs/hanja-source-original-full-u785c-2026-10-23/engine-proof.json'
 full=json.loads((r/proofPath).read_text());calls=full['trace']; current=calls[RAW][0]; previous=calls[RAW-1][0]
 assert current['kind']==previous['kind']=='cdDrawCurve'
 assert current['args'][0]<current['args'][2]<current['args'][4]
 assert current['args'][1]<current['args'][3]<current['args'][5]
 assert all(q['off']==0 for c in [current,previous] for p in c['polygons'] for q in p)
 P=[[(F(str(q['x']))/2,F(str(q['y']))/2)for q in poly]for poly in current['polygons']]
 A=[[(F(str(q['x']))/2,F(str(q['y']))/2)for q in poly]for poly in previous['polygons']]
 cut=F(CUT)
 endpoint=tuple(F(str(v))/2 for v in previous['args'][4:6])
 def edges(p):return list(zip(p,p[1:]+p[:1]))
 def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
 def on(p,a,b):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0]) and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
 def area(p):return abs(sum(a[0]*b[1]-b[0]*a[1] for a,b in edges(p)))/2
 def inside(p,poly,strict=False):
  if any(on(p,a,b) for a,b in edges(poly)):return not strict
  c=False
  for a,b in edges(poly):
   if (a[1]>p[1])!=(b[1]>p[1]):
    x=a[0]+(p[1]-a[1])*(b[0]-a[0])/(b[1]-a[1])
    if x>p[0]:c=not c
  return c
 def intersect(a,b,c,d):
  den=(b[0]-a[0])*(d[1]-c[1])-(b[1]-a[1])*(d[0]-c[0])
  if den==0:return []
  t=((c[0]-a[0])*(d[1]-c[1])-(c[1]-a[1])*(d[0]-c[0]))/den
  u=((c[0]-a[0])*(b[1]-a[1])-(c[1]-a[1])*(b[0]-a[0]))/den
  return [(a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1]))] if 0<=t<=1 and 0<=u<=1 else []
 E=[e for p in P for e in edges(p)]
 X={x for p in P for x,y in p}|{cut}
 for i,e in enumerate(E):
  for e2 in E[i+1:]:
   for q in intersect(*e,*e2):X.add(q[0])
 X=sorted(X)
 def yline(e,x):a,b=e;return a[1]+(x-a[0])*(b[1]-a[1])/(b[0]-a[0])
 def intervals(mid):
  ints=[]
  for p in P:
   q=[(yline(e,mid),e) for e in edges(p) if min(e[0][0],e[1][0])<mid<max(e[0][0],e[1][0])]
   q.sort(key=lambda t:t[0]);assert len(q)%2==0
   ints += [(q[i],q[i+1]) for i in range(0,len(q),2)]
  ints.sort(key=lambda t:t[0][0]);out=[]
  for lo,hi in ints:
   if out and lo[0]<=out[-1][1][0]:
    if hi[0]>out[-1][1][0]:out[-1]=(out[-1][0],hi)
   else:out.append((lo,hi))
  return out
 slabs=[];tris=[]
 for left,right in zip(X,X[1:]):
  mid=(left+right)/2;ivs=intervals(mid);cells=[]
  for low,high in ivs:
   p=[(left,yline(low[1],left)),(right,yline(low[1],right)),(right,yline(high[1],right)),(left,yline(high[1],left))]
   assert area(p)>0
   cells.append(p)
   if right<=cut:
    for t in [[p[0],p[1],p[2]],[p[0],p[2],p[3]]]:
     if area(t)>0:tris.append(t)
  slabs.append({'left':left,'right':right,'cells':cells})
 def shared(t,u):
  for a,b in edges(t):
   for c,d in edges(u):
    if cross(a,b,c)==cross(a,b,d)==0:
     q=sorted(set(v for v in [a,b,c,d] if on(v,a,b) and on(v,c,d)))
     if len(q)>=2 and q[0]!=q[-1]:return(q[0],q[-1])
  return None
 root=None
 for i,t in enumerate(tris):
  for den in [3,5,11,23]:
   if root is not None:break
   for i0 in range(1,den-1):
    for i1 in range(1,den-i0):
     i2=den-i0-i1
     if i2<=0:continue
     q=tuple((i0*t[0][k]+i1*t[1][k]+i2*t[2][k])/den for k in range(2))
     if any(inside(q,a,True) for a in A):
      assert inside(q,t,True)
      root=(i,q);break
    if root is not None:break
  if root is not None:break
 assert root is not None,'No strict seed in actual previous full mask and first triangle'
 order=[{'triangle':root[0],'seed':root[1],'priorTriangle':None,'shared':None}];seen={root[0]};queue=[root[0]]
 while queue:
  i=queue.pop(0)
  for j,t in enumerate(tris):
   if j in seen:continue
   edge=shared(tris[i],t)
   if edge:
    seed=tuple((edge[0][k]+edge[1][k])/2 for k in range(2));assert on(seed,*edge)
    order.append({'triangle':j,'seed':seed,'priorTriangle':i,'shared':edge});seen.add(j);queue.append(j)
 assert len(seen)==len(tris),'Foot union triangles not edge-connected'
 footarea=sum(map(area,tris));totalarea=sum(area(c) for s in slabs for c in s['cells'])
 assert 0<footarea<totalarea
 body=[s for s in slabs if s['left']>=cut]
 assert all(len(s['cells'])==1 for s in body),'Later x-prefix could expose detached components'
 for s in body:
  p=s['cells'][0]
  assert p[3][1]>p[0][1],'Later cell must have positive left cross-section'
 for s,t in zip(body,body[1:]):
  a=s['cells'][0];b=t['cells'][0]
  assert a[1][0]==b[0][0]
  assert min(a[2][1],b[3][1])>max(a[1][1],b[0][1]),'Adjacent body slabs must share positive vertical interval'
 lastfoot=[s for s in slabs if s['right']==cut][0]['cells']
 firstbody=body[0]['cells'][0]
 assert any(min(c[2][1],firstbody[3][1])>max(c[1][1],firstbody[0][1]) for c in lastfoot),'Foot/body frontier must share positive interval'
 def rat(x):return[str(x.numerator),str(x.denominator)]
 def point(p):return[rat(x) for x in p]
 triAreas=[area(t) for t in tris]
 DATA={'cutX':rat(cut),'phaseShare':rat(footarea/totalarea),'triangles':[[point(q) for q in t] for t in tris],'order':[dict(triangle=o['triangle'],seed=point(o['seed']),priorTriangle=o['priorTriangle'],shared=None if o['shared'] is None else [point(q) for q in o['shared']]) for o in order],'weights':[rat(triAreas[o['triangle']]/footarea) for o in order],'footArea':rat(footarea),'totalArea':rat(totalarea)}
 
 
 # New display partition: exact same original-P union, wider cut and ear clipping.
 code_marker=True
 V=sorted(set(q for t in tris for q in t))
 counts={};direct={}
 for t in tris:
  if cross(t[0],t[1],t[2])<0:t=[t[0],t[2],t[1]]
  for a,b in edges(t):
   pts=sorted([q for q in V if on(q,a,b)],key=lambda q:(q[0]-a[0])**2+(q[1]-a[1])**2)
   for u,v in zip(pts,pts[1:]):
    key=tuple(sorted((u,v)));counts[key]=counts.get(key,0)+1;direct[key]=(u,v)
 assert all(n in [1,2] for n in counts.values())
 be=[direct[k] for k,n in counts.items() if n==1]
 nxt={}
 for a,b in be:assert a not in nxt;nxt[a]=b
 start=min(nxt);boundary=[start];p=nxt[start]
 while p!=start:boundary.append(p);p=nxt[p];assert len(boundary)<=len(be)
 assert len(boundary)==len(be)
 changed=True
 while changed:
  changed=False
  for i in range(len(boundary)):
   a,b,c=boundary[i-1],boundary[i],boundary[(i+1)%len(boundary)]
   if cross(a,b,c)==0:boundary.pop(i);changed=True;break
 assert area(boundary)==footarea
 def earclip(poly):
  poly=poly[:];out=[]
  while len(poly)>3:
   found=False
   for i in range(len(poly)):
    tri=[poly[i-1],poly[i],poly[(i+1)%len(poly)]]
    if cross(*tri)<=0:continue
    if any(inside(q,tri) for j,q in enumerate(poly) if j not in [(i-1)%len(poly),i,(i+1)%len(poly)]):continue
    out.append(tri);poly.pop(i);found=True;break
   assert found,'no exact ear'
  out.append(poly);return out
 wide=earclip(boundary)
 assert sum(map(area,wide))==footarea
 def segdist2(q,a,b):
  v=(b[0]-a[0],b[1]-a[1]);vv=v[0]**2+v[1]**2;t=((q[0]-a[0])*v[0]+(q[1]-a[1])*v[1])/vv
  t=max(F(0),min(F(1),t));u=(a[0]+t*v[0],a[1]+t*v[1])
  return(q[0]-u[0])**2+(q[1]-u[1])**2
 # Finite grid is a witness search only. Selected witness is checked exactly.
 candidates=[]
 for i,t in enumerate(wide):
  for xi in range(GX0,GX1):
   for yi in range(GY0,GY1):
    q=(F(xi,20),F(yi,20))
    if inside(q,t,True) and any(inside(q,a,True) for a in A) and sum((q[k]-endpoint[k])**2 for k in [0,1]) < F(6)**2:
     d=min(segdist2(q,a,b) for a,b in edges(t)+[e for p in A for e in edges(p)])
     candidates.append((d,i,q))
 assert candidates
 margin,rooti,seed=max(candidates)
 assert margin>0
 # Ear decomposition original union, BFS attaches each new full triangle on a
 # positive edge; initial root has a strict interior overlap with actual prior P.
 tris=wide;root=(rooti,seed);order=[{'triangle':rooti,'seed':seed,'priorTriangle':None,'shared':None}];seen={rooti};queue=[rooti]
 while queue:
  i=queue.pop(0)
  for j,t in enumerate(tris):
   if j in seen:continue
   edge=shared(tris[i],t)
   if edge:
    q=tuple((edge[0][k]+edge[1][k])/2 for k in range(2))
    order.append({'triangle':j,'seed':q,'priorTriangle':i,'shared':edge});seen.add(j);queue.append(j)
 assert len(seen)==len(tris)
 triAreas=[area(t) for t in tris]
 DATA={'cutX':rat(cut),'phaseShare':rat(footarea/totalarea),'boundary':[point(q) for q in boundary],'triangles':[[point(q) for q in t] for t in tris],'order':[dict(triangle=o['triangle'],seed=point(o['seed']),priorTriangle=o['priorTriangle'],shared=None if o['shared'] is None else [point(q) for q in o['shared']]) for o in order],'weights':[rat(triAreas[o['triangle']]/footarea) for o in order],'footArea':rat(footarea),'totalArea':rat(totalarea),'strictRootMarginSquared':rat(margin)}
 
 assert margin>F(9,100)
 assert sum((seed[k]-endpoint[k])**2 for k in [0,1]) < (F(7)-F(3,10))**2
 return {'raw':RAW,'cut':CUT,'data':DATA,'slabs':len(slabs),'footTriangles':len(tris),'bodySlabs':len(body),'marginSquared':str(margin),'seed':[str(x) for x in seed]}
if __name__=='__main__':
 import json
 results=[prove(raw,cut,x0,x1,755,800) for raw,cut,x0,x1 in [(8,'45',825,880),(10,'123/2',1150,1210),(12,'155/2',1470,1530)]]
 print(json.dumps(results,separators=(',',':')))
