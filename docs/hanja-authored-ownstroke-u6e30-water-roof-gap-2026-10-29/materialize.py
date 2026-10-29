"""Whole water raw4 P/Q positiveX only, exact original full5 provenance, no new engine/private fetch."""
import copy,json,hashlib
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
SOURCE="docs/hanja-goal-glyphwiki-batch710-2026-10-12/engine-proof.json";RECIPE="docs/hanja-authored-ownstroke-u6e30-water-roof-gap-2026-10-29/feasibility.pending.json"
assert hashlib.sha256((ROOT/SOURCE).read_bytes()).hexdigest()=='0249f2f845e8ca26004e94bcb385d36ca4cfc77d1bfbd83eb562a203fc30b8e8'
assert hashlib.sha256((ROOT/RECIPE).read_bytes()).hexdigest()=="28fee26fde21ac2b4c9c1a102b6e9a53af591addf3df1043367fca786a0dc685"
s=json.loads((ROOT/SOURCE).read_text());g=copy.deepcopy(s['groups']);t=copy.deepcopy(s['trace'])
def fx(v):return float(F(285,334)*F(str(v))+F(4214,835))
for p in g[3]['polygons']:
 for v in p:v['x']=fx(v['x'])
for i in[3,5,7]:g[3]['raw'][i]=fx(g[3]['raw'][i])
assert len(t[3])==1 and t[3][0]['kind']=='cdDrawCurve'
for i in[0,2,4]:t[3][0]['args'][i]=fx(t[3][0]['args'][i])
for p in t[3][0]['polygons']:
 for v in p:v['x']=fx(v['x'])
for i in range(15):
 if i!=3:assert g[i]==s['groups'][i]and t[i]==s['trace'][i]
assert g[3]['raw'][3]==34.4
assert len(g)==15 and len(sum(t,[]))==15 and sum(len(a['polygons'])for a in g)==27
assert [sum((c['polygons']for c in row),[])for row in t]==[a['polygons']for a in g]
o={'schema':'hanja-authored-fixed-source-groups/v1','glyph':'渰','locallyAuthoredRoot':'lingo-u6e30-water-raw4-positiveX-gap1-draft','originalWhole':False,'isOriginalEngineCapture':False,'mixedParts':False,'sourcePath':SOURCE,'sourceSHA256':'0249f2f845e8ca26004e94bcb385d36ca4cfc77d1bfbd83eb562a203fc30b8e8','recipePath':RECIPE,'recipeSHA256':"28fee26fde21ac2b4c9c1a102b6e9a53af591addf3df1043367fca786a0dc685",'groups':g,'trace':t,'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(o,ensure_ascii=False,separators=(',',':')))
