from pathlib import Path
from fractions import Fraction as F
import ast,json,hashlib
R=Path(__file__).resolve().parents[2]
PINS={"docs/hanja-current-source-u9008-2026-10-18/engine-whole-u9008.json":"e919e19d5e37595880dcb76dfe50b96254e9eb6e92e84cfea34421e52a861c04","docs/hanja-current-source-u9008-2026-10-18/sources.json":"8889060d63d4089bab03ab4646d6ebaf12cfeda3eabc45778aec33a9782542b7","docs/hanja-source-raw-compare-u9008-2026-10-24/native-whole-review.json":"cb2940cb876cbb59fe5785472782d858b5109e367ef2242c24e84f3f2958e4c6","docs/hanja-current-source-u9008-2026-10-18/source-inventory.json":"d03d2a9d4edfd185d846520e689271b2d70314d51c05c612de2776aa9ddf61aa","docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py":"2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76"}
for p,h in PINS.items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
f=json.loads((R/'docs/hanja-current-source-u9008-2026-10-18/engine-whole-u9008.json').read_bytes());assert len(f['groups'])==14 and sum(map(len,f['trace']))==15 and sum(len(g['polygons'])for g in f['groups'])==27
assert all(v['off']==0 for g in f['groups']for p in g['polygons']for v in p)
assert f['trace'][7][0]['kind']=='cdDrawLine'and f['trace'][7][0]['args']==[80.6,51.51,80.6,162.76,12,0]
assert f['trace'][5][0]['kind']=='cdDrawBezier'and f['trace'][5][0]['args']==[53,152,68,172,84,181,179,177,7,0]
P=[[[tuple(F(str(v[k]))for k in['x','y'])for v in p]for p in g['polygons']]for g in f['groups']]
UTIL='docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py';ub=(R/UTIL).read_bytes();allow={'vec','det','value','union_row','events'};fn=[n for n in ast.parse(ub).body if isinstance(n,ast.FunctionDef)and n.name in allow];assert {n.name for n in fn}==allow;exec(compile(ast.Module(body=fn,type_ignores=[]),str(R/UTIL),'exec'),globals())
def bounds(ps):return[min(v[0]for p in ps for v in p),min(v[1]for p in ps for v in p),max(v[0]for p in ps for v in p),max(v[1]for p in ps for v in p)]
def cross(a,b,p):return det(vec(b,a),vec(p,a))
def winding(p,poly):
 w=0
 for a,b in zip(poly,poly[1:]+poly[:1]):
  c=cross(a,b,p)
  if a[1]<=p[1]<b[1]and c>0:w+=1
  if b[1]<=p[1]<a[1]and c<0:w-=1
 return w
A=P[7];results=[]
for raw in range(1,7):
 B=P[raw-1];ba,bb=bounds(A),bounds(B);gx=max(F(0),ba[0]-bb[2],bb[0]-ba[2]);gy=max(F(0),ba[1]-bb[3],bb[1]-ba[3])
 if gx or gy:results.append({'sourceRaw':raw,'classification':'strict-gap-by-disjoint-axis-bounds','boundingGapX':str(gx),'boundingGapY':str(gy)});continue
 lo=max(ba[1],bb[1]);hi=min(ba[3],bb[3]);ys=events(A+B,lo,hi);area=F(0);slabs=[];witness=None
 for a,b in zip(ys,ys[1:]):
  y=(a+b)/2
  for l,r in union_row(A,y):
   for u,v in union_row(B,y):
    L=max([l,u],key=lambda z:value(z,y));H=min([r,v],key=lambda z:value(z,y))
    if value(H,y)<=value(L,y):continue
    width=(H[0]-L[0],H[1]-L[1]);cellArea=width[0]*(b*b-a*a)/2+width[1]*(b-a);assert cellArea>0;area+=cellArea
    W=((value(L,y)+value(H,y))/2,y);slabs.append({'lo':str(a),'hi':str(b),'area':str(cellArea)})
    if witness is None:
     aa=next(p for p in A if winding(W,p));bbp=next(p for p in B if winding(W,p));margin=min(abs(cross(c,d,W))/(abs(d[0]-c[0])+abs(d[1]-c[1]))for p in[aa,bbp]for c,d in zip(p,p[1:]+p[:1])if c!=d)
     if margin>0:
      h=min(margin/2,F(1,100));assert all(winding((W[0]+sx*h,W[1]+sy*h),aa)and winding((W[0]+sx*h,W[1]+sy*h),bbp)for sx in[-1,1]for sy in[-1,1]);witness={'point':list(map(str,W)),'strictBoxHalf':str(h),'boxArea':str(4*h*h),'supportingLineMargin':str(margin)}
 assert area>0 and witness
 results.append({'sourceRaw':raw,'classification':'positive-area-original-fill-overlap','areaInOriginal200':str(area),'areaInNormalized100':str(area/4),'positiveOpenSlabs':slabs,'witnessOriginal200':witness})
out={'schema':'hanja-original-enclosure-sweep-contact/v1','date':'2026-10-26','glyph':'逈','root':'u9008','inputs':PINS,'fixedRoot':'u9008@9 -> u9008-j@2','sourceShape':{'raw':14,'calls':15,'P':27},'enclosureLeftVerticalRaw':8,'walkingRadicalRaw1to6':True,'enclosureVerticalTrace':f['trace'][7][0]['args'],'walkingSweepRaw':6,'walkingSweepTrace':f['trace'][5][0]['args'],'results':results,'method':{'exactRationalFromOriginalDecimal':True,'coordinateSpace':'original public200; normalized100 area is divided by4','independentOriginalPNonzeroFillUnion':True,'utilityASTAllowlist':sorted(allow),'utilityTargetLoopsExecuted':0,'allVertexAndSegmentCrossingSlabs':True},'limits':['This certifies only static original filled-P contact for the exact saved current source.','Positive area overlap is stronger than boundary-only attachment; other5 radical rows are separated by strict bounding gaps.','It does not approve domestic stroke grouping, order, directions, correction, dynamic masks or runtime registration.','No source shape is deleted/moved, and no private dictionary image/SVG is read or stored.'], 'sourceGeometryChanged':False,'engine':0,'projection':0,'nativeScreens':0,'runtimeApplied':False}
print(json.dumps(out,separators=(',',':')))
