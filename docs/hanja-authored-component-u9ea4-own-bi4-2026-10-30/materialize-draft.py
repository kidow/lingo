import argparse,copy,hashlib,json,sys
from fractions import Fraction as F
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
BASE='docs/hanja-goal-glyphwiki-batch934-2026-10-13/engine-proof.json';DONOR='docs/hanja-goal-glyphwiki-batch934-2026-10-13/engine-whole-u9ea4-var-001.json'
PINS={BASE:'ea2d736fc5593c331ece4d6fc08be32a23bbe6116ff9d97b2a66a229a425f22d',DONOR:'f1824aba17753fbc72d6314e3a430e12675fbfe74b41963efe39a40e1f0ad6ed'}
def require(v,m):
 if not v:raise ValueError(m)
def read(p):
 b=(ROOT/p).read_bytes();require(hashlib.sha256(b).hexdigest()==PINS[p],'fixed public source '+p);return json.loads(b)
def build():
 original=read(BASE);donor=read(DONOR);out=copy.deepcopy(original)
 require(len(original['groups'])==39 and len(donor['groups'])==39,'source39')
 matrices=[(F(1),F(1),F(0),F(0)),(F(97,200),F(106,85),F(6),F(6462,85)),(F(1,2),F(107,85),F(93),F(6369,85))]
 for block,(sx,sy,tx,ty)in enumerate(matrices):
  def point(x,y):return float(F(str(x))*sx+tx),float(F(str(y))*sy+ty)
  for j in range(5):
   g=copy.deepcopy(donor['groups'][8+j]);tr=copy.deepcopy(donor['trace'][8+j])
   for k in range(3,11,2):
    if g['raw'][k]is not None and g['raw'][k+1]is not None:g['raw'][k],g['raw'][k+1]=point(g['raw'][k],g['raw'][k+1])
   for p in g['polygons']:
    for v in p:v['x'],v['y']=point(v['x'],v['y'])
   for c in tr:
    require(c['kind']in('cdDrawLine','cdDrawCurve'),'closed source calls')
    for k in range(0,4 if c['kind']=='cdDrawLine'else 6,2):c['args'][k],c['args'][k+1]=point(c['args'][k],c['args'][k+1])
    for p in c['polygons']:
     for v in p:v['x'],v['y']=point(v['x'],v['y'])
   out['groups'][block*13+8+j]=g;out['trace'][block*13+8+j]=tr
 out.update({'glyph':'麤','locallyAuthored':True,'mixedParts':True,'isOriginalEngineCapture':False,'candidateOriginalRoot':False,'sourceWholeApproved':False,'nativeApproval':False,'runtimeApplied':False,'sourceRecipe':'recipe.pending.json'})
 require(sum(map(len,out['trace']))==48 and sum(len(g['polygons'])for g in out['groups'])==96,'48calls96P')
 require(all(out['groups'][i]==original['groups'][i]and out['trace'][i]==original['trace'][i]for i in range(39)if i%13<8),'other24raw exact')
 return out
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--emit-json',action='store_true');p.add_argument('--check-only',action='store_true');a=p.parse_args();out=build()
 if a.emit_json:print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
 elif a.check_only:
  require(json.loads((HERE/'fixtures-draft.json').read_bytes())==out,'exact authored fixture');print(json.dumps({'raw':39,'calls':48,'P':96,'other24rawExact':True,'wholeDonor5Only':True,'nativeApproval':False,'HTTP':0,'engine':0}))
 else:raise ValueError('explicit --emit-json or --check-only required')
