"""원 공개 raw16 전체에만 양의 Y행렬 적용; 두 고정출처를 별도 보존."""
import json,hashlib,copy,sys
from pathlib import Path
from decimal import Decimal
from fractions import Fraction as F
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
def load_candidate():
 rb=(HERE/'recipe.json').read_bytes();assert hashlib.sha256(rb).hexdigest()=='62942758c94585d90f5d1cd95a1584af28bbebb6c06eb8475914dc80292a9e1a';r=json.loads(rb);out={}
 for key,ref in r['sources'].items():
  raw=(ROOT/ref['path']).read_bytes();assert hashlib.sha256(raw).hexdigest()==ref['SHA256'];s=json.loads(raw);ex=json.loads(raw,parse_float=Decimal);assert len(s['groups'])==17 and len(sum(s['trace'],[]))==17 and sum(len(g['polygons'])for g in s['groups'])==28;assert [sum((c['polygons']for c in row),[])for row in s['trace']]==[g['polygons']for g in s['groups']]
  assert s['trace'][15][0]['kind']=='cdDrawCurve' and s['trace'][15][0]['args'][6:]==[32,7];assert all(v['off']==0 for g in s['groups']for p in g['polygons']for v in p)
  g=copy.deepcopy(s['groups']);t=copy.deepcopy(s['trace']);a,b,c,d,e,f=map(F,r['matrixExact']);assert [a,b,c,e]==[1,0,0,0]and d>0
  for pp,op in [(g[15]['polygons'],ex['groups'][15]['polygons']),(t[15][0]['polygons'],ex['trace'][15][0]['polygons'])]:
   for p,q in zip(pp,op):
    for v,w in zip(p,q):v['y']=float(d*F(w['y'])+f)
  for i in [4,6,8]:g[15]['raw'][i]=float(d*F(ex['groups'][15]['raw'][i])+f)
  for i in [1,3,5]:t[15][0]['args'][i]=float(d*F(ex['trace'][15][0]['args'][i])+f)
  assert t[15][0]['args'][4:]==s['trace'][15][0]['args'][4:];assert g[:15]+g[16:]==s['groups'][:15]+s['groups'][16:]and t[:15]+t[16:]==s['trace'][:15]+s['trace'][16:];assert [sum((c['polygons']for c in row),[])for row in t]==[g['polygons']for g in g]
  out[key]=s;out[key+'-author']={'groups':g,'trace':t,'locallyAuthoredRoot':True,'originalWhole':False,'isOriginalEngineCapture':False,'sourceTraceDescribesAuthoredWhole':False}
 return r,out
if __name__=='__main__':
 assert sys.argv[1:]==['--check-only'];r,s=load_candidate();print(json.dumps({'passed':True,'sources':list(s),'raw':17,'P':28,'onlyRaw16Changed':True,'QEndFixed':True,'nativeApproval':False,'HTTP':0,'server':0}))
