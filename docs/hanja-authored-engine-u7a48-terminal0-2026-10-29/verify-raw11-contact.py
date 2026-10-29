import ast,json,hashlib
from pathlib import Path
from fractions import Fraction as F
B=Path(__file__).resolve().parents[2]
HELPER='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py'
assert hashlib.sha256((B/HELPER).read_bytes()).hexdigest()=='945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea'
tree=ast.parse((B/HELPER).read_text());exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)],type_ignores=[]),HELPER,'exec'))
fpath="docs/hanja-authored-engine-u7a48-terminal0-2026-10-29/engine-authored-terminal0.json";assert hashlib.sha256((B/fpath).read_bytes()).hexdigest()=='c6b7ea8b88b0db58bd7268a22807724fd4410167b49337f6ca340e721578e148'
f=json.loads((B/fpath).read_text());calls=f['trace'][10];assert [c['kind']for c in calls]==['cdDrawLine','cdDrawCurve','cdDrawLine'];assert calls[2]['args']==[166,100,180,100,2006,2000]
polys=[[clean([(F(str(p['x'])),F(str(p['y'])))for p in poly])for poly in c['polygons']]for c in calls];assert all(simple(p)for row in polys for p in row)
result=[]
for a,b in [(0,1),(1,2)]:
 cells=[]
 for p in polys[a]:
  for q in polys[b]:
   for t in ears(p):
    for u in ears(q):
     c=clip(t,u);ar=abs(area2(c))/2
     if ar:cells.append((ar,c))
 assert cells
 ar,cell=max(cells,key=lambda x:x[0]);seed=tuple(sum(p[i]for p in cell)/len(cell)for i in[0,1]);assert any(relation(seed,p)==1for p in polys[a])and any(relation(seed,p)==1for p in polys[b]);result.append(dict(priorMask=a+1,nextMask=b+1,positiveIntersectionExists=True,sumPositiveEarCellAreas200=str(sum(x[0]for x in cells)),sumIsNotUnionAreaClaim=True,strictCommonSeed200=list(map(str,seed))))
args=[c['args']for c in calls];assert args[0][2:4]==args[1][0:2]and args[1][4:6]==args[2][0:2]
print(json.dumps(dict(schema='hanja-public-authored-primitive-contact-check/v1',glyph='穈',sourceRawOneBased=11,primitiveP=list(map(len,polys)),sourceCallKinds=[c['kind']for c in calls],sourceGuideEndpointsExactlyContinuous=True,adjacentContact=result,normalization='source200; finalexecutiondividesonce',scope='Existing primitive boundaries only. Early reveal growth/native approval not inferred from contact.',sourcePOrGuideChanged=False,nativeApproval=False,runtimeApplied=False)))
