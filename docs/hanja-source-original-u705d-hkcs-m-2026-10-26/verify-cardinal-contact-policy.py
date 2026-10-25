"""Exact candidate-only contact proof; no vendor, network, or projection run."""
from fractions import Fraction as F
from pathlib import Path
import hashlib,json,re
ROOT=Path(__file__).resolve().parents[2]
DIR=ROOT/'docs/hanja-source-original-u705d-hkcs-m-2026-10-26'
def read(name,expected):
 b=(DIR/name).read_bytes()
 assert hashlib.sha256(b).hexdigest()==expected
 return json.loads(b)
f=read('fixtures.json','882029a46c26f5b7be94defc8f95315f17c147243e5ff1650afe33cee3a32919')['hkcs_m705d']
c=read('static-contact-risk-proof.json','6d3064af59e18df648cac96857683cf176774b91f7499c652b0995775d94619a')
def polys(s):
 out=[]
 for part in s.split('Z'):
  if not part.strip():continue
  assert not re.search(r'[CQAHVST]',part)
  ns=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',part)))
  out.append(list(zip(ns[::2],ns[1::2])))
 return out
def cross(a,b,c):return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
rows=[]
for fold in c['folds']:
 pen=fold['pen'];a=tuple(map(F,fold['anchor']));prior=f['strokes'][pen-1][0];s=f['strokes'][pen-1][1]
 pp=polys(prior['outline']);sp=polys(s['outline']);assert len(pp)==1 and len(sp)==2
 margins=[]
 for p in pp+sp:
  turns=[cross(p[i],p[(i+1)%len(p)],p[(i+2)%len(p)])for i in range(len(p))]
  assert all(t>0 for t in turns)or all(t<0 for t in turns)
  sign=1 if turns[0]>0 else -1
  m=[cross(p[i],p[(i+1)%len(p)],a)*sign for i in range(len(p))]
  assert min(m)>0;margins.append(str(min(m)))
 y0=min(y for p in sp for x,y in p);y1=max(y for p in sp for x,y in p)
 assert y0<a[1]<y1
 assert prior['direction']=='right' and s['direction']=='down'
 rows.append({'pen':pen,'mask':2,'origin':str(a[1]),'negativeExtent':str(a[1]-y0),'positiveExtent':str(y1-a[1]),'strictConvexOriginalParts':2,'strictInteriorAnchorMargins':margins,'sourceFieldsUnchanged':True,'allPositiveBandIntersectionsConnectedToOpaquePrior':True,'nestedBand':True,'zeroAreaLimit':True,'fullOriginalAtOne':True})
print(json.dumps({'schema':'source-bound-cardinal-contact-proof-v1','glyph':'灝','rows':rows,'reason':'Each convex original P intersects the nested horizontal band in a convex set containing a positive shared anchor neighbourhood for every p>0. The neighbourhood lies inside the completed original H. At zero no ink is drawn, area is bounded by original width times band height and tends to zero; at one direct original P is restored.','scope':'Display policy only; not publisher clock, runtime, first React commit or pixel-zero proof.','newSourceGeometry':False,'vendorRuns':0,'projectionRuns':0,'nativeApproval':False,'runtimeApplied':False},ensure_ascii=False,indent=2))
