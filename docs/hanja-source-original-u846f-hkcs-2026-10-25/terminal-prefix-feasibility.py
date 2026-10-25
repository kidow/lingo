from pathlib import Path
from fractions import Fraction as F
import re,json,hashlib
R=Path('/Users/kidow/Documents/dev/kidow/lingo');fp=R/'docs/hanja-source-original-u846f-hkcs-2026-10-25/fixtures.json';f=json.loads(fp.read_text())['hkcs_m846f'];prior,current=f['strokes'][11][1:3]
def polys(s):
 out=[]
 for part in s.split(' Z'):
  if part.strip():
   n=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',part)];out.append([(n[i],n[i+1])for i in range(0,len(n),2)])
 return out
ps,prev=polys(current['outline']),polys(prior['outline'])
A=(F('79.3'),F('84.95'));B=(F('82.3'),F('90.15'))
def hasedge(polygons):
 return any((a==A and b==B)or(a==B and b==A)for p in polygons for a,b in zip(p,p[1:]+p[:1]))
assert hasedge(ps)and hasedge(prev),'Original shared edge must be exact in both P'
def cross(a,b):return a[0]*b[1]-a[1]*b[0]
edges=[(a,b)for p in ps for a,b in zip(p,p[1:]+p[:1])]
events={v[0]for p in ps for v in p}
for a,b in edges:
 for c,d in edges:
  u=(b[0]-a[0],b[1]-a[1]);v=(d[0]-c[0],d[1]-c[1]);den=cross(u,v)
  if den:
   ac=(c[0]-a[0],c[1]-a[1]);t=cross(ac,v)/den;q=cross(ac,u)/den
   if 0<=t<=1 and 0<=q<=1:events.add(a[0]+t*u[0])
events=sorted(events)
def interval(p,x):
 ys=[]
 for a,b in zip(p,p[1:]+p[:1]):
  if a[0]==b[0]:
   if x==a[0]:ys.extend([a[1],b[1]])
  elif min(a[0],b[0])<=x<=max(a[0],b[0]):ys.append(a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0]))
 return(min(ys),max(ys))if ys else None
def union(x):
 out=[]
 for a,b in sorted(i for p in ps if(i:=interval(p,x))):
  if out and a<=out[-1][1]:out[-1]=(out[-1][0],max(out[-1][1],b))
  else:out.append((a,b))
 return out
# Polygon edge self-crossings would make min/max insufficient: reject them.
for p in ps:
 pe=list(zip(p,p[1:]+p[:1]))
 for i,(a,b)in enumerate(pe):
  for j,(c,d)in enumerate(pe):
   if len({a,b,c,d})<4:continue
   u=(b[0]-a[0],b[1]-a[1]);v=(d[0]-c[0],d[1]-c[1]);den=cross(u,v)
   if den:
    ac=(c[0]-a[0],c[1]-a[1]);t=cross(ac,v)/den;q=cross(ac,u)/den
    assert not(0<t<1 and 0<q<1)
slabs=[]
for left,right in zip(events,events[1:]):
 mid=(left+right)/2
 # Each original polygon itself must have one vertical interval in this slab.
 for p in ps:
  cuts=[a[1]+(b[1]-a[1])*(mid-a[0])/(b[0]-a[0])for a,b in zip(p,p[1:]+p[:1])if min(a[0],b[0])<mid<max(a[0],b[0])]
  assert len(cuts)in[0,2]
 s=union(mid);assert len(s)==1
 slabs.append({'left':str(left),'right':str(right),'midpoint':str(mid),'unionInterval':[str(v)for v in s[0]]})
frontiers=[{'x':str(x),'intervals':[[str(a),str(b)]for a,b in union(x)]}for x in events];assert all(len(x['intervals'])==1 for x in frontiers)
xmin,xmax=events[0],events[-1];ymin=min(v[1]for p in ps for v in p);ymax=max(v[1]for p in ps for v in p);assert xmin==F('61.5')and xmax==B[0];assert union(xmax)==[(B[1],B[1])]
out={'schema':'hanja-original-source-prefix-candidate-proof/v1','glyph':'葯','root':'hkcs_m846f','pen':12,'mask':3,'fixtureSHA256':hashlib.sha256(fp.read_bytes()).hexdigest(),'segmentSHA256':hashlib.sha256(json.dumps(current,separators=(',',':')).encode()).hexdigest(),'sourceGeometryChanged':False,'guideChanged':False,'displayClock':'Original P intersect x>=82.3-(82.3-61.5)*p; p0 empty, p1 direct original P once','displayClockIsNew':True,'macroDirection':'原문12의 V 이후 아래왼쪽 hook; 원Q도 왼쪽진행','minimumX':str(xmin),'maximumX':str(xmax),'fullSpan':str(xmax-xmin),'maximumHeight':str(ymax-ymin),'areaUpperBoundCoefficient':str((xmax-xmin)*(ymax-ymin)),'areaLimitAtZero':0,'sharedOriginalPEdge':[[str(v)for v in A],[str(v)for v in B]],'sharedEdgeXOverlapForPositiveP':'min((104/5)*p,3)>0','strictPriorInteriorSeedClaimed':False,'priorConnectionKind':'positive-length shared boundary of original P, not strict interior overlap','allPositivePPrefixConnectedToCompletedPriorP':True,'singleIntervalSlabs':slabs,'singleIntervalFrontiers':frontiers,'actualPriorGateRequired':'exact prior12m2 sole original P under fully committed original-Q7 mask, fullQ7 P coverage certificate; before/after current-frame owner/document/style/no transforms','sourceFieldsChanged':False,'nativeApproval':False,'runtimeApplied':False,'notRasterProof':True}
print(json.dumps(out,ensure_ascii=False,separators=(',',':')))
