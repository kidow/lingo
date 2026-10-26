from pathlib import Path
from fractions import Fraction as F
import json,re,math,hashlib
R=Path(__file__).resolve().parents[2]
FIXTURE='docs/hanja-source-original-u85c7-hkcs-2026-10-26/fixtures.json';b=(R/FIXTURE).read_bytes();assert hashlib.sha256(b).hexdigest()=='fbb7b817d68a9c1a70064f8ab31b49237dbdfbc0ab69e33b6f77f5dd9aa0aed1';f=json.loads(b)['hkcs_m85c7']
METHOD='docs/hanja-source-original-u705d-hkcs-m-2026-10-26/verify-independent-conditions.py';m=(R/METHOD).read_bytes();assert hashlib.sha256(m).hexdigest()=='4f18233d2bba8eb440506fc2a4134b052fa304bfaa27ef9826b39ec9ae3b1221'
TARGETS=[[17,1]];initial=[]
EVIDENCE=[{"path":"docs/hanja-source-original-u85c7-hkcs-2026-10-26/full-Q7-coverage-proof.json","SHA256":"f0a7869e25b7aa27d50f8009fbcc2ea66556f5cc3c3d68ee1af5412b8ddc4765"},{"path":"docs/hanja-source-original-u85c7-hkcs-2026-10-26/paint-and-compound-contacts-proof.json","SHA256":"145b66073163a60abd737344d6204a92a5b34eafa37bc954034fbd31a8f5eebe"},{"path":"docs/hanja-source-alternative-u85c7-hkcs-2026-10-26/sources.json","SHA256":"cae48a831179493986a2aa64127c80be2d29b7d6c3d28a750714b3bbe67767f9"},{"path":"docs/hanja-actual-engine-capture-u85c7-hkcs-2026-10-26/engine-whole-hkcs_m85c7.json","SHA256":"fec68385651daa6711291f6e1d441333377c01cf1e8baeb2fe3480bb9ab10749"}]
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

s=f['strokes'][16][0];assert s['revealPath']=='M38.5 77.9725 Q26.5 86.425 7 92.865' and s['revealWidth']==14 and s['weight']==34.843027
vals=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])];q0=tuple(vals[:2]);W=(F(39),F(163,2));delta=F(1,100)
parts=[]
for text in s['outline'].split('M')[1:]:
 n=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',text)];parts.append(list(zip(n[::2],n[1::2])))
assert len(parts)==3
P=parts[2];assert P==[(F(399,10),F(403,5)),(F(40),F(412,5)),(F(149,4),F(325,4))]
def cr(a,b,p):return(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
assert all(cr(a,z,W)>0 for a,z in zip(P,P[1:]+P[:1]))
D2=sum((W[i]-q0[i])**2 for i in[0,1]);assert D2<49
priorMaxY=max(F(str(seg['bounds'][3]))for pen in f['strokes'][:16]for seg in pen);assert W[1]-delta>priorMaxY
corners=[]
for x in[W[0]-delta,W[0]+delta]:
 for y in[W[1]-delta,W[1]+delta]:
  v=(x,y);cs=[cr(a,z,v)for a,z in zip(P,P[1:]+P[:1])];ds=sum((v[i]-q0[i])**2 for i in[0,1]);assert all(c>0 for c in cs)and ds<49;corners.append({'point':v,'triangleMargins':cs,'diskDistanceSquared':ds})
assert initial[0]['initialSufficientConditions'] and initial[0]['T']=='1/2' and initial[0]['K']=='1/20'
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
output={'schema':'hanja-source-roundcap-initial-exposure/v1','date':'2026-10-26','glyph':'藇','pen':17,'mask':1,'fixture':FIXTURE,'fixtureSHA256':hashlib.sha256(b).hexdigest(),'geometrySHA256':'f9815c9af484d5f5a81ee6833768ce5b9a4e1606e5f40cdc830fd1bfabc945fc','originalGuide':s['revealPath'],'originalRadius':7,'sourcePCount':3,'witness':{'point':W,'inOriginalPolygonIndex1Based':3,'Q0':q0,'distanceSquaredToQ0':D2,'radiusSquared':49,'strictOpenBoxHalfWidth':delta,'openBoxArea':4*delta*delta,'corners':corners,'prefix16AllOriginalBoundsMaxY':priorMaxY,'boxMinYMinusPrefixMaxY':W[1]-delta-priorMaxY,'strictlyOutsidePrefix16':True},'jumpCondition':'When p0 hides current ink but every positive p includes the unchanged original start disk radius7, this fixed positive-area original-P box is immediately exposed outside prefix16. The proof does not attribute additional ink to any raster/AA effect.','newGrowingCapCertificate':initial[0],'methodSource':METHOD,'methodSourceSHA256':hashlib.sha256(m).hexdigest(),'limits':['New T=1/2,K=1/20 sufficient guide-initial conditions were evaluated for this target; they do not prove original-P intersection connectivity or the entire sweep.','Existing Q7 coverage and paint equivalence are reused without rerun. No source guide/originalP/width/weight is changed.','The certificate is source-only; new growing-cap runtime/native approval is absent.'],'existingEvidence':EVIDENCE,'previousCoverageRecomputed':False,'previousPaintRecomputed':False,'engine':0,'projection':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(enc(output),ensure_ascii=False))
