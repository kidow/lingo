"""Public exact rational H-to-V contact proof; no server or private assets."""
import json,re,hashlib
from pathlib import Path
from fractions import Fraction as F
ROOT=Path(__file__).resolve().parents[2]
FIXTURE='unused-target-specified-in-SPECS'
PIN='unused-target-specified-in-SPECS'
def sha(b):return hashlib.sha256(b).hexdigest()
def cross(a,b):return a[0]*b[1]-a[1]*b[0]
def sub(a,b):return(a[0]-b[0],a[1]-b[1])
def polys(d):
 t=re.findall(r'[MLZ]|[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',d);out=[];i=0;p=[]
 while i<len(t):
  c=t[i];i+=1
  if c=='M':
   assert not p;p=[(F(t[i]),F(t[i+1]))];i+=2
  elif c=='L':p.append((F(t[i]),F(t[i+1])));i+=2
  elif c=='Z':assert len(p)>=3;out.append(p);p=[]
  else:raise ValueError('only exact original M/L/Z')
 assert not p;return out
 def_unused=0
def edges(p):return list(zip(p,p[1:]+p[:1]))
def inside(p,point):
 x,y=point;n=0
 for a,b in edges(p):
  v=cross(sub(b,a),sub(point,a))
  if v==0 and min(a[0],b[0])<=x<=max(a[0],b[0])and min(a[1],b[1])<=y<=max(a[1],b[1]):return False
  if a[1]<=y<b[1]and v>0:n+=1
  elif b[1]<=y<a[1]and v<0:n-=1
 return n!=0
def slices(ps,y):
 intervals=[]
 for p in ps:
  xs=[]
  for a,b in edges(p):
   if a[1]==b[1]:
    if y==a[1]:xs.extend([a[0],b[0]])
   elif min(a[1],b[1])<=y<=max(a[1],b[1]):xs.append(a[0]+(b[0]-a[0])*(y-a[1])/(b[1]-a[1]))
  if xs:intervals.append((min(xs),max(xs)))
 intervals.sort();merged=[]
 for l,r in intervals:
  if merged and l<=merged[-1][1]:merged[-1]=(merged[-1][0],max(r,merged[-1][1]))
  else:merged.append((l,r))
 return merged
def intersections(ps):
 es=[e for p in ps for e in edges(p)];ys={v[1]for p in ps for v in p}
 for a,b in es:
  for c,d in es:
   r,s=sub(b,a),sub(d,c);den=cross(r,s)
   if den:
    u=cross(sub(c,a),s)/den;v=cross(sub(c,a),r)/den
    if 0<=u<=1 and 0<=v<=1:ys.add(a[1]+u*r[1])
 return sorted(ys)
def st(v):return str(v)
def pair(pen,rows):
 h,v=rows;hp,vp=polys(h['outline']),polys(v['outline']);assert len(hp)==1 and len(vp)==2
 assert h['direction']=='right'and v['direction']=='down'

 for p in hp+vp:
  turns=[cross(sub(b,a),sub(c,b))for a,b,c in zip(p,p[1:]+p[:1],p[2:]+p[:2])]
  assert all(t>=0 for t in turns)or all(t<=0 for t in turns)
 # Guide start is the unchanged original body top; H centerline equals it.
 origin=vp[0][0][1];xmin=min(x for p in vp for x,y in p);xmax=max(x for p in vp for x,y in p);ymin=min(y for p in vp for x,y in p);ymax=max(y for p in vp for x,y in p)
 hr=max(x for x,y in hp[0]);seed=((xmin+hr)/2,origin)
 assert inside(hp[0],seed)and any(inside(p,seed)for p in vp)
 # Closed primitive body/head have a positive common interior witness below the body top.
 joint=(seed[0],origin+F(1,2));assert all(inside(p,joint)for p in vp)
 events=intersections(vp);probes=sorted(set(events+[(a+b)/2 for a,b in zip(events,events[1:])]))
 assert all(len(slices(vp,y))==1 for y in probes)
 assert ymin<origin<ymax
 return dict(pen=pen,mask=2,sourceH=sha(h['outline'].encode()),sourceV=sha(v['outline'].encode()),seed=[st(x)for x in seed],bodyHeadStrictWitness=[st(x)for x in joint],origin=st(origin),negativeExtent=st(origin-ymin),positiveExtent=st(ymax-origin),bounds=[st(xmin),st(ymin),st(xmax),st(ymax)],sourcePolygonVertices=[len(p)for p in vp],criticalY=[st(x)for x in events],sliceProbes=len(probes),allHorizontalSlicesOneInterval=True,predecessorStrictSeed=True,positiveBodyHeadOverlap=True,clipFormula='x=bounds[0], y=origin-negativeExtent*p, width=bounds[2]-bounds[0], height=(negativeExtent+positiveExtent)*p; p0 empty; p1 original full',sourceFieldsUnchanged=True)

SPECS=json.loads("[{\"glyph\":\"嗸\",\"fixture\":\"docs/hanja-authored-component-u55f8-ja-ao-bbox-gap1-v2-2026-10-29/fixtures-execution-draft.json\",\"SHA256\":\"314725854294450f222facc1bfcd3dfd62dc8f037297992d2ca3441c37ade30c\",\"geometrySHA256\":\"250c2cfd344809677863b6a31d4a1253b9b61e26e4fcfaf24388526d8131851a\",\"pens\":[13],\"logical\":14,\"masks\":15,\"P\":16},{\"glyph\":\"盌\",\"fixture\":\"docs/hanja-source-execution-u76cc-original-2026-10-29/fixtures-execution-draft-width22.json\",\"SHA256\":\"60f2b219228cfbd9a04363daf46541ababd2c0da6af8dc1d0072ae9e0600084d\",\"geometrySHA256\":\"92d33e5d5498253de98ed0104a975bd713b2287498734a8fa293c587078c7dd5\",\"pens\":[7],\"logical\":10,\"masks\":16,\"P\":28}]")
results=[]
for spec in SPECS:
 raw=(ROOT/spec['fixture']).read_bytes();assert sha(raw)==spec['SHA256'];f=json.loads(raw);rows=f['strokes'];assert len(rows)==spec['logical']and sum(map(len,rows))==spec['masks'];assert sum(s['outline'].count('M')for r in rows for s in r)==spec['P']
 results.append(dict(glyph=spec['glyph'],fixture=spec,targets=[pair(n,rows[n-1])for n in spec['pens']]))
print(json.dumps(dict(schema='hanja-public-cardinal-fold-contact-proof/v1',sources=results,sourceGeometryChanged=False,newFilledP=0,newGuide=0,previousOpaqueHCompleteRequired=True,originalWeightBoundaryUnchanged=True,localDisplayPolicyNotPublisherMicroclock=True,nativeApproval=False,runtimeApplied=False),ensure_ascii=False,indent=2))
