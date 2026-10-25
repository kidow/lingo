from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json
ROOT=Path('/Users/kidow/Documents/dev/kidow/lingo')
FULL='docs/hanja-actual-engine-capture-u8b92-hkcs-2026-10-26/engine-whole-hkcs_m8b92.json'
FULL_SHA='4ebc488e6effd4d7ea1e7866ab84f0070bad147a4e5282c1cb188e2cf7683cdb'
PURE='docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py'
PURE_SHA='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
b=(ROOT/FULL).read_bytes();assert hashlib.sha256(b).hexdigest()==FULL_SHA
p=(ROOT/PURE).read_bytes();assert hashlib.sha256(p).hexdigest()==PURE_SHA
names={'vec','det','value','union_row','events'};loaded=set()
for node in ast.parse(p).body:
 if isinstance(node,ast.FunctionDef)and node.name in names:
  exec(compile(ast.Module(body=[node],type_ignores=[]),PURE,'exec'));loaded.add(node.name)
assert loaded==names
full=json.loads(b);assert len(full['groups'])==len(full['trace'])==31
assert full['groups'][4]=={'raw':[0]+[None]*10,'polygons':[]}and full['trace'][4]==[]
groups=[]
for i,g in enumerate(full['groups']):
 if g['raw'][0]==0:continue
 assert g['polygons']
 ps=[]
 for poly in g['polygons']:
  assert all(v['off']==0 for v in poly)
  ps.append([(F(str(v['x'])),F(str(v['y'])))for v in poly])
 groups.append((i+1,ps))
assert len(groups)==30
# The pinned static viewer paints each original polygon as an independent path.
# Use its nonzero fill, then union per raw. No triangulation/simple-polygon assumption.
def bounds(ps):
 points=[v for p in ps for v in p]
 return min(v[0]for v in points),min(v[1]for v in points),max(v[0]for v in points),max(v[1]for v in points)
def contact(A,B):
 a,b=bounds(A),bounds(B);lo=max(a[1],b[1]);hi=min(a[3],b[3])
 if lo>=hi or max(a[0],b[0])>=min(a[2],b[2]):return [False,0,None,None,None,None]
 ys=events(A+B,lo,hi);tested=0
 for l,h in zip(ys,ys[1:]):
  m=(l+h)/2;tested+=1
  for al,ar in union_row(A,m):
   for bl,br in union_row(B,m):
    left=max(value(al,m),value(bl,m));right=min(value(ar,m),value(br,m))
    if left>=right:continue
    y1=(3*l+h)/4;y2=(l+3*h)/4
    widths=[min(value(ar,y),value(br,y))-max(value(al,y),value(bl,y))for y in[y1,y2]]
    assert min(widths)>0
    area=min(widths)*(h-l)/2;assert area>0
    return [True,tested,str((left+right)/2),str(m),str(area),[str(l),str(h)]]
 return [False,tested,None,None,None,None]
rows=[[i,j]+contact(A,B)for(i,A),(j,B)in zip(groups,groups[1:])]
positives=[[r[0],r[1]]for r in rows if r[2]]
assert len(rows)==29
out={'schema':'hanja-adjacent-original-P-contact/v1','date':'2026-10-26','glyph':'讒','source':{'path':FULL,'SHA256':FULL_SHA},'purePredicates':{'path':PURE,'SHA256':PURE_SHA,'ASTFunctionsOnly':sorted(names),'oldTargetLoopsExecuted':False},'coordinates':'original200','paint':'independent original paths, nonzero per path, union per raw','drawingRows':30,'metadataRaw5Preserved':True,'requiredJoinsFor24':6,'columns':['rawA','rawB','positiveArea','slabsTested','witnessX','witnessY','areaLowerBound','criticalYSlab'],'rows':rows,'positivePairs':positives,'positiveCount':len(positives),'limits':['Contact is necessary evidence only; not logical grouping or original24 boundary approval.','Every negative result exhausts the exact vertex/edge-intersection arrangement; point/edge-only touching is not positive area.','No original P/Q/width is edited and no new geometry is manufactured.'],'engine':0,'projection':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(out,separators=(',',':')))
