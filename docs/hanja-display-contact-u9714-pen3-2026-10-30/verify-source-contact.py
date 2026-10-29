import ast,json,re,hashlib
from pathlib import Path
from fractions import Fraction as F
B=Path.cwd();hp='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py';assert hashlib.sha256((B/hp).read_bytes()).hexdigest()=='945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea'
tree=ast.parse((B/hp).read_text());exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)],type_ignores=[]),hp,'exec'))
assert hashlib.sha256((B/'docs/hanja-authored-component-u9714-japanese-zhu5-2026-10-30/fixtures-execution-draft.json').read_bytes()).hexdigest()=='d63f8d174914aa699d0cf3181719860b1497ae78c82ad68fa181ea442ab2cd0f'
f=json.loads((B/'docs/hanja-authored-component-u9714-japanese-zhu5-2026-10-30/fixtures-execution-draft.json').read_text());h,q=f['strokes'][2]
def polys(d):
 out=[]
 for part in d.split('M')[1:]:
  assert re.fullmatch(r'[0-9eE.+\-\sL]+Z\s*',part);t=re.findall(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',part);assert len(t)%2==0;out.append(clean([(F(t[i]),F(t[i+1]))for i in range(0,len(t),2)]))
 return out
H=polys(h['outline'])[0];body,head=polys(q['outline']);seed=(F(88),F('21.1'));T=F('22.1');cap=clean(clip(body,[(F(0),F(0)),(F(100),F(0)),(F(100),T),(F(0),T)]));bodycc=body if area2(body)>0 else body[::-1];capcc=cap if area2(cap)>0 else cap[::-1];headcc=head if area2(head)>0 else head[::-1]
levels=sorted(set(p[1]for p in body));critical=sorted(set(levels+[(a+b)/2 for a,b in zip(levels,levels[1:])]))
def yslices(poly,y):return merge(vertical([(p[1],p[0])for p in poly],y))
fullarea=abs(area2(body))/2+abs(area2(head))/2-exact_area(body,head);headarea=abs(area2(cap))/2+abs(area2(head))/2-exact_area(head,cap)
assert all([simple(body),simple(head),simple(cap),convex(headcc),all(relation(seed,p)==1 for p in[H,body,head,cap]),all(cross(a,b,seed)>0 for a,b in edges(capcc)),all(len(yslices(body,y))<=1 for y in critical),relation(min(body,key=lambda p:p[1]),head)==-1,exact_area(H,head)==6])
print(json.dumps({'fullUnionArea':str(fullarea),'headUnionArea':str(headarea),'headPhaseExact':str(headarea/fullarea),'headPhaseNumber':float(headarea/fullarea),'capKernelMinCross':str(min(cross(a,b,seed)for a,b in edges(capcc))),'capVerticesExact':[[str(v)for v in p]for p in capcc],'simple':[simple(body),simple(head),simple(cap)],'convexHead':convex(headcc),'convexCap':convex(capcc),'seedRelations':[relation(seed,p)for p in[H,body,head,cap]],'capVertices':len(cap),'capKernelSeed':all(cross(a,b,seed)>=0 for a,b in edges(capcc)),'capArea':str(abs(area2(cap))/2),'headArea':str(abs(area2(head))/2),'headCapArea':str(exact_area(head,cap)),'bodyHeadArea':str(exact_area(body,head)),'priorHeadArea':str(exact_area(H,head)),'criticalLevels':len(critical),'allBodySlicesConnected':all(len(yslices(body,y))<=1 for y in critical),'bodyTopInsideHead':relation(min(body,key=lambda p:p[1]),head),'bodyTopY':str(min(p[1]for p in body)),'capLevel':str(T),'bodyBottom':str(max(p[1]for p in body)),'capBoundarySlice':[[str(x)for x in pair]for pair in yslices(body,T)]}))
