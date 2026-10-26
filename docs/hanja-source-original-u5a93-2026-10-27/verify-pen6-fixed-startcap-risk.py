from pathlib import Path
from fractions import Fraction as F
import hashlib,json,re

R=Path(__file__).resolve().parents[2]
FIXTURE='docs/hanja-source-original-u5a93-2026-10-26/fixtures.json'
FIXTURE_SHA='a7ad43dd32a18ac22628c77d942fc53ab26d3642bcabce108248a74babf79733'
TOKEN=re.compile(r'[MLZ]|[-+]?\d+(?:\.\d+)?')
def tokens(s):
 out=[];end=0
 for m in TOKEN.finditer(s):
  assert not s[end:m.start()].strip();out.append(m.group());end=m.end()
 assert not s[end:].strip()
 return out
def outlines(s):
 t=tokens(s);i=0;out=[]
 while i<len(t):
  assert t[i]=='M';i+=1;p=[(F(t[i]),F(t[i+1]))];i+=2
  while t[i]=='L':i+=1;p.append((F(t[i]),F(t[i+1])));i+=2
  assert t[i]=='Z'and len(p)>=3;i+=1;out.append(p)
 return out
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def area2(p):return sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(p,p[1:]+p[:1]))
def bounds(P):
 v=[v for p in P for v in p]
 return(min(x for x,y in v),min(y for x,y in v),max(x for x,y in v),max(y for x,y in v))
def point_state(v,p):
 w=0
 for a,b in zip(p,p[1:]+p[:1]):
  c=cross(a,b,v)
  if c==0 and min(a[0],b[0])<=v[0]<=max(a[0],b[0])and min(a[1],b[1])<=v[1]<=max(a[1],b[1]):return 0
  if a[1]<=v[1]<b[1]and c>0:w+=1
  if b[1]<=v[1]<a[1]and c<0:w-=1
 return 1 if w else-1
def encode(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return{k:encode(x)for k,x in v.items()}
 if isinstance(v,(list,tuple)):return[encode(x)for x in v]
 return v
blob=(R/FIXTURE).read_bytes();assert hashlib.sha256(blob).hexdigest()==FIXTURE_SHA
f=json.loads(blob)['u5a93'];seg=f['strokes'][5][0];assert len(f['strokes'][5])==1
P=outlines(seg['outline']);assert len(P)==3 and all(area2(p)!=0 for p in P)
guide=tokens(seg['revealPath']);assert guide[0]=='M'and guide[3]=='L'
A=(F(guide[1]),F(guide[2]));B=(F(guide[4]),F(guide[5]));radius=F(str(seg['revealWidth']))/2
assert B[0]>A[0]and B[1]==A[1]and radius==7
W=(F(54),F(41,2));h=F(1,100);box=[(W[0]-h,W[1]-h),(W[0]+h,W[1]-h),(W[0]+h,W[1]+h),(W[0]-h,W[1]+h)]
assert area2(P[0])>0 and all(cross(a,b,v)>=0 for a,b in zip(P[0],P[0][1:]+P[0][:1])for v in P[0])
currentMargins=[cross(a,b,v)for a,b in zip(P[0],P[0][1:]+P[0][:1])for v in box];assert min(currentMargins)>0
maxDiskDistanceSquared=max((v[0]-A[0])**2+(v[1]-A[1])**2 for v in box);assert maxDiskDistanceSquared<radius**2
xb,yb,xB,yB=bounds([box]);prior=[];allPrior=[]
for pi,stroke in enumerate(f['strokes'][:5],1):
 for mi,s in enumerate(stroke,1):
  polys=outlines(s['outline']);assert all(area2(p)!=0 for p in polys);allPrior+=polys
  x0,y0,x1,y1=bounds(polys)
  if x1<xb:cert={'side':'strictly left of witness box','gap':xb-x1}
  elif x0>xB:cert={'side':'strictly right of witness box','gap':x0-xB}
  elif y1<yb:cert={'side':'strictly above witness box','gap':yb-y1}
  elif y0>yB:cert={'side':'strictly below witness box','gap':y0-yB}
  else:raise AssertionError('No exact whole-mask bounding separation')
  prior.append({'pen':pi,'mask':mi,'originalPolygons':len(polys),'actualBounds':(x0,y0,x1,y1),'separation':cert})
assert all(bounds([p])[0]>xB for p in P[1:])
assert any(point_state(A,p)==1 for p in allPrior)
out={'schema':'hanja-public-fixed-startcap-positive-area-risk/v1','date':'2026-10-27','glyph':'媓','pen':6,'mask':1,'input':{'path':FIXTURE,'SHA256':FIXTURE_SHA},'coordinateFrame':'unchanged public fixture normalised100 coordinates','source':{'originalPolygons':3,'originalGuideStart':A,'originalFirstGuideEnd':B,'originalRevealWidth':F(str(seg['revealWidth'])),'fixedDiskRadius':radius,'guideStartInsidePriorInk':True,'outlineAndGuideAndWidthChanged':False},'witness':{'center':W,'boxHalfWidth':h,'boxArea':4*h*h,'currentOriginalP':1,'strictCurrentConvexEdgeCrossMinimum':min(currentMargins),'otherCurrentOriginalPOutsideBox':True,'maximumCornerDistanceSquaredToOriginalA':maxDiskDistanceSquared,'radiusSquared':radius**2,'strictDiskDistanceSquaredMargin':radius**2-maxDiskDistanceSquared,'insideCurrentPAndFixedStartDisk':True,'outsideAllPriorP':True},'prior':{'pens':[1,2,3,4,5],'masks':len(prior),'originalPolygons':len(allPrior),'exactWholeMaskSeparations':prior},'conclusion':'There is positive area of current original P inside the unchanged fixed start disk and outside every original prior P. A fixed round start disk for strictly positive reveal can expose that future H ink independently of how tiny the reveal amount is.','condition':'Conditional source-geometry statement for a reveal mask that includes the fixed disk at original A with radius originalWidth/2; this proof does not read or execute the product mask.','alternativeAnchorProposed':False,'phaseCCPolicyProposed':False,'sourceGeometryChanged':False,'sourceClockApproved':False,'nativeApproval':False,'runtimeApplied':False,'engineRuns':0,'networkRequests':0,'newPrivateMedia':0,'limits':['This is a rational positive-area source witness, not a browser pixel-area, anti-aliasing or exact rendered-size claim.','Outside-prior proof uses exact bounding half-planes of every untouched straight source contour; no winding normalisation or smoothing is needed.','A metadata guard pass does not establish the semantic small-initial-ink condition. No new guard failure or runtime test is claimed by this source-only proof.','No source P/Q/flags/width, reveal guide, anchor policy, composite, frame scheduling or connected-component phase is changed.'],'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
print(json.dumps(encode(out),separators=(',',':')))
