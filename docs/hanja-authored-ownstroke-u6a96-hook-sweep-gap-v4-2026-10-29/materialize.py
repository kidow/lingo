"""Only whole raw10 public P/Q Y-affine; retain prior raw17 correction, no engine/private access."""
import copy,json,hashlib
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2]
BASE="docs/hanja-authored-ownstroke-u6a96-dot-h-gap-2026-10-29/fixture.pending.json";RECIPE="docs/hanja-authored-ownstroke-u6a96-hook-sweep-gap-v4-2026-10-29/recipe.pending.json"
assert hashlib.sha256((ROOT/BASE).read_bytes()).hexdigest()=="d667c0b8cadab7c8a939e29edd438c686b92d26b780c6385ff00125606f1bb3b"
assert hashlib.sha256((ROOT/RECIPE).read_bytes()).hexdigest()=="f65645ec37be0ab63558a02d9d1edde8d1c9f676a457fe96e529c0daaeeb7921"
s=json.loads((ROOT/BASE).read_text());o=copy.deepcopy(s)
def fy(v):return float(F(8749,9215)*F(str(v))+F(6990,1843))
for p in o['groups'][9]['polygons']:
 for v in p:v['y']=fy(v['y'])
for i in[4,6,8]:o['groups'][9]['raw'][i]=fy(o['groups'][9]['raw'][i])
assert len(o['trace'][9])==2
for c in o['trace'][9]:
 assert c['kind']=='cdDrawCurve'and len(c['args'])==8
 for i in[1,3,5]:c['args'][i]=fy(c['args'][i])
 for p in c['polygons']:
  for v in p:v['y']=fy(v['y'])
for i in range(20):
 if i!=9:assert o['groups'][i]==s['groups'][i]and o['trace'][i]==s['trace'][i]
assert o['groups'][9]['raw'][4]==75
assert len(o['groups'])==20 and len(sum(o['trace'],[]))==21 and sum(len(g['polygons'])for g in o['groups'])==40
assert [sum((c['polygons']for c in row),[])for row in o['trace']]==[g['polygons']for g in o['groups']]
assert all(a['x']==b['x']and a['off']==b['off']for p,q in zip(o['groups'][9]['polygons'],s['groups'][9]['polygons'])for a,b in zip(p,q))
o.update(locallyAuthoredRoot='lingo-u6a96-raw17-X-raw10-Y-gap1-v4-draft',baseFixturePath=BASE,baseFixtureSHA256="d667c0b8cadab7c8a939e29edd438c686b92d26b780c6385ff00125606f1bb3b",recipePath=RECIPE,recipeSHA256="f65645ec37be0ab63558a02d9d1edde8d1c9f676a457fe96e529c0daaeeb7921",nativeApproval=False,runtimeApplied=False)
if __name__=='__main__':print(json.dumps(o,ensure_ascii=False,separators=(',',':')))
