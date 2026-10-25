from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib,re
R=Path(__file__).resolve().parents[2];FIXTURE='docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json'
b=(R/FIXTURE).read_bytes();assert hashlib.sha256(b).hexdigest()=='35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6'
f=json.loads(b)['hkcs_m8609'];seg=f['strokes'][16][0]
assert hashlib.sha256(json.dumps(seg,separators=(',',':')).encode()).hexdigest()=='c9cc119aec2a462ee2af9a07aeadefe8404e064573157e455610c22ed2a71857'
def pure(path,pin,names):
 b=(R/path).read_bytes();assert hashlib.sha256(b).hexdigest()==pin
 n={};nodes=[x for x in ast.parse(b.decode()).body if isinstance(x,(ast.Import,ast.ImportFrom))or isinstance(x,ast.FunctionDef)and(names is None or x.name in names)]
 exec(compile(ast.Module(body=nodes,type_ignores=[]),path,'exec'),n);return n
N=pure('docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py','91670b2c888fd7cd691e4a19c9e43a498b0b964695ba2a7c975ab46bb958926e',None)
A=pure('docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py','2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76',{'vec','det','value','union_row','events'})
P=N['polys'](seg['outline']);assert len(P)==2 and seg['direction']=='curve'and seg['revealWidth']==14
M='docs/hanja-source-original-u8b92-hkcs-2026-10-26/verify-short-curve-y-prefix.py';mb=(R/M).read_bytes();assert hashlib.sha256(mb).hexdigest()=='3e8c718f094ca58ef4632c34f40167bc779a9cca50bf7f2c8adce08ae91852f5'
H={'F':F,'value':A['value'],'union_row':A['union_row']}
for x in ast.parse(mb.decode()).body:
 if isinstance(x,ast.FunctionDef)and x.name in{'enc','cross','on','closed','merge','closed_row','affine_slab','simple'}:exec(compile(ast.Module(body=[x],type_ignores=[]),M,'exec'),H)
enc,cross,closed_row,affine_slab,simple=[H[k]for k in['enc','cross','closed_row','affine_slab','simple']]
simplicity=[simple(p)for p in P]
lo=min(y for p in P for x,y in p);hi=max(y for p in P for x,y in p);es=A['events'](P,lo,hi)
slabs=[affine_slab(P,a,b)for a,b in zip(es,es[1:])];critical=[]
for i,y in enumerate(es):
 row=closed_row(P,y);assert len(row)==1;limits=[]
 if i:limits.append([A['value'](slabs[i-1][k],y)for k in['left','right']])
 if i<len(slabs):limits.append([A['value'](slabs[i][k],y)for k in['left','right']])
 assert all(tuple(z)==row[0]for z in limits);critical.append(dict(y=y,closedUnion=row,adjacentLimits=limits,continuous=True))
common=[]
for a,b in zip(P[0],P[0][1:]+P[0][:1]):
 for c,d in zip(P[1],P[1][1:]+P[1][:1]):
  if a==d and b==c:
   left=[cross(a,b,z)for z in P[0]];right=[cross(a,b,z)for z in P[1]]
   assert(min(left)>=0 and max(right)<=0)or(max(left)<=0 and min(right)>=0)
   common.append(dict(edge=[a,b],bodySignedRange=[min(left),max(left)],headSignedRange=[min(right),max(right)],lengthSquared=sum((a[j]-b[j])**2 for j in[0,1])))
assert len(common)==1
q=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',seg['revealPath'])];q0,q1,q2=[tuple(q[i:i+2])for i in[0,2,4]];u=tuple(q1[j]-q0[j]for j in[0,1]);v=tuple(q2[j]-2*q1[j]+q0[j]for j in[0,1]);vv=sum(z*z for z in v);t0=-sum(u[j]*v[j]for j in[0,1])/vv
assert 0<t0<F(1,2)and all(u[j]*(u[j]+v[j])>0 for j in[0,1]);lam=sum((u[j]+t0*v[j])**2 for j in[0,1]);cr=u[0]*v[1]-u[1]*v[0];T=F(1,2);K=F(21,200);chord=sum((2*T*u[j]+T*T*v[j])**2 for j in[0,1])-49;cos=1-(7*K)**2/2-7*K;curv=4*K*K*lam**3-cr*cr;assert chord<0 and cos<0 and curv<0
out={'schema':'hanja-independent-alternative-prefix-geometry/v1','glyph':'蘉','root':'hkcs_m8609','pen':17,'mask':1,'fixture':FIXTURE,'fixtureSHA256':'35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6','geometrySHA256':'36c6d68c80e42dd733c2a293a9cbf7f4dd5e72f15d1e9fd5c4109b4253ab19b2','sourceSegment':seg,'sourceIdentity':f['identity'],'originalCallCount':1,'originalPCount':2,'virtual3PSplit':False,'simpleOriginalPolygons':simplicity,'existingSufficientFamilyExclusion':{'TDomain':['0','1'],'positiveK':True,'eachQDisplacementCoordinateStrictlyMonotone':True,'halfChordMargin':chord,'thereforeTGreaterThanHalfRequired':True,'lambdaMinParameter':t0,'lambdaMinimumInFirstHalf':True,'safeKStrictUpperBound':K,'cosMinusRKAtUpperBound':cos,'curvatureMarginAtUpperBound':curv,'noTKMeetsThisSufficientFamily':True,'notAnimationImpossibility':True},'alternativeYPrefix':{'definition':'Original closed P union intersect y<=h, without rewriting original Q or source P','lo':lo,'hi':hi,'simpleCrossSectionForAllCriticalAndOpenSlabs':True,'monotoneSetInclusion':True,'everyNonemptyPrefixConnected':True,'positiveAreaForEveryHAboveLo':True,'criticalY':es,'openSlabs':slabs,'criticalLines':critical,'bodyHeadContact':{'sharedEdge':common,'contactDimension':1,'positiveAreaOverlap':False},'originalQStart':q0,'originalQEnd':q2,'QStartYBelowSourceMinimum':q0[1]<lo,'QEndYBeforeSourceMaximum':q2[1]<hi,'sourceQYDirectClipNotComplete':True,'hToProgressOrUAMappingApproved':False,'initialMicroDirectionApproved':False},'original6InitialAnd7CoverageReplayed':0,'sourcePChanged':False,'sourceQChanged':False,'sourceWidthChanged':False,'sourceWeightChanged':False,'newDisplayClockApproved':False,'newPolicyModuleApproved':False,'nativeApproval':False,'runtimeApplied':False,'sourceEngine':0,'sourceProjection':0,'SSR':0,'server':0}
print(json.dumps(enc(out),ensure_ascii=False,separators=(',',':')))
