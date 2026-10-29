"""Public raw8 whole affine only; no engine, private media or registered output."""
import copy,json,hashlib
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
SOURCE="docs/hanja-goal-glyphwiki-batch673-2026-10-11/engine-whole-u7a5f-var-001.json"
RECIPE="docs/hanja-authored-ownstroke-u7a5f-dot-h-contact-2026-10-29/recipe.pending.json"
assert hashlib.sha256((ROOT/SOURCE).read_bytes()).hexdigest()=="c79599a17df0b5054ac829d4641c1cbc0343e96d72595e21dcd4ef66b0fb081e"
assert hashlib.sha256((ROOT/RECIPE).read_bytes()).hexdigest()=="e676f2d9181623ca79502deff82fda36644e358cdb248e4ab57e74af3eb4f774"
s=json.loads((ROOT/SOURCE).read_bytes());g=copy.deepcopy(s['groups']);t=copy.deepcopy(s['trace'])
def fx(v):return float(F(655,498)*F(str(v))-F(28103,996))
for p in g[7]['polygons']:
 for v in p:v['x']=fx(v['x'])
for i in[3,5]:g[7]['raw'][i]=fx(g[7]['raw'][i])
assert len(t[7])==1 and t[7][0]['kind']=='cdDrawLine'
for i in[0,2]:t[7][0]['args'][i]=fx(t[7][0]['args'][i])
for p in t[7][0]['polygons']:
 for v in p:v['x']=fx(v['x'])
assert g[:7]==s['groups'][:7] and g[8:]==s['groups'][8:] and t[:7]==s['trace'][:7] and t[8:]==s['trace'][8:]
assert len(g)==21 and len(sum(t,[]))==22 and sum(len(x['polygons'])for x in g)==42
assert [sum((c['polygons']for c in cs),[])for cs in t]==[v['polygons']for v in g]
assert all(a['y']==b['y']and a['off']==b['off']for p,q in zip(g[7]['polygons'],s['groups'][7]['polygons'])for a,b in zip(p,q))
out={'schema':'hanja-authored-fixed-source-groups/v1','glyph':'穟','locallyAuthoredRoot':"lingo-u7a5f-var001-raw8-whole-X-contact-draft",'originalWhole':False,'isOriginalEngineCapture':False,'mixedParts':False,'sourcePath':SOURCE,'sourceSHA256':"c79599a17df0b5054ac829d4641c1cbc0343e96d72595e21dcd4ef66b0fb081e",'recipePath':RECIPE,'recipeSHA256':"e676f2d9181623ca79502deff82fda36644e358cdb248e4ab57e74af3eb4f774",'groups':g,'trace':t,'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
