#!/usr/bin/env python3
# Existing mixed-public pipeline only; static mapping approved, temporal rendering unapproved.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from fractions import Fraction as Q
import importlib.util,json,hashlib,math
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
INPUTS=json.loads("{\"docs/hanja-authored-foodhead-u9917-u5341-2026-10-28/recipe-v2.json\":\"4748fc6619743e9b6b22a548a31f7ec8045d30c22534b012938a26c65dca2b96\",\"docs/hanja-authored-foodhead-u9917-u5341-2026-10-28/native-mapping-v2-review.json\":\"1c26be751bcf14f843f6601a372d3d7bb3077f3a57d586c7caf3efd3f39b7fb5\",\"docs/hanja-authored-foodhead-u9917-u5341-2026-10-28/native-static-v2-review.json\":\"dbf91f32b0db066299fd546b1a000c9dd9a97a388fc53ea5d8acf672bdb264e7\",\"docs/hanja-official-media-compare-u9917-2026-10-28/native-clock-review.json\":\"ffb16d1a77c5fad9367e7719d8b569c75c488bfd800186ef2999a9350770d6b4\",\"docs/hanja-actual-engine-capture-u9917-hkcs-2026-10-26/engine-whole-hkcs_m9917.json\":\"97bc730e03d4141f754b251af5e5baa1703a16975e02c9347af3d3f385ccd3b9\",\"docs/hanja-source-alternative-u9917-hkcs-2026-10-26/sources.json\":\"9d938b644c44643935f83e3f7c0915f93e2cf063c7ea1c0c9142b0c0f63d2656\",\"docs/hanja-authored-donor-u5b7d-u5341-mm-2026-10-28/donor-source-record.json\":\"ef9a8cc552dde368f0b7cfaf00960f994b9c05a9b42742ec26d18ffe89071336\",\"docs/hanja-authored-component-u81dd-u51e1-2026-10-28/prepare-execution-draft.py\":\"2020181cb1d346ad104cb53dd926326564bd9df7efbd75507a51d674996b3bff\",\"docs/hanja-authored-component-u81dd-u51e1-2026-10-28/coverage-preflight.py\":\"b11ec7c430d57ea00325e7ea0ba13b99bc852624a6874d5cd597c870bd2282a6\",\"lib/hanja-stroke-outline.ts\":\"b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40\",\"components/hanja/stroke-outlines.tsx\":\"cb4d80f57dbd8ad9815b5b90128ece5171a678a3b1c24e94956c2ac9fff91f88\"}")
BASE='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/prepare-execution-draft.py'
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):return json.loads((ROOT/p).read_text())
def compact(v):return json.dumps(v,ensure_ascii=False,separators=(',',':')).encode()
def build():
 for p,h in INPUTS.items():assert sha((ROOT/p).read_bytes())==h,p
 sp=importlib.util.spec_from_file_location('u9917_existing_mixed_geometry',ROOT/BASE);b=importlib.util.module_from_spec(sp);sp.loader.exec_module(b)
 r=read(str((HERE/'recipe-v2.json').relative_to(ROOT)));mapping=read(str((HERE/'native-mapping-v2-review.json').relative_to(ROOT)))
 assert mapping['rolesAndDomesticOrderSupported']and mapping['directionsSupportedByOriginalClockAndStatic']and mapping['candidateTemporalReviewed']is False
 groups=mapping['sourceRawGroupsOneBased'];assert groups==[[1],[2],[3],[5,6],[7],[8],[4],[9],[10],[11],[12],[13,14],[15],[16],[17],[18]]and sorted(v for row in groups for v in row)==list(range(1,19))
 source=read(r['sources']['recipient']['path']);doc=read(r['sources']['donor']['path']);D=doc['record'];assert sha(doc['originalRecordJSON'].encode())==doc['originalRecordSHA256']and json.loads(doc['originalRecordJSON'])==D
 assert sha(compact([g for i,g in enumerate(source['groups'])if i!=2]))==r['retained']['groupsSHA256']and sha(compact([g for i,g in enumerate(source['trace'])if i!=2]))==r['retained']['traceSHA256']
 for raw in range(18):assert[p for c in source['trace'][raw]for p in c['polygons']]==source['groups'][raw]['polygons']
 strokes=[];facts=[];N=[Q(1,10),0,0,Q(-1,10),0,90];M=list(map(Q,r['replacement']['matrixExact']));C=[v/2 for v in M];T=[5*M[0],5*M[1],-5*M[2],-5*M[3],450*M[2]+M[4]/2,450*M[3]+M[5]/2]
 for logical,row in enumerate(groups,1):
  segments=[]
  for raw1 in row:
   raw=raw1-1
   if raw!=2:
    for primitive,call in enumerate(source['trace'][raw]):
     segment,fact=b.body_segment(call,logical,raw,primitive);segments.append(segment);facts.append(fact)
   else:
    assert row==[3]and logical==3
    rows=b.source_commands(D['strokes'][0]);outline,placed_bounds,placed_points=b.placed_d(rows,C);_,source_bounds,source_points=b.placed_d(rows,N)
    median=[b.transform(N,p)for p in D['medians'][0]];a=median[0];nxt=next(p for p in median[1:]if p!=a);dist=math.dist(a,nxt);u=[float(nxt[i]-a[i])/dist for i in[0,1]];padded=[float(a[i])-10*u[i]for i in[0,1]]
    guide='M'+b.num(padded[0])+' '+b.num(padded[1])+' L'+' L'.join(' '.join(b.num(v)for v in p)for p in median);length=sum(math.dist(median[i-1],median[i])for i in range(1,len(median)));weight=10+length
    for p in[p for cmd,v in rows for p in zip(v[::2],v[1::2])]+[tuple(p)for p in D['medians'][0]]:assert b.transform(T,b.transform(N,p))==b.transform(C,p)
    assert T[0]*T[3]-T[1]*T[2]>0 and M[0]*M[3]-M[1]*M[2]<0
    gate={'unit':u,'minProjection':min(float(p[0])*u[0]+float(p[1])*u[1]for p in source_points),'firstProjection':float(a[0])*u[0]+float(a[1])*u[1],'padding':10,'until':10/weight,'bounds':[float(v)for v in source_bounds]}
    segment={'outline':outline,'bounds':[float(v)for v in placed_bounds],'direction':'curve','weight':weight,'revealPath':guide,'revealWidth':20,'revealTransform':'matrix('+' '.join(b.num(v)for v in T)+')','revealStartGate':gate};segments.append(segment)
    facts.append({'logical':3,'raw':2,'source':'Original public MM十 H1 replacing entireHKCSraw3','sourceOriginalD':D['strokes'][0],'sourceOriginalDSHA256':sha(D['strokes'][0].encode()),'sourceOriginalMedian':D['medians'][0],'sourceOriginalMedianSHA256':sha(compact(D['medians'][0])),'normalizationMatrixExact':list(map(str,N)),'placedOutlineMatrixExact':list(map(str,C)),'maskOnlyTransformExact':list(map(str,T)),'sourceCommandSequence':[cmd for cmd,v in rows],'sourceCommandsAndBezierControlsNotFlattened':True,'normalizationApplications':1,'maskCoordinates':'Original unplaced MM source-normalized100; exact source-affine transform transports both filled D and mask.','paddingSourceNormalized100':10,'widthSourceNormalized100':20,'displayWeight':weight,'upstreamTimingEquivalent':False,'fullGuideCoverageApproved':False})
  strokes.append(segments)
 assert len(strokes)==16 and sum(map(len,strokes))==18 and len(facts)==18
 assert sum(s['outline'].count('M')for row in strokes for s in row)==28
 assert sum('revealStartGate'in s for row in strokes for s in row)==5 and sum('revealTransform'in s for row in strokes for s in row)==1
 assert all(math.isfinite(s['weight'])and s['weight']>0 and all(math.isfinite(v)for v in s['bounds'])for row in strokes for s in row)
 fixture={'schema':'hanja-mixed-public-source-execution-draft/v1','date':'2026-10-28','glyph':'餗','variantId':'u9917-hkcs-body-MMtenH-v2-domestic16-execution-draft','locallyAuthoredRoot':True,'mixedParts':True,'originalWhole':False,'isOriginalEngineCapture':False,'isActualLocallyAuthoredEngineCapture':False,'sourceTraceDescribesAuthoredWhole':False,'sourceTraceScope':'Original KAGE trace describes only17 retained raw slots; MM donorH is separate source provenance.','inputSHA256':INPUTS,'recipe':{'path':str((HERE/'recipe-v2.json').relative_to(ROOT)),'SHA256':INPUTS[str((HERE/'recipe-v2.json').relative_to(ROOT))]},'nativeRoleMappingEvidence':{'path':str((HERE/'native-mapping-v2-review.json').relative_to(ROOT)),'SHA256':INPUTS[str((HERE/'native-mapping-v2-review.json').relative_to(ROOT))]},'sourceGrouping':{'rawGroupsOneBased':groups,'replacedRawOneBased':3,'donorOriginalPathOneBased':1},'normalization':{'KAGE':'Original200 to100 x/2,y/2 once; original points and primitive order retained, per-primitive positive polygon traversal for independent source union.','MMH':'Original D controls under explicit recipe matrix/2. Source median mask uses original N100 and exact invertible positive revealTransform; source y reflection occurs once only.'},'temporalPolicy':'unapproved-existing-KAGE-Q-padded7-width14-and-original-MM-H-source-affine-padded10-width20','upstreamTimingEquivalenceClaim':False,'strokes':strokes,'approval':{'actualRenderer':False,'maskCoverage':False,'startAndTransition':False,'fineEnding':False,'replay':False,'native':False,'runtime':False}}
 check={'schema':'hanja-mixed-public-source-execution-draft-check/v1','glyph':'餗','date':'2026-10-28','status':'PASS-source-membership-and-frame-code-only','inputSHA256':INPUTS,'logicalPens':16,'segments':18,'filledSubpaths':28,'KAGECurveMasks':4,'MMHSourceAffineMasks':1,'facts':facts,'codeFacts':{'allOriginalRaw18AccountedForExactlyOnceExceptReplaced3':True,'retained17Raw27PAndQAndFlagsPreserved':True,'donorOriginalDAndMedianEdited':False,'BezierFlattened':False,'sourceAndMaskFrameExactlyEquivalent':True,'sameNormalizationCount':1,'sourceClockOrderAndStaticMappingRecordPinned':True,'temporalOrWidthApproved':False},'remainingRisks':['All actual16 strokes/starts/compound4,12 transitions/endings require fresh root native review.','Four KAGE Q masks use proposedwidth14/padding7; fullround coverage and endpoint cap behavior are not approved.','DonorH source-local20/10 is an existing policy proposal transported by exact author affine, not original publisher timing.','StaticPASS and exact point-preservation do not approve new path growth, coverage, app UI or whole replay.'],'nativeApproval':False,'runtimeApplied':False}
 return fixture,check
if __name__=='__main__':
 fixture,check=build();print(json.dumps({'logicalPens':16,'segments':18,'filledSubpaths':28,'KAGECurveMasks':4,'MMHSourceAffineMasks':1,'sourceAndTransformChecks':'PASS','nativeApproval':False,'runtimeApplied':False}))
