from pathlib import Path
from fractions import Fraction as F
import json,hashlib,re
R=Path(__file__).resolve().parents[2]
OLD='docs/hanja-source-original-u8b92-hkcs-2026-10-26/14-prior-window-proof.json'
FIXTURE='docs/hanja-source-original-u8b92-hkcs-2026-10-26/fixtures.json'
ob=(R/OLD).read_bytes();fb=(R/FIXTURE).read_bytes()
assert hashlib.sha256(ob).hexdigest()=='192659a47f81014f615285df186dfd2559d51b6149389fc04244d6ff066a8905'
assert hashlib.sha256(fb).hexdigest()=='5e8411814e4f13dd0da9fdce4e52614f2143b4c9e0db99f69ec174297a4389c9'
old=json.loads(ob);f=json.loads(fb)['hkcs_m8b92'];prior,seg=f['strokes'][13]
assert prior==old['sourcePriorSegment']and seg==old['sourceSegment']
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(tuple,list)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
def polygons(s):
 out=[]
 for p in s.split('M')[1:]:
  v=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',p)];out.append(list(zip(v[::2],v[1::2])))
 return out
def cross(a,b,p):return(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
def on(p,a,b):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def closed(p,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  if on(p,a,b):return True
  if a[1]<=p[1]<b[1]and cross(a,b,p)>0:w+=1
  if b[1]<=p[1]<a[1]and cross(a,b,p)<0:w-=1
 return w!=0
def value(fn,x):return F(fn[0])*x+F(fn[1])
P=polygons(seg['outline']);V=polygons(prior['outline']);assert len(P)==3 and len(V)==2
S=old['verticalSlices']['openSlabs'];C=old['verticalSlices']['criticalLines'];xs=[F(x)for x in old['verticalSlices']['criticalX']]
assert len(S)==25 and len(C)==26 and all(x['continuous']for x in C)
assert old['verticalSlices']['everyClosedSliceSingleInterval']
# An open portion of this original terminal triangle edge is exterior to every other P.
b,c=P[2][1],P[2][2];assert cross(P[2][0],b,c)>0
m=tuple(b[i]+F(3,4)*(c[i]-b[i])for i in[0,1]);assert on(m,b,c)
assert not closed(m,P[0])and not closed(m,P[1])
assert max(y for x,y in V[1])<min(y for p in P for x,y in p)
vx0=min(x for x,y in V[0]);vx1=max(x for x,y in V[0]);assert(vx0,vx1)==(45,51)
assert c[0]-b[0]<0
kernelMargins=[]
for s in S:
 l,h=map(F,s['y']);l=max(l,vx0);h=min(h,vx1)
 if l>h:continue
 vals=[cross(b,c,(x,value(s['left'],x)))for x in[l,h]]
 assert max(vals)<0
 kernelMargins.append({'x':[l,h],'sourceLowerY':s['left'],'necessaryEdgeCrossAtLowerY':vals})
assert max(x for row in kernelMargins for x in row['necessaryEdgeCrossAtLowerY'])==F(-1881,4400)
# New independent 2D condition: L has one valley, U one peak.
xminL=F('65.9');xmaxU=F('40.95');assert xminL in xs and xmaxU in xs
frontiers=[]
for s in S:
 l,h=map(F,s['y']);aL=F(s['left'][0]);aU=F(s['right'][0])
 lower=(aL<=0 if h<=xminL else aL>=0 if l>=xminL else False)
 upper=(aU>=0 if h<=xmaxU else aU<=0 if l>=xmaxU else False)
 assert lower and upper
 frontiers.append({'x':[l,h],'lowerSlope':aL,'upperSlope':aU,'lowerOneValley':lower,'upperOnePeak':upper})
A=(F(48),F('47.5'));assert closed(A,P[0])and closed(A,V[0])
assert cross(b,c,A)==F(-567,50)
q=f['fullProof']['trace'][17][0]['args'];assert A==(F(str(q[2]))/2,F(str(q[3]))/2)
box=list(map(F,old['contactBox']['boundsXThenY']));assert box==[F('47.75'),F('48.25'),47,48]
assert old['contactBox']['strictInsidePriorMainPAndCurveMainP']
x0,y0,x1,y1=map(lambda x:F(str(x)),seg['bounds'])
left,right,up,down=A[0]-x0,x1-A[0],A[1]-y0,y1-A[1]
assert(left,right,up,down)==(F('9.85'),F('18.05'),F('1.95'),F('6.8'))
diameter2=(left+right)**2+(up+down)**2;assert diameter2==F(341989,400)
out={'schema':'hanja-source-point-window-feasibility/v1','date':'2026-10-26','glyph':'讒','pen':14,'mask':2,
 'inputs':[{'path':OLD,'SHA256':hashlib.sha256(ob).hexdigest()},{'path':FIXTURE,'SHA256':hashlib.sha256(fb).hexdigest()}],
 'sourcePOrQOrWidthOrWeightChanged':False,'virtualConnector':False,
 'priorCommonStarKernel':{'empty':True,'globalCurrentKernelNotDetermined':True,'exteriorEdge':[b,c],'exteriorEdgeWitness':m,'witnessOutsideOtherTwoP':True,'priorTriangleDisjointFromCurrentYRange':True,'priorCommonRegionMustHaveX':[vx0,vx1],'necessaryKernelHalfplane':'cross(edge,A)>=0; all candidate prior/current points violate it','lowerYFrontierBounds':kernelMargins,'maximumPossibleCross':F(-1881,4400),'atA':F(-567,50),'scope':'Rules out an anchor in the completed prior for homothety of the entire P3 union. It does not rule out other clip families.'},
 'newTwoDimensionalCondition':{'prior1DProofReusedAsDataNotConclusion':True,'extraFrontierConditions':frontiers,'lowerFrontierQuasiconvexMinimumX':xminL,'upperFrontierQuasiconcaveMaximumX':xmaxU,'argument':['Each old exact continuous vertical slice is [L(x),U(x)]. New slope checks prove L decreases then increases, so every sublevel of L is an interval; U increases then decreases, so every superlevel of U is an interval.','For every rectangle, active x positions are Xrange intersect {L<=rectangleTopHighY} intersect {U>=rectangleBottomLowY}; thus an interval. Every active vertical slice is one closed interval with continuous endpoints.','The proposed rectangle always contains A strictly inside original current and prior P. Therefore every positive-p intersection is nonempty, connected and has positive prior overlap. This is a new all-p 2D argument, not a transfer of the 1D window claim.']},
 'pointWindow':{'anchor':A,'anchorIsExactPreviousOriginalGuideEnd':True,'extents':[left,right,up,down],'definition':'Original unchanged P3 union intersect [48-9.85p,48+18.05p] x [47.5-1.95p,47.5+6.8p],0<=p<=1','authoredClockNotQTraversalOrPublisherTime':True,'p0PointAndHiddenRequired':True,'p1ExactlyOriginalFullP3':True,'nestedSetInclusion':True,'allPositivePConnected':True,'allPositivePPriorOverlap':True,'priorOverlapAreaLowerBound':'(min((197/20)p,1/4)+min((361/20)p,1/4))*(min((39/20)p,1/2)+min((34/5)p,1/2))>0 for p>0','initialDiameterSquaredUpperBoundCoefficient':diameter2,'diameterUpperBound':'sqrt(341989/400)*p ->0','noNonzeroLengthNeedleInZeroProgressLimit':True,'actualPriorOpaqueMustStillBeVerified':True,'nativeInitialAppearanceNotYetApproved':True},
 'sourceInitialMQOrFullQ7Replayed':0,'sourceStaticOrOriginal72Replayed':0,'old1DNativeHoldPreserved':True,
 'policyImplemented':False,'nativeApproval':False,'sourceEngine':0,'sourceProjection':0,'sharedRendererChanges':0,'server':0,'runtimeApplied':False}
print(json.dumps(enc(out),separators=(',',':')))
