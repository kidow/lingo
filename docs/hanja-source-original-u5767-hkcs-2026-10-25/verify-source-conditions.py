from pathlib import Path
from fractions import Fraction as F
import ast,json,re,math,hashlib
R=Path('/Users/kidow/Documents/dev/kidow/lingo')
FIXTURE='docs/hanja-source-original-u5767-hkcs-2026-10-25/fixtures.json'
f=json.loads((R/FIXTURE).read_bytes())['hkcs_m5767']
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
A=primitive_namespace('docs/hanja-source-original-u846f-hkcs-2026-10-25/axis-prefix-facts.py','46cd861b2dfce26d9afcf902c38f47ad6bead8c409b793a99846c64ac324abc3')
A['f']=f
cardinal=A['axis_facts']()
assert len(cardinal)==7
TARGETS=[(3,1),(5,1)]
initial=[];coverage=[]
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
  tr=ears(p)
  triangles.append([[[str(x)for x in v]for v in t]for t in tr])
  for ti,t in enumerate(tr):cover(t,str(pi)+':'+str(ti)+':',0)
 coverage.append({'pen':pen,'mask':mask,'guide':s['revealPath'],'syntax':'ML'if linear else'MQ','originalTriangleCount':sum(map(len,triangles)),'originalTriangles':triangles,'coverLeaves':leaves,'unresolved':unresolved,'maxSplitDepth':maxdepth,'strictFullPContained':not unresolved,'argument':'Exact original ear partition; exact midpoint splits; each accepted leaf lies in a convex radius7 disk at an exact original guide point. Floating point is used only to rank trial centers; all acceptance margins are rational. ML is parameterized by the same exact source segment, never changed to a product quadratic.','notRasterProof':True,'notAllTimeGrowingIntersectionProof':True})
 if linear:
  distance2=sum((q2[j]-q0[j])**2 for j in [0,1])
  lower=math.isqrt(distance2.numerator//distance2.denominator)
  assert lower>1 and F(lower*lower)<=distance2
  K=F(1,20)
  cert={'pen':pen,'mask':mask,'syntax':'ML','initialKind':'single-line','guide':s['revealPath'],'initialArcMax':1,'firstLegLength':str(lower),'firstLegSquared':str(distance2),'lowerBoundCertified':True,'K':str(K),'T':None,'strictLine':True,'initialSufficientConditions':True}
 else:
  u=tuple(q1[j]-q0[j]for j in [0,1]);v=tuple(q2[j]-2*q1[j]+q0[j]for j in [0,1])
  vv=sum(x*x for x in v);attempts=[];cert=None
  for T,K in [(F(1,2),F(1,20)),(F(1),F(1,20)),(F(1,2),F(1,10)),(F(1),F(1,10))]:
   at=max(F(0),min(T,-sum(u[j]*v[j]for j in [0,1])/vv))if vv else F(0)
   lam=sum((u[j]+at*v[j])**2 for j in [0,1])
   cr=u[0]*v[1]-u[1]*v[0]
   chord=sum((2*T*u[j]+T*T*v[j])**2 for j in [0,1])-49
   curvature=4*K*K*lam**3-cr*cr;cos=1-(7*K)**2/2
   axes=[j for j in [0,1]if u[j]*(u[j]+T*v[j])>0]
   ok=chord>0 and curvature>0 and cos-7*K>0 and bool(axes)
   attempts.append({'T':str(T),'K':str(K),'ok':ok,'chordMargin':str(chord),'curvatureMargin':str(curvature),'cosMinusRK':str(cos-7*K)})
   if ok:
    cert={'pen':pen,'mask':mask,'syntax':'MQ','initialKind':'single-quadratic','guide':s['revealPath'],'initialArcMax':7,'firstLegLength':None,'T':str(T),'K':str(K),'u':[str(x)for x in u],'v':[str(x)for x in v],'lambdaAt':str(at),'lambda':str(lam),'cross':str(cr),'chordSquaredMinusRadiusSquared':str(chord),'curvatureMargin':str(curvature),'cosLower':str(cos),'cosMinusRK':str(cos-7*K),'strictAxis':'xy'[axes[0]],'initialSufficientConditions':True}
    break
  assert cert,('No sufficient source-only initial condition',pen,mask,attempts)
  cert['attempts']=attempts
 cert.update({'width':14,'radius':7,'weight':s['weight'],'maskSHA256':hashlib.sha256(json.dumps(s,separators=(',',':')).encode()).hexdigest(),'notRasterProof':True,'PIntersectionConnectivityNotProved':True,'notFullSweepProof':True,'priorMaskContactClaimed':False})
 initial.append(cert)
transition={'pen':7,'priorMask':1,'nextMask':2,'sourceRawOneBased':[7,8],'priorH':['53','49','82','49'],'nextV':['82','49','82','91'],'sharedGuideEndpoint':['82','49'],'originalPUnchanged':True,'commonInteriorNotYetProved':True,'allTimeContactClaimed':False}
out={'schema':'hanja-source-initial-conditions/v1','date':'2026-10-25','glyph':'坧','root':'hkcs_m5767','fixture':FIXTURE,'fixtureSHA256':hashlib.sha256((R/FIXTURE).read_bytes()).hexdigest(),'geometrySHA256':'67d2d6941b1c36b2d60f9f66d93f03af05b65edb6c138c316a1fea78a4ba6fb0','initialCases':initial,'fullQCoverage':coverage,'cardinalFacts':cardinal,'compoundTransition':transition,'oldTargetExecution':0,'sourceEngineReplay':0,'sourceProjection':0,'sourcePGuideWidthWeightChanged':False,'allTimeGrowingPConnectivityProved':False,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
