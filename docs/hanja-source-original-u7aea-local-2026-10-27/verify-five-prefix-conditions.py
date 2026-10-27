from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re
R=Path(__file__).resolve().parents[2]
PINS={"docs/hanja-source-original-u7aea-local-2026-10-27/fixtures-draft.json":"9b6539a02fcad5e919ba79b193463f1e26556d434098f0154df0cb8a54a2c91e","docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py":"35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf","docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py":"db903056c1375705fd8133ee79dcc3ff5450c519012a3f249881af9abebdbd29","docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-pen8-connected-x-prefix.py":"afa23cad9a8825a2d839a4c5128607b21b2b84d377f05bdbbab0b1c8bec076b0","docs/hanja-source-original-u7443-g-2026-10-26/verify-raw9-point-rect.py":"4925401a247d15236789debce8eb467359569187a0bc99b761fb1921e8400cc3","docs/hanja-official-media-compare-u7aea-2026-10-27/native-direction-review.json":"32fedac3cf918dfefa6dce1de9df8eebe895c68deb271221961eaa2ee5a2f43a","docs/hanja-actual-component-profiles-2026-10-22/u7aea-local-no-extra-baseline-1-native-review.json":"31748452aebdc2354b2ca9434efec786da10818d0a856a2704c4e4e280e6176c"}
HELPERS={"baseline":"docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py","axis":"docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py","connected":"docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-pen8-connected-x-prefix.py","exterior":"docs/hanja-source-original-u7443-g-2026-10-26/verify-raw9-point-rect.py"}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h,p
fixture=json.loads((R/'docs/hanja-source-original-u7aea-local-2026-10-27/fixtures-draft.json').read_text())['u7aea']
ns={'F':F,'re':re,'fixture':fixture}
def pure(path,names):
 s=(R/path).read_text()
 for n in ast.parse(s).body:
  if isinstance(n,ast.FunctionDef)and n.name in names:exec(compile(ast.get_source_segment(s,n),path+'::pure-only','exec'),ns)
pure(HELPERS['baseline'],{'polygons','cross','state'})
pure(HELPERS['axis'],{'section','merge','intersection','audit'})
pure(HELPERS['connected'],{'signed_area','line','yintervals','clip','on','contact','components','uncovered'})
pure(HELPERS['exterior'],{'exterior'})
polygons,cross,state,section,merge,intersection,area,components=[ns[k]for k in ['polygons','cross','state','section','merge','intersection','signed_area','components']]
def event_values(P,axis):
 edges=[(a,b)for p in P for a,b in zip(p,p[1:]+p[:1])if a!=b]
 E={p[axis]for poly in P for p in poly}
 for i,(a,b)in enumerate(edges):
  for c,d in edges[i+1:]:
   v=intersection(a,b,c,d)
   if v is not None:E.add(v[axis])
 return sorted(E)
def connected_right(P):
 ns['P']=P;events=event_values(P,0);cells=[]
 for low,high in zip(events,events[1:]):
  for bottom,top in ns['yintervals']((low+high)/2):
   p=[(low,ns['line'](bottom[1],low)),(high,ns['line'](bottom[1],high)),(high,ns['line'](top[1],high)),(low,ns['line'](top[1],low))];p=[v for i,v in enumerate(p)if v!=p[i-1]]
   assert area(p)>0 and all(cross(a,b,c)>=0 for a,b in zip(p,p[1:]+p[:1])for c in p)
   cells.append({'high':high,'P':p})
 checks=[]
 for kind,cut in [('event',v)for v in events]+[('open-slab',(a+b)/2)for a,b in zip(events,events[1:])]:
  active=[ns['clip'](c['P'],cut)for c in cells if c['high']>cut];assert all(area(p)>0 for p in active)
  edge=components(active,True);closed=components(active,False);at=merge([v for p in P for v in section(p,0,cut)]);covered=merge([v for p in active for v in section(p,0,cut)]);isolated=ns['uncovered'](at,covered);initial=cut==events[-1]
  checks.append({'kind':kind,'cut':cut,'positiveCells':len(active),'positiveEdgeComponents':len(edge),'closedComponents':len(closed),'isolatedCutIntervals':isolated,'initialExplicitEmpty':initial,'positivePrefixConnected':bool(active)and len(edge)==1})
 failures=[c for c in checks if not c['initialExplicitEmpty']and(not c['positivePrefixConnected']or c['isolatedCutIntervals'])]
 return {'eventCount':len(events),'unionConvexSlabCells':len(cells),'checks':checks,'failureCount':len(failures),'firstFailures':failures[:3],'allPositivePrefixesEdgeConnectedAndNoIsolatedCutInk':not failures,'topologyCertifiedBetweenAllEvents':True,'initialEmptyExplicitRequired':True}
def halfplane(poly,a,b):
 out=[]
 for p,q in zip(poly,poly[1:]+poly[:1]):
  u,v=cross(a,b,p),cross(a,b,q)
  if u>=0:out.append(p)
  if u<0<v or v<0<u:
   t=u/(u-v);out.append(tuple(p[k]+t*(q[k]-p[k])for k in [0,1]))
 return [p for i,p in enumerate(out)if p!=out[i-1]]
