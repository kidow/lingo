# 綌 신규 MQ 9개에만 기존 충분조건을 적용합니다. 이전 후보 검증은 재실행하지 않습니다.
import json,re,hashlib
from fractions import Fraction as F
from pathlib import Path
R=Path(__file__).resolve().parents[2]
fixture=json.loads((R/'docs/hanja-source-independent-thread-qq-two-u7d8c-source-experiment-2026-10-23/fixtures.json').read_text())['u7d8c']
def dot(a,b):return sum(x*y for x,y in zip(a,b))
out=[]
for pen in [1,2,3,5,6,7,8,9,10]:
 s=fixture['strokes'][pen-1][0];g=s['revealPath'];syntax=''.join(re.findall('[MLQC]',g));assert syntax=='MQ' and s['revealWidth']==14
 nums=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',g)));A=nums[:2];C=nums[2:4];B=nums[4:6]
 u=[C[i]-A[i]for i in range(2)];v=[A[i]-2*C[i]+B[i]for i in range(2)];T=F(1,2);K=F(1,20);vv=dot(v,v)
 crit=max(F(0),min(T,-dot(u,v)/vv))if vv else F(0)
 lam=dot([u[i]+crit*v[i]for i in range(2)],[u[i]+crit*v[i]for i in range(2)])
 cross=u[0]*v[1]-u[1]*v[0];chord=[2*T*u[i]+T*T*v[i]for i in range(2)]
 cm=dot(chord,chord)-49;curve=4*K*K*lam**3-cross**2;cos=1-(7*K)**2/2
 axes=[i for i in [0,1]if u[i]*(u[i]+T*v[i])>0]
 passed=bool(axes and lam>0 and cm>0 and curve>0 and cos>7*K)
 cert={'pen':pen,'mask':1,'guide':g,'maskSHA256':hashlib.sha256(json.dumps(s,separators=(',',':')).encode()).hexdigest(),'syntax':syntax,'width':14,'radius':7,'weight':s['weight'],'initialArcMax':7,'initialSufficientConditions':passed,'notRasterProof':True,'PIntersectionConnectivityNotProved':True,'notFullSweepProof':True,'initialKind':'single-quadratic','T':str(T),'K':str(K),'firstLegLength':None,'u':list(map(str,u)),'v':list(map(str,v)),'lambda':str(lam),'lambdaAt':str(crit),'cross':str(cross),'chordSquaredMinus49':str(cm),'curvatureMargin':str(curve),'cosLower':str(cos),'cosMinusRK':str(cos-7*K),'strictAxis':['x','y'][axes[0]]if axes else None,'derivativeEndpoints':[str(2*u[axes[0]]),str(2*(u[axes[0]]+T*v[axes[0]]))]if axes else None}
 out.append({'pen':pen,'mask':1,'id':'u7d8c-'+str(pen)+'-1','certificate':cert})
print(json.dumps({'schema':'hanja-target-initial-mq-certificates/v1','glyph':'綌','root':'u7d8c','certificates':out,'passed':sum(x['certificate']['initialSufficientConditions']for x in out),'failed':sum(not x['certificate']['initialSufficientConditions']for x in out),'newSourceEngine':0,'newSourceProjection':0,'nativeApproval':False},separators=(',',':')))
