from pathlib import Path
from fractions import Fraction as F
import json,hashlib
R=Path(__file__).resolve().parents[2]
PINS={"docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json":"a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87","docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-whole-u655d.json":"aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af","docs/hanja-source-original-u655d-2026-10-26/fixtures.json":"a120891aa1745a7ecf885b71b665396c6977f95c69021d83025a38523da2cbd6","docs/hanja-source-original-u655d-2026-10-26/source-projection.json":"25540ad408269f15b544896e28162e37ffd4232748198de95373c9a7abddfb9d","docs/hanja-source-original-u655d-2026-10-26/q7-initial-risk-proof.json":"564eccc7b899422d3cacee4a16aa8a51d2fb57532390d4e0e197b50814bb24ec","docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py":"95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396","docs/hanja-source-original-u655d-2026-10-26/mask-union-start-kernel-proof.json":"7e1f34c33298e906859acb6fbc5be535c2801941fc04f0e3839c4be0e680070a","docs/hanja-source-original-u655d-2026-10-26/verify-mask-union-start-kernels.py":"cbe9bde4ad8335a81529f1233306778e99ae5d444a32ece73533b9e68390ce6f"}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
K=json.loads((R/'docs/hanja-source-original-u655d-2026-10-26/mask-union-start-kernel-proof.json').read_bytes())
f=json.loads((R/'docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json').read_bytes())
SELECTED=[(1,2,2,('549/25','378/25'),'9/16300'),(2,3,1,('1064/25','339/20'),'7/5500'),(7,9,1,('761/20','1274/25'),'3/6800'),(8,10,2,('73429/1000','1999/250'),'7/111000')]
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
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
results=[]
for pen,raw,headIndex,anchor,half in SELECTED:
 r=next(r for r in K['results']if r['pen']==pen);assert r['raw']==raw and r['singleCCWOuterCycleVerified']and r['strictKernelMeetsOpenOriginalStartDisk7']
 P=[[(F(str(v['x']/2)),F(str(v['y']/2)))for v in p]for p in f['groups'][raw-1]['polygons']]
 head=P[headIndex-1];kernel=[tuple(map(F,p))for p in r['kernelVertices']];q=tuple(map(F,r['originalMaskStart']));A=tuple(map(F,anchor));h=F(half)
 assert headIndex==(2 if f['trace'][raw-1][0]['args'][6]==0 else 1)
 assert state(A,head)==1
 km=min(cross(a,b,A)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in edges(kernel))
 hm=min(abs(cross(a,b,A))/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in edges(head)if a!=b)
 assert 0<h<km and h<hm
 corners=[(A[0]+sx*h,A[1]+sy*h)for sx in[-1,1]for sy in[-1,1]]
 ds=sum((A[j]-q[j])**2 for j in[0,1]);diskMax=sum((abs(A[j]-q[j])+h)**2 for j in[0,1]);assert diskMax<49
 assert all(state(c,head)==1 and all(cross(a,b,c)>0 for a,b in edges(kernel))for c in corners)
 results.append(enc(dict(pen=pen,mask=1,raw=raw,headP1based=headIndex,headScope='original start triangle'if headIndex==2 else'original body P inside the source-start disk; not the terminal decoration',anchor=A,originalQ0=q,anchorOffsetFromQ0=[A[j]-q[j]for j in[0,1]],anchorEqualsQ0=A==q,distanceSquared=ds,kernelLInfinityMargin=km,headBoundaryLineLInfinityMargin=hm,strictBoxHalf=h,strictBoxArea=4*h*h,wholeBoxDistanceSquaredUpperBound=diskMax,wholeBoxInStrictHeadKernelOpenDisk=True,sourceStartOrClockApproved=False)))
print(json.dumps({'results':results,'checked':4,'sourceChanged':False,'kernelRecomputed':0,'engine':0,'projection':0,'nativeApproval':False},separators=(',',':')))

