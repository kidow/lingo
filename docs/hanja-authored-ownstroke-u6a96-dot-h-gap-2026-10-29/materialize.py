"""Public raw17 whole affine only; no engine, private media or registered output."""
import copy,json,hashlib
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
SOURCE="docs/hanja-goal-glyphwiki-batch672-2026-10-11/engine-whole-u6a96.json"
RECIPE="docs/hanja-authored-ownstroke-u6a96-dot-h-gap-2026-10-29/recipe.pending.json"
assert hashlib.sha256((ROOT/SOURCE).read_bytes()).hexdigest()=="4d80b42a99238926942a87a33a5af38c3f5838a04a3fd350a73aa54101523a4d"
assert hashlib.sha256((ROOT/RECIPE).read_bytes()).hexdigest()=="a05a95a8abc6c27e1461499daae2ca687453964277b2a3aedda94d7e058fc319"
s=json.loads((ROOT/SOURCE).read_bytes());g=copy.deepcopy(s['groups']);t=copy.deepcopy(s['trace'])
def fx(v):return float(F(212,239)*F(str(v))+F(12582,1195))
for p in g[16]['polygons']:
 for v in p:v['x']=fx(v['x'])
for i in[3,5]:g[16]['raw'][i]=fx(g[16]['raw'][i])
assert len(t[16])==1 and t[16][0]['kind']=='cdDrawLine'
for i in[0,2]:t[16][0]['args'][i]=fx(t[16][0]['args'][i])
for p in t[16][0]['polygons']:
 for v in p:v['x']=fx(v['x'])
assert g[:16]==s['groups'][:16] and g[17:]==s['groups'][17:] and t[:16]==s['trace'][:16] and t[17:]==s['trace'][17:]
assert len(g)==20 and len(sum(t,[]))==21 and sum(len(x['polygons'])for x in g)==40
assert [sum((c['polygons']for c in cs),[])for cs in t]==[v['polygons']for v in g]
assert all(a['y']==b['y']and a['off']==b['off']for p,q in zip(g[16]['polygons'],s['groups'][16]['polygons'])for a,b in zip(p,q))
out={'schema':'hanja-authored-fixed-source-groups/v1','glyph':'檖','locallyAuthoredRoot':"lingo-u6a96-raw17-whole-X-gap1-draft",'originalWhole':False,'isOriginalEngineCapture':False,'mixedParts':False,'sourcePath':SOURCE,'sourceSHA256':"4d80b42a99238926942a87a33a5af38c3f5838a04a3fd350a73aa54101523a4d",'recipePath':RECIPE,'recipeSHA256':"a05a95a8abc6c27e1461499daae2ca687453964277b2a3aedda94d7e058fc319",'groups':g,'trace':t,'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
