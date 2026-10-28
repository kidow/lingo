import copy,hashlib,json,importlib.util,sys
from fractions import Fraction as F
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];BASE=Path(__file__).resolve().parent
PRIOR='docs/hanja-authored-ownstroke-u8b41-body-h-2026-10-29/';PRIOR_FIXTURE_SHA='a7c2777f1292cbc0616cd8a3916c3561257ff641ad32e389e8661321e9f2b5a7';PRIOR_MODULE_SHA='ee3243c0c779c56d56dc3d87953409f943b5a20b2ea49d7d7d49eb0e56294909'
FIXTURE_SHA='d544cef89dea80d3e251b0562c32ad0fac85eb60b45ff06c7cb42925c3ac37a2';RECIPE_SHA='d15204309119c24f032bed0ea74dc8c583514e547c23ca41e8bb05ce270aeebe'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(ROOT/PRIOR/'materialize-draft.py')==PRIOR_MODULE_SHA
sp=importlib.util.spec_from_file_location('hua_prior_public_math',ROOT/PRIOR/'materialize-draft.py');prior=importlib.util.module_from_spec(sp);sp.loader.exec_module(prior)
def ty(y):return float(F(62,47)*F(str(y))-F(1531,47))
def load_candidate():
 assert sha(ROOT/PRIOR/'fixtures-draft.json')==PRIOR_FIXTURE_SHA and sha(BASE/'fixtures-draft.json')==FIXTURE_SHA and sha(BASE/'recipe.json')==RECIPE_SHA
 old=prior.load_candidate();c=json.loads((BASE/'fixtures-draft.json').read_bytes());g=copy.deepcopy(old['groups']);t=copy.deepcopy(old['trace'])
 for n in [13,14]:
  for p in g[n]['polygons']:
   for q in p:q['y']=ty(q['y'])
  for i in [4,6]:g[n]['raw'][i]=ty(g[n]['raw'][i])
  for call in t[n]:
   for i in [1,3]:call['args'][i]=ty(call['args'][i])
   for p in call['polygons']:
    for q in p:q['y']=ty(q['y'])
 assert c['groups']==g and c['trace']==t
 assert [i for i in range(20)if g[i]!=old['groups'][i]]==[13,14] and [i for i in range(20)if t[i]!=old['trace'][i]]==[13,14]
 assert c['changedRawZeroBased']==[13,14,15] and c['originalRoot']is False and c['isOriginalEngineCapture']is False and not any(c['approval'].values())
 assert c['additionalMatricesExact']=={k:['1','0','0','62/47','0','-1531/47']for k in ['raw14','raw15']}
 for i in [13,14]:
  assert g[i]['raw'][:3]==old['groups'][i]['raw'][:3] and [q['x']for p in g[i]['polygons']for q in p]==[q['x']for p in old['groups'][i]['polygons']for q in p]
  assert g[i]['raw'][6]>g[i]['raw'][4]
 return c
def hypothesis(c):
 h=prior.hypothesis(c);h['root']='local_u8b41_18logical_contact_v2_hypothesis';return h
def verify():
 c=load_candidate();old=prior.load_candidate();exact=copy.deepcopy(old['groups'])
 for n in [13,14]:
  for p in exact[n]['polygons']:
   for q in p:q['y']=F(62,47)*F(str(q['y']))-F(1531,47)
  yy=[q['y']for p in exact[n]['polygons']for q in p];assert min(yy)==69 and max(yy)==131
 rows=[]
 for n in [13,14]:
  for i in range(20):
   if i==n:continue
   oa=sum(prior.area(prior.clip(prior.P(p),prior.P(q)))for p in old['groups'][n]['polygons']for q in old['groups'][i]['polygons']);areas=[prior.area(prior.clip(prior.P(p),prior.P(q)))for p in exact[n]['polygons']for q in exact[i]['polygons']];na=sum(areas)
   if oa or na:rows.append({'changedRaw':n+1,'otherRaw':i+1,'oldPairwiseArea':str(oa),'newPairwiseArea':str(na),'primitiveAreas':list(map(str,areas)),'newPositiveContact':oa==0 and na>0})
 new=[x for x in rows if x['newPositiveContact']];assert [(x['changedRaw'],x['otherRaw'])for x in new]==[(14,13),(14,17),(15,13),(15,17)]
 for x in new:assert sum(F(a)>0 for a in x['primitiveAreas'])==1 and F(x['newPairwiseArea'])==(F(141,62)if x['otherRaw']==13 else F(47,62))
 assert all(x['oldPairwiseArea']==x['newPairwiseArea']=='48'for x in rows if not x['newPositiveContact'])
 assert F(62,47)>0 and F(47,62)*F(62,47)==1 and F(47,62)*(-F(1531,47))+F(1531,62)==0
 return{'glyph':'譁','groups':20,'polygons':36,'changedRawZeroBased':[13,14,15],'additionalChangedFromHOnlyRawOneBased':[14,15],'other17OriginalRawPreserved':True,'wholePAndGuideSameAffine':True,'XAndWidthUnchanged':True,'downDirectionPreserved':True,'flagsUnchanged':True,'positiveYDeterminant':'62/47','inverseY':['1','0','0','47/62','0','1531/62'],'exactInverseIdentity':True,'exactRaw16Raw20UnionContactArea':'4','priorHContactProofReused':True,'contacts':rows,'onlyNewRequestedFourContactPairs':True,'newCentralVRaw18ContactAccepted':False,'newFourVContactPairsNativeApproved':False,'logicalMappingApproved':False,'privateCoordinates':False,'engineRuns':0,'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':print(json.dumps(verify(),ensure_ascii=False))
