from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re
R=Path(__file__).resolve().parents[2];D=Path(__file__).resolve().parent
FIXTURE='docs/hanja-source-original-u5ac2-sou10-layout-v2-2026-10-27/fixtures-draft.json';ONSET='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py';CONTACT='docs/hanja-component-capture-u995b-2026-10-27/verify-compound-contact-facts.py';DIRECTION='docs/hanja-official-media-compare-u5ac2-2026-10-27/native-clock-review.json';PRIOR='docs/hanja-source-original-u5ac2-sou10-layout-v2-2026-10-27/compound-axis-onsets.json'
PINS={FIXTURE:'6cc0ae1b2facfd2c10ad102c4acf5936781ff0f845052e712aaad71ad489dccf',ONSET:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf',CONTACT:'bb3f78ad4a38857a699a0c3a48b42c0e241ee1a7b5ce51dbb3aa5e063a47d9d5',DIRECTION:'bdcfd0d79492f5ba3c69c4b77366112da707c0f6d188775390ffcb30c0e07a44',PRIOR:'1e06a782a04e88eb230bdca8790f8bf874873fbbf690f981d847abf2fc764753'}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
needed={'cross','area','edges','on','meet','poly','inside','triangles','half_clip','intersect','contact','bounds','kernel'}
source=(R/CONTACT).read_text()
for fn in ast.parse(source).body:
 if isinstance(fn,ast.FunctionDef)and fn.name in needed:exec(compile(ast.get_source_segment(source,fn),CONTACT+'::pure-functions-only','exec'),globals())
source=(R/ONSET).read_text();fn=next(n for n in ast.parse(source).body if isinstance(n,ast.FunctionDef)and n.name=='polygons');exec(compile(ast.get_source_segment(source,fn),ONSET+'::outline-parser-only','exec'),globals())
f=json.loads((R/FIXTURE).read_text())['u5ac2'];mask=f['strokes'][11][1];previous=f['strokes'][11][0];pieces=polygons(mask['outline']);prior=polygons(previous['outline']);assert len(pieces)==2 and len(prior)==1;H=prior[0];assert all(cross(a,b,p)>=0 for a,b in edges(H)for p in H)
q=list(map(F,re.findall(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',mask['revealPath'])));q0,c,q1=list(zip(q[::2],q[1::2]));assert q0[0]>c[0]>q1[0]and q0[1]<c[1]<q1[1];macro=next(x for x in json.loads((R/DIRECTION).read_text())['macroDirections']if x['stroke']==12);assert macro['direction']==['right','down-left']
def point_margin(v,P):return min(abs(cross(a,b,v))/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in edges(P)if a!=b)
def centroid(P):return tuple(sum(v[k]for v in P)/len(P)for k in [0,1])
def projection(v):return sum((v[k]-q0[k])*(q1[k]-q0[k])for k in [0,1])
def seed_box(seed,tri):
 margin=min(point_margin(seed,tri),point_margin(seed,H));assert inside(tri,seed)and inside(H,seed)and margin>0;return {'point':seed,'strictTriangleAndPriorLInfinityMargin':margin,'positiveBoxRadius':margin/4,'positiveBoxArea':4*(margin/4)**2}
results=[]
for index,P in enumerate(pieces):
 assert area(P)>0;T=triangles(P);assert sum(area(t)for t in T)==area(P);assert all(area(t)>0 for t in T);assert all(contact(a,b)==0 for i,a in enumerate(T)for b in T[i+1:]);roots=[]
 for i,t in enumerate(T):
  clipped=intersect(t,H)
  if area(clipped)>0:
   seed=centroid(clipped);roots.append({'triangle':i,'intersectionArea':area(clipped),'seed':seed,'distanceToQ0Squared':sum((seed[k]-q0[k])**2 for k in [0,1]),'strictSeed':seed_box(seed,t)})
 assert roots;root=min(roots,key=lambda x:x['distanceToQ0Squared']);adj={i:[]for i in range(len(T))};shared={}
 for i,a in enumerate(T):
  for j,b in enumerate(T[i+1:],i+1):
   common=[v for v in a if v in b]
   if len(common)==2 and common[0]!=common[1]:adj[i].append(j);adj[j].append(i);shared[(min(i,j),max(i,j))]=common
 seen={root['triangle']};order=[{'triangle':root['triangle'],'seed':root['seed'],'priorTriangle':None,'strictPriorRoot':root['strictSeed'],'projection':projection(root['seed'])}]
 while len(seen)<len(T):
  frontier=[]
  for old in sorted(seen):
   for nxt in adj[old]:
    if nxt not in seen:
     edge=shared[(min(old,nxt),max(old,nxt))];seed=centroid(edge);frontier.append((projection(seed),nxt,old,seed,edge))
  assert frontier;_,nxt,old,seed,edge=min(frontier);assert on(edge[0],edge[1],seed);seen.add(nxt);order.append({'triangle':nxt,'seed':seed,'priorTriangle':old,'sharedPositiveEdge':edge,'projection':projection(seed)})
 result={'sourcePolygonOneBased':index+1,'sourceVertexCount':len(P),'sourceArea':area(P),'triangles':T,'triangleAreas':[area(t)for t in T],'exactEarPartitionNoInteriorOverlap':True,'strictPriorRootCandidates':roots,'selectedRoot':root,'positiveEdgeOrder':order,'allTrianglesReachedExactlyOnce':len(seen)==len(T),'seedProjectionMonotoneAlongOriginalDLChord':all(a['projection']<=b['projection']for a,b in zip(order,order[1:])),'individualVisibilityKernelArea':area(kernel(P)),'sameSourcePKeptAtPaint':True}
 results.append(result)
head,body=results[1],results[0];allArea=sum(r['sourceArea']for r in results);headShare=head['sourceArea']/allArea
def serial(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return{k:serial(x)for k,x in v.items()}
 if isinstance(v,(tuple,list)):return[serial(x)for x in v]
 return v
out={'schema':'hanja-sao-source-mask12-triangle-clip-conditions/v1','glyph':'嫂','date':'2026-10-27','inputs':PINS,'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'pen':12,'mask':2,'sourceRawOneBased':15,'coordinates':'Exact compiled100 source P, only clip-only partition/seed constructions; no new source outline or Q.','publisherMacro':macro,'originalSourceQ':mask['revealPath'],'sourceQStrictDLMonotone':True,'sourcePieces':results,'clipOnlyPhaseProposal':{'headSourcePolygonFirst':2,'bodySourcePolygonSecond':1,'headAreaShare':headShare,'internalAreaWeightsAreNewAuthorClock':True,'originalOuterMaskWeightUnchanged':True,'headPhaseClipSubsetOfOriginalHeadP':True,'bodyOutsideHeadCannotAppearDuringHeadPhase':True,'bodyTriangleNotShownBeforeItsSelectedStep':True,'strictPriorSeedRequiredBeforePositiveProgress':True,'laterTriangleSeedIsMidpointOfCompletedPositiveSharedEdge':True,'perTriangleHomothetyScale':'sqrt(local area progress)','progress0':'explicit empty clip','progress1':'direct original whole mask outline; no clip or retrace','paintWholeOriginalDOnce':True,'clipRegionsUnionOnly':True,'overlapDoesNotMultiplyPaint':True,'originalSourceClockEquivalent':False},'directionProofStatus':'Original guide DL is exact; proposed triangle traversal seed projection and fresh native forward sequence must be reviewed before any macro-direction adoption.','sourcePGuideWeightsChanged':False,'policyImplemented':False,'previousFourMaskOrPointProofReexecuted':False,'wholeClockOrDirectionApproved':False,'engineRuns':0,'compilerRuns':0,'SSR':0,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(serial(out),ensure_ascii=False,indent=2))
