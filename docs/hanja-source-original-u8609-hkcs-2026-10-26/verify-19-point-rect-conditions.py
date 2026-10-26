from pathlib import Path
from fractions import Fraction as F
import json,hashlib,re
R=Path(__file__).resolve().parents[2] if '__file__'in globals()else Path('/Users/kidow/Documents/dev/kidow/lingo');FP='docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json';fb=(R/FP).read_bytes();assert hashlib.sha256(fb).hexdigest()=='35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6';f=json.loads(fb)['hkcs_m8609'];s=f['strokes'][18][1];h=f['strokes'][18][0]
BP='docs/hanja-source-original-u8609-hkcs-2026-10-26/18-19-union-point-kernel-proof.json';bb=(R/BP).read_bytes();assert hashlib.sha256(bb).hexdigest()=='0b6ccaf662f1e2b3368022807eb5f3c50fc1d2a2da445d4948b9856d9670641f';certificate=json.loads(bb)['results'][1];P=[tuple(map(F,p))for p in certificate['singleCycle']];E=list(zip(P,P[1:]+P[:1]));anchor=(F('73.5'),F(73));bounds=list(map(lambda x:F(str(x)),s['bounds']));x0,y0,x1,y1=bounds;ax,ay=anchor;left=x0-ax;right=x1-ax;up=y0-ay;down=y1-ay
def cross(a,b,p):return(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
def state(q):
 w=0
 for a,b in E:
  c=cross(a,b,q)
  if c==0 and min(a[0],b[0])<=q[0]<=max(a[0],b[0])and min(a[1],b[1])<=q[1]<=max(a[1],b[1]):return 0
  if a[1]<=q[1]<b[1]and c>0:w+=1
  if b[1]<=q[1]<a[1]and c<0:w-=1
 return 1 if w else-1
def merge(items):
 out=[]
 for l,u in sorted(items):
  if l>u:continue
  if out and l<=out[-1][1]:out[-1]=(out[-1][0],max(out[-1][1],u))
  else:out.append((l,u))
 return out
def closed_line(x,low,high):
 ys=set()
 for a,b in E:
  if a[0]==b[0]:
   if x==a[0]:ys.update([a[1],b[1]])
  elif min(a[0],b[0])<=x<=max(a[0],b[0]):ys.add(a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0]))
 ys=sorted(ys);out=[(y,y)for y in ys if state((x,y))>=0]
 for a,b in zip(ys,ys[1:]):
  if state((x,(a+b)/2))>=0:out.append((a,b))
 return merge([(max(l,low),min(u,high))for l,u in merge(out)])
