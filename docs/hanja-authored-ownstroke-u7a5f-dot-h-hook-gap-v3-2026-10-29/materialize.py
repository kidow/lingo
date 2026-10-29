"""穟 v3: retain prior raw8 affine, translate whole raw19 only; public source RAM, engine0."""
import copy,json,hashlib
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2]
SOURCE="docs/hanja-authored-ownstroke-u7a5f-dot-h-contact-2026-10-29/fixture.pending.json"
RECIPE="docs/hanja-authored-ownstroke-u7a5f-dot-h-hook-gap-v3-2026-10-29/recipe.pending.json"
assert hashlib.sha256((ROOT/SOURCE).read_bytes()).hexdigest()=="43a265b8400f69423c0e0c512cf7f76c2bef796f0580a419318ed08c8f34efc3"
assert hashlib.sha256((ROOT/RECIPE).read_bytes()).hexdigest()=="35f2477186173c6dfa78de156e446658ed0c93ad84f69672adfa44a7c68fd79a"
s=json.loads((ROOT/SOURCE).read_bytes());g=copy.deepcopy(s['groups']);t=copy.deepcopy(s['trace'])
def fx(v):return float(F(str(v))-F(129,95))
for p in g[18]['polygons']:
 for v in p:v['x']=fx(v['x'])
for i in[3,5,7]:g[18]['raw'][i]=fx(g[18]['raw'][i])
assert len(t[18])==1 and t[18][0]['kind']=='cdDrawCurve'
for i in[0,2,4]:t[18][0]['args'][i]=fx(t[18][0]['args'][i])
for p in t[18][0]['polygons']:
 for v in p:v['x']=fx(v['x'])
assert g[:18]==s['groups'][:18]and g[19:]==s['groups'][19:]and t[:18]==s['trace'][:18]and t[19:]==s['trace'][19:]
assert len(g)==21 and len(sum(t,[]))==22 and sum(len(x['polygons'])for x in g)==42
assert [sum((c['polygons']for c in cs),[])for cs in t]==[v['polygons']for v in g]
assert all(a['y']==b['y']and a['off']==b['off']for p,q in zip(g[18]['polygons'],s['groups'][18]['polygons'])for a,b in zip(p,q))
out={'schema':'hanja-authored-fixed-source-groups/v1','glyph':'穟','locallyAuthoredRoot':"lingo-u7a5f-var001-raw8-Xcontact-raw19-Xgap-draft",'originalWhole':False,'isOriginalEngineCapture':False,'mixedParts':False,'sourcePath':"docs/hanja-goal-glyphwiki-batch673-2026-10-11/engine-whole-u7a5f-var-001.json",'sourceSHA256':"c79599a17df0b5054ac829d4641c1cbc0343e96d72595e21dcd4ef66b0fb081e",'priorCandidatePath':SOURCE,'priorCandidateSHA256':"43a265b8400f69423c0e0c512cf7f76c2bef796f0580a419318ed08c8f34efc3",'recipePath':RECIPE,'recipeSHA256':"35f2477186173c6dfa78de156e446658ed0c93ad84f69672adfa44a7c68fd79a",'groups':g,'trace':t,'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
