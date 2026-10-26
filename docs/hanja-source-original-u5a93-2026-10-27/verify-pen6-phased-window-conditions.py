from pathlib import Path
from fractions import Fraction as F
import ast,hashlib,json

R=Path(__file__).resolve().parents[2]
PINS={
 'docs/hanja-source-original-u5a93-2026-10-26/fixtures.json':'a7ad43dd32a18ac22628c77d942fc53ab26d3642bcabce108248a74babf79733',
 'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py':'2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76',
 'docs/hanja-source-original-u5a93-2026-10-27/verify-pen2-4-kernel-conditions.py':'8793931f804adcbe7212efc5f6d50eb587302a82c922d5a3a4c31e0ff60bfdd3',
 'docs/hanja-source-original-u5a93-2026-10-27/pen6-fixed-startcap-risk-proof.json':'0430a147799aec60a48509d96b71d62013c5df7afe6f83ea64b5d91677a8452b'
}
for file,h in PINS.items():assert hashlib.sha256((R/file).read_bytes()).hexdigest()==h
rowfile=R/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py'
names={'vec','det','value','union_row','events','certify'}
selected=[n for n in ast.parse(rowfile.read_text()).body if isinstance(n,ast.FunctionDef)and n.name in names]
assert {n.name for n in selected}==names
for n in selected:exec(compile(ast.Module(body=[n],type_ignores=[]),str(rowfile),'exec'))
parsefile=R/'docs/hanja-source-original-u5a93-2026-10-27/verify-pen2-4-kernel-conditions.py'
parser=next(n for n in ast.parse(parsefile.read_text()).body if isinstance(n,ast.FunctionDef)and n.name=='polygons')
import re
exec(compile(ast.Module(body=[parser],type_ignores=[]),str(parsefile),'exec'))
f=json.loads((R/next(iter(PINS))).read_text())['u5a93'];s=f['strokes'][5][0]
assert len(f['strokes'][5])==1 and f['sourceGroups'][5]==[7,8]
assert s['revealWidth']==14 and F(str(s['weight']))==F('59.428745')
ps=polygons(s['outline']);assert len(ps)==3
calls=[c for i in f['sourceGroups'][5]for c in f['fullProof']['trace'][i]]
horizontal=[c for c in calls if c['kind']=='cdDrawLine'and c['args'][1]==c['args'][3]and c['args'][0]<c['args'][2]]
vertical=[c for c in calls if c['kind']=='cdDrawLine'and c['args'][0]==c['args'][2]and c['args'][1]<c['args'][3]]
assert len(calls)==2 and len(horizontal)==len(vertical)==1
h,v=horizontal[0],vertical[0]
ha=list(map(lambda x:F(str(x))/2,h['args'][:4]));va=list(map(lambda x:F(str(x))/2,v['args'][:4]))
assert tuple(ha[2:])==tuple(va[:2])
def area(p):return sum(a[0]*b[1]-a[1]*b[0]for a,b in zip(p,p[1:]+p[:1]))/2
def original(c):
 out=[[(F(str(q['x']))/2,F(str(q['y']))/2)for q in p]for p in c['polygons']]
 return [p if area(p)>0 else [p[0],*reversed(p[1:])]for p in out]
hp=original(h);vp=original(v);assert len(hp)==1 and ps==hp+vp
H=hp[0];hx=[q[0]for q in H];hy=[q[1]for q in H]
assert len(H)==4 and set(H)=={(min(hx),min(hy)),(max(hx),min(hy)),(max(hx),max(hy)),(min(hx),max(hy))}
seam=max(hy);xmin=min(q[0]for p in ps for q in p);xmax=max(q[0]for p in ps for q in p);ymin=min(q[1]for p in ps for q in p);ymax=max(q[1]for p in ps for q in p)
assert (xmin,xmax,ymin,ymax,seam)==(F('48.6'),F('87.15'),F('17.05'),F('51.9'),F('21.55'))
def lower(poly,y):
 out=[]
 for a,b in zip(poly,poly[1:]+poly[:1]):
  if a[1]<=y:out.append(a)
  if (a[1]<y<b[1])or(b[1]<y<a[1]):
   t=(y-a[1])/(b[1]-a[1]);out.append((a[0]+t*(b[0]-a[0]),y))
 return list(dict.fromkeys(out))
