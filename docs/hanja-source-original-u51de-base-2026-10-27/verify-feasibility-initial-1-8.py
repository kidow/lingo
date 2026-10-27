#!/usr/bin/env python3
"""Source-only exact feasibility; never approves native playback or changes geometry."""
from pathlib import Path
from fractions import Fraction as F
import ast, hashlib, json, re, sys
R=Path(__file__).resolve().parents[2]
D=Path(__file__).resolve().parent
PINS={
 'docs/hanja-source-original-u51de-base-2026-10-27/fixtures-draft.json':'623a80e6bbd7363bfb171731d60f730d9f9c412ec07a94afd3eccd7a30ed1255',
 'docs/hanja-goal-glyphwiki-batch1059-2026-10-13/engine-whole-u51de.json':'59adc1112c7e6456b67ecc86c6583f11475287bf71af5a8f0a6e429d5dddc91c',
 'docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py':'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',
 'docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py':'db903056c1375705fd8133ee79dcc3ff5450c519012a3f249881af9abebdbd29',
 'docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py':'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396',
 'docs/hanja-official-media-compare-u51de-2026-10-27/native-clock-review.json':'546aea0545adb15ef3fbea741da903881d3b4573b086b2432bf9a1581b33a7c5'}
def sha(b):return hashlib.sha256(b).hexdigest()
for path,pin in PINS.items():assert sha((R/path).read_bytes())==pin,path
fixture=json.loads((R/next(iter(PINS))).read_text())['u51de']
assert fixture['root']=='u51de' and fixture['compiledSHA256']=='c9ac1ef9b6c55526779f888cfd12f31622fad344ed20cbbf3dfa0dabee7caea1'
def pure(path,names,env):
 text=(R/path).read_text()
 for n in ast.parse(text).body:
  if isinstance(n,ast.FunctionDef) and n.name in names:exec(compile(ast.Module(body=[n],type_ignores=[]),path,'exec'),env)
env={'F':F,'re':re}
pure(list(PINS)[2],['polygons','cross','state'],env)
pure(list(PINS)[3],['section','merge','intersection','audit'],env)
polygons,cross,state,section,merge,intersection=[env[n]for n in ['polygons','cross','state','section','merge','intersection']]
kerneltext=(R/list(PINS)[4]).read_text()
kernelnode=next(n for n in ast.parse(kerneltext).body if isinstance(n,ast.FunctionDef)and n.name=='audit')
kernelcode=ast.get_source_segment(kerneltext,kernelnode).split('\n anchor=tuple',1)[0]+'\n return P,boundary,kernel'
def encode(v):
 if isinstance(v,F):return str(v.numerator) if v.denominator==1 else str(v)
 if isinstance(v,dict):return {k:encode(x)for k,x in v.items()}
 if isinstance(v,(list,tuple)):return [encode(x)for x in v]
 return v
def limits(pp,axis,sample,event):
 result=[]
 for poly in pp:
  hits=[]
  for a,b in zip(poly,poly[1:]+poly[:1]):
   if min(a[axis],b[axis])<sample<max(a[axis],b[axis]):
    def at(c):return a[1-axis]+(c-a[axis])*(b[1-axis]-a[1-axis])/(b[axis]-a[axis])
    hits.append((at(sample),at(event)))
  hits.sort()
  for a,b in zip(hits,hits[1:]):
   pt=[F(0),F(0)];pt[axis]=sample;pt[1-axis]=(a[0]+b[0])/2
   if state(tuple(pt),poly)==1:result.append(tuple(sorted((a[1],b[1]))))
 return merge(result)
def axisproof(segment,axis,direction):
 pp=polygons(segment['outline'])
 env['fixture']={'strokes':[[segment]]}
 result=env['audit'](1,axis,direction)
 edges=[(a,b)for p in pp for a,b in zip(p,p[1:]+p[:1])if a!=b]
 events={v[axis]for p in pp for v in p}
 for i,(a,b)in enumerate(edges):
  for c,d in edges[i+1:]:
   pt=intersection(a,b,c,d)
   if pt is not None:events.add(pt[axis])
 events=sorted(events);bad=[]
 for i,e in enumerate(events[1:-1],1):
  left=limits(pp,axis,(events[i-1]+e)/2,e);right=limits(pp,axis,(events[i+1]+e)/2,e)
  if not any(min(b,d)>max(a,c)for a,b in left for c,d in right):bad.append(e)
 result['positiveWidthInteriorEventBridges']=not bad
 result['zeroWidthBridgeEvents']=bad
 result['connectedPositivePrefixSufficient']=result['halfPlanePrefixGeometryEligible']and not bad
 result['sourceDirectionApproved']=False
 return result
