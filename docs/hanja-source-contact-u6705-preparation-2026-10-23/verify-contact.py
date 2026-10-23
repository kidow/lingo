from pathlib import Path
from fractions import Fraction as F
import json,re,hashlib
r=Path(__file__).resolve().parents[2]
def polys(text):
 return [list(zip(a[::2],a[1::2]))for a in [list(map(F,re.findall(r'-?\d+(?:\.\d+)?',t)))for t in text.split('M')[1:]]]
def edges(p):return list(zip(p,p[1:]+p[:1]))
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def signed(p):return sum(a[0]*b[1]-b[0]*a[1] for a,b in edges(p))/2
def area(p):return abs(signed(p))if p else F(0)
def clip(subject,c):
 if signed(c)<0:c=list(reversed(c))
 out=subject
 for a,b in edges(c):
  old=out;out=[]
  if not old:break
  for u,v in edges(old):
   cu,cv=cross(a,b,u),cross(a,b,v)
   if cu>=0:out.append(u)
   if (cu<0<cv)or(cv<0<cu):
    t=cu/(cu-cv);out.append(tuple(u[k]+t*(v[k]-u[k])for k in range(2)))
 return out
def dist2(q,a,b):
 v=[b[i]-a[i]for i in range(2)];t=max(F(0),min(F(1),sum((q[i]-a[i])*v[i]for i in range(2))/sum(x*x for x in v)))
 return sum((q[i]-a[i]-t*v[i])**2 for i in range(2))
def inside(q,p):
 n=False
 for a,b in edges(p):
  if cross(a,b,q)==0 and all(min(a[i],b[i])<=q[i]<=max(a[i],b[i])for i in range(2)):return False
  if (a[1]>q[1])!=(b[1]>q[1]) and a[0]+(q[1]-a[1])*(b[0]-a[0])/(b[1]-a[1])>q[0]:n=not n
 return n

fixture='docs/hanja-source-independent-qq-u6705-source-experiment-2026-10-23/fixtures.json'
raw=(r/fixture).read_bytes();f=json.loads(raw)['u6705'];prior,following=f['strokes'][3];A=polys(prior['outline']);B=polys(following['outline'])
assert hashlib.sha256(raw).hexdigest()=='a4414ed12632efcd34934856579a5c45941631bf27d16e5069101e1f443b327f'
end=(F('12.625'),F('83.5'));radius=F(1,8);found=[]
for xi in range(120,181):
 for yi in range(780,851):
  p=(F(xi,10),F(yi,10))
  for ai,a in enumerate(A):
   if not inside(p,a):continue
   for bi,b in enumerate(B):
    if not inside(p,b):continue
    margin=min(dist2(p,u,v)for poly in [a,b]for u,v in edges(poly))
    if margin<=radius**2:continue
    diskDistance=sum((p[i]-end[i])**2 for i in range(2))
    if diskDistance>=(F(7)-radius)**2:continue
    found.append((margin,p,ai,bi,diskDistance))
assert found
margin,seed,ai,bi,endDistance=max(found,key=lambda t:t[0])
def q(v):return[str(v.numerator),str(v.denominator)]
def point(v):return[q(x)for x in v]
src=Path(r/'components/hanja/stroke-outlines.tsx').read_text();guard="if (p >= 1) return <path key={index} d={segment.outline} />";assert guard in src
tail=f['originalTrace'][13][-1];assert tail['kind']=='cdDrawCurve';args=tail['args'];assert args[-1]==14 and args[3]==args[5] and args[2]>args[4]
defaults=f['headerProof']['defaults'];opt1=int(args[-2]//1000);opt2=int(args[-1]%1000//100);width=defaults['kMinWidthT']-opt1/2;jump=defaults['kWidth']*4*min(1-opt2/10,(width/defaults['kMinWidthT'])**3)*(6/width if width>6 else 1)
assert jump/2==10 and jump/2>7
out={'schema':'hanja-original-contact-feasibility/v1','glyph':'朅','root':'u6705','pen':4,'mask':2,'fixture':fixture,'fixtureSHA256':hashlib.sha256(raw).hexdigest(),'geometrySHA256':f['geometrySHA256'],'sourceIdentity':f['identity'],'counts':{'pens':14,'masks':15,'polygons':37},'originalSourceContact':{'priorPolygon':ai,'nextPolygon':bi,'seed':point(seed),'openDiskRadius':q(radius),'boundaryMarginSquared':q(margin),'diskRemainingMarginSquared':q(margin-radius**2),'actualCompletedPriorPContainsDisk':True,'actualCompletedDefaultUnmaskedGuard':guard,'completedFirstQEndpoint':point(end),'seedToEndpointDistanceSquared':q(endDistance),'endpointRoundDiskInnerRadiusSquared':q((F(7)-radius)**2),'alsoInsideConservativeCompletedRoundGuideEndpointCapsule':True,'positiveAreaWitness':'open disk, not total intersection area','notEachPartialRevealPrefixProof':True},'terminal11Risk':{'rawZeroBased':13,'callIndex':1,'sourceFlag14':True,'normalizedJump':jump/2,'originalWidth':14,'maskRadius':7,'sourceExtentExceedsRadius':True,'sourceOnlyNotObservedNativeFailure':True,'originalTerminalPolygonUnchanged':True,'existingFactoryLeftTailTreatmentCandidate':True,'noCorrectionApplied':True},'scope':{'sourcePGuideWidthWeightUnchanged':True,'oldMathReexecuted':False,'sourceCompiler':0,'engine':0,'sharedEdits':0,'server':0,'nativeApproval':False,'runtimeApplied':False}}
print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
