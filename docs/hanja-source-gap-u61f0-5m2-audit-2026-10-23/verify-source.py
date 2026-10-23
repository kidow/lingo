# New source-only audit of ROOT-observed 懰5m2 connectivity failure.
from pathlib import Path
from fractions import Fraction as F
import json,re,hashlib
r=Path(__file__).resolve().parents[2];fixture='docs/hanja-source-cached-order2-u61f0-2026-10-23/fixtures.json'
raw=(r/fixture).read_bytes();f=json.loads(raw)['u61f0-order2'];prior,s=f['strokes'][4]
assert hashlib.sha256(raw).hexdigest()=='8b6167b4be2b6d8d98803367c1a32fc4ce835c24c6d34e6ee1b4ac046d399be5'
def polys(text):
 return [list(zip(a[::2],a[1::2]))for a in [list(map(F,re.findall(r'-?\d+(?:\.\d+)?',t)))for t in text.split('M')[1:]]]
def edges(p):return list(zip(p,p[1:]+p[:1]))
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def signed(p):return sum(a[0]*b[1]-b[0]*a[1] for a,b in edges(p))/2
def area(p):return abs(signed(p))if p else F(0)
def clip(subject,c):
 if signed(c)<0:c=list(reversed(c))
 out=subject
 for a,b in edges(c):
  old=out;out=[]
  if not old:break
  for u,v in edges(old):
   cu,cv=cross(a,b,u),cross(a,b,v)
   if cu>=0:out.append(u)
   if (cu<0<cv)or(cv<0<cu):
    t=cu/(cu-cv);out.append(tuple(u[k]+t*(v[k]-u[k])for k in range(2)))
 return out
def dist2(q,a,b):
 v=[b[i]-a[i]for i in range(2)];t=max(F(0),min(F(1),sum((q[i]-a[i])*v[i]for i in range(2))/sum(x*x for x in v)))
 return sum((q[i]-a[i]-t*v[i])**2 for i in range(2))
def inside(q,p):
 n=False
 for a,b in edges(p):
  if cross(a,b,q)==0 and all(min(a[i],b[i])<=q[i]<=max(a[i],b[i])for i in range(2)):return False
  if (a[1]>q[1])!=(b[1]>q[1]) and a[0]+(q[1]-a[1])*(b[0]-a[0])/(b[1]-a[1])>q[0]:n=not n
 return n
A=polys(prior['outline'])[0];P=polys(s['outline']);contact=clip(P[0],A);contactArea=area(contact);assert contactArea>0
assert prior['direction']=='down' and 'revealPath'not in prior and prior['bounds']==[33.95,10.9,39.95,32.95]
seed=(F(36),F(31));assert inside(seed,A)and inside(seed,P[0]);margin=min(dist2(seed,a,b)for p in [A,P[0]]for a,b in edges(p));radius=F(1,4);assert margin>radius**2
nums=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])));u=nums[2]-nums[0];v=nums[4]-nums[2];assert u>0 and v>0
qx=F('32.896705627441406');qy=F('34.64826202392578');rho=F('.5434485054015988');xgap=F('33.95')-qx-rho;ygap=qy-rho-F('32.95');assert xgap>0 and ygap>0
cut=F(39);ivals=[]
for a,b in edges(P[0]):
 if min(a[0],b[0])<cut<max(a[0],b[0]):ivals.append(a[1]+(cut-a[0])*(b[1]-a[1])/(b[0]-a[0]))
assert len(ivals)==2 and max(ivals)>min(ivals)
# Decorations are original P; contact below is sufficient source feasibility only.
decorContacts=[area(clip(P[0],p if signed(p)>0 else list(reversed(p))))for p in P[1:]]
def shared_edge2(p,q):
 values=[]
 for a,b in edges(p):
  for c,d in edges(q):
   if cross(a,b,c)==0 and cross(a,b,d)==0:
    pts=sorted(set(v for v in [a,b,c,d] if all(min(x[i],y[i])<=v[i]<=max(x[i],y[i])for x,y in [(a,b),(c,d)]for i in range(2))))
    if len(pts)>=2:values.append(sum((pts[-1][i]-pts[0][i])**2 for i in range(2)))
 return max(values,default=F(0))
decorEdges=[shared_edge2(P[0],p)for p in P[1:]]
assert all(a>0 or e>0 for a,e in zip(decorContacts,decorEdges))
def q(v):return[str(v.numerator),str(v.denominator)]
def point(v):return[q(x)for x in v]
out={'schema':'hanja-observed-gap-source-feasibility-audit/v1','root':'u61f0','glyph':'懰','pen':5,'mask':2,'fixture':fixture,'fixtureSHA256':hashlib.sha256(raw).hexdigest(),'geometrySHA256':hashlib.sha256(json.dumps(f['strokes'],ensure_ascii=False,separators=(',',':')).encode()).hexdigest(),'fullProofKeys':list(f['fullProof']),'sourceGroups':f['sourceGroups'][4],'originalSegment':s,'actualCompletedPrior':{'segment':prior,'kind':'cardinal-originalP','notAssumedRoundGuideMask':True},'reportedNativeObservation':{'author':'ROOT','globalProgress':.5009887427846339,'d':.5434485054015988,'rho':.5434485054015988,'q':[32.896705627441406,34.64826202392578],'bad':[],'errors':[],'nativeVisualGapObserved':True,'childDidNotObserveBrowser':True},'endpointDiskSeparatingInequalities':{'qXPlusRho':float(qx+rho),'qYMinusRho':float(qy-rho),'strictXGap':q(xgap),'strictYGap':q(ygap),'doesNotAloneProveWholeButtGuideMaskSeparation':True},'originalSourceContact':{'primaryPolygonPriorIntersection':list(map(point,contact)),'positiveArea':q(contactArea),'strictSeed':point(seed),'strictRootOpenDiskRadius':q(radius),'strictBoundaryMarginSquared':q(margin),'diskRemainingMarginSquared':q(margin-radius**2),'actualPriorPContainsDisk':True},'candidateFootPartition':{'cutX':q(cut),'guideStrictXMonotoneDerivativeHalfEndpoints':[q(u),q(v)],'primarySourceCutVerticalInterval':list(map(q,sorted(ivals))),'primaryDecorationIntersectionAreas':list(map(q,decorContacts)),'primaryDecorationSharedEdgeLengthSquared':list(map(q,decorEdges)),'initialAllPositiveAreaAssumptionRejected':True,'zeroAreaFirstDecorationHasPositiveSharedEdge':True,'rootFirstRatherThanLeftmostPrefixRequired':True,'sourceUnionTriangulationBFSStillRequired':True,'newMicroclockWouldBeExplicit':True,'notAuthorizedByAppearanceOrRadical':True},'scope':{'originalPGuideWidthWeightUnchanged':True,'existingPolicyProfileSharedChanged':False,'BReadyFilesChanged':False,'Jev':False,'sourceCompiler':0,'engine':0,'nativeApproval':False,'runtimeApplied':False}}
print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
