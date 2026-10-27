from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re
R=Path(__file__).resolve().parents[2]
FIXTURE='docs/hanja-source-original-u8587-local-components-2026-10-27/fixtures-draft.json'
PATH='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py'
AXIS='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py'
CONNECTED='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-pen8-connected-x-prefix.py'
DIRECTION='docs/hanja-official-media-compare-u8587-2026-10-27/native-direction-review.json'
PINS={FIXTURE:'da117bf26e5d70e342e5ab5ae44767e002d663f80da72c7b123b1a1522707fd5',PATH:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',AXIS:'db903056c1375705fd8133ee79dcc3ff5450c519012a3f249881af9abebdbd29',CONNECTED:'afa23cad9a8825a2d839a4c5128607b21b2b84d377f05bdbbab0b1c8bec076b0',DIRECTION:'fe3e50f322aaaa437add4c00eedfdc4e5921bdd16bfcccc50d54ee37c5dd0e5a'}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
fixture=json.loads((R/FIXTURE).read_text())['u8587'];directions=json.loads((R/DIRECTION).read_text())['directions']
ns={'F':F,'re':re}
for path,names in [(PATH,{'polygons','cross','state'}),(AXIS,{'section','merge','intersection'}),(CONNECTED,{'signed_area','line','yintervals','clip','on','contact','components','uncovered'})]:
 source=(R/path).read_text()
 for fn in ast.parse(source).body:
  if isinstance(fn,ast.FunctionDef) and fn.name in names:exec(compile(ast.get_source_segment(source,fn),path+'::pure-functions-only','exec'),ns)

def audit(pen,axis='x'):
 original=[p for mask in fixture['strokes'][pen-1] for p in ns['polygons'](mask['outline'])]
 P=original if axis=='x' else [[(-y,x) for x,y in p] for p in original]
 ns['P']=P
 edges=[(a,b) for p in P for a,b in zip(p,p[1:]+p[:1]) if a!=b]
 events={p[0] for poly in P for p in poly}
 for i,(a,b) in enumerate(edges):
  for c,d in edges[i+1:]:
   point=ns['intersection'](a,b,c,d)
   if point is not None:events.add(point[0])
 events=sorted(events);cells=[]
 for low,high in zip(events,events[1:]):
  for bottom,top in ns['yintervals']((low+high)/2):
   p=[(low,ns['line'](bottom[1],low)),(high,ns['line'](bottom[1],high)),(high,ns['line'](top[1],high)),(low,ns['line'](top[1],low))]
   p=[v for i,v in enumerate(p) if v!=p[i-1]]
   assert ns['signed_area'](p)>0 and all(ns['cross'](a,b,c)>=0 for a,b in zip(p,p[1:]+p[:1]) for c in p)
   cells.append({'low':low,'high':high,'P':p})
 checks=[]
 for kind,cut in [('event',v) for v in events]+[('open-slab',(a+b)/2) for a,b in zip(events,events[1:])]:
  active=[ns['clip'](c['P'],cut) for c in cells if c['high']>cut]
  assert all(ns['signed_area'](p)>0 for p in active)
  closed=ns['components'](active,False);positive=ns['components'](active,True)
  expected=ns['merge']([v for p in P for v in ns['section'](p,0,cut)])
  present=ns['merge']([v for p in active for v in ns['section'](p,0,cut)])
  isolated=ns['uncovered'](expected,present);initial=cut==events[-1]
  checks.append({'kind':kind,'cutInAnalysisAxes':cut,'positiveCells':len(active),'closedComponents':len(closed),'positiveEdgeComponents':len(positive),'isolatedCutIntervals':isolated,'initialExplicitEmptyRequired':initial,'connectedPositiveArea':bool(active) and len(positive)==1})
 failures=[c for c in checks if not c['initialExplicitEmptyRequired'] and (not c['connectedPositiveArea'] or c['isolatedCutIntervals'])]
 vertices=[v for p in P for v in p];low,high=events[0],events[-1];crossSpan=max(y for x,y in vertices)-min(y for x,y in vertices)
 return {'pen':pen,'sourceMasks':len(fixture['strokes'][pen-1]),'sourceP':len(original),'axis':axis,'direction':'decreasing' if axis=='x' else 'increasing','analysisTransform':'identity' if axis=='x' else '(-originalY,originalX), proof axes only','eventCount':len(events),'convexSlabCells':len(cells),'cutChecks':len(checks),'noninitialCutChecks':len(checks)-1,'maxClosedComponents':max(c['closedComponents'] for c in checks),'maxPositiveEdgeComponents':max(c['positiveEdgeComponents'] for c in checks),'noninitialIsolatedCutInkCases':sum(bool(c['isolatedCutIntervals']) for c in checks if not c['initialExplicitEmptyRequired']),'failureCount':len(failures),'firstFailures':failures[:4],'connectedPrefixSufficientConditionPassed':not failures,'nativeFailureObserved':False,'areaContinuity':{'sourceProjectionRange':[low,high],'crossAxisSpan':crossSpan,'areaBoundCoefficient':(high-low)*crossSpan,'bound':'area(prefix(p)) <= coefficient*p, p→0+','zeroExplicitEmptyRequired':True},'publisherMacro':next(d['direction'] for d in directions if d['pen']==pen),'sourceMicroclockApproved':False,'policyAdopted':False}

results=[]
for pen in (5,6):
 x=audit(pen);results.append(x)
 if not x['connectedPrefixSufficientConditionPassed']:results.append(audit(pen,'y'))
def encode(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return{k:encode(x) for k,x in v.items()}
 if isinstance(v,(list,tuple)):return[encode(x) for x in v]
 return v
out={'schema':'hanja-local-u8587-5-6-connected-prefix/v1','glyph':'薇','inputs':PINS,'newBatchedExecutions':1,'candidates':2,'newConnectedPrefixCases':len(results),'results':results,'sourcePOrQOrWidthOrWeightChanged':False,'oldSevenQKernelsReexecuted':False,'pen13TerminalProofReexecuted':False,'interpretation':'A connected-prefix result is weaker than single-section axis monotonicity. It is only a geometry family candidate until ROOT actual baseline observations; no failure or adoption is asserted.','actualFailuresAsserted':False,'nativeApproval':False,'runtimeApplied':False,'engine':0,'compiler':0,'server':0,'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
print(json.dumps(encode(out),ensure_ascii=False,separators=(',',':')))
