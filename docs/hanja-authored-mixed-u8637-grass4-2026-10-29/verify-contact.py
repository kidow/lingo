import json,re,hashlib
from pathlib import Path
from fractions import Fraction as F
b=Path('/Users/kidow/Documents/dev/kidow/lingo');p='docs/hanja-authored-donor-u5b7d-u5341-mm-2026-10-28/donor-source-record.json';raw=(b/p).read_bytes();assert hashlib.sha256(raw).hexdigest()=='ef9a8cc552dde368f0b7cfaf00960f994b9c05a9b42742ec26d18ffe89071336';x=json.loads(raw);assert x['schema']=='hanja-fixed-MM-exact-original-donor/v1';r=x['record'];assert r['character']=='十'and len(r['strokes'])==len(r['medians'])==2
def N(q):return[F(str(q[0]))/5,(900-F(str(q[1])))/5]
def A(M,q):a,b,c,d,e,f=M;return[a*q[0]+c*q[1]+e,b*q[0]+d*q[1]+f]
def matrix(role,target):
 s,e=map(N,[r['medians'][0 if role=='H'else 1][0],r['medians'][0 if role=='H'else 1][-1]]);v,w=target
 if role=='H':
  d=F(14)/F(176,5);a=(w[0]-v[0])/(e[0]-s[0]);c=F(0);b=((w[1]-v[1])-d*(e[1]-s[1]))/(e[0]-s[0])
 else:
  a=F(15)/F(139,5);b=F(0);d=(w[1]-v[1])/(e[1]-s[1]);c=((w[0]-v[0])-a*(e[0]-s[0]))/(e[1]-s[1])
 M=[a,b,c,d,v[0]-a*s[0]-c*s[1],v[1]-b*s[0]-d*s[1]];assert a*d-b*c>0 and A(M,s)==v and A(M,e)==w;return M
def controls(d):
 ts=re.findall(r'[MLQCZ]|[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',d);assert ''.join(ts)==re.sub(r'[\s,]','',d);i=0;out=[]
 while i<len(ts):
  command=ts[i];i+=1;n={'M':2,'L':2,'Q':4,'C':6,'Z':0}[command]
  for j in range(0,n,2):out.append([F(ts[i+j]),F(ts[i+j+1])])
  i+=n
 return out

placements=[];allpoints=[]
for name,role,targets in [('leftH','H',[[F(13),F('27.475')],[F(93),F('27.475')]]),('leftV','V',[[F(72),F('13.825')],[F(72),F('40.6')]]),('rightH','H',[[F(107),F('27.475')],[F(187),F('27.475')]]),('rightV','V',[[F(128),F('13.825')],[F(128),F('40.6')]])]:
 M=matrix(role,targets);placements.append(M);allpoints.append([A(M,N(q))for q in controls(r['strokes'][0 if role=='H'else 1])])
def curves(d,M):
 ts=re.findall(r'[MLQCZ]|[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',d);i=0;out=[];current=None;first=None
 while i<len(ts):
  c=ts[i];i+=1;n={'M':2,'L':2,'Q':4,'C':6,'Z':0}[c];ps=[A(M,N([F(ts[i+j]),F(ts[i+j+1])]))for j in range(0,n,2)];i+=n
  if c=='M':current=ps[0];first=current
  elif c=='Z':out.append([current,first]);current=first
  else:out.append([current]+ps);current=ps[-1]
 return out
def mid(a,b):return[(a[0]+b[0])/2,(a[1]+b[1])/2]
def split(q):
 left=[q[0]];right=[q[-1]]
 while len(q)>1:q=[mid(a,b)for a,b in zip(q,q[1:])];left.append(q[0]);right.append(q[-1])
 return left,list(reversed(right))
