"""庾 신규 두 원Q 초기조건·원P 전체 덮음 및 실제 prior 접촉 증명. 엔진/정규화 없음."""
from pathlib import Path
from fractions import Fraction as F
import json,re,hashlib,sys
BASE=Path(__file__).resolve().parents[2]
REL='docs/hanja-source-original-u5ebe-ue0102-2026-10-25/'
FIX=REL+'fixtures.json'
def digest(b):return hashlib.sha256(b).hexdigest()
fixture=json.loads((BASE/FIX).read_text())['u5ebe_ue0102']
def point(v):return tuple(map(F,v))
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def area(p):return sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(p,p[1:]+p[:1]))/2
def contains(t,q):return all(cross(t[i],t[(i+1)%3],q)>=0 for i in range(3))
def ears(original):
 p=list(original);p=p if area(p)>0 else p[::-1];ids=list(range(len(p)));out=[]
 while len(ids)>3:
  found=False
  for j,i in enumerate(ids):
   ia,ib=ids[j-1],ids[(j+1)%len(ids)];t=(p[ia],p[i],p[ib]);turn=cross(*t)
   if turn==0 and all(min(p[ia][k],p[ib][k])<=p[i][k]<=max(p[ia][k],p[ib][k])for k in [0,1]):ids.pop(j);found=True;break
   if turn<=0 or any(contains(t,p[k])for k in ids if k not in [ia,i,ib]):continue
   out.append(t);ids.pop(j);found=True;break
  assert found,'simple original polygon required'
 t=tuple(p[k]for k in ids);assert cross(*t)>0;out.append(t);assert sum(area(list(t))for t in out)==abs(area(original));return out
def polys(s):
 out=[]
 for part in s.split(' Z'):
  if not part.strip():continue
  nums=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',part)));out.append([tuple(nums[i:i+2])for i in range(0,len(nums),2)])
 return out
def qpoint(n,t):return tuple((1-t)**2*n[j]+2*t*(1-t)*n[j+2]+t*t*n[j+4]for j in [0,1])
def split(t):
 k=max(range(3),key=lambda i:sum((t[i][j]-t[(i+1)%3][j])**2 for j in [0,1]));a,b,c=t[k],t[(k+1)%3],t[(k+2)%3];mid=tuple((a[j]+b[j])/2 for j in [0,1]);return(a,mid,c),(mid,b,c)
def initial(p,m,s):
 n=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])));assert len(n)==6
 u=[n[i+2]-n[i]for i in [0,1]];v=[n[i+4]-2*n[i+2]+n[i]for i in [0,1]];vv=sum(x*x for x in v);cr=u[0]*v[1]-u[1]*v[0]
 for T in [F(1,4),F(1,2),F(3,4),F(1)]:
  at=max(F(0),min(T,-sum(u[i]*v[i]for i in [0,1])/vv))if vv else F(0)
  lam=sum((u[i]+at*v[i])**2 for i in [0,1]);chord=sum((2*T*u[i]+T*T*v[i])**2 for i in [0,1])-49
  for K in [F(1,40),F(1,30),F(1,20),F(1,15),F(1,12),F(1,10)]:
   cur=4*K*K*lam**3-cr*cr;cos=1-(7*K)**2/2;axis=next((i for i in [0,1]if u[i]*(u[i]+T*v[i])>0),None)
   if chord>0 and cur>0 and cos-7*K>0 and axis is not None:
    return dict(pen=p,mask=m,guide=s['revealPath'],syntax='MQ',width=14,radius=7,weight=s['weight'],initialArcMax=7,initialSufficientConditions=True,notRasterProof=True,PIntersectionConnectivityNotProved=True,notFullSweepProof=True,firstLegLength=None,newSourceCondition=True,maskSHA256=digest(json.dumps(s,separators=(',',':')).encode()),priorMaskContactClaimed=p==3,initialKind='single-quadratic',T=str(T),K=str(K),u=list(map(str,u)),v=list(map(str,v)),lambdaAt=str(at),cross=str(cr),chordSquaredMinusRadiusSquared=str(chord),curvatureMargin=str(cur),cosLower=str(cos),cosMinusRK=str(cos-7*K),strictAxis='xy'[axis],**{'lambda':str(lam)})
 raise AssertionError('initial sufficient conditions HOLD')
