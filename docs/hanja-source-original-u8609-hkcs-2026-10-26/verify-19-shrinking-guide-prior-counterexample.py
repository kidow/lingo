from pathlib import Path
from fractions import Fraction as F
import json,hashlib,re
R=Path(__file__).resolve().parents[2] if '__file__'in globals()else Path('/Users/kidow/Documents/dev/kidow/lingo')
P='docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json';raw=(R/P).read_bytes();assert hashlib.sha256(raw).hexdigest()=='35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6'
f=json.loads(raw)['hkcs_m8609']
def sub(a,b):return(a[0]-b[0],a[1]-b[1])
def det(a,b):return a[0]*b[1]-a[1]*b[0]
def cross(a,b,p):return det(sub(b,a),sub(p,a))
def area(p):return sum(det(a,b)for a,b in zip(p,p[1:]+p[:1]))/2
def parse(outline):
 out=[]
 for part in re.findall(r'M([^Z]+)Z',outline):
  v=[F(x)for x in re.findall(r'-?\d+(?:\.\d+)?',part)];assert len(v)%2==0;out.append(list(zip(v[::2],v[1::2])))
 return out
def clip(poly,a,b,orient):
 out=[]
 for u,v in zip(poly,poly[1:]+poly[:1]):
  fu=orient*cross(a,b,u);fv=orient*cross(a,b,v)
  if fu>=0:out.append(u)
  if (fu<0<fv)or(fv<0<fu):
   t=fu/(fu-fv);out.append((u[0]+t*(v[0]-u[0]),u[1]+t*(v[1]-u[1])))
 clean=[]
 for p in out:
  if not clean or clean[-1]!=p:clean.append(p)
 if len(clean)>1 and clean[0]==clean[-1]:clean.pop()
 return clean

s=f['strokes'][18][1];h=f['strokes'][18][0];head=parse(s['outline'])[1]
values=[F(v)for v in re.findall(r'-?\d+(?:\.\d+)?',s['revealPath'])];q0=tuple(values[:2]);right=F(str(h['bounds'][2]));gap=q0[0]-right;assert gap>0
turns=[cross(head[i],head[(i+1)%len(head)],head[(i+2)%len(head)])for i in range(len(head))];assert min(turns)>0
margins=[cross(a,b,q0)for a,b in zip(head,head[1:]+head[:1])];assert min(margins)>0
r=min(m/(abs(b[0]-a[0])+abs(b[1]-a[1]))for m,(a,b)in zip(margins,zip(head,head[1:]+head[:1])))
Dmax=min(F(7),r,gap/4);assert Dmax>0
upperL=sum(abs(values[i]-values[i-2])for i in range(2,6));assert upperL>0
print(json.dumps({'schema':'hanja-shrinking-guide-prior-counterexample/v1','date':'2026-10-26','glyph':'蘉','pen':19,'mask':2,'Q0':[str(v)for v in q0],'priorRight':str(right),'strictGapX':str(gap),'Q0StrictInsideHead':True,'headMargins':[str(v)for v in margins],'strictHeadLInfRadius':str(r),'DmaxStrict':str(Dmax),'controlPolygonL1UpperLength':str(upperL),'sufficientPositivePDomainUpper':str(Dmax/upperL),'supportBound':'All prefix centers are within D of Q0; every guide/cap radius <=D, hence all displayed support lies within 2D of Q0.','positiveInk':'For 0<D<Dmax, the source head contains the start disk of radius D; visible original ink is nonempty with positive area.','separation':'For 0<D<Dmax<=gap/4, displayed support x>priorRight+gap/2. It is disjoint from this completed original prior H.','scope':'Counterexample to all-positive-D direct prior-H contact for the proposed source-centered shrinking tube only; not a native observation or an animation impossibility.','sourcePOrQOrWidth14Changed':False,'candidateImplemented':False,'engine':0,'projection':0,'server':0,'nativeApproval':False,'runtimeApplied':False}))
