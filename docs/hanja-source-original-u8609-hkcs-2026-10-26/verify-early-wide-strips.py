from pathlib import Path
from fractions import Fraction as F
from math import isqrt
import json,re,hashlib
R=Path(__file__).resolve().parents[2];FIX='docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json';fb=(R/FIX).read_bytes();assert hashlib.sha256(fb).hexdigest()=='35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6';f=json.loads(fb)['hkcs_m8609']
CAPS='lib/hanja-stroke-start-caps-u8609-hkcs.ts';cb=(R/CAPS).read_bytes();assert hashlib.sha256(cb).hexdigest()=='de9bdab530cc74ecf98ac21776ee8f604d7538ad47ea7e075bff6fa7330dad50'
saved=json.loads("{\"results\":[{\"pen\":11,\"mask\":2,\"totalGuideLengthBounds\":[\"27402460629/2500000000\",\"110213409699/10000000000\"],\"samples\":[{\"farWidth14NormalWitnesses\":[{\"point\":[\"165739830648179582973553543421/1914209579658290660294931200\",\"49824650238516099943840030017/1196380987286431662684332000\"],\"lambda\":\"-365311980677230396935395/1196380987286431662684332\",\"normalDistanceSquared\":\"5338113729052846195998046783898906776312152241/1334295515721103014171326112225563848253440000\",\"outsideBothCapsUsingPrefixArcUpper\":true,\"outsideCompletedPrior\":true,\"strictInsideCurrentOriginalP\":true}]}]},{\"pen\":12,\"mask\":1,\"totalGuideLengthBounds\":[\"90671757079/2500000000\",\"368492674953/10000000000\"],\"samples\":[{\"farWidth14NormalWitnesses\":[{\"point\":[\"562814167351285202521003916329509944892966993997316807317131280840276817895174581855055078128211/19082699668542210393335358497821742611268263398563787590808404611251187500000802750000000000000\",\"107380592754484156398428795427464891157613490720415027927772016838077988649642201028301500000253673/2442585557573402930346925887721183054242337715016164811623475790240152000000102752000000000000000\"],\"lambda\":\"1240600744706174817332845238794999756751153274951188347325442847971750899999746327/19540684460587223442775407101769464433938701720129318492987806321921216000000822016\",\"normalDistanceSquared\":\"1539090207765515544053066670406946063712146011991042422830945895242228525136079727043293585137598320680476306464661659220055383282662237523662924067888664349990929/345197895668185278309214241399010751510511505925021484322475892165183235569058681095405969452056969389230880561103539097610557973504000000000000000000000000000000\",\"outsideBothCapsUsingPrefixArcUpper\":true,\"outsideCompletedPrior\":true,\"strictInsideCurrentOriginalP\":true}]}]},{\"pen\":18,\"mask\":2,\"totalGuideLengthBounds\":[\"77954540701/10000000000\",\"77980584381/10000000000\"],\"samples\":[{\"farWidth14NormalWitnesses\":[{\"point\":[\"1613417996410749/18645140405000\",\"1536005864593/22374168486\"],\"lambda\":\"-12740917225/22374168486\",\"normalDistanceSquared\":\"55424263435998721550120689/5006034154399155321960000\",\"outsideBothCapsUsingPrefixArcUpper\":true,\"outsideCompletedPrior\":true,\"strictInsideCurrentOriginalP\":true}]}]},{\"pen\":19,\"mask\":2,\"totalGuideLengthBounds\":[\"471197182079/10000000000\",\"499053904917/10000000000\"],\"samples\":[{\"farWidth14NormalWitnesses\":[{\"point\":[\"7973488626287811189346481295088427407131883867/103739263354782820135159256046800000000000000\",\"63186850109340368254198222169193144457570572331/842881514757610413598168955380250000000000000\"],\"lambda\":\"-2407686118664694807670162352491873249730993/32366650166692239882169687886601600000000000\",\"normalDistanceSquared\":\"5796952446010662846710078825145485982931339057204600160199852566151999805346864766049/682677900270247943385989061828531987107288839716158084000000000000000000000000000000\",\"outsideBothCapsUsingPrefixArcUpper\":true,\"outsideCompletedPrior\":true,\"strictInsideCurrentOriginalP\":true}]}]}]}")
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
out=[]
for row in saved['results']:
 sample=row['samples'][0]
 if not sample['farWidth14NormalWitnesses']:continue
 pen,mask=row['pen'],row['mask'];s=f['strokes'][pen-1][mask-1];ps=polys(s['outline']);prior=[p for z in f['strokes'][pen-1][:mask-1]for p in polys(z['outline'])];w=max(sample['farWidth14NormalWitnesses'],key=lambda v:F(v['normalDistanceSquared']));W=tuple(map(F,w['point']));lam=F(w['lambda']);values=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])];q0=tuple(values[:2]);m=tuple(values[2:4]);q1=tuple(values[4:6]);u=sub(m,q0);v=sub(sub(q1,m),u);n0=(-2*u[1],2*u[0]);assert W==tuple(q0[k]+lam*n0[k]for k in[0,1]);chosen=next(p for p in ps if state(W,p)==1);assert all(state(W,p)==-1 for p in prior)
 A=(2*u[0]-2*lam*v[1],2*u[1]+2*lam*v[0]);growth=max(abs(x)for x in A)+max(abs(x)for x in v);margins=[]
 for p in[chosen]+prior:
  for a,b in zip(p,p[1:]+p[:1]):
   c=abs(cross(a,b,W));den=abs(b[0]-a[0])+abs(b[1]-a[1]);assert den>0
   if c:margin=c/den
   else:
    margin=max(min(a[0],b[0])-W[0],W[0]-max(a[0],b[0]),min(a[1],b[1])-W[1],W[1]-max(a[1],b[1]))
    assert margin>0
   margins.append(margin)
 assert F(row['totalGuideLengthBounds'][0])==sqrtbounds(dot(sub(q1,q0),sub(q1,q0)))[0]
 assert F(row['totalGuideLengthBounds'][1])==sqrtbounds(dot(u,u))[1]+sqrtbounds(dot(sub(q1,m),sub(q1,m)))[1]
 margin=min(margins);T=min(F(1,100),margin/(2*growth));loops=0
 while True:
  V0=tuple(2*x for x in u);VT=tuple(2*u[k]+2*v[k]*T for k in[0,1]);speed=max(sqrtbounds(dot(V0,V0))[1],sqrtbounds(dot(VT,VT))[1]);dhi=T*speed;rnlo=abs(lam)*(sqrtbounds(dot(V0,V0))[0]-2*sqrtbounds(dot(v,v))[1]*T)
  if max(lam*lam*dot(V0,V0),lam*lam*dot(VT,VT))<49 and rnlo>2*dhi>0:break
  T/=2;loops+=1;assert loops<64
 qt=tuple(q0[k]+2*u[k]*T+v[k]*T*T for k in[0,1]);dlo=sqrtbounds(dot(sub(qt,q0),sub(qt,q0)))[0];Lhi=F(row['totalGuideLengthBounds'][1]);Llo=F(row['totalGuideLengthBounds'][0]);safe=dlo/Lhi
 out.append({'pen':pen,'mask':mask,'retainedT0Witness':w,'strictWindingStateMarginLInfinity':margin,'normalWitnessMotionBoundCoefficient':growth,'sourceGuideParameterT':T,'allTau0ToTPreservesInsideCurrentOutsidePrior':True,'normalDistanceLowerBound':rnlo,'prefixArcUpper':dhi,'bothCapsDistanceSeparationCondition':'normalDistanceLower>2*prefixArcUpper','definitelyEarlyProgressInterval':[0,safe],'progressOfTBounds':[safe,dhi/Llo],'allSmallPositiveProgressFarStripExposure':True,'noNativeApproval':True})
