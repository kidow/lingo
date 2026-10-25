from pathlib import Path
from fractions import Fraction as F
import json,hashlib,ast,gzip,base64
ROOT=Path('/Users/kidow/Documents/dev/kidow/lingo')
FULL='docs/hanja-actual-engine-capture-u840d-hkcs-2026-10-25/engine-whole-hkcs_m840d.json'
b=(ROOT/FULL).read_bytes();assert hashlib.sha256(b).hexdigest()=='f5c8184820c51cbfe0506959745703496eec6d7d271b29735d22bee2cec8a205'
f=json.loads(b);groups=[[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in g['polygons']]for g in f['groups'][6:10]]
# Reuse exact predicates, not the previous target loops or proof execution.
old=ROOT/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-p3-attached-frontier.py'
for node in ast.parse(old.read_text()).body:
 if isinstance(node,ast.FunctionDef)and node.name in {'cross','signed_area','triangle_contains','winding','edge_hits_triangle_interior'}:exec(compile(ast.Module(body=[node],type_ignores=[]),str(old),'exec'))
foot=groups[0];body=groups[1]+groups[2];rising=groups[3];nonfoot=body+rising;cut=F('73.5');bottom=F('93.35');riseBottom=F('78.6');top=F('42.3')
def vec(a,b):return a[0]-b[0],a[1]-b[1]
def det(a,b):return a[0]*b[1]-a[1]*b[0]
def value(fn,y):return fn[0]*y+fn[1]
def union_row(ps,y):
 intervals=[]
 for poly in ps:
  hits=[]
  for a,b in zip(poly,poly[1:]+poly[:1]):
   if(a[1]<=y<b[1])or(b[1]<=y<a[1]):
    slope=(b[0]-a[0])/(b[1]-a[1]);fn=(slope,a[0]-slope*a[1]);hits.append((value(fn,y),1 if b[1]>a[1]else-1,fn))
  hits.sort(key=lambda x:x[0]);w=0;previous=None;k=0
  while k<len(hits):
   x=hits[k][0];same=[]
   while k<len(hits)and hits[k][0]==x:same.append(hits[k]);k+=1
   fn=same[0][2];assert all(z[2]==fn for z in same)
   if previous is not None and w!=0 and previous[0]<x:intervals.append((previous,(x,fn)))
   w+=sum(z[1]for z in same);previous=(x,fn)
  assert w==0
 intervals.sort(key=lambda x:x[0][0]);out=[]
 for a,b in intervals:
  if out and a[0]<=out[-1][1][0]:
   if b[0]>out[-1][1][0]:out[-1]=(out[-1][0],b)
  else:out.append((a,b))
 return [(a[1],b[1])for a,b in out]
def events(ps,lo,hi):
 edges=[(a,b)for p in ps for a,b in zip(p,p[1:]+p[:1])];ys={lo,hi}|{a[1]for e in edges for a in e if lo<a[1]<hi}
 for i,(a,b)in enumerate(edges):
  r=vec(b,a)
  for c,d in edges[i+1:]:
   s=vec(d,c);den=det(r,s)
   if not den:continue
   t=det(vec(c,a),s)/den;u=det(vec(c,a),r)/den
   if 0<=t<=1 and 0<=u<=1:
    y=a[1]+t*r[1]
    if lo<y<hi:ys.add(y)
 return sorted(ys)
def certify(ps,lo,hi,label):
 ys=events(ps,lo,hi);rows=[union_row(ps,(a+b)/2)for a,b in zip(ys,ys[1:])]
 bad=[{'lo':str(ys[i]),'hi':str(ys[i+1]),'intervals':len(row)}for i,row in enumerate(rows)if len(row)!=1]
 joins=[]
 if not bad:
  for i,y in enumerate(ys[1:-1],1):
   before,after=rows[i-1][0],rows[i][0]
   width=min(value(before[1],y),value(after[1],y))-max(value(before[0],y),value(after[0],y))
   joins.append(width)
  assert all(x>0 for x in joins)
 return {'label':label,'range':[str(lo),str(hi)],'criticalY':[str(y)for y in ys],'openSlabs':len(rows),'singleIntervalEveryOpenSlab':not bad,'bad':bad,'positiveWidthAcrossEveryInternalCriticalY':not bad and all(x>0 for x in joins),'minimumCriticalJoinWidth':str(min(joins))if joins else None}
bodyCert=certify(body,cut,bottom,'body P8/P9 down-band')
riseCert=certify(rising,cut,riseBottom,'P10 bottom-to-junction initial rise')
upperCert=certify(nonfoot,top,cut,'P8/P9/P10 upper rising union; prior open31 evidence reused, new critical joins checked')
assert all(c['singleIntervalEveryOpenSlab']and c['positiveWidthAcrossEveryInternalCriticalY']for c in[bodyCert,riseCert,upperCert])
# Body starts with actual positive area shared with completed original foot.
rect=[(F(17),cut),(F(18),cut),(F(18),F(74)),(F(17),F(74))]
for tri in[[rect[0],rect[1],rect[2]],[rect[0],rect[2],rect[3]]]:
 c=tuple(sum(v[j]for v in tri)/3 for j in[0,1]);assert winding(c,foot[0])!=0
 assert not any(edge_hits_triangle_interior(a,b,tri)for a,b in zip(foot[0],foot[0][1:]+foot[0][:1]))
