# New 憸 source-only feasibility. No engine, source projection, or past target execution.
from pathlib import Path
from fractions import Fraction as F
import json,re,math,hashlib
r=Path('/Users/kidow/Documents/dev/kidow/lingo')
f=json.loads((r/'docs/hanja-source-original-u61b8-hkcs-2026-10-25/fixtures.json').read_text())['hkcs_m61b8']
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def area(p):return sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(p,p[1:]+p[:1]))/2
def contains(t,q):return all(cross(t[i],t[(i+1)%3],q)>=0 for i in range(3))
def ears(original):
 p=list(original);p=p if area(p)>0 else p[::-1];indices=list(range(len(p)));out=[]
 while len(indices)>3:
  found=False
  for j,i in enumerate(indices):
   ia,ib=indices[j-1],indices[(j+1)%len(indices)];t=(p[ia],p[i],p[ib]);turn=cross(*t)
   if turn==0:
    # Remove a collinear boundary point only when it lies on its neighbours segment.
    if min(p[ia][0],p[ib][0])<=p[i][0]<=max(p[ia][0],p[ib][0])and min(p[ia][1],p[ib][1])<=p[i][1]<=max(p[ia][1],p[ib][1]):indices.pop(j);found=True;break
   if turn<=0:continue
   if any(contains(t,p[k])for k in indices if k not in [ia,i,ib]):continue
   out.append(t);indices.pop(j);found=True;break
  assert found,'No certified original polygon ear'
 t=tuple(p[k]for k in indices);assert cross(*t)>0;out.append(t);assert sum(area(list(t))for t in out)==abs(area(original));return out
def polys(s):
 out=[]
 for q in s.split(' Z'):
  if not q.strip():continue
  n=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',q)];out.append([(n[i],n[i+1])for i in range(0,len(n),2)])
 return out
results=[]
for pen,mask in [(1,1),(2,1),(4,1),(5,1),(13,1),(14,1),(15,1),(16,1)]:
 s=f['strokes'][pen-1][mask-1];n=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])];q0,q1,q2=(n[:2],n[2:4],n[4:6])
 samples=[tuple((1-t)**2*q0[j]+2*t*(1-t)*q1[j]+t*t*q2[j]for j in [0,1])for t in [F(i,256)for i in range(257)]]
 sf=[tuple(map(float,c))for c in samples];leaves=[];unresolved=[];depthmax=0
 def cover(t,route,depth):
  global depthmax
  depthmax=max(depthmax,depth)
  fv=[tuple(map(float,v))for v in t]
  order=sorted(range(257),key=lambda k:max(sum((v[j]-sf[k][j])**2 for j in [0,1])for v in fv))
  for k in order[:8]:
   distances=[sum((v[j]-samples[k][j])**2 for j in [0,1])for v in t]
   if max(distances)<49:
    leaves.append({'route':route,'centerT':str(F(k,256)),'radiusSquaredMargin':str(49-max(distances))});return
  if depth>=14:unresolved.append({'route':route,'triangle':[[str(x)for x in v]for v in t]});return
  k=max(range(3),key=lambda i:sum((t[i][j]-t[(i+1)%3][j])**2 for j in [0,1]));a,b,c=t[k],t[(k+1)%3],t[(k+2)%3];mid=tuple((a[j]+b[j])/2 for j in [0,1]);cover((a,mid,c),route+'0',depth+1);cover((mid,b,c),route+'1',depth+1)
 original=polys(s['outline']);triangles=[]
 for pi,p in enumerate(original):
  tr=ears(p);triangles.append([[[str(x)for x in v]for v in t]for t in tr])
  for ti,t in enumerate(tr):cover(t,f'{pi}:{ti}:',0)
 results.append({'pen':pen,'mask':mask,'originalPolygons':len(original),'originalTriangles':triangles,'coverLeaves':leaves,'unresolved':unresolved,'maxSplitDepth':depthmax,'strictFullPContained':len(unresolved)==0,'argument':'Ear triangles partition the original polygon area exactly. Every split replaces one triangle by two exact midpoint triangles. Each leaf triangle lies strictly in a radius7 disk centred at an exact original Q(t), because all three vertices have positive radius-squared margin. Convex disks contain each leaf interior.','notRasterProof':True,'notAllTimeGrowingIntersectionProof':True})

