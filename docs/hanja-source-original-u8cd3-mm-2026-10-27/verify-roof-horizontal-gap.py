from pathlib import Path
from fractions import Fraction as F
import re,json,hashlib
R=Path(__file__).resolve().parents[2]
D=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
p=D/'source-record.json';b=p.read_bytes()
assert sha(b)=='aa25aa8f242aa274e9b84665fffced381319a45e83af1b4a2657a88b440ab09a'
source=json.loads(b);record=source['record']
assert source['source']['wholeCorpusSHA256']=='a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee'
assert json.loads(source['originalRecordJSON'])==record
assert sha(source['originalRecordJSON'].encode())==source['originalRecordSHA256']
paths=[record['strokes'][2],record['strokes'][3]]
assert [sha(s.encode())for s in paths]==['927a9f73a33e1ce52f9554a61035673e62bc3221ffda3a9479242161e6989190','56a4cc4fec2d863f6d3f0565b9ea85c6da35dce2c99d13c14087e2c2cf493c46']
def parse(s):
 tokens=re.findall(r'[MLQCZ]|[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',s)
 assert re.sub(r'\s+','',s)==''.join(tokens)
 i=0;pos=None;start=None;segments=[];commands=[];zero_closes=0
 while i<len(tokens):
  cmd=tokens[i];i+=1;commands.append(cmd)
  assert cmd in 'MLQCZ'
  if cmd=='Z':
   assert i==len(tokens) and start is not None
   if pos!=start:segments.append((pos,start))
   else:zero_closes+=1
   pos=start;continue
  count={'M':2,'L':2,'Q':4,'C':6}[cmd]
  vals=[F(t)for t in tokens[i:i+count]];assert len(vals)==count;i+=count
  pts=tuple(zip(vals[::2],vals[1::2]))
  if cmd=='M':assert start is None;pos=start=pts[0]
  else:assert pos is not None;segments.append((pos,)+pts);pos=pts[-1]
 assert commands[0]=='M' and commands[-1]=='Z' and pos==start
 return segments,start,commands,zero_closes
A,anchorA,commandsA,closeA=parse(paths[0])
B,anchorB,commandsB,closeB=parse(paths[1])
def bounds(points):return(min(p[0]for p in points),max(p[0]for p in points),min(p[1]for p in points),max(p[1]for p in points))
def merge(curves):return bounds([p for c in curves for p in c])
def gap(a,b):return max(b[0]-a[1],a[0]-b[1],b[2]-a[3],a[2]-b[3])
def split(points):
 # Exact de Casteljau at t=1/2: the union of returned parameterized curves is the original curve.
 levels=[points]
 while len(levels[-1])>1:
  q=levels[-1];levels.append(tuple(((a[0]+b[0])/2,(a[1]+b[1])/2)for a,b in zip(q,q[1:])))
 return tuple(q[0]for q in levels),tuple(q[-1]for q in reversed(levels))
def span(q):b=bounds(q);return max(b[1]-b[0],b[3]-b[2])
globalA,globalB=merge(A),merge(B)
globalAxisGap=gap(globalA,globalB)
# Anchor of each connected closed boundary is strictly outside the other's total Bernstein control hull.
assert anchorA[0]<globalB[0]
assert anchorB[1]<globalA[2]
leaves=[];unresolved=[];max_depth=0;nodes=0
def investigate(a,b,ai,bi,ta=(F(0),F(1)),tb=(F(0),F(1)),depth=0):
 global max_depth,nodes
 nodes+=1;max_depth=max(max_depth,depth)
 aa,bb=bounds(a),bounds(b);g=gap(aa,bb)
 if g>0:leaves.append((ai,bi,ta,tb,aa,bb,g));return
 if depth>=24:unresolved.append((ai,bi,ta,tb,aa,bb));return
 if span(a)>=span(b):
  l,r=split(a);m=sum(ta)/2
  investigate(l,b,ai,bi,(ta[0],m),tb,depth+1)
  investigate(r,b,ai,bi,(m,ta[1]),tb,depth+1)
 else:
  l,r=split(b);m=sum(tb)/2
  investigate(a,l,ai,bi,ta,(tb[0],m),depth+1)
  investigate(a,r,ai,bi,ta,(m,tb[1]),depth+1)
