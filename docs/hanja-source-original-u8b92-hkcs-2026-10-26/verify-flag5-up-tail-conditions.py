from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2];FIXTURE='docs/hanja-source-original-u8b92-hkcs-2026-10-26/fixtures.json';b=(R/FIXTURE).read_bytes();assert hashlib.sha256(b).hexdigest()=='5e8411814e4f13dd0da9fdce4e52614f2143b4c9e0db99f69ec174297a4389c9';f=json.loads(b)['hkcs_m8b92']
def pure(path,pin,names):
 b=(R/path).read_bytes();assert hashlib.sha256(b).hexdigest()==pin
 n={};nodes=[x for x in ast.parse(b.decode()).body if isinstance(x,(ast.Import,ast.ImportFrom))or isinstance(x,ast.FunctionDef)and(names is None or x.name in names)]
 exec(compile(ast.Module(body=nodes,type_ignores=[]),path,'exec'),n);return n
N=pure('docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py','91670b2c888fd7cd691e4a19c9e43a498b0b964695ba2a7c975ab46bb958926e',None)
A=pure('docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py','2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76',{'vec','det','value','union_row','events'})
M='docs/hanja-source-original-u8b92-hkcs-2026-10-26/verify-short-curve-y-prefix.py';mb=(R/M).read_bytes();assert hashlib.sha256(mb).hexdigest()=='3e8c718f094ca58ef4632c34f40167bc779a9cca50bf7f2c8adce08ae91852f5'
H={'F':F,'value':A['value'],'union_row':A['union_row']}
for x in ast.parse(mb.decode()).body:
 if isinstance(x,ast.FunctionDef)and x.name in{'enc','cross','on','closed','merge','closed_row','affine_slab','simple'}:exec(compile(ast.Module(body=[x],type_ignores=[]),M,'exec'),H)
enc,cross,closed_row,affine_slab=H['enc'],H['cross'],H['closed_row'],H['affine_slab'];polys=N['polys']
def area(p):return sum(a[0]*p[(i+1)%len(p)][1]-p[(i+1)%len(p)][0]*a[1]for i,a in enumerate(p))/2
def convex(p):
 assert area(p)>0
 margins=[[cross(a,p[(i+1)%len(p)],z)for j,z in enumerate(p)if j not in[i,(i+1)%len(p)]]for i,a in enumerate(p)];assert min(min(m)for m in margins)>0
 return dict(vertices=len(p),signedArea=area(p),strictNonincidentEdgeMargins=margins)
