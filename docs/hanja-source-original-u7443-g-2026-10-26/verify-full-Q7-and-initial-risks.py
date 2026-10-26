from pathlib import Path
from fractions import Fraction as F
from math import isqrt
import ast,json,re,math,hashlib
R=Path(__file__).resolve().parents[2]
FULL='docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json';fullBytes=(R/FULL).read_bytes();assert hashlib.sha256(fullBytes).hexdigest()=='709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2';original=json.loads(fullBytes)
assert len(original['groups'])==len(original['trace'])==14 and sum(len(t)for t in original['trace'])==14 and sum(len(g['polygons'])for g in original['groups'])==25
for g,t in zip(original['groups'],original['trace']):assert g['polygons']==[p for c in t for p in c['polygons']]
# Analysis only: the same IEEE numeric division by two used by original renderer normalization.
def half(x):return F(str(x/2))
def scalar(v):
 s=str(float(v));return s[:-2]if s.endswith('.0')else s
def outline(P):return ' '.join(' '.join(('M'if i==0 else'L')+str(float(x))+' '+str(float(y))for i,(x,y)in enumerate(p))+' Z'for p in P)
S=[];RAW_P=[];RAW_Q={}
for i,(g,calls)in enumerate(zip(original['groups'],original['trace']),1):
 P=[]
 for p in g['polygons']:
  assert all(v['off']==0 for v in p);P.append([(half(v['x']),half(v['y']))for v in p])
 RAW_P.append(P);flat=[q for p in P for q in p];s={'outline':outline(P),'bounds':[float(min(x for x,y in flat)),float(min(y for x,y in flat)),float(max(x for x,y in flat)),float(max(y for x,y in flat))]}
 if i in[4,8,9]:
  assert len(calls)==1 and calls[0]['kind']=='cdDrawCurve';a=calls[0]['args'];assert len(a)==8
  Q=[half(v)for v in a[:6]];RAW_Q[i]=Q;s['revealPath']='M'+scalar(Q[0])+' '+scalar(Q[1])+' Q'+' '.join(scalar(x)for x in Q[2:]);s['revealWidth']=14
 S.append([s])
normalizedScalars=[half(v[k])for g in original['groups']for p in g['polygons']for v in p for k in['x','y']]+[half(v)for r in[4,8,9]for v in original['trace'][r-1][0]['args'][:6]]
assert len(normalizedScalars)==308 and hashlib.sha256(json.dumps([str(v)for v in normalizedScalars],separators=(',',':')).encode()).hexdigest()=='028f914dca91f90a312adf5f08c00e2052219156fcb08b9cd8b0c8f166649ce9'
INIT_METHOD='docs/hanja-source-original-u705d-hkcs-m-2026-10-26/verify-independent-conditions.py';initBytes=(R/INIT_METHOD).read_bytes();assert hashlib.sha256(initBytes).hexdigest()=='4f18233d2bba8eb440506fc2a4134b052fa304bfaa27ef9826b39ec9ae3b1221'
f={'strokes':S};TARGETS=[[4,1],[8,1],[9,1]]
EAR='docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py';eb=(R/EAR).read_bytes();assert hashlib.sha256(eb).hexdigest()=='91670b2c888fd7cd691e4a19c9e43a498b0b964695ba2a7c975ab46bb958926e'
allowed={'cross','area','contains','ears'};nodes=[n for n in ast.parse(eb).body if isinstance(n,ast.FunctionDef)and n.name in allowed];assert{n.name for n in nodes}==allowed;exec(compile(ast.Module(body=nodes,type_ignores=[]),str(R/EAR),'exec'),globals())
def on(a,b,p):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def simple(P):
 n=len(P)
 for i,a in enumerate(P):
  b=P[(i+1)%n];assert a!=b
  prev=P[i-1];va=(prev[0]-a[0],prev[1]-a[1]);vb=(b[0]-a[0],b[1]-a[1]);assert cross(prev,a,b)!=0 or va[0]*vb[0]+va[1]*vb[1]<=0
  for j,c in enumerate(P):
   if j<=i:continue
   d=P[(j+1)%n]
   if j==i+1 or(i==0 and j==n-1):continue
   assert not(on(a,b,c)or on(a,b,d)or on(c,d,a)or on(c,d,b))
   assert not(cross(a,b,c)*cross(a,b,d)<0 and cross(c,d,a)*cross(c,d,b)<0)
 return True
