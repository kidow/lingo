#!/usr/bin/env python3
# One-mask width correction candidate; original mixed-source draft stays immutable.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import copy,hashlib,json,math
ROOT=Path(__file__).resolve().parents[2]
F='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/'
PREVIOUS={F+'prepare-execution-draft.py':'2020181cb1d346ad104cb53dd926326564bd9df7efbd75507a51d674996b3bff',F+'fixtures-execution-draft.json':'9121df7c77ee46f82f0080639b7c99553b82b58463bc45ae15eb18d77cf0b87e',F+'execution-draft-check.json':'c5ff5fd8f7ffabc911fa9a3b8de2a13f4b633592c7bea66bb9e3593a6580bbc8',F+'coverage-width-candidate-pen8-mask3.json':'25b0771458d8a19910470550e3ff95e578e7ff184e86064c3357a132ae6d5111'}
def sha(raw):return hashlib.sha256(raw).hexdigest()
def num(value):return format(float(value),'.17g')
def build():
 for path,h in PREVIOUS.items():assert sha((ROOT/path).read_bytes())==h,path
 original=json.loads((ROOT/(F+'fixtures-execution-draft.json')).read_text());previousCheck=json.loads((ROOT/(F+'execution-draft-check.json')).read_text());proof=json.loads((ROOT/(F+'coverage-width-candidate-pen8-mask3.json')).read_text())
 assert proof['width16InsufficientWitness']['confirmed']and proof['width18FullGuideSufficient']['coverage']['covered']
 fixture,check=copy.deepcopy(original),copy.deepcopy(previousCheck);s=fixture['strokes'][7][2];old=original['strokes'][7][2]
 fact=next(f for f in check['facts']if f.get('logical')==8 and f.get('raw')==9 and f.get('primitive')==1)
 guide=fact['sourceControlPoints100'];assert len(guide)==3 and fact['kind']=='cdDrawCurve'
 a=guide[0];nxt=next(p for p in guide[1:]if p!=a);length=math.dist(a,nxt);unit=[(nxt[i]-a[i])/length for i in[0,1]]
 assert unit==s['revealStartGate']['unit']and s['revealWidth']==14 and s['revealStartGate']['padding']==7
 control=sum(math.dist(guide[i-1],guide[i])for i in range(1,len(guide)));assert old['weight']==7+control+1e-9
 padded=[a[i]-9*unit[i]for i in[0,1]]
 s['revealPath']='M'+num(padded[0])+' '+num(padded[1])+' L'+num(a[0])+' '+num(a[1])+' Q'+' '.join(num(v)for p in guide[1:]for v in p)
 s['revealWidth']=18;s['weight']=9+control+1e-9;s['revealStartGate']['padding']=9;s['revealStartGate']['until']=9/s['weight']
 assert s['outline']==old['outline']and s['bounds']==old['bounds']
 for key in['unit','minProjection','firstProjection','bounds']:assert s['revealStartGate'][key]==old['revealStartGate'][key]
 for p,row in enumerate(fixture['strokes']):
  for m,segment in enumerate(row):
   if(p,m)!=(7,2):assert segment==original['strokes'][p][m]
 assert fixture['strokes'][18:]==original['strokes'][18:]
 inputs={**fixture['inputSHA256'],**PREVIOUS};fixture['inputSHA256']=inputs;check['inputSHA256']=inputs
 fixture['previousExecutionDraft']={'path':F+'fixtures-execution-draft.json','SHA256':PREVIOUS[F+'fixtures-execution-draft.json']}
 fixture['variantId']='u81dd-kage-body18-fan3-separated-v2-pen8mask3-width18-draft'
 fixture['temporalPolicy']='mixed-kage-padded7-except-pen8mask3-width18-pad9-and-fan-source-affine-padded10-width20-unapproved'
 fact['policy']={'padding':9,'width':18,'weightMethod':'padding9 + unchanged source Q control-polygon upper bound +1e-9','sourceMicroclockEquivalent':False,'coverageApproved':False,'fullGuideConservativeCoverageProof':{'path':F+'coverage-width-candidate-pen8-mask3.json','SHA256':PREVIOUS[F+'coverage-width-candidate-pen8-mask3.json']}}
 check['variantId']=fixture['variantId'];check['executionVariantDelta']={'pen':8,'mask':3,'sourceRawZeroBased':9,'sourcePrimitiveZeroBased':1,'previousWidth':14,'width':18,'previousPadding':7,'padding':9,'previousGuide':old['revealPath'],'newGuide':s['revealPath'],'sourceQControls100':guide,'controlPolygonLength':control,'weight':s['weight'],'until':s['revealStartGate']['until'],'originalFilledPUnchanged':True,'sourceQUnchanged':True,'sourceFlagsUnchanged':True,'otherSegmentsUnchanged':27,'otherLogicalPensUnchanged':20,'allThreeFanSourceTransformsUnchanged':True,'newGateReleaseNativeApproved':False}
 pairs=[]
 for p,row in enumerate(fixture['strokes'],1):
  total=sum(s['weight']for s in row);before=0
  for i,segment in enumerate(row[:-1],1):
   before+=segment['weight'];pairs.append({'pen':p,'nextMask':i+1,'boundary':before/total})
 check['maskBoundaryFractions']=pairs
 check['fullGuideCoverageStatus']={'width14PreviousOutlier':True,'width16AlsoInsufficient':True,'width18ConservativeCoverageSupported':True,'padding9FullGuideContainsOldPadding7Guide':True,'unchangedSevenCoveragePassesReused':True,'startGateAndNativeResidualUnapproved':True}
 check['remainingRisks']=['Changed8/mask3 width18/padding9 still needs actualR start/gate-release/compound-boundary/fine-ending/residual/replay review.','Unchanged seven masks reuse their existing fullround public coverage preflight; that is not temporal or raster approval.','Original mixed-source font weight and topology limitations remain; source microclock equivalence is not claimed.']
 assert len(fixture['strokes'])==21 and sum(map(len,fixture['strokes']))==28 and len(pairs)==7
 assert not any(fixture['approval'].values())and check['nativeApproval']is False and check['runtimeApplied']is False
 return fixture,check
if __name__=='__main__':
 f,c=build();print(json.dumps({'pen':8,'mask':3,'width':18,'padding':9,'weight':f['strokes'][7][2]['weight'],'until':f['strokes'][7][2]['revealStartGate']['until'],'otherMasksUnchanged':27,'maskBoundaries':len(c['maskBoundaryFractions']),'nativeApproval':False}))
