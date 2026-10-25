from pathlib import Path
from fractions import Fraction as F
import json,re,math,hashlib,ast,gzip,base64
ROOT=Path('/Users/kidow/Documents/dev/kidow/lingo');FP='docs/hanja-source-original-u840d-hkcs-2026-10-25/fixtures.json';raw=(ROOT/FP).read_bytes();assert hashlib.sha256(raw).hexdigest()=='86cafe4a029685e7c842156e7bc1016174c463d945c893aa2da0f50674e1a1c7';f=json.loads(raw)['hkcs_m840d']
old=ROOT/'docs/hanja-source-original-u61b8-hkcs-2026-10-25/initial-feasibility.py'
for node in ast.walk(ast.parse(old.read_text())):
 if isinstance(node,ast.FunctionDef)and node.name in{'cross','area','contains','ears','polys','cover'}:exec(compile(ast.Module(body=[node],type_ignores=[]),str(old),'exec'))
results=[]
for pen in[5,6,9,10]:
 s=f['strokes'][pen-1][0];assert s['revealWidth']==14
 a=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])];q0,q1,q2=a[:2],a[2:4],a[4:6]
 samples=[tuple((1-t)**2*q0[j]+2*t*(1-t)*q1[j]+t*t*q2[j]for j in[0,1])for t in[F(i,256)for i in range(257)]];sf=[tuple(map(float,c))for c in samples];leaves=[];unresolved=[];depthmax=0;triangles=[]
 for pi,p in enumerate(polys(s['outline'])):
  tr=ears(p);triangles.append([[[str(x)for x in v]for v in t]for t in tr])
  for ti,t in enumerate(tr):cover(t,f'{pi}:{ti}:',0)
 assert not unresolved
 u=(a[2]-a[0],a[3]-a[1]);v=(a[4]-2*a[2]+a[0],a[5]-2*a[3]+a[1]);vv=sum(x*x for x in v);attempts=[];chosen=None
 for T,K in[(F(1,2),F(1,20)),(F(1),F(1,20)),(F(1,2),F(1,10)),(F(1),F(1,10)),(F(1,4),F(1,20)),(F(1,4),F(1,40)),(F(1,2),F(1,40)),(F(1),F(1,40)),(F(1,2),F(1,80)),(F(1),F(1,80))]:
  at=max(F(0),min(T,-sum(u[i]*v[i]for i in[0,1])/vv))if vv else F(0);lam=sum((u[i]+at*v[i])**2 for i in[0,1]);cr=u[0]*v[1]-u[1]*v[0];chord=sum((2*T*u[i]+T*T*v[i])**2 for i in[0,1])-49;curvature=4*K*K*lam**3-cr*cr;cos=1-(7*K)**2/2;axes=[i for i in[0,1]if u[i]*(u[i]+T*v[i])>0];ok=chord>0 and curvature>0 and cos-7*K>0 and bool(axes)
  attempts.append({'T':str(T),'K':str(K),'ok':ok,'chordMargin':str(chord),'curvatureMargin':str(curvature),'cosMinusRK':str(cos-7*K)})
  if ok:chosen={'T':str(T),'K':str(K),'u':[str(x)for x in u],'v':[str(x)for x in v],'lambdaAt':str(at),'lambda':str(lam),'strictAxis':'xy'[axes[0]],'cross':str(cr),'chordSquaredMinusRadiusSquared':str(chord),'curvatureMargin':str(curvature),'cosLower':str(cos),'cosMinusRK':str(cos-7*K)};break
 assert chosen
 results.append({'pen':pen,'mask':1,'guideUnchanged':s['revealPath'],'width':14,'maskSHA256':hashlib.sha256(json.dumps(s,separators=(',',':')).encode()).hexdigest(),'fullQ7Coverage':{'triangles':triangles,'leaves':leaves,'unresolved':unresolved,'maxSplitDepth':depthmax,'strictFullPContained':True,'minimumStrictSquaredMargin':str(min(F(x['radiusSquaredMargin'])for x in leaves))},'initialSufficientConditions':chosen,'attempts':attempts,'actualInitialPIntersectionConnectivityProved':False,'allTimePConnectivityProved':False,'nativeApproved':False})
out={'schema':'hanja-independent-curve-source-conditions/v1','date':'2026-10-25','glyph':'萍','coordinateSpace':'normalized100','normalizerDivisor':2,'fixture':{'path':FP,'SHA256':hashlib.sha256(raw).hexdigest()},'reusedMathFunctions':{'path':str(old.relative_to(ROOT)),'SHA256':hashlib.sha256(old.read_bytes()).hexdigest(),'previousTargetLoopsExecuted':0},'cases':results,'logical7Recomputed':False,'sourceGeometryGuideWidthChanged':False,'sourceEngine':0,'sourceProjection':0,'nativeApproved':False,'runtimeApplied':False,'limits':['Only four independent source curves outside logical7 are checked.','Strict full Q7 coverage and initial cap sufficient conditions do not establish actual P-intersection connectivity or browser playback.','Existing logical7 original/native/P3/body/rising evidence is reused without any replay.']}
print(json.dumps({'encoded':base64.b64encode(gzip.compress(json.dumps(out,separators=(',',':')).encode(),mtime=0)).decode(),'summary':[{'pen':x['pen'],'fullQ7':x['fullQ7Coverage']['strictFullPContained'],'coverLeaves':len(x['fullQ7Coverage']['leaves']),'T':x['initialSufficientConditions']['T'],'K':x['initialSufficientConditions']['K'],'native':False}for x in results]}))
