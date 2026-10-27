from pathlib import Path
from fractions import Fraction as F
import hashlib,json
R=Path(__file__).resolve().parents[2]
D=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(D/'engine-whole-u5e77-02-var-005.json')=='33e5d36c16b0b3c333d462128b234d81a14bf4aa7a788a495113992a352e0d9e'
assert sha(D/'capture.json')=='1a42bb78db7c6f5cad2a7317fc95c1417a217b9b6201acf40d7a5a53c7591467'
c=json.loads((D/'capture.json').read_text());f=json.loads((D/'engine-whole-u5e77-02-var-005.json').read_text())
assert sha(R/c['source']['path'])==c['source']['SHA256']
s=json.loads((R/c['source']['path']).read_text());e=next(e for e in s['records'] if e['fixedName']=='u5e77-02-var-005@2')
assert e['record']==c['source']['selectedOriginalRecord'] and type(e['record']['version'])is int and e['record']['version']==2
assert c['captureFacts']['actualVMContexts']==c['captureFacts']['makeGlyphCalls']==1
assert len(f['groups'])==len(f['trace'])==8
assert f['engineHashes']==c['engine']['actualLoadedHashes']
assert [g['polygons']for g in f['groups']]==[[p for call in row for p in call['polygons']]for row in f['trace']]
def cross(a,b,c):return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def contour(p):
 assert len(p)in(3,4) and all(v['off']==0 for v in p)
 q=[(F(str(v['x'])),F(str(v['y'])))for v in p]
 assert len(set(q))==len(q)
 assert sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(q,q[1:]+q[:1]))>0
 assert all(cross(a,b,c)>=0 for a,b in zip(q,q[1:]+q[:1])for c in q)
 return q
assert f['groups'][1]['raw'][:3]==[1,0,0]
assert f['groups'][5]['raw'][:3]==[1,0,100] # Actual005 engine adjustment, not a source-row edit.
assert all(len(f['trace'][i])==1 and f['trace'][i][0]['kind']=='cdDrawLine'for i in(1,5))
left=[contour(p)for p in f['groups'][1]['polygons']];right=[contour(p)for p in f['groups'][5]['polygons']]
assert len(left)==len(right)==2
lx=max(v[0]for p in left for v in p);rx=min(v[0]for p in right for v in p);assert lx<rx
plane=(lx+rx)/2
assert all(v[0]<plane for p in left for v in p)and all(v[0]>plane for p in right for v in p)
print(json.dumps({'schema':'hanja-public-upper-h-original-P-contact-proof/v1','date':'2026-10-27','glyph':'幷','inputs':{'full5SHA256':sha(D/'engine-whole-u5e77-02-var-005.json'),'captureSHA256':sha(D/'capture.json')},'root':'u5e77-02-var-005','version':2,'originalRawOneBased':[2,6],'leftInkMaxX':str(lx),'rightInkMinX':str(rx),'strictXGap':str(rx-lx),'normalized100StrictXGap':str((rx-lx)/2),'separatingLineX':str(plane),'intersectionArea':'0','boundaryContact':False,'classification':'strictly-disjoint-original-P','method':'Exact Fraction on every new005 raw2/raw6 original straight closed convex positive contour; all vertices strictly separated by one vertical line, not centerline inference.','previousWholeProofsReused':False,'engineReexecutedForProof':False,'nativeApproval':False,'runtimeApplied':False},ensure_ascii=False,indent=2))
