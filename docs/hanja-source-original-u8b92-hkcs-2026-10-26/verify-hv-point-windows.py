from pathlib import Path
from fractions import Fraction as F
import hashlib,json
R=Path(__file__).resolve().parents[2]
OLD='docs/hanja-source-original-u8b92-hkcs-2026-10-26/hv-common-kernel-proof.json'
FIX='docs/hanja-source-original-u8b92-hkcs-2026-10-26/fixtures.json'
ob=(R/OLD).read_bytes();fb=(R/FIX).read_bytes()
assert hashlib.sha256(ob).hexdigest()=='ee813e38f5a2b512a30cfc7b1c82e8b905ee58c930fddfd30a43cecc90ac922f'
assert hashlib.sha256(fb).hexdigest()=='5e8411814e4f13dd0da9fdce4e52614f2143b4c9e0db99f69ec174297a4389c9'
old=json.loads(ob);f=json.loads(fb)['hkcs_m8b92'];out=[]
for row in old['results']:
 pen=row['pen'];prior,current=f['strokes'][pen-1]
 assert prior==row['sourceH'] and current==row['sourceV'] and row['ok']
 assert len(row['convexPolygons'])==3 and len(row['strictMargins'])==3
 assert all(F(v)>0 for values in row['strictMargins'] for v in values)
 ax,ay=map(F,row['anchor']);delta=F(row['strictBoxHalfWidth'])
 x0,y0,x1,y1=map(lambda v:F(str(v)),current['bounds'])
 ext=[ax-x0,x1-ax,ay-y0,y1-ay]
 assert all(v>delta>0 for v in ext)
 assert row['conditionalCenteredBandFamily']['scaledCommonBoxInsideAllForPositiveS']
 assert row['conditionalCenteredBandFamily']['fullOriginalSourceP2AtS1']
 diameter2=(x1-x0)**2+(y1-y0)**2
 out.append({'pen':pen,'mask':2,'anchor':[str(ax),str(ay)],'extents':[str(v)for v in ext],
  'strictCommonBoxHalfWidth':str(delta),'positiveTripleOverlapAreaLowerBoundCoefficient':str(4*delta*delta),
  'originalBounds':current['bounds'],'initialDiameterSquaredUpperBoundCoefficient':str(diameter2),
  'sourceQSeam200':row['sourceQSeam200'],'sourceQSeam100':row['sourceQSeam100'],
  'oldGlobalConvexityAndCommonKernelReplayed':False,'allPositivePConnected':True,
  'allPositivePPriorBodyHeadAreaOverlap':True,'nested':True,'p0HiddenPointRequired':True,'p1OriginalComplete':True})
assert [r['pen']for r in out]==[6,11,20]
result={'schema':'hanja-source-HV-point-window-conditions/v1','date':'2026-10-26','glyph':'讒','root':'hkcs_m8b92',
 'inputs':[{'path':OLD,'SHA256':hashlib.sha256(ob).hexdigest()},{'path':FIX,'SHA256':hashlib.sha256(fb).hexdigest()}],
 'results':out,'newArgument':[
 'Use the already certified exact common strict box in completed H, unchanged convex body and unchanged convex head. No old convexity, kernel, full-Q or original temporal computation is repeated.',
 'For p in (0,1], scale the common box about A by p. Convexity and A inside each polygon imply this scaled box remains in each original polygon. New arithmetic verifies all four rectangle extents exceed delta, so it also lies inside the new 2D rectangle.',
 'Each original convex body/head intersected with the rectangle is convex and both contain that positive-area scaled box. Their union is connected and has positive area in the completed original H for every p>0.',
 'Both rectangle axes shrink linearly to A. Ink diameter is bounded by the rectangle diagonal times p and tends to zero. Nested rectangles give monotone ink inclusion; at p1 the full original bounds and original P2 are preserved.'
 ],'authorClockNotOriginalQOrPublisherTime':True,'actualPriorOpaqueStillRequired':True,
 'old1DYBandNativeHoldPreserved':True,'sourcePOrQOrWidthOrWeightChanged':False,'virtualConnector':False,
 'newPolicyImplemented':False,'nativeApproval':False,'runtimeApplied':False,
 'sourceEngine':0,'sourceProjection':0,'originalTemporalReplay':0,'sharedRendererChanges':0,'server':0}
print(json.dumps(result,separators=(',',':')))
