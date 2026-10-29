"""幭 VS3 original whole raw18 positiveY affine only; engine/private access0."""
import copy,json,hashlib
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2]
SOURCE="docs/hanja-goal-glyphwiki-batch568-2026-10-11/engine-whole-u5e6d-ue0103.json"
RECIPE="docs/hanja-authored-ownstroke-u5e6d-vs3-cubic-box-contact-2026-10-29/recipe.pending.json"
assert hashlib.sha256((ROOT/SOURCE).read_bytes()).hexdigest()=="0637f8ed6659ebc24fe2116fbdc992ae55528a3b6148ea3d371512aad18beba7"
assert hashlib.sha256((ROOT/RECIPE).read_bytes()).hexdigest()=="16f4ed246c6ef0924ed890d1c9f9cb8da8ec619108442fce6fcd38ef0d675b4c"
s=json.loads((ROOT/SOURCE).read_bytes());g=copy.deepcopy(s['groups']);t=copy.deepcopy(s['trace'])
def fy(v):return float(F(995,949)*F(str(v))-F(8602,949))
for p in g[17]['polygons']:
 for v in p:v['y']=fy(v['y'])
for i in[4,6,8,10]:g[17]['raw'][i]=fy(g[17]['raw'][i])
assert len(t[17])==1 and t[17][0]['kind']=='cdDrawBezier'
for i in[1,3,5,7]:t[17][0]['args'][i]=fy(t[17][0]['args'][i])
for p in t[17][0]['polygons']:
 for v in p:v['y']=fy(v['y'])
assert g[:17]==s['groups'][:17]and g[18:]==s['groups'][18:]and t[:17]==s['trace'][:17]and t[18:]==s['trace'][18:]
assert len(g)==20 and len(sum(t,[]))==22 and sum(len(v['polygons'])for v in g)==40
assert [sum((c['polygons']for c in cs),[])for cs in t]==[v['polygons']for v in g]
assert all(a['x']==b['x']and a['off']==b['off']for p,q in zip(g[17]['polygons'],s['groups'][17]['polygons'])for a,b in zip(p,q))
out={'schema':'hanja-authored-fixed-source-groups/v1','glyph':'幭','locallyAuthoredRoot':"lingo-u5e6d-vs3-raw18-wholeY-box-contact-draft",'originalWhole':False,'isOriginalEngineCapture':False,'mixedParts':False,'sourcePath':SOURCE,'sourceSHA256':"0637f8ed6659ebc24fe2116fbdc992ae55528a3b6148ea3d371512aad18beba7",'recipePath':RECIPE,'recipeSHA256':"16f4ed246c6ef0924ed890d1c9f9cb8da8ec619108442fce6fcd38ef0d675b4c",'groups':g,'trace':t,'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
