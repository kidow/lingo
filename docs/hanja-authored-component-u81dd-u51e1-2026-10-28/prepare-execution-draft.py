#!/usr/bin/env python3
# Exact mixed KAGE/body and HanziWriter/whole-Fan execution draft; no runtime registration.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from fractions import Fraction as Q
import hashlib,json,math,re
ROOT=Path(__file__).resolve().parents[2]
F='docs/hanja-authored-component-u81dd-u51e1-2026-10-28/'
INPUTS={'docs/hanja-authored-component-u81dd-u51e1-2026-10-28/recipe-v2-dot-separated.json': '7c000a640192336b7c4abedc6cd7aa0ab350dc0e7fdfbefe435cb9d13fc0c53d', 'docs/hanja-authored-component-u81dd-u51e1-2026-10-28/native-direct-mapping-review.json': '2db35841a230810d3ed12f7a8d9c47ba92e1e8f9f39722b89c30cc3ab79b5e42', 'docs/hanja-source-original-u51e1-hanzi-writer-2026-10-28/source-record.json': 'bf7eb962cade8ac5a157fae0dd63443bff3a05c3df05ba46081469410b9413ac', 'docs/hanja-source-original-u51e1-hanzi-writer-2026-10-28/upstream-code-license-capsule.json': '8001cd9fc7be4568158431637f087bb76730ac182165e1fe1c105319c7e79969', 'docs/hanja-goal-glyphwiki-batch530-2026-10-11/engine-proof.json': '5a1b0e13a70d35987f60603a526ca8b8ea6ed72a9e442ff63954edd23e8ae072', 'docs/hanja-goal-glyphwiki-batch530-2026-10-11/draw-trace.json': 'ede3d1753a067f45986a6b79a1cce12eb23e18f6352886765f444e6eacf755bb', 'docs/hanja-source-raw-compare-u81dd-u51e1-dot-separated-2026-10-28/native-static-review.json': '3a9787dfb697d26f9fb29d0498b0bef541feb8c67eff1c004e9ef47009fb9bf3', 'lib/hanja-stroke-outline.ts': 'b4d289d1911c4d43934dfad39c4cfbe22a246303bb7012114d16786688c36c40', 'components/hanja/stroke-outlines.tsx': 'cb4d80f57dbd8ad9815b5b90128ece5171a678a3b1c24e94956c2ac9fff91f88', 'docs/hanja-authored-mm-u5b7d-components-2026-10-28/reveal-start-gate-v3-check.json': '9d59920490e39f24ad48f6fdc6da4c448f67317f0ec198ce9b1a860f310ed1ac', 'docs/hanja-authored-donor-u97b9-u7f96-2026-10-28/prepare-execution-draft.mjs': 'e8bef330ac9b0d1fb207c2d6a1320cbf1d4712afb79398ad32dfa0334b14a2ab'}
def sha(raw):return hashlib.sha256(raw).hexdigest()
def compact(j):return json.dumps(j,ensure_ascii=False,separators=(',',':')).encode()
def read(path):return json.loads((ROOT/path).read_text())
def num(v):return format(float(v),'.17g')
def transform(m,p):
 x,y=map(Q,p);return[m[0]*x+m[2]*y+m[4],m[1]*x+m[3]*y+m[5]]
def source_commands(d):
 tokens=re.findall(r'[MLQCZ]|-?(?:\d*\.\d+|\d+)',d)
 assert ''.join(re.findall(r'[^\s,]',d))==''.join(tokens)
 rows=[];i=0
 while i<len(tokens):
  c=tokens[i];i+=1;assert c in ['M','L','Q','C','Z'];n={'M':2,'L':2,'Q':4,'C':6,'Z':0}[c]
  vals=list(map(Q,tokens[i:i+n]));i+=n;assert len(vals)==n
  rows.append((c,vals))
 assert rows[0][0]=='M'and rows[-1][0]=='Z'and sum(c=='M'for c,v in rows)==1
 return rows
