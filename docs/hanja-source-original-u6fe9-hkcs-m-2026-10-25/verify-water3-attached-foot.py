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
p1,p2,p3=foot
triangle=p1[-3:];anchor=tuple(sum(p[j]for p in triangle)/3 for j in[0,1])
assert signed_area(triangle)>0 and triangle_contains(anchor,triangle,True)
assert winding(anchor,p1)==1 and triangle_contains(anchor,p3,True)
assert not any(edge_hits_triangle_interior(a,b,triangle)for a,b in zip(p1,p1[1:]+p1[:1]))
assert all(triangle_contains(p,p3)for p in triangle)
area=signed_area(triangle)
box=(F('16.5'),F('69.5'),F('19.25'),F('71.5'))
corners=[(x,y)for x in[box[0],box[2]]for y in[box[1],box[3]]]
maximum=max(sum((p[j]-c[j])**2 for j in[0,1])for p in p3 for c in corners);assert maximum<49
a=f['trace'][2][0]['args'];q0,q1,q2=[tuple(F(str(a[k+j]))/2 for j in[0,1])for k in[0,2,4]]
assert all(q0[j]>q1[j]>q2[j]for j in[0,1])
leg1=sum((q1[j]-q0[j])**2 for j in[0,1]);leg2=sum((q2[j]-q1[j])**2 for j in[0,1])
assert leg1<F('3.1')**2 and leg2<F('9.6')**2 and F('3.1')+F('9.6')<13
T=F(2,5);qt=tuple((1-T)**2*q0[j]+2*T*(1-T)*q1[j]+T*T*q2[j]for j in[0,1]);chord=sum((qt[j]-q0[j])**2 for j in[0,1]);assert chord>F(13,4)**2
assert box[0]<qt[0]<q0[0]<box[2] and box[1]<qt[1]<q0[1]<=box[3]
fullChord=sum((q2[j]-q0[j])**2 for j in[0,1]);assert fullChord>F(28,3)**2
out={'schema':'hanja-source-attached-foot-conditions/v1','date':'2026-10-25','glyph':'濩','logical':3,'sourceRaw':3,'coordinateSpace':'normalized100','source':{'path':FULL,'SHA256':hashlib.sha256(b).hexdigest()},'sourceQ':[[str(x)for x in q]for q in[q0,q1,q2]],'sourceQPathUnchanged':True,'reverseTraversalOnly':True,'sourcePChanged':False,'sourceWidth':14,'anchor':[str(x)for x in anchor],'actualP1P3OverlapTriangle':[[str(x)for x in p]for p in triangle],'overlapTriangleArea':str(area),'anchorInsideActualP1AndP3':True,'P1BoundaryEntersTriangleInterior':False,'gate':'3/4','gateIsPublisherClockFraction':False,'measuredPointBox':[str(x)for x in box],'endpointRadius':7,'maximumP3VertexToBoxCornerSquared':str(maximum),'strictFullP3DiskMargin':str(49-maximum),'sourceOnlyArcBound':{'leg1Squared':str(leg1),'leg1Upper':'31/10','leg2Squared':str(leg2),'leg2Upper':'48/5','LUpper':'13','parameterUpper':'2/5','chordAtParameterUpperSquared':str(chord),'quarterArcUpperSquared':'169/16','pointAtParameterUpper':[str(x)for x in qt],'fullChordSquared':str(fullChord),'rhoAtGateLowerRequiredSquared':'784/9'},'frontier':{'beforeOrAtGate':'P3 hidden','afterGate':'s=4p-3; original P3 clipped by anchor+s*(P3-anchor)','subsetOriginalP3':True,'nested':True,'newInk':False,'positiveActualP1ContactAreaWitness':'s^2*'+str(area),'areaLimitAtGate':0,'finalOriginalP3Exact':True},'requiredRuntimeGuard':{'pAtLeastGate':True,'rhoExactly7':True,'actualMeasuredPointInExactBox':True,'sameOriginalQWidthAndCoordinateOwner':True,'actualOriginalP1PaintPresentOpaqueSameMask':True,'guardFailureHidesP3':True},'limits':['이 증명은 마지막 장식 P3의 attached 성장과 필요한 실제 UA guard 조건만 다룬다.','첫 P1/P2의 역방향 Q 교집합 연결성·완성된 물수변 전체·실제 재생은 승인하지 않는다.','새 원P의 직접 계산이며 기존 萍의 좌표·접촉 증인을 복사하거나 시각 성공을 이전하지 않았다.'], 'sourceEngine':0,'sourceProjection':0,'oldTargetLoopsExecuted':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
