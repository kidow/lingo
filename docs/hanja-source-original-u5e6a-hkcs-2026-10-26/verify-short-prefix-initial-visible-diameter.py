from pathlib import Path
from fractions import Fraction as F
import json,hashlib,re
R=Path(__file__).resolve().parents[2]
P=R/'docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json';b=P.read_bytes();assert hashlib.sha256(b).hexdigest()=='9a4f42f0206be94e4905f2a177caef251dbce5f0d7073772a52a7d47f84eace8'
f=json.loads(b)['hkcs_m5e6a']
C=R/'docs/hanja-source-original-u5e6a-hkcs-2026-10-26/short-hook-closed-prefix-proof.json';cb=C.read_bytes();assert hashlib.sha256(cb).hexdigest()=='d65d2103435d0f214299e6dc7ba244800002a6c476fa5a642aa99dfa0f0863eb'
closed=json.loads(cb)
def ps(outline):
 result=[]
 for p in re.findall(r'M([^Z]+)Z',outline):
  v=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',p)];assert len(v)%2==0;result.append(list(zip(v[::2],v[1::2])))
 return result
def val(fn,x):return fn[0]*x+fn[1]
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
rows=[]
for pen,mask in[(2,3),(13,2)]:
 current=ps(f['strokes'][pen-1][mask-1]['outline']);sourceMin=min(x for p in current for x,y in p);maximum=max(x for p in current for x,y in p);tips=[(pi,i,v)for pi,p in enumerate(current)for i,v in enumerate(p)if v[0]==maximum];assert len(tips)==1
 pi,i,tip=tips[0];poly=current[pi];neighbors=[poly[(i-1)%len(poly)],poly[(i+1)%len(poly)]];assert all(v[0]<maximum for v in neighbors)
 certificate=next(r for r in closed['results']if r['pen']==pen);a,b=map(F,certificate['priorContact']['lastSourceXSlab']);assert b==maximum and a>=max(x for p in current for x,y in p if x<maximum)
 functions=[]
 for n in neighbors:
  slope=(n[1]-tip[1])/(n[0]-tip[0]);functions.append((slope,tip[1]-slope*maximum))
 mid=(a+b)/2;lower,upper=sorted(functions,key=lambda fn:val(fn,mid));overlaps=certificate['priorContact']['overlapIntervals'];assert len(overlaps)==1
 L=tuple(map(F,overlaps[0]['lower']));U=tuple(map(F,overlaps[0]['upper']))
 for x in[a,b]:assert val(lower,x)<=val(L,x)<=val(U,x)<=val(upper,x)
 pieces=[]
 for label,l,u in [('belowPrior',lower,L),('abovePrior',U,upper)]:
  if val(u,mid)>val(l,mid):
   assert all(val(u,x)>=val(l,x)for x in[a,b]);assert val(l,b)==val(u,b)==tip[1];pieces.append(dict(label=label,lower=l,upper=u))
 if pieces:
  deviations=[F(0)]+[-fn[0]for p in pieces for fn in[p['lower'],p['upper']]];heightCoefficient=max(deviations)-min(deviations);diameter2=1+heightCoefficient**2
 else:heightCoefficient=F(0);diameter2=F(0)
 rows.append(dict(pen=pen,mask=mask,uniqueSourceMaximum=tip,sourceMaximumOccurrenceCount=1,neighborVertices=neighbors,otherSubpathMaximumX=[max(x for x,y in p)for j,p in enumerate(current)if j!=pi],sourceXRange=[sourceMin,maximum],reusedLastExactArrangementSlab=[a,b],actualSourcePrefixSection=[lower,upper],originalPriorIntersectionSection=[L,U],sourceOutsideCompletedPriorPieces=pieces,positiveAuthorProgressRange=[0,(b-a)/(maximum-sourceMin)],epsilonDefinition='originalMaxX-h = (maxX-minX)*authorProgress',outsidePriorYSpanCoefficient=heightCoefficient,outsidePriorDiameterSquaredUpperBoundCoefficient=diameter2,inequality='diam(new source P intersect x>=h minus completed prior P)^2 <= coefficient*epsilon^2 ->0'if pieces else'New source P intersect x>=h is already inside completed prior P throughout this initial range; outside-prior visible set is empty.',finiteHeightOutsidePriorAtZero=False,wholeRectangleNotUsedAsVisibleGeometry=True,sourcePAndQUnchanged=True))
print(json.dumps(enc(dict(results=rows))))
