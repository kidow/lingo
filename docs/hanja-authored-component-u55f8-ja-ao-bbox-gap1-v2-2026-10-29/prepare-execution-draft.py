#!/usr/bin/env python3
# Proposed upstream-width source-polyline mask transported by explicit author affine.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from fractions import Fraction as F
import hashlib,json,math,importlib.util
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
INPUTS=json.loads("{\"docs/hanja-authored-component-u55f8-ja-ao-bbox-gap1-v2-2026-10-29/recipe.json\":\"ed39ebd1846cce96c8ce758dca0e8c745f4086015b9527d29ee390306fac6a9a\",\"docs/hanja-authored-component-u55f8-ja-ao-bbox-gap1-v2-2026-10-29/fixture-static-draft.json\":\"e2d9e162e7016f841d5c2070bd3ea27eaeca105b5ebd2c1fc53b41b5bc31ac67\",\"docs/hanja-authored-component-u55f8-ja-ao-bbox-gap1-v2-2026-10-29/native-static-review.json\":\"2e01a33199d56b37eccc597dead15b996b44e7a79ed0c10743cdb9eb735964f3\",\"docs/hanja-official-media-compare-u55f8-2026-10-29/native-clock-review.json\":\"ecca76701105be6524eea7d486c610ddc86a32a1b532e8e7d89caa660091b4ac\",\"docs/hanja-source-inventory-u55f8-2026-10-29/ao-donor-source-record.json\":\"5d3045fdd4793b30f6c7217048dbcfd49079c8dc3fc7078c8f6f5f786f4b8420\",\"docs/hanja-goal-glyphwiki-batch741-2026-10-12/engine-whole-u55f8.json\":\"a569a023239afa92474c47b5c530c4d5f7f244285e055e7a50fafc6086cc2070\",\"docs/hanja-authored-component-u81dd-u51e1-2026-10-28/prepare-execution-draft.py\":\"2020181cb1d346ad104cb53dd926326564bd9df7efbd75507a51d674996b3bff\"}")
BASE='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/prepare-execution-draft.py'
def sha(x):return hashlib.sha256(x).hexdigest()
def compact(v):return json.dumps(v,ensure_ascii=False,separators=(',',':')).encode()
def canonical(v):
 if isinstance(v,float)and v.is_integer():return int(v)
 if isinstance(v,list):return[canonical(x)for x in v]
 if isinstance(v,dict):return{k:canonical(x)for k,x in v.items()}
 return v
