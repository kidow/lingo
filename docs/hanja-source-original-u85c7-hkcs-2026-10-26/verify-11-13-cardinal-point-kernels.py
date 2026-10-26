from pathlib import Path
from fractions import Fraction as F
import json,re,hashlib
R=Path(__file__).resolve().parents[2]
FIX='docs/hanja-source-original-u85c7-hkcs-2026-10-26/fixtures.json';fb=(R/FIX).read_bytes();assert hashlib.sha256(fb).hexdigest()=='fbb7b817d68a9c1a70064f8ab31b49237dbdfbc0ab69e33b6f77f5dd9aa0aed1';f=json.loads(fb)['hkcs_m85c7']
PAINT='docs/hanja-source-original-u85c7-hkcs-2026-10-26/paint-and-compound-contacts-proof.json';pb=(R/PAINT).read_bytes();assert hashlib.sha256(pb).hexdigest()=='145b66073163a60abd737344d6204a92a5b34eafa37bc954034fbd31a8f5eebe';paint=json.loads(pb);assert paint['independentAndJoinedEquivalent']
PROJ='docs/hanja-source-original-u85c7-hkcs-2026-10-26/source-projection.json';pr=(R/PROJ).read_bytes();assert hashlib.sha256(pr).hexdigest()=='23b24b8ca60e6fb37e7df88655881133df76924db70d626de4deca1cfc97ea8a';projection=json.loads(pr)
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
 if pen in (11,13):
  prior=f['strokes'][pen-1][0];assert prior['bounds']==({11:[43,45.15,57,47.15],13:[64,29.85,81,31.85]}[pen])
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
 raw={11:8,13:17}[pen];assert projection['groups'][pen-1]==({11:[6,7],13:[15,16]}[pen]);assert next(x for x in paint['paintCalls']if x['raw']==raw and x['call']==1)['same']
 args=f['fullProof']['trace'][raw-1][0]['args'];assert len(args)==6 and args[-2:]==[22,32] and args[0]==args[2];q0=tuple(F(str(x))/2 for x in args[:2]);assert anchor!=q0 and 'revealPath'not in s and 'revealWidth'not in s
 return{'pen':pen,'mask':mask,'originalP':len(P),'originalRaw':raw,'sourceOriginalCardinalArgs':args,'sourceDirection':s['direction'],'sourceGuideAdded':False,'originalQ0':q0,'originalQ0StrictInsideInk':any(state(q0,p)==1 for p in P),'exteriorBoundary':sorted(boundary),'exteriorSegments':len(boundary),'boundaryCycles':len(cycles),'sourceUnionKernel':source_kernel,'sourceUnionKernelArea':source_area,'kernelAlsoClippedToOriginalPrior':prior is not None,'candidateKernel':kernel,'candidateKernelArea':area(kernel),'anchor':anchor,'strictBoxHalfWidth':delta,'rectExtentsLeftRightUpDown':ext,'originalBounds':[x0,y0,x1,y1],'initialDiameterSquaredUpperBoundCoefficient':(x1-x0)**2+(y1-y0)**2,'positiveInkAreaLowerBoundCoefficient':4*delta*delta,'originalPrior':prior,'candidate':{'allPositivePConnected':True,'allPositivePPriorContactIfRequired':True,'monotoneOriginalPSubset':True,'p0HiddenPointRequired':True,'p1OriginalFullOutline':True,'authorAnchorIsNotOriginalQ0':True},'nativeApproval':False,'runtimeApplied':False}
def enc(v):
 if isinstance(v,F):return str(v)
 if isinstance(v,(list,tuple)):return[enc(x)for x in v]
 if isinstance(v,dict):return{k:enc(x)for k,x in v.items()}
 return v


results=[audit(11,2),audit(13,2)]
risks=[]
for pen,upper in[(11,F(10,121)),(13,F(50,911))]:
 s=f['strokes'][pen-1][1];h=f['strokes'][pen-1][0];x0,y0,x1,y1=map(lambda x:F(str(x)),s['bounds']);hy0=F(str(h['bounds'][1]));height=y1-y0
 assert y0+height*upper==hy0
 nums=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',s['outline'].split('M')[2])];head=list(zip(nums[::2],nums[1::2]));tip=min(head,key=lambda p:p[1]);W0=tip;W1=(tip[0],tip[1]+height*upper/2)
 def cross(a,b,p):return(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
 edges=[]
 for a,b in zip(head,head[1:]+head[:1]):
  c0,c1=cross(a,b,W0),cross(a,b,W1);assert c0>=0 and c1>0;edges.append({'atP0':c0,'atUpper':c1})
 risks.append({'pen':pen,'mask':2,'ordinaryDownClip':{'x':x0,'y':y0,'width':x1-x0,'heightCoefficient':height},'priorMinY':hy0,'strictSeparationOpenProgressInterval':[0,upper],'allVisibleCurrentInkAbovePrior':True,'nonemptyHeadWitness':{'x':tip[0],'yAtP0':tip[1],'yProgressCoefficient':height/2,'strictInsideHeadForEveryPositivePBeforeUpper':True,'headEdgeChecks':edges},'nativeHoldOrPassClaimed':False})
output={'schema':'hanja-source-union-point-window-candidates/v1','date':'2026-10-26','glyph':'藇','inputs':[{'path':FIX,'SHA256':hashlib.sha256(fb).hexdigest()},{'path':PAINT,'SHA256':hashlib.sha256(pb).hexdigest()},{'path':PROJ,'SHA256':hashlib.sha256(pr).hexdigest()}],'results':results,'initialCardinalRisks':risks,'method':['Reuse the existing exact exterior-edge algorithm only; do not rerun earlier source geometry, paint or contact calculations.','Split original edges at exact intersections, classify independent nonzero original-P union sides and retain oriented exterior edges. Each target exterior is one cycle.','Intersect exterior halfplanes and the exact completed priorH. Strict positive kernel anchors and boxes certify sourceInk intersect shrinking convex rectangles is connected and touches the completed prior for every positive progress.','Rectangles are nested; both dimensions tend to zero; completion uses exact unchanged source P.'],'limits':['Anchors differ from original Q0 and point-window progress is an author clock, not a claim of publisher time equivalence.','Actual same-owner/frame, exact completed priorP, opacity and source-width DOM conditions remain mandatory and unverified by source factory alone.','No native animation or runtime registration approval.'],'engine':0,'projection':0,'sourcePOrQOrWidthOrWeightChanged':False,'nativeApproval':False,'runtimeApplied':False}
print(json.dumps(enc(output),ensure_ascii=False))
