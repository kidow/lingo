from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re
R=Path(__file__).resolve().parents[2]
PINS={"docs/hanja-source-original-u9008-hkcs-2026-10-27/fixtures-draft.json":"c9fce51a23da581bcd9b25bc7e2f5fbabd765b45c222926fafc2fcdaef92707f","docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py":"35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf","docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py":"db903056c1375705fd8133ee79dcc3ff5450c519012a3f249881af9abebdbd29","docs/hanja-component-capture-u995b-2026-10-27/verify-compound-contact-facts.py":"bb3f78ad4a38857a699a0c3a48b42c0e241ee1a7b5ce51dbb3aa5e063a47d9d5","lib/hanja-stroke-contact-foot-u7d3d.ts":"63c0e90c46550b2d50eba6f4bc039905fda246cb00bed1469809b01b0dc1a872","lib/hanja-stroke-cardinal-contact-u9004.ts":"ad72bf6433cb243ac7550edd8a9dab46509572aa75deb3e320a85d6cef325466","lib/hanja-stroke-source-foot-u9004.ts":"a39b682b035ccfa0922a9eda69adb4405a56deb30bceb7ace96ec5f8a72671f8"}
sha=lambda b:hashlib.sha256(b).hexdigest()
for p,h in PINS.items():assert sha((R/p).read_bytes())==h
FIX='docs/hanja-source-original-u9008-hkcs-2026-10-27/fixtures-draft.json';f=json.loads((R/FIX).read_text())['u9008'];before=json.dumps(f,sort_keys=True)
def load(path,names,env):
 s=(R/path).read_text()
 for n in ast.parse(s).body:
  if isinstance(n,ast.FunctionDef)and n.name in names:exec(compile(ast.get_source_segment(s,n),path+'::pure-functions-only','exec'),env)
CONTACT='docs/hanja-component-capture-u995b-2026-10-27/verify-compound-contact-facts.py';PATH='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py';AXIS='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-logical-axis-prefix-conditions.py'
e={'F':F};load(CONTACT,{'cross','area','edges','on','meet','poly','inside','triangles','half_clip','intersect','contact'},e)
pe={'F':F,'re':re};load(PATH,{'polygons','cross','state'},pe);load(AXIS,{'section','merge','intersection'},pe)
current=pe['polygons'](f['strokes'][9][1]['outline']);prior=pe['polygons'](f['strokes'][9][0]['outline']);assert len(current)==2 and len(prior)==3
priorMax=max(x for P in prior for x,y in P);cut=min(x for x,y in current[0]if x>priorMax);assert cut==F(137,5)and min(x for x,y in current[1])>cut
foot=e['half_clip'](current[0],(cut,F(0)),(cut,F(1)));assert len(foot)==4;turns=[e['cross'](foot[i-1],foot[i],foot[(i+1)%len(foot)])for i in range(len(foot))];assert min(turns)>0
assert e['poly']([{'x':x,'y':y,'off':0}for x,y in foot])==foot
T=e['triangles'](foot);assert len(T)==2 and all(e['area'](t)>0 for t in T);assert sum(e['area'](t)for t in T)==e['area'](foot)
pieceContacts=[[e['contact'](P,p)for p in prior]for P in current];footContacts=[e['contact'](foot,p)for p in prior];assert sum(footContacts)>0 and footContacts==pieceContacts[0]and not any(pieceContacts[1])
def shared(a,b):
 out=[]
 for p,q in e['edges'](a):
  for z,w in e['edges'](b):
   if p==q or z==w or e['cross'](p,q,z)!=0 or e['cross'](p,q,w)!=0:continue
   dim=0 if p[0]!=q[0]else 1;lo=max(min(p[dim],q[dim]),min(z[dim],w[dim]));hi=min(max(p[dim],q[dim]),max(z[dim],w[dim]))
   if hi<=lo:continue
   u=(lo-p[dim])/(q[dim]-p[dim]);v=(hi-p[dim])/(q[dim]-p[dim]);A=tuple(p[k]+u*(q[k]-p[k])for k in[0,1]);B=tuple(p[k]+v*(q[k]-p[k])for k in[0,1]);out.append(sum((A[k]-B[k])**2 for k in[0,1]))
 return out
