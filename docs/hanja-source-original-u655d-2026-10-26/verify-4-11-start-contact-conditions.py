from pathlib import Path
from fractions import Fraction as F
import json,hashlib
R=Path(__file__).resolve().parents[2]
PINS={"docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json":"a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87","docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-whole-u655d.json":"aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af","docs/hanja-source-original-u655d-2026-10-26/fixtures.json":"a120891aa1745a7ecf885b71b665396c6977f95c69021d83025a38523da2cbd6","docs/hanja-source-original-u655d-2026-10-26/source-projection.json":"25540ad408269f15b544896e28162e37ffd4232748198de95373c9a7abddfb9d","docs/hanja-source-original-u655d-2026-10-26/q7-initial-risk-proof.json":"564eccc7b899422d3cacee4a16aa8a51d2fb57532390d4e0e197b50814bb24ec","docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py":"95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396","docs/hanja-source-original-u655d-2026-10-26/mask-union-start-kernel-proof.json":"7e1f34c33298e906859acb6fbc5be535c2801941fc04f0e3839c4be0e680070a","docs/hanja-source-original-u655d-2026-10-26/verify-mask-union-start-kernels.py":"cbe9bde4ad8335a81529f1233306778e99ae5d444a32ece73533b9e68390ce6f"}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
f=json.loads((R/'docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json').read_bytes())
def polygons(raw):return[[(F(str(v['x']/2)),F(str(v['y']/2)))for v in p]for p in f['groups'][raw-1]['polygons']]
def edges(p):return list(zip(p,p[1:]+p[:1]))
def cross(a,b,p):return(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
def state(p,poly):
 w=0
 for a,b in edges(poly):
  c=cross(a,b,p)
  if c==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1]):return 0
  if a[1]<=p[1]<b[1]and c>0:w+=1
  if b[1]<=p[1]<a[1]and c<0:w-=1
 return 1 if w else -1
def margin(A,P):return min(abs(cross(a,b,A))/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in edges(P)if a!=b)
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
P4=polygons(6);A4=(F(99,2),F(79,2));H=polygons(5)[0];assert len(P4)==5 and state(A4,P4[0])==0 and state(A4,P4[1])==1 and state(A4,H)==0 and margin(A4,P4[1])==1
assert H==[(F(27,2),F(77,2)),(F(99,2),F(77,2)),(F(99,2),F(81,2)),(F(27,2),F(81,2))]
# At every 0<p<=1 this unilateral scaled box stays within the source-head strict ball and completed H.
box4=[(A4[0]-dx,A4[1]+dy)for dx in[F(1,2),F(1,4)]for dy in[-F(1,4),F(1,4)]]
assert all(state(c,P4[1])==1 and state(c,H)==1 for c in box4)
b4=[min(p[j]for po in P4 for p in po)for j in[0,1]]+[max(p[j]for po in P4 for p in po)for j in[0,1]];ext4=[A4[0]-b4[0],b4[2]-A4[0],A4[1]-b4[1],b4[3]-A4[1]];assert min(ext4)>F(1,2)
P11=polygons(13);q11=(F(309,5),F(73,2));A11=(F(3093,50),F(739,20));h=F(1,2000);assert all(state(q11,p)==-1 for p in P11)and state(A11,P11[0])==1 and margin(A11,P11[0])==F(1,1000)
box11=[(A11[0]+sx*h,A11[1]+sy*h)for sx in[-1,1]for sy in[-1,1]];assert all(state(c,P11[0])==1 and sum((c[j]-q11[j])**2 for j in[0,1])<49 for c in box11)
b11=[min(p[j]for po in P11 for p in po)for j in[0,1]]+[max(p[j]for po in P11 for p in po)for j in[0,1]];ext11=[A11[0]-b11[0],b11[2]-A11[0],A11[1]-b11[1],b11[3]-A11[1]];assert min(ext11)>h
out={'schema':'hanja-source-initial-unilateral-prior-and-head-conditions/v1','date':'2026-10-26','glyph':'敝','inputs':PINS,'pen4mask2':{'raw':6,'sourceSyntax':'MLQ','originalP':5,'anchor':A4,'anchorIsFirstOriginalLStart':True,'QRestarted':False,'headP1based':2,'headStrictLineMargin':F(1),'priorRaw':5,'priorMask':1,'priorH':H,'anchorOnPriorRightBoundary':True,'strictCommonAnchorBoxUnavailable':True,'sourceBounds':b4,'sourceExtents':ext4,'unilateralScaledBox':'[Ax-p/2,Ax-p/4] x [Ay-p/4,Ay+p/4]','unilateralBoxInsideOriginalHeadPriorAndRectForAllPositiveP':True,'commonAreaLowerCoefficient':F(1,8),'actualPriorDOMNotGuaranteed':True,'allTimeRectConnectivityNotProved':True},'pen11mask1':{'raw':13,'originalP':2,'originalQ0':q11,'Q0OutsideOriginalP':True,'candidateHeadAnchor':A11,'offsetFromOriginalQ0':[A11[j]-q11[j]for j in[0,1]],'distanceSquared':sum((A11[j]-q11[j])**2 for j in[0,1]),'headP1based':1,'strictHeadLineMargin':F(1,1000),'strictHeadBoxHalf':h,'boxArea':4*h*h,'boxWithinOriginalStartDisk7':True,'sourceBounds':b11,'sourceExtents':ext11,'terminalP2NotUsedAsHead':True,'allTimeRectConnectivityNotProved':True},'sourceKernelRecomputed':0,'Q7Replayed':0,'engine':0,'projection':0,'sourceP_Q_WidthWeightChanged':False,'authorRectClockNotOriginalQOrPublisherMicroClock':True,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(enc(out),separators=(',',':')))
