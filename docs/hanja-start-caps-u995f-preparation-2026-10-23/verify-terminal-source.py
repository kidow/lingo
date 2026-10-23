# New terminal-only exact source audit. This is not a native raster or all-frame approval.
import json,re,hashlib
from fractions import Fraction as F
from pathlib import Path
r=Path(__file__).resolve().parents[2]
fixture='docs/hanja-source-independent-hv-two-u995f-source-experiment-2026-10-23/fixtures.json'
f=json.loads((r/fixture).read_text())['u995f'];rows=[]
def dist2(p,a,b):
 d=[b[i]-a[i] for i in range(2)];z=sum(x*x for x in d);t=max(F(0),min(F(1),sum((p[i]-a[i])*d[i]for i in range(2))/z));return sum((p[i]-a[i]-t*d[i])**2 for i in range(2))
for pen in [4,13,16]:
 s=f['strokes'][pen-1][0];nums=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])));a,b,c=[nums[i:i+2]for i in [0,2,4]]
 assert re.findall('[MLQC]',s['revealPath'])==['M','L','L'] and s['revealWidth']==14
 assert b[1]==a[1] and b[0]>a[0] and c[0]==b[0] and c[1]>b[1]
 polys=[]
 for raw in re.findall('M[^M]+',s['outline']):
  vals=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',raw)));points=list(zip(vals[::2],vals[1::2]));bounds=[max(dist2(p,x,y)for p in points)for x,y in [(a,b),(b,c)]];i=min(range(2),key=lambda k:bounds[k]);assert bounds[i]<49
  polys.append({'capsuleSegment':i+1,'maximumVertexSquaredDistance':str(bounds[i]),'strictSquaredMarginToRadius7':str(49-bounds[i]),'entirePolygonInsideSameConvexCapsule':True})
 groups=f['sourceGroups'][pen-1];flags=[f['fullProof']['groups'][n]['raw'][2]for n in groups]
 rows.append({'pen':pen,'mask':1,'guide':s['revealPath'],'originalRawZeroBased':groups,'originalTerminalFlags':flags,'lastTerminalFlagSuffix':flags[-1]%100,'polygonCapsuleCover':polys,'allOriginalPInsideUnionOfTwoRadius7Capsules':True,'nativeFullRoundResidualObserved':False,'nativeApproval':False})
out={'schema':'hanja-MLL-original-terminal-source-audit/v1','root':'u995f','glyph':'饟','fixture':fixture,'fixtureSHA256':hashlib.sha256((r/fixture).read_bytes()).hexdigest(),'targets':rows,'scope':{'originalPGuideWidthWeightUnchanged':True,'pureSourceFactsAndExactCapsuleCover':True,'nativeRasterEqualityClaim':False,'fullGuideStrokeCoverageConditionalOnStandardRightAngleMiterContainingCapsuleUnion':True,'otherCharacterFailureReusedAsApproval':False,'allFrameConnectivityProved':False,'nativeApproval':False,'runtimeApplied':False,'engineRuns':0,'sourceProjection':0}}
print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
