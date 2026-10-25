from pathlib import Path
from fractions import Fraction as F
import hashlib,json
R=Path(__file__).resolve().parents[2]
P='docs/hanja-source-original-u8609-hkcs-2026-10-26/6-14-contact-kernel-proof.json'
b=(R/P).read_bytes();assert hashlib.sha256(b).hexdigest()=='f094270633a920833e5b3e3856266ceed38127d670e7427062940b498bb79bab'
proof=json.loads(b);rows=[]
for row in proof['rows']:
 a=[F(v) for v in row['anchor']];ps={p['P']:[[F(v) for v in xy] for xy in p['vertices']] for p in row['polygons']}
 assert row['commonKernelInterior'] and F(row['commonAnchorLInfinityHalfWidth'])>0
 assert all(p['strictlyConvex'] and min(F(x) for x in p['anchorSignedEdgeMargins'])>0 for p in row['polygons'])
 b=ps['body'];head=ps['head'];h=ps['priorH'];xs=[x for x,y in b+head];ys=[y for x,y in b+head];bounds=[min(xs),min(ys),max(xs),max(ys)]
 ext=[a[0]-bounds[0],bounds[2]-a[0],a[1]-bounds[1],bounds[3]-a[1]];assert min(ext)>0
 priorRight=max(x for x,y in h);bodyRight=max(x for x,y in b);bodyTop=min(y for x,y in b);bodyBottom=max(y for x,y in b);outside=bodyRight-priorRight;assert outside==3
 e=min([F(row['commonAnchorLInfinityHalfWidth'])/2]+[x/2 for x in ext]);assert e>0
 rows.append({'pen':row['pen'],'anchor':[str(x) for x in a],'bounds':[str(x) for x in bounds],'pointWindowExtents':[str(x) for x in ext],'strictCommonSquareHalfWidthCoefficient':str(e),'oldFixedWidthBodyRisk':{'outsidePriorHWidth':str(outside),'prefixHeightCoefficient':str(bodyBottom-bodyTop),'ownUnoccludedByPriorHLimitingDiameterAtLeast':str(outside),'nativeFailureClaim':False},'allPositivePArgument':'For every p in (0,1], square A+[-e*p,e*p]^2 lies inside priorH, body, head and expanding window. Each original convex polygon intersect window is convex and contains that square. Their union and priorH union are connected with positive area contact.','initialDiameterSquaredCoefficient':str((bounds[2]-bounds[0])**2+(bounds[3]-bounds[1])**2),'initialDiameterBound':'diameter <= p * sqrt(coefficient), hence limit0','p1CoversAllOriginalVertices':True})
print(json.dumps({'schema':'hanja-source-point-fold-feasibility/v1','date':'2026-10-26','glyph':'蘉','reusedProof':{'path':P,'SHA256':'f094270633a920833e5b3e3856266ceed38127d670e7427062940b498bb79bab','convexKernelProofReexecuted':False},'rows':rows,'originalPAndQChanged':False,'authorClockNotPublisherTiming':True,'nativeApproval':False,'runtimeApplied':False,'engine':0,'projection':0},separators=(',',':')))
