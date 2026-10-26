from pathlib import Path
from fractions import Fraction as F
from math import isqrt
import ast,json,re,math,hashlib
R=Path(__file__).resolve().parents[2]
FULL="docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json";fullBytes=(R/FULL).read_bytes();assert hashlib.sha256(fullBytes).hexdigest()=="a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87";original=json.loads(fullBytes)
BODY="docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-whole-u655d.json";bodyBytes=(R/BODY).read_bytes();assert hashlib.sha256(bodyBytes).hexdigest()=="aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af";body=json.loads(bodyBytes);assert set(body)=={'groups','trace','defaults'} and all(body[k]==original[k]for k in body)
FIXTURE="docs/hanja-source-original-u655d-2026-10-26/fixtures.json";fixtureBytes=(R/FIXTURE).read_bytes();assert hashlib.sha256(fixtureBytes).hexdigest()=="a120891aa1745a7ecf885b71b665396c6977f95c69021d83025a38523da2cbd6";f=json.loads(fixtureBytes)['u655d']
assert len(original['groups'])==len(original['trace'])==13 and sum(map(len,original['trace']))==14 and sum(len(g['polygons'])for g in original['groups'])==28
for g,t in zip(original['groups'],original['trace']):assert g['polygons']==[p for c in t for p in c['polygons']]
def half(x):return F(str(x/2))
RAW_P=[[[ (half(v['x']),half(v['y']))for v in p]for p in g['polygons']]for g in original['groups']]
TARGET_ROWS=[[1,1,2],[2,1,3],[4,2,6],[6,1,8],[7,1,9],[8,1,10],[10,1,12],[11,1,13]]
TARGETS=[r[:2]for r in TARGET_ROWS]
normalized=[half(v[k])for g in original['groups']for p in g['polygons']for v in p for k in['x','y']]+[half(v)for r in original['trace']for c in r for v in c['args'][:4 if c['kind']=='cdDrawLine'else 6]]
actual_js_half=[34.5,7.5,34.5,40.5,28.5,40.5,28.5,6.5,34.5,7.5,36,8.5,33.5,10,24.6,16.5,23.4,19.1,22,21.6,20.55,24.05,18.95,26.45,17.2,28.8,15.3,31.05,13.3,33.25,11.15,35.4,8.8,37.4,6.3,39.3,5.65,38.65,7.4,36.1,9.1,33.65,10.75,31.2,12.25,28.8,13.65,26.4,14.95,24,16.15,21.6,17.2,19.2,18.15,16.8,19,14.35,18.8,14.85,24.6,16.5,19.25,13.7,24.6,16.5,25.65,18,22.75,18.5,38.15,14.4,40.2,15.5,42.15,16.65,44.05,18,45.8,19.45,47.5,21.05,49.1,22.7,50.6,24.45,52,26.35,53.3,28.3,54.55,30.35,49.1,32.9,48.3,30.95,47.45,29.05,46.5,27.2,45.45,25.4,44.35,23.65,43.15,21.9,41.85,20.2,40.5,18.5,39.1,16.8,37.6,15.15,54.55,30.35,54.65,32.6,53.1,34.35,50.85,34.4,49.1,32.9,16.5,38.5,16.5,91,10.5,94,10.5,35.5,13.5,38.5,49.5,38.5,49.5,40.5,13.5,40.5,52.5,39.5,52.5,84.5,46.5,84.5,46.5,39.5,46.5,38.5,49.5,36,55,40.5,52.5,42.5,46.5,39.5,46.5,84.5,47.7,86.3,49.5,87.5,51.3,86.3,52.5,84.5,52.5,84.5,52.4,85.75,52.2,87,51.8,88.2,51.15,89.35,50.35,90.35,49.35,91.15,48.2,91.8,47,92.2,45.75,92.4,44.5,92.5,44.5,86.5,45.1,86.45,45.55,86.35,45.85,86.25,46,86.2,46.1,86.1,46.2,86,46.25,85.85,46.35,85.55,46.45,85.1,46.5,84.5,44.5,89.5,44.5,86.5,39.5,86.5,39.5,88,34.5,38.5,34.5,89.5,28.5,92.5,28.5,38.5,26.9,50.25,26.4,53.2,25.85,56.1,25.2,58.95,24.45,61.75,23.65,64.45,22.75,67.15,21.75,69.75,20.6,72.3,19.35,74.8,17.9,77.15,17.05,76.8,17.55,74.15,18.05,71.45,18.6,68.8,19.05,66.15,19.5,63.5,19.9,60.8,20.25,58.05,20.55,55.3,20.8,52.5,20.95,49.65,20.9,50.15,26.9,50.25,21.05,48.6,26.9,50.25,28.3,51.4,25.65,52.65,36.1,48.2,37.55,50.15,38.85,52.25,40,54.35,41.05,56.6,42,58.9,42.85,61.25,43.6,63.65,44.25,66.1,44.8,68.6,45.3,71.15,39.35,71.8,39.2,69.4,39,67,38.7,64.65,38.4,62.35,37.95,60.05,37.5,57.75,37,55.5,36.45,53.2,35.9,50.95,35.3,48.6,45.3,71.15,44.65,73.35,42.65,74.45,40.45,73.8,39.35,71.8,73.45,8,72.25,13,70.95,17.85,69.5,22.5,67.9,27,66.15,31.35,64.25,35.5,62.2,39.5,60,43.3,57.55,46.85,54.95,50.2,54.2,49.75,55.95,45.95,57.6,42.05,59.2,38.1,60.75,34.05,62.15,29.85,63.45,25.55,64.65,21.1,65.75,16.5,66.7,11.8,67.55,6.9,67.45,7.4,73.45,8,67.7,5.95,73.45,8,74.7,9.3,72,10.3,64.2,30.5,93.8,30.5,93.8,32.5,64.2,32.5,93.8,30.5,81.8,31.5,87.8,25.5,85.55,31.75,84.15,41.3,82.2,50.1,79.75,58.25,76.7,65.7,73.1,72.4,69,78.4,64.3,83.6,59.1,88.05,53.35,91.65,47.15,94.4,46.8,93.55,52.4,90,57.4,85.95,61.9,81.35,65.95,76.15,69.45,70.3,72.45,63.8,74.95,56.7,77,48.85,78.55,40.35,79.6,31.2,62.3,36.9,63.95,44.15,65.8,50.85,67.95,57.05,70.45,62.7,73.25,67.85,76.35,72.5,79.85,76.6,83.6,80.25,87.75,83.4,92.2,86.1,88.95,91.85,84.05,88.45,79.6,84.6,75.65,80.2,72.15,75.4,69.15,70.1,66.6,64.35,64.55,58.2,62.95,51.55,61.85,44.5,61.4,37,88.95,91.85,92.2,86.1,94.5,87.45,31.5,7,31.5,39.5,22,15,17,28,6,39,37.5,14.5,47,21.5,52.5,33,13.5,39.5,13.5,92.5,13.5,39.5,49.5,39.5,49.5,39.5,49.5,84.5,49.5,84.5,49.5,89.5,44.5,89.5,31.5,39.5,31.5,91,24,49.5,22.5,64.5,17.5,77,35.5,48,41,59,42.5,73,70.6,7,65.8,32.5,54.6,50,64.2,31.5,93.8,31.5,82.6,31.5,77.8,80,47,94,61.8,36.5,66.2,75,90.6,89]
assert normalized==[F(str(x))for x in actual_js_half]
INIT_METHOD='docs/hanja-source-original-u705d-hkcs-m-2026-10-26/verify-independent-conditions.py';initBytes=(R/INIT_METHOD).read_bytes();assert hashlib.sha256(initBytes).hexdigest()=='4f18233d2bba8eb440506fc2a4134b052fa304bfaa27ef9826b39ec9ae3b1221'
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
for pen,mask,raw in TARGET_ROWS:
 callResults=[]
 for ci,call in enumerate(original['trace'][raw-1]):
  a=call['args'];kind=call['kind'];assert kind in ['cdDrawLine','cdDrawCurve']
  q0=tuple(half(x)for x in a[:2]);q2=tuple(half(x)for x in (a[2:4]if kind=='cdDrawLine'else a[4:6]));q1=tuple((q0[j]+q2[j])/2 for j in[0,1])if kind=='cdDrawLine'else tuple(half(x)for x in a[2:4])
  samples=[tuple((1-t)**2*q0[j]+2*t*(1-t)*q1[j]+t*t*q2[j]for j in[0,1])for t in[F(i,256)for i in range(257)]];sf=[tuple(map(float,q))for q in samples];leaves=[];unresolved=[];maxdepth=0
  def cover(t,route,depth):
   global maxdepth
   maxdepth=max(maxdepth,depth);fv=[tuple(map(float,v))for v in t];order=sorted(range(257),key=lambda k:max(sum((v[j]-sf[k][j])**2 for j in[0,1])for v in fv))
   for k in order[:8]:
    dd=[sum((v[j]-samples[k][j])**2 for j in[0,1])for v in t]
    if max(dd)<49:leaves.append({'route':route,'centerT':str(F(k,256)),'radiusSquaredMargin':str(49-max(dd))});return
   if depth>=12:unresolved.append({'route':route,'triangle':t});return
   k=max(range(3),key=lambda i:sum((t[i][j]-t[(i+1)%3][j])**2 for j in[0,1]));a,b,c=t[k],t[(k+1)%3],t[(k+2)%3];mid=tuple((a[j]+b[j])/2 for j in[0,1]);cover((a,mid,c),route+'0',depth+1);cover((mid,b,c),route+'1',depth+1)
  triangles=[];methods=[]
  for pi,poly in enumerate(call['polygons']):
   p=[(half(v['x']),half(v['y']))for v in poly]
   try:simple(p);tr=ears(p);assert sum(abs(area(list(t)))for t in tr)==abs(area(p));method='verified-simple-ear'
   except AssertionError:tr=[(p[0],p[k],p[k+1])for k in range(1,len(p)-1)if cross(p[0],p[k],p[k+1])!=0];method='original-signed-fan-superset'
   triangles.append(tr);methods.append(method)
   for ti,t in enumerate(tr):cover(t,str(pi)+':'+str(ti)+':',0)
  callResults.append({'call':ci+1,'kind':kind,'sourceArgs':a,'originalPCount':len(call['polygons']),'triangulation':methods,'triangles':triangles,'coverLeaves':leaves,'unresolved':unresolved,'maxSplitDepth':maxdepth,'strictFullPContained':not unresolved})
 coverage.append({'pen':pen,'mask':mask,'raw':raw,'syntax':'MLQ'if raw==6 else'MQ','originalGuide':f['strokes'][pen-1][mask-1]['revealPath'],'callCoverage':callResults,'strictFullPContained':all(c['strictFullPContained']for c in callResults),'argument':'Each unchanged original call P is covered by radius7 disks centered on its own source L or Q; the union is a sufficient full composite guide coverage. A line is parametrized algebraically by its midpoint only for sampling, without adding or rewriting a product Q. Signed fan coverage is sufficient without simplicity; verified simple polygons use exact ears.','notAllTimeIntersectionProof':True})
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
 s=f['strokes'][pen-1][mask-1];ps=polys(s['outline']);prior=[p for zs in f['strokes'][:pen-1]for z in zs for p in polys(z['outline'])]+[p for z in f['strokes'][pen-1][:mask-1]for p in polys(z['outline'])]
 a=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])];assert s['revealWidth']==14
 if ' L'in s['revealPath']:
  assert len(a)==8 and ' Q'in s['revealPath'];q0=tuple(a[:2]);q1=tuple(a[2:4]);m=tuple((q0[j]+q1[j])/2 for j in[0,1]);totalLengthUpper=sqrtbounds(dot(sub(q1,q0),sub(q1,q0)))[1]+sqrtbounds(dot(sub(tuple(a[4:6]),q1),sub(tuple(a[4:6]),q1)))[1]+sqrtbounds(dot(sub(tuple(a[6:8]),tuple(a[4:6])),sub(tuple(a[6:8]),tuple(a[4:6]))))[1]
 else:
  assert len(a)==6;q0,m,q1=tuple(a[:2]),tuple(a[2:4]),tuple(a[4:]);totalLengthUpper=sqrtbounds(dot(sub(m,q0),sub(m,q0)))[1]+sqrtbounds(dot(sub(q1,m),sub(q1,m)))[1]
 u=sub(m,q0);v=sub(sub(q1,m),u);n0=(-2*u[1],2*u[0]);nn=dot(n0,n0);assert nn>0
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
 qt=tuple(q0[j]+2*u[j]*T+v[j]*T*T for j in[0,1]);dlo=sqrtbounds(dot(sub(qt,q0),sub(qt,q0)))[0];Lhi=totalLengthUpper;safe=dlo/Lhi;assert safe>0
 results.append({'pen':pen,'mask':mask,'initialNormalSufficientWitnessFound':True,'point':W,'normalLambda':lam,'normalDistanceSquared':lam*lam*nn,'strictInsideOriginalPOutsideCompletedPrior':True,'strictWindingMarginLInfinity':margin,'witnessMotionCoefficient':growth,'allSourceTau0ToTPreservesMembership':True,'sourceGuideT':T,'sourceTMeans':'first-original-L-only'if ' L'in s['revealPath']else'original-Q','wholeMaskLengthUpper':totalLengthUpper,'raw6QRestarted':False,'normalDistanceLower':rnlo,'prefixArcUpper':dhi,'outsideBothShrinkingCapsForAllSmallPositiveP':True,'definitelyEarlyNormalizedProgressInterval':[0,safe],'nativeSuggestedFractions':[0,F(1,10**8),min(safe/2,F(1,10000)),F(1,1000),F(1,100),F(3,100)]})

