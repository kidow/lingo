#!/usr/bin/env python3
# Public-only bounded numerical coverage certificate; no source or renderer mutation.
import sys
sys.dont_write_bytecode=True
from pathlib import Path
from fractions import Fraction as F
import json,math,re,hashlib
ROOT=Path(__file__).resolve().parents[2]
HERE=Path(__file__).resolve().parent
EPS=1e-8
def sub(a,b):return(a[0]-b[0],a[1]-b[1])
def norm(a):return math.hypot(*a)
def dot(a,b):return a[0]*b[0]+a[1]*b[1]
def mid(a,b):return((a[0]+b[0])/2,(a[1]+b[1])/2)
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def line_dist(p,a,b):
 d=sub(b,a);v=dot(d,d);t=max(0,min(1,dot(sub(p,a),d)/v))if v else 0
 return norm(sub(p,(a[0]+t*d[0],a[1]+t*d[1])))
def ev(c,t):
 v=0
 for x in c:v=v*t+x
 return v
def roots(c):
 while len(c)>1 and abs(c[0])<1e-18:c=c[1:]
 if len(c)==1:return[]
 if len(c)==2:
  t=-c[1]/c[0];return[t]if 0<t<1 else[]
 crit=roots([c[i]*(len(c)-1-i)for i in range(len(c)-1)]);cuts=[0]+crit+[1];out=[t for t in crit if abs(ev(c,t))<1e-10]
 for a,b in zip(cuts,cuts[1:]):
  fa,fb=ev(c,a),ev(c,b)
  if fa==0:out.append(a)
  if fb==0:out.append(b)
  if fa*fb<0:
   for _ in range(60):
    m=(a+b)/2;fm=ev(c,m)
    if fa*fm<=0:b=m;fb=fm
    else:a=m;fa=fm
   out.append((a+b)/2)
 return out
def bezier(ps,t):
 while len(ps)>1:ps=[((1-t)*a[0]+t*b[0],(1-t)*a[1]+t*b[1])for a,b in zip(ps,ps[1:])]
 return ps[0]
def split(ps):
 rows=[ps]
 while len(rows[-1])>1:rows.append([mid(a,b)for a,b in zip(rows[-1],rows[-1][1:])])
 return[row[0]for row in rows],[row[-1]for row in rows[::-1]]
def q_upper(p,line,q):
 A=(q[0][0]-2*q[1][0]+q[2][0],q[0][1]-2*q[1][1]+q[2][1]);B=(2*(q[1][0]-q[0][0]),2*(q[1][1]-q[0][1]));E=sub(q[0],p)
 candidates=roots([2*dot(A,A),3*dot(A,B),dot(B,B)+2*dot(A,E),dot(B,E)])
 # Evaluated actual guide points are valid distance upper bounds even if a numeric root is missed.
 return min(line_dist(p,*line),*(norm(sub(p,bezier(q,t)))for t in[0,1]+candidates))
def bbox_dist(p,ps):
 xs=[a[0]for a in ps];ys=[a[1]for a in ps]
 return math.hypot(max(min(xs)-p[0],0,p[0]-max(xs)),max(min(ys)-p[1],0,p[1]-max(ys)))
def q_outside(p,line,q,radius):
 if line_dist(p,*line)-EPS<=radius:return None
 stack=[(q,0)];leaves=[]
 while stack:
  ps,depth=stack.pop();lower=bbox_dist(p,ps)-EPS
  if lower>radius:leaves.append(lower);continue
  if depth>=20:return None
  a,b=split(ps);stack.extend([(a,depth+1),(b,depth+1)])
 return min([line_dist(p,*line)-EPS]+leaves)
def parse(d):
 tok=re.findall(r'[MLQCZ]|-?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?',d);i=0;segments=[];polys=[];points=[];current=None;first=None
 while i<len(tok):
  c=tok[i];i+=1;assert c in'MLQCZ';n={'M':2,'L':2,'Q':4,'C':6,'Z':0}[c];v=[F(x)for x in tok[i:i+n]];i+=n;ps=list(zip(v[::2],v[1::2]))
  if c=='M':
   assert not points;current=first=ps[0];points=[current]
  elif c=='Z':
   if current!=first:segments.append([current,first])
   if points[-1]==first:points.pop()
   polys.append(points);points=[];current=first
  else:segments.append([current]+ps);current=ps[-1];points.append(current)
 if points:assert not polys
 return segments,polys
