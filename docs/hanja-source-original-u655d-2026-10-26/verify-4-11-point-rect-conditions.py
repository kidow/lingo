from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2]
PINS={"docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json":"a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87","docs/hanja-goal-glyphwiki-batch984-2026-10-13/engine-whole-u655d.json":"aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af","docs/hanja-source-original-u655d-2026-10-26/fixtures.json":"a120891aa1745a7ecf885b71b665396c6977f95c69021d83025a38523da2cbd6","docs/hanja-source-original-u655d-2026-10-26/source-projection.json":"25540ad408269f15b544896e28162e37ffd4232748198de95373c9a7abddfb9d","docs/hanja-source-original-u655d-2026-10-26/q7-initial-risk-proof.json":"564eccc7b899422d3cacee4a16aa8a51d2fb57532390d4e0e197b50814bb24ec","docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py":"95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396","docs/hanja-source-original-u655d-2026-10-26/mask-union-start-kernel-proof.json":"7e1f34c33298e906859acb6fbc5be535c2801941fc04f0e3839c4be0e680070a","docs/hanja-source-original-u655d-2026-10-26/verify-mask-union-start-kernels.py":"cbe9bde4ad8335a81529f1233306778e99ae5d444a32ece73533b9e68390ce6f","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py":"62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b","docs/hanja-source-original-u655d-2026-10-26/4-11-start-contact-conditions-proof.json":"9662e370bef98d2b2100dad8001bee6d453413659210eaf92a36957f6086e407"}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
results=[]
for pen,mask,raw,edgeCount,anchorValues in [(4,2,6,30,('99/2','79/2')),(11,1,13,23,('3093/50','739/20'))]:
 proof=json.loads((R/'docs/hanja-source-original-u655d-2026-10-26/mask-union-start-kernel-proof.json').read_bytes());r=next(r for r in proof['results']if r['pen']==pen)
 assert r['raw']==raw and r['singleCCWOuterCycleVerified']and not r['strictUnionKernelPositiveArea']
 P=[tuple(map(F,p))for p in r['boundaryCycles'][0]];E=list(zip(P,P[1:]+P[:1]));assert len(E)==edgeCount
 s=json.loads((R/'docs/hanja-source-original-u655d-2026-10-26/fixtures.json').read_bytes())['u655d']['strokes'][pen-1][mask-1]
 originalQ0=tuple(map(F,r['originalMaskStart']));anchor=tuple(map(F,anchorValues));ax,ay=anchor
 bounds=list(map(lambda x:F(str(x)),s['bounds']));x0,y0,x1,y1=bounds;left=x0-ax;right=x1-ax;up=y0-ay;down=y1-ay
 UTIL='docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py';ub=(R/UTIL).read_bytes();allowed={'cross','state','merge','closed_line','fv','topology','enc','equation'};fn=[n for n in ast.parse(ub).body if isinstance(n,ast.FunctionDef)and n.name in allowed];assert {n.name for n in fn}==allowed;exec(compile(ast.Module(body=fn,type_ignores=[]),str(R/UTIL),'exec'),globals())
 assert state(anchor)==1
 completeEvents={F(0),F(1)};eventReasons={};equations=[];always=[]
 def addEquation(kind,index,label,c0,c1):
  if not(c0 or c1):always.append((kind,index,label));return
  equation(kind,index,label,c0,c1)
 for i,v in enumerate(P):
  for axis,base,d,label in[(0,ax,left,'left'),(0,ax,right,'right'),(1,ay,up,'top'),(1,ay,down,'bottom')]:addEquation('vertex-side',i,label,v[axis]-base,-d)
 for i,(a,z)in enumerate(E):
  for dx in[left,right]:
   for dy in[up,down]:addEquation('corner-edge',i,(dx,dy),cross(a,z,anchor),(z[0]-a[0])*dy-(z[1]-a[1])*dx)
 events=sorted(completeEvents);closed=[topology(p)for p in events if p>0];opened=[topology((l+u)/2)for l,u in zip(events,events[1:])]
 bad=[x for x in closed+opened if not x['connected']or x['positiveAreaComponents']!=1 or x['boundaryOnly']]
 signs=[]
 for l,u in zip(events,events[1:]):
  m=(l+u)/2;sg=[]
  for kind,index,label,c0,c1 in equations:
   assert(c0+c1*l)*(c0+c1*u)>=0 and c0+c1*m!=0;sg.append(1 if c0+c1*m>0 else-1)
  signs.append({'interval':[l,u],'affineSignsConstantNonzero':True,'SHA256':hashlib.sha256(json.dumps(sg,separators=(',',':')).encode()).hexdigest()})
 out={'schema':'hanja-source-start-rect-conditions/v1','date':'2026-10-26','glyph':'敝','logicalPen':pen,'mask':mask,'raw':raw,'inputs':PINS,'anchor':anchor,'anchorIsOriginalQ0':anchor==originalQ0,'originalQ0':originalQ0,'offsetFromOriginalQ0':[anchor[j]-originalQ0[j]for j in[0,1]],'sourceBounds':bounds,'extents':[-left,right,-up,down],'sourceUnionExteriorReused':True,'exteriorEdges':len(E),'events':events,'equations':len(equations),'alwaysCollinearEquations':always,'closed':closed,'open':opened,'signCertificates':signs,'bad':bad,'allStatesConnectedPositiveAndNoZeroTail':not bad and not always,'initialDiameterSquaredCoefficient':(x1-x0)**2+(y1-y0)**2,'nestedRectangles':True,'p0HiddenRequired':True,'p1DirectOriginalPRequired':True,'sourceKernelRecomputed':0,'oldCoverageReplayed':0,'engine':0,'projection':0,'sourceP_Q_WidthWeightChanged':False,'nativeApproval':False,'runtimeApplied':False,'limits':['Only this stated anchor-centered source-bounds rectangle family is evaluated.','The author rect clock is not source Q arc timing or publisher microtime.','p0 hidden and p1 direct originalP are future display contracts; no renderer change or native approval.']}
 results.append(enc(out))
print(json.dumps({'results':results,'calculationExecutions':2,'previous10Replayed':0,'nativeApproval':False},separators=(',',':')))
