from pathlib import Path
from fractions import Fraction as F
import ast,json,re,math,hashlib
R=Path('/Users/kidow/Documents/dev/kidow/lingo')
FIXTURE='docs/hanja-source-original-u6fe9-hkcs-m-2026-10-25/fixtures.json'
f=json.loads((R/FIXTURE).read_bytes())['hkcs_m6fe9']
def primitive_namespace(path,expected):
 raw=(R/path).read_bytes()
 assert hashlib.sha256(raw).hexdigest()==expected
 tree=ast.parse(raw.decode())
 # Import only unchanged exact primitives, never the old target loops or fixture.
 nodes=[n for n in tree.body if isinstance(n,(ast.Import,ast.ImportFrom,ast.FunctionDef))]
 out={}
 exec(compile(ast.Module(body=nodes,type_ignores=[]),path,'exec'),out)
 return out
N=primitive_namespace('docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py','91670b2c888fd7cd691e4a19c9e43a498b0b964695ba2a7c975ab46bb958926e')
polys,ears,cross=N['polys'],N['ears'],N['cross']
def hull_source_points(points):
 ps=sorted(set(points));lo=[];hi=[]
 for p in ps:
  while len(lo)>=2 and cross(lo[-2],lo[-1],p)<=0:lo.pop()
  lo.append(p)
 for p in reversed(ps):
  while len(hi)>=2 and cross(hi[-2],hi[-1],p)<=0:hi.pop()
  hi.append(p)
 return lo[:-1]+hi[:-1]
def source_crossings(poly):
 edges=list(zip(poly,poly[1:]+poly[:1]));out=[]
 for i,(a,b)in enumerate(edges):
  for j,(c,d)in enumerate(edges[i+1:],i+1):
   if j==i+1 or(i==0 and j==len(edges)-1):continue
   if cross(a,b,c)*cross(a,b,d)<0 and cross(c,d,a)*cross(c,d,b)<0:out.append([i,j])
 return out
TARGETS=[(3,1)]
coverage=[]
for pen,mask in TARGETS:
 s=f['strokes'][pen-1][mask-1]
 v=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])]
 linear=' L'in s['revealPath']
 if linear:
  assert len(v)==4
  q0,q2=tuple(v[:2]),tuple(v[2:])
  q1=tuple((q0[j]+q2[j])/2 for j in [0,1])
 else:
  assert len(v)==6 and ' Q'in s['revealPath']
  q0,q1,q2=tuple(v[:2]),tuple(v[2:4]),tuple(v[4:])
 assert s['revealWidth']==14
 samples=[tuple((1-t)**2*q0[j]+2*t*(1-t)*q1[j]+t*t*q2[j]for j in [0,1])for t in [F(i,256)for i in range(257)]]
 sf=[tuple(map(float,q))for q in samples]
 leaves=[];unresolved=[];maxdepth=0
 def cover(t,route,depth):
  global maxdepth
  maxdepth=max(maxdepth,depth)
  fv=[tuple(map(float,v))for v in t]
  order=sorted(range(257),key=lambda k:max(sum((v[j]-sf[k][j])**2 for j in [0,1])for v in fv))
  for k in order[:8]:
   dd=[sum((v[j]-samples[k][j])**2 for j in [0,1])for v in t]
   if max(dd)<49:
    leaves.append({'route':route,'centerT':str(F(k,256)),'radiusSquaredMargin':str(49-max(dd))})
    return
  if depth>=12:
   unresolved.append({'route':route,'triangle':[[str(x)for x in v]for v in t]})
   return
  k=max(range(3),key=lambda i:sum((t[i][j]-t[(i+1)%3][j])**2 for j in [0,1]))
  a,b,c=t[k],t[(k+1)%3],t[(k+2)%3]
  mid=tuple((a[j]+b[j])/2 for j in [0,1])
  cover((a,mid,c),route+'0',depth+1);cover((mid,b,c),route+'1',depth+1)
 original=polys(s['outline']);triangles=[]
 for pi,p in enumerate(original):
  hp=hull_source_points(p);tr=[(hp[0],hp[j],hp[j+1])for j in range(1,len(hp)-1)];assert all(cross(*t)>0 for t in tr)
  triangles.append([[[str(x)for x in v]for v in t]for t in tr])
  for ti,t in enumerate(tr):cover(t,str(pi)+':'+str(ti)+':',0)
 coverage.append({'pen':pen,'mask':mask,'guide':s['revealPath'],'syntax':'ML'if linear else'MQ','hullSupersetTriangleCount':sum(map(len,triangles)),'hullSupersetTriangles':triangles,'coverLeaves':leaves,'unresolved':unresolved,'maxSplitDepth':maxdepth,'strictFullPContained':not unresolved,'argument':'각 원P의 convex hull 상위집합을 원본 꼭짓점으로 분할했다. 원P의 선분과 nonzero 채움은 이 hull에 포함된다. 원P·Q를 바꾸지 않았으며 각 hull triangle leaf는 정확 원Q 점의 radius7 disk 안에 있다. float는 시도 순서만, 여유 판정은 유리수이다.','notRasterProof':True,'notAllTimeGrowingIntersectionProof':True})
out={'schema':'hanja-source-water-foot-q7-coverage/v1','date':'2026-10-25','glyph':'濩','fixture':FIXTURE,'fixtureSHA256':hashlib.sha256((R/FIXTURE).read_bytes()).hexdigest(),'coverage':coverage,'scope':'원Q 기하의 반경7 포함만. 역방향 진행의 P 교집합 연결성은 미승인.','sourceGuideChanged':False,'sourcePChanged':False,'containmentMethod':'convex-hull-superset','originalSimpleEarPreconditionFailed':True,'sourceProperEdgeCrossings':[source_crossings(p)for p in polys(f['strokes'][2][0]['outline'])],'sourceEngine':0,'sourceProjection':0,'oldTargetLoopsExecuted':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
