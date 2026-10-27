from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2];P=R/'docs/hanja-source-original-u995b-local-2026-10-27/source-point15-anchor-conditions.json';p=json.loads(P.read_text())
for path,h in p['inputSHA256'].items():assert hashlib.sha256((R/path).read_bytes()).hexdigest()==h
helper=R/'docs/hanja-component-capture-u995b-2026-10-27/verify-compound-contact-facts.py';env={'F':F}
for node in ast.parse(helper.read_text()).body:
 if isinstance(node,ast.FunctionDef):exec(compile(ast.Module(body=[node],type_ignores=[]),str(helper)+'::functions-only','exec'),env)
f=json.loads((R/'docs/hanja-component-capture-u995b-2026-10-27/engine-whole-lingo-u995b-no-extra-v1.json').read_text());target=[env['poly'](v)for v in f['groups'][16]['polygons']];prior=[env['poly'](v)for v in f['groups'][15]['polygons']];call=f['trace'][16][0]
ideal=env['qpoint'](call['args'],F(1,64),call['kind']);assert [str(v/2)for v in ideal]==p['normalizedExactSourceDyadic']
runtime=tuple(F(str(v))*2 for v in p['normalizedRuntimeAnchor'])
for point in[ideal,runtime]:
 margins=[env['cross'](a,b,point)for q in target for a,b in env['edges'](q)];assert all(v>0 for v in margins);assert any(env['inside'](q,point)for q in prior)
assert p['nativeApproval']is False and p['runtimeApplied']is False
print(json.dumps({'verified':True,'pen':15,'mask':2,'sourceT':'1/64','exactAndRuntimeStrictTargetKernel':True,'exactAndRuntimeStrictOriginalPriorP':True,'oldCompoundProofReexecuted':False,'engine':0,'nativeApproval':False}))
