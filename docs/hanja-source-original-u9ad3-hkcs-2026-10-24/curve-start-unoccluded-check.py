"""Fixed-point exact source facts only; no path animation or engine execution."""
from fractions import Fraction as F
from pathlib import Path
import hashlib,json,re,sys
ROOT=Path(__file__).resolve().parents[2]
HERE=Path(__file__).resolve().parent
FIXTURE=ROOT/'docs/hanja-source-original-u9ad3-hkcs-2026-10-24/fixtures.json'
FACTS=HERE/'curve-start-unoccluded-facts.json'
TARGETS=[(5,1),(6,2),(8,3),(12,1),(17,3),(20,1),(21,1),(23,1),(23,2)]
FROZEN='7fdbb4c5403f12809c8f08161235f6a9e54b3c0ad3226ebb2667f3f79ee0773a'
def sha(raw):return hashlib.sha256(raw).hexdigest()
def polys(outline):
 return [[(F(n[i]),F(n[i+1]))for i in range(0,len(n),2)]for part in outline.split(' Z')if part.strip()for n in[re.findall(r'-?\d+(?:\.\d+)?(?:e[+-]?\d+)?',part)]]
def classify(poly,q):
 x,y=q;inside=False
 for a,b in zip(poly,poly[1:]+poly[:1]):
  z=(b[0]-a[0])*(y-a[1])-(b[1]-a[1])*(x-a[0])
  if z==0 and min(a[0],b[0])<=x<=max(a[0],b[0])and min(a[1],b[1])<=y<=max(a[1],b[1]):return -1
  if (a[1]>y)!=(b[1]>y):
   hit=a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1])
   if hit>x:inside=not inside
 return 1 if inside else 0
def edge_distance2(a,b,q):
 v=(b[0]-a[0],b[1]-a[1]);vv=v[0]**2+v[1]**2
 t=F(0)if vv==0 else max(F(0),min(F(1),((q[0]-a[0])*v[0]+(q[1]-a[1])*v[1])/vv))
 return (q[0]-a[0]-t*v[0])**2+(q[1]-a[1]-t*v[1])**2
def margin(polys_,q):return min(edge_distance2(a,b,q)for p in polys_ for a,b in zip(p,p[1:]+p[:1]))
def input_():
 raw=FIXTURE.read_bytes();assert sha(raw)==FROZEN
 return json.loads(raw)['hkcs_m9ad3']
def target_(f,pen,mask):
 s=f['strokes'][pen-1][mask-1];prior=[z for p in f['strokes'][:pen-1]for z in p]+f['strokes'][pen-1][:mask-1]
 args=re.findall(r'-?\d+(?:\.\d+)?(?:e[+-]?\d+)?',s['revealPath']);q0=(F(args[0]),F(args[1]))
 return s,polys(s['outline']),[q for v in prior for q in polys(v['outline'])],q0,len(prior)
def check_witness(f,row):
 p,m=row['pen'],row['mask'];s,own,prior,q0,n=target_(f,p,m);q=tuple(map(F,row['witness']))
 assert row['sourceFieldSHA256']==sha(json.dumps(s,separators=(',',':'),ensure_ascii=False).encode())
 assert row['previousOriginalMasks']==n and row['previousOriginalP']==len(prior)
 assert any(classify(poly,q)==1 for poly in own)
 assert all(classify(poly,q)==0 for poly in prior)
 d2=(q[0]-q0[0])**2+(q[1]-q0[1])**2;assert d2<F(49)
 assert row['radiusSquaredMargin']==str(F(49)-d2)
 inside=[poly for poly in own if classify(poly,q)==1];assert margin(inside,q)>0 and margin(prior,q)>0
 assert row['ownInteriorBoundaryDistanceSquared']==str(margin(inside,q))
 assert row['allPriorBoundaryDistanceSquared']==str(margin(prior,q))
 return True