# New 憸 conditions only. All eight new curves are evaluated once; no past source/engine/projection is replayed.
initial=[]
for pen,mask in [(1,1),(2,1),(4,1),(5,1),(13,1),(14,1),(15,1),(16,1)]:
 s=f['strokes'][pen-1][mask-1];a=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])];assert len(a)==6 and s['revealWidth']==14
 u=(a[2]-a[0],a[3]-a[1]);v=(a[4]-2*a[2]+a[0],a[5]-2*a[3]+a[1]);vv=sum(x*x for x in v);attempts=[];chosen=None
 for T,K in [(F(1,2),F(1,20)),(F(1),F(1,20)),(F(1,2),F(1,10)),(F(1),F(1,10)),(F(1,4),F(1,20)),(F(1,4),F(1,40)),(F(1,2),F(1,40)),(F(1),F(1,40)),(F(1,2),F(1,80)),(F(1),F(1,80))]:
  at=max(F(0),min(T,-sum(u[i]*v[i]for i in[0,1])/vv))if vv else F(0);lam=sum((u[i]+at*v[i])**2 for i in[0,1]);cr=u[0]*v[1]-u[1]*v[0];chord=sum((2*T*u[i]+T*T*v[i])**2 for i in[0,1])-49;curvature=4*K*K*lam**3-cr*cr;cos=1-(7*K)**2/2;axes=[i for i in[0,1]if u[i]*(u[i]+T*v[i])>0];ok=chord>0 and curvature>0 and cos-7*K>0 and bool(axes)
  attempts.append({'T':str(T),'K':str(K),'ok':ok,'chordMargin':str(chord),'curvatureMargin':str(curvature),'cosMinusRK':str(cos-7*K)})
  if ok:
   chosen={'pen':pen,'mask':mask,'guide':s['revealPath'],'syntax':'MQ','width':14,'radius':7,'weight':s['weight'],'initialArcMax':7,'initialSufficientConditions':True,'notRasterProof':True,'PIntersectionConnectivityNotProved':True,'notFullSweepProof':True,'firstLegLength':None,'newSourceCondition':True,'maskSHA256':hashlib.sha256(json.dumps(s,separators=(',',':')).encode()).hexdigest(),'initialKind':'single-quadratic','T':str(T),'K':str(K),'u':[str(x)for x in u],'v':[str(x)for x in v],'lambdaAt':str(at),'cross':str(cr),'chordSquaredMinusRadiusSquared':str(chord),'curvatureMargin':str(curvature),'cosLower':str(cos),'cosMinusRK':str(cos-7*K),'strictAxis':'xy'[axes[0]],'lambda':str(lam),'priorMaskContactClaimed':False};break
 initial.append({'pen':pen,'mask':mask,'certificate':chosen,'attempts':attempts})
compact=[]
for c in results:
 compact.append({'pen':c['pen'],'mask':c['mask'],'originalPolygons':c['originalPolygons'],'originalTriangleCount':sum(map(len,c['originalTriangles'])),'coverLeaves':len(c['coverLeaves']),'maxSplitDepth':c['maxSplitDepth'],'strictFullPContained':c['strictFullPContained'],'unresolvedCount':len(c['unresolved']),'firstUnresolved':c['unresolved'][:1],'minimumStrictSquaredMargin':str(min((F(x['radiusSquaredMargin'])for x in c['coverLeaves']),default=F(0))),'materializedCertificateSHA256':hashlib.sha256(json.dumps(c,separators=(',',':'),sort_keys=True).encode()).hexdigest(),'notRasterProof':True,'notAllTimeGrowingIntersectionProof':True})
out={'schema':'hanja-original-source-initial-feasibility/v1','date':'2026-10-25','glyph':'憸','root':'hkcs_m61b8','fixture':'docs/hanja-source-original-u61b8-hkcs-2026-10-25/fixtures.json','fixtureSHA256':hashlib.sha256((r/'docs/hanja-source-original-u61b8-hkcs-2026-10-25/fixtures.json').read_bytes()).hexdigest(),'geometrySHA256':'4abb872544b8d0eb9ce26886af39f3bdd942e69cba16e102cb66bbae2bd49055','initialCases':initial,'fullQCoverageSummaries':compact,'sourcePGuideWidthWeightChanged':False,'allTimeGrowingPConnectivityProved':False,'nativeApproval':False,'runtimeApplied':False,'sourceEngineReplay':0,'sourceProjection':0}
import gzip,base64
print('U61B8_PROOF='+base64.b64encode(gzip.compress(json.dumps(out,separators=(',',':'),sort_keys=True).encode(),mtime=0)).decode())
print(json.dumps({'cases':[{'pen':c['pen'],'initial':bool(c['certificate']),'T':c['certificate']['T'] if c['certificate'] else None,'K':c['certificate']['K'] if c['certificate'] else None}for c in initial],'fullTube':[{k:c[k]for k in['pen','strictFullPContained','coverLeaves','unresolvedCount']}for c in compact]},separators=(',',':')))

