from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json
ROOT=Path('/Users/kidow/Documents/dev/kidow/lingo')
FULL='docs/hanja-actual-engine-capture-u8b92-hkcs-2026-10-26/engine-whole-hkcs_m8b92.json';SHA='4ebc488e6effd4d7ea1e7866ab84f0070bad147a4e5282c1cb188e2cf7683cdb'
PURE='docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';PURE_SHA='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
ORIENT=json.loads("[{\"raw\":0,\"call\":0,\"signs\":[1,1]},{\"raw\":1,\"call\":0,\"signs\":[1,1]},{\"raw\":2,\"call\":0,\"signs\":[1,1]},{\"raw\":3,\"call\":0,\"signs\":[1,1]},{\"raw\":5,\"call\":0,\"signs\":[1]},{\"raw\":6,\"call\":0,\"signs\":[1]},{\"raw\":7,\"call\":0,\"signs\":[1,1]},{\"raw\":8,\"call\":0,\"signs\":[1]},{\"raw\":9,\"call\":0,\"signs\":[1,-1,1]},{\"raw\":10,\"call\":0,\"signs\":[1]},{\"raw\":11,\"call\":0,\"signs\":[1,1]},{\"raw\":12,\"call\":0,\"signs\":[1]},{\"raw\":13,\"call\":0,\"signs\":[1]},{\"raw\":14,\"call\":0,\"signs\":[1,1]},{\"raw\":15,\"call\":0,\"signs\":[1]},{\"raw\":16,\"call\":0,\"signs\":[1,1]},{\"raw\":17,\"call\":0,\"signs\":[1,1]},{\"raw\":18,\"call\":0,\"signs\":[1,-1,-1]},{\"raw\":19,\"call\":0,\"signs\":[1,-1,1]},{\"raw\":20,\"call\":0,\"signs\":[1,1,-1]},{\"raw\":20,\"call\":1,\"signs\":[1,1]},{\"raw\":20,\"call\":2,\"signs\":[1,1,-1]},{\"raw\":21,\"call\":0,\"signs\":[1,-1,1]},{\"raw\":22,\"call\":0,\"signs\":[1]},{\"raw\":23,\"call\":0,\"signs\":[1,1]},{\"raw\":24,\"call\":0,\"signs\":[1]},{\"raw\":25,\"call\":0,\"signs\":[1]},{\"raw\":26,\"call\":0,\"signs\":[1,1]},{\"raw\":27,\"call\":0,\"signs\":[1]},{\"raw\":28,\"call\":0,\"signs\":[1]},{\"raw\":29,\"call\":0,\"signs\":[1,-1]},{\"raw\":29,\"call\":1,\"signs\":[1,1]},{\"raw\":29,\"call\":2,\"signs\":[1,1,-1]},{\"raw\":30,\"call\":0,\"signs\":[1,1]}]")
b=(ROOT/FULL).read_bytes();assert hashlib.sha256(b).hexdigest()==SHA
p=(ROOT/PURE).read_bytes();assert hashlib.sha256(p).hexdigest()==PURE_SHA
for node in ast.parse(p).body:
 if isinstance(node,ast.FunctionDef)and node.name in{'vec','det','value','union_row','events'}:exec(compile(ast.Module(body=[node],type_ignores=[]),PURE,'exec'))
# Same nonzero-winding sweep, summed across original closed subpaths rather than independently painted.
def summed_row(ps,y):
 hits=[]
 for poly in ps:
  for a,b in zip(poly,poly[1:]+poly[:1]):
   if(a[1]<=y<b[1])or(b[1]<=y<a[1]):
    slope=(b[0]-a[0])/(b[1]-a[1]);fn=(slope,a[0]-slope*a[1]);hits.append((value(fn,y),1 if b[1]>a[1]else-1,fn))
 hits.sort(key=lambda v:v[0]);w=0;prev=None;k=0;out=[]
 while k<len(hits):
  x=hits[k][0];same=[]
  while k<len(hits)and hits[k][0]==x:same.append(hits[k]);k+=1
  fn=same[0][2];assert all(v[2]==fn for v in same)
  if prev is not None and w!=0 and prev[0]<x:out.append((prev[1],fn))
  w+=sum(v[1]for v in same);prev=(x,fn)
 assert w==0
 return out
full=json.loads(b);rows=[];different=[]
for item in ORIENT:
 raw,j=item['raw'],item['call'];polys=full['trace'][raw][j]['polygons'];assert len(polys)==len(item['signs'])
 ps=[[(F(str(v['x'])),F(str(v['y'])))for v in poly]for poly in polys]
 normalized=[p if sign>0 else[p[0],*reversed(p[1:])]for p,sign in zip(ps,item['signs'])]
 if len(ps)==1:rows.append({'raw':raw+1,'call':j+1,'singleP':True,'same':True});continue
 lo=min(y for p in ps for x,y in p);hi=max(y for p in ps for x,y in p);ys=events(ps,lo,hi);bad=None;cells=0
 for l,h in zip(ys,ys[1:]):
  y=(l+h)/2;ind=union_row(ps,y);joined=summed_row(normalized,y);ends=sorted({value(fn,y)for a,b in ind+joined for fn in[a,b]})
  for a,b in zip(ends,ends[1:]):
   x=(a+b)/2;I=any(value(l,y)<x<value(r,y)for l,r in ind);J=any(value(l,y)<x<value(r,y)for l,r in joined);cells+=1
   assert I or not J
   if I!=J:bad={'witness':[str(x),str(y)],'independent':I,'joined':J,'criticalY':[str(l),str(h)]};break
  if bad:break
 row={'raw':raw+1,'call':j+1,'polygons':len(ps),'criticalOpenSlabs':len(ys)-1,'testedCells':cells,'same':bad is None}
 if bad:row['difference']=bad;different.append([raw+1,j+1])
 rows.append(row)
assert len(rows)==34
out={'schema':'hanja-source-paint-equivalence/v1','date':'2026-10-26','glyph':'讒','source':{'path':FULL,'SHA256':SHA},'purePredicates':{'path':PURE,'SHA256':PURE_SHA,'oldTargetLoopsExecuted':False},'coordinates':'original200; uniform/2 and per-path reversal preserve the nonzero regions','normalizerOrientationsFromActualJS':ORIENT,'callsChecked':len(rows),'originalPolygons':63,'rows':rows,'differentRawCalls':different,'independentAndJoinedEquivalent':not different,'engine':0,'projection':0,'newGeometry':False,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(out,separators=(',',':')))
