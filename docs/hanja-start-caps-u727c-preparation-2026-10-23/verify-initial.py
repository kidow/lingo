# New target-specific 牼 initial guide certificates. No prior successful proof is rerun.
import json,re,hashlib
from fractions import Fraction as F
from pathlib import Path
R=Path(__file__).resolve().parents[2]
fixture=json.loads((R/'docs/hanja-source-independent-qq-three-u727c-source-experiment-2026-10-23/fixtures.json').read_text())['u727c']
def dot(a,b):return sum(x*y for x,y in zip(a,b))
out=[]
for pen in [1,4,6,7,8]:
 s=fixture['strokes'][pen-1][0];g=s['revealPath'];syntax=''.join(re.findall('[MLQC]',g));assert syntax=='MQ' and s['revealWidth']==14
 nums=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',g)));A=nums[:2];C=nums[2:4];B=nums[4:6]
 u=[C[i]-A[i]for i in range(2)];v=[A[i]-2*C[i]+B[i]for i in range(2)];T=F(1,2);K=F(1,20);vv=dot(v,v)
 crit=max(F(0),min(T,-dot(u,v)/vv)) if vv else F(0)
 lam=dot([u[i]+crit*v[i]for i in range(2)],[u[i]+crit*v[i]for i in range(2)])
 cross=u[0]*v[1]-u[1]*v[0];chord=[2*T*u[i]+T*T*v[i]for i in range(2)]
 cm=dot(chord,chord)-49;curve=4*K*K*lam**3-cross**2;cos=1-(7*K)**2/2
 axes=[i for i in [0,1] if u[i]*(u[i]+T*v[i])>0];assert axes;axis=axes[0]
 assert lam>0 and cm>0 and curve>0 and cos>7*K
 cert={'pen':pen,'mask':1,'guide':g,'maskSHA256':hashlib.sha256(json.dumps(s,separators=(',',':')).encode()).hexdigest(),'syntax':syntax,'width':14,'radius':7,'weight':s['weight'],'initialArcMax':7,'initialSufficientConditions':True,'notRasterProof':True,'PIntersectionConnectivityNotProved':True,'notFullSweepProof':True,'initialKind':'single-quadratic','T':str(T),'K':str(K),'firstLegLength':None,'u':list(map(str,u)),'v':list(map(str,v)),'lambda':str(lam),'lambdaAt':str(crit),'cross':str(cross),'chordSquaredMinus49':str(cm),'curvatureMargin':str(curve),'cosLower':str(cos),'cosMinusRK':str(cos-7*K),'strictAxis':['x','y'][axis],'derivativeEndpoints':[str(2*u[axis]),str(2*(u[axis]+T*v[axis]))]}
 out.append({'pen':pen,'mask':1,'id':'u727c-'+str(pen)+'-1','certificate':cert})
print(json.dumps(out,separators=(',',':')))
