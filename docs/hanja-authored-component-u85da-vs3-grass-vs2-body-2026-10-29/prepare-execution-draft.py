#!/usr/bin/env python3
# Explicit mixed original-part display draft; no combined engine capture.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import importlib.util,json,hashlib,math
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
INPUTS=json.loads("{\"docs/hanja-authored-component-u85da-vs3-grass-vs2-body-2026-10-29/recipe.json\":\"33708a7b4b0bacee6c6ad730171895c802a60ef580554e01e463018d3786c719\",\"docs/hanja-authored-component-u85da-vs3-grass-vs2-body-2026-10-29/native-static-review.json\":\"8ed7a94db289a6b383f2efd24edbd74b2f96acb4d03b88c8deb38864c4001a88\",\"docs/hanja-authored-component-u85da-vs3-grass-vs2-body-2026-10-29/native-mapping-review.json\":\"8e5e6c2c739d93ac0112948b2326a2bf3e98e37ef9549fea59ed08a88bfa14e9\",\"docs/hanja-official-media-compare-u85da-2026-10-29/native-all19-review.json\":\"af0be368b41e892f4281727aed4bc385d434b524c8e4c27c5af755eb0705a381\",\"docs/hanja-goal-glyphwiki-batch665-2026-10-11/engine-whole-u85da-ue0103.json\":\"a9ef4fe7700ad3f2aeb00cc3703ce24b21e91e507a25022bfaecd7fafee0266e\",\"docs/hanja-goal-glyphwiki-batch665-2026-10-11/engine-whole-u85da-ue0102.json\":\"dad8074649c0b09e55ef04fb3108435690cd82cc518e7e4d3d99df224801cb1f\",\"docs/hanja-goal-glyphwiki-batch665-2026-10-11/sources.json\":\"765bdac54a4012a4d99654525eea60b548f3a7c27e9987f3c26df13b72ac0384\",\"docs/hanja-authored-component-u81dd-u51e1-2026-10-28/prepare-execution-draft.py\":\"2020181cb1d346ad104cb53dd926326564bd9df7efbd75507a51d674996b3bff\"}")
BASE='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/prepare-execution-draft.py'
def sha(b):return hashlib.sha256(b).hexdigest()
def compact(v):return json.dumps(v,ensure_ascii=False,separators=(',',':')).encode()
def build():
 for p,h in INPUTS.items():assert sha((ROOT/p).read_bytes())==h,p
 spec=importlib.util.spec_from_file_location('xu_existing_segment',ROOT/BASE);b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
 recipe=json.loads((HERE/'recipe.json').read_text());mapping=json.loads((HERE/'native-mapping-review.json').read_text())
 assert mapping['rolesAndDomesticOrderSupported'] and mapping['directionsSupportedByOriginalClockAndStatic'] and not mapping['candidateTemporalReviewed']
 src={k:json.loads((ROOT/v['path']).read_text())for k,v in recipe['sources'].items()if k in ['grass','body']}
 assert src['grass']['engineHashes']==src['body']['engineHashes'] and src['grass']['defaults']==src['body']['defaults']
 selected=[('grass',i)for i in range(4)]+[('body',i)for i in range(3,20)]
 groups=recipe['logicalRawGroupsOneBased'];assert groups==mapping['sourceRawGroupsOneBased'] and sorted(v for row in groups for v in row)==list(range(1,22))
 strokes=[];facts=[]
 for logical,row in enumerate(groups,1):
  segments=[]
  for raw1 in row:
   namespace,raw=selected[raw1-1];source=src[namespace]
   assert [p for c in source['trace'][raw]for p in c['polygons']]==source['groups'][raw]['polygons']
   assert len(source['trace'][raw])==1
   for primitive,call in enumerate(source['trace'][raw]):
    segment,fact=b.body_segment(call,logical,raw1-1,primitive);segments.append(segment)
    fact.update(sourceNamespace=namespace,sourceOriginalRawOneBased=raw+1,sourceCaptureSHA256=recipe['sources'][namespace]['SHA256'],canonicalRawOneBased=raw1,sourceCallSHA256=sha(compact(call)));facts.append(fact)
  strokes.append(segments)
 def canonical(v):
  if isinstance(v,float)and v.is_integer():return int(v)
  if isinstance(v,list):return[canonical(x)for x in v]
  if isinstance(v,dict):return{k:canonical(x)for k,x in v.items()}
  return v
 strokes=canonical(strokes)
 assert len(strokes)==19 and sum(map(len,strokes))==21 and len(facts)==21
 assert sum(s['outline'].count('M')for row in strokes for s in row)==33
 curves=[{'pen':p,'mask':m}for p,row in enumerate(strokes,1)for m,s in enumerate(row,1)if s['direction']=='curve'];assert curves==[{'pen':18,'mask':1},{'pen':19,'mask':1}]
 assert all(math.isfinite(s['weight'])and s['weight']>0 and all(math.isfinite(v)for v in s['bounds'])for row in strokes for s in row)
 pairs=[{'pen':p,'next':m+1,'progress':sum(s['weight']for s in row[:m])/sum(s['weight']for s in row)}for p,row in enumerate(strokes,1)for m in range(1,len(row))];assert[p['pen']for p in pairs]==[9,14]
 provenance={'sourceRefs':recipe['sources'],'sourceGrouping':groups,'selectedOriginalRaw':selected,'facts':facts,'normalization':'Original expanded world200 x/2,y/2 exactly once; source point values and guide/control order unchanged. Independent original polygon traversal normalized without point edits.','newEngineCalls':0,'newFilledPoints':0,'fakeBridge':False}
 fixture={'schema':'hanja-mixed-original-public-components-execution-draft/v1','date':'2026-10-29','glyph':'藚','variantId':'u85da-vs3grass-vs2body-source-start-draft','locallyAuthoredRoot':True,'mixedParts':True,'originalWhole':False,'isOriginalEngineCapture':False,'isActualLocallyAuthoredEngineCapture':False,'sourceTraceDescribesAuthoredWhole':False,'sourceTraceDescribesOriginalPartsOnly':True,'inputSHA256':INPUTS,'provenance':provenance,'temporalPolicy':'mixed-original-components-independent-cardinal-and-Q-padded7-width14-source-start-draft','upstreamTimingEquivalenceClaim':False,'strokes':strokes,'approval':{'originalMacroClock':True,'staticWholePlacement':True,'staticRolesAndOrder':True,'actualRenderer':False,'maskCoverage':False,'startAndTransition':False,'native':False,'runtime':False}}
 check={'schema':'hanja-mixed-original-public-components-execution-draft-check/v1','glyph':'藚','status':'PASS-source-membership-and-frame-code-only','inputSHA256':INPUTS,'logicalPens':19,'segments':21,'filledSubpaths':33,'curveMasks':2,'cardinalMasks':19,'curveTargets':curves,'pairProgress':pairs,'expectedMaskCounts':list(map(len,strokes)),'geometrySHA256':sha(compact(strokes)),'facts':facts,'preservation':{'all21CanonicalRawExactlyOnce':True,'grassOriginal1to4Complete':True,'bodyOriginal4to20Complete':True,'sourcePointGuideFlagOrPrimitiveOrderEdited':False,'sourceTraceCaptureSynthesized':False,'newEngineCalls':0,'sourceNormalizationApplications':1},'pending':['Fresh actual19 strokes/38initial/6compound-boundary/57ending, two curve gates/residuals and replay are required.','Original macro order and static placement do not establish source microclock identity.','Compound9/14 H-to-V source contact and serif initial growth require actual renderer review.'],'nativeApproval':False,'runtimeApplied':False}
 return fixture,check
if __name__=='__main__':
 f,c=build();print(json.dumps({'logicalPens':c['logicalPens'],'segments':c['segments'],'filledSubpaths':c['filledSubpaths'],'curveTargets':c['curveTargets'],'geometrySHA256':c['geometrySHA256'],'nativeApproval':False}))
