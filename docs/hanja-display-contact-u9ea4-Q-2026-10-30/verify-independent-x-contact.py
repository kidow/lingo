import ast,json,re,hashlib
from pathlib import Path
from fractions import Fraction as F
B=Path.cwd();hp='docs/hanja-authored-ownstroke-u6030-raw6-head-gap-2026-10-29/verify-contact-strip-growth.py';assert hashlib.sha256((B/hp).read_bytes()).hexdigest()=='945d1d0f0297b056cd6e10049ee01a38271c1989e6676b528532656f411252ea';tree=ast.parse((B/hp).read_text());exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)],type_ignores=[]),hp,'exec'))
p='docs/hanja-authored-component-u9ea4-own-bi4-2026-10-30/fixtures-execution-draft.json';raw=(B/p).read_bytes();assert hashlib.sha256(raw).hexdigest()=='f1af68d82ade4ba49583dedb35961d287b350e2328a74a5d8b7d9c01d45700a9';fixture=json.loads(raw)
def parse(d):
 out=[]
 for part in d.split('M')[1:]:
  assert re.fullmatch(r'[0-9eE.+\-\sL]+Z\s*',part);ns=re.findall(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',part);assert len(ns)%2==0;out.append(clean([(F(ns[i]),F(ns[i+1]))for i in range(0,len(ns),2)]))
 return out
def events(polys,extra=[]):
 xs={v[0]for q in polys for v in q};es=[e for q in polys for e in edges(q)]
 for a,b in es:
  for c,d in es:
   x=crossingX(a,b,c,d)
   if x is not None:xs.add(x)
 return sorted(xs|set(extra))
def intervals(polys,x):return merge([z for q in polys for z in vertical(q,x)])
def length(xs):return sum((b-a for a,b in xs),F(0))
def intersection(a,b):return merge([(max(x,u),min(y,v))for x,y in a for u,v in b if max(x,u)<=min(y,v)])
def integral(ps,xs,prior=None):
 return sum(((b-a)*length(intervals(ps,(a+b)/2)if prior is None else intersection(intervals(ps,(a+b)/2),intervals(prior,(a+b)/2)))for a,b in zip(xs,xs[1:])),F(0))
rows=[]
for pen,cut in[(9,F('31.5')),(20,F('18.2775')),(31,F('62.25'))]:
 prior,segment=fixture['strokes'][pen-1];ps=parse(segment['outline']);vs=parse(prior['outline']);assert len(ps)==3 and len(vs)==2;assert all(simple(q)for q in ps+vs);signs=[1 if area2(q)>0 else -1 for q in ps];vsigns=[1 if area2(q)>0 else -1 for q in vs];assert len(set(signs))==len(set(vsigns))==1
 base_events=events(ps);base_probes=sorted(set(base_events+[(a+b)/2 for a,b in zip(base_events,base_events[1:])]+[cut]));assert len(base_events)==26 and len(base_probes)==52
 xs=events(ps,[cut]);probes=sorted(set(xs+[(a+b)/2 for a,b in zip(xs,xs[1:])]+[cut]));bad=[str(x)for x in probes if len(intervals(ps,x))!=1];assert not bad
 atCut=intervals(ps,cut);vp=intervals(vs,cut);joint=intersection(atCut,vp);positive=[(a,b)for a,b in joint if a<b];assert positive;lo,hi=max(positive,key=lambda t:t[1]-t[0]);seed=(cut,(lo+hi)/2);assert any(relation(seed,q)==1 for q in ps)and any(relation(seed,v)==1 for v in vs)
 whole=integral(ps,xs);headxs=[x for x in xs if x<=cut];left=integral(ps,headxs);allxs=events(ps+vs,[cut]);overlap=integral(ps,allxs,vs);assert whole>left>0 and overlap>0;ratio=left/whole
 vbody=vs[0];assert cut==(min(p[0]for p in vbody)+max(p[0]for p in vbody))/2
 ymin=min(p[1]for q in ps for p in q);ymax=max(p[1]for q in ps for p in q);samples=[]
 for amount in[F(0),F(1,1000000),F(1,100),F(1,20),F(1,10),ratio-F(1,10**8),ratio,ratio+F(1,10**8),F(1,2),F(99999999,10**8),F(1)]:
  leftx=cut-(cut-xs[0])*amount/ratio if amount<=ratio else xs[0];rightx=cut if amount<=ratio else cut+(xs[-1]-cut)*(amount-ratio)/(1-ratio);assert xs[0]<=leftx<=cut<=rightx<=xs[-1]
  if amount>0:
   pxs=events(ps+vs,[leftx,rightx]);pxs=[x for x in pxs if leftx<=x<=rightx];assert integral(ps,pxs,vs)>0
  samples.append({'progressExact':str(amount),'visible':amount>0,'originalPDirect':amount==1,'widthPositive':rightx>leftx,'leftX':str(leftx),'rightX':str(rightx)})
 assert samples[0]['visible']==False and samples[0]['widthPositive']==False and samples[-1]['originalPDirect'] and leftx==xs[0]and rightx==xs[-1]
 rows.append({'sourceEvents':len(base_events),'sourceOpenSlabs':len(base_events)-1,'sourceEventsMidpointsPlusCut':len(base_probes),'sampleClipChecks':samples,'fullYBounds':[str(ymin),str(ymax)],'pen':pen,'mask':2,'sourceQSHA256':hashlib.sha256(segment['outline'].encode()).hexdigest(),'priorVSHA256':hashlib.sha256(prior['outline'].encode()).hexdigest(),'P':[len(q)for q in ps],'priorP':[len(v)for v in vs],'polygonOrientations':signs,'priorPolygonOrientations':vsigns,'simpleAll':True,'cutX':str(cut),'eventsWithCut':len(xs),'openSlabsWithCut':len(xs)-1,'uniqueCriticalAndMidpointCuts':len(probes),'allSingleMergedInterval':True,'badCuts':bad,'wholeUnionArea':str(whole),'leftHeadUnionArea':str(left),'authorHeadPhaseExact':str(ratio),'authorHeadPhaseBinary64':float(ratio),'positiveVQArea':str(overlap),'QSliceAtCut':[[str(a),str(b)]for a,b in atCut],'VSliceAtCut':[[str(a),str(b)]for a,b in vp],'positiveContactLengthAtCut':str(length(positive)),'strictSeed':[str(v)for v in seed],'xExtent':[str(xs[0]),str(xs[-1])],'guideGapPreserved':True})
print(json.dumps(rows))