cap=groups[1][1];orientation=1 if signed_area(cap)>0 else-1
assert all(orientation*cross(cap[i],cap[(i+1)%len(cap)],cap[(i+2)%len(cap)])>0 for i in range(len(cap)))
assert all(all(orientation*cross(cap[i],cap[(i+1)%len(cap)],p)>0 for i in range(len(cap)))for p in rect)
# Rising starts at the original P10 lowest tip, strictly inside actual body P9.
tip=rising[1][2];assert tip==(F('19.35'),riseBottom);assert winding(tip,groups[2][0])!=0
dists=[]
for a,b in zip(groups[2][0],groups[2][0][1:]+groups[2][0][:1]):
 v=vec(b,a);vv=sum(z*z for z in v);t=max(F(0),min(F(1),sum((tip[j]-a[j])*v[j]for j in[0,1])/vv));dists.append(sum((tip[j]-a[j]-t*v[j])**2 for j in[0,1]))
delta=F(1,4);assert min(dists)>delta*delta
small=[tip]+[tuple(tip[j]+(v[j]-tip[j])/32 for j in[0,1])for v in rising[1][:2]]
assert all(sum((v[j]-tip[j])**2 for j in[0,1])<delta*delta for v in small)
smallArea=abs(signed_area(small));assert smallArea>0
height=max(tip[1]-v[1]for v in small);assert height>0
out={'schema':'hanja-body-rising-band-feasibility/v1','date':'2026-10-25','glyph':'萍','logical':7,'coordinateSpace':'normalized100','source':{'path':FULL,'SHA256':hashlib.sha256((ROOT/FULL).read_bytes()).hexdigest()},'bodyCandidate':{'sourceRaw':[8,9],'cutY':str(cut),'bottomY':str(bottom),'mask':'cut<=y<=cut+t*(bottom-cut)','initialSharedFootRectangle':[[str(x)for x in p]for p in rect],'positiveExistingFootContactAreaLowerBound':'min(newBandHeight,1/2)','newAreaUpperBound':'100*newBandHeight ->0','sweep':bodyCert},'risingCandidate':{'sourceRaw':[8,9,10],'startY':str(riseBottom),'endY':str(top),'front':'h=78.6-t*(78.6-42.3)','bodyMask':'y>=min(73.5,h)','P10Mask':'y>=h','originalLowestP10Tip':[str(x)for x in tip],'tipInsideExistingBodyRadius':str(delta),'minimumSquaredTipToP9Boundary':str(min(dists)),'positiveInitialContactTriangle':[[str(x)for x in p]for p in small],'contactTriangleArea':str(smallArea),'contactHeight':str(height),'positiveInitialContactAreaWitness':'min(newRiseHeight/contactHeight,1)^2 * contactTriangleArea','newAreaUpperBound':'100*newRiseHeight ->0','lowerSweep':riseCert,'upperSweep':upperCert},'preservation':{'footUnchangedAfterCompletion':True,'sourceP9EachPaintedIndependently':True,'noNewInk':True,'noNewQOrConnectionLine':True,'sourceWidthUnchanged':True,'masksNestedAcrossBothPhases':True,'finalUnionExactlyOriginalP9':True,'completedBodiesNeverHideDuringRise':True},'limits':['This is a candidate source-space band split, not an approved original publisher phase boundary.','Original .05/.25 observations support broad foot then downward body then rising arm order only; new finite browser comparison is required.','P3 attached foot correction is reused; this does not approve full logical7, app integration or runtime registration.'],'sourceEngine':0,'sourceProjection':0,'nativeApproved':False,'runtimeApplied':False}
print(json.dumps({'encoded':base64.b64encode(gzip.compress(json.dumps(out,separators=(',',':')).encode(),mtime=0)).decode(),'summary':{'body':{k:bodyCert[k]for k in['openSlabs','singleIntervalEveryOpenSlab','positiveWidthAcrossEveryInternalCriticalY']},'riseInitial':{k:riseCert[k]for k in['openSlabs','singleIntervalEveryOpenSlab','positiveWidthAcrossEveryInternalCriticalY']},'upper':{k:upperCert[k]for k in['openSlabs','singleIntervalEveryOpenSlab','positiveWidthAcrossEveryInternalCriticalY']},'bodyInitialPositiveContact':True,'riseInitialPositiveContact':True,'contactTriangleArea':str(smallArea),'nativeApproved':False}}))