stripRisks=results
initial=[]
for pen,mask,raw in TARGET_ROWS:
 s=f['strokes'][pen-1][mask-1];a=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])]
 if raw==6:
  q0=tuple(a[:2]);end=tuple(a[2:4]);lengthSquared=dot(sub(end,q0),sub(end,q0));assert lengthSquared==45**2
  initial.append({'pen':pen,'mask':mask,'raw':raw,'certificate':{'syntax':'MLQ','initialKind':'straight-first-leg','firstLegLength':F(45),'initialArcMax':7,'firstLegAtLeast7':True,'guide':s['revealPath'],'T':None,'K':F(1,20),'initialSufficientConditions':True},'QRestarted':False,'PIntersectionConnectivityNotProved':True});continue
 z=a;q0,q1,q2=tuple(z[:2]),tuple(z[2:4]),tuple(z[4:]);u=sub(q1,q0);v=sub(sub(q2,q1),u);vv=dot(v,v);attempts=[];cert=None
 for T,K in[(F(1,2),F(1,20)),(F(1),F(1,20)),(F(1,2),F(1,10)),(F(1),F(1,10))]:
  at=max(F(0),min(T,-dot(u,v)/vv))if vv else F(0);lam=dot(tuple(u[j]+at*v[j]for j in[0,1]),tuple(u[j]+at*v[j]for j in[0,1]));cr=u[0]*v[1]-u[1]*v[0];chord=dot(tuple(2*T*u[j]+T*T*v[j]for j in[0,1]),tuple(2*T*u[j]+T*T*v[j]for j in[0,1]))-49;curvature=4*K*K*lam**3-cr*cr;cos=1-(7*K)**2/2;axes=[j for j in[0,1]if u[j]*(u[j]+T*v[j])>0];ok=chord>0 and curvature>0 and cos-7*K>0 and bool(axes);attempts.append({'T':T,'K':K,'ok':ok,'chordMargin':chord,'curvatureMargin':curvature,'cosMinusRK':cos-7*K})
  if ok:cert={'syntax':'MQ','initialKind':'single-quadratic','initialArcMax':7,'T':T,'K':K,'u':u,'v':v,'lambdaAt':at,'lambda':lam,'cross':cr,'strictAxis':'xy'[axes[0]],'originalQ':z,'guide':s['revealPath'],'firstLegLength':None,'width':14,'radius':7,'chordSquaredMinusRadiusSquared':chord,'curvatureMargin':curvature,'cosLower':cos,'cosMinusRK':cos-7*K,'initialSufficientConditions':True};break
 initial.append({'pen':pen,'mask':mask,'raw':raw,'certificate':cert,'attempts':attempts,'PIntersectionConnectivityNotProved':True})
