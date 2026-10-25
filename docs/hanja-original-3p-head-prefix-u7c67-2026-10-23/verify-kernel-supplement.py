"""New source-only conditions; existing x-prefix draft is not loaded or modified."""
from pathlib import Path
from fractions import Fraction as F
import hashlib,json,re
ROOT=Path(__file__).resolve().parents[2]
source='docs/hanja-source-original-u7c67-2026-10-23/fixtures.json'
b=(ROOT/source).read_bytes()
assert hashlib.sha256(b).hexdigest()=='ac326e4aa2bf4036cc23049bd84b02948e1e9b296ad4498f5fce9e55575e345d'
s=json.loads(b)['u7c67']['strokes'][17][0]
assert hashlib.sha256(json.dumps(s,separators=(',',':'),ensure_ascii=False).encode()).hexdigest()=='424037413381ed1fbfc5f57c4144d68033f7668528370594ecac5ed9633c9515'
polys=[]
for text in s['outline'].split('M')[1:]:
 assert not re.search(r'[CQAHVST]',text)
 ns=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',text)))
 polys.append(list(zip(ns[::2],ns[1::2])))
assert list(map(len,polys))==[22,3,3]
def edges(p):return list(zip(p,p[1:]+p[:1]))
def cross(a,b,q):return(b[0]-a[0])*(q[1]-a[1])-(b[1]-a[1])*(q[0]-a[0])
def on(q,a,b):return cross(a,b,q)==0 and min(a[0],b[0])<=q[0]<=max(a[0],b[0]) and min(a[1],b[1])<=q[1]<=max(a[1],b[1])
def intersect(a,b,c,d):
 u,v,w,z=cross(a,b,c),cross(a,b,d),cross(c,d,a),cross(c,d,b)
 return u*v<0 and w*z<0 or any([u==0 and on(c,a,b),v==0 and on(d,a,b),w==0 and on(a,c,d),z==0 and on(b,c,d)])
def simple(p):
 es=edges(p)
 for i,(a,b)in enumerate(es):
  assert a!=b
  for j,(c,d)in enumerate(es):
   if j<=i or j==i+1 or i==0 and j==len(es)-1:continue
   assert not intersect(a,b,c,d)
B=(F('87.8'),F('62.3'));Q=(F('86.5'),F('59.575'));q=(F('87.78'),F('62.275'));e=F(1,10000)
box=[(q[0]+dx*e,q[1]+dy*e)for dx in[-1,1]for dy in[-1,1]]
rows=[];areaBound=F(0)
for p in polys:
 simple(p);twice=sum(a[0]*b[1]-b[0]*a[1]for a,b in edges(p));assert twice>0;areaBound+=twice/2
 margins=[cross(a,b,B)for a,b in edges(p)];assert min(margins)>=0
 shared=min(cross(a,b,v)for a,b in edges(p)for v in box);assert shared>0
 rows.append({'vertices':len(p),'simple':True,'positiveWinding':True,'anchorMinimumMargin':str(min(margins)),'anchorNegativeEdges':sum(v<0 for v in margins),'anchorZeroEdges':sum(v==0 for v in margins),'sharedBoxMinimumMargin':str(shared)})
P,T,U=polys;root=max(U);assert root==(F(88),F('63.95')) and max(x for x,y in P)==F('87.8') and max(x for x,y in T)==F('87.95')
slopes=sorted((root[1]-y)/(root[0]-x)for x,y in U if x!=root[0]);assert slopes==[F(23,54),F(35)]
nativePath='docs/hanja-official-media-compare-u7c67-2026-10-23/official-temporal-native-review-remaining.json'
nb=(ROOT/nativePath).read_bytes();n=json.loads(nb);macro=n['directionMacros'][n['reviewedStrokes'].index(18)]
assert macro=='upper-right then short down-left sweep' and n['SVGSourceSHA256']=='ab60c152894c0f352838ae4a24d269cec166a5049ee821a93e714babcc1bb97c'
result={'schema':'hanja-original-3p-kernel-supplement/v1','glyph':'籧','pen':18,'mask':1,'source':{'path':source,'SHA256':hashlib.sha256(b).hexdigest(),'segmentSHA256':'424037413381ed1fbfc5f57c4144d68033f7668528370594ecac5ed9633c9515'},'polygons':rows,'kernelAnchor':[str(v)for v in B],'commonBox':{'center':[str(v)for v in q],'halfExtent':str(e),'area':str(4*e*e)},'homothetyCandidate':{'formula':'H_i(p)=B+p*(P_i-B); keep original ink and clip by union(H_i(p))','allRealPositiveProgressConnected':True,'reason':'Each original simple positive-winding polygon has B in its closed kernel. H_i(p) is inside P_i and nested in p. The scaled common interior box belongs to every H_i(p), with positive area p^2/25000000. Thus their union is connected and equals the original ink intersected with this clip union.','areaUpperBoundAtProgressP':str(areaBound)+' * p^2','zeroHiddenRequired':True,'fullOneDirectOriginalRequired':True,'floatingPointAndDOMApproved':False},'existingXPrefixCounterexample':{'policy':'x >= 88 - (167/10)*p','onlyRootTriangleForProgress':'0 < p < 1/334','start':[str(v)for v in root],'cut':'x=88-delta','yBounds':['1279/20 - 35*delta','1279/20 - (23/54)*delta'],'initialGrowth':'up-left','officialMacro':macro,'directionConflict':True,'draftExecutedOrModified':False},'officialEvidence':{'path':nativePath,'SHA256':hashlib.sha256(nb).hexdigest(),'SVGSourceSHA256':n['SVGSourceSHA256'],'reviewedLocalFrames':n['localFrames'],'scope':'Existing macro only; not approval of the changed kernel start.'},'changedDisplayStart':{'originalQ0':[str(v)for v in Q],'candidateAnchor':[str(v)for v in B],'distanceSquared':str(sum((a-b)**2 for a,b in zip(B,Q))),'officialStartApproval':False,'officialEarlyDirectionApproval':False},'sourceInkChanges':0,'sourceGuideChanges':0,'sourceWeightChanges':0,'sharedRendererChanges':0,'vendorRuns':0,'projectionRuns':0,'SSR':0,'nativeApproval':False,'runtimeApplied':False,'registered':False}
print(json.dumps(result,ensure_ascii=False,indent=2))
