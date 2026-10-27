#!/usr/bin/env python3
"""Exact source-only contact conditions for 凞 3m2 and 6m2; no adoption."""
from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re,sys
R=Path(__file__).resolve().parents[2];D=Path(__file__).resolve().parent
PINS={
 'docs/hanja-source-original-u51de-base-2026-10-27/fixtures-draft.json':'623a80e6bbd7363bfb171731d60f730d9f9c412ec07a94afd3eccd7a30ed1255',
 'docs/hanja-source-original-u51de-base-2026-10-27/feasibility-initial-1-8.json':'0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba',
 'docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py':'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',
 'docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py':'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396'}
def sha(b):return hashlib.sha256(b).hexdigest()
for path,pin in PINS.items():assert sha((R/path).read_bytes())==pin,path
fixture=json.loads((R/next(iter(PINS))).read_text())['u51de']
env={'F':F,'re':re}
s=(R/list(PINS)[2]).read_text()
for n in ast.parse(s).body:
 if isinstance(n,ast.FunctionDef)and n.name in ['polygons','cross','state']:exec(compile(ast.Module(body=[n],type_ignores=[]),'<pure>','exec'),env)
polygons,cross,state=[env[n]for n in ['polygons','cross','state']]
s=(R/list(PINS)[3]).read_text();n=next(n for n in ast.parse(s).body if isinstance(n,ast.FunctionDef)and n.name=='audit')
kernelcode=ast.get_source_segment(s,n).split('\n anchor=tuple',1)[0]+'\n return P,boundary,kernel'
def area(p):return sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(p,p[1:]+p[:1]))/2
def clean(p):
 q=[]
 for v in p:
  if not q or v!=q[-1]:q.append(v)
 if len(q)>1 and q[0]==q[-1]:q.pop()
 return q
def ccw(p):return p[:]if area(p)>0 else list(reversed(p))
def clip(subject,cutter):
 out=subject[:]
 for a,b in zip(cutter,cutter[1:]+cutter[:1]):
  old=out;out=[]
  if not old:break
  for p,q in zip(old,old[1:]+old[:1]):
   cp,cq=cross(a,b,p),cross(a,b,q)
   if cp>=0:out.append(p)
   if (cp<0<cq)or(cq<0<cp):
    t=cp/(cp-cq);out.append(tuple(p[k]+t*(q[k]-p[k])for k in [0,1]))
  out=clean(out)
 return out
def triangulate(poly):
 p=ccw(clean(poly));tri=[]
 while len(p)>3:
  found=False
  for i,b in enumerate(p):
   a,c=p[i-1],p[(i+1)%len(p)]
   if cross(a,b,c)<=0:continue
   if any(state(v,[a,b,c])>=0 for j,v in enumerate(p)if j not in [(i-1)%len(p),i,(i+1)%len(p)]):continue
   tri.append([a,b,c]);p.pop(i);found=True;break
  assert found,'non-simple/unsupported polygon; no guessed triangulation'
 tri.append(p)
 assert all(area(t)>0 for t in tri)
 assert sum(map(area,tri))==abs(area(poly))
 assert all(v in poly for t in tri for v in t),'source vertices only'
 return tri
def shared(a,b,c,d):
 if a==b or c==d or cross(a,b,c)or cross(a,b,d):return None
 axis=0 if a[0]!=b[0]else 1
 lo=max(min(a[axis],b[axis]),min(c[axis],d[axis]));hi=min(max(a[axis],b[axis]),max(c[axis],d[axis]))
 if hi<=lo:return None
 return [tuple(a[k]+(v-a[axis])*(b[k]-a[k])/(b[axis]-a[axis])for k in [0,1])for v in [lo,hi]]
def sharededges(p,q):return [s for a,b in zip(p,p[1:]+p[:1])for c,d in zip(q,q[1:]+q[:1])if(s:=shared(a,b,c,d))]
def center(p):return tuple(sum(v[k]for v in p)/len(p)for k in [0,1])
def connected(a,b):return bool(sharededges(a,b))or abs(area(clip(a,b)))>0
def reach(roots,edges):
 seen=set(roots)
 while True:
  nxt=seen|{j for i,j in edges if i in seen}
  if nxt==seen:return sorted(seen)
  seen=nxt
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return {k:enc(x)for k,x in v.items()}
 if isinstance(v,(list,tuple)):return [enc(x)for x in v]
 return v
