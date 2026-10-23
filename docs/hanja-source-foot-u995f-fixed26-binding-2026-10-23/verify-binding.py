# New affine binding only. Do not rerun the source union/BFS proof or source projection.
import json,hashlib,re
from fractions import Fraction as F
from pathlib import Path
r=Path(__file__).resolve().parents[2]
j=lambda v:json.dumps(v,ensure_ascii=False,separators=(',',':'))
sha=lambda b:hashlib.sha256(b).hexdigest()
sourcepath='docs/hanja-source-foot-u995f-raw28-2026-10-23/proof.json'
fixturepath='docs/hanja-source-independent-hv-two-u995f-source-experiment-2026-10-23/fixtures.json'
src=json.loads((r/sourcepath).read_text());wrapper=json.loads((r/fixturepath).read_text());f=wrapper['u995f'];full=f['fullProof'];d=src['DATA']
assert sha((r/fixturepath).read_bytes())=='17d27a3cca22934284209fed363ddde9ee04f21990408129f8a300e9c82cd6c9'
assert f['geometrySHA256']=='99c2a26c32f280e1e8e27162e74817905d45d1e6e1327de6d02cebcce4289db1'
assert f['sourceGroups'][23]==[27,28] and len(f['strokes'][23])==2
assert src['nextRawZeroBased']==28 and src['priorRawZeroBased']==27 and src['runtimePolicyBound']==False
rat=lambda a:F(int(a[0]),int(a[1]))
pair=lambda q:[str(q.numerator),str(q.denominator)]
point=lambda p:[pair(rat(c)/2)for c in p]
segment=lambda e:[point(p)for p in e]
scaled={'cutX':pair(rat(d['cutX'])/2),'phaseShare':d['phaseShare'],'boundary':[point(p)for p in d['boundary']],'triangles':[segment(t)for t in d['triangles']],'order':[{**e,'seed':point(e['seed']),'shared':None if e['shared'] is None else segment(e['shared'])}for e in d['order']],'weights':d['weights'],'footArea':pair(rat(d['footArea'])/4),'totalArea':pair(rat(d['totalArea'])/4),'strictRootMarginSquared':pair(rat(d['strictRootMarginSquared'])/4)}
# Literal fixture P must equal each original raw polygon under the declared half-scale, up to cyclic winding only.
def canonical(p):
 a=[tuple(v)for v in p]
 return min(tuple(a[i:]+a[:i])for i in range(len(a))) 
def canonical_any(p):return min(canonical(p),canonical(list(reversed(p))))
for mask,raw in enumerate([27,28]):
 original=[canonical_any([(F(str(p['x']))/2,F(str(p['y']))/2)for p in poly])for poly in full['groups'][raw]['polygons']]
 actual=[]
 for path in re.findall('M[^M]+',f['strokes'][23][mask]['outline']):
  nums=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',path)));actual.append(canonical_any(list(zip(nums[::2],nums[1::2]))))
 assert sorted(original)==sorted(actual)
prior=f['strokes'][23][0];assert prior['direction']=='down' and 'revealPath' not in prior and prior['bounds']==[52.5,75.3,58.5,89.25]
seed=list(map(rat,scaled['order'][0]['seed']));radius=F(1,2)
assert all(F(str(lo))+radius<v<F(str(hi))-radius for v,lo,hi in zip(seed,prior['bounds'][:2],prior['bounds'][2:]))
assert src['proof']['strictActualPrior'] and src['proof']['positiveAreaSeed']
assert sum(map(rat,scaled['weights']))==1 and scaled['phaseShare']==d['phaseShare']
assert scaled['triangles'][5]==segment(d['triangles'][5]) and len(scaled['triangles'])==10
out={'schema':'hanja-source-foot-fixed-fixture-affine-binding/v1','root':'u995f','glyph':'饟','pen':24,'mask':2,'coordinateDivisor':2,'sourceProof':{'path':sourcepath,'SHA256':sha((r/sourcepath).read_bytes())},'fixture':{'path':fixturepath,'SHA256':sha((r/fixturepath).read_bytes()),'geometrySHA256':f['geometrySHA256']},'DATA':scaled,'strictRootOpenDiskRadius':pair(radius),'strictDiskRemainingMarginSquared':pair(rat(src['proof']['strictDiskRemainingMarginSquared'])/4),'actualPrior':{'pen':24,'mask':1,'kind':'cardinal-originalP','bounds':prior['bounds'],'seed':scaled['order'][0]['seed'],'noGuideCapsuleAssumption':True},'proofReuse':{'originalUnionSlabsAndEarclipAndBFSReexecuted':False,'similarityMap':'(x,y) -> (x/2,y/2)','positiveAreaAndConnectivityPreserved':True,'all31rawOnceFromApprovedCache':True},'originalPGuideWidthWeightUnchanged':True,'sourceClockPreservedClaim':False,'nativeApproval':False,'runtimeApplied':False,'sourceCompilerRuns':0,'engineRuns':0}
print(j(out))
