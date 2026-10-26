from pathlib import Path
from fractions import Fraction as F
import hashlib,json,re
R=Path(__file__).resolve().parents[2]
OLD='docs/hanja-source-original-u5e6a-hkcs-2026-10-26/contact-kernel-band-conditions-proof.json'
FIX='docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json'
ob=(R/OLD).read_bytes();fb=(R/FIX).read_bytes()
assert hashlib.sha256(ob).hexdigest()=='907cd910ccf25f0928ab145f1868fb5e2f35feb12efdcb086fb0b46c434a7b1b'
assert hashlib.sha256(fb).hexdigest()=='9a4f42f0206be94e4905f2a177caef251dbce5f0d7073772a52a7d47f84eace8'
old=json.loads(ob);f=json.loads(fb)['hkcs_m5e6a'];results=[]
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
def polygons(s):
 out=[]
 for p in s.split('M')[1:]:
  a=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',p)];out.append(list(zip(a[::2],a[1::2])))
 return out
def cross(a,b,p):return(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
for row in old['results']:
 pen=row['pen'];prior,current=f['strokes'][pen-1][:2];P=polygons(current['outline'])
 ax,ay=map(F,row['anchor']);delta=F(row['strictBoxHalfWidth'])
 assert all(F(v)>0 for values in row['strictAllEdgeBoxMargins']for v in values)
 assert row['conditionalCenteredBand']['commonScaledBoxInsidePriorAndCurrentBodyHeadForPositiveS']
 x0,y0,x1,y1=map(lambda v:F(str(v)),current['bounds']);ext=[ax-x0,x1-ax,ay-y0,y1-ay]
 assert all(v>delta>0 for v in ext)
 # New source-coordinate witness only; no browser/raster failure is asserted.
 if pen==2:
  assert len(P)==3 and row['simpleProofFor2ReusedFromStrictConvexRecord']
  box=[F(33),F(35),F('26.25'),F('26.75')];target=P[0]
 else:
  assert pen==9 and len(P)==2 and all(v['simple']for v in row['simplePolygonChecks'])
  box=[F(89),F(90),F('29.98'),F('29.995')];target=P[1]
 corners=[(x,y)for x in box[:2]for y in box[2:]]
 margins=[[cross(a,b,p)for p in corners]for a,b in zip(target,target[1:]+target[:1])]
 assert all(v>0 for edge in margins for v in edge)
 prior_max_x=F(str(prior['bounds'][2]));assert box[0]>prior_max_x
 assert box[2]<ay<box[3]
 pmax=min((ay-box[2])/(ay-y0),(box[3]-ay)/(y1-ay));assert 0<pmax<1
 risk={'outsidePriorWitnessBoxXThenY':box,'strictWitnessMargins':margins,
  'priorMaximumX':prior_max_x,'forEveryProgressOpenInterval':[0,pmax],
  'constantHorizontalInkDiameterLowerBound':box[1]-box[0],
  'argument':'For every 0<p<=pmax the old full-width centered band lies inside the strict witness Y interval, so the fixed witness X interval is painted outside the completed prior H. Its nonzero horizontal diameter does not shrink to zero.',
  'geometryOnly':True,'browserFailureClaimed':False}
 extra={}
 if pen==2:
  foot=row['lowerFoot'];assert foot['convexOriginalFoot']and not foot['positiveAreaOverlapWithBody']
  edge=F(foot['edgeY']);base0,base1=map(F,foot['sharedClosedEdgeX'])
  assert [P[2][0],P[2][1]]==[(base0,edge),(base1,edge)]
  assert all(base0<=x<=base1 and y>=edge for x,y in P[2])
  assert current['bounds'][1]<float(ay)<float(edge)and x0==base0
  # The unchanged rectangular body contains the full original base.
  assert set(P[0])=={(base0,F(26)),(base1,F(26)),(base1,edge),(base0,edge)}
  extra={'originalFootUnchanged':True,'sharedBaseY':edge,'sharedBaseX':[base0,base1],
   'positiveBodyFootAreaOverlap':False,'footConvexityReused':True,
   'newRectangleLowerYAlwaysBelowBaseInCoordinateOrder':True,
   'allPositivePFootIfVisibleAttachedThroughOriginalBase':True,
   'argument':'For any foot point in the new rectangle, its vertical projection to the original y63 base is in the unchanged convex foot and in the rectangular body. It remains inside the same rectangle because its X is unchanged and rectangle lowerY<=anchorY<63. The foot/rectangle convex intersection is therefore attached through that original base even if the whole body is not yet complete.',
   'oldBodyCompleteWhenFootAppearsNotTransferred':True,'nativeAAAcceptabilityApproved':False}
 results.append({'pen':pen,'mask':2,'anchor':[ax,ay],'extents':ext,'strictCommonBoxHalfWidth':delta,
  'oldFixedWidthRisk':risk,'initialDiameterSquaredUpperBoundCoefficient':(x1-x0)**2+(y1-y0)**2,
  'priorBodyHeadPositiveAreaLowerBoundCoefficient':4*delta*delta,
  'allPositivePConnected':True,'nestedOriginalPSubset':True,'p0HiddenPointRequired':True,
  'p1ExactlyOriginalP':True,'source9StarKernelNotConvexity':pen==9,'foot':extra})
assert [r['pen']for r in results]==[2,9]
out={'schema':'hanja-source-kernel-point-window-conditions/v1','date':'2026-10-26','glyph':'幪','root':'hkcs_m5e6a',
 'inputs':[{'path':OLD,'SHA256':hashlib.sha256(ob).hexdigest()},{'path':FIX,'SHA256':hashlib.sha256(fb).hexdigest()}],
 'results':results,'newArgument':[
 'At each unchanged prior/body/head kernel anchor A, use the rectangle whose four extents are the original bounds minus A, multiplied by p. Existing simple/star or convex source certificates are reused; they are not rerun or relabeled.',
 'Every rectangle contains A+p*strictBox. This positive-area box remains in the original prior/body/head by the certified visibility kernel. Intersections of original star-shaped polygons and an anchor-containing convex rectangle stay star-shaped; their shared box makes their union connected.',
 'For pen2 the unchanged convex foot does not share the upper kernel, so the separate vertical-to-base argument proves its connection. No whole-body-completion claim from the old y-band is transferred.',
 'Nested rectangles preserve original ink inclusion; both dimensions tend to zero at p0; p1 is the original full bounds. This is an authored geometric clock, not source-Q traversal or publisher timing.'
 ],'sourcePOrQOrWidthOrWeightChanged':False,'newConnector':False,'existingKernelOrConvexityReplay':0,
 'nativeFailureClaimed':False,'newPolicyImplemented':False,'nativeApproval':False,'runtimeApplied':False,
 'engine':0,'projection':0,'originalFetch':0,'sharedChanges':0,'server':0}
print(json.dumps(enc(out),separators=(',',':')))