band=[lower(p,seam)for p in ps]
Hcert=certify([[(y,x)for x,y in p]for p in band],xmin,xmax,'pen6-Hband-X-prefix')
Vcert=certify(ps,seam,ymax,'pen6-V-Y-prefix')
assert Hcert['singleIntervalEveryOpenSlab']and Hcert['positiveWidthAcrossEveryInternalCriticalY']and Vcert['singleIntervalEveryOpenSlab']and Vcert['positiveWidthAcrossEveryInternalCriticalY']
assert Hcert['openSlabs']==5 and Vcert['openSlabs']==3
firstV=union_row(ps,(seam+F(Vcert['criticalY'][1]))/2);assert len(firstV)==1
attach=[value(fn,seam)for fn in firstV[0]];assert attach[1]-attach[0]==F(17,2)
firstOther=min(q[0]for p in vp for q in p)
initialThreshold=(firstOther-xmin)/(xmax-xmin);initialAreaCoefficient=(max(hy)-min(hy))*(xmax-xmin)
assert initialThreshold==F(601,771)and initialAreaCoefficient==F(771,10)
for p in band[1:]:
 lo=min(q[0]for q in p);start=[q for q in p if q[0]==lo]
 assert lo==firstOther and all(min(hy)<=q[1]<=max(hy)for q in start)
Hlength=ha[2]-ha[0];Vlength=va[3]-va[1];cut=Hlength/(Hlength+Vlength)
assert (Hlength,Vlength,cut)==(F('33.07044'),F('26.3583045'),F(1296880,2330539))
baseline=json.loads((R/'docs/hanja-source-original-u5a93-2026-10-27/pen6-fixed-startcap-risk-proof.json').read_text())
assert baseline['witness']['center']==['54','41/2']and baseline['witness']['boxHalfWidth']=='1/100'
epsilon=F(1,1000000);maxXAtEpsilon=xmin+(xmax-xmin)*(epsilon/cut)
assert epsilon<cut and maxXAtEpsilon<F(54)-F(1,100)
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return {k:enc(x)for k,x in v.items()}
 if isinstance(v,(list,tuple)):return [enc(x)for x in v]
 return v
out={'schema':'hanja-public-phased-window-conditions/v1','date':'2026-10-27','glyph':'媓','pen':6,'root':'u5a93','inputs':PINS,'utilityAST':{n.name:hashlib.sha256(ast.dump(n,include_attributes=False).encode()).hexdigest()for n in selected},'parserASTSHA256':hashlib.sha256(ast.dump(parser,include_attributes=False).encode()).hexdigest(),'oldTargetLoopsExecuted':False,'originalMaskCount':1,'originalPCount':3,'sourceFieldSHA256':hashlib.sha256(json.dumps(s,ensure_ascii=False,separators=(',',':')).encode()).hexdigest(),'HsourceCall':{'kind':h['kind'],'args':h['args'],'polygons':len(h['polygons'])},'VsourceCall':{'kind':v['kind'],'args':v['args'],'polygons':len(v['polygons'])},'existingWindingNormalizedOnly':True,'sourceCoordinatesRounded':False,'range':{'xmin':xmin,'xmax':xmax,'ymin':ymin,'ymax':ymax,'seamDerivedFromHorizontalOriginalP':seam},'HbandXPrefix':Hcert,'VYPrefix':Vcert,'transition':{'sameOriginalUnionAtSeam':True,'incomingVIntervalAtSeam':attach,'attachmentLength':attach[1]-attach[0],'newLowerInkAreaUpperBoundTimesVlocal':(xmax-xmin)*(ymax-seam),'newLowerInkAreaTendsToZero':True},'initial':{'firstOtherOriginalPMinX':firstOther,'validHlocal':'0<u<'+str(initialThreshold),'originalHorizontalRectangleOnly':True,'exactAreaCoefficientTimesU':initialAreaCoefficient,'areaTendsToZero':True,'verticalMinXEdgeLength':max(hy)-min(hy),'diameterTendsToZeroClaim':False,'otherMinimumVerticalEdgesAlreadyCoveredByHbody':True},'sourcePhaseReferences':{'Hlength':Hlength,'Vlength':Vlength,'cut':cut,'metadataWeightUnchanged':s['weight'],'authorWindowClockNotUAOrPublisherClock':True},'oldUnsafeWitness':{'referenceOnlyNotRecomputed':True,'center':['54','41/2'],'boxHalfWidth':'1/100','requestedLogicalEpsilon':epsilon,'remedyMaximumXAtEpsilon':maxXAtEpsilon,'entireBoxNotPaintedAtRemedyEpsilon':True},'limits':['Finite exact union-row certificates prove connected source X/Y prefixes and positive critical joins, not native or publisher acceptance.','The first X-prefix has a vertical edge of length2; only initial AREA tends to0, not diameter.','The H window completes the original upper corner ornament before the V window expands below the actual H lower seam; this is a new author clock.','Original3P are clipped as one unchanged mask; clipped proof polygons are analysis-only and must not replace, split, trim, reorder or rewrite source P/Q/width/weight/flags.'],'sourceP_Q_WidthWeightsFlagsChanged':False,'newNative':0,'engine':0,'projection':0,'privateRequests':0,'runtimeApplied':False,'feasibilityPrototypeExecutions':1,'verifierExecutions':1}
print(json.dumps(enc(out),ensure_ascii=False,separators=(',',':')))
