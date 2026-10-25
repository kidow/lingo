from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2];FIXTURE='docs/hanja-source-original-u8b92-hkcs-2026-10-26/fixtures.json'
b=(R/FIXTURE).read_bytes();assert hashlib.sha256(b).hexdigest()=='5e8411814e4f13dd0da9fdce4e52614f2143b4c9e0db99f69ec174297a4389c9'
f=json.loads(b)['hkcs_m8b92']
def functions(path,pin,names):
 raw=(R/path).read_bytes();assert hashlib.sha256(raw).hexdigest()==pin
 ns={};nodes=[n for n in ast.parse(raw.decode()).body if isinstance(n,(ast.Import,ast.ImportFrom))or isinstance(n,ast.FunctionDef)and(names is None or n.name in names)]
 exec(compile(ast.Module(body=nodes,type_ignores=[]),path,'exec'),ns);return ns
N=functions('docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py','91670b2c888fd7cd691e4a19c9e43a498b0b964695ba2a7c975ab46bb958926e',None)
polys=N['polys']
A=functions('docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py','2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76',{'vec','det','value','union_row','events'})
value,union_row,events=A['value'],A['union_row'],A['events']
def enc(x):
 if isinstance(x,F):return str(x)
 if isinstance(x,(list,tuple)):return [enc(y)for y in x]
 if isinstance(x,dict):return {k:enc(v)for k,v in x.items()}
 return x
def cross(a,b,p):return(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
def on(p,a,b):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def closed(p,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  if on(p,a,b):return True
  if a[1]<=p[1]<b[1]and cross(a,b,p)>0:w+=1
  if b[1]<=p[1]<a[1]and cross(a,b,p)<0:w-=1
 return w!=0
def merge(intervals):
 out=[]
 for a,b in sorted(intervals):
  if out and a<=out[-1][1]:out[-1]=(out[-1][0],max(out[-1][1],b))
  else:out.append((a,b))
 return out
def closed_row(ps,y):
 intervals=[]
 for p in ps:
  xs=set()
  for a,b in zip(p,p[1:]+p[:1]):
   if a[1]==b[1]:
    if y==a[1]:xs|={a[0],b[0]}
   elif min(a[1],b[1])<=y<=max(a[1],b[1]):xs.add(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]))
  xs=sorted(xs);intervals.extend((x,x)for x in xs)
  intervals.extend((a,b)for a,b in zip(xs,xs[1:])if closed(((a+b)/2,y),p))
 return merge(intervals)
def affine_slab(ps,lo,hi):
 mid=(lo+hi)/2;separate=[z for p in ps for z in union_row([p],mid)];assert separate
 fs=sorted(set(z for row in separate for z in row),key=lambda q:(value(q,mid),q))
 order=[]
 for a,b in zip(fs,fs[1:]):
  dm=value(b,mid)-value(a,mid);de=[value(b,y)-value(a,y)for y in[lo,hi]]
  assert dm>0 and min(de)>=0
  order.append(dict(left=a,right=b,endpointMargins=de,interiorMargin=dm))
 rows=sorted(separate,key=lambda z:value(z[0],mid));left,right=rows[0];chain=[]
 for l,r in rows[1:]:
  overlaps=[value(right,y)-value(l,y)for y in[lo,hi]];assert min(overlaps)>=0
  chain.append(dict(currentRight=right,nextLeft=l,endpointOverlap=overlaps))
  if value(r,mid)>value(right,mid):right=r
 widths=[value(right,y)-value(left,y)for y in[lo,hi]];assert min(widths)>=0 and value(right,mid)>value(left,mid)
 assert len(union_row(ps,mid))==1
 return dict(y=[lo,hi],left=left,right=right,edgeOrder=order,mergeChain=chain,widthAtBounds=widths,positiveOpenWidth=True)
def simple(poly):
 n=len(poly);assert n>=3
 area=sum(a[0]*poly[(i+1)%n][1]-poly[(i+1)%n][0]*a[1]for i,a in enumerate(poly))/2;assert area!=0
 checks=0
 for i,(a,b)in enumerate(zip(poly,poly[1:]+poly[:1])):
  assert a!=b
  for j in range(i+1,n):
   if j==i+1 or(i==0 and j==n-1):continue
   c,d=poly[j],poly[(j+1)%n];r=(b[0]-a[0],b[1]-a[1]);s=(d[0]-c[0],d[1]-c[1]);den=r[0]*s[1]-r[1]*s[0];checks+=1
   if den:
    v=(c[0]-a[0],c[1]-a[1]);t=(v[0]*s[1]-v[1]*s[0])/den;u=(v[0]*r[1]-v[1]*r[0])/den;assert not(0<=t<=1 and 0<=u<=1)
   else:assert not any(on(p,x,y)for p,x,y in[(a,c,d),(b,c,d),(c,a,b),(d,a,b)])
 return dict(vertices=n,nonadjacentPairsChecked=checks,signedArea=area,simple=True)
