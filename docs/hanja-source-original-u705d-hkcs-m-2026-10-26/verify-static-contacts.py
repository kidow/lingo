from pathlib import Path
from fractions import Fraction as F
import ast,json,re,hashlib
R=Path("/Users/kidow/Documents/dev/kidow/lingo/")
FIXTURE="docs/hanja-source-original-u705d-hkcs-m-2026-10-26/fixtures.json"
raw=(R/FIXTURE).read_bytes();assert hashlib.sha256(raw).hexdigest()=="882029a46c26f5b7be94defc8f95315f17c147243e5ff1650afe33cee3a32919"
f=json.loads(raw)['hkcs_m705d']
P='docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py';b=(R/P).read_bytes();assert hashlib.sha256(b).hexdigest()=='91670b2c888fd7cd691e4a19c9e43a498b0b964695ba2a7c975ab46bb958926e'
n={};tree=ast.parse(b.decode());exec(compile(ast.Module(body=[x for x in tree.body if isinstance(x,(ast.Import,ast.ImportFrom,ast.FunctionDef))],type_ignores=[]),P,'exec'),n)
polys,ears,cross=n['polys'],n['ears'],n['cross']
def area(p):return abs(sum(a[0]*p[(i+1)%len(p)][1]-p[(i+1)%len(p)][0]*a[1]for i,a in enumerate(p)))/2
def positive(poly,points):return min(cross(a,poly[(i+1)%len(poly)],p)for i,a in enumerate(poly)for p in points)
def box(a,e):return [(a[0]+x*e,a[1]+y*e)for x,y in[(-1,-1),(1,-1),(1,1),(-1,1)]]
def enc(p):return [[str(x)for x in a]for a in p]
fold=[]
for pen in[5,11,19]:
 h,v=f['strokes'][pen-1];assert h['direction']=='right'and v['direction']=='down'
 hp=polys(h['outline']);vp=polys(v['outline']);assert len(hp)==1 and len(vp)==2
 y0=min(y for p in vp for x,y in p);hy0=min(y for x,y in hp[0]);vend=max(y for p in vp for x,y in p)
 assert hy0-y0==F(5,2)
 a=((min(x for x,y in vp[0])+max(x for x,y in hp[0]))/2,hy0+F(3,2));e=F(1,100);corners=box(a,e)
 margins=[positive(p,corners)for p in[hp[0],vp[0],vp[1]]];assert min(margins)>0
 fold.append(dict(pen=pen,priorMask=1,nextMask=2,sourceInitialY=str(y0),priorHMinimumY=str(hy0),sourcePrefixGap=str(hy0-y0),unmodifiedDownClipSeparatedForLocalOpenInterval=['0',str((hy0-y0)/(vend-y0))],nativeBaselineReplayed=False,staticCommonBox=enc(corners),anchor=list(map(str,a)),boxArea=str(4*e*e),strictHalfplaneMargins=list(map(str,margins)),proofPolygonIndices=dict(prior=0,body=0,head=1),actualOpaquePriorAndNewDisplayPolicyStillRequired=True,allGrowingContactProved=False))
def intersect(poly,clip):
 for i,a in enumerate(clip):
  z=clip[(i+1)%len(clip)];out=[]
  for j,p in enumerate(poly):
   q=poly[(j+1)%len(poly)];u=cross(a,z,p);v=cross(a,z,q)
   if u>=0:out.append(p)
   if(u<0<v)or(v<0<u):
    t=u/(u-v);out.append(tuple(p[k]+t*(q[k]-p[k])for k in[0,1]))
  poly=out
  if not poly:break
 return poly
h,c=f['strokes'][12];hp=polys(h['outline']);cp=polys(c['outline']);best=None
for pi,p in enumerate(hp):
 for qi,q in enumerate(cp):
  for ti,t in enumerate(ears(p)):
   for ui,u in enumerate(ears(q)):
    s=intersect(list(t),u)
    if len(s)<3 or area(s)==0:continue
    if best is None or area(s)>best[0]:best=(area(s),pi,qi,ti,ui,t,u,s)
assert best
ar,pi,qi,ti,ui,t,u,s=best;a=tuple(sum(v[k]for v in s)/len(s)for k in[0,1]);e=F(1,100)
for _ in range(20):
 corners=box(a,e)
 if min(positive(t,corners),positive(u,corners))>0:break
 e/=2
else:raise AssertionError('no certified common box')
hook=dict(pen=13,priorMask=1,nextMask=2,priorPolygon=pi,nextPolygon=qi,priorEar=ti,nextEar=ui,priorTriangle=enc(t),nextTriangle=enc(u),intersection=enc(s),intersectionArea=str(ar),anchor=list(map(str,a)),commonBox=enc(corners),boxArea=str(4*e*e),strictMargins=list(map(str,[positive(t,corners),positive(u,corners)])),sharedGuideEndpoint=[42.792474999999996,85.5],staticContactOnly=True,sourceQ0PrefixConnectivityProved=False,actualOpaquePriorStillRequired=True,allTimeContactProved=False)
out=dict(schema='hanja-source-static-contact-risk/v1',date='2026-10-26',glyph='灝',root='hkcs_m705d',fixture=FIXTURE,fixtureSHA256=hashlib.sha256(raw).hexdigest(),geometrySHA256="22495a5b83df0d912c420b377bf3ceeacfd37d9c6a8e5bfacfe63696e94397bf",folds=fold,hook=hook,sourceGeometryChanged=False,sourceEngineReplay=0,sourceProjection=0,nativeBaselineReplay=0,sourceWater3SubphaseInferred=False,nativeApproval=False,runtimeApplied=False)
print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