def segment_intersects(a,b,c,d):
 def on(p,q,r):return cross(p,q,r)==0 and min(p[0],q[0])<=r[0]<=max(p[0],q[0])and min(p[1],q[1])<=r[1]<=max(p[1],q[1])
 x,y,u,v=cross(a,b,c),cross(a,b,d),cross(c,d,a),cross(c,d,b)
 return(x*y<0 and u*v<0)or any([x==0 and on(a,b,c),y==0 and on(a,b,d),u==0 and on(c,d,a),v==0 and on(c,d,b)])
def earclip(poly):
 p=list(poly)
 changed=True
 while changed:
  changed=False
  for i in range(len(p)):
   a,b,c=p[i-1],p[i],p[(i+1)%len(p)]
   if b==a or b==c or(cross(a,b,c)==0 and min(a[0],c[0])<=b[0]<=max(a[0],c[0])and min(a[1],c[1])<=b[1]<=max(a[1],c[1])):
    p.pop(i);changed=True;break
 assert len(p)>=3
 for i in range(len(p)):
  for j in range(i+1,len(p)):
   if j==i+1 or(i==0 and j==len(p)-1):continue
   assert not segment_intersects(p[i],p[(i+1)%len(p)],p[j],p[(j+1)%len(p)]),'endpoint polygon not simple'
 area=sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(p,p[1:]+p[:1]));assert area!=0
 if area<0:p.reverse()
 triangles=[]
 while len(p)>3:
  found=False
  for i in range(len(p)):
   a,b,c=p[i-1],p[i],p[(i+1)%len(p)]
   if cross(a,b,c)<=0:continue
   if any(cross(a,b,q)>=0 and cross(b,c,q)>=0 and cross(c,a,q)>=0 for k,q in enumerate(p)if k not in [(i-1)%len(p),i,(i+1)%len(p)]):continue
   triangles.append((a,b,c));p.pop(i);found=True;break
  assert found,'no exact ear found'
 triangles.append(tuple(p));return triangles
def hull(points):
 p=sorted(set(points))
 if len(p)<3:return[]
 lo=[]
 for q in p:
  while len(lo)>=2 and cross(lo[-2],lo[-1],q)<=0:lo.pop()
  lo.append(q)
 hi=[]
 for q in reversed(p):
  while len(hi)>=2 and cross(hi[-2],hi[-1],q)<=0:hi.pop()
  hi.append(q)
 h=lo[:-1]+hi[:-1];return[(h[0],h[i],h[i+1])for i in range(1,len(h)-1)]
def cover(triangles,distance,radius):
 stack=[(tuple(tuple(float(v)for v in p)for p in tri),0)for tri in triangles];nodes=0;depthmax=0;maximum=0
 while stack:
  tri,depth=stack.pop();nodes+=1;depthmax=max(depthmax,depth);c=tuple(sum(p[i]for p in tri)/3 for i in[0,1]);bound=distance(c)+max(norm(sub(p,c))for p in tri)+EPS
  if bound<=radius:maximum=max(maximum,bound);continue
  if depth>=16 or nodes>=60000:return{'covered':False,'nodes':nodes,'maxDepth':depthmax,'reason':'bounded conservative region unresolved; not insufficient-width proof'}
  a,b,c=tri;ab,bc,ca=mid(a,b),mid(b,c),mid(c,a);stack.extend((t,depth+1)for t in[(a,ab,ca),(ab,b,bc),(ca,bc,c),(ab,bc,ca)])
 return{'covered':True,'nodes':nodes,'maxDepth':depthmax,'maxAcceptedUpperDistance':maximum}