def case(pen):
 prior,seg=f['strokes'][pen-1][:2];P=polys(seg['outline']);diamond=polys(prior['outline'])[-1]
 assert len(P)==2 and seg['revealWidth']==14 and seg['direction']=='curve'
 simpleSource=[simple(p)for p in P+[diamond]]
 lo=min(y for p in P for x,y in p);hi=max(y for p in P for x,y in p);es=events(P,lo,hi)
 slabs=[affine_slab(P,a,b)for a,b in zip(es,es[1:])]
 critical=[]
 for i,y in enumerate(es):
  row=closed_row(P,y);assert len(row)==1
  limits=[]
  if i:limits.append([value(slabs[i-1][k],y)for k in['left','right']])
  if i<len(slabs):limits.append([value(slabs[i][k],y)for k in['left','right']])
  assert all(tuple(z)==row[0]for z in limits)
  critical.append(dict(y=y,closedUnion=row,adjacentLimits=limits,continuous=True))
 xjoin=max(x for x,y in P[0]);assert min(x for x,y in P[1])==xjoin
 common=[]
 for a,b in zip(P[0],P[0][1:]+P[0][:1]):
  for c,d in zip(P[1],P[1][1:]+P[1][:1]):
   if a[0]==b[0]==c[0]==d[0]==xjoin:
    u=max(min(a[1],b[1]),min(c[1],d[1]));v=min(max(a[1],b[1]),max(c[1],d[1]));
    if u<v:common.append([xjoin,u,v])
 assert common
 q0=[F(x)for x in seg['revealPath'].split(' Q')[0][1:].split()];assert q0[1]==lo
 delta=F(1,4);l=q0[0]-F(1,4);r=q0[0]+F(1,4)
 nearEvents=events([P[0],diamond],lo,lo+delta);contact=[]
 for a,b in zip(nearEvents,nearEvents[1:]):
  y=(a+b)/2
  for kind,pol in [('body',P[0]),('priorDiamond',diamond)]:
   rows=union_row([pol],y);assert len(rows)==1;L,H=rows[0]
   margins=[l-value(L,t)for t in[a,b]]+[value(H,t)-r for t in[a,b]];assert min(margins)>0
   contact.append(dict(part=kind,y=[a,b],left=L,right=H,strictStripMargins=margins))
 top=closed_row(P,lo);pr=closed_row([diamond],lo);assert len(top)==len(pr)==1
 assert top[0][0]<=l<r<=top[0][1] and pr[0][0]<=l<r<=pr[0][1]
 return dict(pen=pen,mask=2,simpleSourcePolygons=simpleSource,sourceSegment=seg,sourcePriorDiamond=diamond,sourcePriorSegmentSHA256=hashlib.sha256(json.dumps(prior,separators=(',',':')).encode()).hexdigest(),criticalY=es,openSlabs=slabs,criticalLines=critical,allCrossSectionsSingleClosedInterval=True,allCriticalAffineLimitsAgree=True,prefixFamily={'definition':'Original complete source P intersect y <= h, h in [lo,hi]','lo':lo,'hi':hi,'monotoneSetInclusion':True,'connectedForEveryNonemptyPrefix':True,'positiveAreaForEveryHAboveLo':True,'noTimingOrQProgressMapping':True},bodyHeadContact={'splitX':xjoin,'bodyXAtMostSplit':True,'headXAtLeastSplit':True,'sharedVerticalSegments':common,'positiveAreaOverlap':False,'contactDimension':1},priorContact={'topLine':top,'priorDiamondTopLine':pr,'stripX':[l,r],'stripY':[lo,lo+delta],'affineStripCertificates':contact,'strictPositivePrefixOverlapLowerBound':'(1/2) * min(h-lo,1/4) for h>lo; actual prior must be complete and opaque','topBoundaryContactOnlyAtHLo':True,'actualOpaquePriorVerified':False},nativeApproval=False,runtimeApplied=False)
results=[]
for pen in[16,23]:
 try:results.append({'ok':True,**case(pen)})
 except Exception as e:results.append({'ok':False,'pen':pen,'mask':2,'failure':type(e).__name__+': '+str(e)})
print(json.dumps(enc({'schema':'hanja-original-short-curve-y-prefix-geometry/v1','glyph':'讒','root':'hkcs_m8b92','fixture':FIXTURE,'fixtureSHA256':'5e8411814e4f13dd0da9fdce4e52614f2143b4c9e0db99f69ec174297a4389c9','geometrySHA256':'3e0339d807e7bc697bed53420f88ff3fc52048df340c1d658c483898c6f406eb','results':results,'originalCapsFailuresRetained':[[16,2],[23,2]],'sourcePChanged':False,'sourceQChanged':False,'sourceEngine':0,'sourceProjection':0,'newDisplayClockApproved':False,'originalClockApproved':False,'newPolicyModuleApproved':False,'nativeApproval':False,'runtimeApplied':False}),ensure_ascii=False,separators=(',',':')))
