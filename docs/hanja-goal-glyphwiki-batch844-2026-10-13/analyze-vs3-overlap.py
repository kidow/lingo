import json
from decimal import Decimal
from fractions import Fraction as F
from hashlib import sha256
from itertools import combinations
path='/Users/kidow/Documents/dev/kidow/lingo/docs/hanja-goal-glyphwiki-batch844-2026-10-13/engine-whole-u95d0-ue0103.json'
rawbytes=open(path,'rb').read()
w=json.loads(rawbytes,parse_float=Decimal)
cross=lambda a,b,c:(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def area(p):return sum(p[i][0]*p[(i+1)%len(p)][1]-p[(i+1)%len(p)][0]*p[i][1] for i in range(len(p)))/2 if len(p)>2 else F(0)
def triangles(original):
 p=list(original)
 if area(p)<0:p.reverse()
 # Analytical simplification only: exact collinear vertices do not alter the original polygon set.
 changed=True
 while changed and len(p)>3:
  changed=False
  for i in range(len(p)):
   a,b,c=p[i-1],p[i],p[(i+1)%len(p)]
   if cross(a,b,c)==0 and min(a[0],c[0])<=b[0]<=max(a[0],c[0]) and min(a[1],c[1])<=b[1]<=max(a[1],c[1]):
    p.pop(i);changed=True;break
 out=[]
 while len(p)>3:
  ear=None
  for i in range(len(p)):
   a,b,c=p[i-1],p[i],p[(i+1)%len(p)]
   if cross(a,b,c)<=0:continue
   blocked=any(cross(a,b,q)>=0 and cross(b,c,q)>=0 and cross(c,a,q)>=0 for k,q in enumerate(p) if k not in {i,(i-1)%len(p),(i+1)%len(p)})
   if not blocked:ear=i;out.append([a,b,c]);break
  assert ear is not None,'No exact triangulation ear'
  p.pop(ear)
 out.append(p)
 assert sum(area(t) for t in out)==abs(area(original))
 assert all(area(t)>0 for t in out)
 return out
def clip(subject,clipping):
 output=subject
 for a,b in zip(clipping,clipping[1:]+clipping[:1]):
  pts=output;output=[]
  if not pts:break
  prev=pts[-1];pv=cross(a,b,prev)
  for current in pts:
   cv=cross(a,b,current)
   if (pv>=0)!=(cv>=0):
    t=pv/(pv-cv);output.append((prev[0]+t*(current[0]-prev[0]),prev[1]+t*(current[1]-prev[1])))
   if cv>=0:output.append(current)
   prev=current;pv=cv
 return output
polys=[]
for r in [18,19]:
 for i,p in enumerate(w['groups'][r]['polygons']):
  points=[(F(v['x']),F(v['y'])) for v in p]
  polys.append({'raw':r,'polygon':i,'points':points,'triangles':triangles(points),'area':abs(area(points))})
pairs=[];links={}
for a,b in combinations(range(len(polys)),2):
 pieces=[clip(x,y) for x in polys[a]['triangles'] for y in polys[b]['triangles']]
 ar=sum(abs(area(p)) for p in pieces)
 contact=any(len(p)>0 for p in pieces)
 if contact:links.setdefault(a,[]).append(b);links.setdefault(b,[]).append(a)
 pairs.append({'a':[polys[a]['raw'],polys[a]['polygon']],'b':[polys[b]['raw'],polys[b]['polygon']],'areaExact':str(ar),'areaKage200':float(ar),'contact':contact,'positiveArea':ar>0})
crossRaw=sum(F(p['areaExact']) for p in pairs if p['a'][0]!=p['b'][0])
seen=set();components=[]
for i in range(len(polys)):
 if i in seen:continue
 pending=[i];component=[]
 while pending:
  j=pending.pop()
  if j in seen:continue
  seen.add(j);component.append([polys[j]['raw'],polys[j]['polygon']]);pending.extend(links.get(j,[]))
 components.append(component)
print(json.dumps({'sourceFileSHA256':sha256(rawbytes).hexdigest(),'method':'Exact Fraction arithmetic on original JSON decimal vertices; validated ear triangulation; triangle clipping; no geometry modification','sourcePolygons':[{'raw':p['raw'],'polygon':p['polygon'],'areaExact':str(p['area']),'triangles':len(p['triangles'])} for p in polys],'pairIntersections':pairs,'crossRawPairwiseIntersectionSumExact':str(crossRaw),'crossRawIntersectionAreaKage200':float(crossRaw),'positiveCrossRawArea':crossRaw>0,'unionConnectedByOriginalAreaOrBoundaryContact':len(components)==1,'originalPolygonContactComponents':components,'coordinatesChanged':False,'nativeApproval':False}))
