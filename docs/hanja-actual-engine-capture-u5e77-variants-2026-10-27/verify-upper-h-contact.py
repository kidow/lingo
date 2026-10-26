from pathlib import Path
from fractions import Fraction as F
import hashlib,json

R=Path(__file__).resolve().parents[2]
D=Path(__file__).resolve().parent
PINS={
 'u5e77-var-001':('ce8a4008487f1135134d7cd504d6d170f4ad205362369ac82abad85c9e9ce61e','f73ef481865ecfe0f65e7a7e5f9b6fd510448d8490943d6ce561ce74299af5b8'),
 'u5e77-var-003':('2ae5d6003801d4a7176001fe83e6a54af459472ea037fe49ef3cac53e6411f3d','6c9a69364dac5dfbeaa720ce5fdc85b73d5f1ef40b6f8b1b61d3d00ec2baf970'),
 'u5e77-var-004':('94812e72179479fffc311d71d3c5799437b4f8a328b1731b30cb0f1ce1cf8144','f86ca1cf935d641c5fb700a195281ea9e7a3e5a409aef3fd4bec823b7c3128d4')
}
def read(p,h):
 b=p.read_bytes();assert hashlib.sha256(b).hexdigest()==h
 return json.loads(b)
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def contour(p):
 assert len(p)in(3,4) and all(v['off']==0 for v in p)
 q=[(F(str(v['x'])),F(str(v['y'])))for v in p]
 assert len(set(q))==len(q)
 area2=sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(q,q[1:]+q[:1]));assert area2>0
 assert all(cross(a,b,c)>=0 for a,b in zip(q,q[1:]+q[:1])for c in q)
 return q
results=[];inputs={}
for root,(fh,ch)in PINS.items():
 fp=D/f'engine-whole-{root}.json';cp=D/f'capture-{root}.json';f=read(fp,fh);c=read(cp,ch)
 s=read(R/c['source']['path'],c['source']['SHA256'])
 entry=next(e for e in s['records']if e['fixedName']==c['source']['selectedFixedName'])
 assert entry['record']==c['source']['selectedOriginalRecord'] and entry['record']['name']==root and type(entry['record']['version'])is str
 assert len(f['groups'])==8 and len(f['trace'])==8 and c['captureFacts']['actualVMContexts']==c['captureFacts']['makeGlyphCalls']==1
 assert f['engineHashes']==c['engine']['actualLoadedHashes'] and len(f['engineHashes'])==8
 assert [g['polygons']for g in f['groups']]==[[p for call in row for p in call['polygons']]for row in f['trace']]
 assert f['groups'][1]['raw'][:3]==f['groups'][5]['raw'][:3]==[1,0,0]
 assert all(len(f['trace'][i])==1 and f['trace'][i][0]['kind']=='cdDrawLine'for i in(1,5))
 left=[contour(p)for p in f['groups'][1]['polygons']];right=[contour(p)for p in f['groups'][5]['polygons']]
 assert len(left)==len(right)==2
 lx=max(v[0]for p in left for v in p);rx=min(v[0]for p in right for v in p);assert lx<rx
 plane=(lx+rx)/2
 assert all(v[0]<plane for p in left for v in p)and all(v[0]>plane for p in right for v in p)
 results.append({'root':root,'version':entry['record']['version'],'rawRowsOneBased':[2,6],'sourcePolygons':[2,2],'allContoursStraightConvexPositiveOrientation':True,'leftInkMaxX':str(lx),'rightInkMinX':str(rx),'strictXGap':str(rx-lx),'separatingLineX':str(plane),'intersectionArea':'0','boundaryContact':False,'classification':'strictly-disjoint-original-P'})
 inputs[root]={'full5SHA256':fh,'captureSHA256':ch}
print(json.dumps({'schema':'hanja-public-upper-h-original-P-contact-proof/v1','date':'2026-10-27','glyph':'幷','inputs':inputs,'results':results,'method':'Exact Fraction on every original raw2/raw6 polygon vertex; straight closed convex positive contours verified, all vertices strictly separated by a vertical line. The conclusion is not inferred from guide endpoints.','coordinateFrame':'actual Kage whole coordinates, original200','limits':['This proves only original upper-H ink separation for these exact captured roots; it is not a fresh domestic comparison or a whole-glyph/native verdict.','No forced join, smoothing, coordinate change, direction or animation approval.'],'engineReplays':0,'newNative':0,'nativeApproval':False,'runtimeApplied':False,'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()},separators=(',',':')))