def bbox(points):
 return [min(p[0]for p in points),min(p[1]for p in points),max(p[0]for p in points),max(p[1]for p in points)]
def placed_d(rows,m):
 output=[];points=[]
 for c,v in rows:
  mapped=[transform(m,p)for p in zip(v[::2],v[1::2])];points+=mapped
  output.append(c+(' '+' '.join(num(q)for p in mapped for q in p)if mapped else''))
 return ' '.join(output),bbox(points),points
def body_segment(call,logical,raw,primitive):
 ps=call['polygons'];assert ps and all(p['off']==0 for poly in ps for p in poly)
 oriented=[];reversed_count=0
 for poly in ps:
  area=sum(v['x']*poly[(i+1)%len(poly)]['y']-poly[(i+1)%len(poly)]['x']*v['y']for i,v in enumerate(poly));assert area!=0
  if area<0:poly=[poly[0]]+list(reversed(poly[1:]));reversed_count+=1
  oriented.append(poly)
 points=[[p['x']/2,p['y']/2]for poly in ps for p in poly]
 out={'outline':' '.join(' '.join(('M'if i==0 else'L')+num(p['x']/2)+' '+num(p['y']/2)for i,p in enumerate(poly))+' Z'for poly in oriented),'bounds':bbox(points)}
 n={'cdDrawLine':2,'cdDrawCurve':3,'cdDrawBezier':4}[call['kind']];guide=[[call['args'][2*i]/2,call['args'][2*i+1]/2]for i in range(n)]
 fact={'logical':logical,'raw':raw,'primitive':primitive,'kind':call['kind'],'sourceCallArgs':call['args'],'sourceControlPoints100':guide,'sourceFlags':call['args'][2*n:],'sourcePolygonsSHA256':sha(compact(ps)),'normalizationApplications':1,'normalization':'x/2,y/2 only','polygonTraversalReversedWithoutPointChange':reversed_count}
 if n==2:
  a,z=guide;out.update(direction=('down'if z[1]>a[1]else'up')if a[0]==z[0]else('right'if z[0]>a[0]else'left'),weight=math.dist(a,z));assert out['weight']>0
 else:
  a=guide[0];nxt=next(p for p in guide[1:]if p!=a);length=math.dist(a,nxt);u=[(nxt[i]-a[i])/length for i in [0,1]];pad=[a[i]-7*u[i]for i in [0,1]];tail=(' Q'if n==3 else' C')+' '.join(num(v)for p in guide[1:]for v in p);path='M'+num(pad[0])+' '+num(pad[1])+' L'+num(a[0])+' '+num(a[1])+tail;control=sum(math.dist(guide[i-1],guide[i])for i in range(1,n));weight=7+control+1e-9
  out.update(direction='curve',weight=weight,revealPath=path,revealWidth=14,revealStartGate={'unit':u,'minProjection':min(p[0]*u[0]+p[1]*u[1]for p in points),'firstProjection':a[0]*u[0]+a[1]*u[1],'padding':7,'until':7/weight,'bounds':out['bounds']})
  fact['policy']={'padding':7,'width':14,'weightMethod':'padding7 + source Bezier control-polygon upper bound +1e-9','sourceMicroclockEquivalent':False,'coverageApproved':False}
 return out,fact
