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
rows=[]
for pen,mask in [(2,3),(13,2)]:
 ps=polys(f['strokes'][pen-1][mask-1]['outline']);pp=[[(y,x)for x,y in p]for p in ps]
 lo=min(y for p in pp for x,y in p);hi=max(y for p in pp for x,y in p);es=events(pp,lo,hi);rs=[union_row(pp,(a+b)/2)for a,b in zip(es,es[1:])];joins=[]
 if all(len(r)==1 for r in rs):
  for i,y in enumerate(es[1:-1],1):
   a,b=rs[i-1][0],rs[i][0];joins.append(min(value(a[1],y),value(b[1],y))-max(value(a[0],y),value(b[0],y)))
 rows.append(dict(pen=pen,mask=mask,axis='x',minX=str(lo),maxX=str(hi),openSlabs=len(rs),singleIntervalEverySlab=all(len(r)==1 for r in rs),minimumCriticalJoin=str(min(joins))if joins else None,allCriticalJoinsPositive=bool(joins)and min(joins)>0))
# Strict convexity is a necessary precondition of the prior HV implementation.
for pen,mask in[(2,2),(9,2)]:
 ss=f['strokes'][pen-1];pp=polys(ss[mask-2]['outline'])+polys(ss[mask-1]['outline']);summary=[]
 for p in pp:
  area=sum(a[0]*p[(i+1)%len(p)][1]-p[(i+1)%len(p)][0]*a[1]for i,a in enumerate(p));assert area>0
  margins=[cross(a,p[(i+1)%len(p)],z)for i,a in enumerate(p)for j,z in enumerate(p)if j not in[i,(i+1)%len(p)]]
  summary.append(dict(vertices=len(p),strictConvex=min(margins)>0,minimumHalfplaneMargin=str(min(margins))))
 rows.append(dict(pen=pen,mask=mask,polygons=summary,eachPolygonStrictConvex=all(p['strictConvex']for p in summary),sourceHeadMinY=str(min(y for p in polys(ss[mask-1]['outline'])for x,y in p)),priorMinY=str(min(y for p in polys(ss[mask-2]['outline'])for x,y in p))))

sectionRows=rows
H=R/'docs/hanja-source-original-u8b92-hkcs-2026-10-26/verify-hv-common-kernels.py';assert hashlib.sha256(H.read_bytes()).hexdigest()=="0b72bb71b6b311c663f1eb5fe8f7d9832159484d67c0fe53166671b9381da966"
for n in ast.parse(H.read_text()).body:
 if isinstance(n,ast.FunctionDef)and n.name in {'intersect','area'}:exec(compile(ast.Module(body=[n],type_ignores=[]),str(H),'exec'))
rows=[]
for pen,mask in[(2,2),(9,2)]:
 ss=f['strokes'][pen-1];h=polys(ss[mask-2]['outline']);v=polys(ss[mask-1]['outline']);allp=h+v[:2]
 joint=[(F(-1000),F(-1000)),(F(1000),F(-1000)),(F(1000),F(1000)),(F(-1000),F(1000))]
 for p in allp:joint=intersect(joint,p)
 rows.append(dict(pen=pen,mask=mask,sourcePIncluded=len(allp),excludedLowerFoot=len(v)>2,kernelArea=str(area(joint))if len(joint)>2 else '0',vertices=[[str(x)for x in p]for p in joint],scope='Halfplane kernel only. Concave-P simplicity and closed cross-section conditions not yet certified; no policy or clock/native approval.'))

print(json.dumps(dict(sectionConditions=sectionRows,halfplaneKernelCandidates=rows)))
