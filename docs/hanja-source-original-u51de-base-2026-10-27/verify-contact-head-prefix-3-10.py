#!/usr/bin/env python3
"""Public source-only 3m2 joint/head partition and 10m2 exact contact; no adoption."""
from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re,sys
R=Path(__file__).resolve().parents[2];D=Path(__file__).resolve().parent
PINS={
 'docs/hanja-source-original-u51de-base-2026-10-27/fixtures-draft.json':'623a80e6bbd7363bfb171731d60f730d9f9c412ec07a94afd3eccd7a30ed1255',
 'docs/hanja-source-original-u51de-base-2026-10-27/contact-feasibility-3-6.json':'bb684f517de04c2a3c5632d6689950e88e54c3e3bdcf06bce9e5743a6291c60c',
 'docs/hanja-source-original-u51de-base-2026-10-27/feasibility-initial-1-8.json':'0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba',
 'docs/hanja-source-original-u51de-base-2026-10-27/feasibility-initial-9-16.json':'e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e',
 'docs/hanja-source-original-u51de-base-2026-10-27/verify-contact-feasibility-3-6.py':'fe82edd81e0895ca08b194e4a3e1256c6d89d6b3186fd31cdb28965a1e633454',
 'docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py':'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',
 'docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py':'95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396'}
sha=lambda b:hashlib.sha256(b).hexdigest()
for p,h in PINS.items():assert sha((R/p).read_bytes())==h,p
paths=list(PINS);fixture=json.loads((R/paths[0]).read_text())['u51de']
old=json.loads((R/paths[1]).read_text());axes=json.loads((R/paths[2]).read_text())
env={'F':F,'re':re}
def load_functions(path,names):
 s=(R/path).read_text()
 for n in ast.parse(s).body:
  if isinstance(n,ast.FunctionDef)and n.name in names:
   exec(compile(ast.Module(body=[n],type_ignores=[]),'<pure-public-source>','exec'),env)
load_functions(paths[5],['polygons','cross','state'])
load_functions(paths[4],['area','clean','ccw','clip','triangulate','shared','sharededges','center','connected','reach','enc'])
polygons,cross,state,area,clean,ccw,clip,triangulate,sharededges,center,enc=[env[n]for n in ['polygons','cross','state','area','clean','ccw','clip','triangulate','sharededges','center','enc']]
def cut_y(poly,y,below):
 out=[]
 for a,b in zip(poly,poly[1:]+poly[:1]):
  va=(a[1]-y)*(1 if below else -1);vb=(b[1]-y)*(1 if below else -1)
  if va<=0:out.append(a)
  if (va<0<vb)or(vb<0<va):
   t=va/(va-vb);out.append(tuple(a[k]+t*(b[k]-a[k])for k in [0,1]))
 return clean(out)
# Reuse existing 3m2 full20 triangulation/kernel/axis results; do not rerun them.
prior3=polygons(fixture['strokes'][2][0]['outline']);p3=polygons(fixture['strokes'][2][1]['outline'])
assert len(p3)==1
old3=next(x for x in old['results']if x['pen']==3)
axis3=next(a for m in axes['masks']if m['pen']==3 and m['mask']==2 for a in m['axisConditions']if a['axis']=='y')
assert axis3['connectedPositivePrefixSufficient'] and axis3['positiveWidthInteriorEventBridges'] and axis3['wholeLogicalAxisMonotone']
assert old3['strictKernelAndPriorSeedExists'] is False and old3['triangulation']['targetTriangleCount']==20
guide=[F(s)for s in re.findall(r'-?\d+(?:\.\d+)?',fixture['strokes'][2][1]['revealPath'])]
assert len(guide)==6 and guide[1]<guide[3]<guide[5]
joint_y=guide[1];head=cut_y(p3[0],joint_y,True);body=cut_y(p3[0],joint_y,False)
assert len(head)==4 and area(head)!=0 and area(body)!=0
assert abs(area(head))+abs(area(body))==abs(area(p3[0]))
ht=triangulate(head);assert len(ht)==2
pending=list(range(len(ht)));ordered=[];painted=prior3[:];steps=[]
while pending:
 chosen=None
 for i in pending:
  edges=[e for p in painted for e in sharededges(ht[i],p)]
  if edges:chosen=(i,edges[0]);break
 assert chosen is not None,'head triangle has no positive shared-edge root'
 i,edge=chosen;seed=tuple((edge[0][k]+edge[1][k])/2 for k in [0,1])
 assert state(seed,ht[i])==0
 steps.append({'triangle':i,'sourceClipTriangle':ht[i],'positiveContactEdge':edge,'edgeMidpointSeed':seed,'priorOrCompletedHeadContact':True})
 ordered.append(i);painted.append(ht[i]);pending.remove(i)
