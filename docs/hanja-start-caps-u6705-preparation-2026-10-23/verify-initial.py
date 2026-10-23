# New 朅 initial-arc certificates only; excludes source-foot4m2.
import json,re
from fractions import Fraction as F
from pathlib import Path
import hashlib
r=Path(__file__).resolve().parents[2]
fixture=json.loads((r/'docs/hanja-source-independent-qq-u6705-source-experiment-2026-10-23/fixtures.json').read_text())['u6705']
rows=[{'pen':pen,'mask':1,'id':'u6705-'+str(pen)+'-1','segment':fixture['strokes'][pen-1][0],'maskSHA256':hashlib.sha256(json.dumps(fixture['strokes'][pen-1][0],separators=(',',':')).encode()).hexdigest()}for pen in [4,5,7,10,11,12,13,14]]
def dot(a,b):return sum(x*y for x,y in zip(a,b))
out=[]
for row in rows:
 s=row['segment'];g=s['revealPath'];syntax=''.join(re.findall('[MLQC]',g));nums=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',g)));A=nums[:2]
 base={'pen':row['pen'],'mask':row['mask'],'guide':g,'maskSHA256':row['maskSHA256'],'syntax':syntax,'width':14,'radius':7,'weight':s['weight'],'initialArcMax':7,'initialSufficientConditions':True,'notRasterProof':True,'PIntersectionConnectivityNotProved':True,'notFullSweepProof':True}
 if syntax=='MQ':
  C=nums[2:4];B=nums[4:6];u=[C[i]-A[i]for i in range(2)];v=[A[i]-2*C[i]+B[i]for i in range(2)];T=F(1,2);K=F(1,20);vv=dot(v,v);crit=max(F(0),min(T,-dot(u,v)/vv)) if vv else F(0);lam=dot([u[i]+crit*v[i]for i in range(2)],[u[i]+crit*v[i]for i in range(2)]);cross=u[0]*v[1]-u[1]*v[0];chord=[2*T*u[i]+T*T*v[i]for i in range(2)];cm=dot(chord,chord)-49;curve=4*K*K*lam**3-cross**2;cos=1-(7*K)**2/2;axis=next(i for i in [0,1]if u[i]*(u[i]+T*v[i])>0);assert lam>0 and cm>0 and curve>0 and cos>7*K
  cert={**base,'initialKind':'single-quadratic','T':str(T),'K':str(K),'firstLegLength':None,'u':list(map(str,u)),'v':list(map(str,v)),'lambda':str(lam),'lambdaAt':str(crit),'cross':str(cross),'chordSquaredMinus49':str(cm),'curvatureMargin':str(curve),'cosLower':str(cos),'cosMinusRK':str(cos-7*K),'strictAxis':['x','y'][axis],'derivativeEndpoints':[str(2*u[axis]),str(2*(u[axis]+T*v[axis]))]}
 elif syntax in ['MLL','MLQQ']:
  B=nums[2:4];leg=[B[i]-A[i]for i in range(2)];sq=dot(leg,leg);assert sq>49;assert (leg[1]==0 and leg[0]>0) or (leg[0]==0 and leg[1]>0)
  cert={**base,'initialKind':'straight-first-leg','T':None,'K':'0','firstLegLength':str(leg[0] or leg[1]),'firstLegSquared':str(sq),'firstLegSquaredMinus49':str(sq-49),'firstLegDirection':'right' if leg[0]>0 else 'down','nextCommandOutsideInitialArc7':True,'curvatureCalculationApplied':False}
 else:raise AssertionError(syntax)
 out.append({'pen':row['pen'],'mask':row['mask'],'id':row['id'],'certificate':cert})
import gzip,base64
assert len(out)==8
print(json.dumps({'targets':len(out),'singleQuadratic':sum(row['certificate']['initialKind']=='single-quadratic'for row in out),'straightFirstLeg':sum(row['certificate']['initialKind']=='straight-first-leg'for row in out),'proofGzipBase64':base64.b64encode(gzip.compress(json.dumps(out,separators=(',',':')).encode())).decode()},separators=(',',':')))