def inside(cs,p):
 stack=[(q,0)for q in cs];w=0;nodes=0
 while stack:
  q,depth=stack.pop();nodes+=1;ys=[v[1]for v in q];xs=[v[0]for v in q]
  if min(ys)>p[1]or max(ys)<p[1]or max(xs)<p[0]:continue
  mono=all(a<=b for a,b in zip(ys,ys[1:]))or all(a>=b for a,b in zip(ys,ys[1:]));cross=(q[0][1]<=p[1]<q[-1][1])or(q[-1][1]<=p[1]<q[0][1])
  if mono and not cross:continue
  if mono and min(xs)>p[0]:w+=1 if q[-1][1]>q[0][1]else -1;continue
  assert depth<40 and nodes<10000,'unproved ray crossing';stack.extend((half,depth+1)for half in split(q))
 return w,nodes

def boundary_clear(cs,p):
 stack=[(q,0)for q in cs];lower=None;nodes=0
 while stack:
  q,depth=stack.pop();nodes+=1;xs=[v[0]for v in q];ys=[v[1]for v in q];dx=max(F(0),min(xs)-p[0],p[0]-max(xs));dy=max(F(0),min(ys)-p[1],p[1]-max(ys));sq=dx*dx+dy*dy
  if sq>0:lower=sq if lower is None else min(lower,sq);continue
  assert depth<40 and nodes<10000,'unproved strict boundary clearance';stack.extend((half,depth+1)for half in split(q))
 return lower,nodes

checks=[]
for side,xv,hi,vi in [('left',F(72),0,1),('right',F(128),2,3)]:
 p=[xv,F('27.475')];h=inside(curves(r['strokes'][0],placements[hi]),p);v=inside(curves(r['strokes'][1],placements[vi]),p);assert h[0]!=0 and v[0]!=0;checks.append(dict(side=side,witness=list(map(str,p)),HNonzeroWinding=h[0],VNonzeroWinding=v[0],exactRationalBezierRayClassification=True,subdivisionNodes=[h[1],v[1]],boundaryContactOnly=False,HBoundaryDistanceSquaredLower=str(boundary_clear(curves(r['strokes'][0],placements[hi]),p)[0]),VBoundaryDistanceSquaredLower=str(boundary_clear(curves(r['strokes'][1],placements[vi]),p)[0])))
bodyraw=(b/'docs/hanja-goal-glyphwiki-batch486-2026-10-10/engine-proof.json').read_bytes();assert hashlib.sha256(bodyraw).hexdigest()=='75ef83fd8b4594fc4f0d7e9c47bffb32aea50542a93dfcecb62c7badeb710ffd';source=json.loads(bodyraw,parse_float=str);bodyChecks=[]
for pi,pts in enumerate(allpoints):
 bb=[min(v[0]for v in pts),min(v[1]for v in pts),max(v[0]for v in pts),max(v[1]for v in pts)]
 for rawno,g in enumerate(source['groups'][3:],4):
  for pidx,poly in enumerate(g['polygons'],1):
   ps=[[F(str(v['x']))+(-4 if rawno==18 else 0),F(str(v['y']))]for v in poly];b2=[min(v[0]for v in ps),min(v[1]for v in ps),max(v[0]for v in ps),max(v[1]for v in ps)];dis=bb[2]<b2[0]or b2[2]<bb[0]or bb[3]<b2[1]or b2[3]<bb[1];assert dis,'unproved bodyP contact';bodyChecks.append(dict(grassSlot=pi+1,bodyRaw=rawno,bodyP=pidx,strictControlHullAABBDisjoint=True))
print(json.dumps(dict(ownHVPositiveInteriorWitnesses=checks,grassToBodyChecks=len(bodyChecks),allGrassBodyPairsStrictSeparated=True,filledOriginalDOrPChanged=False,method='Exact rational originalBezier control hull subdivision classifies nonzero winding for strict interior witnesses; exact affine control-hull AABBs disjoint from every retained body polygon. No flattening or private coordinates.',nativeApproval=False)))
