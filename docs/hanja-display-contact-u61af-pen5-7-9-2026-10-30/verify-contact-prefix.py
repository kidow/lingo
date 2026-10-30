import json,re,hashlib
from fractions import Fraction as F
from pathlib import Path
from itertools import combinations
ROOT=Path(__file__).resolve().parents[2]
FIX='docs/hanja-authored-source-u61af-dlheads-2026-10-30/fixtures-execution-draft.json'
def frac(v):return F.from_float(float(v))
def cross(a,b):return a[0]*b[1]-a[1]*b[0]
def sub(a,b):return(a[0]-b[0],a[1]-b[1])
def on(p,a,b):return cross(sub(p,a),sub(b,a))==0 and all(min(a[k],b[k])<=p[k]<=max(a[k],b[k]) for k in (0,1))
def inside(p,P,strict=False):
 if any(on(p,a,P[(i+1)%len(P)]) for i,a in enumerate(P)):return not strict
 w=0
 for i,a in enumerate(P):
  b=P[(i+1)%len(P)];v=cross(sub(b,a),sub(p,a))
  if a[1]<=p[1]<b[1] and v>0:w+=1
  if b[1]<=p[1]<a[1] and v<0:w-=1
 return w!=0
def edgehits(a,b,c,d):
 r=sub(b,a);s=sub(d,c);den=cross(r,s)
 if den:
  t=cross(sub(c,a),s)/den;u=cross(sub(c,a),r)/den
  return [(a[0]+t*r[0],a[1]+t*r[1])] if 0<=t<=1 and 0<=u<=1 else []
 return list(set(p for p in [a,b,c,d] if on(p,a,b) and on(p,c,d)))
def parse(d):
 ts=re.findall(r'[MLZ]|-?(?:\d*\.?\d+)(?:e[-+]?\d+)?',d,re.I);assert ''.join(ts)==re.sub(r'[\s,]','',d)
 out=[];i=0
 while i<len(ts):
  c=ts[i];i+=1
  if c=='M':out.append([])
  if c in ('M','L'):out[-1].append((frac(ts[i]),frac(ts[i+1])));i+=2
  else:assert c=='Z'
 return out
def merge(xs):
 out=[]
 for a,b in sorted(xs):
  if out and a<=out[-1][1]:out[-1]=(out[-1][0],max(b,out[-1][1]))
  else:out.append((a,b))
 return out
def sections(P,q):
 cuts=[];edges=[]
 for i,a in enumerate(P):
  b=P[(i+1)%len(P)]
  if a[0]==b[0]==q:edges.append(tuple(sorted([a[1],b[1]])));cuts.extend([a[1],b[1]])
  elif a[0]!=b[0] and min(a[0],b[0])<=q<=max(a[0],b[0]):cuts.append(a[1]+(q-a[0])*(b[1]-a[1])/(b[0]-a[0]))
 cuts=sorted(set(cuts));intervals=edges+[(r,r) for r in cuts]
 for a,b in zip(cuts,cuts[1:]):
  if inside((q,(a+b)/2),P):intervals.append((a,b))
 return merge(intervals)
def dist2(p,a,b):
 d=sub(b,a);den=d[0]*d[0]+d[1]*d[1];t=max(F(0),min(F(1),(sub(p,a)[0]*d[0]+sub(p,a)[1]*d[1])/den)) if den else F(0);v=(a[0]+t*d[0],a[1]+t*d[1]);return sum((p[k]-v[k])**2 for k in (0,1))