def build():
 for p,h in INPUTS.items():assert sha((ROOT/p).read_bytes())==h,p
 s=importlib.util.spec_from_file_location('ao_existing_geometry',ROOT/BASE);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
 r=json.loads((HERE/'recipe.json').read_text());static=json.loads((HERE/'native-static-review.json').read_text());assert static['approval']['static14RoleOrderCorrespondence']and not static['approval']['temporal']
 record=json.loads((ROOT/r['sourceRefs']['donor']['path']).read_text())['record'];src=json.loads((ROOT/r['sourceRefs']['recipient']['path']).read_text());assert len(record['strokes'])==len(record['medians'])==11
 M=list(map(F,r['authorChoice']['matrixFromDisplayExact']));C=[v/2 for v in map(F,r['authorChoice']['matrixFromOriginalYupExact'])];N=[F(1,10),0,0,F(-1,10),0,90];T=[5*M[0],0,0,5*M[3],M[4]/2,M[5]/2];assert T[0]>0 and T[3]>0
 strokes=[];facts=[];padding=6.4
 for i,(original,median)in enumerate(zip(record['strokes'],record['medians']),1):
  rows=b.source_commands(original);assert set(c for c,v in rows)<=set(['M','C','Z']);outline,bounds,placed_points=b.placed_d(rows,C);_,sourcebounds,sourcepoints=b.placed_d(rows,N);sourceMedian=[b.transform(N,p)for p in median]
  for p in[p for cmd,v in rows for p in zip(v[::2],v[1::2])]+[tuple(p)for p in median]:assert b.transform(T,b.transform(N,p))==b.transform(C,p)
  assert all(a!=z for a,z in zip(sourceMedian,sourceMedian[1:]));a=sourceMedian[0];z=sourceMedian[1];L=math.dist(a,z);u=[float(z[k]-a[k])/L for k in[0,1]];padded=[float(a[k])-padding*u[k]for k in[0,1]];guide='M'+' '.join(b.num(v)for v in padded)+' L'+' L'.join(' '.join(b.num(v)for v in p)for p in sourceMedian);length=sum(math.dist(a,z)for a,z in zip(sourceMedian,sourceMedian[1:]));weight=padding+length+1e-9
  segment={'outline':outline,'bounds':list(map(float,bounds)),'direction':'curve','weight':weight,'revealPath':guide,'revealWidth':12.8,'revealTransform':'matrix('+' '.join(b.num(v)for v in T)+')','revealStartGate':{'unit':u,'minProjection':min(float(p[0])*u[0]+float(p[1])*u[1]for p in sourcepoints),'firstProjection':float(a[0])*u[0]+float(a[1])*u[1],'padding':padding,'until':padding/weight,'bounds':list(map(float,sourcebounds))}};strokes.append([segment]);facts.append({'logical':i,'source':'originalAnimCJKJa敖','sourcePathOneBased':i,'sourceMedianOneBased':i,'sourceOriginalD':original,'sourceOriginalDSHA256':sha(original.encode()),'sourceOriginalMedian':median,'sourceCommandCount':len(rows),'sourceFilledCommandKinds':sorted(set(c for c,v in rows)),'sourceNormalizationExact':list(map(str,N)),'placedFilledMatrixExact':list(map(str,C)),'maskOnlyTransformExact':list(map(str,T)),'sourceControlBounds100':list(map(float,sourcebounds)),'sourceMedianPoints100':[[float(v)for v in p]for p in sourceMedian],'maskPolicy':'Original median polyline; original SVG source width128 normalized once to12.8; authored padding6.4/start gate and length-based weight. No cubic guide invented.','weightMethod':'6.4 + original median polyline length +1e-9 upper margin','sourceMicroclockEquivalent':False})
 for logical,raws in[(12,[13]),(13,[14,15]),(14,[16])]:
  row=[]
  for raw1 in raws:
   assert[p for c in src['trace'][raw1-1]for p in c['polygons']]==src['groups'][raw1-1]['polygons']
   for primitive,call in enumerate(src['trace'][raw1-1]):
    segment,fact=b.body_segment(call,logical,raw1-1,primitive);assert segment['direction']!='curve';row.append(segment);facts.append(dict(fact,source='originalrecipientmouth'))
  strokes.append(row)
 strokes=canonical(strokes);assert len(strokes)==14 and sum(map(len,strokes))==15 and sum(s['outline'].count('M')for row in strokes for s in row)==16
 pairs=[{'pen':13,'boundary':strokes[12][0]['weight']/sum(s['weight']for s in strokes[12]),'nextMask':2}]
 fixture={'schema':'hanja-authored-complete-donor-source-affine-execution-draft/v1','date':'2026-10-29','glyph':'嗸','variantId':'u55f8-completeJaAo11-gap1-source128-mask-draft','locallyAuthoredRoot':True,'mixedParts':True,'originalWhole':False,'isOriginalEngineCapture':False,'isActualLocallyAuthoredEngineCapture':False,'sourceTraceDescribesAuthoredWhole':False,'sourceTraceScope':'Fixed KAGE trace describes retained mouth4 raw only; original Ja donor11 D/medians have separate provenance.','inputSHA256':INPUTS,'sourceIdentity':r['sourceRefs'],'normalization':'Donor sourceN100 x/10,(900-y)/10 once; filled author-world200/2 once, exact T*N=C. Mouth200/2 once.','temporalPolicy':'unapproved-Ja-original-polyline-source128-width12.8-pad6.4-affine-and-original-mouth-cardinals','strokes':strokes,'approval':{'staticMacroRoles':True,'staticPlacement':True,'maskCoverage':False,'actualRenderer':False,'startAndTransition':False,'native':False,'runtime':False}}
 check={'schema':'hanja-authored-complete-donor-execution-draft-check/v1','glyph':'嗸','status':'PASS-source-membership-and-affine-frame-only','inputSHA256':INPUTS,'logicalPens':14,'segments':15,'filledSubpaths':16,'donorSourceAffineMasks':11,'cardinalMouthMasks':4,'expectedMaskCounts':list(map(len,strokes)),'geometrySHA256':sha(compact(strokes)),'curveTargets':[{'pen':i,'mask':1}for i in range(1,12)],'pairProgress':pairs,'facts':facts,'sourceNormalizationApplications':1,'sourceCControlsAndMediansFrameExactlyEquivalent':True,'originalDOrMedianChanged':False,'cubicGuideInvented':False,'newEngineRuns':0,'nativeApproval':False,'runtimeApplied':False,'remaining':['Fresh full-round coverage of original cubic fills against source polyline tubes; source SVG width is not app approval.','All14 actual strokes,11source gates/residuals,compound13 start and endings/replay remain unreviewed.']}
 return fixture,check
if __name__=='__main__':
 f,c=build();print(json.dumps({'pens':14,'masks':15,'P':16,'sourceAffine':11,'cardinal':4,'geometrySHA256':c['geometrySHA256'],'nativeApproval':False}))
