from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re
R=Path(__file__).resolve().parents[2]
FIX='docs/hanja-source-original-u9008-hkcs-2026-10-27/fixtures-draft.json'
PATH='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py'
KERNEL='docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py'
PRIOR_RESULT='docs/hanja-source-original-u9008-hkcs-2026-10-27/onset-correction-conditions.json'
PINS={FIX:'c9fce51a23da581bcd9b25bc7e2f5fbabd765b45c222926fafc2fcdaef92707f',PATH:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',KERNEL:'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396',PRIOR_RESULT:'fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4'}
sha=lambda b:hashlib.sha256(b).hexdigest()
for p,h in PINS.items():assert sha((R/p).read_bytes())==h
f=json.loads((R/FIX).read_text())['u9008'];env={'F':F,'re':re};src=(R/PATH).read_text()
for n in ast.parse(src).body:
 if isinstance(n,ast.FunctionDef)and n.name=='polygons':exec(compile(ast.get_source_segment(src,n),PATH+'::polygons-only','exec'),env)
polygons=env['polygons'];current=polygons(f['strokes'][9][1]['outline']);prior=polygons(f['strokes'][9][0]['outline']);assert len(current)==2 and len(prior)==3
ks=(R/KERNEL).read_text();n=next(n for n in ast.parse(ks).body if isinstance(n,ast.FunctionDef)and n.name=='audit');body=ast.get_source_segment(ks,n);assert chr(10)+' anchor=tuple'in body
body=body.split(chr(10)+' anchor=tuple',1)[0]+chr(10)+' return P,boundary,kernel';public={'groups':[{'polygons':[[{'x':2*x,'y':2*y}for x,y in p]for p in current]}]};kns={'F':F,'f':public};exec(compile(body,KERNEL+'::one-cubic-target-kernel','exec'),kns);_,boundary,kernel=kns['audit'](1);assert kernel and boundary
area=abs(sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(kernel,kernel[1:]+kernel[:1])))/2
previous=json.loads((R/PRIOR_RESULT).read_text());stored=next(v for v in previous['results']if v['pen']==10 and v['mask']==2);assert area==F(stored['visibilityKernelArea'])
kBounds=[min(p[0]for p in kernel),min(p[1]for p in kernel),max(p[0]for p in kernel),max(p[1]for p in kernel)]
pBounds=[min(p[0]for P in prior for p in P),min(p[1]for P in prior for p in P),max(p[0]for P in prior for p in P),max(p[1]for P in prior for p in P)]
gap=kBounds[0]-pBounds[2];assert gap>0
out={'schema':'hanja-u9008-cubic-kernel-prior-disjointness/v1','glyph':'逈','pen':10,'mask':2,'inputSHA256':PINS,'compiledSHA256':f['compiledSHA256'],'targetOriginalPolygons':2,'completedPriorOriginalPolygons':3,'targetVisibilityKernelArea':area,'targetVisibilityKernelBounds':kBounds,'completedPriorUnionBounds':pBounds,'strictPositiveHorizontalSeparation':gap,'closedTargetKernelIntersectsCompletedPriorP':False,'strictTargetKernelIntersectsCompletedPriorP':False,'anyOnOrOffCurveWholeTargetKernelSeedInPriorPossible':False,'wholeTargetUnionPointFactoryEligible':False,'existingCardinalOrPhasedBandFactoryEligible':'not-established; requires separate source-piece and forward-order contracts, never inferred from static contact','scope':'Only complete original10m2 target P visibility kernel against complete original10m1 P. No arbitrary off-curve seed can satisfy both; piece-specific phased-band methods are not ruled in or out.','newGeometry':False,'guideChanged':False,'policyAdopted':False,'nativeApproval':False,'runtimeApplied':False,'engine':0,'server':0,'verifierSHA256':sha(Path(__file__).read_bytes())}
def encoded(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[encoded(x)for x in v]
 if isinstance(v,dict):return{k:encoded(x)for k,x in v.items()}
 return v
print(json.dumps(encoded(out),ensure_ascii=False,indent=2))
