"""Verify only the fixed new 逭 certificate; no witness/coverage search or projection."""
from pathlib import Path
from fractions import Fraction as F
import hashlib,json,re,copy
R=Path(__file__).resolve().parents[2]
HERE=Path(__file__).parent
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def polys(s):
 out=[]
 for p in s.split('M')[1:]:
  n=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',p)))
  out.append(list(zip(n[::2],n[1::2])))
 return out
def edges(p):return list(zip(p,p[1:]+p[:1]))
def cross(a,b,c):return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def area(p):return sum(a[0]*b[1]-b[0]*a[1]for a,b in edges(p))/2
def inside(p,poly,strict=False):
 on=lambda a,b:cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0]) and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
 if any(on(a,b)for a,b in edges(poly)):return not strict
 c=False
 for a,b in edges(poly):
  if (a[1]>p[1])!=(b[1]>p[1]) and a[0]+(p[1]-a[1])*(b[0]-a[0])/(b[1]-a[1])>p[0]:c=not c
 return c
def sd(p,a,b):
 v=tuple(b[i]-a[i]for i in [0,1]);u=max(F(0),min(F(1),sum((p[i]-a[i])*v[i]for i in [0,1])/sum(x*x for x in v)))
 return sum((p[i]-a[i]-u*v[i])**2 for i in [0,1])
def rat(p):return F(int(p[0]),int(p[1]))
def point(p):return tuple(map(rat,p))
def clip(poly,cut):
 out=[]
 for a,b in edges(poly):
  ia,ib=a[0]<=cut,b[0]<=cut
  if ia:out.append(a)
  if ia!=ib:out.append((cut,a[1]+(cut-a[0])*(b[1]-a[1])/(b[0]-a[0])))
 return out