for ai,a in enumerate(A):
 for bi,b in enumerate(B):investigate(a,b,ai+1,bi+1)
assert not unresolved
delta=min(x[-1]for x in leaves);assert delta>0
# Bernstein convex-hull containment certifies each leaf pair. Complete interval coverage follows binary partition.
serial=lambda x:[serial(v)for v in x]if isinstance(x,(tuple,list))else str(x)if isinstance(x,F)else x
leaf_bytes=json.dumps(serial(leaves),separators=(',',':')).encode()
proof={'schema':'hanja-original-MM-exact-Bernstein-gap-proof/v1','glyph':'賓','date':'2026-10-27',
 'inputs':{'sourceRecordSHA256':sha(p.read_bytes()),'originalRecordSHA256':source['originalRecordSHA256'],'verifierSHA256':sha(Path(__file__).read_bytes()),'sourceStrokeOneBased':[3,4],'originalPathSHA256':[sha(s.encode())for s in paths]},
 'verificationExecutionHistory':{'priorAttempt':'All geometry assertions completed; JSON serialization failed because the segment loop shadowed source-bytes variable b. Only source hash serialization reference was corrected.','priorCompleteResultOutputs':0,'finalResultExecution':1,'geometryInputsOrAlgorithmChangedForRetry':False},
 'coordinateSystem':'Original Make Me a Hanzi source coordinates exactly; no normalization, reflection, scale or component parent transform.',
 'segments':{'source3':len(A),'source4':len(B),'source3Commands':commandsA,'source4Commands':commandsB,'zeroLengthClosingEdgesPreservedAsAlreadyCoveredEndpoints':[closeA,closeB]},
 'initialGlobalAxisGap':str(globalAxisGap),'method':'Exact rational Bernstein control-hull rectangles and exact midpoint de Casteljau subdivision; no sampled polyline or curve replacement.',
 'boundaryCertificate':{'originalSegmentPairs':len(A)*len(B),'binaryTreeNodes':nodes,'strictSeparatedLeafPairs':len(leaves),'unresolvedLeafPairs':0,'maximumSubdivisionDepth':max_depth,'leafPartitionSHA256':sha(leaf_bytes),'minimumLeafLInfinityGapLowerBound':str(delta),'EuclideanGapAtLeastThisValue':str(delta),'allOriginalParameterIntervalsCovered':True},
 'filledRegionCertificate':{'anchorSource3':[str(v)for v in anchorA],'otherControlMinX':str(globalB[0]),'source3AnchorStrictXOutsideGap':str(globalB[0]-anchorA[0]),'anchorSource4':[str(v)for v in anchorB],'otherControlMinY':str(globalA[2]),'source4AnchorStrictYOutsideGap':str(globalA[2]-anchorB[1]),'argument':'Each entire connected boundary is disjoint from the other, and its displayed anchor lies outside the other total control-hull box, hence has winding number zero. Winding number is constant along a disjoint connected boundary. An overlapping bounded open filled cell would have a boundary on one original curve while the other winding is nonzero there, contradicting zero winding on both boundaries. Thus the compact filled supports are disjoint; their minimum separation is attained on the boundaries and is at least the certified boundary lower bound. This applies to both nonzero and evenodd fill rules.','filledSupportStrictlyDisjoint':True,'positiveAreaIntersection':False,'boundaryContact':False,'gapLowerBound':str(delta)},
 'originalQ_C_OrCoordinatesChanged':False,'curveApproximationUsed':False,'fullIntersectionAreaNumericallyEstimated':False,'sourceDirectionOrWholeFitApproved':False,'historicalCenterlineApprovalTransferred':False,'componentReuseOrHanja8819UseApproved':False,'nativeApproval':False,'runtimeApplied':False,'engineRuns':0}
print(json.dumps(proof,ensure_ascii=False,indent=2))