rows=[]
for pen,macro in [(3,'D then DL'),(6,'R then D')]:
 prior=polygons(fixture['strokes'][pen-1][0]['outline']);target=polygons(fixture['strokes'][pen-1][1]['outline'])
 pt=[t for p in prior for t in triangulate(p)];tt=[t for p in target for t in triangulate(p)]
 cells=[p for a in tt for b in pt if len(p:=clip(a,b))>=3 and area(p)>0]
 boundaryShared=[s for a in prior for b in target for s in sharededges(a,b)]
 kns={'F':F,'f':{'groups':[{'polygons':[[{'x':2*x,'y':2*y}for x,y in p]for p in target]}]}}
 exec(kernelcode,kns);_,boundary,kernel=kns['audit'](1)
 seeds=[]
 if len(kernel)>=3 and abs(area(kernel))>0:
  for p in pt:
   k=clip(p,ccw(kernel))
   if len(k)>=3 and abs(area(k))>0:
    seed=center(k)
    if all(cross(a,b,seed)>0 for a,b in boundary)and any(state(seed,q)==1 for q in prior):seeds.append(seed)
 roots=[i for i,t in enumerate(tt)if any(area(clip(t,p))>0 or sharededges(t,p)for p in pt)]
 edges=[(i,j)for i,a in enumerate(tt)for j,b in enumerate(tt)if i!=j and connected(a,b)]
 forward=[(i,j)for i,j in edges if center(tt[j])[1]>=center(tt[i])[1]]
 allreach=reach(roots,edges);forwardreach=reach(roots,forward)
 rows.append({'pen':pen,'mask':2,'sourceMacro':macro,'sourceSegmentSHA256':sha(json.dumps(fixture['strokes'][pen-1][1],ensure_ascii=False,separators=(',',':')).encode()),'priorPolygons':len(prior),'targetPolygons':len(target),'priorContactHasPositiveArea':bool(cells),'positiveIntersectionTrianglePairCells':len(cells),'maxIntersectionCellArea':max(map(area,cells),default=F(0)),'intersectionAreaNote':'Cell areas overlap if original source polygons overlap; no union area claimed.','positiveSharedSourceEdges':boundaryShared,'targetStarKernelVertices':len(kernel),'targetStarKernelHasPositiveArea':len(kernel)>=3 and abs(area(kernel))>0,'strictKernelAndPriorSeedExists':bool(seeds),'strictKernelAndPriorSeedWitnesses':seeds[:3],'seedConclusion':'Strict source seed exists.'if seeds else 'No strict star-kernel/prior intersection: exact kernel clipped against every prior source triangle, not inferred from dyadic sample failure.','triangulation':{'sourceVerticesOnly':True,'areaPreservedPerPolygon':True,'targetTriangleCount':len(tt),'priorContactRootTriangles':roots,'positiveEdgeOrAreaAdjacency':edges,'allTrianglesReachableFromPriorContact':len(allreach)==len(tt),'downwardCentroidRestrictedReachable':forwardreach,'allTrianglesReachableUnderDownwardCentroidRestriction':len(forwardreach)==len(tt),'note':'Exact source-vertex clip partition and positive shared-edge/area adjacency only. Centroid monotonicity is a diagnostic sufficient graph restriction, not proof of a complete continuous temporal sweep or macro compatibility.','triangles':tt},'reuseCondition':'Retain original P/Q/flags/weights/raw order. Any contact-root clip partition needs explicit ordered positive-edge frontier and source-macro-compatible temporal proof plus native review. No bridge may be added.','nativeApproval':False,'runtimeApplied':False})
out=enc({'schema':'hanja-source-contact-feasibility/v1','glyph':'凞','root':'u51de','scope':['3m2','6m2'],'inputs':PINS,'reusedAxisAnalysis':'13 successful axis alternatives reused; none recalculated here.','coordinateFrame':'Exact rational compiled 100-unit polygons.','results':rows,'geometryModified':False,'nativeApproval':False,'runtimeApplied':False,'registrationAuthorized':False})
if '--emit'in sys.argv:print(json.dumps(out,ensure_ascii=False,indent=2))
else:
 p=D/'contact-feasibility-3-6.json';assert json.loads(p.read_text())==out
 print(json.dumps({'PASS':True,'snapshotSHA256':sha(p.read_bytes()),'verifierSHA256':sha(Path(__file__).read_bytes()),'results':[{'pen':x['pen'],'positiveAreaContact':x['priorContactHasPositiveArea'],'strictKernelSeed':x['strictKernelAndPriorSeedExists'],'triangleCount':x['triangulation']['targetTriangleCount'],'allTrianglesConnected':x['triangulation']['allTrianglesReachableFromPriorContact'],'allDownwardCentroidReach':x['triangulation']['allTrianglesReachableUnderDownwardCentroidRestriction']}for x in out['results']],'runtimeApplied':False},ensure_ascii=False))
