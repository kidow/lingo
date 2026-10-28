from pathlib import Path
from fractions import Fraction as F
from decimal import Decimal
import ast,json,hashlib,math
ROOT=Path(__file__).resolve().parents[2]
BASE='docs/hanja-authored-ownstroke-u7e98-cross-contact-v2-2026-10-29/'
REF='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/'
INPUT='fixtures-draft.json'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def build():
 assert sha(ROOT/(BASE+INPUT))=='a4ee3c06f45821c824afd8b8a266d8facc2c7e2b80cdfceb15ac8b6c39223f41'
 s=json.loads((ROOT/(BASE+INPUT)).read_bytes(),parse_float=Decimal)
 reference=ROOT/(REF+'verify-continuous-donor-guide.py');tree=ast.parse(reference.read_text());E={'F':F}
 exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)],type_ignores=[]),str(reference),'exec'),E)
 donor=json.loads((ROOT/(REF+'continuous-donor-guide-experiment.json')).read_bytes())
 inventory=json.loads((ROOT/(REF+'applied-xuan-component-donor-inventory.json')).read_bytes())
 assert donor['donor']['pathsSHA256']==inventory['fixedRuntimeDonor']['pathsSHA256']=='9c2d79be9d2bdce01ea299eb437b930c5a92101dd3d4e5cff7c84841f7f14725'
 assert inventory['review']['runtimeApproved']and inventory['review']['allCumulativeStatesVisuallyInspected']
 output=[]
 for logical,a,b,idx in[(1,1,2,0),(2,3,4,1)]:
  A=[[(F(v['x'])/2,F(v['y'])/2)for v in p]for p in s['groups'][a-1]['polygons']]
  B=[[(F(v['x'])/2,F(v['y'])/2)for v in p]for p in s['groups'][b-1]['polygons']]
  assert all(E['simple'](p)for p in A+B)
  pieces=[]
  for ai,p in enumerate(A):
   for bi,q in enumerate(B):
    for t in E['ears'](p):
     for u in E['ears'](q):
      part=E['clip'](t,u);area=abs(E['area2'](part))/2
      if not area:continue
      seed=tuple(sum(v[k]for v in part)/len(part)for k in[0,1])
      if E['relation'](seed,p)==E['relation'](seed,q)==1:pieces.append((area,seed,ai+1,bi+1))
  pieces.sort(reverse=True)
  start=tuple(F(v)/2 for v in s['trace'][a-1][0]['args'][:2]);end=tuple(F(v)/2 for v in s['trace'][b-1][-1]['args'][-4:-2])
  D=donor['plans'][idx];points=[tuple(F(v)for v in p)for p in D['sourcePoints']]
  selected=None
  for area,seed,ai,bi in pieces:
   matrix=E['affine']([points[0],points[4],points[5]],[start,seed,end]);placed=[E['transform'](matrix,p)for p in points];deltas=[(q[0]-p[0],q[1]-p[1])for p,q in zip(placed,placed[1:])];det=matrix[0]*matrix[3]-matrix[1]*matrix[2]
   if det>0 and all(x<0 and y>0 for x,y in deltas[:3])and deltas[-1][0]>0 and (deltas[-1][1]>0 if logical==1 else deltas[-1][1]<0):
    selected=(area,seed,ai,bi,matrix,placed,deltas,det);break
  assert selected is not None,'No positive whole-donor placement meets source anchor/direction conditions'
  area,seed,ai,bi,matrix,placed,deltas,det=selected
  maxd=max(min(E['dseg'](p,v,w)for v,w in zip(placed,placed[1:]))for poly in A+B for p in poly)
  radius=F(12);nodes=0;deepest=0;unproved=[]
  def prove(tri,depth=0):
   nonlocal nodes,deepest
   nodes+=1;deepest=max(deepest,depth)
   assert nodes<=100000,'coverage node budget'
   center=tuple(sum(v[k]for v in tri)/3 for k in[0,1]);d2=min(E['dseg'](center,v,w)for v,w in zip(placed,placed[1:]));r2=max(sum((v[k]-center[k])**2 for k in[0,1])for v in tri);remaining=radius*radius-d2-r2
   if remaining>=0 and 4*d2*r2<=remaining*remaining:return True
   if depth>=20:unproved.append({'depth':depth});return False
   k=max(range(3),key=lambda k:sum((tri[k][i]-tri[(k+1)%3][i])**2 for i in[0,1]));u,v,w=tri[k],tri[(k+1)%3],tri[(k+2)%3];mid=tuple((u[i]+v[i])/2 for i in[0,1])
   return prove([u,mid,w],depth+1)and prove([mid,v,w],depth+1)
  allcovered=all(prove(t)for p in A+B for t in E['ears'](p));assert allcovered and not unproved
  output.append({'logical':logical,'sourceRawOneBased':[a,b],'sourceP':len(A)+len(B),'donorGlyph':'玄','donorStroke':D['donorStroke'],'sourceDonorPath':D['sourcePath'],'sourceDonorPointsExact':D['sourcePoints'],'anchorDonorIndicesZeroBased':[0,4,5],'recipientAnchorsExact100':[[str(v)for v in p]for p in[start,seed,end]],'jointSourcePIndicesOneBased':[ai,bi],'jointPositiveIntersectionPieceArea100Squared':str(area),'jointStrictInteriorBothP':True,'selectionRule':'Largest-area positive exact ear-intersection piece with strict-interior vertex-mean seed satisfying positive affine and required source macro direction. PublicP only, not private fitting.','matrixExact':[str(v)for v in matrix],'determinantExact':str(det),'placedPointsExact100':[[str(v)for v in p]for p in placed],'placedPoints100':[[float(v)for v in p]for p in placed],'edgeDeltas100':[[float(v)for v in p]for p in deltas],'firstThreeEdgesAllDL':True,'firstFourEdgesAllDL':all(x<0 and y>0 for x,y in deltas[:4]),'fourthCornerDelta100':[float(v)for v in deltas[3]],'lastEdgeDirection':'DR'if logical==1 else'right-up','revealWidth':24,'padding':12,'maxSourceVertexDistanceUpper100':math.sqrt(float(maxd)),'fullRoundCoverage':{'status':'PASS-CONSERVATIVE-COVERAGE','method':'Exact positive-ear triangulation; centroid-distance to original5segment placed donor polyline plus triangle radius, 1-Lipschitz; exact squared radical inequality.','nodes':nodes,'depth':deepest,'unproved':0},'sourcePChanged':False,'originalQControlsChanged':False,'allRealProgressConnectivityProof':False,'finiteBrowserApproved':False})
 return{'schema':'hanja-two-compound-verified-donor-guide-draft/v1','glyph':'纘','date':'2026-10-29','status':'MATH-COVERED-NATIVE-PROTOTYPE-REQUIRED','sourceGeometrySHA256':'aa241350799c5b55d739505e9c873cf2e820b1f65f6ae0c428d79a4dc9575f0f','sourcePCount':62,'mixedGuideSources':True,'filledGeometryMixed':False,'originalWhole':False,'originalEngineCapture':False,'locallyAuthoredDisplay':True,'donor':donor['donor'],'plans':output,'pen12Status':'Pending exact V-down then risingHright contact analysis; role not reversed.','inputSHA256':{BASE+INPUT:sha(ROOT/(BASE+INPUT)),BASE+'fixtures-execution-draft.json':sha(ROOT/(BASE+'fixtures-execution-draft.json')),BASE+'native-actual-risk-hold-review.json':sha(ROOT/(BASE+'native-actual-risk-hold-review.json')),REF+'continuous-donor-guide-experiment.json':sha(ROOT/(REF+'continuous-donor-guide-experiment.json')),REF+'applied-xuan-component-donor-inventory.json':sha(ROOT/(REF+'applied-xuan-component-donor-inventory.json')),REF+'verify-continuous-donor-guide.py':sha(reference)},'newFilledP':0,'newSourceEngine':0,'sourceGuideBridgeAdded':False,'allRealProgressConnectivityProof':False,'actualRReviewed':False,'nativeApproval':False,'runtimeApplied':False,'sharedChanges':False,'serverStarts':0}
if __name__=='__main__':print(json.dumps(build(),ensure_ascii=False))
