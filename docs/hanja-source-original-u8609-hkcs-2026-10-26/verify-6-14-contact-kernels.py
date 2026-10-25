from pathlib import Path
from fractions import Fraction as F
import json,hashlib
R=Path(__file__).resolve().parents[2];P='docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json';b=(R/P).read_bytes();assert hashlib.sha256(b).hexdigest()=='35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6'
f=json.loads(b)['hkcs_m8609'];full=f['fullProof'];rows=[]
def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def box(p):return[min(x for x,y in p),min(y for x,y in p),max(x for x,y in p),max(y for x,y in p)]
def convex(p):
 signs=[cross(p[i],p[(i+1)%len(p)],p[(i+2)%len(p)])for i in range(len(p))];assert all(x>0 for x in signs)or all(x<0 for x in signs);return signs
for pen,rawH,rawV,anchor,witness in [(6,6,7,(F('76.5'),F('23.5')),(F('77.2'),F('19.7'))),(14,16,17,(F(74),F(48)),(F('74.65'),F('44.2')))]:
 hcall=full['trace'][rawH-1][0];vcall=full['trace'][rawV-1][0];assert len(hcall['polygons'])==1 and len(vcall['polygons'])==2
 ps=[[(F(str(v['x']))/2,F(str(v['y']))/2)for v in p]for p in hcall['polygons']+vcall['polygons']];H,B,D=ps;cert=[];eps=[]
 for name,p in zip(['priorH','body','head'],ps):
  turn=convex(p);orient=1 if turn[0]>0 else-1
  margins=[orient*cross(a,p[(i+1)%len(p)],anchor)for i,a in enumerate(p)];assert min(margins)>0
  for i,a in enumerate(p):
   nxt=p[(i+1)%len(p)];eps.append(margins[i]/(1+abs(nxt[0]-a[0])+abs(nxt[1]-a[1])))
  cert.append({'P':name,'vertices':[[str(x)for x in a]for a in p],'strictlyConvex':True,'anchorSignedEdgeMargins':[str(x)for x in margins]})
 e=min(eps);assert e>0;hb,bb,db=map(box,ps);assert H and set(H)=={(hb[0],hb[1]),(hb[2],hb[1]),(hb[2],hb[3]),(hb[0],hb[3])};assert set(B)=={(bb[0],bb[1]),(bb[2],bb[1]),(bb[2],bb[3]),(bb[0],bb[3])}
 xgap=min(hb[2],bb[2])-max(hb[0],bb[0]);ystart=bb[1];yend=min(hb[3],bb[3]);assert xgap>0 and hb[1]<=ystart<yend
 p=F(1,100);vb=[F(str(x))for x in f['strokes'][pen-1][1]['bounds']];cut=vb[1]+p*(vb[3]-vb[1]);orient=1 if convex(D)[0]>0 else-1;assert all(orient*cross(a,D[(i+1)%len(D)],witness)>0 for i,a in enumerate(D));assert witness[1]<cut<hb[1]
 rows.append({'pen':pen,'rawOneBased':[rawH,rawV],'anchor':[str(x)for x in anchor],'commonKernelInterior':True,'commonAnchorLInfinityHalfWidth':str(e),'polygons':cert,'bodyDownPrefixPriorContact':{'xOverlap':str(xgap),'prefixYStart':str(ystart),'priorOverlapYEnd':str(yend),'positiveAreaForEveryPositivePrefixHeight':True},'headHomotheticClip':{'center':'same original common-kernel anchor','nestedForAllScale0to1':True,'scale0AreaZero':True,'scale1EqualsFullOriginalHead':True,'positiveContactToPriorHAndFullBodyForEveryPositiveScale':True,'argument':'Convex original head contains anchor interior; each anchor-centered positive homothety contains an anchor-neighborhood and is nested inside original head. The same anchor-neighborhood lies inside prior H and full body.'},'bboxDownPrefixCounterexample':{'progress':'1/100','cut':str(cut),'strictOriginalHeadWitness':[str(x)for x in witness],'allTargetInkYLessThanPriorHMinY':str(hb[1]),'priorContactImpossibleAtThisCut':True},'QArgsUnchanged':[hcall['args'],vcall['args']]})
print(json.dumps({'schema':'hanja-source-contact-kernel-feasibility/v1','date':'2026-10-26','glyph':'蘉','fixture':{'path':P,'SHA256':hashlib.sha256(b).hexdigest()},'coordinates':'normalized100; exact original decimal200 P divided by2','rows':rows,'scope':'Exact geometric feasibility only for fixed original prior-H/body/head. No phase clock, no source modification, no renderer, no original animation equivalence and no native approval. Nonempty head/body prefixes can each stay attached through prior H; standalone target connectivity without prior H is not claimed.','sourcePOrQChanged':False,'phaseTimingApproved':False,'policyImplemented':False,'nativeApproval':False,'engine':0,'projection':0,'runtimeApplied':False},separators=(',',':')))
