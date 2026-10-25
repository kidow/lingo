from pathlib import Path
from fractions import Fraction as F
import ast,json,re,hashlib
R=Path(__file__).resolve().parents[2];FIXTURE='docs/hanja-source-original-u8b92-hkcs-2026-10-26/fixtures.json';raw=(R/FIXTURE).read_bytes();assert hashlib.sha256(raw).hexdigest()=='5e8411814e4f13dd0da9fdce4e52614f2143b4c9e0db99f69ec174297a4389c9'
f=json.loads(raw)['hkcs_m8b92'];prior,seg=f['strokes'][13];assert seg['revealPath']=='M39 50 Q48 49 66 46' and seg['revealWidth']==14
PURE='docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';PURE_SHA='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
AFFINE='docs/hanja-source-original-u8b92-hkcs-2026-10-26/verify-short-curve-y-prefix.py';AFFINE_SHA='3e8c718f094ca58ef4632c34f40167bc779a9cca50bf7f2c8adce08ae91852f5'
N={}
for p,pin,names in [(PURE,PURE_SHA,{'vec','det','value','union_row','events'}),(AFFINE,AFFINE_SHA,{'enc','cross','on','closed','merge','closed_row','affine_slab','simple'})]:
 b=(R/p).read_bytes();assert hashlib.sha256(b).hexdigest()==pin;nodes=[x for x in ast.parse(b).body if isinstance(x,(ast.Import,ast.ImportFrom))or isinstance(x,ast.FunctionDef)and x.name in names];exec(compile(ast.Module(body=nodes,type_ignores=[]),p,'exec'),N)
def polys(outline):
 out=[]
 for s in outline.split('M')[1:]:
  v=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s)];assert len(v)%2==0;out.append(list(zip(v[::2],v[1::2])))
 return out
P=polys(seg['outline']);V=polys(prior['outline']);assert len(P)==3 and len(V)==2
simple=[N['simple'](p)for p in P+V];T=[[(y,x)for x,y in p]for p in P]
lo=min(x for p in P for x,y in p);hi=max(x for p in P for x,y in p);es=N['events'](T,lo,hi);slabs=[N['affine_slab'](T,a,b)for a,b in zip(es,es[1:])];critical=[]
for i,x in enumerate(es):
 row=N['closed_row'](T,x);assert len(row)==1;limits=[]
 if i:limits.append([N['value'](slabs[i-1][k],x)for k in ['left','right']])
 if i<len(slabs):limits.append([N['value'](slabs[i][k],x)for k in ['left','right']])
 assert all(tuple(v)==row[0]for v in limits);critical.append({'x':x,'closedY':row,'adjacentLimits':limits,'continuous':True})
box=[F('47.75'),F('48.25'),F(47),F(48)];corners=[(x,y)for x in box[:2]for y in box[2:]];boxCert=[]
for name,p in [('priorMainP',V[0]),('curveMainP',P[0])]:
 area=sum(a[0]*p[(i+1)%len(p)][1]-p[(i+1)%len(p)][0]*a[1]for i,a in enumerate(p));sign=1 if area>0 else-1;ms=[[sign*N['cross'](a,p[(i+1)%len(p)],q)for i,a in enumerate(p)]for q in corners];assert min(v for r in ms for v in r)>0;boxCert.append({'P':name,'allFourCornersInsideEveryInteriorEdgeHalfplane':True,'signedEdgeMargins':ms})
xc=F(48);left=xc-lo;right=hi-xc;assert left>0 and right>0 and box[0]<xc<box[1]
q0=(F(39),F(50));assert N['closed'](q0,P[1])and not any(N['on'](q0,a,P[1][(i+1)%len(P[1])])for i,a in enumerate(P[1]));priorMinX=min(x for p in V for x,y in p);early=F(1,10);bound=q0[0]+early+F(7,6);assert bound<priorMinX
# x'=18+18t>0, |y'|=2+4t. 6|y'|<=x' on0<=t<=1, so full width14 butt-strip x-offset is <=7/6. Caps have radius <=d.
out={'schema':'hanja-source-prior-window-feasibility/v1','date':'2026-10-26','glyph':'讒','pen':14,'mask':2,'fixture':{'path':FIXTURE,'SHA256':hashlib.sha256(raw).hexdigest()},'geometrySHA256':'3e0339d807e7bc697bed53420f88ff3fc52048df340c1d658c483898c6f406eb','sourcePriorSegment':prior,'sourceSegment':seg,'originalPCounts':{'prior':2,'current':3},'simpleOriginalPolygons':simple,'originalQSeam':{'previousEnd':[48,F('47.5')],'currentStart':[39,50],'delta':[-9,F('2.5')],'sourceUnchanged':True},'normalGrowingFrontCounterexample':{'initialArcRange':[0,early],'Q0StrictlyInsideOriginalP2':True,'tangentNormalXBound':'|normal.x|<=1/6 for original Q(t),0<=t<=1','buttStripAndCapsMaxX':bound,'priorAllPMinX':priorMinX,'newInkVisibleButPriorDisjointForSufficientlySmallPositiveArc':True,'notRuntimeObservation':True},'verticalSlices':{'criticalX':es,'openSlabs':slabs,'criticalLines':critical,'everyClosedSliceSingleInterval':True,'affineOrderProvesAllOpenSlabs':True,'noSampleOnlyConnectivityClaim':True},'contactBox':{'boundsXThenY':box,'certificates':boxCert,'strictInsidePriorMainPAndCurveMainP':True},'candidateWindow':{'anchorX':xc,'leftExtent':left,'rightExtent':right,'definition':'Original P3 union intersect xc-leftExtent*p <= x <= xc+rightExtent*p, p in [0,1]','p0AreaZeroAndHiddenRequired':True,'p1EqualsFullOriginalP3':True,'monotoneSetInclusion':True,'connectedForEveryPositiveP':True,'positivePriorOverlapForEveryPositiveP':True,'overlapAreaLowerBound':'min((197/20)*p,1/4)+min((361/20)*p,1/4) times height1; positive for p>0','authoredClockNotQTraversalOrPublisherTime':True,'bidirectionalInkBoundaryGrowthNotMicroDirectionApproval':True,'priorMustBeCompleteAndOpaqueInActualBinder':True},'reusedMath':{'initialMQAndFullQ7Replayed':False,'staticAndOriginalNativeReplayed':False},'methods':[{'path':PURE,'SHA256':PURE_SHA},{'path':AFFINE,'SHA256':AFFINE_SHA}],'sourcePOrQOrWidthOrWeightChanged':False,'virtualConnector':False,'policyImplemented':False,'nativeApproval':False,'runtimeApplied':False,'sourceEngine':0,'sourceProjection':0,'server':0}
print(json.dumps(N['enc'](out),separators=(',',':')))