def build():
 for path,h in INPUTS.items():assert sha((ROOT/path).read_bytes())==h,path
 recipe=read(F+'recipe-v2-dot-separated.json');native=read(F+'native-direct-mapping-review.json')
 assert native['body18RoleMappingSupported']is True and native['lastThreeRoleMappingSupported']is True and native['sourceAnimationReviewed']is False and native['registered']is False
 proof=read(recipe['sources']['recipientProof']['path']);trace=read(recipe['sources']['recipientTrace']['path']);doc=read(recipe['sources']['donor']['path']);D=doc['record']
 assert sha(doc['originalRecordJSON'].encode())==doc['originalRecordSHA256']and json.loads(doc['originalRecordJSON'])==D
 groups=native['retainedBodyRawGroupsZeroBased'];assert groups==[[0],[1],[2],[3],[4,5],[6],[7],[8,9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]]
 assert sorted(raw for row in groups for raw in row)==list(range(21))
 assert sha(compact(proof['groups'][:21]))==recipe['retainedBody']['groupsSHA256']and sha(compact(trace[:21]))==recipe['retainedBody']['traceSHA256']
 for raw in range(21):assert [p for call in trace[raw]for p in call['polygons']]==proof['groups'][raw]['polygons']
 strokes=[];facts=[]
 for logical,row in enumerate(groups,1):
  segments=[]
  for raw in row:
   for primitive,call in enumerate(trace[raw]):
    s,f=body_segment(call,logical,raw,primitive);segments.append(s);facts.append(f)
  strokes.append(segments)
 N=[Q(1,10),0,0,Q(-1,10),0,90]
 for i,part in enumerate(recipe['parts'][21:]):
  assert part['sourcePathOneBased']==part['sourceMedianOneBased']==i+1
  rows=source_commands(D['strokes'][i]);C=[Q(x)/2 for x in part['composedOriginalToRecipientMatrixExact']]
  outline,placed_bounds,placed_points=placed_d(rows,C);unplaced,source_bounds,source_points=placed_d(rows,N)
  median=[transform(N,p)for p in D['medians'][i]];a=median[0];nxt=next(p for p in median[1:]if p!=a);distance=math.dist(a,nxt);u=[float((nxt[j]-a[j])/Q(str(distance)))for j in [0,1]]
  # Original MM padding100/width200 becomes padding10/width20 in unplaced100 mask coordinates.
  padded=[float(a[j])-10*u[j]for j in [0,1]];path='M'+num(padded[0])+' '+num(padded[1])+' L'+' L'.join(' '.join(num(v)for v in p)for p in median)
  length=sum(math.dist(median[j-1],median[j])for j in range(1,len(median)));weight=10+length;assert weight>10
  A=list(map(Q,part['authoredPlacementMatrixExact']));T=[A[0],A[1],A[2],A[3],A[4]/2,A[5]/2]
  assert A[0]*A[3]-A[1]*A[2]>0
  # A acts after N200. N100 is half of N200, so translation alone scales by1/2.
  for p in [p for row in rows for p in zip(row[1][::2],row[1][1::2])]+[tuple(p)for p in D['medians'][i]]:
   assert transform(T,transform(N,p))==transform(C,p)
  gate={'unit':u,'minProjection':min(float(p[0])*u[0]+float(p[1])*u[1]for p in source_points),'firstProjection':float(a[0])*u[0]+float(a[1])*u[1],'padding':10,'until':10/weight,'bounds':[float(v)for v in source_bounds]}
  assert gate['minProjection']<gate['firstProjection']+gate['padding']
  segment={'outline':outline,'bounds':[float(v)for v in placed_bounds],'direction':'curve','weight':weight,'revealPath':path,'revealWidth':20,'revealTransform':'matrix('+' '.join(num(v)for v in T)+')','revealStartGate':gate}
  strokes.append([segment]);facts.append({'logical':i+19,'source':'HanziWriter original凡 whole','sourcePathOneBased':i+1,'sourceOriginalD':D['strokes'][i],'sourceOriginalDSHA256':sha(D['strokes'][i].encode()),'sourceOriginalMedian':D['medians'][i],'normalizationApplications':1,'normalizationMatrixExact':list(map(str,N)),'placedOutlineMatrixExact':list(map(str,C)),'maskOnlyTransformExact':list(map(str,T)),'sourceCommandSequence':[c for c,v in rows],'placedCommandSequence':[c for c,v in source_commands(outline)],'sourceCommandsAndBezierControlsNotFlattened':True,'maskCoordinates':'Unplaced source-normalized100; same affine as placed outline via revealTransform','paddingOriginalMM':100,'widthOriginalMM':200,'paddingSourceNormalized100':10,'widthSourceNormalized100':20,'polylineLengthSourceNormalized100':length,'displayWeight':weight,'originalOrPublisherTimingEquivalent':False,'sourceSpaceStartGateBounds':gate['bounds'],'placedBounds':segment['bounds'],'fullGuideCoverageApproved':False})
 assert len(strokes)==21 and sum(map(len,strokes[:18]))==25 and len(facts)==28
 assert all(s['weight']>0 and math.isfinite(s['weight'])and len(s['bounds'])==4 and all(math.isfinite(v)for v in s['bounds'])for row in strokes for s in row)
 fixture={'schema':'hanja-mixed-public-source-execution-draft/v1','date':'2026-10-28','glyph':'臝','variantId':'u81dd-kage-body18-fan3-separated-v2-execution-draft','locallyAuthoredRoot':True,'mixedParts':True,'originalWhole':False,'isOriginalEngineCapture':False,'sourceTraceDescribesAuthoredWhole':False,'inputSHA256':INPUTS,'recipe':{'path':F+'recipe-v2-dot-separated.json','SHA256':INPUTS[F+'recipe-v2-dot-separated.json']},'nativeRoleMappingEvidence':{'path':F+'native-direct-mapping-review.json','SHA256':INPUTS[F+'native-direct-mapping-review.json'],'scope':'ROOT direct roles/order/directions only; source animation/runtime not approved'},'sourceGrouping':{'bodyRawZeroBased':groups,'lastThreeOriginalFanPathOneBased':[1,2,3]},'normalization':{'body':'Original KAGE200→100 x/2,y/2 once; positive polygon traversal for same-primitive union preserves exact source points','fan':'Original D/control pairs mapped exactly by recipe composed matrix/2. M/L/Q/C/Z preserved; no flattening. Unplaced median mask uses N100 and source-affine revealTransform once.'},'temporalPolicy':'mixed-kage-padded7-width14-and-fan-source-affine-padded10-width20-unapproved','upstreamTimingEquivalenceClaim':False,'strokes':strokes,'approval':{'actualRenderer':False,'maskCoverage':False,'startAndTransition':False,'fineEnding':False,'replay':False,'native':False,'runtime':False}}
 check={'schema':'hanja-mixed-public-source-execution-draft-check/v1','date':'2026-10-28','status':'PASS-limited-source-and-transform-code-only','inputSHA256':INPUTS,'logicalPens':21,'segments':sum(map(len,strokes)),'KAGEBodyLogicalPens':18,'KAGEBodySourceRawGroups':21,'KAGEBodySourceCalls':25,'KAGECurveMasks':sum(s['direction']=='curve'for row in strokes[:18]for s in row),'FanSourcePaths':3,'FanMedianMasks':3,'facts':facts,'codeFacts':{'retainedKAGEPAndQAndFlagsPreserved':True,'sourceGeometryRepaintedOrInferred':False,'donorOriginalDAndMedianEdited':False,'BezierFlattened':False,'placedAndMaskFramesExactlyEqual':True,'existingSourceRoleMappingRecordPinned':True,'revealWidthOrTimingApproved':False},'remainingRisks':['Legacy cardinal and same-call multi-P decorations may reveal abruptly; all actual starts/compound boundaries need ROOT observation.','KAGE curve width14/padding7 is an author proposal; full-guide polygon coverage and actualR residuals are not yet approved.','Fan local width20/padding10 derives from original MM/HanziWriter source-space width200/radius100 policy, not publisher timing; anisotropic source affine scales the mask footprint.','Fan start gates and final full-guide coverage require numerical/native checks; exact coordinate binding alone is not sufficient.','Mixed font weight, slopes and spacing remain disclosed; direct static role support is not actualR playback approval.'],'nativeApproval':False,'runtimeApplied':False}
 return fixture,check
if __name__=='__main__':
 fixture,check=build();print(json.dumps({'logicalPens':check['logicalPens'],'segments':check['segments'],'KAGECurveMasks':check['KAGECurveMasks'],'FanMedianMasks':3,'sourceAndTransformChecks':'PASS','nativeApproval':False,'runtimeApplied':False}))
