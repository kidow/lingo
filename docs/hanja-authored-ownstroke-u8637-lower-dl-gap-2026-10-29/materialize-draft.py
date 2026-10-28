"""고정 원raw18 전체 P/Q x-4 저자배치. 원source/다른22raw 불변."""
import json,hashlib,copy,sys
from pathlib import Path
from decimal import Decimal
from fractions import Fraction as F
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
def load_candidate():
 rb=(HERE/'recipe.json').read_bytes();assert hashlib.sha256(rb).hexdigest()=='a511f49df90ce1fe27dfc68d028bd59a2c03a42007d02490dbf0dc4570589dbb';r=json.loads(rb);raw=(ROOT/r['source']['path']).read_bytes();assert hashlib.sha256(raw).hexdigest()==r['source']['SHA256'];s=json.loads(raw);ex=json.loads(raw,parse_float=Decimal);assert len(s['groups'])==23 and len(sum(s['trace'],[]))==26 and sum(len(g['polygons'])for g in s['groups'])==51;assert [sum((c['polygons']for c in row),[])for row in s['trace']]==[g['polygons']for g in s['groups']]
 assert s['trace'][17][0]['kind']=='cdDrawCurve'and s['trace'][17][0]['args'][6:]==[0,7];assert all(v['off']==0 for g in s['groups']for p in g['polygons']for v in p);g=copy.deepcopy(s['groups']);t=copy.deepcopy(s['trace']);a,b,c,d,e,f=map(F,r['matrixExact']);assert [a,b,c,d,e,f]==[1,0,0,1,-4,0]
 for pp,op in[(g[17]['polygons'],ex['groups'][17]['polygons']),(t[17][0]['polygons'],ex['trace'][17][0]['polygons'])]:
  for p,q in zip(pp,op):
   for v,w in zip(p,q):v['x']=float(F(w['x'])-4)
 for i in[3,5,7]:g[17]['raw'][i]=float(F(ex['groups'][17]['raw'][i])-4)
 for i in[0,2,4]:t[17][0]['args'][i]=float(F(ex['trace'][17][0]['args'][i])-4)
 assert g[:17]+g[18:]==s['groups'][:17]+s['groups'][18:]and t[:17]+t[18:]==s['trace'][:17]+s['trace'][18:];assert [sum((c['polygons']for c in row),[])for row in t]==[g['polygons']for g in g];assert t[17][0]['args'][6:]==s['trace'][17][0]['args'][6:];return r,{'original':s,'authored':{'groups':g,'trace':t,'locallyAuthoredRoot':True,'originalWhole':False,'isOriginalEngineCapture':False,'sourceTraceDescribesAuthoredWhole':False}}
if __name__=='__main__':
 assert sys.argv[1:]==['--check-only'];r,s=load_candidate();print(json.dumps({'passed':True,'raw':23,'calls':26,'P':51,'wholeRaw18XTranslationOnly':True,'other22RawAnd48PExact':True,'nativeApproval':False,'HTTP':0,'server':0}))