def fv(fn,x):return fn[0]*x+fn[1]
def topology(p):
 L=ax+left*p;U=ax+right*p;B=ay+up*p;T=ay+down*p;xs={L,U}
 for x,y in P:
  if L<=x<=U:xs.add(x)
 for a,b in E:
  if a[1]!=b[1]:
   for y in[B,T]:
    t=(y-a[1])/(b[1]-a[1])
    if 0<=t<=1:
     x=a[0]+t*(b[0]-a[0])
     if L<=x<=U:xs.add(x)
 xs=sorted(xs);nodes=[];lineids=[];parent=[];areaSlabs=[]
 def add(kind,data):
  i=len(nodes);nodes.append((kind,data));parent.append(i);return i
 def find(i):
  while parent[i]!=i:parent[i]=parent[parent[i]];i=parent[i]
  return i
 def join(i,j):parent[find(i)]=find(j)
 for x in xs:lineids.append([(add('closed',interval),interval)for interval in closed_line(x,B,T)])
 for k,(a,b)in enumerate(zip(xs,xs[1:])):
  mid=(a+b)/2;fn=set();slabArea=[]
  for c,d in E:
   if min(c[0],d[0])<mid<max(c[0],d[0]):
    m=(d[1]-c[1])/(d[0]-c[0]);fn.add((m,c[1]-m*c[0]))
  fn=sorted(fn,key=lambda v:fv(v,mid))
  for lower,upper in zip(fn,fn[1:]):
   if fv(lower,mid)==fv(upper,mid)or state((mid,(fv(lower,mid)+fv(upper,mid))/2))<0:continue
   lo=lower if fv(lower,mid)>=B else(F(0),B);hi=upper if fv(upper,mid)<=T else(F(0),T)
   if fv(lo,mid)>fv(hi,mid):continue
   assert all(fv(lo,x)<=fv(hi,x)for x in[a,b])
   for x in[a,b]:assert fv(lo,x)==max(fv(lower,x),B)and fv(hi,x)==min(fv(upper,x),T)
   n=add('open',(lo,hi))
   if fv(lo,mid)<fv(hi,mid):slabArea.append((n,lo,hi))
   for idx,x in[(k,a),(k+1,b)]:
    interval=(fv(lo,x),fv(hi,x));neighbors=[j for j,q in lineids[idx]if max(interval[0],q[0])<=min(interval[1],q[1])];assert neighbors
    covered=merge([(max(interval[0],q[0]),min(interval[1],q[1]))for j,q in lineids[idx]])
    assert covered==[interval]
    for j in neighbors:join(n,j)
  areaSlabs.append(slabArea)
 areaIds=[n for slab in areaSlabs for n,lo,hi in slab];areaParent={n:n for n in areaIds}
 def areaFind(n):
  while areaParent[n]!=n:areaParent[n]=areaParent[areaParent[n]];n=areaParent[n]
  return n
 for k,x in enumerate(xs[1:-1],1):
  for n,l,u in areaSlabs[k-1]:
   for m,Lf,Uf in areaSlabs[k]:
    low=max(fv(l,x),fv(Lf,x));high=min(fv(u,x),fv(Uf,x))
    if high>low and any(min(high,q[1])>max(low,q[0])for j,q in lineids[k]):areaParent[areaFind(n)]=areaFind(m)
 boundaryOnly=[]
 for k,x in enumerate(xs):
  neighbors=(areaSlabs[k-1]if k>0 else[])+(areaSlabs[k]if k<len(areaSlabs)else[])
  attached=merge([(fv(l,x),fv(u,x))for n,l,u in neighbors])
  for j,(l,u)in lineids[k]:
   cover=merge([(max(l,a),min(u,b))for a,b in attached])
   if l==u:
    if not cover:boundaryOnly.append({'x':x,'point':l,'type':'isolated-from-area-point'})
   else:
    cursor=l
    for a,b in cover:
     if a>cursor:boundaryOnly.append({'x':x,'from':cursor,'to':a,'type':'zero-area-line-open-gap'})
     cursor=max(cursor,b)
    if cursor<u:boundaryOnly.append({'x':x,'from':cursor,'to':u,'type':'zero-area-line-open-gap'})
 areaComponents=len({areaFind(n)for n in areaIds})
 comps=len({find(i)for i in range(len(nodes))});assert nodes
 return {'p':p,'connected':comps==1,'components':comps,'positiveAreaComponents':areaComponents,'boundaryOnly':boundaryOnly,'criticalX':len(xs),'nodes':len(nodes),'positiveAreaCells':len(areaIds),'slabLimitCoverageExact':True}
events={F(0),F(1)};eventKinds=[]
for i,v in enumerate(P):
 for axis,base,deltas in[(0,ax,[left,right]),(1,ay,[up,down])]:
  for d in deltas:
   p=(v[axis]-base)/d
   if 0<=p<=1:events.add(p);eventKinds.append(('vertex-side',i,p))
for i,(a,b)in enumerate(E):
 c0=cross(a,b,anchor)
 for dx in[left,right]:
  for dy in[up,down]:
   c1=(b[0]-a[0])*dy-(b[1]-a[1])*dx
   if c1:
    p=-c0/c1
    if 0<=p<=1:events.add(p);eventKinds.append(('corner-edge',i,p))
   else:assert c0!=0
events=sorted(events);closed=[topology(p)for p in events if p>0];opened=[topology((a+b)/2)for a,b in zip(events,events[1:])];bad=[x for x in closed+opened if not x['connected']or x['positiveAreaComponents']!=1]
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,tuple)or isinstance(v,list):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v

# Exact provenance and original union boundary, not a claim that this polygon has a common kernel.
assert set(E)=={(tuple(map(F,a)),tuple(map(F,b)))for a,b in certificate['exactExteriorBoundary']}
assert len(P)==26 and certificate['boundaryCycles']==1 and certificate['sourceUnionKernelEmptyCertificate']['sum'][2]=='-37145999/8060000'
def original_polygons(outline):
 result=[]
 for part in re.findall(r'M([^Z]+)Z',outline):
  v=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',part)];assert len(v)%2==0;result.append(list(zip(v[::2],v[1::2])))
 return result
original=original_polygons(s['outline']);head=original[1];prior=original_polygons(h['outline'])[0];delta=F(1,4);anchorCert=[]
for name,poly in[('sourceHead',head),('completedPriorH',prior)]:
 turns=[cross(poly[i],poly[(i+1)%len(poly)],poly[(i+2)%len(poly)])for i in range(len(poly))];assert min(turns)>0
 margins=[cross(a,b,anchor)for a,b in zip(poly,poly[1:]+poly[:1])];assert min(margins)>0
 for x in[ax-delta,ax+delta]:
  for y in[ay-delta,ay+delta]:assert all(cross(a,b,(x,y))>0 for a,b in zip(poly,poly[1:]+poly[:1]))
 anchorCert.append({'shape':name,'anchorMargins':margins})
