from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re
R=Path(__file__).resolve().parents[2]
FIX='docs/hanja-source-original-u9008-hkcs-2026-10-27/fixtures-draft.json';PROOF='docs/hanja-source-original-u9008-hkcs-2026-10-27/cubic-contact-foot-feasibility.json';HELP='docs/hanja-component-capture-u995b-2026-10-27/verify-compound-contact-facts.py';PATH='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py'
PINS={FIX:'c9fce51a23da581bcd9b25bc7e2f5fbabd765b45c222926fafc2fcdaef92707f',PROOF:'87cf861aa60f1832f4731d18ff111a4a2d1877aab3a4f36d0b240d22fe1d7bad',HELP:'bb3f78ad4a38857a699a0c3a48b42c0e241ee1a7b5ce51dbb3aa5e063a47d9d5',PATH:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf'}
sha=lambda b:hashlib.sha256(b).hexdigest()
for p,h in PINS.items():assert sha((R/p).read_bytes())==h
f=json.loads((R/FIX).read_text())['u9008'];proof=json.loads((R/PROOF).read_text())
def load(p,names,env):
 s=(R/p).read_text()
 for n in ast.parse(s).body:
  if isinstance(n,ast.FunctionDef)and n.name in names:exec(compile(ast.get_source_segment(s,n),p+'::pure-functions-only','exec'),env)
e={'F':F};load(HELP,{'cross','area','edges','on','meet','poly','triangles','half_clip','intersect','contact'},e);pe={'F':F,'re':re};load(PATH,{'polygons','cross','state'},pe)
P=pe['polygons'](f['strokes'][9][1]['outline']);prior=pe['polygons'](f['strokes'][9][0]['outline']);cut=F(proof['foot']['cut']);foot=e['half_clip'](P[0],(cut,F(0)),(cut,F(1)));T=e['triangles'](foot);assert len(T)==2;assert e['area'](foot)==F(proof['foot']['area'])
root=proof['foot']['rootTriangleOneBased']-1;child=1-root;seed=tuple(map(F,proof['foot']['diagnosticSeed']));assert pe['state'](seed,foot)==1 and any(pe['state'](seed,p)==1 for p in prior)
common=sorted(set(T[root])&set(T[child]));assert len(common)==2;edgeSquared=sum((common[0][k]-common[1][k])**2 for k in[0,1]);assert edgeSquared==F(proof['foot']['positiveEdgeDualGraph'][0]['positiveEdgeLengthSquared'][0]);childSeed=tuple((common[0][k]+common[1][k])/2 for k in[0,1])
order=[{'triangleOneBased':root+1,'parentTriangleOneBased':None,'vertices':T[root],'seed':seed,'area':e['area'](T[root]),'weight':e['area'](T[root])/e['area'](foot)},{'triangleOneBased':child+1,'parentTriangleOneBased':root+1,'vertices':T[child],'seed':childSeed,'area':e['area'](T[child]),'weight':e['area'](T[child])/e['area'](foot),'positiveParentEdgeLengthSquared':edgeSquared}]
assert sum(v['area']for v in order)==e['area'](foot);assert sum(v['weight']for v in order)==1
out={'schema':'hanja-u9008-source-cubic-foot-runtime-data/v1','glyph':'逈','root':'hkcs_m9008','pen':10,'mask':2,'inputSHA256':PINS,'compiledSHA256':f['compiledSHA256'],'fullProofIdentity':f['identity'],'sourceGuide':f['strokes'][9][1]['revealPath'],'sourceBounds':f['strokes'][9][1]['bounds'],'sourceWeight':f['strokes'][9][1]['weight'],'sourceWidth':14,'priorSourceOutlineSHA256':sha(f['strokes'][9][0]['outline'].encode()),'cutX':cut,'maxX':F(str(f['strokes'][9][1]['bounds'][2])),'phaseShare':F(proof['authorClockProposalOnly']['footAreaRatio']),'footTrianglesInRevealOrder':order,'auxiliaryMaskDataOnly':True,'newSourceP':False,'newGuide':False,'authorClockNotPublisherClock':True,'completedCurrentFrameOpaquePriorMask1Required':True,'nativeApproval':False,'runtimeApplied':False,'engine':0,'wholeProofReexecution':False,'deriverSHA256':sha(Path(__file__).read_bytes())}
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
print(json.dumps(enc(out),ensure_ascii=False,indent=2))