bodyTailEdges=shared(current[0],current[1]);assert bodyTailEdges and min(bodyTailEdges)>0;assert e['contact'](current[0],current[1])==0
best=None
for i,t in enumerate(T):
 for pi,p in enumerate(prior):
  for ti,old in enumerate(e['triangles'](p)):
   q=e['intersect'](t,old);ar=abs(e['area'](q))
   if ar>0 and(best is None or ar>best[0]):best=(ar,i,pi,ti,q,old)
assert best is not None
ar,root,pi,ti,q,old=best;seed=tuple(sum(p[k]for p in q)/len(q)for k in[0,1]);assert pe['state'](seed,prior[pi])==1;assert all(e['cross'](a,b,seed)>0 for a,b in e['edges'](T[root]));assert all(e['cross'](a,b,seed)>0 for a,b in e['edges'](old));assert all(e['cross'](a,b,seed)>0 for a,b in e['edges'](foot))
margins=[e['cross'](a,b,seed)**2/((b[0]-a[0])**2+(b[1]-a[1])**2)for polygon in[T[root],old]for a,b in e['edges'](polygon)];assert min(margins)>0
adj=[set()for _ in T];edgeRecords=[]
for i in range(len(T)):
 for j in range(i+1,len(T)):
  assert abs(e['area'](e['intersect'](T[i],T[j])))==0
  lengths=shared(T[i],T[j])
  if lengths:adj[i].add(j);adj[j].add(i);edgeRecords.append({'a':i+1,'b':j+1,'positiveEdgeLengthSquared':lengths})
seen={root};todo=[root];parents={root:None}
while todo:
 for j in sorted(adj[todo.pop()]-seen):seen.add(j);parents[j]=next(i for i in sorted(seen-{j})if j in adj[i]);todo.append(j)
assert len(seen)==len(T)
allEdges=[edge for P in current for edge in e['edges'](P)];events={cut,max(x for P in current for x,y in P)};events.update(x for P in current for x,y in P if x>=cut)
for i,(a,b)in enumerate(allEdges):
 for c,d in allEdges[i+1:]:
  p=pe['intersection'](a,b,c,d)
  if p is not None and p[0]>=cut:events.add(p[0])
events=sorted(events);slabs=[]
def interval(x):
 v=pe['merge']([r for P in current for r in pe['section'](P,0,x)]);assert len(v)==1;return v[0]
for a,b in zip(events,events[1:]):
 x=(2*a+b)/3;y=(a+2*b)/3;u,v=interval(x),interval(y)
 left=tuple(u[k]+(v[k]-u[k])*(a-x)/(y-x)for k in[0,1]);right=tuple(u[k]+(v[k]-u[k])*(b-x)/(y-x)for k in[0,1]);assert left[1]>=left[0]and right[1]>=right[0];assert u[1]>u[0]and v[1]>v[0];assert interval((a+b)/2)==tuple((left[k]+right[k])/2 for k in[0,1]);slabs.append((a,b,left,right))
footEdge=pe['merge'](pe['section'](foot,0,cut));assert len(footEdge)==1;first=slabs[0][2];attachment=min(footEdge[0][1],first[1])-max(footEdge[0][0],first[0]);assert attachment>0
jointWidths=[]
for old,new in zip(slabs,slabs[1:]):
 assert old[1]==new[0];w=min(old[3][1],new[2][1])-max(old[3][0],new[2][0]);assert w>0;jointWidths.append(w)
