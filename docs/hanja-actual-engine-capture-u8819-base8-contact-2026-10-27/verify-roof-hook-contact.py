from pathlib import Path
from fractions import Fraction as F
import hashlib,json
R=Path(__file__).resolve().parents[2]
D=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(D/'engine-whole-u8819-v8.json')=='c5a11328f07be0af249228fa9ace41a3e4e4bc0d5f2aae3f86f4785f8d40f790'
assert sha(D/'capture.json')=='c6f180e8937b0ad3ff99b96258a0eeb8c3a0de69c17af4ce8e7def4968666380'
c=json.loads((D/'capture.json').read_text());f=json.loads((D/'engine-whole-u8819-v8.json').read_text())
assert sha(R/c['source']['path'])==c['source']['SHA256']
s=json.loads((R/c['source']['path']).read_text())
for k in c['source']['originalRecordKeys']:
 a=s['records'][k];assert a==c['source']['originalRecords'][a['name']]
assert type(c['rootVersion'])is int and c['rootVersion']==8
assert c['captureFacts']['actualVMContexts']==c['captureFacts']['makeGlyphCalls']==1
assert f['engineHashes']==c['engine']['actualLoadedHashes']
assert [g['polygons']for g in f['groups']]==[[p for call in row for p in call['polygons']]for row in f['trace']]
assert len(f['groups'])==len(f['trace'])==23
root=c['source']['originalRecords']['u8819']['data'].split('$')
assert root==['99:0:0:2:0:167:200:u866b-01','99:0:0:-6:-1:204:200:ufa64-02-var-001']
leaf=c['source']['originalRecords']['ufa64-02-var-001']['data'].split('$')
left=c['source']['originalRecords']['u866b-01']['data'].split('$')
assert len(left)==7 and len(leaf)==16
assert leaf[3]=='2:22:7:178:38:176:41:168:50' and leaf[4]=='1:0:0:100:55:172:55'
# Literal source rows become actual raw11/raw12 under their unchanged parent.
xy=lambda x,y:(-6+F(x)*F(210,200),-1+F(y)*F(201,200))
hook_args=[v for a in [(178,38),(176,41),(168,50)]for v in xy(*a)]+[F(22),F(7)]
bar_args=[v for a in [(100,55),(172,55)]for v in xy(*a)]+[F(0),F(0)]
assert [F(str(v))for v in f['groups'][10]['raw'][:3]]==[2,22,7]
assert [F(str(v))for v in f['groups'][11]['raw'][:3]]==[1,0,0]
assert len(f['trace'][10])==len(f['trace'][11])==1
hc,bc=f['trace'][10][0],f['trace'][11][0]
assert hc['kind']=='cdDrawCurve' and bc['kind']=='cdDrawLine'
assert [F(str(v))for v in hc['args']]==hook_args
assert [F(str(v))for v in bc['args']]==bar_args
assert hc['polygons']==f['groups'][10]['polygons'] and bc['polygons']==f['groups'][11]['polygons']
assert len(hc['polygons'])==len(bc['polygons'])==2
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def on(a,b,p):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def meet(a,b,c,d):
 q=[cross(a,b,c),cross(a,b,d),cross(c,d,a),cross(c,d,b)]
 return (q[0]*q[1]<0 and q[2]*q[3]<0)or any([on(a,b,c),on(a,b,d),on(c,d,a),on(c,d,b)])
def edges(q):return list(zip(q,q[1:]+q[:1]))
def contour(p):
 assert all(v['off']==0 for v in p)
 q=[(F(str(v['x'])),F(str(v['y'])))for v in p]
 assert len(set(q))==len(q)
 assert sum(a[0]*b[1]-a[1]*b[0]for a,b in edges(q))>0
 for i,(a,b)in enumerate(edges(q)):
  for j,(c,d)in enumerate(edges(q)):
   if j>i and j!=i+1 and not(i==0 and j==len(q)-1):assert not meet(a,b,c,d)
 return q
def inside(q,p):
 if any(on(a,b,p)for a,b in edges(q)):return False
 hits=0
 for a,b in edges(q):
  if(a[1]>p[1])!=(b[1]>p[1]):
   x=a[0]+(p[1]-a[1])*(b[0]-a[0])/(b[1]-a[1])
   if x>p[0]:hits+=1
 return hits%2==1
hook=contour(hc['polygons'][0]);bar=contour(bc['polygons'][1])
box=[(F(17099,100),F(4949,100)),(F(17101,100),F(4949,100)),(F(17101,100),F(4951,100)),(F(17099,100),F(4951,100))]
for poly in[hook,bar]:
 assert all(inside(poly,p)for p in box)
 assert all(not meet(a,b,c,d)for a,b in edges(box)for c,d in edges(poly))
area=(box[1][0]-box[0][0])*(box[2][1]-box[1][1])
assert area==F(1,2500)>0
print(json.dumps({'schema':'hanja-public-exact-positive-contact-witness/v1','glyph':'蠙','date':'2026-10-27','root':'u8819','rootVersion':8,'inputs':{'full5SHA256':sha(D/'engine-whole-u8819-v8.json'),'captureSHA256':sha(D/'capture.json'),'sourceSHA256':c['source']['SHA256'],'verifierSHA256':sha(Path(__file__))},'sourceBinding':{'parentRow':root[1],'leaf':'ufa64-02-var-001','leafVersion':1,'originalLeafRowsOneBased':[4,5],'rawOneBased':[11,12],'actualCalls':['cdDrawCurve','cdDrawLine'],'polygonsPerCall':[2,2],'originalFlags':[[2,22,7],[1,0,0]],'originalRowsAndParentTransformPreserved':True,'exactRationalParentToActualCallArguments':True},'witness':{'hookCallPolygonOneBased':1,'horizontalCallPolygonOneBased':2,'box':[[str(a),str(b)]for a,b in box],'strictContainedInBothOriginalPositiveContours':True,'areaLowerBound':str(area),'normalized100AreaLowerBound':str(area/4),'exactFullIntersectionAreaComputed':False},'classification':'HOLD-positive-filled-contact-persists-in-new-independent-whole','positiveContact':True,'strictGap':False,'method':'Exact Fraction simple positive contour validation; all witness corners strictly inside both P, no box edge intersects either source boundary. Positive box is contained in original polygons; neither centerline nor raster inference.','originalPChanged':False,'oldContactMathReexecuted':False,'engineReexecutedForProof':False,'wholeKoreanFitApproved':False,'groupingApproved':False,'directionApproved':False,'nativeApproval':False,'runtimeApplied':False,'nativeWholeRecommendedForThisRemedy':False},ensure_ascii=False,indent=2))