roundRisks=[]
for pen,mask,raw in TARGET_ROWS:
 s=f['strokes'][pen-1][mask-1];a=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])];q0=tuple(a[:2]);prior=[p for zs in f['strokes'][:pen-1]for z in zs for p in polys(z['outline'])]+[p for z in f['strokes'][pen-1][:mask-1]for p in polys(z['outline'])];found=None
 for pi,p in enumerate(polys(s['outline'])):
  for t in[(p[0],p[i],p[i+1])for i in range(1,len(p)-1)if cross(p[0],p[i],p[i+1])!=0]:
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
   found={'pen':pen,'mask':mask,'raw':raw,'point':W,'PIndex1Based':pi+1,'distanceSquared':d2,'boxHalfWidth':delta,'boxArea':4*delta*delta,'completedLogicalPrefixThrough':pen-1,'completedOwnMasks':mask-1,'maskStartUsesOriginalL':raw==6,'outsideOriginalCompletedPrefix':True,'fixedStartDiskJumpConditionalOnP0Hidden':True};break
  if found:break
 roundRisks.append(found or{'pen':pen,'mask':mask,'raw':raw,'strictWitnessFound':False,'notSafetyProof':True})
output={'schema':'hanja-source-Q7-mask-initial-risk/v1','date':'2026-10-26','glyph':'敝','root':'u655d','sourceFull5':{'path':FULL,'SHA256':hashlib.sha256(fullBytes).hexdigest()},'sourceBody3':{'path':BODY,'SHA256':hashlib.sha256(bodyBytes).hexdigest(),'projectionExact':True},'fixture':{'path':FIXTURE,'SHA256':hashlib.sha256(fixtureBytes).hexdigest(),'geometrySHA256':f['geometrySHA256']},'targets':[{'pen':p,'mask':m,'raw':r,'syntax':'MLQ'if r==6 else'MQ'}for p,m,r in TARGET_ROWS],'sourceCounts':{'raw':13,'calls':14,'P':28,'logicalPens':11,'masks':13,'curveMasks':8,'curveCalls':8},'coverage':coverage,'initialGrowingGuideConditions':initial,'fixedStripRisks':stripRisks,'fixedRoundStartDiskRisks':roundRisks,'normalizationEvidence':{'scalars':len(normalized),'sameAsActualJSNumericHalf':True,'rationalSHA256':hashlib.sha256(json.dumps([str(v)for v in normalized],separators=(',',':')).encode()).hexdigest()},'initialConditionMethod':{'path':INIT_METHOD,'SHA256':hashlib.sha256(initBytes).hexdigest(),'oldTargetLoopsExecuted':0},'methodReferences':[{'path':EAR,'SHA256':hashlib.sha256(eb).hexdigest(),'functionsOnly':sorted(allowed),'oldTargetLoopsExecuted':0}],'limits':['Raw6 is one source-authored MLQ mask containing all five original contours; its initial analysis starts on the original L, never restarts at the Q.','Coverage of each original call P by its own original L/Q-center radius7 disks implies full composite-guide coverage; no source Q, P, width or calculated weight is changed.','Initial guide T/K conditions are separate from intersection connectivity, strip safety, timing equivalence and native approval.','Strict source/prior witness gives a counterexample; no witness is not a safety proof. Prior means all completed logical pens plus completed own masks according to the directly reviewed mapping.','Full Q7 coverage does not prove all-time growing-P intersection connectivity. Signed fan triangle coverage, when used, is sufficient and does not assume simple source polygons.'],'sourcePOrQOrWidthChanged':False,'calculatedWeightChanged':False,'raw6CurveRestarted':False,'sourceEngineReplay':0,'sourceProjection':0,'nativeApproval':False,'runtimeApplied':False}
assert len(coverage)==len(initial)==len(stripRisks)==len(roundRisks)==8
print(json.dumps(enc(output),ensure_ascii=False))
