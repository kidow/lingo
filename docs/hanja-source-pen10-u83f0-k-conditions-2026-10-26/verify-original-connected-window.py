#!/usr/bin/env python3
"""菰10 source-only contact, kernel limits and one prior-connected author-rect family."""
import ast
import hashlib
import json
import re
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
INPUT_PINS={
  "docs/hanja-source-original-full-u83f0-k-2026-10-23/engine-proof.json": "863677f60b148aa20c2db87336e8f1cd258b79dea32c41211846477876ae53b5",
  "docs/hanja-source-independent-melon-line-q-u83f0-k-source-experiment-2026-10-23/fixtures.json": "0c123ee5dfaa216583d5201a4dc998250fa6132986b6a91c2dfa187950d3cff6",
  "docs/hanja-source-pen10-u83f0-k-assessment-2026-10-23/evidence.json": "341a98b5d9b0d3b779790ecd1d8dd016ae3cd0b7d52769fc34160e6694867fcd",
  "docs/hanja-source-raw-compare-u83f0-k-2026-10-23/native-static-review.json": "1c004db0a85698efa956a27c0a07655bbf57af79508f226b305a4abbb52de446",
  "docs/hanja-official-media-compare-u83f0-2026-10-23/official-temporal-native-review.json": "08ab76a6600693b63663b7c6525314858112fa905b052df4c0009caf3c8d761c",
  "docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py": "95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396",
  "docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py": "62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b"
}
FULL='docs/hanja-source-original-full-u83f0-k-2026-10-23/engine-proof.json'
FIXTURE='docs/hanja-source-independent-melon-line-q-u83f0-k-source-experiment-2026-10-23/fixtures.json'
KERNEL_METHOD='docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py'
FINITE_METHOD='docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py'
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def area2(p):return sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(p,p[1:]+p[:1]))
def insideTri(v,a,b,c):return min(cross(a,b,v),cross(b,c,v),cross(c,a,v))>=0
def ears(p):
 p=list(p)
 if area2(p)<0:p.reverse()
 original=abs(area2(p));tri=[]
 while len(p)>3:
  found=False
  for i in range(len(p)):
   a,b,c=p[i-1],p[i],p[(i+1)%len(p)];turn=cross(a,b,c)
   if turn==0:
    p.pop(i);found=True;break
   if turn<0 or any(insideTri(v,a,b,c)for j,v in enumerate(p)if j not in[(i-1)%len(p),i,(i+1)%len(p)]):continue
   tri.append([a,b,c]);p.pop(i);found=True;break
  assert found,'exact ear stalled'
 if area2(p):tri.append(p)
 assert sum(abs(area2(t))for t in tri)==original
 return tri
def clip(subject,C):
 out=subject
 for a,b in zip(C,C[1:]+C[:1]):
  incoming,out=out,[]
  if not incoming:break
  s=incoming[-1]
  for e in incoming:
   cs,ce=cross(a,b,s),cross(a,b,e);si,ei=cs>=0,ce>=0
   if ei:
    if not si:
     t=cs/(cs-ce);out.append(tuple(s[k]+t*(e[k]-s[k])for k in[0,1]))
    out.append(e)
   elif si:
    t=cs/(cs-ce);out.append(tuple(s[k]+t*(e[k]-s[k])for k in[0,1]))
   s=e
 return out