def run():
 fixture=json.loads((HERE/'fixtures-execution-draft.json').read_text());check=json.loads((HERE/'execution-draft-check.json').read_text());facts=check['facts'];rows=[]
 for pen,row in enumerate(fixture['strokes'],1):
  for mask,s in enumerate(row,1):
   if s['direction']!='curve':continue
   radius=s['revealWidth']/2;guide_segments,_=parse(s['revealPath']);guide=[[tuple(float(v)for v in p)for p in seg]for seg in guide_segments];witnesses=[]
   if pen<=18:
    assert len(guide)==2 and len(guide[0])==2 and len(guide[1])==3
    line,q=guide;distance=lambda p:q_upper(p,line,q);_,polys=parse(s['outline']);triangles=[(p[0],p[i],p[i+1])for p in polys for i in range(1,len(p)-1)]
    for p in[p for poly in polys for p in poly]:
     p=tuple(map(float,p));lower=q_outside(p,line,q,radius)
     if lower is not None:witnesses.append({'originalFilledVertex':p,'distanceLower':lower,'distanceUpper':distance(p),'necessaryWidthGreaterThan':2*lower})
    coverage=cover(triangles,distance,radius);region='Original P fan superset; concave exterior may make result unresolved'
   else:
    # Work entirely in the unplaced source-normalized frame. The exact invertible revealTransform proof is already pinned.
    fact=next(f for f in facts if f.get('logical')==pen);original=fact['sourceOriginalD'];segments,polys=parse(original)
    normp=lambda p:(p[0]/10,(F(900)-p[1])/10)
    segments=[[normp(p)for p in seg]for seg in segments];polys=[[normp(p)for p in poly]for poly in polys]
    assert len(polys)==1 and all(len(seg)==2 for seg in guide)
    distance=lambda p:min(line_dist(p,*line)for line in guide)
    triangles=[];error=None
    try:
     triangles=earclip(polys[0])
     for seg in segments:
      if len(seg)>2:triangles+=hull(seg)
    except AssertionError as e:error=str(e)
    for seg in segments:
     # Every sampled point lies on an unchanged original filled contour; controls alone are not treated as filled witnesses.
     for j in range(257):
      p=tuple(map(float,bezier(seg,F(j,256))));value=distance(p)
      if value-EPS>radius:witnesses.append({'originalFilledBoundarySample':p,'segmentDegree':len(seg)-1,'t':j/256,'distanceLower':value-EPS,'distanceUpper':value+EPS,'necessaryWidthGreaterThan':2*(value-EPS)});break
    coverage={'covered':False,'reason':error}if error else cover(triangles,distance,radius)
    region='Exact simple endpoint-chord polygon ear triangles plus every original Q/C control convex hull. Replacing each curve by its chord can only change filled winding inside that curve hull; this union conservatively covers the original filled region. No product/source path flattening.'
   state='OUTLIER-CONFIRMED'if witnesses else'PASS-CONSERVATIVE-COVERAGE'if coverage['covered']else'UNPROVED'
   rows.append({'pen':pen,'mask':mask,'source':'KAGE P/Q'if pen<=18 else'HanziWriter original凡 filled D / source-affine median mask','radiusInGuideFrame':radius,'revealWidth':s['revealWidth'],'revealTransform':s.get('revealTransform'),'status':state,'coverage':coverage,'coverageRegion':region,'outliers':witnesses[:4],'outlierWitnessCount':len(witnesses),'nativeApproval':False})
 assert len(rows)==8
 return{'schema':'hanja-public-mixed-filled-coverage-preflight/v1','date':'2026-10-28','glyph':'臝','scope':'Full round guide only: dash and source-start clip removed. This is bounded numerical source coverage, not animation, temporal, raster or runtime approval.','inputSHA256':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest()for p in[HERE/'fixtures-execution-draft.json',HERE/'execution-draft-check.json',Path(__file__).resolve()]},'numerics':{'margin':EPS,'triangleDepthLimit':16,'triangleNodeLimit':60000,'QOutsideControlBoxDepthLimit':20,'MMBoundarySamplesPerCurve':257,'formalIntervalProof':False},'counts':{'masks':8,'pass':sum(r['status']=='PASS-CONSERVATIVE-COVERAGE'for r in rows),'outlier':sum(r['status']=='OUTLIER-CONFIRMED'for r in rows),'unproved':sum(r['status']=='UNPROVED'for r in rows)},'units':rows,'limits':['KAGE fan regions include possible concave exterior; unresolved does not prove width insufficient.','Only actual source P vertices or unchanged D boundary samples with a global guide-distance lower bound count as outliers.','MM preflight uses the source-local mask frame; exact existing source-affine binding transports containment to placed outlines.','A full-round coverage pass does not approve start gate, acute join, compound transition, completion switch, native residual or replay.','No widths, padding, source geometry, renderer or registration were changed.'],'nativeApproval':False,'runtimeApplied':False,'serverStarts':0,'buildRun':False}
if __name__=='__main__':
 print(json.dumps(run(),ensure_ascii=False))