AXES=[[(0,'increasing'),(1,'increasing')],[(1,'increasing')],[(0,'increasing'),(1,'decreasing')],[(1,'increasing')],[(0,'decreasing'),(1,'increasing')],[(0,'increasing')],[(1,'increasing')],[(0,'increasing')],[(1,'increasing')],[(0,'increasing')],[(1,'increasing')]]
MACROS=['DR dot','short DR/downstem then UR','D then DL','R','D','R then D','R','D']
rows=[];ai=0
for pi,stroke in enumerate(fixture['strokes'][:8],1):
 calls=[(raw+1,ci+1,c)for raw in fixture['sourceGroups'][pi-1]for ci,c in enumerate(fixture['fullProof']['trace'][raw])]
 assert len(calls)==len(stroke)
 prior=[]
 for mi,(segment,(raw,ci,call))in enumerate(zip(stroke,calls),1):
  pp=polygons(segment['outline']);kns={'F':F,'f':{'groups':[{'polygons':[[{'x':2*x,'y':2*y}for x,y in p]for p in pp]}]}}
  exec(kernelcode,kns);_,boundary,kernel=kns['audit'](1)
  if 'revealPath'in segment:
   nums=list(map(F,re.findall(r'[-+]?(?:[0-9]*[.][0-9]+|[0-9]+)(?:[eE][-+]?[0-9]+)?',segment['revealPath'])))
   points=list(zip(nums[::2],nums[1::2]))
  else:points=[tuple(F(str(v))/2 for v in call['args'][i:i+2])for i in (0,2)]
  def guide(t):
   work=points[:]
   while len(work)>1:work=[tuple((1-t)*a[k]+t*b[k]for k in (0,1))for a,b in zip(work,work[1:])]
   return work[0]
  seedchecks=[]
  for t in map(F,['0','1/64','1/32','1/16','1/8','1/4']):
   pt=guide(t);margin=min((cross(a,b,pt)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in boundary),default=F(-1))
   target=bool(kernel)and margin>0
   contact=any(state(pt,p)==1 for p in prior)if prior else None
   seedchecks.append({'t':t,'point':pt,'strictTargetKernelMarginL1':margin,'strictTargetKernel':target,'strictSameLogicalPriorInterior':contact})
  axes=[]
  for axis,direction in AXES[ai]:
   a=axisproof(segment,axis,direction)
   delta=[b[axis]-a[axis]for a,b in zip(points,points[1:])]
   a['guideControlDeltas']=delta
   a['guideAxisDirectionSufficient']=all(x>=0 for x in delta)if direction=='increasing'else all(x<=0 for x in delta)
   first=F(a['startCoordinate'])
   support=merge([i for p in pp for i in section(p,axis,first)])
   probes=[tuple([first,(lo+hi)/2]if axis==0 else [(lo+hi)/2,first])for lo,hi in support]
   a['firstSupportIntervals']=support
   a['firstSupportMidpointsStrictPriorInterior']=[any(state(v,p)==1 for p in prior)for v in probes]if prior else None
   a['policyReuseApproved']=False
   axes.append(a)
  hold=(pi,mi)in [(1,1),(2,1),(3,1),(2,2),(3,2)]
  rows.append({'pen':pi,'mask':mi,'sourceRaw':raw,'sourceCall':ci,'sourceKind':call['kind'],'sourceArgs':call['args'],'sourceSegmentSHA256':sha(json.dumps(segment,ensure_ascii=False,separators=(',',':')).encode()),'originalWeight':segment['weight'],'originalGuide':segment.get('revealPath'),'originalRevealWidth':segment.get('revealWidth'),'originalSourceFlags':call['args'][6:]if call['kind']=='cdDrawCurve'else call['args'][4:],'axisConditions':axes,'kernelVertexCount':len(kernel),'kernelBoundaryCount':len(boundary),'seedChecks':seedchecks,'sourceAnchorWitnessExists':any(c['strictTargetKernel']and c['strictSameLogicalPriorInterior']is not False for c in seedchecks),'nativeObservation':'HOLD: initial exposure or compound premature cap; root owns detailed observation'if hold else 'initial reviewed by root; no native approval granted','policyReuseApproved':False,'nativeApproval':False,'runtimeApplied':False})
  prior+=pp;ai+=1
assert len(rows)==11 and ai==11
out={'schema':'hanja-source-initial-feasibility/v1','glyph':'凞','root':'u51de','scope':{'logicalPens':[1,2,3,4,5,6,7,8],'masks':11},'inputs':PINS,'compiledSHA256':fixture['compiledSHA256'],'sourceClockMacros':MACROS,'clockAndMembership':'Previously verified evidence reused; no new approval or replay performed.','coordinateFrame':'Exact rational compiled 100-unit source polygons and unchanged source guides.','conditions':'Axis monotonicity and positive-width bridges are sufficient source-only prefix checks. Dyadic guide anchors are finite witnesses only; they do not certify an entire source window or native temporal behavior. A failed sufficient test is not proof that no correction exists.','masks':rows,'summary':{'axisAlternatives':sum(len(x['axisConditions'])for x in rows),'axisMonotoneAlternatives':sum(a['halfPlanePrefixGeometryEligible']for x in rows for a in x['axisConditions']),'connectedPrefixAlternatives':sum(a['connectedPositivePrefixSufficient']for x in rows for a in x['axisConditions']),'guideDirectionCompatibleAlternatives':sum(a['guideAxisDirectionSufficient']for x in rows for a in x['axisConditions']),'masksWithSourceAnchorWitness':sum(x['sourceAnchorWitnessExists']for x in rows),'nativeHoldMasks':[[x['pen'],x['mask']]for x in rows if x['nativeObservation'].startswith('HOLD')]},'preservation':'No P/Q/guide/flags/weights changed. Base u51de only; variant-k excluded.','nativeApproval':False,'runtimeApplied':False,'registrationAuthorized':False}
out=encode(out)
if '--emit' in sys.argv:print(json.dumps(out,ensure_ascii=False,indent=2))
else:
 target=D/'feasibility-initial-1-8.json'
 assert json.loads(target.read_text())==out,'feasibility snapshot mismatch'
 print(json.dumps({'PASS':True,'glyph':'凞','scope':out['scope'],'summary':out['summary'],'snapshotSHA256':sha(target.read_bytes()),'verifierSHA256':sha(Path(__file__).read_bytes()),'runtimeApplied':False},ensure_ascii=False))
