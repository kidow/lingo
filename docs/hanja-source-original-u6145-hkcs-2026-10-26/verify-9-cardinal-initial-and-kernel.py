from pathlib import Path
from fractions import Fraction as F
import json,re,hashlib
R=Path(__file__).resolve().parents[2]
FIX='docs/hanja-source-original-u6145-hkcs-2026-10-26/fixtures.json';fb=(R/FIX).read_bytes();assert hashlib.sha256(fb).hexdigest()=='1e1fd8df28591095a09018740222d9a9e2ccd0b6255a6fe545d87967116b1546';f=json.loads(fb)['hkcs_m6145']
PAINT='docs/hanja-source-original-u6145-hkcs-2026-10-26/paint-and-compound-contacts-proof.json';pb=(R/PAINT).read_bytes();assert hashlib.sha256(pb).hexdigest()=='1721dbba5fc4fc5303abfee84a66083686c96155e08336442e45b5df492fbc8a';paint=json.loads(pb);assert paint['independentAndJoinedEquivalent']
PROJ='docs/hanja-source-original-u6145-hkcs-2026-10-26/source-projection.json';pr=(R/PROJ).read_bytes();assert hashlib.sha256(pr).hexdigest()=='6284ce469aee17eee08aacc3a2119b76f876cc5d2f48dce3110f9fefaaed1db3';projection=json.loads(pr)
def audit(pen,mask):
 s=f['strokes'][pen-1][mask-1]
 P=[]
 for text in s['outline'].split('M')[1:]:
  a=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',text)];P.append(list(zip(a[::2],a[1::2])))
 def sub(a,b):return(a[0]-b[0],a[1]-b[1])
 def det(a,b):return a[0]*b[1]-a[1]*b[0]
 def cross(a,b,p):return det(sub(b,a),sub(p,a))
 def area(p):return sum(det(a,b)for a,b in zip(p,p[1:]+p[:1]))/2
 for p in P:
  if area(p)<0:p.reverse()
 def state(p,poly):
  w=0
  for a,b in zip(poly,poly[1:]+poly[:1]):
   c=cross(a,b,p)
   if c==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1]):return 0
   if a[1]<=p[1]<b[1]and c>0:w+=1
   if b[1]<=p[1]<a[1]and c<0:w-=1
  return 1 if w else -1
 E=[(a,b)for p in P for a,b in zip(p,p[1:]+p[:1])];cuts=[{F(0),F(1)}for e in E]
 for i,(a,b)in enumerate(E):
  v=sub(b,a)
  for j,(c,d)in enumerate(E):
   if j<=i:continue
   u=sub(d,c);den=det(v,u)
   if den:
    t=det(sub(c,a),u)/den;k=det(sub(c,a),v)/den
    if 0<=t<=1 and 0<=k<=1:cuts[i].add(t);cuts[j].add(k)
   elif det(sub(c,a),v)==0:
    axis=0 if v[0]else 1
    for x in[c,d]:
     t=(x[axis]-a[axis])/v[axis]
     if 0<=t<=1:cuts[i].add(t)
    axis=0 if u[0]else 1
    for x in[a,b]:
     t=(x[axis]-c[axis])/u[axis]
     if 0<=t<=1:cuts[j].add(t)
 boundary=set();pieces=0
 for (a,b),ts in zip(E,cuts):
  v=sub(b,a);ts=sorted(ts)
  for l,h in zip(ts,ts[1:]):
   A=tuple(a[k]+l*v[k]for k in[0,1]);B=tuple(a[k]+h*v[k]for k in[0,1]);m=tuple((A[k]+B[k])/2 for k in[0,1]);n=(-v[1],v[0]);eps=F(1)
   for c,d in E:
    c0=cross(c,d,m);cn=det(sub(d,c),n)
    if c0 and cn:eps=min(eps,abs(c0/cn)/2)
   left=tuple(m[k]+eps*n[k]for k in[0,1]);right=tuple(m[k]-eps*n[k]for k in[0,1]);ls=[state(left,p)for p in P];rs=[state(right,p)for p in P];assert 0 not in ls+rs
   lin=1 in ls;rin=1 in rs;pieces+=1
   if lin and not rin:boundary.add((A,B))
   elif rin and not lin:boundary.add((B,A))
   else:assert lin and rin
 nexts={};incoming={}
 for a,b in boundary:nexts.setdefault(a,[]).append(b);incoming.setdefault(b,[]).append(a)
 assert set(nexts)==set(incoming);assert all(len(x)==1 for x in nexts.values())and all(len(x)==1 for x in incoming.values())
 remaining=set(nexts);cycles=[]
 while remaining:
  start=next(iter(remaining));p=start;cycle=[]
  while p in remaining:
   remaining.remove(p);cycle.append(p);p=nexts[p][0]
  assert p==start;cycles.append(cycle)
 x0,y0,x1,y1=map(lambda x:F(str(x)),s['bounds']);kernel=[(x0-1,y0-1),(x1+1,y0-1),(x1+1,y1+1),(x0-1,y1+1)]
 for a,b in boundary:
  out=[]
  for p,q in zip(kernel,kernel[1:]+kernel[:1]):
   cp,cq=cross(a,b,p),cross(a,b,q)
   if cp>=0:out.append(p)
   if (cp<0<cq)or(cq<0<cp):
    t=cp/(cp-cq);out.append(tuple(p[k]+t*(q[k]-p[k])for k in[0,1]))
  kernel=out
  if not kernel:break
 anchor=tuple(sum(p[k]for p in kernel)/len(kernel)for k in[0,1])if kernel else None
 margins=[cross(a,b,anchor)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in boundary]if anchor else[]
 delta=min(margins)/2 if margins else None
 if anchor:
  assert any(state(anchor,p)==1 for p in P)
  if delta>0:
   for x in[anchor[0]-delta,anchor[0]+delta]:
    for y in[anchor[1]-delta,anchor[1]+delta]:assert all(cross(a,b,(x,y))>0 for a,b in boundary)
 assert len(cycles)==1 and delta>0
 source_kernel=kernel[:];source_area=area(kernel);prior=None
 if pen==9:
  prior=f['strokes'][8][0];assert prior['bounds']==[42.25,54,80.75,56]
  vals=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',prior['outline'])];H=list(zip(vals[::2],vals[1::2]));assert len(H)==4 and area(H)>0
  for a,b in zip(H,H[1:]+H[:1]):
   out=[]
   for p,q in zip(kernel,kernel[1:]+kernel[:1]):
    cp,cq=cross(a,b,p),cross(a,b,q)
    if cp>=0:out.append(p)
    if(cp<0<cq)or(cq<0<cp):
     t=cp/(cp-cq);out.append(tuple(p[k]+t*(q[k]-p[k])for k in[0,1]))
   kernel=out
  assert kernel and area(kernel)>0
  anchor=tuple(sum(p[k]for p in kernel)/len(kernel)for k in[0,1]);edges=list(boundary)+list(zip(H,H[1:]+H[:1]));delta=min(cross(a,b,anchor)/(abs(b[0]-a[0])+abs(b[1]-a[1]))for a,b in edges)/2
 else:edges=list(boundary)
 assert delta>0
 ax,ay=anchor;ext=[ax-x0,x1-ax,ay-y0,y1-ay];assert all(v>delta for v in ext)
 for x in[ax-delta,ax+delta]:
  for y in[ay-delta,ay+delta]:
   assert all(cross(a,b,(x,y))>0 for a,b in edges)
   assert any(state((x,y),p)==1 for p in P)
   if prior:assert state((x,y),H)==1
 raw=11;assert projection['sourceGroups'][pen-1]==[10,11];assert next(x for x in paint['paintCalls']if x['raw']==raw and x['call']==1)['same']
 args=f['fullProof']['trace'][10][0]['args'];assert args==[161.52,110,161.52,145,22,32];q0=tuple(F(str(x))/2 for x in args[:2]);assert anchor!=q0
 return{'pen':pen,'mask':mask,'originalP':len(P),'originalRaw':raw,'sourceOriginalCardinalArgs':args,'sourceDirection':s['direction'],'sourceGuideAdded':False,'originalQ0':q0,'originalQ0StrictInsideInk':any(state(q0,p)==1 for p in P),'exteriorBoundary':sorted(boundary),'exteriorSegments':len(boundary),'boundaryCycles':len(cycles),'sourceUnionKernel':source_kernel,'sourceUnionKernelArea':source_area,'kernelAlsoClippedToOriginalPrior':prior is not None,'candidateKernel':kernel,'candidateKernelArea':area(kernel),'anchor':anchor,'strictBoxHalfWidth':delta,'rectExtentsLeftRightUpDown':ext,'originalBounds':[x0,y0,x1,y1],'initialDiameterSquaredUpperBoundCoefficient':(x1-x0)**2+(y1-y0)**2,'positiveInkAreaLowerBoundCoefficient':4*delta*delta,'originalPrior':prior,'candidate':{'allPositivePConnected':True,'allPositivePPriorContactIfRequired':True,'monotoneOriginalPSubset':True,'p0HiddenPointRequired':True,'p1OriginalFullOutline':True,'authorAnchorIsNotOriginalQ0':True},'nativeApproval':False,'runtimeApplied':False}
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v

