from pathlib import Path
from fractions import Fraction as F
import json,hashlib,ast
ROOT=Path('/Users/kidow/Documents/dev/kidow/lingo')
FULL='docs/hanja-actual-engine-capture-u6fe9-hkcs-m-2026-10-25/engine-whole-hkcs_m6fe9.json'
b=(ROOT/FULL).read_bytes();assert hashlib.sha256(b).hexdigest()=='fe2644ffc692b3eb4133fb4f9a9a26bd1d6f92da46eea97488991ab4fe4b7456'
f=json.loads(b);groups=[[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in g['polygons']]for g in f['groups'][2:6]]
predicate=ROOT/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-p3-attached-frontier.py'
raw=predicate.read_bytes();assert hashlib.sha256(raw).hexdigest()=='b31d4fcdd87f1b29e2b4186b220daeb0ed40f1d5f6389991bc64456447e6ff80'
for node in ast.parse(raw.decode()).body:
 if isinstance(node,ast.FunctionDef)and node.name in {'cross','signed_area','triangle_contains','winding','edge_hits_triangle_interior'}:exec(compile(ast.Module(body=[node],type_ignores=[]),str(predicate),'exec'))
bands=ROOT/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py'
raw=bands.read_bytes();assert hashlib.sha256(raw).hexdigest()=='2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76'
for node in ast.parse(raw.decode()).body:
 if isinstance(node,ast.FunctionDef)and node.name in {'vec','det','value','union_row','events','certify'}:exec(compile(ast.Module(body=[node],type_ignores=[]),str(bands),'exec'))
foot=groups[0];body=groups[1]+groups[2];rising=groups[3];nonfoot=body+rising
cut=F('72.5');bottom=F('93.45');riseBottom=F('72.85');top=F('26.85')
result={}
for key,ps,lo,hi in [('body',body,cut,bottom),('riseInitial',rising,cut,riseBottom),('upper',nonfoot,top,cut)]:
 try:result[key]=certify(ps,lo,hi,key)
 except AssertionError as e:result[key]={'error':str(e)}
rect=[(F(17),cut),(F(18),cut),(F(18),F('72.6')),(F(17),F('72.6'))]
result['rectangleInsideFoot1']=[winding(p,foot[1])!=0 for p in rect]
result['rectangleInsideBody4P0']=[winding(p,groups[1][0])!=0 for p in rect]
tip=rising[1][2];result['tip']=[str(v)for v in tip];result['tipInsideBody4P0']=winding(tip,groups[1][0])!=0
print(json.dumps(result,separators=(',',':')))