coverage=[]
for raw in[4,8,9]:
 v=RAW_Q[raw];q0,q1,q2=tuple(v[:2]),tuple(v[2:4]),tuple(v[4:]);samples=[tuple((1-t)**2*q0[j]+2*t*(1-t)*q1[j]+t*t*q2[j]for j in[0,1])for t in[F(i,256)for i in range(257)]];sf=[tuple(map(float,q))for q in samples];leaves=[];unresolved=[];maxdepth=0
 def cover(t,route,depth):
  global maxdepth
  maxdepth=max(maxdepth,depth);fv=[tuple(map(float,v))for v in t];order=sorted(range(257),key=lambda k:max(sum((v[j]-sf[k][j])**2 for j in[0,1])for v in fv))
  for k in order[:8]:
   dd=[sum((v[j]-samples[k][j])**2 for j in[0,1])for v in t]
   if max(dd)<49:leaves.append({'route':route,'centerT':str(F(k,256)),'radiusSquaredMargin':str(49-max(dd))});return
  if depth>=12:unresolved.append({'route':route,'triangle':t});return
  k=max(range(3),key=lambda i:sum((t[i][j]-t[(i+1)%3][j])**2 for j in[0,1]));a,b,c=t[k],t[(k+1)%3],t[(k+2)%3];mid=tuple((a[j]+b[j])/2 for j in[0,1]);cover((a,mid,c),route+'0',depth+1);cover((mid,b,c),route+'1',depth+1)
 triangles=[]
 for pi,p in enumerate(RAW_P[raw-1]):
  assert simple(p);tr=ears(p);assert sum(abs(area(list(t)))for t in tr)==abs(area(p));triangles.append(tr)
  for ti,t in enumerate(tr):cover(t,str(pi)+':'+str(ti)+':',0)
 coverage.append({'raw':raw,'originalQ':v,'originalPCount':len(RAW_P[raw-1]),'sourcePolygonsSimpleVerified':True,'earTriangles':triangles,'coverLeaves':leaves,'unresolved':unresolved,'maxSplitDepth':maxdepth,'strictFullPContained':not unresolved,'notAllTimeIntersectionProof':True})
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def sub(a,b):return tuple(x-y for x,y in zip(a,b))
def cross(a,b,p):return(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
def polys(s):
 out=[]
 for text in s.split('M')[1:]:
  a=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',text)];out.append(list(zip(a[::2],a[1::2])))
 return out
def state(p,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  c=cross(a,b,p)
  if c==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1]):return 0
  if a[1]<=p[1]<b[1]and c>0:w+=1
  if b[1]<=p[1]<a[1]and c<0:w-=1
 return 1 if w else-1
