import ast,json,hashlib,math
from pathlib import Path
from fractions import Fraction as F
B=Path(__file__).resolve().parents[2]
HELPER='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py';assert hashlib.sha256((B/HELPER).read_bytes()).hexdigest()=='945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea'
tree=ast.parse((B/HELPER).read_text());exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)],type_ignores=[]),HELPER,'exec'))
FP="docs/hanja-authored-engine-u91bc-pen5-terminal0-2026-10-29/engine-authored-pen5-terminal0.json";assert hashlib.sha256((B/FP).read_bytes()).hexdigest()=='1b9a63002d478c88338bb6fce74eaae51dc377461742b9f1318fe28367b50cda';f=json.loads((B/FP).read_text())
def polygons(c):return [clean([(F(str(v['x']))/2,F(str(v['y']))/2)for v in p])for p in c['polygons']]
def contacts(left,right):
 cells=[]
 for p in left:
  for q in right:
   for t in ears(p):
    for u in ears(q):
     c=clip(t,u);a=abs(area2(c))/2
     if a:cells.append((a,c))
 return cells
def monotone(ps,swap=False):
 ps=[[(p[1],p[0])if swap else p for p in poly]for poly in ps];xs={p[0]for poly in ps for p in poly};es=[e for p in ps for e in edges(p)]
 for a,b in es:
  for c,d in es:
   x=crossingX(a,b,c,d)
   if x is not None:xs.add(x)
 xs=sorted(xs);checks=sorted(set(xs+[(a+b)/2for a,b in zip(xs,xs[1:])]))
 bad=[str(x)for x in checks if len(merge([q for p in ps for q in vertical(p,x)]))!=1];return dict(criticalSections=len(checks),singleIntervalAllSections=not bad,violations=bad)
def d2pointsegment(p,a,b):
 dx=b[0]-a[0];dy=b[1]-a[1];den=dx*dx+dy*dy;t=max(F(0),min(F(1),((p[0]-a[0])*dx+(p[1]-a[1])*dy)/den));return (p[0]-a[0]-t*dx)**2+(p[1]-a[1]-t*dy)**2
rows=[]
for raw,logical in [(6,5),(21,19)]:
 calls=f['trace'][raw-1];assert [c['kind']for c in calls]==['cdDrawLine','cdDrawCurve','cdDrawLine'];ps=[polygons(c)for c in calls];assert all(simple(p)for row in ps for p in row);args=[c['args']for c in calls];assert args[0][2:4]==args[1][:2]and args[1][4:6]==args[2][:2]
 pairs=[]
 for a,b in [(0,1),(1,2)]:
  cells=contacts(ps[a],ps[b]);assert cells;ar,cell=max(cells,key=lambda x:x[0]);seed=tuple(sum(p[i]for p in cell)/len(cell)for i in[0,1]);assert any(relation(seed,p)==1for p in ps[a])and any(relation(seed,p)==1for p in ps[b]);pairs.append(dict(priorMask=a+1,nextMask=b+1,positiveContact=True,sumPositiveEarAreas100=str(sum(a for a,c in cells)),sumIsNotUnionAreaClaim=True,strictSeed100=list(map(str,seed))))
 rows.append(dict(rawOneBased=raw,logical=logical,Pcounts=list(map(len,ps)),exactGuideContinuity=True,pairs=pairs))
calls=f['trace'][20];ps=[polygons(c)for c in calls];assert calls[2]['args'][-1]==5 and len(ps[2])==3;body=ps[2][:2];tail=ps[2][2:];assert len(tail)==1 and len(tail[0])==4
bodyB=[min(p[i]for poly in body for p in poly)for i in[0,1]]+[max(p[i]for poly in body for p in poly)for i in[0,1]];tailB=[min(p[i]for poly in tail for p in poly)for i in[0,1]]+[max(p[i]for poly in tail for p in poly)for i in[0,1]];assert tailB[3]==bodyB[1]
bodyM=monotone(body);tailM=monotone(tail,True);assert bodyM['singleIntervalAllSections']and tailM['singleIntervalAllSections'];leftIntervals=merge([q for p in body for q in vertical(p,bodyB[0])]);assert len(leftIntervals)==1;firstSeed=(bodyB[0],sum(leftIntervals[0])/2);strictPriorInterior=any(relation(firstSeed,p)==1for p in ps[1]);priorShared=[]
for poly in ps[1]:
 for a,b in edges(poly):
  if a[0]!=bodyB[0]or b[0]!=bodyB[0]:continue
  low=max(min(a[1],b[1]),leftIntervals[0][0]);high=min(max(a[1],b[1]),leftIntervals[0][1])
  if high>low:priorShared.append([low,high])
priorShared=merge(priorShared);assert strictPriorInterior or priorShared
bodyTailCells=contacts(body,tail);assert not bodyTailCells;shared=[]
for p in body:
 for a,b in edges(p):
  if a[1]!=tailB[3]or b[1]!=tailB[3]:continue
  for c,d in edges(tail[0]):
   if c[1]!=tailB[3]or d[1]!=tailB[3]:continue
   low=max(min(a[0],b[0]),min(c[0],d[0]));high=min(max(a[0],b[0]),max(c[0],d[0]));
   if high>low:shared.append([low,high])
shared=merge(shared);assert shared
width=bodyB[2]-bodyB[0];height=tailB[3]-tailB[1];assert width>0 and height>0;phase=width/(width+height)
args=calls[2]['args'];a=(F(str(args[0]))/2,F(str(args[1]))/2);b=(F(str(args[2]))/2,F(str(args[3]))/2);assert a[1]==b[1]and b[0]>a[0];maxD2=max(d2pointsegment(p,a,b)for poly in ps[2]for p in poly);radius=math.isqrt(maxD2.numerator//maxD2.denominator);
while F(radius*radius)<maxD2:radius+=1
assert radius*radius>=maxD2
print(json.dumps(dict(schema='hanja-public-source-contact-terminal-feasibility/v1',glyph='醼',sourceCallContact=rows,terminal19=dict(raw=21,mask=3,sourceKind=calls[2]['kind'],sourceFlags=args[-2:],originalGuide100=list(map(str,a+b)),sourceGuideHasUPLeg=False,P=3,bodyP=2,tailP=1,bodyBounds100=list(map(str,bodyB)),tailBounds100=list(map(str,tailB)),bodyXMonotone=bodyM,tailYMonotone=tailM,bodyFirstLeftEdgeMid100=list(map(str,firstSeed)),bodyFirstLeftStrictPriorInterior=strictPriorInterior,bodyPriorPositiveSharedVerticalIntervals100=[[str(v)for v in r]for r in priorShared],bodyTailPositiveArea=False,bodyTailSharedHorizontalBaseIntervals100=[[str(v)for v in r]for r in shared],bodyRightWeightExact=str(width),tailUPWeightExact=str(height),localAuthorBodyShareExact=str(phase),localAuthorBodyShare=float(phase),existingAlgorithm='lib/hanja-stroke-original-terminal-u7e9a.ts',stagedAxesIndependentlyProven=True,strictInteriorAssumptionMatched=strictPriorInterior,priorSharedBoundaryAlternativeProof=bool(priorShared),existingTargetIdentityReusable=False,authorClockExplicit=True,sourcePGuideFlagsUnchanged=True,fullRoundHGuideDiagnostic=dict(maxDistanceSquared100=str(maxD2),safeIntegerRadius100=radius,safeWidth=radius*2,QwidthPolicyMatchesSourceKind=False,coverageDoesNotProveUPGrowth=True)),sharedFilesChanged=False,engineRuns=0,nativeApproval=False,runtimeApplied=False)))