def coverage(p,m,s,stored=None):
 n=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])));triangles=[ears(poly)for poly in polys(s['outline'])];leaves=[];old={x['route']:x for x in stored['coverLeaves']}if stored else{}
 centers=[(F(i,128),qpoint(n,F(i,128)))for i in range(129)]
 def cover(t,route):
  if stored:
   if route in old:
    leaf=old[route];center=qpoint(n,F(leaf['centerT']));margin=49-max(sum((v[j]-center[j])**2 for j in [0,1])for v in t);assert margin==F(leaf['radiusSquaredMargin'])>0;leaves.append(leaf);return
  else:
   z,center=min(centers,key=lambda item:max(sum((v[j]-item[1][j])**2 for j in [0,1])for v in t))
   margin=49-max(sum((v[j]-center[j])**2 for j in [0,1])for v in t)
   if margin>0:leaves.append(dict(route=route,centerT=str(z),radiusSquaredMargin=str(margin)));return
  assert len(route.split(':')[-1])<14,'full Q7 coverage HOLD'
  a,b=split(t);cover(a,route+'0');cover(b,route+'1')
 for pi,ts in enumerate(triangles):
  for ti,t in enumerate(ts):cover(t,f'{pi}:{ti}:')
 result=dict(pen=p,mask=m,originalTriangles=[[[list(map(str,v))for v in t]for t in ts]for ts in triangles],coverLeaves=leaves,strictFullPContained=True,unresolved=[])
 if stored:assert result==stored
 return result
def connection(p,m,s):
 ps=polys(s['outline']);edges=[];seen={0}
 for i,a in enumerate(ps):
  for j,b in enumerate(ps):
   shared=set(a)&set(b)
   if i<j and shared:edges.append(dict(subpaths=[i+1,j+1],closedIntersectionWitness=list(map(str,sorted(shared)[0]))))
 for _ in ps:
  for e in edges:
   ids={x-1 for x in e['subpaths']}
   if seen&ids:seen|=ids
 assert len(seen)==len(ps)
 return dict(pen=p,mask=m,edges=edges,closedFilledPConnected=True)
def prior_contact():
 own=polys(fixture['strokes'][2][1]['outline']);prior=polys(fixture['strokes'][2][0]['outline']);box=[point(v)for v in [('16.75','51'),('17.25','51'),('17.25','51.25'),('16.75','51.25')]]
 # The source polygons are nonconvex; the whole witness rectangle lies in
 # both one triangle per source, established by convexity, not corner-only union.
 witnesses=[]
 for ps in [own,prior]:
  found=next((t for poly in ps for t in ears(poly)if all(contains(t,v)for v in box)),None)
  if found is None:
   # split the rectangle on its fixed diagonal; each triangle has one containing source triangle
   founds=[]
   for part in [(box[0],box[1],box[2]),(box[0],box[2],box[3])]:
    t=next((t for poly in ps for t in ears(poly)if all(contains(t,v)for v in part)),None)
    assert t is not None,'strict actual prior witness HOLD';founds.append(t)
   witnesses.append([[[str(x)for x in v]for v in t]for t in founds])
  else:witnesses.append([[[str(x)for x in v]for v in found]])
 return dict(pen=3,mask=2,priorPen=3,priorMask=1,priorDirection='down',q0=['17','51'],closedCommonRectangle=[list(map(str,v))for v in box],convexSourceWitnessTriangles=witnesses,delta='min(rho,1)/4',growingContactRectangle='[17-delta,17+delta] x [51,51+delta]',strictPositiveArea='2*delta^2 > 0 for rho > 0',diskMargin='rho^2-2*delta^2 > 0',requiresActualCompletedOriginalPrior=True,newBridge=False,allPositiveRhoContact=True)
def proof(stored=None):
 targets=[(3,2),(4,1)];s=[fixture['strokes'][p-1][m-1]for p,m in targets]
 for seg in s:assert seg['direction']=='curve'and seg['revealWidth']==14 and re.fullmatch(r'M[-\d. ]+Q[-\d. ]+',seg['revealPath'])
 return dict(schema='hanja-source-initial-caps-proof/v1',glyph='庾',root='u5ebe-ue0102',fixture=FIX,fixtureSHA256=digest((BASE/FIX).read_bytes()),geometrySHA256=digest(json.dumps(fixture['strokes'],separators=(',',':')).encode()),sourceProofFormat='actual-full5',initialCertificates=[initial(p,m,seg)for(p,m),seg in zip(targets,s)],fullQCoverageCertificates=[coverage(p,m,seg,stored['fullQCoverageCertificates'][i]if stored else None)for i,((p,m),seg)in enumerate(zip(targets,s))],originalPConnectivity=[connection(p,m,seg)for(p,m),seg in zip(targets,s)],priorContact=prior_contact(),fullQtubeCoverageProved=True,boundaryZeroLimit={'rho':'min(7,L*p)','areaUpperBound':'14*d + 2*pi*d^2','limit':0,'zeroIsExplicitEmpty':True},sourcePGuideWidthWeightChanged=False,allTimeGrowingPConnectivityProved=False,nativeApproval=False,runtimeApplied=False,productionImportAllowed=False,sourceEngineReplay=0,sourceProjection=0,pen6Attribution='own6 H; completed5 V unchanged, no ownership reassignment')
if '--check' in sys.argv:
 stored=json.loads((BASE/REL/'initial-caps-proof.json').read_text());assert proof(stored)==stored
 print('庾 신규2Q 정확 초기조건·전체 원P·prior3V 접촉증명 PASS')
else:print(json.dumps(proof(),ensure_ascii=False,indent=2))
