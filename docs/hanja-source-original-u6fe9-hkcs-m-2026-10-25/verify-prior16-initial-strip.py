from pathlib import Path
from fractions import Fraction as F
import json,hashlib,ast
ROOT=Path('/Users/kidow/Documents/dev/kidow/lingo')
FULL='docs/hanja-actual-engine-capture-u6fe9-hkcs-m-2026-10-25/engine-whole-hkcs_m6fe9.json'
b=(ROOT/FULL).read_bytes();assert hashlib.sha256(b).hexdigest()=='fe2644ffc692b3eb4133fb4f9a9a26bd1d6f92da46eea97488991ab4fe4b7456'
f=json.loads(b);groups=[[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in g['polygons']]for g in f['groups'][2:6]]
predicate=ROOT/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-p3-attached-frontier.py'
raw=predicate.read_bytes();assert hashlib.sha256(raw).hexdigest()=='b31d4fcdd87f1b29e2b4186b220daeb0ed40f1d5f6389991bc64456447e6ff80'
for node in ast.parse(raw.decode()).body:
 if isinstance(node,ast.FunctionDef)and node.name in {'cross','signed_area','triangle_contains','winding','edge_hits_triangle_interior'}:exec(compile(ast.Module(body=[node],type_ignores=[]),str(predicate),'exec'))
bands=ROOT/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py'
raw=bands.read_bytes();assert hashlib.sha256(raw).hexdigest()=='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
for node in ast.parse(raw.decode()).body:
 if isinstance(node,ast.FunctionDef)and node.name in {'vec','det','value','union_row','events','certify'}:exec(compile(ast.Module(body=[node],type_ignores=[]),str(bands),'exec'))
foot=groups[0];body=groups[1]+groups[2];rising=groups[3];nonfoot=body+rising
cut=F('72.5');bottom=F('93.45');riseBottom=F('72.85');top=F('26.85')
prior=[(F(str(p['x']))/2,F(str(p['y']))/2)for p in f['groups'][18]['polygons'][0]]
head=[(F(str(p['x']))/2,F(str(p['y']))/2)for p in f['groups'][19]['polygons'][1]]
a=f['trace'][19][0]['args'];q0,q1,q2=[tuple(F(str(a[k+j]))/2 for j in[0,1])for k in[0,2,4]]
u=tuple(q1[j]-q0[j]for j in[0,1]);v=tuple(q2[j]-2*q1[j]+q0[j]for j in[0,1]);T=F(1,2000);lo=F(1,100);hi=F(3,100)
def phi(t,c):
 q=tuple(q0[j]+2*t*u[j]+t*t*v[j]for j in[0,1]);n=(u[1]+t*v[1],-u[0]-t*v[0]);return tuple(q[j]-c*n[j]for j in[0,1])
assert 2*u[0]-hi*v[1]<0 and 2*u[1]+2*T*v[1]+hi*v[0]>0
assert u[1]+T*v[1]>0 and u[0]+T*v[0]<0
xmin,xmax=phi(T,hi)[0],phi(F(0),lo)[0];ymin,ymax=phi(F(0),hi)[1],phi(T,lo)[1]
box=(F('79.1'),F('67.4'),F('79.6'),F('67.9'));assert box[0]<xmin<=xmax<box[2]and box[1]<ymin<=ymax<box[3]
corners=[(x,y)for x in[box[0],box[2]]for y in[box[1],box[3]]];margins={}
for name,poly in[('priorH',prior),('sourceHeadP2',head)]:
 sign=1 if signed_area(poly)>0 else-1
 assert all(sign*cross(poly[i],poly[(i+1)%len(poly)],poly[(i+2)%len(poly)])>0 for i in range(len(poly)))
 margins[name]=min(sign*cross(poly[i],poly[(i+1)%len(poly)],p)for i in range(len(poly))for p in corners);assert margins[name]>0
uv=sum(u[j]*v[j]for j in[0,1]);assert uv>0
minNorm=sum(x*x for x in u);maxNorm=sum((u[j]+T*v[j])**2 for j in[0,1]);cr=abs(u[0]*v[1]-u[1]*v[0]);jac=2*minNorm-hi*cr;assert jac>0 and hi*hi*maxNorm<49
out={'schema':'hanja-source-prior-initial-strip-contact/v1','date':'2026-10-26','glyph':'濩','pen':16,'mask':2,'sourceRawOneBased':[19,20],'coordinateSpace':'normalized100','priorRawPolygon':0,'curveRawHeadPolygon':1,'sourcePChanged':False,'sourceQChanged':False,'parameterInterval':['0',str(T)],'normalCoefficientInterval':[str(lo),str(hi)],'normalStripMap':'Q(t)-c*(u_y+t*v_y,-u_x-t*v_x)','mappedBounds':[str(x)for x in[xmin,ymin,xmax,ymax]],'strictCommonRectangle':[str(x)for x in box],'priorAndHeadStrictCrossMargins':{k:str(x)for k,x in margins.items()},'normalRadiusSquaredUpper':str(hi*hi*maxNorm),'radiusSquared':49,'positiveJacobianLower':str(jac),'conditionalContactStatement':'원래 폭14 butt-prefix stroke가 원Q의 정상띠를 그리고 실제 이전 H가 같은 좌표에서 완료·불투명하다면, 임의의 양의 prefix에는 이 공통 사각형 안에 양의 접촉 조각이 있다. 전체 새P 교집합의 연결성을 주장하지 않는다.','runtimeStillRequired':['정확 원Q·폭·측정UA·좌표 owner','실제 완료·불투명한 원H와 동일 부모·경로 tuple','시작·전환·중간·완료·잔여의 브라우저 직접 검토'],'allGrowingPComponentsConnectivityProved':False,'nativeApproval':False,'runtimeApplied':False,'oldInitialSixReplay':0,'sourceEngine':0,'sourceProjection':0}
print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
