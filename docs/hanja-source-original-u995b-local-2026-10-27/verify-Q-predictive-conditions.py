from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re,math
R=Path(__file__).resolve().parents[2];D=Path(__file__).resolve().parent
FIX='docs/hanja-source-original-u995b-local-2026-10-27/fixtures-draft.json'
PATH='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py'
AXIS='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py'
KERNEL='docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py'
CONTACT='docs/hanja-component-capture-u995b-2026-10-27/verify-compound-contact-facts.py'
PINS={FIX:'43c5479209823cc8d6a908098a56cb3ff18eb2d273f4e274c9011f821a4319b0',PATH:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',AXIS:'db903056c1375705fd8133ee79dcc3ff5450c519012a3f249881af9abebdbd29',KERNEL:'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396',CONTACT:'bb3f78ad4a38857a699a0c3a48b42c0e241ee1a7b5ce51dbb3aa5e063a47d9d5'}
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for p,h in PINS.items():assert sha(R/p)==h
fixture=json.loads((R/FIX).read_text())['u995b']
assert fixture['compiledSHA256']=='d661f0f15ef21322c84c0c8eeb5e9ea030e3ab705de8851e4d9b9233ef5b5238'
assert len(fixture['strokes'])==23 and sum(map(len,fixture['strokes']))==26
direction=fixture['directionEvidence'];assert sha(R/direction['path'])==direction['SHA256']
macros={v['pen']:v['direction']for v in direction['macroDirections']}
def load_pure(path,names,env):
 source=(R/path).read_text()
 for fn in ast.parse(source).body:
  if isinstance(fn,ast.FunctionDef)and fn.name in names:exec(compile(ast.get_source_segment(source,fn),path+'::pure-functions-only','exec'),env)
env={'F':F,'re':re,'fixture':fixture}
load_pure(PATH,{'polygons','cross','state'},env)
load_pure(AXIS,{'section','merge','intersection','audit'},env)
polygons,cross,state=[env[k]for k in['polygons','cross','state']]
kernel_source=(R/KERNEL).read_text();kernel_fn=next(n for n in ast.parse(kernel_source).body if isinstance(n,ast.FunctionDef)and n.name=='audit')
kernel_code=ast.get_source_segment(kernel_source,kernel_fn).split('\n anchor=tuple',1)[0]+'\n return P,boundary,kernel'
contact_env={'F':F}
load_pure(CONTACT,{'cross','area','edges','on','meet','poly','triangles','half_clip','intersect','contact'},contact_env)
def area(q):return abs(sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(q,q[1:]+q[:1])))/2 if q else F(0)
def qdata(segment):
 nums=list(map(F,re.findall(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',segment['revealPath'])))
 assert re.fullmatch(r'M[^A-Za-z]+Q[^A-Za-z]+',segment['revealPath'])and len(nums)==6 and segment['revealWidth']==14
 return list(zip(nums[::2],nums[1::2]))
def qpoint(q,t):return tuple((1-t)**2*q[0][k]+2*t*(1-t)*q[1][k]+t*t*q[2][k]for k in[0,1])
def encoded(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(tuple,list)):return[encoded(x)for x in v]
 if isinstance(v,dict):return{k:encoded(x)for k,x in v.items()}
 return v
axis_hypotheses={1:[(0,'decreasing'),(1,'increasing')],2:[(1,'increasing')],14:[(0,'decreasing'),(1,'increasing')],18:[(0,'decreasing'),(1,'increasing')],20:[(0,'decreasing'),(1,'increasing')],21:[(0,'decreasing'),(1,'increasing')],22:[(0,'decreasing'),(1,'increasing')],23:[(1,'increasing')]}
def short_axis(a):
 return{k:v for k,v in a.items()if k not in['firstFailures']}|{'firstFailure':a['firstFailures'][:1]}
axis={str(p):[short_axis(env['audit'](p,a,d))for a,d in hypotheses]for p,hypotheses in axis_hypotheses.items()}
partial=[]
for mask,axis_index,sign in[(0,1,'increasing'),(1,0,'decreasing')]:
 selected=list(fixture['strokes']);selected[18]=[fixture['strokes'][18][mask]]
 env['fixture']={'strokes':selected}
 result=short_axis(env['audit'](19,axis_index,sign));result.update({'maskOneBased':mask+1,'scope':'this mask only; never whole19','terminalMaskMayNotBePrematurelyRevealed':True});partial.append(result)
env['fixture']=fixture
results=[]
for pi,logical in enumerate(fixture['strokes']):
 for mi,segment in enumerate(logical):
  if pi+1 in[4,15]or not re.fullmatch(r'M[^A-Za-z]+Q[^A-Za-z]+',segment.get('revealPath','')):continue
  current=polygons(segment['outline']);q=qdata(segment)
  assert all(a!=b for p in current for a,b in zip(p,p[1:]+p[:1]))
  public={'groups':[{'polygons':[[{'x':2*x,'y':2*y}for x,y in p]for p in current]}]}
  kns={'F':F,'f':public};exec(compile(kernel_code,KERNEL+'::boundary-kernel-only','exec'),kns)
  unused,boundary,kernel=kns['audit'](1)
  assert boundary
  prior=[p for old in fixture['strokes'][:pi]for s in old for p in polygons(s['outline'])]+[p for s in logical[:mi]for p in polygons(s['outline'])]
  previous=[p for s in logical[:mi]for p in polygons(s['outline'])]
  tests=[]
  for t in[F(0),F(1,16),F(1,8),F(1,4)]:
   point=qpoint(q,t);margins=[cross(a,b,point)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in boundary if a!=b]
   m=min(margins)
   tests.append({'t':t,'point':point,'closedTargetKernel':bool(kernel)and m>=0,'strictTargetKernel':bool(kernel)and m>0,'minimumKernelMargin':m,'strictInsideSomeCompletedPriorP':any(state(point,p)==1 for p in prior),'strictInsidePreviousMaskP':any(state(point,p)==1 for p in previous),'onPreviousMaskBoundary':any(state(point,p)==0 for p in previous)})
  source_calls=[(raw+1,ci+1,c)for raw in fixture['sourceGroups'][pi]for ci,c in enumerate(fixture['fullProof']['trace'][raw])]
  assert len(source_calls)==len(logical);raw,call_index,call=source_calls[mi]
  assert call['kind']=='cdDrawCurve'and all(float(z)==v/2 for z,v in zip([v for pt in q for v in pt],call['args'][:-2]))
  results.append({'pen':pi+1,'mask':mi+1,'sourceRawOneBased':raw,'sourceCallOneBased':call_index,'actualCallKind':call['kind'],'maskPCount':len(current),'sourceQ':segment['revealPath'],'sourceWeightPreserved':segment['weight'],'sourceWidthPreserved':segment['revealWidth'],'publisherMacroReused':macros[pi+1],'unionVisibilityKernelArea':area(kernel),'Q0ClosedKernel':tests[0]['closedTargetKernel'],'Q0StrictKernel':tests[0]['strictTargetKernel'],'Q0MinimumMargin':tests[0]['minimumKernelMargin'],'sourceDyadics':tests,'actualFailureObserved':False,'policySelected':False})
assert [(x['pen'],x['mask'])for x in results]==[(1,1),(2,1),(14,1),(18,1),(19,1),(19,2),(20,1),(21,1),(22,1),(23,1)]
# New terminal19 analysis only. No prior4/15 compound geometry is recomputed.
m1,m2=fixture['strokes'][18]
pp=polygons(m1['outline']);tt=polygons(m2['outline'])
pair_polys=pp+tt
validated=[contact_env['poly']([{'x':x,'y':y,'off':0}for x,y in p])for p in pair_polys]
def shared_edges(a,b):
 out=[]
 for p,q in zip(a,a[1:]+a[:1]):
  if p==q:continue
  for z,w in zip(b,b[1:]+b[:1]):
   if z==w or cross(p,q,z)!=0 or cross(p,q,w)!=0:continue
   dim=0 if p[0]!=q[0]else 1
   low=max(min(p[dim],q[dim]),min(z[dim],w[dim]));high=min(max(p[dim],q[dim]),max(z[dim],w[dim]))
   if high<=low:continue
   u=(low-p[dim])/(q[dim]-p[dim]);v=(high-p[dim])/(q[dim]-p[dim])
   A=tuple(p[k]+u*(q[k]-p[k])for k in[0,1]);B=tuple(p[k]+v*(q[k]-p[k])for k in[0,1])
   out.append({'a':A,'b':B,'lengthSquared':sum((A[k]-B[k])**2 for k in[0,1])})
 return out
pairs=[];adj=[set()for p in validated]
for i in range(len(validated)):
 for j in range(i+1,len(validated)):
  ar=contact_env['contact'](validated[i],validated[j]);shared=shared_edges(validated[i],validated[j])
  connected=ar>0 or bool(shared)
  if connected:adj[i].add(j);adj[j].add(i)
  pairs.append({'a':['m1'if i<len(pp)else'm2',i+1 if i<len(pp)else i-len(pp)+1],'b':['m1'if j<len(pp)else'm2',j+1 if j<len(pp)else j-len(pp)+1],'positiveIntersectionArea':ar,'positiveAreaContact':ar>0,'positiveLengthSharedEdges':shared,'edgeOrAreaConnected':connected})
seen={0};todo=[0]
while todo:
 for j in adj[todo.pop()]-seen:seen.add(j);todo.append(j)
q1,q2=qdata(m1),qdata(m2);assert q1[-1]==q2[0]
terminal={'rawOneBased':21,'sourceCallKinds':[c['kind']for c in fixture['fullProof']['trace'][20]],'actualTwoQCallsNotLine':True,'guideEndpointExactlyShared':True,'joint':q2[0],'Q0StrictlyInsideSomePriorMaskP':any(state(q2[0],p)==1 for p in pp),'allOriginalFourPolygonsConnectedByPositiveAreaOrEdge':len(seen)==len(validated),'polygonContactGraph':pairs,'whole19YPrefixAnalyzed':False,'terminalMayOnlyBeAnalyzedAfterOriginalFirstMaskComplete':True,'actualOpaquePriorDOMRequiredForAnyFutureReuse':True,'temporalOrderOrClockApproved':False}
out={'schema':'hanja-local-u995b-Q-predictive-conditions/v1','glyph':'饛','date':'2026-10-27','inputs':PINS,'directionEvidence':direction,'compiledSHA256ProvidedByPinnedFixture':fixture['compiledSHA256'],'coordinateFrame':'Exact decimal/rational tokens of original compiled100-unit P/Q; raw/call binding uses exact original binary/2 compiler operation, no tolerance.','QMaskCountAnalyzed':len(results),'excludedPreviouslyAnalyzedPens':[4,15],'kernelResults':results,'wholeLogicalAxisConditions':axis,'separate19MaskAxisConditions':partial,'terminal19':terminal,'limits':['Single-section axis PASS is sufficient geometry only; FAIL does not rule out connected-prefix alternatives.','Kernel source-t conditions are potential facts and distinct author-clock proposals are not approved.','19 firstQ and terminalQ remain separate; no whole19Y prefix, early terminal exposure or line reclassification.','Publisher69 macro evidence does not approve candidate filled direction or source microclock.','Baseline actual generic failure has not been observed in this proof; adopt only after ROOT actual observation.'],'formerTwoCompoundMathReexecuted':False,'sourceP_Q_Bounds_WeightsChanged':False,'sourceDirectionApproved':False,'sourceClockApproved':False,'policyAdopted':False,'nativeApproval':False,'runtimeApplied':False,'engine':0,'server':0,'verifierSHA256':sha(Path(__file__))}
print(json.dumps(encoded(out),ensure_ascii=False,indent=2))
