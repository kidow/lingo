from pathlib import Path
from fractions import Fraction as F
import json,re,math,hashlib
R=Path(__file__).resolve().parents[2];FIXTURE='docs/hanja-source-original-u6145-hkcs-2026-10-26/fixtures.json'
b=(R/FIXTURE).read_bytes();assert hashlib.sha256(b).hexdigest()=='1e1fd8df28591095a09018740222d9a9e2ccd0b6255a6fe545d87967116b1546'

m=(R/'docs/hanja-source-original-u705d-hkcs-m-2026-10-26/verify-independent-conditions.py').read_bytes();assert hashlib.sha256(m).hexdigest()=='4f18233d2bba8eb440506fc2a4134b052fa304bfaa27ef9826b39ec9ae3b1221'
f=json.loads(b)['hkcs_m6145'];TARGETS=[[1,1],[2,1],[5,1],[6,1],[7,1],[13,1]];initial=[]
for pen,mask in TARGETS:
 s=f['strokes'][pen-1][mask-1]
 v=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])]
 linear=' L'in s['revealPath']
 if linear:
  assert len(v)==4
  q0,q2=tuple(v[:2]),tuple(v[2:])
  q1=tuple((q0[j]+q2[j])/2 for j in [0,1])
 else:
  assert len(v)==6 and ' Q'in s['revealPath']
  q0,q1,q2=tuple(v[:2]),tuple(v[2:4]),tuple(v[4:])
 assert s['revealWidth']==14
 if linear:
  distance2=sum((q2[j]-q0[j])**2 for j in [0,1])
  lower=math.isqrt(distance2.numerator//distance2.denominator)
  assert lower>1 and F(lower*lower)<=distance2
  K=F(1,20)
  cert={'pen':pen,'mask':mask,'syntax':'ML','initialKind':'single-line','guide':s['revealPath'],'initialArcMax':1,'firstLegLength':str(lower),'firstLegSquared':str(distance2),'lowerBoundCertified':True,'K':str(K),'T':None,'strictLine':True,'initialSufficientConditions':True}
 else:
  u=tuple(q1[j]-q0[j]for j in [0,1]);v=tuple(q2[j]-2*q1[j]+q0[j]for j in [0,1])
  vv=sum(x*x for x in v);attempts=[];cert=None
  for T,K in [(F(1,2),F(1,20)),(F(1),F(1,20)),(F(1,2),F(1,10)),(F(1),F(1,10))]:
   at=max(F(0),min(T,-sum(u[j]*v[j]for j in [0,1])/vv))if vv else F(0)
   lam=sum((u[j]+at*v[j])**2 for j in [0,1])
   cr=u[0]*v[1]-u[1]*v[0]
   chord=sum((2*T*u[j]+T*T*v[j])**2 for j in [0,1])-49
   curvature=4*K*K*lam**3-cr*cr;cos=1-(7*K)**2/2
   axes=[j for j in [0,1]if u[j]*(u[j]+T*v[j])>0]
   ok=chord>0 and curvature>0 and cos-7*K>0 and bool(axes)
   attempts.append({'T':str(T),'K':str(K),'ok':ok,'chordMargin':str(chord),'curvatureMargin':str(curvature),'cosMinusRK':str(cos-7*K)})
   if ok:
    cert={'pen':pen,'mask':mask,'syntax':'MQ','initialKind':'single-quadratic','guide':s['revealPath'],'initialArcMax':7,'firstLegLength':None,'T':str(T),'K':str(K),'u':[str(x)for x in u],'v':[str(x)for x in v],'lambdaAt':str(at),'lambda':str(lam),'cross':str(cr),'chordSquaredMinusRadiusSquared':str(chord),'curvatureMargin':str(curvature),'cosLower':str(cos),'cosMinusRK':str(cos-7*K),'strictAxis':'xy'[axes[0]],'initialSufficientConditions':True}
    break
  if cert is None:cert={'pen':pen,'mask':mask,'initialSufficientConditions':False,'attempts':attempts}
  cert['attempts']=attempts
 cert.update({'width':14,'radius':7,'weight':s['weight'],'maskSHA256':hashlib.sha256(json.dumps(s,separators=(',',':')).encode()).hexdigest(),'notRasterProof':True,'PIntersectionConnectivityNotProved':True,'notFullSweepProof':True,'priorMaskContactClaimed':False})
 initial.append(cert)

print(json.dumps({'schema':'hanja-source-initial-conditions/v1','date':'2026-10-26','glyph':'慅','root':'hkcs_m6145','fixture':FIXTURE,'fixtureSHA256':hashlib.sha256(b).hexdigest(),'geometrySHA256':'322c4e7e9469e69b251ded98f0ace2d2fdd5530d3bd0cdf0f4e0de9d85c29137','initialCases':initial,'methodSource':'docs/hanja-source-original-u705d-hkcs-m-2026-10-26/verify-independent-conditions.py','methodSourceSHA256':'4f18233d2bba8eb440506fc2a4134b052fa304bfaa27ef9826b39ec9ae3b1221','fullQCoverageComputed':False,'compoundContactApproved':False,'flag5TerminalApproved':False,'sourceEngineReplay':0,'sourceProjection':0,'sourcePGuideWidthWeightChanged':False,'nativeApproval':False,'runtimeApplied':False},ensure_ascii=False,separators=(',',':')))
