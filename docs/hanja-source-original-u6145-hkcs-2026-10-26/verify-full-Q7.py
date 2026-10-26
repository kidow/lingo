from pathlib import Path
from fractions import Fraction as F
import ast,json,re,math,hashlib
R=Path(__file__).resolve().parents[2];FIXTURE='docs/hanja-source-original-u6145-hkcs-2026-10-26/fixtures.json'
b=(R/FIXTURE).read_bytes();assert hashlib.sha256(b).hexdigest()=='1e1fd8df28591095a09018740222d9a9e2ccd0b6255a6fe545d87967116b1546'

m=(R/'docs/hanja-source-original-u705d-hkcs-m-2026-10-26/verify-independent-conditions.py').read_bytes();assert hashlib.sha256(m).hexdigest()=='4f18233d2bba8eb440506fc2a4134b052fa304bfaa27ef9826b39ec9ae3b1221'
f=json.loads(b)['hkcs_m6145']
P=R/'docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py';b=P.read_bytes();assert hashlib.sha256(b).hexdigest()=='91670b2c888fd7cd691e4a19c9e43a498b0b964695ba2a7c975ab46bb958926e'
n={};tree=ast.parse(b.decode());exec(compile(ast.Module(body=[x for x in tree.body if isinstance(x,(ast.Import,ast.ImportFrom,ast.FunctionDef))],type_ignores=[]),str(P),'exec'),n);polys,ears,cross=n['polys'],n['ears'],n['cross']
TARGETS=[[1,1],[2,1],[4,2],[5,1],[6,1],[7,1],[12,1],[13,1]];coverage=[]
for pen,mask in TARGETS:
 try:
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
   tr=[(p[0],p[i],p[i+1])for i in range(1,len(p)-1)if cross(p[0],p[i],p[i+1])!=0]
   triangles.append([[[str(x)for x in v]for v in t]for t in tr])
   for ti,t in enumerate(tr):cover(t,str(pi)+':'+str(ti)+':',0)
  coverage.append({'pen':pen,'mask':mask,'guide':s['revealPath'],'syntax':'ML'if linear else'MQ','originalTriangleCount':sum(map(len,triangles)),'originalTriangles':triangles,'coverLeaves':leaves,'unresolved':unresolved,'maxSplitDepth':maxdepth,'strictFullPContained':not unresolved,'argument':'Exact original fan triangles cover every nonzero-winding filled region because oriented triangle winding sums to the original winding; zero-area triangles contribute no area. No simplicity assumption; each fan triangle is covered (superset coverage is sufficient); exact midpoint splits; each accepted leaf lies in a convex radius7 disk at an exact original guide point. Floating point is used only to rank trial centers; all acceptance margins are rational. ML is parameterized by the same exact source segment, never changed to a product quadratic.','notRasterProof':True,'notAllTimeGrowingIntersectionProof':True})
 
 except Exception as e:coverage.append({'pen':pen,'mask':mask,'strictFullPContained':False,'analysisError':type(e).__name__+': '+str(e),'notRasterProof':True,'notAllTimeGrowingIntersectionProof':True})

print(json.dumps({'schema':'hanja-full-source-Q7-coverage/v1','glyph':'慅','root':'hkcs_m6145','fullQCoverage':coverage,'sourceEngineReplay':0,'sourceProjection':0,'nativeApproval':False,'runtimeApplied':False},ensure_ascii=False,separators=(',',':')))
