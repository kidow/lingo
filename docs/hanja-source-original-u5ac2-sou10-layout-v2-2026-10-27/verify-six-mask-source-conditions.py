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
axisResults=[]
for pen,mask,axis in [(1,1,'y'),(2,1,'y'),(4,1,'x'),(13,1,'y')]:
 result=ns['audit_mask'](pen,mask,axis);result.update(mask=mask,targetMaskCount=1,nativeFailureObserved=True,policyAdopted=False,scope='Only this original mask P; other masks remain separate and use their own original clocks until explicit policy/native review');axisResults.append(result)
source=(R/KERNEL).read_text();fn=next(n for n in ast.parse(source).body if isinstance(n,ast.FunctionDef)and n.name=='audit');kernelCode=ast.get_source_segment(source,fn).split('\n anchor=tuple',1)[0]+'\n return P,boundary,kernel'
polygons,cross,state,margin=[ns[k]for k in ['polygons','cross','state','margin']]
def area(p):return abs(sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(p,p[1:]+p[:1])))/2 if p else F(0)
pointResults=[]
for pen,mask in [(1,2),(12,2)]:
 segment=fixture['strokes'][pen-1][mask-1];current=polygons(segment['outline']);previous=[p for s in fixture['strokes'][pen-1][:mask-1]for p in polygons(s['outline'])];n=list(map(F,re.findall(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',segment['revealPath'])));assert len(n)==6 and segment['revealWidth']==14;q0,control,q1=list(zip(n[::2],n[1::2]));public={'groups':[{'polygons':[[{'x':2*x,'y':2*y}for x,y in p]for p in current]}]};env={'F':F,'f':public};exec(compile(kernelCode,KERNEL+'::pure-boundary-kernel-only','exec'),env);_,boundary,kernel=env['audit'](1);tests=[]
 for t in [F(0),F(1,128),F(1,64),F(1,32),F(1,16),F(1,8),F(1,4)]:
  point=tuple((1-t)**2*q0[k]+2*t*(1-t)*control[k]+t*t*q1[k]for k in [0,1]);km=min(cross(a,b,point)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in boundary if a!=b);prior=[(i+1,margin(point,p))for i,p in enumerate(previous)if state(point,p)==1];valid=bool(kernel)and km>0 and bool(prior);selected=max(prior,key=lambda x:x[1])if prior else None;radius=min(km,selected[1])/4 if valid else F(0);tests.append({'sourceT':t,'point':point,'strictUnionTargetKernel':bool(kernel)and km>0,'minimumKernelMargin':km,'strictInsidePreviousMaskP':bool(prior),'priorPAndMargin':prior,'positiveBoxRadiusLInfinity':radius,'positiveBoxArea':4*radius*radius,'strictKernelAndPreviousMaskBox':valid and radius>0})
 chosen=next((x for x in tests if x['strictKernelAndPreviousMaskBox']),None);pointResults.append({'pen':pen,'mask':mask,'sourceP':len(current),'sourceGuide':segment['revealPath'],'originalWidth':14,'publisherMacro':next(d['direction']for d in directions if d['pen']==pen),'unionKernelArea':area(kernel),'sourceDyadics':tests,'firstProvenDyadic':chosen,'priorDOMMustBeExactOpaqueSameOwnerCompletedMask':True,'newAuthoredClockRequired':True,'Q0ClockEquivalenceApproved':False,'policyAdopted':False,'nativeFailureObserved':True})
def serial(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return{k:serial(x)for k,x in v.items()}
 if isinstance(v,(list,tuple)):return[serial(x)for x in v]
 return v
out={'schema':'hanja-local-sao-six-mask-source-conditions/v1','glyph':'嫂','date':'2026-10-27','inputs':PINS,'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'normalizedSourceCoordinates':'Exact compiled100 P from unchanged captured200 P /2; proof-axis transforms only, no geometry edit.','newBatchExecutions':1,'axisMaskCases':axisResults,'compoundPointCases':pointResults,'sourcePGuideWeightsEdited':False,'pastGlyphProofBodiesExecuted':False,'rendererOrPolicyImplemented':False,'authorClockNotPublisherMicroclock':True,'engineRuns':0,'compilerRuns':0,'SSR':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(serial(out),ensure_ascii=False,indent=2))