bridge=sharededges(head,body);assert bridge
support=[v[0]for v in head if v[1]==joint_y];assert len(support)==2 and min(support)<max(support)
row3={'pen':3,'mask':2,'reused':{'strictKernelPriorIntersection':False,'fullSourceTriangles':20,'allTriangleGraphConnected':old3['triangulation']['allTrianglesReachableFromPriorContact'],'downwardCentroidReachableCount':len(old3['triangulation']['downwardCentroidRestrictedReachable']),'axisEvents':axis3['eventCount'],'axisPositiveWidthBridges':True},'sourceGuide':fixture['strokes'][2][1]['revealPath'],'direction':'coordinateYIncreasing / screen-down, then left','jointEventY':joint_y,'jointEventBasis':'Exact original Q start y; original P top y33 precedes Q start y33.015. Head is only this initial source strip, not all20 triangles.','headVertices':head,'headArea':abs(area(head)),'bodyArea':abs(area(body)),'originalArea':abs(area(p3[0])),'exactAreaPartition':True,'headTriangleCount':len(ht),'headOrder':ordered,'headGrowthSteps':steps,'headBodyPositiveSharedEdges':bridge,'bodyFirstSectionWidth':max(support)-min(support),'candidateConstruction':'At p0 paint no target ink. Grow each of two head triangles by homothety about the recorded midpoint on its positive shared contact edge. For each local 0<t<=1 the scaled base has positive length on prior/completed head. Complete head, then retain head and advance original-P coordinateYIncreasing half-plane from original Q-start y to original source maximum. Reuse exact single-interval/positive-width original axis proof for body.','proofScope':'Exact source clip partition, convex triangle contacts and monotone body connectivity; no timing or native visual approval. New display-clock phase allocation remains unassigned.','newAuthoredDisplayClockRequired':True,'entire20TriangleBFSUsedAsHead':False,'geometryCandidateFeasible':True,'policyAdopted':False,'nativeApproval':False}
# Compute 10m2 contact independently; a guide support miss does not imply P contact absence.
prior10=polygons(fixture['strokes'][9][0]['outline']);p10=polygons(fixture['strokes'][9][1]['outline'])
pt=[t for p in prior10 for t in triangulate(p)];tt=[t for p in p10 for t in triangulate(p)]
cells=[p for a in tt for b in pt if len(p:=clip(a,b))>=3 and area(p)>0]
source_shared=[e for a in p10 for b in prior10 for e in sharededges(a,b)]
ks=(R/paths[6]).read_text();kn=next(n for n in ast.parse(ks).body if isinstance(n,ast.FunctionDef)and n.name=='audit')
kc=ast.get_source_segment(ks,kn).split('\n anchor=tuple',1)[0]+'\n return P,boundary,kernel'
ke={'F':F,'f':{'groups':[{'polygons':[[{'x':2*x,'y':2*y}for x,y in p]for p in p10]}]}}
exec(kc,ke);_,boundary,kernel=ke['audit'](1)
seeds=[]
if len(kernel)>=3 and abs(area(kernel))>0:
 for t in pt:
  cell=clip(t,ccw(kernel))
  if len(cell)>=3 and area(cell)>0:
   seed=center(cell)
   if all(cross(a,b,seed)>0 for a,b in boundary)and any(state(seed,p)==1 for p in prior10):seeds.append(seed)
roots=[i for i,t in enumerate(tt)if any(area(clip(t,p))>0 or sharededges(t,p)for p in pt)]
row10={'pen':10,'mask':2,'sourcePolygons':len(p10),'sourceVertexTriangles':len(tt),'PAndPriorPositiveAreaContact':bool(cells),'positiveIntersectionCellCount':len(cells),'intersectionCellAreas':[area(p)for p in cells],'cellAreaNote':'Triangle-pair cells; no nonoverlapping union area claimed.','positiveSharedSourceEdges':source_shared,'priorContactSourceTriangleRoots':roots,'targetStarKernelVertices':kernel,'targetStarKernelPositiveArea':len(kernel)>=3 and abs(area(kernel))>0,'strictKernelPriorInteriorSeedExists':bool(seeds),'strictKernelPriorSeedWitnesses':seeds,'firstYSupportFailureDoesNotImplyNoPContact':True,'sourceFlagsGuideAndPUnchanged':True,'reuseAdopted':False,'nativeApproval':False}
out=enc({'schema':'hanja-source-contact-head-prefix/v1','glyph':'凞','root':'u51de','inputs':PINS,'coordinateFrame':'Exact rational compiled source coordinates, screen y down.','scope':['3m2','10m2'],'results':[row3,row10],'oldFull20TriangulationAndKernelNotRecomputed':True,'originalPGuideFlagsWeightsOrderChanged':False,'newBridge':False,'newAuthoredDisplayClockApproved':False,'runtimeApplied':False,'nativeApproval':False,'registrationAuthorized':False})
if '--emit'in sys.argv:print(json.dumps(out,ensure_ascii=False,indent=2))
else:
 assert json.loads((D/'contact-head-prefix-3-10.json').read_text())==out
 print(json.dumps({'PASS':True,'snapshotSHA256':sha((D/'contact-head-prefix-3-10.json').read_bytes()),'headTriangles':len(ht),'target10Contact':bool(cells),'target10StrictKernelSeed':bool(seeds),'nativeApproval':False}))
