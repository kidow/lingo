from pathlib import Path
from fractions import Fraction as F
import json,ast,hashlib,re
R=Path(__file__).resolve().parents[2]
assert hashlib.sha256((R/"docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json").read_bytes()).hexdigest()=="9a4f42f0206be94e4905f2a177caef251dbce5f0d7073772a52a7d47f84eace8"
f=json.loads((R/'docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json').read_bytes())['hkcs_m5e6a']
T=R/'docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';assert hashlib.sha256(T.read_bytes()).hexdigest()=="2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76"
for n in ast.parse(T.read_text()).body:
 if isinstance(n,ast.FunctionDef) and n.name in {'vec','det','value','union_row','events'}:exec(compile(ast.Module(body=[n],type_ignores=[]),str(T),'exec'))
M=R/'docs/hanja-source-original-u846f-hkcs-2026-10-25/initial-feasibility.py';assert hashlib.sha256(M.read_bytes()).hexdigest()=="91670b2c888fd7cd691e4a19c9e43a498b0b964695ba2a7c975ab46bb958926e";ns={}
exec(compile(ast.Module(body=[n for n in ast.parse(M.read_text()).body if isinstance(n,(ast.Import,ast.ImportFrom,ast.FunctionDef))],type_ignores=[]),str(M),'exec'),ns)
polys,cross=ns['polys'],ns['cross']

H=R/'docs/hanja-source-original-u8b92-hkcs-2026-10-26/verify-hv-common-kernels.py';assert hashlib.sha256(H.read_bytes()).hexdigest()=="0b72bb71b6b311c663f1eb5fe8f7d9832159484d67c0fe53166671b9381da966"
for n in ast.parse(H.read_text()).body:
 if isinstance(n,ast.FunctionDef)and n.name in {'intersect','area','enc'}:exec(compile(ast.Module(body=[n],type_ignores=[]),str(H),'exec'))
def on(a,b,p):return cross(a,b,p)==0 and min(a[0],b[0])<=p[0]<=max(a[0],b[0])and min(a[1],b[1])<=p[1]<=max(a[1],b[1])
def hits(a,b,c,d):
 v=[cross(a,b,c),cross(a,b,d),cross(c,d,a),cross(c,d,b)]
 return(v[0]*v[1]<0 and v[2]*v[3]<0)or any(z==0 and on(x,y,p)for z,x,y,p in[(v[0],a,b,c),(v[1],a,b,d),(v[2],c,d,a),(v[3],c,d,b)])
rows=[]
for pen,mask in[(2,2),(9,2)]:
 ss=f['strokes'][pen-1];prior=polys(ss[mask-2]['outline']);current=polys(ss[mask-1]['outline']);used=prior+current[:2]
 simple=[]
 if pen==9:
  for poly in used:
   checked=0
   for i,(a,b)in enumerate(zip(poly,poly[1:]+poly[:1])):
    assert a!=b
    for j,(c,d)in enumerate(zip(poly,poly[1:]+poly[:1])):
     if j<=i or j in[(i+1)%len(poly),(i-1)%len(poly)]:continue
     assert not hits(a,b,c,d);checked+=1
   assert area(poly)>0;simple.append(dict(vertices=len(poly),nonadjacentPairs=checked,simple=True,signedArea=area(poly)))
 joint=[(F(-1000),F(-1000)),(F(1000),F(-1000)),(F(1000),F(1000)),(F(-1000),F(1000))]
 for poly in used:joint=intersect(joint,poly)
 assert len(joint)>=3 and area(joint)>0
 anchor=tuple(sum(v[j]for v in joint)/len(joint)for j in[0,1]);ratios=[]
 for poly in used:
  for a,b in zip(poly,poly[1:]+poly[:1]):
   margin=cross(a,b,anchor);assert margin>0;L=abs(b[0]-a[0])+abs(b[1]-a[1]);ratios.append(margin/L)
 delta=min(ratios)/2;box=[(anchor[0]+x*delta,anchor[1]+y*delta)for x,y in[(-1,-1),(1,-1),(1,1),(-1,1)]]
 assert delta>0
 margins=[[cross(a,poly[(i+1)%len(poly)],v)for i,a in enumerate(poly)for v in box]for poly in used];assert all(min(v)>0 for v in margins)
 lo=min(y for p in current for x,y in p);hi=max(y for p in current for x,y in p);assert lo<anchor[1]<hi and min(anchor[1]-lo,hi-anchor[1])>delta
 out=dict(pen=pen,mask=mask,simplePolygonChecks=simple,simpleProofFor2ReusedFromStrictConvexRecord=pen==2,kernelIntersection=joint,kernelArea=area(joint),anchor=anchor,strictBoxHalfWidth=delta,strictBox=box,strictAllEdgeBoxMargins=margins,yBounds=[lo,hi],conditionalCenteredBand=dict(parameter='Independent s, not approved product/publisher clock',lower='anchorY-(anchorY-minY)*s',upper='anchorY+(maxY-anchorY)*s',domain=[0,1],zeroHiddenRequired=True,oneOriginalPDirect=True,commonScaledBoxInsidePriorAndCurrentBodyHeadForPositiveS=True,positiveAreaLowerBound='4*delta^2*s^2',sourcePolygonsAndQUnchanged=True,priorExactCompleteOpaqueRequired=True))
 if pen==2:
  body,head,foot=current;assert len(current)==3
  footTop=min(y for x,y in foot);bodyBottom=max(y for x,y in body);assert footTop==bodyBottom==F(63)
  e1=sorted(x for x,y in foot if y==footTop);e2=sorted(x for x,y in body if y==bodyBottom);assert e1==e2==[F('30.2'),F('35.7')]
  assert all(y>=footTop for x,y in foot)and all(y<=bodyBottom for x,y in body)
  critical=(footTop-anchor[1])/(hi-anchor[1]);lowerAt=anchor[1]-(anchor[1]-lo)*critical;assert 0<critical<1 and lowerAt<min(y for x,y in body)
  assert min(cross(foot[i],foot[(i+1)%len(foot)],p)for i in range(len(foot))for j,p in enumerate(foot)if j not in[i,(i+1)%len(foot)])>0
  out['lowerFoot']=dict(originalP=3,edgeY=footTop,sharedClosedEdgeX=e1,positiveAreaOverlapWithBody=False,sourceBodyCompleteWhenFootFirstAppears=True,firstAppearanceParameter=critical,lowerBandAtFirstAppearance=lowerAt,convexOriginalFoot=True,belowBoundary='No foot area before upper<63; upper=63 gives shared original base only; upper>63 clipped convex foot contains shared base and remains attached to full body.',aaAcceptabilityApproved=False)
 else:out['starShapedJustification']='Every original polygon is simple, positive-oriented; anchor/strict box satisfies every original edge halfplane. This certifies the visibility kernel without requiring convexity. Intersection with the anchor-containing convex y-band stays star-shaped and shares the scaled box.'
 rows.append(out)
print(json.dumps(enc(dict(results=rows))))
