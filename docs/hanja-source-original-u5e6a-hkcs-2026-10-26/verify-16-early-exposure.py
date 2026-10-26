from pathlib import Path
from fractions import Fraction as F
import json,hashlib,re
R=Path(__file__).resolve().parents[2]
FIX='docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json'
b=(R/FIX).read_bytes();assert hashlib.sha256(b).hexdigest()=='9a4f42f0206be94e4905f2a177caef251dbce5f0d7073772a52a7d47f84eace8'
s=json.loads(b)['hkcs_m5e6a']['strokes'][15][0]
assert s['revealPath']=='M87 55 Q83 61 74 68' and s['revealWidth']==14
P=[]
for text in s['outline'].split('M')[1:]:
 a=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',text)];P.append(list(zip(a[::2],a[1::2])))
assert len(P)==3
def sub(a,b):return tuple(x-y for x,y in zip(a,b))
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def cross(a,b,p):return(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
def Q(t):return(F(87)-8*t-5*t*t,F(55)+12*t+t*t)
def D(t):return(-8-10*t,12+2*t)
t=F(37,1000);Q0=Q(F(0));qt=Q(t);vt=D(t)
# On this interval speed^2=208+208t+104t^2 is increasing and strictly <14.9^2.
assert dot(vt,vt)<F('14.9')**2
upper=F('14.9')*t;assert upper**2<F(3,100)**2*338
UA={'p':F('0.03'),'L':F('18.45940589904785'),'d':F('.5537821769714355'),'rho':F('.5537821769714355'),'end':(F('86.6884765625'),F('55.45783996582031'))}
assert upper<UA['d']
C=(F('86.7'),F('55.4'));B=(F('89.2'),F('57.05'));W=(F('89.185'),F('57.082'))
assert B==P[0][0]==P[1][-1]==P[2][0]
assert C==tuple((P[0][-1][i]+B[i])/2 for i in[0,1])
assert all(cross(a,b,C)>0 for a,b in zip(P[1],P[1][1:]+P[1][:1]))
assert W==tuple(F(98,100)*P[2][0][i]+F(1,100)*P[2][1][i]+F(1,100)*P[2][2][i]for i in[0,1])
facts=[]
for name,p in [('bodyHeadBridgeStart',C),('originalSharedVertex',B),('farOriginalTerminalPInterior',W)]:
 g0=dot(sub(p,Q0),D(F(0)));gt=dot(sub(p,qt),vt);dist2=dot(sub(p,Q0),sub(p,Q0))
 assert g0>0 and gt<0 and dist2<16 and upper<1
 # Continuous normal-root equation has a root strictly before .037. At that root
 # distance <4+1<7, hence the point belongs to the width14 interior normal strip.
 facts.append({'name':name,'point':p,'normalRootEndpointSigns':[g0,gt],'distanceSquaredFromQ0':dist2,'insideOriginalWidth14PrefixByNormalRoot':True})
startDist2=dot(sub(W,Q0),sub(W,Q0));endDist2=dot(sub(W,UA['end']),sub(W,UA['end']))
assert startDist2>UA['rho']**2 and endDist2>UA['rho']**2
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
out={'schema':'hanja-source-early-wide-strip-audit/v1','date':'2026-10-26','glyph':'幪','pen':16,'mask':1,
 'fixture':{'path':FIX,'SHA256':hashlib.sha256(b).hexdigest()},'sourceGuide':s['revealPath'],'width':14,'UAReportedFrame':UA,
 'prefixParameterUpper':'37/1000','prefixArcUpper':upper,'beforeP03EvenUsingTotalChordLowerBound':True,'facts':facts,
 'farPointStrictOriginalP':3,'farPointOutsideBothReportedGrowingCaps':True,'farPointDistanceSquaredFromReportedEnd':endDist2,
 'farOriginalDecorationEarlyExposureProved':True,
 'retainedExactInkBridge':{'polyline':[C,B,W],'sourceFirstLeg':'Original body edge; C is also strictly inside original head triangle.','sourceSecondLeg':'Original convex terminal triangle from its original vertex to a strict positive-barycentric interior point.','maskArgument':'Normal-root signs and distance bounds remain strict for every point along each segment by linearity and convexity of the norm. Entire continuous polyline is in unchanged source ink and prefix normal strip.'},
 'entireMaskIntersectionComponentsClassified':False,'mathematicalDisconnectionClaimed':False,'nativeAAExplanationClaimed':False,
 'limits':['ROOT visual separated-fragment observation is preserved as a raster observation, not converted into a topological conclusion.','The fixed width14 strip can expose a terminal ornament far outside the small end caps. This audit is not a whole-sweep or publisher-clock approval.','Reported UA endpoint decimals are only used for the cap-distance comparison; analytic source-Q normal membership uses separate exact polynomials.'],
 'sourcePOrQOrWidthOrWeightChanged':False,'engine':0,'projection':0,'privateOriginalFetch':0,'sharedChanges':0,'server':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(enc(out),separators=(',',':')))