def sqrtbounds(q):
 D=10**10;n=isqrt(q.numerator*D*D//q.denominator);a=F(n,D);return(a,a if a*a==q else F(n+1,D))
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
 

results=[]
for pen,mask in TARGETS:
 s=f['strokes'][pen-1][mask-1];ps=polys(s['outline']);prior=[p for zs in f['strokes'][:pen-1]for z in zs for p in polys(z['outline'])]
 a=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])];assert len(a)==6 and s['revealWidth']==14
 q0,m,q1=tuple(a[:2]),tuple(a[2:4]),tuple(a[4:]);u=sub(m,q0);v=sub(sub(q1,m),u);n0=(-2*u[1],2*u[0]);nn=dot(n0,n0);assert nn>0
 # A rational normal-coordinate interval strictly contained in radius7.
 sqrtHi=sqrtbounds(nn)[1];limit=F(7)/sqrtHi;cuts={-limit,limit,F(0)}
 for poly in ps+prior:
  for p,z in zip(poly,poly[1:]+poly[:1]):
   den=(z[0]-p[0])*n0[1]-(z[1]-p[1])*n0[0]
   if den:
    lam=-cross(p,z,q0)/den
    if -limit<lam<limit:cuts.add(lam)
 candidates=[];cuts=sorted(cuts)
 for lo,hi in zip(cuts,cuts[1:]):
  lam=(lo+hi)/2;W=tuple(q0[j]+lam*n0[j]for j in[0,1])
  current=[p for p in ps if state(W,p)==1]
  if lam and current and all(state(W,p)==-1 for p in prior)and lam*lam*nn<49:candidates.append((lam,W,current[0]))
 if not candidates:
  results.append({'pen':pen,'mask':mask,'initialNormalSufficientWitnessFound':False,'notSafetyProof':True,'scope':'Only t0 normal-section strict source/prior test; later parameter exposure and full mask topology not classified.'});continue
 lam,W,chosen=max(candidates,key=lambda row:row[0]*row[0]);A=(2*u[0]-2*lam*v[1],2*u[1]+2*lam*v[0]);growth=max(abs(x)for x in A)+max(abs(x)for x in v);assert growth>0
 margins=[]
 for poly in[chosen]+prior:
  for p,z in zip(poly,poly[1:]+poly[:1]):
   c=abs(cross(p,z,W));den=abs(z[0]-p[0])+abs(z[1]-p[1]);assert den>0
   margin=c/den if c else max(min(p[0],z[0])-W[0],W[0]-max(p[0],z[0]),min(p[1],z[1])-W[1],W[1]-max(p[1],z[1]));assert margin>0;margins.append(margin)
 margin=min(margins);T=min(F(1,100),margin/(2*growth));loops=0
 while True:
  V0=tuple(2*x for x in u);VT=tuple(2*u[j]+2*v[j]*T for j in[0,1]);speed=max(sqrtbounds(dot(V0,V0))[1],sqrtbounds(dot(VT,VT))[1]);dhi=T*speed;rnlo=abs(lam)*(sqrtbounds(dot(V0,V0))[0]-2*sqrtbounds(dot(v,v))[1]*T)
  if max(lam*lam*dot(V0,V0),lam*lam*dot(VT,VT))<49 and rnlo>2*dhi>0:break
  T/=2;loops+=1;assert loops<64
 qt=tuple(q0[j]+2*u[j]*T+v[j]*T*T for j in[0,1]);dlo=sqrtbounds(dot(sub(qt,q0),sub(qt,q0)))[0];Lhi=sqrtbounds(dot(u,u))[1]+sqrtbounds(dot(sub(q1,m),sub(q1,m)))[1];safe=dlo/Lhi;assert safe>0
 results.append({'pen':pen,'mask':mask,'initialNormalSufficientWitnessFound':True,'point':W,'normalLambda':lam,'normalDistanceSquared':lam*lam*nn,'strictInsideOriginalPOutsideCompletedPrior':True,'strictWindingMarginLInfinity':margin,'witnessMotionCoefficient':growth,'allSourceTau0ToTPreservesMembership':True,'sourceGuideT':T,'normalDistanceLower':rnlo,'prefixArcUpper':dhi,'outsideBothShrinkingCapsForAllSmallPositiveP':True,'definitelyEarlyNormalizedProgressInterval':[0,safe],'nativeSuggestedFractions':[0,F(1,10**8),min(safe/2,F(1,10000)),F(1,1000),F(1,100),F(3,100)]})

stripRisks=results
initial=[]
for raw in[4,8,9]:
 z=RAW_Q[raw];q0,q1,q2=tuple(z[:2]),tuple(z[2:4]),tuple(z[4:]);u=sub(q1,q0);v=sub(sub(q2,q1),u);vv=dot(v,v);attempts=[];cert=None
 for T,K in[(F(1,2),F(1,20)),(F(1),F(1,20)),(F(1,2),F(1,10)),(F(1),F(1,10))]:
  at=max(F(0),min(T,-dot(u,v)/vv))if vv else F(0);lam=dot(tuple(u[j]+at*v[j]for j in[0,1]),tuple(u[j]+at*v[j]for j in[0,1]));cr=u[0]*v[1]-u[1]*v[0];chord=dot(tuple(2*T*u[j]+T*T*v[j]for j in[0,1]),tuple(2*T*u[j]+T*T*v[j]for j in[0,1]))-49;curvature=4*K*K*lam**3-cr*cr;cos=1-(7*K)**2/2;axes=[j for j in[0,1]if u[j]*(u[j]+T*v[j])>0];ok=chord>0 and curvature>0 and cos-7*K>0 and bool(axes);attempts.append({'T':T,'K':K,'ok':ok,'chordMargin':chord,'curvatureMargin':curvature,'cosMinusRK':cos-7*K})
  if ok:cert={'raw':raw,'syntax':'MQ','initialKind':'single-quadratic','initialArcMax':7,'T':T,'K':K,'u':u,'v':v,'lambdaAt':at,'lambda':lam,'cross':cr,'strictAxis':'xy'[axes[0]],'originalQ':z,'guide':f['strokes'][raw-1][0]['revealPath'],'firstLegLength':None,'width':14,'radius':7,'chordSquaredMinusRadiusSquared':chord,'curvatureMargin':curvature,'cosLower':cos,'cosMinusRK':cos-7*K,'initialSufficientConditions':True};break
 initial.append({'raw':raw,'certificate':cert,'attempts':attempts,'PIntersectionConnectivityNotProved':True})
