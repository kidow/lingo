from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json,re

R=Path(__file__).resolve().parents[2]
PINS={
 'docs/hanja-source-original-u5a93-2026-10-26/fixtures.json':'a7ad43dd32a18ac22628c77d942fc53ab26d3642bcabce108248a74babf79733',
 'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py':'2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76',
 'docs/hanja-source-original-u5a93-2026-10-27/verify-pen2-4-kernel-conditions.py':'8793931f804adcbe7212efc5f6d50eb587302a82c922d5a3a4c31e0ff60bfdd3'
}
for file,h in PINS.items():assert hashlib.sha256((R/file).read_bytes()).hexdigest()==h
rowfile=R/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py'
names={'vec','det','value','union_row','events','certify'}
selected=[n for n in ast.parse(rowfile.read_text()).body if isinstance(n,ast.FunctionDef)and n.name in names]
assert {n.name for n in selected}==names
for n in selected:exec(compile(ast.Module(body=[n],type_ignores=[]),str(rowfile),'exec'))
parsefile=R/'docs/hanja-source-original-u5a93-2026-10-27/verify-pen2-4-kernel-conditions.py'
parser=next(n for n in ast.parse(parsefile.read_text()).body if isinstance(n,ast.FunctionDef)and n.name=='polygons')
exec(compile(ast.Module(body=[parser],type_ignores=[]),str(parsefile),'exec'))
f=json.loads((R/next(iter(PINS))).read_text())['u5a93']
assert f['identity']=={'root':'u5a93','file':'engine-whole-u5a93.json','fileSHA256':'689e2d502a5cf1bf337192a939dc0efad1f877c476e0d980bc404d9ddf5c25f8'}
assert len(f['strokes'][1])==1 and f['sourceGroups'][1]==[2]
s=f['strokes'][1][0];ps=polygons(s['outline']);assert len(ps)==2 and s['revealWidth']==14
lo=min(q[1]for p in ps for q in p);hi=max(q[1]for p in ps for q in p)
assert (lo,hi)==(F(27),F('94.35'))
certificate=certify(ps,lo,hi,'pen2-original-two-P-whole-Y-sublevel')
assert certificate['singleIntervalEveryOpenSlab'] and certificate['positiveWidthAcrossEveryInternalCriticalY']
edges=[(a,b)for p in ps for a,b in zip(p,p[1:]+p[:1])]
assert all(a[1]!=b[1]for a,b in edges)
starts=[(i,j,q)for i,p in enumerate(ps)for j,q in enumerate(p)if q[1]==lo]
assert len(starts)==1
pi,vi,A=starts[0];assert pi==1 and A==(F('36.15'),F(27))
P=ps[pi];left,right=P[vi-1],P[(vi+1)%len(P)]
assert left==(F('33.15'),F('29.5')) and right==(F('41.65'),F('31.5'))
nextY=min(q[1]for p in ps for q in p if q[1]>lo)
assert nextY==F('29.5')
leftSlope=(left[0]-A[0])/(left[1]-A[1]);rightSlope=(right[0]-A[0])/(right[1]-A[1])
assert (leftSlope,rightSlope)==(-F(6,5),F(11,9))
diameterFactor=(rightSlope-leftSlope)**2
assert diameterFactor>1+leftSlope**2 and diameterFactor>1+rightSlope**2
threshold=(nextY-lo)/(hi-lo);diameterSquared=diameterFactor*(hi-lo)**2
ns=list(map(F,re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])))
assert len(ns)==6
q0,q1,q2=[tuple(ns[i:i+2])for i in [0,2,4]]
derivativeX=[2*(q1[0]-q0[0]),2*(q2[0]-q1[0])]
derivativeY=[2*(q1[1]-q0[1]),2*(q2[1]-q1[1])]
assert all(v<0 for v in derivativeX)and all(v>0 for v in derivativeY)
assert A!=q0
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return {k:enc(x)for k,x in v.items()}
 if isinstance(v,(list,tuple)):return [enc(x)for x in v]
 return v
out={
 'schema':'hanja-public-y-prefix-conditions/v1','date':'2026-10-27','glyph':'媓','root':'u5a93','pen':2,
 'inputs':PINS,
 'reusedAST':{n.name:hashlib.sha256(ast.dump(n,include_attributes=False).encode()).hexdigest()for n in selected},
 'parserASTSHA256':hashlib.sha256(ast.dump(parser,include_attributes=False).encode()).hexdigest(),
 'oldTargetLoopsExecuted':False,'originalMaskCount':1,'originalPCount':2,
 'sourceFieldSHA256':hashlib.sha256(json.dumps(s,ensure_ascii=False,separators=(',',':')).encode()).hexdigest(),
 'YRange':[lo,hi],'finiteRowCertificate':certificate,
 'noHorizontalOriginalEdges':True,
 'allPositivePrefixConnected':'One continuous nonzero interval per open slab, positive interval overlap at every internal event, no horizontal-edge jump and one initial minimum imply a connected positive-area whole-Y sublevel for every cutoff strictly above27.',
 'zeroAreaTailCondition':'No horizontal original edge, no disconnected row slab, positive critical joins and the unique initial point; a finite-prefix boundary is not an isolated dangling ink component.',
 'initial':{'uniqueMinimum':A,'nextCriticalY':nextY,'validProgress':'0<p<'+str(threshold),'exactPrefixIsSingleTriangle':True,'leftXSlopePerY':leftSlope,'rightXSlopePerY':rightSlope,'diameterSquaredCoefficientTimesP2':diameterSquared,'diameterTendsToZero':True},
 'originalGuide':{'Q0':q0,'Q1':q1,'Q2':q2,'derivativeXEndpointValues':derivativeX,'derivativeYEndpointValues':derivativeY,'strictDescendingLeftForAllParameters':True},
 'potentialDisplay':{'commonYPrefix':True,'zeroExplicitlyHidden':True,'completeUsesBothOriginalPDirect':True,'newCenterlineRequired':False,'sameOriginalMaskAndP':True,'sourceAuthorClockNotOriginalGuideClock':True,'initialMinEqualsQ0':False},
 'limits':['These are exact rational conditions on the frozen compiled original P; no browser, publisher or registration approval.','The display begins at the original outline minimum(36.15,27), not the original guide Q0(36.155,30.5); macro descending-left compatibility does not prove source microclock or detailed head order.','All component, CSS, finite native transition and natural playback checks remain required for any implementation.'],
 'sourceP_Q_WidthWeightFlagsChanged':False,'newNative':0,'engine':0,'projection':0,'privateRequests':0,'runtimeApplied':False,'verifierExecutions':1
}
print(json.dumps(enc(out),ensure_ascii=False,separators=(',',':')))
