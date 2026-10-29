"""혼합 저자草4+보존body 정적후보. donorD를 flatten하거나 원enginecapture로 포장하지 않음."""
import json,hashlib,copy,importlib.util,sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def load_candidate():
 rb=(HERE/'recipe.json').read_bytes();assert hashlib.sha256(rb).hexdigest()=='81ec06b6de1ae1e4201140c083bb1b012b4ddf6b86d386a2787d18a1cc54b353';r=json.loads(rb)
 for ref in[r['donor'],r['recipient'],r['bodyMaterializer'],r['bodyRecipe']]:assert sha(ROOT/ref['path'])==ref['SHA256']
 d=json.loads((ROOT/r['donor']['path']).read_bytes());assert d['schema']=='hanja-fixed-MM-exact-original-donor/v1';assert hashlib.sha256(d['originalRecordJSON'].encode()).hexdigest()==d['originalRecordSHA256'];assert json.loads(d['originalRecordJSON'])==d['record'];record=d['record'];assert record['character']=='十'and len(record['strokes'])==len(record['medians'])==2
 for key in ['originalNoticeCopy','completeLicenseCopy']:
  ref=d['license'][key];assert sha(ROOT/ref['path'])==ref['SHA256']
 spec=importlib.util.spec_from_file_location('u8637_fixed_body_translation',ROOT/r['bodyMaterializer']['path']);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);bodyrecipe,sources=m.load_candidate();original=sources['original'];body=sources['authored'];assert len(body['groups'])==23;groups=[]
 for i,p in enumerate(r['placements']):
  n=r['originalDonorPathSequence'][i]-1;assert n==p['sourceStrokeOneBased']-1;groups.append({'sourceKind':'original-MM-donor-whole-D','originalD':record['strokes'][n],'originalMedian':copy.deepcopy(record['medians'][n]),'matrixAfterNExact':p['matrixAfterNExact'],'normalizationMatrixExact':r['donorSourceCoordinateNormalization']['matrixExact'],'polygons':[]})
 for raw in r['retainedBodyRawOneBased']:
  assert raw>=4;g=copy.deepcopy(body['groups'][raw-1]);g['sourceKind']='retained-GlyphWiki-body-P';g['originalRawOneBased']=raw;groups.append(g)
 assert len(groups)==24 and sum(len(g['polygons'])for g in groups)==45;assert groups[4:]==[dict(copy.deepcopy(body['groups'][raw-1]),sourceKind='retained-GlyphWiki-body-P',originalRawOneBased=raw)for raw in range(4,24)];return r,{'original':original,'authored':{'groups':groups,'locallyAuthoredRoot':True,'mixedParts':True,'originalWhole':False,'isOriginalEngineCapture':False,'sourceTraceDescribesAuthoredWhole':False}}
if __name__=='__main__':
 assert sys.argv[1:]==['--check-only'];r,s=load_candidate();print(json.dumps({'guardPass':True,'bodyRaw':20,'bodyP':45,'wholeDonorD':4,'donorMapping':[1,2,1,2],'authoredStaticSlots':24,'nativeApproval':False,'HTTP':0,'server':0}))