def verify(proof):
 fi=proof['fixture'];assert sha(R/fi['path'])==fi['SHA256']
 f=json.loads((R/fi['path']).read_text())['u902d']
 pair=f['strokes'][11];A,B=map(lambda z:polys(z['outline']),pair)
 for k,z in zip(['previousSegmentSHA256','sourceSegmentSHA256'],pair):
  assert hashlib.sha256(json.dumps(z,separators=(',',':')).encode()).hexdigest()==proof['candidate'][k]
 for ref in [proof['originalDirectionReference'],proof['staticReference']]:assert sha(R/ref['path'])==ref['SHA256']
 sf=proof['sourceFields'];assert [z['weight']for z in pair]==sf['weights']
 assert [z['revealPath']for z in pair]==[sf['priorGuide'],sf['BGuide']]
 assert all(z['revealWidth']==14 for z in pair)
 seed=tuple(map(F,proof['candidate']['seed']));D=proof['candidate']['DATA'];cut=rat(D['cutX'])
 assert any(inside(seed,p,True)for p in A)and inside(seed,B[0],True)
 assert min(sd(seed,a,b)for p in A for a,b in edges(p))==F(proof['candidate']['priorBoundaryMarginSquared'])>0
 for key in ['BGuideStart','priorQGuideEnd']:
  p=tuple(map(F,proof['rejectedSeeds'][key]['point']))
  assert not any(inside(p,z)for z in A)
  assert any(inside(p,z)for z in B)==(key=='priorQGuideEnd')
 assert not any(inside(tuple(map(F,proof['rejectedSeeds']['plainXMinPrefix']['leftmostP'])),z)for z in A)
 # The terminal triangle is across exactly the original shared edge.
 a,b=B[0][10:12];assert {a,b}==set(B[1][:2])
 assert all(cross(a,b,p)>=0 for p in B[0])
 assert cross(a,b,B[1][2])<0
 union=B[0][:11]+[B[1][2]]+B[0][11:]
 assert abs(area(union))==sum(abs(area(p))for p in B)==rat(D['totalArea'])
 # Fixed two-chain X monotonicity certificate, not a new sweep search.
 imin=union.index(min(union));imax=union.index(max(union))
 chain=lambda start,end:union[start:end+1]if start<=end else union[start:]+union[:end+1]
 upper=chain(imin,imax);lower=chain(imax,imin)
 assert all(x[0]<y[0]for x,y in zip(upper,upper[1:]))
 assert all(x[0]>y[0]for x,y in zip(lower,lower[1:]))
 boundary=list(map(point,D['boundary']));clipped=clip(union,cut)
 assert abs(area(clipped))==abs(area(boundary))==rat(D['footArea'])
 assert set(boundary)==set(clipped)
 triangles=[list(map(point,t))for t in D['triangles']]
 assert len(triangles)==2 and all(area(t)>0 for t in triangles)
 assert sum(area(t)for t in triangles)==rat(D['footArea'])
 shared=set(triangles[0])&set(triangles[1]);assert len(shared)==2
 edge=list(shared);other0=next(p for p in triangles[0]if p not in shared);other1=next(p for p in triangles[1]if p not in shared)
 assert cross(*edge,other0)*cross(*edge,other1)<0
 assert inside(seed,triangles[0],True)
 assert min(sd(seed,a,b)for a,b in edges(triangles[0]))==rat(D['strictRootMarginSquared'])>0
 assert D['order'][0]['triangle']==0 and point(D['order'][0]['seed'])==seed
 o=D['order'][1];assert o['triangle']==1 and o['priorTriangle']==0
 assert set(map(point,o['shared']))==shared
 assert point(o['seed'])==tuple(sum(p[i]for p in shared)/2 for i in [0,1])
 assert [rat(w)for w in D['weights']]==[area(t)/rat(D['footArea'])for t in triangles]
 assert sum(map(rat,D['weights']))==1
 assert rat(D['phaseShare'])==rat(D['footArea'])/rat(D['totalArea'])
 frontier=[p[1]for p in boundary if p[0]==cut];assert len(frontier)==2 and max(frontier)>min(frontier)
 # Fixed exact prior-Q7 disc certificate, including complete split trees.
 cov=proof['priorFullQ7Coverage'];assert cov['strictFullPContained']and not cov['unresolved']
 assert cov['originalPolygons']==len(A)==3
 ts=cov['originalTriangles'];leaves=cov['coverLeaves'];assert len(leaves)==42
 q=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',pair[0]['revealPath'])))
 Q=lambda t:tuple((1-t)**2*q[i]+2*t*(1-t)*q[i+2]+t*t*q[i+4]for i in [0,1])
 for pi,poly in enumerate(A):
  pending=poly[:]if area(poly)>0 else poly[::-1]
  tris=[[tuple(map(F,v))for v in t]for t in ts[pi]]
  for tri in tris[:-1]:
   i=pending.index(tri[1]);assert [pending[i-1],pending[i],pending[(i+1)%len(pending)]]==tri
   assert cross(*tri)>0
   assert not any(inside(p,tri)for p in pending if p not in tri)
   pending.pop(i)
  assert pending==tris[-1] and sum(area(t)for t in tris)==abs(area(poly))
  for ti,tri in enumerate(tris):
   prefix=f'{pi}:{ti}:';fixed={z['route'][len(prefix):]:z for z in leaves if z['route'].startswith(prefix)}
   def tree(t,route):
    if route in fixed:
     z=fixed[route];center=Q(F(z['centerT']));margin=49-max(sum((v[i]-center[i])**2 for i in [0,1])for v in t)
     assert margin==F(z['radiusSquaredMargin'])>0
     assert not any(k.startswith(route)and k!=route for k in fixed);return
    assert any(k.startswith(route+'0')for k in fixed)and any(k.startswith(route+'1')for k in fixed)
    k=max(range(3),key=lambda j:sum((t[j][i]-t[(j+1)%3][i])**2 for i in [0,1]))
    a,b,c=t[k],t[(k+1)%3],t[(k+2)%3];mid=tuple((a[i]+b[i])/2 for i in [0,1])
    tree([a,mid,c],route+'0');tree([mid,b,c],route+'1')
   tree(tri,'')
 assert not proof['runtimeApplied']and not proof['productionImportAllowed']
 assert not proof['limitations']['temporalEquivalenceProved']
 return {'strictRoot':True,'footTriangles':2,'bodyMonotoneUnion':True,'priorQ7Leaves':42,'sourceSearchReplay':0,'nativeApproval':False}
p=json.loads((HERE/'source12-foot-seed-proof.json').read_text())
print(json.dumps(verify(p)))
for mutate in [
 lambda p:p['candidate']['seed'].__setitem__(0,'100'),
 lambda p:p['candidate']['DATA']['cutX'].__setitem__(0,'140'),
 lambda p:p['priorFullQ7Coverage']['coverLeaves'][0].__setitem__('radiusSquaredMargin','0'),
 lambda p:p.__setitem__('runtimeApplied',True)]:
 bad=copy.deepcopy(p);mutate(bad)
 try:verify(bad)
 except (AssertionError,ValueError):pass
 else:raise AssertionError('Changed fixed certificate accepted')
print('fixed positive1 / changed-certificate negatives4 PASS; engine/projection/media/oldproof0')
