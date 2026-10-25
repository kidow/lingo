from pathlib import Path
from fractions import Fraction as F
import re,json
R=Path('/Users/kidow/Documents/dev/kidow/lingo');f=json.loads((R/'docs/hanja-source-original-u846f-hkcs-2026-10-25/fixtures.json').read_text())['hkcs_m846f']
def polys(s):
 out=[]
 for part in s.split(' Z'):
  if part.strip():
   n=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',part)];out.append([(n[i],n[i+1])for i in range(0,len(n),2)])
 return out
def cross(a,b):return a[0]*b[1]-a[1]*b[0]
def axis_facts():
 results=[]
 for pen,masks in enumerate(f['strokes'],1):
  for mask,s in enumerate(masks,1):
   if s['direction']=='curve':continue
   assert s['direction']in['right','down'];axis=0 if s['direction']=='right'else 1
   ps=[[(v[axis],v[1-axis])for v in p]for p in polys(s['outline'])];edges=[e for p in ps for e in zip(p,p[1:]+p[:1])];events={v[0]for p in ps for v in p}
   for a,b in edges:
    for c,d in edges:
     u=(b[0]-a[0],b[1]-a[1]);v=(d[0]-c[0],d[1]-c[1]);den=cross(u,v)
     if den:
      ac=(c[0]-a[0],c[1]-a[1]);t=cross(ac,v)/den;q=cross(ac,u)/den
      if 0<=t<=1 and 0<=q<=1:events.add(a[0]+t*u[0])
   events=sorted(events)
   def union(x):
    ivs=[]
    for p in ps:
     ys=[]
     for a,b in zip(p,p[1:]+p[:1]):
      if a[0]==b[0]:
       if x==a[0]:ys.extend([a[1],b[1]])
      elif min(a[0],b[0])<=x<=max(a[0],b[0]):ys.append(a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0]))
     if ys:ivs.append((min(ys),max(ys)))
    out=[]
    for a,b in sorted(ivs):
     if out and a<=out[-1][1]:out[-1]=(out[-1][0],max(out[-1][1],b))
     else:out.append((a,b))
    return out
   slabs=[]
   polygonSingle=True
   for a,b in zip(events,events[1:]):
    mid=(a+b)/2
    for p in ps:
     ys=[v[1]+(w[1]-v[1])*(mid-v[0])/(w[0]-v[0])for v,w in zip(p,p[1:]+p[:1])if min(v[0],w[0])<mid<max(v[0],w[0])]
     if len(ys)not in[0,2]:polygonSingle=False
    slabs.append({'left':str(a),'right':str(b),'intervalCount':len(union(mid))})
   bound=[F(str(x))for x in s['bounds']];assert all(bound[0]<=x<=bound[2]and bound[1]<=y<=bound[3]for p in polys(s['outline'])for x,y in p)
   results.append({'pen':pen,'mask':mask,'direction':s['direction'],'sourceAxisClockUnchanged':True,'axis':'xy'[axis],'minimum':str(events[0]),'maximum':str(events[-1]),'slabs':slabs,'originalPolygonsSingleInterval':polygonSingle,'everySlabAndFrontierSingleInterval':polygonSingle and all(x['intervalCount']==1 for x in slabs)and all(len(union(x))==1 for x in events),'areaUpperBoundCoefficient':str((bound[2]-bound[0])*(bound[3]-bound[1])),'initialAreaLimit':0,'allOriginalVerticesWithinExactBounds':True,'notRasterOrPreviousStrokeContactProof':True})
 return results
print(json.dumps(axis_facts(),separators=(',',':')))