assert [r['pen']for r in out]==[11,12,18,19]
result={'schema':'hanja-source-early-wide-strip-risk/v1','date':'2026-10-26','glyph':'蘉','inputs':[{'path':FIX,'SHA256':hashlib.sha256(fb).hexdigest()},{'path':CAPS,'SHA256':hashlib.sha256(cb).hexdigest()}],'results':out,
 'method':['Retained exact normal-section witnesses are verified strictly inside current original P and strictly outside all completed prior P. Old Q initial/cap/full-Q7 certificates are not rerun.','For fixed original normal coordinate lambda, W(tau)=Q(tau)+lambda*N(tau). A source-edge distance bound and polynomial displacement bound keep every W(tau),0<=tau<=T, inside that P and outside prior ink.','The original normal width stays below7 and its positive lower bound exceeds twice the whole prefix arc upper bound. For any sufficiently small positive prefix choose tau=endpointParameter/2, strictly inside the visible strip. Its ink lies outside both growing end disks even as their radius tends to zero.','Chord/control-polygon bounds give a conservative positive normalized-progress interval. This is an analytic source-risk interval, not a UA-measured display clock, raster proof or whole P-intersection connectivity result.'],
 'limits':['No native PASS or native HOLD is asserted from this source audit.','Source10m1 and20m1 had no sufficient witness in a separate exploratory t=0,.02,.04,.08 screen; that is not a safety proof and still needs native start review.','A filled-P witness is distinct from the growing-guide initial certificate; current/prior source connectivity is not inferred from guide properties.'],
 'nativeSuggestedWindows':{'11m2':[0,0.00000001,0.000001,0.001,0.003,0.006,0.01,0.03],'12m1':[0,0.00000001,0.000001,0.0001,0.0003,0.001,0.01,0.03],'18m2':[0,0.00000001,0.000001,0.001,0.005,0.008,0.01,0.03],'19m2':[0,0.00000001,0.000001,0.001,0.003,0.005,0.01,0.03]},
 'UARead':False,'existingInitialOrQ7ProofReplay':0,'sourcePOrQOrWidthOrWeightChanged':False,'engine':0,'projection':0,'privateFetch':0,'sharedChanges':0,'server':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(enc(result),separators=(',',':')))
