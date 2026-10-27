from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re
R=Path(__file__).resolve().parents[2]
FIXTURE='docs/hanja-source-original-u8587-local-components-2026-10-27/fixtures-draft.json'
PATH='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py'
AXIS='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py'
KERNEL='docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py'
DIRECTION='docs/hanja-official-media-compare-u8587-2026-10-27/native-direction-review.json'
PINS={FIXTURE:'da117bf26e5d70e342e5ab5ae44767e002d663f80da72c7b123b1a1522707fd5',PATH:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',AXIS:'db903056c1375705fd8133ee79dcc3ff5450c519012a3f249881af9abebdbd29',KERNEL:'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396',DIRECTION:'fe3e50f322aaaa437add4c00eedfdc4e5921bdd16bfcccc50d54ee37c5dd0e5a'}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
fixture=json.loads((R/FIXTURE).read_text())['u8587'];directions=json.loads((R/DIRECTION).read_text())['directions']
ns={'F':F,'re':re,'fixture':fixture}
for path,names in [(PATH,{'polygons','cross','state','margin','witness'}),(AXIS,{'section','merge','intersection','audit'})]:
 source=(R/path).read_text()
 for fn in ast.parse(source).body:
  if isinstance(fn,ast.FunctionDef) and fn.name in names:exec(compile(ast.get_source_segment(source,fn),path+'::pure-functions-only','exec'),ns)
polygons,cross,state,witness=[ns[k] for k in ('polygons','cross','state','witness')]
source=(R/KERNEL).read_text();fn=next(n for n in ast.parse(source).body if isinstance(n,ast.FunctionDef) and n.name=='audit')
kernelCode=ast.get_source_segment(source,fn).split('\n anchor=tuple',1)[0]+'\n return P,boundary,kernel'
def area(p):return abs(sum(a[0]*b[1]-a[1]*b[0] for a,b in zip(p,p[1:]+p[:1])))/2 if p else F(0)
def encode(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return{k:encode(x) for k,x in v.items()}
 if isinstance(v,(tuple,list)):return[encode(x) for x in v]
 return v
axisHypotheses={5:[(0,'decreasing'),(1,'increasing')],6:[(0,'decreasing'),(1,'increasing')],12:[(1,'increasing')],14:[(0,'decreasing'),(1,'increasing')],16:[(1,'increasing')],17:[(0,'increasing'),(1,'increasing')]}
axisResults={pen:[ns['audit'](pen,axis,direction) for axis,direction in hypotheses] for pen,hypotheses in axisHypotheses.items()}
results=[]
for pi,logical in enumerate(fixture['strokes']):
 for mi,segment in enumerate(logical):
  if not re.fullmatch(r'M[^A-Za-z]+Q[^A-Za-z]+',segment.get('revealPath','')):continue
  pen,mask=pi+1,mi+1;current=polygons(segment['outline'])
  prior=[p for old in fixture['strokes'][:pi] for s in old for p in polygons(s['outline'])]+[p for s in logical[:mi] for p in polygons(s['outline'])]
  previous=polygons(logical[mi-1]['outline']) if mi else []
  n=list(map(F,re.findall(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',segment['revealPath'])));assert len(n)==6 and segment['revealWidth']==14
  q0,control,q1=list(zip(n[::2],n[1::2]))
  public={'groups':[{'polygons':[[{'x':2*x,'y':2*y} for x,y in p] for p in current]}]}
  env={'F':F,'f':public};exec(compile(kernelCode,KERNEL+'::boundary-kernel-only','exec'),env);unused,boundary,kernel=env['audit'](1)
  tests=[]
  for t in (F(0),F(1,16),F(1,8),F(1,4)):
   point=tuple((1-t)**2*q0[k]+2*t*(1-t)*control[k]+t*t*q1[k] for k in (0,1))
   margins=[cross(a,b,point)/(abs(b[0]-a[0])+abs(b[1]-a[1])) for a,b in boundary if a!=b]
   tests.append({'t':t,'point':point,'strictTargetKernel':bool(kernel) and min(margins)>0,'kernelMinimumMargin':min(margins),'strictInsideSomeCompletedPriorP':any(state(point,p)==1 for p in prior),'strictInsidePreviousMaskP':any(state(point,p)==1 for p in previous),'outsideEveryCompletedPriorP':all(state(point,p)==-1 for p in prior),'onAnyPriorBoundary':any(state(point,p)==0 for p in prior)})
  positiveBox=witness(q0,current,prior)
  results.append({'pen':pen,'mask':mask,'sourceP':len(current),'sourceQ':segment['revealPath'],'sourceWidth':14,'publisherMacro':next(d['direction'] for d in directions if d['pen']==pen),'kernelArea':area(kernel),'Q0StrictTargetKernel':tests[0]['strictTargetKernel'],'Q0MinimumKernelMargin':tests[0]['kernelMinimumMargin'],'sourceDyadicsOnly':tests,'disk7NewInkBoxExcludingAllCompletedPriorP':positiveBox,'wholeLogicalAxisSufficientConditions':axisResults.get(pen,[]),'axisOmissionReason':'Complex source13 turns and terminal compatibility pending; final-H proof not replayed.' if pen==13 else None,'actualFailureObserved':False,'policyAdopted':False})
assert [(r['pen'],r['mask']) for r in results]==[(5,1),(6,1),(12,2),(13,3),(14,1),(16,1),(17,1)]
out={'schema':'hanja-local-u8587-Q-predictive-geometry/v1','glyph':'薇','inputs':PINS,'QMaskCount':7,'newQCases':7,'newWholeAxisCases':10,'results':results,'meaning':'Potential geometry conditions only; a disk7 box is not an observation of an actual animation failure. Positive source parameters are distinct authored starts, not original Q0. Prior P are a completed-ink hypothesis requiring actual DOM opacity before use.','boundaryJointKernelTestsDoNotApproveClock':True,'singleSectionAxisFailureDoesNotRuleOutConnectedPrefix':True,'priorGlyphMathOrTerminalProofReexecuted':False,'sourcePOrQOrWidthOrWeightChanged':False,'actualFailuresAsserted':False,'policyImplementation':False,'nativeApproval':False,'runtimeApplied':False,'engine':0,'compiler':0,'server':0,'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
print(json.dumps(encode(out),ensure_ascii=False,indent=2))
