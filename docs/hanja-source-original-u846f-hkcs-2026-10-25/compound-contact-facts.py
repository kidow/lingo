from pathlib import Path
from fractions import Fraction as F
import ast,json,re
R=Path('/Users/kidow/Documents/dev/kidow/lingo')
src=(R/'docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py').read_text();tree=ast.parse(src)
ns={'F':F,'re':re};exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in ['cross','area','contains','ears','polys']],type_ignores=[]),'<existing-pure-polygon-definitions>','exec'),ns)
f=json.loads((R/'docs/hanja-source-original-u846f-hkcs-2026-10-25/fixtures.json').read_text())['hkcs_m846f'];polys=ns['polys'];ears=ns['ears'];cross=ns['cross'];area=ns['area']
def intersect(subject,tri):
 out=list(subject)
 for a,b in zip(tri,tri[1:]+tri[:1]):
  old=out;out=[]
  if not old:break
  for p,q in zip(old,old[1:]+old[:1]):
   cp,cq=cross(a,b,p),cross(a,b,q);ip,iq=cp>=0,cq>=0
   if ip:out.append(p)
   if ip!=iq:
    t=cp/(cp-cq);out.append(tuple(p[k]+t*(q[k]-p[k])for k in[0,1]))
 return out
def classify(p,q):
 inside=False
 for a,b in zip(p,p[1:]+p[:1]):
  z=cross(a,b,q)
  if z==0 and min(a[0],b[0])<=q[0]<=max(a[0],b[0])and min(a[1],b[1])<=q[1]<=max(a[1],b[1]):return -1
  if(a[1]>q[1])!=(b[1]>q[1])and a[0]+(q[1]-a[1])*(b[0]-a[0])/(b[1]-a[1])>q[0]:inside=not inside
 return 1 if inside else 0
def cls(ps,p):return 1 if any(classify(poly,p)==1 for poly in ps)else -1 if any(classify(poly,p)==-1 for poly in ps)else 0
results=[]
for pen,mask in[(5,2),(6,2),(12,2),(12,3)]:
 current=f['strokes'][pen-1][mask-1];prior=f['strokes'][pen-1][mask-2];cp,pp=polys(current['outline']),polys(prior['outline']);nums=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',current['revealPath'])];q0=tuple(nums[:2]);priorq=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',prior['revealPath'])]if 'revealPath'in prior else None;end=tuple(priorq[-2:])if priorq else None
 witness=None
 for pi,p in enumerate(cp):
  if witness:break
  for qi,q in enumerate(pp):
   if witness:break
   for a in ears(p):
    if witness:break
    for b in ears(q):
     poly=intersect(a,b)
     if len(poly)>=3 and abs(area(poly))>0:
      seed=tuple(sum(v[k]for v in poly)/len(poly)for k in[0,1])
      if cls(cp,seed)==1 and cls(pp,seed)==1:
       witness={'currentPolygon':pi,'previousPolygon':qi,'strictSeed':[str(v)for v in seed],'positiveIntersectionTriangleClipArea':str(abs(area(poly))),'intersectionPolygon':[[str(x)for x in v]for v in poly]};break
 results.append({'pen':pen,'mask':mask,'currentQStart':[str(x)for x in q0],'currentQStartInCurrentP':cls(cp,q0),'currentQStartInPreviousP':cls(pp,q0),'originalGuideGap':[str(q0[k]-end[k])for k in[0,1]]if end else None,'strictOriginalPContact':witness,'priorFullQ7CoverageAvailable':prior['direction']=='curve','allPDisplayContactProved':False})
print(json.dumps(results,separators=(',',':')))
