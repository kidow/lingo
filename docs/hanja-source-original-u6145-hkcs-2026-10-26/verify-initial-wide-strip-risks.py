from pathlib import Path
from fractions import Fraction as F
from math import isqrt
import json,re,hashlib
R=Path(__file__).resolve().parents[2]
FIX="docs/hanja-source-original-u6145-hkcs-2026-10-26/fixtures.json"
fb=(R/FIX).read_bytes();assert hashlib.sha256(fb).hexdigest()=="1e1fd8df28591095a09018740222d9a9e2ccd0b6255a6fe545d87967116b1546"
f=json.loads(fb)['hkcs_m6145']
TARGETS=[[1,1],[2,1],[4,2],[5,1],[6,1],[7,1],[12,1],[13,1]]
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
 s=f['strokes'][pen-1][mask-1];ps=polys(s['outline']);prior=[p for z in f['strokes'][pen-1][:mask-1]for p in polys(z['outline'])]
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
result={'schema':'hanja-source-initial-fixed-strip-risk/v1','date':'2026-10-26','glyph':'慅','root':'hkcs_m6145','fixture':FIX,'fixtureSHA256':hashlib.sha256(fb).hexdigest(),'sourceCoordinates':'normalized100; original Q,width14,radius7 unchanged','targets':TARGETS,'results':results,'method':'Exact rational t0 normal sections of independently filled original P; source-edge margin and polynomial motion bound certify a positive parameter interval, radius7 strip inclusion and exclusion from both shrinking radius=min(7,arc) disks. Chord/control bounds translate to a conservative progress interval. No UA/raster/topology inference.','UARead':False,'PIntersectionConnectivityProved':False,'noWitnessMeansSafe':False,'nativeHoldOrPassClaimed':False,'existingQCoverageReplayed':0,'sourcePOrQOrWidthOrWeightChanged':False,'engine':0,'projection':0,'privateFetch':0,'sharedChanges':0,'server':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(enc(result),separators=(',',':')))
