from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re
R=Path(__file__).resolve().parents[2];D=Path(__file__).resolve().parent
FIXTURE='docs/hanja-source-original-u5ac2-sou10-layout-v2-2026-10-27/fixtures-draft.json';ONSET='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py';AXIS='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py';CONNECTED='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-pen8-connected-x-prefix.py';AUDIT='docs/hanja-source-original-u8587-local-components-2026-10-27/verify-5-6-connected-prefix.py';KERNEL='docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py';DIRECTION='docs/hanja-official-media-compare-u5ac2-2026-10-27/native-clock-review.json';NATIVE='docs/hanja-source-original-u5ac2-sou10-layout-v2-2026-10-27/native-baseline-review.json'
PINS={FIXTURE:'6cc0ae1b2facfd2c10ad102c4acf5936781ff0f845052e712aaad71ad489dccf',ONSET:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',AXIS:'db903056c1375705fd8133ee79dcc3ff5450c519012a3f249881af9abebdbd29',CONNECTED:'afa23cad9a8825a2d839a4c5128607b21b2b84d377f05bdbbab0b1c8bec076b0',KERNEL:'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396',AUDIT:'2058aa876fbe98a0f99cbfd3e9d9b30c88e16f4065bf9aff24f6043afb359b66',DIRECTION:'bdcfd0d79492f5ba3c69c4b77366112da707c0f6d188775390ffcb30c0e07a44',NATIVE:'4c01b39c3e21d4deef8c2467b7ccfccad9757a8ea9f4119dd0ad1d990f6c62f4'}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
fixture=json.loads((R/FIXTURE).read_text())['u5ac2'];directions=[{'pen':x['stroke'],'direction':x['direction']}for x in json.loads((R/DIRECTION).read_text())['macroDirections']];native=json.loads((R/NATIVE).read_text());assert len(native['observations']['confirmedFailures'])==6
ns={'F':F,'re':re,'fixture':fixture,'directions':directions}
for path,names in [(ONSET,{'polygons','cross','state','margin'}),(AXIS,{'section','merge','intersection'}),(CONNECTED,{'signed_area','line','yintervals','clip','on','contact','components','uncovered'})]:
 source=(R/path).read_text()
 for fn in ast.parse(source).body:
  if isinstance(fn,ast.FunctionDef)and fn.name in names:exec(compile(ast.get_source_segment(source,fn),path+'::pure-functions-only','exec'),ns)
source=(R/AUDIT).read_text();fn=next(n for n in ast.parse(source).body if isinstance(n,ast.FunctionDef)and n.name=='audit');code=ast.get_source_segment(source,fn).replace("def audit(pen,axis='x'):","def audit_mask(pen,mask_number,axis='x'):").replace("original=[p for mask in fixture['strokes'][pen-1] for p in ns['polygons'](mask['outline'])]","original=ns['polygons'](fixture['strokes'][pen-1][mask_number-1]['outline'])");assert code!=ast.get_source_segment(source,fn);ns['ns']=ns;exec(compile(code,AUDIT+'::one-new-mask-audit','exec'),ns)

CONTACT='docs/hanja-component-capture-u995b-2026-10-27/verify-compound-contact-facts.py';assert hashlib.sha256((R/CONTACT).read_bytes()).hexdigest()=='bb3f78ad4a38857a699a0c3a48b42c0e241ee1a7b5ce51dbb3aa5e063a47d9d5';PINS[CONTACT]='bb3f78ad4a38857a699a0c3a48b42c0e241ee1a7b5ce51dbb3aa5e063a47d9d5'
cs={'F':F};source=(R/CONTACT).read_text();names={'cross','area','edges','on','meet','triangles','half_clip','intersect','contact'}
for fn in ast.parse(source).body:
 if isinstance(fn,ast.FunctionDef)and fn.name in names:exec(compile(ast.get_source_segment(source,fn),CONTACT+'::pure-area-functions','exec'),cs)
polygons,state=ns['polygons'],ns['state']
def initial_sections(pen,mask,axis):
 current=polygons(fixture['strokes'][pen-1][mask-1]['outline']);previous=[p for s in fixture['strokes'][pen-1][:mask-1]for p in polygons(s['outline'])];coordinate=0 if axis=='x'else 1;start=max(v[0]for p in current for v in p)if axis=='x'else min(v[1]for p in current for v in p);sections=ns['merge']([v for p in current for v in ns['section'](p,coordinate,start)]);out=[]
 for lo,hi in sections:
  a,b=((start,lo),(start,hi))if axis=='x'else((lo,start),(hi,start));cover=[i+1 for i,p in enumerate(previous)if state(a,p)==state(b,p)==1 and not any(cs['meet'](a,b,u,v)for u,v in cs['edges'](p))];out.append({'endpoints':[a,b],'strictlyInsidePreviousMaskPolygon':cover,'strictPreviousCovered':bool(cover)})
 contacts=[{'targetP':i+1,'previousP':j+1,'area':cs['contact'](a,b)}for i,a in enumerate(current)for j,b in enumerate(previous)]
 return {'initialCoordinate':start,'initialSections':out,'entireInitialSupportStrictInsidePreviousMask':bool(out)and all(x['strictPreviousCovered']for x in out),'positiveTargetPreviousIntersections':[x for x in contacts if x['area']>0],'targetFilledConnectivityClaimed':False,'previousMaskCompletionAndOpaqueDOMRequired':True}
results=[]
for pen,mask,first,alternate in [(1,2,'y',None),(12,2,'x','y')]:
 choices=[first]+([alternate]if alternate else[])
 for axis in choices:
  result=ns['audit_mask'](pen,mask,axis);result.update(mask=mask,targetMaskCount=1,nativeFailureObserved=True,policyAdopted=False);result['onsetPrior']=initial_sections(pen,mask,axis);result['axisAndStrictPriorOnsetConditionsPassed']=result['connectedPrefixSufficientConditionPassed']and result['onsetPrior']['entireInitialSupportStrictInsidePreviousMask'];results.append(result)
  if result['axisAndStrictPriorOnsetConditionsPassed']:break
def serial(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return{k:serial(x)for k,x in v.items()}
 if isinstance(v,(tuple,list)):return[serial(x)for x in v]
 return v
out={'schema':'hanja-local-sao-two-compound-axis-onsets/v1','glyph':'嫂','date':'2026-10-27','inputs':PINS,'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'coordinates':'Compiled exact100 source P; axis transforms for analysis only. No geometry edits.','newBatchExecutions':1,'results':results,'pointKernelFailuresPreserved':True,'oldSuccessfulFourMaskProofReexecuted':False,'sourceQOrPOrWeightsEdited':False,'policyAdopted':False,'originalMicroclockApproved':False,'engineRuns':0,'compilerRuns':0,'SSR':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(serial(out),ensure_ascii=False,indent=2))
