import ast,hashlib,json,re
from fractions import Fraction as F
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
FIXTURE='docs/hanja-authored-component-u9ea4-own-bi4-2026-10-30/fixtures-execution-draft.json';FIXTURE_SHA='f1af68d82ade4ba49583dedb35961d287b350e2328a74a5d8b7d9c01d45700a9'
MATH='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py';MATH_SHA='945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea'
def read(p,h):
 b=(ROOT/p).read_bytes();assert hashlib.sha256(b).hexdigest()==h;return b
f=json.loads(read(FIXTURE,FIXTURE_SHA));src=read(MATH,MATH_SHA).decode();tree=ast.parse(src);n={'F':F};exec(compile(ast.Module(body=[v for v in tree.body if isinstance(v,ast.FunctionDef)],type_ignores=[]),MATH,'exec'),n)
def ps(s):
 out=[]
 for part in s['outline'].split('M')[1:]:
  a=re.findall(r'-?(?:\d*\.?\d+)(?:e[-+]?\d+)?',part,re.I);out.append([(F(a[i]),F(a[i+1]))for i in range(0,len(a),2)])
 return out
def area(p):return abs(n['area2'](p))/2
def bounds(pp):return[min(x for p in pp for x,y in p),min(y for p in pp for x,y in p),max(x for p in pp for x,y in p),max(y for p in pp for x,y in p)]
def rect(b):x,y,u,v=b;return[(x,y),(u,y),(u,v),(x,v)]
def sect(pp,x,swap=False):
 pp=[[(y,x)for x,y in p]for p in pp]if swap else pp
 return n['merge']([iv for p in pp for iv in n['vertical'](p,x)])
def intersect_intervals(*groups):
 out=groups[0]
 for group in groups[1:]:out=[(max(a,c),min(b,d))for a,b in out for c,d in group if min(b,d)>max(a,c)]
 return out
def edge(p,q,axis,fixed):return max((b-a for a,b in intersect_intervals(sect([p],fixed,axis==1),sect([q],fixed,axis==1))),default=F(0))
def encode(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,dict):return{k:encode(x)for k,x in v.items()}
 if isinstance(v,(list,tuple)):return[encode(x)for x in v]
 return v
fold=[]
for pen in[4,15,26]:
 row=f['strokes'][pen-1];prior=ps(row[0]);body,head=ps(row[1]);origin=min(y for x,y in body);B=bounds([body,head]);common=intersect_intervals(sect([body],origin,True),sect([head],origin,True),sect(prior,origin,True));assert common;seed=((common[0][0]+common[0][1])/2,origin);conditions={'bodyConvex':n['convex'](body),'headConvex':n['convex'](head),'sharedOriginIntervalPositive':common[0][1]>common[0][0],'seedStrictPrior':any(n['relation'](seed,p)>0 for p in prior),'seedStrictHead':n['relation'](seed,head)>0,'bodyAtOrigin':n['relation'](seed,body)>=0,'wholeBoundsCoverBothP':all(n['exact_area'](p,rect(B))==area(p)for p in[body,head])};assert all(conditions.values());fold.append({'pen':pen,'mask':2,'sourceP':2,'bodyVertices':4,'headVertices':5,'origin':origin,'bounds':B,'negativeExtent':origin-B[1],'positiveExtent':B[3]-origin,'seed':seed,'sharedOriginInterval':common,'conditions':conditions,'proof':'두 convex 원P가 priorH 내부의 동일 origin 단면을 양의길이로 공유한다. origin을 포함하는 모든 양의높이 band와 각P의 교집합은 convex이며 공통단면을 유지하여 연결된다. clip은 원P만 노출하며 fullbounds에서 두P 전부 피복한다.'})
up=[]
for pen in[11,22,33]:
 row=f['strokes'][pen-1];prior=ps(row[1]);body,cap,UP=ps(row[2]);B=bounds([body,cap]);U=bounds([UP]);areas=[area(p)for p in[body,cap,UP]];overlap=[n['exact_area'](p,q)for p,q in[(body,cap),(body,UP),(cap,UP)]];origin=B[1];seed=(B[0]+min(B[2]-B[0],B[3]-B[1])/1000,(B[1]+B[3])/2);conditions={'bodyConvex':n['convex'](body),'capConvex':n['convex'](cap),'UPConvex':n['convex'](UP),'priorQStrictBodySeed':any(n['relation'](seed,p)>0 for p in prior)and n['relation'](seed,body)>0,'priorQBodyEdgePositive':any(edge(p,body,0,B[0])>0 for p in prior),'bodyCapSharedEdgePositive':edge(body,cap,0,max(x for x,y in body))>0,'bodyUPSharedEdgePositive':edge(body,UP,1,origin)>0,'bodyRectExcludesUPArea':n['exact_area'](UP,rect(B))==0,'bodyRectCoversBodyCap':all(n['exact_area'](p,rect(B))==area(p)for p in[body,cap]),'UPRectCoversUP':n['exact_area'](UP,rect(U))==areas[2],'UPBottomEqualsBodyTop':U[3]==origin,'pairOverlapAreaZero':all(x==0 for x in overlap)};assert all(conditions.values());up.append({'pen':pen,'mask':3,'sourceP':3,'bodyBounds':B,'UPBounds':U,'seedInPriorQAndBody':seed,'sourceAreas':areas,'individualExactBodyPhase':(areas[0]+areas[1])/sum(areas),'individualBodyPhaseNumber':float((areas[0]+areas[1])/sum(areas)),'conditions':conditions,'proof':'body사각형과 convexcap은 전체 공통수직edge로 이어진 x단조 union이다. 왼쪽에서 증가하는 bodyrect prefix는 완료Q에 접촉하며 UP 내부를 노출하지 않는다. body완료 후 원UP convexP의 양의길이 아래edge에서 위로 증가하는 strip은 매순간 body에 접촉한다. 원coloredD는1회 paint하고 rect2개의 clip union만 사용한다.'})
report={'glyph':'麤','date':'2026-10-30','schema':'hanja-public-source-fold-UP-feasibility/v1','fixture':{'path':FIXTURE,'SHA256':FIXTURE_SHA,'geometrySHA256':'ba36772c9da2de0f910ce6e0ec8d2029f230bb3e547e1cd16be11ccaa2696a13','logical':33,'masks':48,'P':96},'mathHelper':{'path':MATH,'SHA256':MATH_SHA,'method':'AST pure function reuse with Fraction of actual saved normalized M/L/Z coordinates'},'foldTargets':fold,'UPTargets':up,'authorClock':{'UPBodyPhaseExact':'1856/1991','UPBodyPhase':1856/1991,'basis':'상부 donor의 exact body+cap/wholeP area비를3개positive-affine completecomponent에공통으로사용하는 새authorclock. 하부 serialized binary64의 개별exactarea비는미세하게다르며동일하다고주장하지않음.','foldFormula':'y=origin-(origin-minY)*p; height=(maxY-minY)*p','UPFormula':'b=min(1,p/lambda);u=max(0,(p-lambda)/(1-lambda));body=(B0,B1,(B2-B0)*b,B3-B1);UP=(U0,U3-(U3-U1)*u,U2-U0,(U3-U1)*u)'},'scope':{'sourcePChanged':False,'guideChanged':False,'flagsChanged':False,'weightsChanged':False,'maskBoundariesChanged':False,'newBridge':False,'privatePublisherCoordinatesUsed':False,'originalPublisherMicroclockEquivalent':False,'actualNativeApproved':False,'runtimeApplied':False,'sharedFilesChanged':False}}
print(json.dumps(encode(report),ensure_ascii=False))