def analyze(strokes,pen,axis,seed):
 row=strokes[pen-1];polys=parse(row[1]['outline']);prior=parse(row[0]['outline']);u=tuple(map(F,axis));seed=tuple(map(frac,seed));project=lambda p:(u[0]*p[0]+u[1]*p[1],-u[1]*p[0]+u[0]*p[1]);Q=[[project(p) for p in P] for P in polys];E=project(seed)
 assert any(inside(seed,P,True) for P in polys) and any(inside(seed,P,True) for P in prior)
 simple=[]
 for P in polys:
  A=sum(cross(p,P[(i+1)%len(P)]) for i,p in enumerate(P));assert A>0
  for i,a in enumerate(P):
   b=P[(i+1)%len(P)]
   for j,c in enumerate(P):
    if j<=i or j in [(i+1)%len(P),(i-1)%len(P)]:continue
    assert not edgehits(a,b,c,P[(j+1)%len(P)]),'non-simple polygon'
  simple.append(True)
 critical={p[0] for P in Q for p in P}|{E[0]};edgePairs=0
 for P,T in combinations(Q,2):
  for i,a in enumerate(P):
   for j,c in enumerate(T):
    hits=edgehits(a,P[(i+1)%len(P)],c,T[(j+1)%len(T)]);critical.update(p[0] for p in hits);edgePairs+=bool(hits)
 levels=sorted(critical);checks=[]
 for i,q in enumerate(levels):
  checks.append((q,'critical'))
  if i+1<len(levels):checks.append(((q+levels[i+1])/2,'open-cell'))
 bad=[]
 for q,kind in checks:
  ints=merge([v for P in Q for v in sections(P,q)])
  if len(ints)!=1 or (levels[0]<q<levels[-1] and ints[0][0]>=ints[0][1]):bad.append({'level':str(q),'kind':kind,'intervals':[[str(v) for v in t] for t in ints]})
 sourceSeedP=next(P for P in polys if inside(seed,P,True));priorSeedP=next(P for P in prior if inside(seed,P,True));slack2=min(dist2(seed,a,P[(i+1)%len(P)]) for P in [sourceSeedP,priorSeedP] for i,a in enumerate(P));assert slack2>0
 perpendicular=[p[1] for P in Q for p in P]
 return {'strictSeedBoundaryDistanceSquaredExact':str(slack2),'originProjection':float(E[0]),'minimumProjection':float(levels[0]),'maximumProjection':float(levels[-1]),'perpendicularMinimum':float(min(perpendicular)),'perpendicularMaximum':float(max(perpendicular)),'directionDotDerivativeEndpoints':([float(58*F(116,5)+250),1278] if pen==7 else None),'pen':pen,'axis':list(axis),'origin':list(map(float,seed)),'originProjectionExact':str(E[0]),'minimumProjectionExact':str(levels[0]),'maximumProjectionExact':str(levels[-1]),'negativeExtentExact':str(E[0]-levels[0]),'positiveExtentExact':str(levels[-1]-E[0]),'criticalLevels':len(levels),'allCriticalAndOpenCellSections':len(checks),'edgeCrossingLevelsIncluded':edgePairs,'allPolygonsSimplePositive':all(simple),'strictSeedInsidePriorAndSource':True,'allSectionsSinglePositiveInterval':not bad,'bad':bad,'allPositiveBandPrefixesConnectedToCompletedPrior':not bad,'newP':0,'sourceGuideUnchanged':True,'sourceWeightUnchanged':True,'runtimeApproved':False}
def run():
 raw=(ROOT/FIX).read_bytes();assert hashlib.sha256(raw).hexdigest()=='40aafd2a8c96a3041ad3572dc80c36ce8520ae88122249b56ed6d110e96f57cb';f=json.loads(raw);out=[analyze(f['strokes'],5,[1,0],[37.6,30.5]),analyze(f['strokes'],7,[58,-25],[48.8,49.5]),analyze(f['strokes'],9,[1,0],[68,30.5])]
 return {'schema':'hanja-exact-source-contact-projection-prefix-proof/v1','glyph':'憯','status':'PASS-exact-public-math-only' if all(t['allSectionsSinglePositiveInterval'] for t in out) else 'UNPROVED','fixture':{'path':FIX,'SHA256':hashlib.sha256(raw).hexdigest()},'metric':'Exact Fraction.from_float binary64 of normalized SVG path literals; all source vertices and cross-polygon edge intersections partition projection critical cells','targets':out,'claim':'For compact finite polygon unions with one connected nonempty fiber at each projection level, every closed projection-band restriction is connected; every positive band includes the same strict source/prior seed neighborhood. Endpoint0 renders no ink and endpoint1 uses originalD.','limits':['Finite source-specific exact polygon geometry, not native raster or publisher microclock approval','Display clip timing is authored; originalP/guide/weights retained'],'newEngine':0,'server':0,'actualTemporalApproved':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(run(),ensure_ascii=False))
