"""Two bounded public raw11 affine hypotheses; no engine/private data or file writes."""
import json,hashlib,copy,sys
from pathlib import Path
from decimal import Decimal
from fractions import Fraction as F
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
RECIPE_SHA="d357a3a6b7e81ffb29cb3c7fc717267675af4c23a2e93c7140af2abb061b4fe6"
def sha(b):return hashlib.sha256(b).hexdigest()
def load_candidate():
 rraw=(HERE/'recipe.json').read_bytes();assert sha(rraw)==RECIPE_SHA;r=json.loads(rraw);raw=(ROOT/r['source']['path']).read_bytes();assert sha(raw)==r['source']['SHA256'];s=json.loads(raw);exact=json.loads(raw,parse_float=Decimal);assert len(s['groups'])==24 and len(sum(s['trace'],[]))==24 and sum(len(g['polygons'])for g in s['groups'])==43;assert [i+1for i,g in enumerate(s['groups'])if not g['polygons']]==[16]
 assert s['trace'][10][0]['kind']=='cdDrawCurve'and s['trace'][10][0]['args'][6:]==[22,7];assert all(v['off']==0for g in s['groups']for p in g['polygons']for v in p);assert [sum((c['polygons']for c in row),[])for row in s['trace']]==[g['polygons']for g in s['groups']]
 out={'original':s}
 for name,v in r['variants'].items():
  a,b,c,d,e,f=map(F,v['matrixExact']);assert a*d-b*c>0 and [a,b,c,e]==[1,0,0,0];g=copy.deepcopy(s['groups']);t=copy.deepcopy(s['trace'])
  for polys,original in[(g[10]['polygons'],exact['groups'][10]['polygons']),(t[10][0]['polygons'],exact['trace'][10][0]['polygons'])]:
   for pp,op in zip(polys,original):
    for p,q in zip(pp,op):p['x']=float(a*F(q['x'])+c*F(q['y'])+e);p['y']=float(b*F(q['x'])+d*F(q['y'])+f)
  for yi in[4,6,8]:g[10]['raw'][yi]=float(d*F(exact['groups'][10]['raw'][yi])+f)
  for yi in[1,3,5]:t[10][0]['args'][yi]=float(d*F(exact['trace'][10][0]['args'][yi])+f)
  assert t[10][0]['args'][:2]==s['trace'][10][0]['args'][:2];assert t[10][0]['args'][6:]==[22,7];assert g[10]['raw'][:3]==s['groups'][10]['raw'][:3]
  assert g[:10]+g[11:]==s['groups'][:10]+s['groups'][11:]and t[:10]+t[11:]==s['trace'][:10]+s['trace'][11:];assert [sum((q['polygons']for q in row),[])for row in t]==[p['polygons']for p in g];assert sum(len(p['polygons'])for p in g)==43
  out[name]={'groups':g,'trace':t,'locallyAuthoredRoot':True,'originalWhole':False,'isOriginalEngineCapture':False,'sourceTraceDescribesAuthoredWhole':False}
 return r,out
if __name__=='__main__':
 assert sys.argv[1:]==['--check-only'];r,s=load_candidate();print(json.dumps({'passed':True,'glyph':'蠙','variants':list(s),'shape':[24,24,43],'onlyRaw11Changed':True,'other23RawExact':True,'sourceFlagsPreserved':True,'sourceTopHeadFixed':True,'engine':0,'privateFetch':0,'server':0,'nativeApproval':False}))