def encode(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[encode(x)for x in v]
 if isinstance(v,dict):return{k:encode(x)for k,x in v.items()}
 return v

def polygon_state(v,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  c=cross(a,b,v)
  if c==0 and min(a[0],b[0])<=v[0]<=max(a[0],b[0])and min(a[1],b[1])<=v[1]<=max(a[1],b[1]):return 0
  if a[1]<=v[1]<b[1]and c>0:w+=1
  if b[1]<=v[1]<a[1]and c<0:w-=1
 return 1 if w else-1

def simple(poly):
 for i,(a,b)in enumerate(zip(poly,poly[1:]+poly[:1])):
  for j,(c,d)in enumerate(zip(poly,poly[1:]+poly[:1])):
   if j<=i or j==i+1 or(i==0 and j==len(poly)-1):continue
   if cross(a,b,c)*cross(a,b,d)<0 and cross(c,d,a)*cross(c,d,b)<0:return False
   for p,x,y in[(c,a,b),(d,a,b),(a,c,d),(b,c,d)]:
    if cross(x,y,p)==0 and min(x[0],y[0])<=p[0]<=max(x[0],y[0])and min(x[1],y[1])<=p[1]<=max(x[1],y[1]):return False
 return True

def cycle_key(poly):
 return min(tuple(s[i:]+s[:i])for s in[poly,list(reversed(poly))]for i in range(len(poly)))

def ordered_boundary(edges):
 nxt=dict(edges);assert len(nxt)==len(edges);start=min(nxt);v=start;poly=[]
 while v not in poly:poly.append(v);v=nxt[v]
 assert v==start and len(poly)==len(edges)and simple(poly)
 return poly

def exact_audits(full,method):
 n=next(n for n in ast.parse(method).body if isinstance(n,ast.FunctionDef)and n.name=='audit')
 code=ast.get_source_segment(method,n);needle="return{'raw':raw";assert code.count(needle)==1
 code=code.replace(needle,"return{'exteriorBoundary':sorted(boundary),'originalP':P,'raw':raw",1)
 ns={'F':F,'f':full};exec(compile(code,KERNEL_METHOD+'::audit-only','exec'),ns)
 q=ns['audit'](12)
 # Analysis of the union of untouched original polygons only; no authored source row/group is written.
 ns['f']={'groups':[{'polygons':full['groups'][10]['polygons']+full['groups'][11]['polygons']}],'trace':[[full['trace'][10][0]]]}
 whole=ns['audit'](1);whole.pop('raw');whole['sourceRawRowsOneBased']=[11,12]
 return q,whole

def finite_rect(boundary,A,bounds,method):
 P=ordered_boundary(boundary);E=list(zip(P,P[1:]+P[:1]));assert set(E)==set(boundary)
 names={'cross','state','merge','closed_line','fv','topology','enc','equation'}
 fn=[n for n in ast.parse(method).body if isinstance(n,ast.FunctionDef)and n.name in names];assert {n.name for n in fn}==names
 ax,ay=A;x0,y0,x1,y1=bounds;left,right,up,down=x0-ax,x1-ax,y0-ay,y1-ay
 ns={'F':F,'P':P,'E':E,'ax':ax,'ay':ay,'left':left,'right':right,'up':up,'down':down,'equations':[],'completeEvents':{F(0),F(1)},'eventReasons':{}}
 exec(compile(ast.Module(body=fn,type_ignores=[]),FINITE_METHOD+'::functions-only','exec'),ns)
 assert ns['state'](A)==1
 always=[]
 def add(kind,index,label,c0,c1):
  if not(c0 or c1):always.append((kind,index,label));return
  ns['equation'](kind,index,label,c0,c1)
 for i,v in enumerate(P):
  for axis,base,d,label in[(0,ax,left,'left'),(0,ax,right,'right'),(1,ay,up,'top'),(1,ay,down,'bottom')]:add('vertex-side',i,label,v[axis]-base,-d)
 for i,(a,b)in enumerate(E):
  for dx in[left,right]:
   for dy in[up,down]:add('corner-edge',i,(dx,dy),cross(a,b,A),(b[0]-a[0])*dy-(b[1]-a[1])*dx)
 events=sorted(ns['completeEvents']);closed=[ns['topology'](p)for p in events if p>0];opened=[ns['topology']((l+u)/2)for l,u in zip(events,events[1:])]
 bad=[v for v in closed+opened if not v['connected']or v['positiveAreaComponents']!=1 or v['boundaryOnly']]
 signs=[]
 for l,u in zip(events,events[1:]):
  m=(l+u)/2;sg=[]
  for kind,index,label,c0,c1 in ns['equations']:
   assert(c0+c1*l)*(c0+c1*u)>=0 and c0+c1*m!=0;sg.append(1 if c0+c1*m>0 else-1)
  signs.append({'interval':[l,u],'allAffineOrientationsConstantNonzero':True,'signSHA256':hashlib.sha256(json.dumps(sg,separators=(',',':')).encode()).hexdigest()})
 assert len(E)==25 and len(ns['equations'])==200 and len(events)==79 and len(closed)==len(opened)==78 and not bad and not always
 return{'anchor':A,'sourceBounds':bounds,'extents':[-left,right,-up,down],'exterior':P,'exteriorEdges':25,'equations':200,'alwaysCollinear':always,'events':events,'exactClosed':closed,'openIntervals':opened,'signCertificates':signs,'bad':bad,'allClosedConnectedPositiveAndNoZeroTail':True,'initialNewInkDiameterSquaredCoefficient':(x1-x0)**2+(y1-y0)**2}

def main():
 for p,h in INPUT_PINS.items():assert hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h,p
 full=json.loads((ROOT/FULL).read_text());fixture=json.loads((ROOT/FIXTURE).read_text())['u83f0-k'];segments=fixture['strokes'][9]
 assert fixture['fullProof']==full and len(segments)==2
 assert len(fixture['strokes'])==12 and sum(map(len,fixture['strokes']))==13
 assert [len(g['polygons'])for g in full['groups'][10:12]]==[2,3]
 Q0=tuple(F(str(x/2))for x in full['trace'][11][0]['args'][:2]);assert Q0==(F('46.2'),F('87.8425'))
 q,whole=exact_audits(full,(ROOT/KERNEL_METHOD).read_text());QP=q.pop('originalP');WP=whole.pop('originalP');QB=q['exteriorBoundary'];WB=whole['exteriorBoundary']
 assert all(simple(p)for p in WP)
 ordered_boundary(QB);ordered_boundary(WB);assert len(QB)==25 and len(WB)==29
 expectedP=[]
 for s in segments:
  for part in s['outline'].split('Z'):
   nums=re.findall(r'-?[0-9]+(?:\.[0-9]+)?',part)
   if nums:expectedP.append([(F(nums[i]),F(nums[i+1]))for i in range(0,len(nums),2)])
 assert [cycle_key(p)for p in expectedP]==[cycle_key(p)for p in WP]
 T=[ears(p)for p in WP];contacts=[]
 for i in range(5):
  for j in range(i+1,5):
   pieces=[clip(a,b)for a in T[i]for b in T[j]];area=sum((abs(area2(p))/2 for p in pieces if len(p)>=3),F(0));closed=any(p for p in pieces)
   contacts.append({'sourcePolygonIndices':[i+1,j+1],'areaNormalized100':area,'positiveArea':area>0,'closedContact':closed,'zeroAreaOnlyContact':closed and area==0})
 assert next(c for c in contacts if c['sourcePolygonIndices']==[1,3])['areaNormalized100']==F('387701/37520')
 assert q['strictUnionKernelPositiveArea'] and not whole['strictUnionKernelPositiveArea']
 maxKernelX=max(v[0]for v in q['kernelVertices']);priorMinX=min(v[0]for p in WP[:2]for v in p);gap=priorMinX-maxKernelX
 assert maxKernelX==F('3903211/74780') and priorMinX==F('243/4') and gap==F('319837/37390')>0
 A=(F('63.75'),F('84.5'));prior=WP[0];body=WP[2];assert polygon_state(A,prior)==polygon_state(A,body)==1
 delta=F(1,100);headMargin=min(abs(cross(a,b,A))/(abs(b[0]-a[0])+abs(b[1]-a[1]))for p in[prior,body]for a,b in zip(p,p[1:]+p[:1]))
 assert headMargin>delta
 for x in[A[0]-delta,A[0]+delta]:
  for y in[A[1]-delta,A[1]+delta]:assert polygon_state((x,y),prior)==polygon_state((x,y),body)==1
 bounds=tuple(F(str(v))for v in segments[1]['bounds']);finite=finite_rect(QB,A,bounds,(ROOT/FINITE_METHOD).read_text());assert min(finite['extents'])>delta
 exitP=F(13,152);x0,y0,x1,y1=bounds
 R=[(A[0]+(x-A[0])*exitP,A[1]+(y-A[1])*exitP)for x in[x0,x1]for y in[y0,y1]]
 assert all(polygon_state(v,prior)>=0 for v in R)
 exitPoint=(A[0],F('85.15'));exitMargin=min(abs(cross(a,b,exitPoint))/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in zip(body,body[1:]+body[:1]));assert polygon_state(exitPoint,body)==1 and exitMargin>delta
 old=json.loads((ROOT/'docs/hanja-source-pen10-u83f0-k-assessment-2026-10-23/evidence.json').read_text())
 out={
  'schema':'hanja-source-connected-author-rect-conditions/v1','date':'2026-10-26','glyph':'菰','root':'u83f0-k','logicalPen':10,'currentMask':2,'priorMask':1,
  'inputSHA256':INPUT_PINS,'script':{'path':str(Path(__file__).resolve().relative_to(ROOT)),'sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()},
  'source':{'actualFull5':FULL,'originalRawRows':14,'originalCalls':16,'originalPolygons':34,'sourceLogicalPens':12,'sourceMasks':13,'targetOriginalRawRowsOneBased':[11,12],'targetOriginalP':[2,3],'targetSegmentsUnchanged':segments,'geometrySHA256':'2b7c85d13238aa00e29782f314ef6ec26e87affe01c1c74f8a53ba7580506da4'},
  'reusedEvidence':{'officialOriginalDirectionFrames':36,'staticNativeScreens':14,'wholeAndStaticPassed':True,'newNativeOrEngineReplay':0,'macroDirectionConflict':False,'guideGapOriginal200':old['newSourceFactCheck']['result']['sourceLineToQGap'],'guideGapSquaredOriginal200':old['newSourceFactCheck']['result']['sourceLineToQGapSquared'],'guideGapOrDecorationFormulaRecalculated':False},
  'pairContacts':contacts,'sourcePolygonOrder':['Vbody','Vhead','Qbody','QleftTriangle1','QleftTriangle2'],'earTriangleCounts':[len(t)for t in T],
  'QOnlyKernel':q,'wholeVAndQKernel':whole,'existingCommonKernelPriorFamily':{'satisfiable':False,'QKernelMaximumX':maxKernelX,'completedPriorMinimumX':priorMinX,'strictSeparation':gap,'allOtherDisplayFamiliesImpossible':False},
  'candidateStrictHead':{'authorAnchor':A,'originalQ0':Q0,'anchorEqualsQ0':False,'anchorMinusQ0':[A[i]-Q0[i]for i in[0,1]],'distanceSquaredToQ0':sum((A[i]-Q0[i])**2 for i in[0,1]),'originalRadius7FamilyReused':False,'originalQ0OrGuideMoved':False,'commonPriorBodyAndQBodyBoxHalfWidth':delta,'boundaryLineLInfinityMarginLowerBound':headMargin,'scaledPositiveAreaLowerCoefficient':4*delta*delta,'scaledAreaFormula':'area(QP ∩ rect(p) ∩ completedV) >= p^2/2500 for all0<p<=1'},
  'finiteRectCandidate':finite,
  'firstExposureOutsidePrior':{'authoredLocalBoundary':exitP,'atBoundaryWholeRectInsidePrior':True,'strictQBodyPointAtPriorBottom':exitPoint,'strictBodyPointSupportMargin':exitMargin,'afterWitnessRule':'For p>13/152 choose epsilon=min((rectBottom(p)-85.15)/2,1/100); (63.75,85.15+epsilon) is inside Qbody and rect but below all completedV polygons. Positive neighboring area exists.','originalSourceClockOrActualFloatBoundaryApproval':False},
  'futureDisplayRequirements':['Preserve complete prior mask1 exact originalP2 opaque in the same owner and current frame before, during and after the current-mask rect update.','p0 must hide current Q ink; p1 must directly render exact original Q P3 without a clip; all four rect attributes must update together.','The existing full original guide and revealWidth14, both calculated weights and outer source mask shares remain unchanged. Only a separately named local author-frontier counter may drive this candidate.','This proves connected positive original-P intersections for the stated rectangle, not forward order matching publisher microtiming. The rect expands to both left original decorations and right body; native direction/release/finish checks remain mandatory.'],
  'scope':{'originalPConnected':True,'wholeCommonKernelEmptyNotGlobalImpossibility':True,'specificFiniteRectConditionsSatisfied':True,'closedSetAndPositiveAreaComponentsSeparatelyChecked':True,'sameQArcClockClaimed':False,'publisherForwardOrderProved':False,'AAOrUAEquivalent':False,'newPolicyOrRendererInstalled':False,'sourcePOrQOrWidthOrWeightChanged':False,'untrackedConnectedPrefixArtifactsReadOrUsed':False,'nativeApproved':False,'runtimeApplied':False,'engine':0,'projection':0,'server':0,'sharedFilesChanged':False}
 }
 print(json.dumps(encode(out),ensure_ascii=False,indent=2))

if __name__=='__main__':main()
