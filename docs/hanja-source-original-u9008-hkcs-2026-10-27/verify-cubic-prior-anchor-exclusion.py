from pathlib import Path
from fractions import Fraction as F
import hashlib,json,re
R=Path(__file__).resolve().parents[2]
FIX='docs/hanja-source-original-u9008-hkcs-2026-10-27/fixtures-draft.json'
sha=lambda b:hashlib.sha256(b).hexdigest()
assert sha((R/FIX).read_bytes())=='c9fce51a23da581bcd9b25bc7e2f5fbabd765b45c222926fafc2fcdaef92707f'
f=json.loads((R/FIX).read_text())['u9008'];previous,current=f['strokes'][9];assert f['sourceGroups'][9]==[4,5]
call=f['fullProof']['trace'][5][0];assert call['kind']=='cdDrawBezier';assert len(f['fullProof']['trace'][5])==1
nums=list(map(F,re.findall(r'[-+]?(?:[0-9]*[.][0-9]+|[0-9]+)(?:[eE][-+]?[0-9]+)?',current['revealPath'])));assert len(nums)==8 and ' C'in current['revealPath'];P=list(zip(nums[::2],nums[1::2]));assert all(float(a)==b/2 for a,b in zip(nums,call['args'][:8]));assert current['revealWidth']==14
bounds=list(map(lambda v:F(str(v)),previous['bounds']));xmin,ymin,xmax,ymax=bounds
cx=[3*(P[i+1][0]-P[i][0])for i in range(3)];assert min(cx)>0
c1=3*(P[1][1]-P[0][1]);c2=3*(P[0][1]-2*P[1][1]+P[2][1]);c3=-P[0][1]+3*P[1][1]-3*P[2][1]+P[3][1];assert c2<0 and c3<0
r=F(1,19)
def point(t):return tuple((1-t)**3*P[0][k]+3*t*(1-t)**2*P[1][k]+3*t*t*(1-t)*P[2][k]+t**3*P[3][k]for k in[0,1])
X,Y=point(r);lower=c1+2*c2*r+3*c3*r*r;assert lower>0 and Y<ymin and X>xmax
# Therefore t<=r has y<prior minY, and t>=r has x>prior maxX. Exact entire [0,1], not finite sampling.
values=list(map(F,re.findall(r'[-+]?(?:[0-9]*[.][0-9]+|[0-9]+)(?:[eE][-+]?[0-9]+)?',current['outline'])));vertices=list(zip(values[::2],values[1::2]));startX=min(p[0]for p in vertices);starts=sorted(set(p for p in vertices if p[0]==startX));assert len(starts)==1 and starts[0][1]<ymin
out={'schema':'hanja-u9008-cubic-prior-anchor-exclusion/v1','glyph':'逈','pen':10,'mask':2,'fixture':FIX,'fixtureSHA256':sha((R/FIX).read_bytes()),'compiledSHA256':f['compiledSHA256'],'previousMaskBounds':bounds,'sourceCurveKind':'cdDrawBezier','sourceCAndOriginalPUnchanged':True,'xDerivativeBernsteinCoefficients':cx,'xStrictlyIncreasingOnUnitInterval':True,'separatingAnalysisParameter':r,'parameterIsRevealAnchor':False,'CAtSeparatingParameter':(X,Y),'priorYGapAtSeparator':ymin-Y,'priorXGapAtSeparator':X-xmax,'yDerivativeLowerBoundBeforeSeparator':lower,'priorContactExclusion':{'beforeOrAtSeparator':'C.y(t)<=C.y(r)<prior minimumY','afterOrAtSeparator':'C.x(t)>=C.x(r)>prior maximumX','entireClosedParameterInterval':[0,1],'anyOriginalCPointInCompletedPriorMask':False,'anyOriginalCPointInTargetKernelAndCompletedPriorMask':False},'xPrefixInitialBoundary':{'minX':startX,'points':starts,'allOutsideCompletedPriorBounds':True,'continuousPriorContactApproved':False},'decision':'HOLD-simple-C-anchor-and-global-X-prefix-contact; do not force or move original curve','limits':['Exact rational compiled-token bounding proof; prior bounds are from the unchanged verified source fixture.','This excludes anchors constrained to the original C against the completed previous mask; no statement about invented off-curve anchors or new authored phased policies.','Single-section X-prefix eligibility does not imply a connected handoff to prior ink.'],'newGeometry':False,'policyAdopted':False,'nativeApproval':False,'runtimeApplied':False,'engine':0,'verifierSHA256':sha(Path(__file__).read_bytes())}
def encoded(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[encoded(x)for x in v]
 if isinstance(v,dict):return{k:encoded(x)for k,x in v.items()}
 return v
print(json.dumps(encoded(out),ensure_ascii=False,indent=2))