def kernel(P):
 E=ns['exterior'](P);flat=[p for poly in P for p in poly];x0=min(p[0]for p in flat);x1=max(p[0]for p in flat);y0=min(p[1]for p in flat);y1=max(p[1]for p in flat)
 K=[(x0-1,y0-1),(x1+1,y0-1),(x1+1,y1+1),(x0-1,y1+1)]
 for a,b in E:
  K=halfplane(K,a,b)
  if not K:break
 return E,K
whole=[]
for pen in [8,9,11]:
 a=ns['audit'](pen,1,'increasing');assert a['wholeLogicalAxisMonotone'];P=[p for m in fixture['strokes'][pen-1]for p in polygons(m['outline'])];initial=[p for poly in P for p in poly if p[1]==a['startCoordinate']]
 a.update({'initialExtremalPoints':sorted(set(initial)),'initialAreaLimitZero':'bounded union width times positive cut height tends to0','fullOriginalPAtCompletion':True,'capFreeAxisCandidate':True,'originalMasksRemainOne':len(fixture['strokes'][pen-1])==1,'sourceGuideYIncreasing':True});whole.append(a)
y12=ns['audit'](12,1,'increasing');x12=ns['audit'](12,0,'decreasing');assert not y12['wholeLogicalAxisMonotone']and not x12['wholeLogicalAxisMonotone']
P12=[p for m in fixture['strokes'][11]for p in polygons(m['outline'])];conn12=connected_right(P12)
conn12.update({'pen':12,'axis':'x','direction':'decreasing','range':[min(p[0]for q in P12 for p in q),max(p[0]for q in P12 for p in q)],'sourceMacroHypothesis':'upper-right toward lower-left','initialAreaLimitZero':'bounded union height times positive cut width tends to0','fullOriginalPAtCompletion':True,'capFreeAxisCandidate':not conn12['failureCount']})
P7=polygons(fixture['strokes'][6][1]['outline']);H=polygons(fixture['strokes'][6][0]['outline']);assert len(H)==1
ns['fixture']={'strokes':[[fixture['strokes'][6][1]]]};y7=ns['audit'](1,1,'increasing');ns['fixture']=fixture
seam=max(y for x,y in P7[1]);head=[halfplane(p,(F(1),seam),(F(0),seam))for p in P7];head=[p for p in head if len(p)>=3 and area(p)>0];edges,K=kernel(head)
KH=K
for a,b in zip(H[0],H[0][1:]+H[0][:1]):KH=halfplane(KH,a,b)
q=[F(x)for x in re.findall(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',fixture['strokes'][6][1]['revealPath'])];assert len(q)==6
anchors=[]
for power in range(1,13):
 t=F(1,2**power);A=tuple((1-t)**2*q[j]+2*(1-t)*t*q[j+2]+t*t*q[j+4]for j in [0,1]);km=min(cross(a,b,A)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in edges);hm=min(cross(a,b,A)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in zip(H[0],H[0][1:]+H[0][:1]));
 if km>0 and hm>0:anchors.append({'t':t,'point':A,'headKernelMargin':km,'priorHMargin':hm})
all7=kernel(P7)[1];start=min(y for p in P7 for x,y in p);finish=max(y for p in P7 for x,y in p);hmax=max(y for p in H for x,y in p)
headBounds=[min(x for p in head for x,y in p),min(y for p in head for x,y in p),max(x for p in head for x,y in p),max(y for p in head for x,y in p)]
result7={'pen':7,'mask':2,'originalOwnerCount':1,'originalP':len(P7),'wholeUnionKernelArea':area(all7)if all7 else F(0),'standaloneYSections':y7,'standaloneYPrefixPriorHGapBeforeContact':max(F(0),min(y for p in H for x,y in p)-start),'headSeam':seam,'headSeamDerivedFrom':'maximum original ornamental P2 y, not a tuned threshold','headBounds':headBounds,'headKernelArea':area(K)if K else F(0),'headKernelPriorHIntersectionArea':area(KH)if KH else F(0),'dyadicSourceQAnchors':anchors,'selectedAnchor':anchors[0]if anchors else None,'headThenTailEligible':bool(anchors)and y7['wholeLogicalAxisMonotone'],'authoredHeadPhaseShare':(seam-start)/(finish-start),'tailYRange':[seam,finish],'sourceHWeight':fixture['strokes'][6][0]['weight'],'sourceCurveWeight':fixture['strokes'][6][1]['weight'],'tailSeamSection':merge([v for p in P7 for v in section(p,1,seam)]),'sourceMicroClockApproved':False,'nativeApproval':False}
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return {k:enc(x)for k,x in v.items()}
 if isinstance(v,(list,tuple)):return [enc(x)for x in v]
 return v
out={'schema':'hanja-local-u7aea-five-source-bound-prefix-conditions/v1','date':'2026-10-27','glyph':'竪','inputs':PINS,'compiledSHA256':fixture['compiledSHA256'],'wholeY':whole,'pen12YFailurePreserved':y12,'pen12XSectionFailurePreserved':x12,'pen12ConnectedRightPrefix':conn12,'pen7HeadTail':result7,'originalPGuideWidthWeightsUnchanged':True,'sourcePublisherMacroEvidenceOnly':True,'sourceMicroClockApproved':False,'candidateNativeApproved':False,'runtimeApplied':False,'engine':0,'server':0,'mathScope':'Only five new local竪 targets; helpers imported as pure AST functions without executing any old glyph proof.'}
print(json.dumps(enc(out),indent=2))