call=f['fullProof']['trace'][5][0];assert call['kind']=='cdDrawBezier';coords=list(map(F,re.findall(r'[-+]?(?:[0-9]*[.][0-9]+|[0-9]+)(?:[eE][-+]?[0-9]+)?',f['strokes'][9][1]['revealPath'])));C=list(zip(coords[::2],coords[1::2]));dx=[3*(C[i+1][0]-C[i][0])for i in range(3)];assert min(dx)>0
unionArea=e['area'](current[0])+e['area'](current[1]);phase=e['area'](foot)/unionArea;assert 0<phase<1;assert json.dumps(f,sort_keys=True)==before
out={'schema':'hanja-u9008-cubic-source-contact-foot-feasibility/v1','glyph':'逈','pen':10,'mask':2,'inputSHA256':PINS,'compiledSHA256':f['compiledSHA256'],'sourcePieces':{'contactingPiece':1,'terminalTrianglePiece':2,'PCount':2,'P1PriorPositiveAreas':pieceContacts[0],'P2PriorPositiveAreas':pieceContacts[1],'bodyToTerminalPositiveArea':0,'bodyToTerminalPositiveEdgesSquared':bodyTailEdges},'foot':{'cutAxis':'x','cut':cut,'selection':'First existing P1 vertex x strictly beyond completed prior maximum x.','priorMaxX':priorMax,'region':'Exact original target union intersect x<=cut; P2 lies beyond cut. Auxiliary clip sector, not replacement source ink.','vertices':len(foot),'convexTurns':turns,'convex':True,'area':e['area'](foot),'priorPositiveContactAreas':footContacts,'triangles':len(T),'triangleAreas':[e['area'](t)for t in T],'rootTriangleOneBased':root+1,'rootPriorP':pi+1,'rootPriorTriangle':ti+1,'diagnosticSeed':seed,'seedIsOnOriginalC':False,'seedIsDiagnosticOnly':True,'strictSeedMarginSquared':min(margins),'strictInsideFootKernelAndPriorP':True,'positiveEdgeDualGraph':edgeRecords,'allTrianglesReachableFromStrictPriorRoot':True,'BFSParentOneBased':{str(i+1):None if p is None else p+1 for i,p in parents.items()}},'body':{'modeHypothesis':'original-curve-x after complete foot','cut':cut,'maxX':max(x for P in current for x,y in P),'eventCount':len(events),'openSlabCells':len(slabs),'eachOpenSlabSingleLinearSection':True,'firstFootToBodyPositiveEdgeLength':attachment,'allInteriorCellJointsHavePositiveEdges':True,'minimumInteriorJointLength':min(jointWidths),'originalCDerivativeXBernstein':dx,'originalCStrictlyIncreasingX':True,'originalCUnchanged':True,'terminalP2AttachesBeforeFullCompletion':True},'authorClockProposalOnly':{'footAreaRatio':phase,'sourceMaskWeightUnchanged':f['strokes'][9][1]['weight'],'phaseRatioNotPublisherClock':True,'whole10Mask1MustAlreadyBeCompleteOpaqueInSameFrame':True,'wholePointForbiddenStill':True},'methodReuse':{'existingPrivateFactoryAcceptsDifferentSource':False,'u7d3dPositiveEdgeTriBFSConditionsSatisfiedForFoot':True,'u9004OriginalCurveXBodyConditionsGeometrySatisfied':True,'newSourceSpecificCertificatePolicyAndDOMAdapterStillRequired':True},'directionScope':{'priorMask1SourceMacro':'up-right','bodySourceCAndIncreasingXPreserved':True,'footTriangleGrowthCanExpandAroundContactSeed':'Includes original head/serif on both sides of seed; pure DR first-ink direction is not proved.','publisherMacroAndNaturalForwardApproval':False,'nativeRequiredBeforeAdoption':True},'sourcePOrGuideChanged':False,'sourceInkReplacementPathsCreated':False,'auxiliaryTriangulationOnlyNotNewInk':True,'policyAdopted':False,'nativeApproval':False,'runtimeApplied':False,'engine':0,'server':0,'verifierSHA256':sha(Path(__file__).read_bytes())}
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v
print(json.dumps(enc(out),ensure_ascii=False,indent=2))