CLIPFILE='lib/hanja-stroke-outline.ts';cb=(R/CLIPFILE).read_bytes();assert hashlib.sha256(cb).hexdigest()=='fb5e309e567de18fdeb19efdc200cd73cc8bce68934554be8d884b5b6e10ff44'
compact=re.sub(r'\s+','',cb.decode());assert 'height:horizontal?height:height*p' in compact and "y:segment.direction==='up'?bottom-height*p:y"in compact
segment=f['strokes'][8][1];previous=f['strokes'][8][0];assert segment['direction']=='down'and segment['bounds']==[77.75,51.5,86.25,73.5]and previous['bounds']==[42.25,54,80.75,56]
assert 'revealPath'not in segment and 'revealWidth'not in segment
text=segment['outline'].split('M')[2];ns=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',text)];head=list(zip(ns[::2],ns[1::2]));assert head==[(F(311,4),F(54)),(F(323,4),F(103,2)),(F(345,4),F(56)),(F(335,4),F(58)),(F(311,4),F(55))]
def cr(a,b,p):return(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
UP=F(5,44);A=(F(323,4),F(103,2));B=(F(323,4),F(103,2)+11*UP);edgeChecks=[]
for a,b in zip(head,head[1:]+head[:1]):
 c0,c1=cr(a,b,A),cr(a,b,B);assert c0>=0 and c1>0;edgeChecks.append({'atP0':c0,'atUpper':c1,'strictForAllPositivePToUpper':True})
assert F(103,2)+22*UP==54 and F(103,2)+11*UP<54
initial={'pen':9,'mask':2,'rendererPath':'ordinary cardinal path uses outlineClip(segment,p)','direction':'down','clip':{'x':'311/4','y':'103/2','width':'17/2','height':'22*p'},'priorMinY':'54','sourceMinY':'103/2','openProgressInterval':[0,UP],'allVisibleCurrentInkStrictlySeparatedFromPrior':True,'verticalGapLowerExpression':'5/2-22*p >0','positiveInkWitness':{'x':'323/4','y':'103/2+11*p','headEdgeChecks':edgeChecks},'strictInkNonemptyEveryPositiveP':True,'targetAloneConnectedClaimed':False,'finiteHeightNeedleClaimed':False,'sourceQOrigin':{'x':'2019/25','y':'55','rawArgs':[161.52,110,161.52,145,22,32],'normalizerSegmentRevealPathAdded':False},'sourcePOrQOrWidthOrWeightChanged':False,'UARead':False,'nativeHoldOrPassClaimed':False}

results=[audit(9,2)]
output={'schema':'hanja-source-union-point-window-candidates/v1','date':'2026-10-26','glyph':'慅','inputs':[{'path':FIX,'SHA256':hashlib.sha256(fb).hexdigest()},{'path':PAINT,'SHA256':hashlib.sha256(pb).hexdigest()},{'path':PROJ,'SHA256':hashlib.sha256(pr).hexdigest()}],'results':results,'initialCardinalRisk':initial,'cardinalDisplaySource':{'path':CLIPFILE,'SHA256':hashlib.sha256(cb).hexdigest()},
 'method':['Split original edges at every exact intersection and collinear endpoint; classify local per-P nonzero union sides; retain oriented exterior edges. The exterior endpoint graph is one simple cycle.','The strict union visibility kernel is the intersection of exterior edge halfplanes. Target9 also intersects it with the exact completed original H. No individual-P convexity is assumed.','Original ink intersect an anchor-containing convex rectangle remains star-shaped. Scale each original bounding extent about the strict kernel anchor by p. A scaled strict box supplies positive area and target9 prior contact for every positive p.','Nested rectangles preserve original ink inclusion, both dimensions tend to zero and p1 is the exact full outline. Existing original-P/joined-outline equality and raw mapping are reused, without new normalization or source projection.'],
 'limits':['New author anchors differ from original Q0; authored point clocks are not source-Q traversal or publisher timing.','Target9 requires actual completed opaque original H binding; geometry does not substitute for DOM validation.','These are candidate sufficient conditions only. Fresh browser review is mandatory before native or runtime approval.','All targets except9m2 are outside this proof. No other source or coverage is recalculated.'],
 'newSourceGeometry':False,'existingPaintOrInitialOrQ7Replay':0,'engine':0,'projection':0,'UARead':False,'privateFetch':0,'sharedChanges':0,'server':0,'newPolicyModulePrepared':False,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(enc(output),separators=(',',':')))