roundRisks=[]
for raw in[4,8,9]:
 q0=tuple(RAW_Q[raw][:2]);prior=[p for z in RAW_P[:raw-1]for p in z];found=None
 for pi,p in enumerate(RAW_P[raw-1]):
  for t in ears(p):
   W=tuple(sum(v[j]for v in t)/3 for j in[0,1]);d2=dot(sub(W,q0),sub(W,q0))
   if not(state(W,p)==1 and all(state(W,z)==-1 for z in prior)and d2<49):continue
   delta=F(1,100)
   for it in range(64):
    corners=[(W[0]+a*delta,W[1]+b*delta)for a in[-1,1]for b in[-1,1]]
    # A strict source/prior winding margin prevents any boundary crossing inside the box; disk7 is convex.
    margins=[]
    for poly in[p]+prior:
     for a,b in zip(poly,poly[1:]+poly[:1]):
      den=abs(b[0]-a[0])+abs(b[1]-a[1]);c=abs(cross(a,b,W));margin=c/den if c else max(min(a[0],b[0])-W[0],W[0]-max(a[0],b[0]),min(a[1],b[1])-W[1],W[1]-max(a[1],b[1]));margins.append(margin)
    if min(margins)>delta and all(state(C,p)==1 and all(state(C,z)==-1 for z in prior)and dot(sub(C,q0),sub(C,q0))<49 for C in corners):break
    delta/=2
   else:raise AssertionError('No strict rational start-disk witness box')
   found={'raw':raw,'point':W,'PIndex1Based':pi+1,'distanceSquared':d2,'boxHalfWidth':delta,'boxArea':4*delta*delta,'priorRawPrefixThrough':raw-1,'outsideOriginalCompletedPrefix':True,'fixedStartDiskJumpConditionalOnP0Hidden':True};break
  if found:break
 roundRisks.append(found or{'raw':raw,'strictWitnessFound':False,'notSafetyProof':True})
output={'schema':'hanja-raw-Q7-initial-risk-conditions/v1','date':'2026-10-26','glyph':'瑃','root':'u7443-g','sourceFull5':{'path':FULL,'SHA256':hashlib.sha256(fullBytes).hexdigest()},'rawTargets':[4,8,9],'sourceCounts':{'raw':14,'calls':14,'P':25},'coordinates':'100 units; actual numeric original coordinate /2, converted to exact decimal rational for proof; width14/radius7. No rewritten product Q.','normalizationEvidence':{"scalars":308,"sameAsActualJSNumericHalf":True,"normalizedRationalStringsSHA256":"028f914dca91f90a312adf5f08c00e2052219156fcb08b9cd8b0c8f166649ce9","scope":"All original P coordinate scalars plus the three original Q control tuples; direct JavaScript numeric division by2 was compared to the exact rational inputs. This is analysis, not a production projection."},'initialConditionMethod':{'path':INIT_METHOD,'SHA256':hashlib.sha256(initBytes).hexdigest(),'oldTargetLoopsExecuted':0},'adjacentPolygonBacktrackChecks':81,'sourceWeightRecomputed':False,'coverage':coverage,'initialGrowingGuideConditions':initial,'fixedStripRisks':stripRisks,'fixedRoundStartDiskRisks':roundRisks,'methodReferences':[{'path':EAR,'SHA256':hashlib.sha256(eb).hexdigest(),'functionsOnly':sorted(allowed),'oldTargetLoopsExecuted':0}],'limits':['Global original P contained in the original Q7 tube does not prove time-dependent original-P intersection connectivity.','Initial guide sufficient conditions do not approve a clipping policy, original temporal direction or actual native playback.','No-witness is not a safety proof. Prefix tests use unchanged raw order, which ROOT mapped to the same logical prefixes for raw4/8/9 only.','All25 original source polygons remain; triangle decorations are included, not deleted or independently retimed.'],'sourcePOrQOrWidthChanged':False,'engine':0,'sourceProjection':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(enc(output),ensure_ascii=False))