def case(pen,raw):
 prior=f['strokes'][pen-1][1];seg=f['strokes'][pen-1][2];calls=f['fullProof']['trace'][raw];assert len(calls)==3 and calls[1]['kind']=='cdDrawCurve'and calls[2]['kind']=='cdDrawLine'and calls[2]['args'][-1]==5
 assert calls[1]['args'][4:6]==calls[2]['args'][:2]
 P=polys(seg['outline']);priorP=polys(prior['outline']);assert len(P)==3 and len(priorP)==2 and seg['direction']=='right'
 body=P[:2];up=P[2];cv=[convex(p)for p in P];priorHead=priorP[1];priorCv=convex(priorHead)
 start=min(x for p in body for x,y in p);end=max(x for p in body for x,y in p);carrierEnd=F(str(calls[2]['args'][2]))/2
 rotated=[[(y,x)for x,y in p]for p in body];es=A['events'](rotated,start,end);slabs=[affine_slab(rotated,a,b)for a,b in zip(es,es[1:])];critical=[]
 for i,x in enumerate(es):
  row=closed_row(rotated,x);assert len(row)==1;limits=[]
  if i:limits.append([A['value'](slabs[i-1][k],x)for k in['left','right']])
  if i<len(slabs):limits.append([A['value'](slabs[i][k],x)for k in['left','right']])
  assert all(tuple(z)==row[0]for z in limits);critical.append(dict(x=x,closedYUnion=row,adjacentLimits=limits,continuous=True))
 top=min(y for x,y in up);base=max(y for x,y in up);topxs=sorted(x for x,y in up if y==top);basexs=sorted(x for x,y in up if y==base);assert len(topxs)==len(basexs)==2
 h=base-top;tw=topxs[1]-topxs[0];bw=basexs[1]-basexs[0];assert h>0 and bw>tw>0
 assert all(y>=base for p in body for x,y in p)and all(y<=base for x,y in up)
 assert min(x for x,y in body[0])<=basexs[0]<basexs[1]<=max(x for x,y in body[0])and min(y for x,y in body[0])==base
 assert area(up)==h*(bw+tw)/2
 # Completed previous Q head is an original convex subset of the new H body.
 previousContainment=[[cross(a,body[0][(i+1)%len(body[0])],z)for i,a in enumerate(body[0])]for z in priorHead];assert min(min(m)for m in previousContainment)>=0
 cy=F(str(calls[2]['args'][1]))/2;delta=F(1,4);strip=[(start,cy-delta),(start+delta,cy-delta),(start+delta,cy+delta),(start,cy+delta)]
 stripMargins=[]
 for poly in[body[0],priorHead]:
  mm=[cross(a,poly[(i+1)%len(poly)],z)for i,a in enumerate(poly)for z in strip];assert min(mm)>=0;center=(start+delta/2,cy);assert min(cross(a,poly[(i+1)%len(poly)],center)for i,a in enumerate(poly))>0;stripMargins.append(mm)
 return dict(pen=pen,mask=3,sourceRawOneBased=raw+1,originalEndFlag=5,sourceCall=calls[2],originalPCount=3,sourceSegment=seg,sourcePrior=prior,bodyOriginalPolygons=2,tailOriginalPolygons=1,sourcePolygonsConvex=cv,priorHeadConvex=priorCv,bodyXPrefix=dict(minX=start,maxX=end,originalCarrierEndX=carrierEnd,carrierXDirectClipLeavesOriginalEndHead=end>carrierEnd,criticalX=es,openSlabs=slabs,criticalLines=critical,allPositiveNonemptyPrefixesConnected=True),bodyPriorContact=dict(priorHeadInsideBodyRectangle=True,priorHeadVertexMargins=previousContainment,commonStrip=strip,commonStripMargins=stripMargins,positiveContactAreaLowerBound='(1/2)*min(xThreshold-bodyMinX,1/4) for xThreshold>bodyMinX',actualCompletedOpaquePriorRequired=True,actualPriorIsShortPrefixGroupNotPlainPath=True),upPrefix=dict(topY=top,baselineY=base,height=h,topWidth=tw,baseWidth=bw,areaPolynomialCoefficients=[h*bw,-h*(bw-tw)/2],areaDerivativePositiveLowerBound=h*tw,fullArea=area(up),prefix='Original UP quad intersect y>=baseline-height*s,0<=s<=1',allPositivePrefixesConvexConnected=True,sharedBodyEdge=[(basexs[0],base),(basexs[1],base)],sharedBodyEdgeLength=bw,bodyTailContactDimension=1,bodyTailPositiveAreaOverlap=False,conditionalCoupledContact='When s>0 and bodyXThreshold>UPBaseMinX, shared baseline length=min(bodyXThreshold,UPBaseMaxX)-UPBaseMinX>0; body completion before tail is sufficient but not necessary.',minimumBodyXForPositiveLengthContact=basexs[0],completedBodyFirstTwoPhaseIsOnlyOneSufficientCandidate=True),originalBBoxRightClip=dict(UPAppearsBeforeBodyP2FullForLocalProgressOpenInterval=[(min(x for x,y in up)-F(str(seg['bounds'][0])))/(F(str(seg['bounds'][2]))-F(str(seg['bounds'][0]))),F(1)],notNativeFailureClaim=True),displayClockChosen=False,originalClockApproved=False,nativeApproval=False,runtimeApplied=False)
results=[]
for pen,raw in[(16,20),(23,29)]:
 try:results.append(dict(ok=True,**case(pen,raw)))
 except Exception as e:results.append(dict(ok=False,pen=pen,mask=3,failure=type(e).__name__+': '+str(e)))
print(json.dumps(enc(dict(schema='hanja-original-flag5-up-tail-conditions/v1',glyph='讒',root='hkcs_m8b92',fixture=FIXTURE,fixtureSHA256='5e8411814e4f13dd0da9fdce4e52614f2143b4c9e0db99f69ec174297a4389c9',geometrySHA256='3e0339d807e7bc697bed53420f88ff3fc52048df340c1d658c483898c6f406eb',results=results,oldU8fc5Flag15PositiveAreaContactNotTransferred=True,sourcePChanged=False,sourceQChanged=False,sourceWeightChanged=False,newSourceMaskAdded=False,oldSourceCoverageReplay=0,sourceEngine=0,sourceProjection=0,SSR=0,server=0,newPolicyModuleApproved=False,nativeApproval=False,runtimeApplied=False)),ensure_ascii=False,separators=(',',':')))
