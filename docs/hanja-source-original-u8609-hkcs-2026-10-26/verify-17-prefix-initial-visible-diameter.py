from pathlib import Path
from fractions import Fraction as F
import hashlib,json,re
R=Path(__file__).resolve().parents[2] if '__file__' in globals() else Path('/Users/kidow/Documents/dev/kidow/lingo')
D='docs/hanja-source-original-u8609-hkcs-2026-10-26/'
PINS={D+'fixtures.json':'35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6',D+'17-alternative-prefix-proof.json':'cce9eaa8bb1de0be5bae8ebbb9276e74e7d583396fe6fc1cc6399f86f57f554b','lib/hanja-stroke-prefix-u8609-hkcs.ts':'0de21ee44e47cbcf9552391b65b148d72c9386f5ee96fd70f4c45bbd94541715'}
texts={}
for path,sha in PINS.items():
 b=(R/path).read_bytes();assert hashlib.sha256(b).hexdigest()==sha; texts[path]=b.decode()
f=json.loads(texts[D+'fixtures.json'])['hkcs_m8609'];s=f['strokes'][16][0]
closed=json.loads(texts[D+'17-alternative-prefix-proof.json'])['alternativeYPrefix']
policy=texts['lib/hanja-stroke-prefix-u8609-hkcs.ts']
assert 'outline:p===0?null:segment.outline' in policy
assert 'rect:Object.freeze({x:30.4,y:LO,width:8.4,height:cutY-LO})' in policy
polygons=[]
for part in re.findall(r'M([^Z]+)Z',s['outline']):
 values=[F(v)for v in re.findall(r'-?\d+(?:\.\d+)?',part)];assert len(values)%2==0;polygons.append(list(zip(values[::2],values[1::2])))
assert len(polygons)==2
lo=F(closed['lo']);hi=F(closed['hi']);span=hi-lo
tips=[(pi,i,v)for pi,p in enumerate(polygons)for i,v in enumerate(p)if v[1]==lo]
assert tips==[(0,21,(F('37.85'),F('64.35')))]
pi,i,tip=tips[0];poly=polygons[pi];neighbors=[poly[(i-1)%len(poly)],poly[(i+1)%len(poly)]]
assert all(v[1]>lo for v in neighbors)
functions=[((n[0]-tip[0])/(n[1]-tip[1]),tip[0]-(n[0]-tip[0])/(n[1]-tip[1])*lo)for n in neighbors]
slab=closed['openSlabs'][0];a,b=map(F,slab['y']);left=tuple(map(F,slab['left']));right=tuple(map(F,slab['right']))
assert a==lo and b-lo==F(1,10) and set(functions)=={left,right}
assert left[0]*lo+left[1]==right[0]*lo+right[1]==tip[0]
assert closed['criticalLines'][0]['closedUnion']==[['757/20','757/20']]
assert min(v[1]for v in polygons[1])==F('69.1')
assert span==F(41,4)
width=right[0]-left[0];coefficient=1+width*width
assert width==F(83,9)and coefficient==F(6970,81)
result=dict(schema=1,date='2026-10-26',glyph='蘉',pen=17,mask=1,inputSHA256=PINS,geometrySHA256='36c6d68c80e42dd733c2a293a9cbf7f4dd5c4109b4253ab19b2',method='Reuse existing exact closed first line and affine first slab; inspect only unique source minimum and its adjacent edges. No full section sweep repeated.',sourceSubpaths=2,sourceMinimumPoint=['757/20','1287/20'],sourceInitialClosedSectionSinglePoint=True,firstSlabY=slab['y'],leftAffine=slab['left'],rightAffine=slab['right'],epsilon='(41/4)*p',progressDomain=['0',str((b-lo)/span)],strictUpperBound=True,actualSourceWedge=dict(xLower='757/20-(2/9)*epsilon',xUpper='757/20+9*epsilon',yLower='1287/20',yUpper='1287/20+epsilon'),diameterSquaredUpperBound='(6970/81)*epsilon^2',initialDiameterLimit=0,outsideAnyCompletedPrior='Subset of the actual clipped original source region, so the same diameter bound applies without assuming prior opacity or contact.',secondSubpathMinimumY='691/10',secondSubpathHiddenProgressUpper=str((F('69.1')-lo)/span),alwaysPaintedCurrentHead=False,unconditionalPriorProvidedByPurePolicy=False,expectedPaintContract='The whole original two-subpath outline is clipped by one Y-prefix rectangle; p=0 has null outline. A future renderer must not expose a separate current head.',fixedRectWidthNotUsedAsVisibleDiameter=True,priorConnectivityApproved=False,originalMicroDirectionApproved=False,originalClockEquivalent=False,actualRendererApproved=False,newPolicyNecessaryFromThisDiameterCondition=False,sourcePChanged=False,sourceQChanged=False,sourceWidthChanged=False,sourceWeightChanged=False,existingClosedSweepReplayed=0,originalMicroReplay=0,sourceEngine=0,sourceProjection=0,server=0)
print(json.dumps(result,ensure_ascii=False,indent=2))
