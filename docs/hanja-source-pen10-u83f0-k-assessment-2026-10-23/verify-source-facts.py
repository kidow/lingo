# 원 guide와 이미 확보한 P를 소스 공식으로만 대조합니다.
# Kage 엔진 실행, 전체 투영, 미디어 조회, 브라우저 재생은 하지 않습니다.
from pathlib import Path
from fractions import Fraction as F
import json,math,hashlib
R=Path(__file__).resolve().parents[2]
fp=R/'docs/hanja-source-original-full-u83f0-k-2026-10-23/engine-proof.json'
raw=fp.read_bytes();assert hashlib.sha256(raw).hexdigest()=='863677f60b148aa20c2db87336e8f1cd258b79dea32c41211846477876ae53b5'
full=json.loads(raw);L=full['trace'][10][0];Q=full['trace'][11][0]
assert L['kind']=='cdDrawLine'and Q['kind']=='cdDrawCurve'
assert L['args']==[127.5,79.4,127.5,168.33499999999995,0,32]
assert Q['args']==[92.4,175.685,122.1,172.01,157.2,166.13,0,7]
la=list(map(lambda x:F(str(x)),L['args'][:4]));qa=list(map(lambda x:F(str(x)),Q['args'][:6]))
assert la[2]==la[0]and la[3]>la[1]
dx=[2*(qa[2]-qa[0]),2*(qa[4]-qa[2])];dy=[2*(qa[3]-qa[1]),2*(qa[5]-qa[3])]
assert min(dx)>0 and max(dy)<0
# 원 cdDrawLine 수직 본체·시작 장식의 기존 좌표 등식.
quant=lambda v:math.floor(v*10)/10
xy=lambda x,y:{'x':quant(x),'y':quant(y),'off':0}
x1,y1,x2,y2=L['args'][:4];T=full['defaults']['kMinWidthT'];Y=2
line_body=[xy(x1+T,y1+Y/2),xy(x2+T,y2+Y),xy(x2-T,y2+Y),xy(x1-T,y1-Y/2)]
line_head=[xy(x1+T,y1+Y*.5),xy(x1+T+T*.5,y1+Y*.5+Y),xy(x1+T-2,y1+Y*.5+Y*2+1)]
assert L['polygons']==[line_body,line_head]
# 원 cdDrawCurveU a1=0의 시작점 보정과 bottom-to-up 장식 두 개만 비교.
x1,y1,sx,sy,x2,y2=Q['args'][:6];delta=-Y*.5
rad=math.atan((sy-y1)/(sx-x1));v=1 if x1<sx else -1
x1=x1-delta*math.cos(rad)*v;y1=y1-delta*math.sin(rad)*v
rad=math.atan((sy-y1)/(sx-x1));v=1 if x1<sx else -1
XX=math.sin(rad)*v;XY=-math.cos(rad)*v;YX=math.cos(rad)*v;YY=math.sin(rad)*v
assert y1>y2
q_head1=[xy(x1-T*XX,y1-T*XY),xy(x1+T*XX,y1+T*XY),xy(x1+T*XX-Y*YX,y1+T*XY-Y*YY)]
q_head2=[xy(x1-T*XX,y1-T*XY),xy(x1-T*1.5*XX+Y*YX,y1+Y*YY-T*1.5*XY),xy(x1-T*.5*XX+Y*3*YX,y1+Y*3*YY-T*.5*XY)]
assert Q['polygons'][1:]==[q_head1,q_head2]
bounds=lambda ps:[min(p['x']for poly in ps for p in poly),min(p['y']for poly in ps for p in poly),max(p['x']for poly in ps for p in poly),max(p['y']for poly in ps for p in poly)]
lb=bounds(L['polygons']);qb=bounds([Q['polygons'][0]]);hd=bounds(Q['polygons'][1:])
gap2=(la[2]-qa[0])**2+(la[3]-qa[1])**2
fixture=json.loads((R/'docs/hanja-source-independent-melon-line-q-u83f0-k-source-experiment-2026-10-23/fixtures.json').read_text())['u83f0-k']
assert hashlib.sha256(json.dumps(fixture['strokes'],separators=(',',':')).encode()).hexdigest()=='2b7c85d13238aa00e29782f314ef6ec26e87affe01c1c74f8a53ba7580506da4'
assert fixture['strokes'][9][0]['direction']=='down'and fixture['strokes'][9][1]['revealWidth']==14
initial_cap_max_x=qa[0]/2+7;previous_P_min_x=F(str(lb[0]))/2
assert initial_cap_max_x<previous_P_min_x
print(json.dumps({'newCodeSourceFactsFIRST':'PASS','sourceRoot':'u83f0-k','macroDirections':['vertical-down','rising-right'],'QDerivativeXEndpoints':list(map(str,dx)),'QDerivativeYEndpoints':list(map(str,dy)),'macroDirectionConflict':False,'linePBoundsOriginal200Units':lb,'QBodyPBoundsOriginal200Units':qb,'QStartDecorationBoundsOriginal200Units':hd,'sourceFormulaPolygonsCompared':4,'QStartDecorationsExactlyMatchPinnedFormula':True,'sourceLineToQGapSquared':str(gap2),'sourceLineToQGap':math.sqrt(float(gap2)),'conditionalInitialCapMaxXNormalized':str(initial_cap_max_x),'previousCompletedPMinXNormalized':str(previous_P_min_x),'conditionalInitialSeparationNormalized':str(previous_P_min_x-initial_cap_max_x),'connectedAnimationApproved':False,'engineRuns':0,'fullSourceProjection':0,'mediaFetches':0,'nativeScreens':0,'sharedMutations':0,'server':0}))
