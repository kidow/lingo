import ast,json,hashlib
from pathlib import Path
from fractions import Fraction as F
B=Path(__file__).resolve().parents[2]
def read(p,h):
 b=(B/p).read_bytes();assert hashlib.sha256(b).hexdigest()==h,p;return b
utility='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py'
reuse='docs/hanja-display-contact-u9ea4-Q-2026-10-30/verify-independent-x-contact.py'
for p,h in[(utility,'945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea'),(reuse,'7b4df4a3645417484ba764427321733b1dd3de19755adf44d4d8fa2c3cb65e92')]:
 t=ast.parse(read(p,h).decode());exec(compile(ast.Module(body=[n for n in t.body if isinstance(n,ast.FunctionDef)],type_ignores=[]),p,'exec'))
import re
fixturePath='docs/hanja-source-mapping-u821d-vs0-original13-2026-10-30/fixtures-execution-draft.json';fixture=json.loads(read(fixturePath,'ac23edc46f2c28bf52744ed23ab3d208b5816e3f9b3a6008f0b1cc579e18f0bb'))
checkPath='docs/hanja-source-mapping-u821d-vs0-original13-2026-10-30/execution-draft-check.json';check=json.loads(read(checkPath,'d915a8da37abc381db51da4afec31698a6f80f602f2758e5950b5fe9862559e3'))
rows=[]
for pen in[9,12]:
 prior,seg=fixture['strokes'][pen-1];ps=parse(seg['outline']);vs=parse(prior['outline']);facts=[f for f in check['facts']if f['logical']==pen];assert len(facts)==2
 cut=F(str(facts[0]['sourceControlPoints100'][-1][0]));assert cut==(F(30)if pen==9 else F('22.5'))
 assert len(ps)==(3 if pen==9 else 2);assert len(vs)==(3 if pen==9 else 1)
 assert all(simple(q)and area2(q)>0 for q in ps+vs)
 xs=events(ps,[cut]);xmin,xmax=xs[0],xs[-1];assert xmin<cut<xmax
 probes=sorted(set(xs+[(a+b)/2 for a,b in zip(xs,xs[1:])]))
 sections=[(x,intervals(ps,x))for x in probes];assert all(len(s)==1 for x,s in sections)
 assert all(s[0][0]<s[0][1]for x,s in sections if xmin<x<xmax)
 qs=intervals(ps,cut);prev=intervals(vs,cut);joint=intersection(qs,prev);bands=[(a,b)for a,b in joint if a<b];assert bands
 band=max(bands,key=lambda a:a[1]-a[0]);seed=(cut,(band[0]+band[1])/2)
 assert all(any(relation(seed,p)==1 for p in poly)for poly in[ps,vs])
 clearance=min(distance2(seed,a,b)for q in ps+vs for a,b in edges(q));assert clearance>0
 unionArea=integral(ps,xs);headArea=integral(ps,[x for x in xs if x<=cut]);phase=headArea/unionArea;assert 0<phase<1
 crossEvents=events(ps+vs,[cut]);priorIntersection=integral(ps,crossEvents,vs);assert priorIntersection>0
 ylo=min(v[1]for q in ps for v in q);yhi=max(v[1]for q in ps for v in q)
 samples=[]
 for p in[F(0),F(1,10**6),F(1,100),F(1,20),F(1,10),phase-F(1,10**8),phase,phase+F(1,10**8),F(1,2),F(99999999,10**8),F(1)]:
  left=cut-(cut-xmin)*p/phase if p<=phase else xmin
  right=cut if p<=phase else cut+(xmax-cut)*(p-phase)/(1-phase)
  assert xmin<=left<=cut<=right<=xmax
  area=F(0)
  if p>0:
   cuts=[x for x in events(ps+vs,[left,right])if left<=x<=right];area=integral(ps,cuts,vs);assert area>0
  samples.append({'progressExact':str(p),'leftExact':str(left),'rightExact':str(right),'priorIntersectionAreaExact':str(area),'p0Hidden':p==0,'p1OriginalDirect':p==1})
 assert samples[0]['leftExact']==samples[0]['rightExact'];assert left==xmin and right==xmax
 rows.append({'pen':pen,'mask':2,'priorMask':1,'familyReference':'u9ea4-Q-left-head-right'if pen==9 else'u97ce-H-left-head-right','PCounts':{'current':len(ps),'prior':len(vs)},'sourceOutlineSHA256':hashlib.sha256(seg['outline'].encode()).hexdigest(),'priorOutlineSHA256':hashlib.sha256(prior['outline'].encode()).hexdigest(),'sourceFacts':facts,'cutX':float(cut),'cutXExact':str(cut),'anchorBasis':'Unchanged predecessor sourceguide endpoint x; no publisher-coordinate fit','boundsExact':list(map(str,[xmin,ylo,xmax,yhi])),'strictSeed':list(map(float,seed)),'strictSeedExact':list(map(str,seed)),'seedClearanceSquaredExact':str(clearance),'sourceSliceAtCutExact':[[str(a),str(b)]for a,b in qs],'priorSliceAtCutExact':[[str(a),str(b)]for a,b in prev],'contactBandExact':list(map(str,band)),'positiveContactLengthExact':str(band[1]-band[0]),'priorIntersectionAreaExact':str(priorIntersection),'sourceUnionAreaExact':str(unionArea),'leftHeadUnionAreaExact':str(headArea),'headPhaseExact':str(phase),'headPhaseBinary64':float(phase),'eventCountIncludingCut':len(xs),'openSlabs':len(xs)-1,'eventAndMidpointSections':len(probes),'allMergedSectionsSingleInterval':True,'allInteriorSectionsPositiveLength':True,'allSourcePolygonsSimplePositiveWinding':True,'allSourcePGuideFlagsWeightsAndOriginalBoundariesUnchanged':True,'originalJSBoundary':prior['weight']/(prior['weight']+seg['weight']),'probeClips':samples,'universalGrowthArgument':'Each nonempty x-strip includes cutX and a one-sided open neighborhood of the strict seed, so its intersection with completed opaque prior has positive area for every p>0. Every vertical fibre of the source union is one interval with positive length in the interior; the polygonal strip therefore stays connected while expanding left then right. Event and open-slab midpoint checks are exhaustive because polygon-edge order changes only at source vertices or edge intersections.','displayContract':{'oneColoredOriginalD':True,'p0HiddenZeroWidth':True,'p1ClipRemovedOriginalDOnce':True,'priorCompletedOpaqueExactSourceDRequired':True,'priorOwnerSameLogicalStrokeAndCurrentFrameRequired':True,'sourceGuideNotUsedAsNewAuthoredTrajectory':True,'headBodyClipIsDisplayOnly':True},'nativeApproval':False,'runtimeApplied':False})
print(json.dumps({'schema':'hanja-independent-original-P-contact-left-head-right-proof/v1','glyph':'舝','date':'2026-10-30','status':'PASS-exact-public-math-only','fixture':{'path':fixturePath,'SHA256':'ac23edc46f2c28bf52744ed23ab3d208b5816e3f9b3a6008f0b1cc579e18f0bb','geometrySHA256':'e86568deb0fdc4e077a603c6e20ee08778e786f91a17380e0dc66de5b2353d7a'},'proofInputs':{utility:'945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea',reuse:'7b4df4a3645417484ba764427321733b1dd3de19755adf44d4d8fa2c3cb65e92',checkPath:'d915a8da37abc381db51da4afec31698a6f80f602f2758e5950b5fe9862559e3'},'targets':rows,'limits':{'originalGuideGapsPreserved':[9,12],'nativeVisualBaselineHOLDRetained':True,'newHelperOrRenderer':False,'newFilledP':False,'newGuide':False,'newBridge':False,'privateSourceUsed':False,'displayMicroclockAuthored':True,'publisherMicroclockEquivalent':False,'runtimeApproved':False,'nativeApproved':False}},ensure_ascii=False))