assert bounds==[min(x for p in original for x,y in p),min(y for p in original for x,y in p),max(x for p in original for x,y in p),max(y for p in original for x,y in p)]
assert min(-left,right,-up,down)>delta and state(anchor)==1
# All clipping-combinatorics changes are roots of these affine orientation functions.
equations=[];completeEvents={F(0),F(1)};eventReasons={}
def equation(kind,index,label,c0,c1):
 assert c0 or c1;equations.append((kind,index,label,c0,c1))
 if c1:
  p=-c0/c1
  if 0<=p<=1:completeEvents.add(p);eventReasons.setdefault(p,[]).append((kind,index,label))
for i,v in enumerate(P):
 for axis,base,d,label in[(0,ax,left,'left'),(0,ax,right,'right'),(1,ay,up,'top'),(1,ay,down,'bottom')]:equation('vertex-side',i,label,v[axis]-base,-d)
for i,(a,b)in enumerate(E):
 for dx in[left,right]:
  for dy in[up,down]:equation('corner-edge',i,(dx,dy),cross(a,b,anchor),(b[0]-a[0])*dy-(b[1]-a[1])*dx)
assert sorted(completeEvents)==events and len(equations)==208 and len(events)==84
signs=[]
for l,u in zip(events,events[1:]):
 m=(l+u)/2;sg=[]
 for kind,index,label,c0,c1 in equations:
  assert(c0+c1*l)*(c0+c1*u)>=0 and c0+c1*m!=0;sg.append(1 if c0+c1*m>0 else-1)
 signs.append({'interval':[l,u],'allAffineOrientationsConstantAndNonzero':True,'signPatternSHA256':hashlib.sha256(json.dumps(sg,separators=(',',':')).encode()).hexdigest()})
assert len(closed)==len(opened)==83 and not bad
assert all(r['positiveAreaComponents']==1 and not r['boundaryOnly']for r in closed+opened)
assert any(r['p']==1 and r['connected']for r in closed)
CAPS='lib/hanja-stroke-start-caps-u8609-hkcs.ts';assert hashlib.sha256((R/CAPS).read_bytes()).hexdigest()=='de9bdab530cc74ecf98ac21776ee8f604d7538ad47ea7e075bff6fa7330dad50'
out={'schema':'hanja-source-specific-nested-rect-conditions/v1','date':'2026-10-26','glyph':'蘉','pen':19,'mask':2,
'inputs':{FP:'35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6',BP:'0b6ccaf662f1e2b3368022807eb5f3c50fc1d2a2da445d4948b9856d9670641f',CAPS:'de9bdab530cc74ecf98ac21776ee8f604d7538ad47ea7e075bff6fa7330dad50'},
'geometrySHA256':'36c6d68c80e42dd733c2a293a9cbf7f4dd5e72f15d1e9fd5c4109b4253ab19b2','originalUnionExteriorCycle':P,'originalUnionExteriorEdges':E,'originalUnionHasCommonKernel':False,
'anchor':anchor,'strictCommonHeadAndPriorBoxHalfWidth':delta,'strictAnchorCertificates':anchorCert,'sourceBounds':bounds,'sourceBoundExtentsLeftRightUpDown':[-left,right,-up,down],
'point0HiddenRequired':True,'nestedRectangles':True,'exactP1SourceBounds':True,'p1DirectOriginalPRequired':True,'initialDiameterSquaredUpperBoundCoefficient':(x1-x0)**2+(y1-y0)**2,'positiveAreaInCompletedPriorLowerCoefficient':4*delta*delta,
'eventEquationCount':len(equations),'events':events,'allVertexSideAndCornerEdgeAffineRootsIncluded':True,'noAlwaysCollinearEquation':True,'openSignCertificates':signs,
'closedPositivePStates':closed,'openIntervalStates':opened,'closedSetComponentsAllOne':True,'positiveAreaGraphComponentsAllOne':True,'zeroAreaOnlyBoundaryStates':0,'allSlabClosureLimitsExactlyCoveredByClosedSections':True,
'authorClockNotPublisherOrSourceQClock':True,'sourcePOrQOrWidth14OrWeightChanged':False,'newModuleApprovedByThisProof':False,'UAOrAAClaim':False,'nativeApproval':False,'runtimeApplied':False,'engine':0,'projection':0,'server':0}
print(json.dumps(enc(out),ensure_ascii=False))
