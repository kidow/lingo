import copy,hashlib,json,importlib.util,sys
from fractions import Fraction as F
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];BASE=Path(__file__).resolve().parent
SOURCE='docs/hanja-actual-engine-capture-u7e98-hkcs-m-2026-10-26/engine-whole-hkcs_m7e98.json'
SOURCE_SHA='1d05a3718cfc27b49fe3b6a009ed03537280a1a3b2d2d8bdd4c485d90fca8503'
GEOM='docs/hanja-authored-ownstroke-u67d6-point-separated-2026-10-29/materialize-draft.py'
GEOM_SHA='088c971473b950d1bf926a41bd15afa77861246e5da617f9813ad632dbff2cce'
A=F(4499,3403);B=-F(4504697,85075)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def tx(v):return float(A*F(str(v))+B)
def build():
 assert sha(ROOT/SOURCE)==SOURCE_SHA
 s=json.loads((ROOT/SOURCE).read_bytes());g=copy.deepcopy(s['groups']);t=copy.deepcopy(s['trace'])
 for p in g[20]['polygons']:
  for q in p:q['x']=tx(q['x'])
 for c in t[20]:
  for i in range(0,len(c['args'])-2,2):c['args'][i]=tx(c['args'][i])
  for p in c['polygons']:
   for q in p:q['x']=tx(q['x'])
 return {'schema':'hanja-public-ownstroke-affine-whole-draft/v1','glyph':'纘','root':'local_u7e98_hkcs_raw21_x4499over3403_20261029','sourceRoot':'hkcs_m7e98@3','sourceRootWasAuthored':True,'candidateOriginalRoot':False,'isOriginalEngineCapture':False,'locallyAuthored':True,'mixed':False,'changedRawZeroBased':[20],'matrixExact':[str(A),'0','0','1',str(B),'0'],'groups':g,'trace':t,'nativeApproval':False,'runtimeApplied':False}
def load_candidate():
 candidate=json.loads((BASE/'fixtures-draft.json').read_bytes());assert candidate==build()
 return candidate
def verify():
 assert sha(ROOT/GEOM)==GEOM_SHA
 spec=importlib.util.spec_from_file_location('fixed_public_polygon_contact',ROOT/GEOM);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 s=json.loads((ROOT/SOURCE).read_bytes());c=load_candidate()
 assert len(c['groups'])==30 and sum(len(t)for t in c['trace'])==31 and sum(len(g['polygons'])for g in c['groups'])==62
 for i in range(30):
  assert c['groups'][i]['raw']==s['groups'][i]['raw']
  if i!=20:assert c['groups'][i]==s['groups'][i]and c['trace'][i]==s['trace'][i]
 assert c['groups'][21]['raw'][0]==0 and c['groups'][21]['polygons']==[]and c['trace'][21]==[]
 assert [p for call in c['trace'][20]for p in call['polygons']]==c['groups'][20]['polygons']
 assert tx(s['trace'][20][0]['args'][0])==s['trace'][20][0]['args'][0]
 for original,new in zip(s['trace'][20],c['trace'][20]):
  assert original['kind']==new['kind']and original['args'][-2:]==new['args'][-2:]
  assert original['args'][1:-2:2]==new['args'][1:-2:2]
 def box(p):return(min(x for x,y in p),min(y for x,y in p),max(x for x,y in p),max(y for x,y in p))
 def contact(p,q):
  a,b=box(p),box(q)
  if a[2]<b[0]or b[2]<a[0]or a[3]<b[1]or b[3]<a[1]:return False
  return m.contact(p,q)
 old=[[m.P(p)for p in g['polygons']]for g in s['groups']]
 exactNew=[[(A*x+B,y)for x,y in p]for p in old[20]]
 rows=[]
 for i,q in enumerate(old):
  if i==20 or not q:continue
  before=any(contact(p,b)for p in old[20]for b in q);after=any(contact(p,b)for p in exactNew for b in q)
  if before or after:rows.append({'otherRaw':i+1,'before':before,'after':after})
 assert rows==[{'otherRaw':18,'before':True,'after':True},{'otherRaw':19,'before':True,'after':True}]
 assert not any(contact(exactNew[6],p)for p in old[18])
 # Exact hook clip in H19's complete y-band: its left edge at y58.
 assert A*F(9071,50)+B==F(1869,10)
 assert F(1869,10)-F(1859,10)==1
 assert A>0 and all(0<=x<=200 and 0<=y<=200 for p in exactNew for x,y in p)
 return {'glyph':'纘','counts':{'raw':30,'calls':31,'P':62},'matrixExact':c['matrixExact'],'anchorX':'32881/200','wholeRaw21SourcePAndGuidesSamePositiveAffine':True,'other29RawAndTraceExact':True,'allRawMetadataAndFlagsPreserved':True,'nonDrawingRow22Preserved':True,'H19YBand':['44','58'],'terminalHookH19BandStrictXGap':'1','wholeRaw21ContactGraph':rows,'newClosedContacts':[],'lostClosedContacts':[],'wholeLegStartsOnH19AsBefore':True,'method':'Exact decimal Fraction closed-contact including boundaries; not a positive-area measurement; terminal gap proof uses all H19 P bbox y-band.','domesticClockReviewed':False,'logicalMappingApproved':False,'nativeApproval':False,'runtimeApplied':False,'newEngineRuns':0,'privateCoordinates':False}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