def search():
 f=input_();rows=[]
 # Finite quarter-unit offsets, increasing distance, sufficient for finding a witness only.
 offsets=sorted([(F(a,4),F(b,4))for a in range(-27,28)for b in range(-27,28)if a*a+b*b<784],key=lambda q:(q[0]**2+q[1]**2,q[1],q[0]))
 for p,m in TARGETS:
  s,own,prior,q0,n=target_(f,p,m);found=None
  # Float prefilter is not evidence: every chosen witness is rechecked with Fraction.
  op=[[(float(x),float(y))for x,y in v]for v in own];pp=[[(float(x),float(y))for x,y in v]for v in prior]
  for dx,dy in offsets:
   q=(q0[0]+dx,q0[1]+dy);fp=(float(q[0]),float(q[1]))
   if not any(classify(v,fp)==1 for v in op)or any(classify(v,fp)!=0 for v in pp):continue
   if not any(classify(v,q)==1 for v in own)or any(classify(v,q)!=0 for v in prior):continue
   d2=dx*dx+dy*dy;chosen=[poly for poly in own if classify(poly,q)==1]
   found={'pen':p,'mask':m,'status':'strict-witness-found','sourceFieldSHA256':sha(json.dumps(s,separators=(',',':'),ensure_ascii=False).encode()),'originalGuide':s['revealPath'],'originalStart':[str(x)for x in q0],'witness':[str(x)for x in q],'previousOriginalMasks':n,'previousOriginalP':len(prior),'radiusSquaredMargin':str(F(49)-d2),'ownInteriorBoundaryDistanceSquared':str(margin(chosen,q)),'allPriorBoundaryDistanceSquared':str(margin(prior,q)),'insideOwnOriginalP':True,'strictlyOutsideEveryPreviousOriginalP':True,'strictlyInsideOriginalStartRadius7Disk':True};break
  rows.append(found or {'pen':p,'mask':m,'status':'unresolved-no-witness-found-on-finite-search','searchNotAnExhaustiveAbsenceProof':True})
 return {'schema':'hanja-original-curve-start-unoccluded-facts/v1','glyph':'髓','providerRoot':'hkcs_m9ad3','fixture':{'path':str(FIXTURE.relative_to(ROOT)),'SHA256':FROZEN},'geometrySHA256':'e5abfd7fc4b7db418b2911a477bf0b800b6b0be6f45b2f21e422d7a0d7068899','scope':'One strict original-P point per target, outside ALL completed original masks preceding that target including earlier logical pens, inside the unmodified original M start radius7 disk. This does not assert actual growing-radius exposure, failure of revised policies, all-time connectivity, or playback approval.','search':'Quarter-unit offsets from original M; increasing squared radius, no exhaustive absence claim. Float prefilter only, exact Fraction facts checked separately.','targets':rows,'cardinalProofIsSeparate':True,'initialCapsProofRepeated':False,'fullQtubeProofRepeated':False,'sourceEngineRepeated':False,'sourceGeometryChanged':False,'nativeApproval':False,'runtimeApplied':False}
if __name__=='__main__':
 if '--search-new' in sys.argv:print(json.dumps(search(),ensure_ascii=False));sys.exit()
 f=input_();r=json.loads(FACTS.read_text());assert r['fixture']['SHA256']==FROZEN
 assert [(t['pen'],t['mask'])for t in r['targets']]==TARGETS
 passed=0;unresolved=0
 for row in r['targets']:
  if row['status']=='strict-witness-found':assert check_witness(f,row);passed+=1
  else:assert row['status']=='unresolved-no-witness-found-on-finite-search';unresolved+=1
 print(json.dumps({'fixedWitnessFocusedPASS':True,'strictWitnesses':passed,'unresolved':unresolved,'targets':len(TARGETS),'searchReplay':0,'initialCapsMathReplay':0,'fullQtubeProofReplay':0,'engine':0}))
