"""Fixed public raw14 whole positive Y placement; stdout candidate only, no engine/private access."""
import copy,json,hashlib
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2]
SOURCE="docs/hanja-goal-glyphwiki-batch670-2026-10-11/engine-whole-u775f-ue0100.json"
RECIPE="docs/hanja-authored-ownstroke-u775f-lower-v-gap-2026-10-29/recipe.pending.json"
assert hashlib.sha256((ROOT/SOURCE).read_bytes()).hexdigest()=='347565d7f33cc24a018723c688cc272049ffc4b3255eb9dd25f33c340636d047'
assert hashlib.sha256((ROOT/RECIPE).read_bytes()).hexdigest()=='9c4c8094d6a1b4ace90cf074341ef34b5127f4a9ca6cc7be9660cb25132e3f72'
s=json.loads((ROOT/SOURCE).read_text());g=copy.deepcopy(s['groups']);t=copy.deepcopy(s['trace'])
def fy(v):return float(F(13,14)*F(str(v))+F(69,7))
for poly in g[13]['polygons']:
 for v in poly:v['y']=fy(v['y'])
for i in[4,6]:g[13]['raw'][i]=fy(g[13]['raw'][i])
assert len(t[13])==1 and t[13][0]['kind']=='cdDrawLine'
for i in[1,3]:t[13][0]['args'][i]=fy(t[13][0]['args'][i])
for poly in t[13][0]['polygons']:
 for v in poly:v['y']=fy(v['y'])
assert g[:13]==s['groups'][:13]and t[:13]==s['trace'][:13]
assert len(g)==14 and len(sum(t,[]))==14 and sum(len(x['polygons'])for x in g)==25
assert [sum((c['polygons']for c in calls),[])for calls in t]==[v['polygons']for v in g]
assert all(a['x']==b['x']and a['off']==b['off']for p,q in zip(g[13]['polygons'],s['groups'][13]['polygons'])for a,b in zip(p,q))
out={'schema':'hanja-authored-fixed-source-groups/v1','glyph':'睟','locallyAuthoredRoot':'lingo-u775f-raw14-y13over14-gap1-draft','originalWhole':False,'isOriginalEngineCapture':False,'mixedParts':False,'sourcePath':SOURCE,'sourceSHA256':'347565d7f33cc24a018723c688cc272049ffc4b3255eb9dd25f33c340636d047','recipePath':RECIPE,'recipeSHA256':'9c4c8094d6a1b4ace90cf074341ef34b5127f4a9ca6cc7be9660cb25132e3f72','groups':g,'trace':t,'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
