from pathlib import Path
from fractions import Fraction as F
import json,ast,hashlib,re
R=Path(__file__).resolve().parents[2]
assert hashlib.sha256((R/"docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json").read_bytes()).hexdigest()=="9a4f42f0206be94e4905f2a177caef251dbce5f0d7073772a52a7d47f84eace8"
f=json.loads((R/'docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json').read_bytes())['hkcs_m5e6a']
T=R/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';assert hashlib.sha256(T.read_bytes()).hexdigest()=="2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76"
for n in ast.parse(T.read_text()).body:
 if isinstance(n,ast.FunctionDef) and n.name in {'vec','det','value','union_row','events'}:exec(compile(ast.Module(body=[n],type_ignores=[]),str(T),'exec'))
M=R/'docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py';assert hashlib.sha256(M.read_bytes()).hexdigest()=="91670b2c888fd7cd691e4a19c9e43a498b0b964695ba2a7c975ab46bb958926e";ns={}
exec(compile(ast.Module(body=[n for n in ast.parse(M.read_text()).body if isinstance(n,(ast.Import,ast.ImportFrom,ast.FunctionDef))],type_ignores=[]),str(M),'exec'),ns)
polys,cross=ns['polys'],ns['cross']

def merge_values(xs):
 out=[]
 for a,b in sorted(xs):
  if out and a<=out[-1][1]:out[-1]=(out[-1][0],max(out[-1][1],b))
  else:out.append((a,b))
 return out
def in_closed(p,poly):
 w=0;x,y=p
 for a,b in zip(poly,poly[1:]+poly[:1]):
  c=det(vec(b,a),vec(p,a))
  if c==0 and min(a[0],b[0])<=x<=max(a[0],b[0]) and min(a[1],b[1])<=y<=max(a[1],b[1]):return True
  if a[1]<=y<b[1]and c>0:w+=1
  elif b[1]<=y<a[1]and c<0:w-=1
 return w!=0
def closed_row(ps,y):
 out=[]
 for poly in ps:
  xs=set();horizontal=[]
  for a,b in zip(poly,poly[1:]+poly[:1]):
   if a[1]==b[1]:
    if y==a[1]:xs.update([a[0],b[0]]);horizontal.append(tuple(sorted([a[0],b[0]])))
   elif min(a[1],b[1])<=y<=max(a[1],b[1]):xs.add(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]))
  xx=sorted(xs);out.extend(horizontal);out.extend((x,x)for x in xx)
  out.extend((a,b)for a,b in zip(xx,xx[1:])if in_closed(((a+b)/2,y),poly))
 return merge_values(out)
def encode(x):
 if isinstance(x,F):return str(x)
 if isinstance(x,(tuple,list)):return[encode(v)for v in x]
 if isinstance(x,dict):return{k:encode(v)for k,v in x.items()}
 return x
rows=[]
for pen,mask in[(2,3),(13,2)]:
 ss=f['strokes'][pen-1];s=ss[mask-1];prev=ss[mask-2]
 P=[[(y,x)for x,y in p]for p in polys(s['outline'])];prior=[[(y,x)for x,y in p]for p in polys(prev['outline'])]
 lo=min(y for p in P for x,y in p);hi=max(y for p in P for x,y in p);ev=events(P,lo,hi);openRows=[union_row(P,(a+b)/2)for a,b in zip(ev,ev[1:])];assert all(len(r)==1 for r in openRows)
 closed=[]
 for i,y in enumerate(ev):
  actual=closed_row(P,y);assert len(actual)==1
  limits=[]
  if i>0:limits.append(merge_values([(value(a,y),value(b,y))for a,b in openRows[i-1]]))
  if i<len(openRows):limits.append(merge_values([(value(a,y),value(b,y))for a,b in openRows[i]]))
  assert merge_values([z for side in limits for z in side])==actual
  closed.append(dict(sourceX=y,closed=actual,adjacentLimits=limits,unionEqualsClosed=True,eachSideEqualsClosed=all(z==actual for z in limits)))
 # The exact combined arrangement freezes every ordering branch in the final x slab.
 cev=events(P+prior,lo,hi);a,b=cev[-2:];assert b==hi;y=(a+b)/2
 intervals=[]
 for l,r in union_row(P,y):
  for v,w in union_row(prior,y):
   L=max([l,v],key=lambda z:value(z,y));R=min([r,w],key=lambda z:value(z,y));W=(R[0]-L[0],R[1]-L[1]);wa=value(W,a);wb=value(W,b)
   if value(W,y)>0:
    assert wa>=0 and wb>=0 and wa+wb>0
    intervals.append(dict(lower=L,upper=R,widthAffine=W,widthAtStart=wa,widthAtOriginalMax=wb))
 assert intervals
 height=max(x for p in P for x,y in p)-min(x for p in P for x,y in p)
 rows.append(dict(pen=pen,mask=mask,sourceXRange=[lo,hi],currentOriginalP=len(P),priorOriginalP=len(prior),closedCriticalEvents=closed,openSlabs=len(openRows),allCriticalClosedExactlyUnionOfAdjacentLimits=True,conditionalPrefix=dict(mask='original x>=h',domain=[lo,hi],hiddenAtOriginalMaxRequired=True,fullOriginalPAtMin=True,connectedClosedSections=True,noNewInk=True,newAreaUpperBoundHeight=height,newAreaUpperBound='originalHeight*(maxX-h) -> 0'),priorContact=dict(lastSourceXSlab=[a,b],overlapIntervals=intervals,allSmallPositivePrefixesContact=True,areaLowerBound='For c=max(h,lastSlabStart), integral_c^maxX widthAffine(x) dx = (width(c)+width(maxX))*(maxX-c)/2 >0. This is inside unchanged completed prior and new prefix.',priorMustBeExactCompletedOpaque=True),sourceGuideUnchanged=True,sourceClockApproved=False,nativeApproval=False,runtimeApplied=False))
print(json.dumps(encode(dict(results=rows))))
