import ast,json,hashlib
from pathlib import Path
from decimal import Decimal
from fractions import Fraction as F
B=Path(__file__).resolve().parents[2];utility='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py';assert hashlib.sha256((B/utility).read_bytes()).hexdigest()=='945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea';t=ast.parse((B/utility).read_text());exec(compile(ast.Module(body=[n for n in t.body if isinstance(n,ast.FunctionDef)],type_ignores=[]),utility,'exec'))
source="docs/hanja-goal-glyphwiki-batch563-2026-10-11/engine-whole-u97ce.json";raw=(B/source).read_bytes();assert hashlib.sha256(raw).hexdigest()=="a420b9781f8efa339375a37632219ad97af1e37040e764b5fd50998af06203fb";s=json.loads(raw,parse_float=Decimal);A=[clean([(F(v['x']),F(v['y']))for v in p])for p in s['groups'][1]['polygons']];rows=[]
for j,g in enumerate(s['groups']):
 if j==1:continue
 D=[clean([(F(v['x']),F(v['y']))for v in p])for p in g['polygons']];assert all(simple(p)for p in A+D);touch=any(contact(p,q)for p in A for q in D);areas=[str(exact_area(p,q))for p in A for q in D];rows.append({'raw':j+1,'contact':touch,'positive':any(F(a)>0 for a in areas),'pairAreas':areas})
print(json.dumps({'raw2Contacts':[r for r in rows if r['contact']],'remainingRawCount':16,'retainedP':sum(len(g['polygons'])for j,g in enumerate(s['groups'])if j!=1),'omittedWholeCallP':len(A),'newContactsAfterPureWholeCallOmission':0}))
