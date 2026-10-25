# New 葯 source inputs only; existing pure source-foot sufficient conditions.
from pathlib import Path
from fractions import Fraction as F
import json,re,hashlib
r=Path('/Users/kidow/Documents/dev/kidow/lingo')
fixturePath='docs/hanja-source-original-u846f-hkcs-2026-10-25/fixtures.json'
f=json.loads((r/fixturePath).read_text())['hkcs_m846f']
def prove(pen,mask,cut):
 seg=f['strokes'][pen-1][mask-1];prior=f['strokes'][pen-1][mask-2]
 def polys(s):
  out=[]
  for t in s.split('M')[1:]:
   a=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',t)))
   assert len(a)%2==0
   out.append([(a[i],a[i+1]) for i in range(0,len(a),2)])
  return out
 P=polys(seg['outline']);A=polys(prior['outline'])
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
 def segdist2(q,a,b):
  v=(b[0]-a[0],b[1]-a[1]);vv=v[0]**2+v[1]**2;t=((q[0]-a[0])*v[0]+(q[1]-a[1])*v[1])/vv
  t=max(F(0),min(F(1),t));p=(a[0]+t*v[0],a[1]+t*v[1]);return sum((q[i]-p[i])**2 for i in[0,1])
 margin=max(min(segdist2(root[1],a,b)for a,b in edges(tris[root[0]])+edges(poly))for poly in A if inside(root[1],poly,True));assert margin>0
 DATA.update({'pen':pen,'mask':mask,'sourceSegmentSHA256':hashlib.sha256(json.dumps(seg,separators=(',',':')).encode()).hexdigest(),'priorSegmentSHA256':hashlib.sha256(json.dumps(prior,separators=(',',':')).encode()).hexdigest(),'strictRootMarginSquared':rat(margin),'bodyBounds':[rat(v)for v in[cut,min(y for p in P for x,y in p),max(x for p in P for x,y in p),max(y for p in P for x,y in p)]],'bodySlabs':[{'left':rat(s['left']),'right':rat(s['right']),'cells':[[point(v)for v in c]for c in s['cells']]}for s in body],'sourceGuideChanged':False,'sourcePChanged':False,'nativeApproval':False})
 return DATA
out={'schema':'hanja-original-source-foot-candidate-proof/v1','date':'2026-10-25','glyph':'葯','root':'hkcs_m846f','fixture':fixturePath,'fixtureSHA256':hashlib.sha256((r/fixturePath).read_bytes()).hexdigest(),'geometrySHA256':'d3f1ed65d1a64d2ecc49b7839f696c8912cc3c6d75f5ffdb411abb1a4281f66d','newCases':[],'sourceEngineProjectionReplay':0,'nativeApproval':False,'runtimeApplied':False}
for pen,mask,cut in[(5,2,F(17)),(6,2,F(17))]:
 try:out['newCases'].append({'pen':pen,'mask':mask,'cut':str(cut),'passed':True,'certificate':prove(pen,mask,cut)})
 except AssertionError as e:out['newCases'].append({'pen':pen,'mask':mask,'cut':str(cut),'passed':False,'reason':str(e)})
print(json.dumps(out,separators=(',',':')))
