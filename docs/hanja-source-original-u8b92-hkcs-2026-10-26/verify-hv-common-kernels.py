from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2];P=R/'docs/hanja-source-original-u8b92-hkcs-2026-10-26/fixtures.json';b=P.read_bytes();assert hashlib.sha256(b).hexdigest()=='5e8411814e4f13dd0da9fdce4e52614f2143b4c9e0db99f69ec174297a4389c9'
f=json.loads(b)['hkcs_m8b92']
M=R/'docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py';mb=M.read_bytes();assert hashlib.sha256(mb).hexdigest()=='91670b2c888fd7cd691e4a19c9e43a498b0b964695ba2a7c975ab46bb958926e'
N={};exec(compile(ast.Module(body=[x for x in ast.parse(mb.decode()).body if isinstance(x,(ast.Import,ast.ImportFrom,ast.FunctionDef))],type_ignores=[]),str(M),'exec'),N);polys,cross=N['polys'],N['cross']
def area(p):return sum(a[0]*p[(i+1)%len(p)][1]-p[(i+1)%len(p)][0]*a[1]for i,a in enumerate(p))/2
def convex(p):
 assert area(p)>0
 turns=[cross(p[i],p[(i+1)%len(p)],p[(i+2)%len(p)])for i in range(len(p))]
 allMargins=[[cross(a,p[(i+1)%len(p)],z)for j,z in enumerate(p)if j not in[i,(i+1)%len(p)]]for i,a in enumerate(p)]
 assert min(turns)>0 and min(min(m)for m in allMargins)>0
 return dict(vertices=len(p),signedArea=area(p),strictTurnMargins=turns,strictAllVertexEdgeMargins=allMargins,strictConvexHullCertified=True)
def intersect(poly,clip):
 out=poly
 for a,b in zip(clip,clip[1:]+clip[:1]):
  old=out;out=[]
  if not old:break
  prev=old[-1];pv=cross(a,b,prev)
  for cur in old:
   cv=cross(a,b,cur)
   if(cv>=0)!=(pv>=0):
    t=pv/(pv-cv);out.append(tuple(prev[j]+t*(cur[j]-prev[j])for j in[0,1]))
   if cv>=0:out.append(cur)
   prev,pv=cur,cv
  clean=[]
  for x in out:
   if not clean or x!=clean[-1]:clean.append(x)
  if len(clean)>1 and clean[0]==clean[-1]:clean.pop()
  out=clean
 return out
def enc(x):
 if isinstance(x,F):return str(x)
 if isinstance(x,(list,tuple)):return[enc(y)for y in x]
 if isinstance(x,dict):return{k:enc(v)for k,v in x.items()}
 return x
sourceGroups=[[0],[1],[2],[3],[5],[6,7],[8],[9],[10,11],[12],[13,14],[15],[16],[17,18],[19],[20],[21],[22,23],[24],[25,26],[27],[28],[29],[30]]
results=[]
for pen in[6,11,20]:
 try:
  H,V=f['strokes'][pen-1];hp=polys(H['outline']);vp=polys(V['outline']);assert len(hp)==1 and len(vp)==2 and H['direction']=='right'and V['direction']=='down'
  PP=hp+vp;cc=[convex(p)for p in PP];joint=intersect(intersect(PP[0],PP[1]),PP[2]);assert len(joint)>=3 and area(joint)>0
  a=tuple(sum(p[j]for p in joint)/len(joint)for j in[0,1]);bounds=[]
  for poly in PP:
   for x,y in zip(poly,poly[1:]+poly[:1]):
    m=cross(x,y,a);assert m>0;L=abs(y[0]-x[0])+abs(y[1]-x[1]);assert L>0;bounds.append(m/L)
  delta=min(bounds)/2;box=[(a[0]+dx*delta,a[1]+dy*delta)for dx,dy in[(-1,-1),(1,-1),(1,1),(-1,1)]]
  margins=[[cross(x,poly[(i+1)%len(poly)],z)for i,x in enumerate(poly)for z in box]for poly in PP];assert min(min(m)for m in margins)>0
  lo=min(y for p in vp for x,y in p);hi=max(y for p in vp for x,y in p);hy=min(y for x,y in hp[0]);assert lo<hy<a[1]<hi and a[1]-lo>=delta and hi-a[1]>=delta
  raw=sourceGroups[pen-1];left=f['fullProof']['trace'][raw[0]][-1];right=f['fullProof']['trace'][raw[1]][0];assert left['kind']==right['kind']=='cdDrawLine';end=left['args'][2:4];start=right['args'][:2];seam=[F(str(start[j]))-F(str(end[j]))for j in[0,1]]
  results.append(dict(ok=True,pen=pen,mask=2,sourceH=H,sourceV=V,sourceRawZeroBased=raw,sourceQSeam200=seam,sourceQSeam100=[x/2 for x in seam],originalNoncoincidentSeamPreserved=any(seam),convexPolygons=cc,commonIntersection=joint,commonIntersectionArea=area(joint),anchor=a,strictBoxHalfWidth=delta,strictBox=box,strictBoxArea=4*delta*delta,strictMargins=margins,unmodifiedBoundsDownClipRisk=dict(sourceHeadMinY=lo,completedHMinY=hy,positiveGap=hy-lo,separatedForNormalizedVLocalProgressOpenInterval=[F(0),(hy-lo)/(hi-lo)],nativeFailureNotClaimed=True),conditionalCenteredBandFamily=dict(parameter='Independent geometry s, not runtime progress or publisher clock',domain=['0','1'],yMinimum=lo,yMaximum=hi,originY=a[1],lower='originY-(originY-yMinimum)*s',upper='originY+(yMaximum-originY)*s',fullOriginalSourceP2AtS1=True,hiddenAtS0Required=True,originalPSubset=True,eachConvexIntersectionConnected=True,scaledCommonBoxInsideAllForPositiveS=True,positiveTripleContactAreaLowerBound='4*delta^2*s^2 for0<s<=1',actualOpaqueCompletedPriorStillRequired=True),sourceInkChanged=False,sourceQChanged=False,displayClockApproved=False,nativeApproval=False,runtimeApplied=False))
 except Exception as e:results.append(dict(ok=False,pen=pen,mask=2,failure=type(e).__name__+': '+str(e)))
print(json.dumps(enc(dict(schema='hanja-source-HV-common-kernel-conditions/v1',glyph='讒',root='hkcs_m8b92',fixtureSHA256='5e8411814e4f13dd0da9fdce4e52614f2143b4c9e0db99f69ec174297a4389c9',geometrySHA256='3e0339d807e7bc697bed53420f88ff3fc52048df340c1d658c483898c6f406eb',results=results,sourceEngine=0,sourceProjection=0,prior8CoverageReplay=0,sharedChanges=0,server=0,newPolicyModuleApproved=False,nativeApproval=False,runtimeApplied=False)),ensure_ascii=False,separators=(',',':')))
