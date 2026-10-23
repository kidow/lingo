# New failed-target facts only. Do not rerun unchanged successful proofs.
import pathlib,json
from fractions import Fraction as F
r=pathlib.Path(__file__).resolve().parents[2];full=json.loads((r/'docs/hanja-source-original-full-u785c-2026-10-23/engine-proof.json').read_text());h,v=full['trace'][3][0],full['trace'][4][0];assert h['kind']==v['kind']=='cdDrawLine';assert h['args']==[33.695,87,65.02,87,2,2];assert v['args']==[65.02,87,65.02,155,22,23];q=[tuple(F(str(p[k]))for k in ['x','y'])for p in v['polygons'][0]];A,B,C,D=q;assert A[0]==B[0]and C[0]==D[0]and A[1]==D[1]and D[1]<B[1]<C[1]and A[0]>C[0];E=(C[0],B[1]);rect=[A,B,E,D];tri=[B,C,E]
def area(p):return abs(sum(a[0]*p[(i+1)%len(p)][1]-p[(i+1)%len(p)][0]*a[1]for i,a in enumerate(p)))/2
assert area(rect)+area(tri)==area(q);assert area(rect)>0 and area(tri)>0
ep=(F('65.02')/2,F(155)/2);corner=(C[0]/2,C[1]/2);residual=sum((corner[i]-ep[i])**2 for i in [0,1]);assert residual>49
def distance2(p,a,b):
 d=tuple(b[i]-a[i]for i in [0,1]);t=max(F(0),min(F(1),sum((p[i]-a[i])*d[i]for i in [0,1])/sum(x*x for x in d)));return sum((p[i]-a[i]-t*d[i])**2 for i in [0,1])
start=tuple(F(str(x))/2 for x in v['args'][:2]);maxrect=max(distance2(tuple(z/2 for z in p),start,ep)for p in rect);assert maxrect<49
joint=start;serif=[tuple(F(str(p[k]))/2 for k in ['x','y'])for p in v['polygons'][1]];maxserif=max(sum((p[i]-joint[i])**2 for i in [0,1])for p in serif);assert maxserif<49
firstLength=(F(str(h['args'][2]))-F(str(h['args'][0])))/2;secondLength=(F(str(v['args'][3]))-F(str(v['args'][1])))/2;assert firstLength>7 and secondLength>7
out={'rawOneBased':[4,5],'verticalTerminalFlags':[22,23],'originalQuad':[[str(z)for z in p]for p in q],'intersectionE':[str(z)for z in E],'bodyRectangle':[[str(z)for z in p]for p in rect],'downTriangle':[[str(z)for z in p]for p in tri],'engineCoordinateAreas':{'quad':str(area(q)),'rectangle':str(area(rect)),'triangle':str(area(tri))},'normalizedAreas':{'quad':str(area(q)/4),'rectangle':str(area(rect)/4),'triangle':str(area(tri)/4)},'unchangedGuide':'M16.8475 43.5 L32.51 43.5 L32.51 77.5','unchangedWidth':14,'unchangedBodyWeight':'3973/80','newInnerTailWeight':str((C[1]-B[1])/2),'newBodyShare':'3973/4213','sourceGuideEndpoint':list(map(str,ep)),'outsideCorner':list(map(str,corner)),'outsideCornerDistanceSquared':str(residual),'outsideRadiusSquaredMargin':str(residual-49),'bodyRectangleMaxDistanceSquaredToOriginalV':str(maxrect),'topSerifMaxDistanceSquaredToOriginalJoint':str(maxserif),'firstOriginalLineLength':str(firstLength),'secondOriginalLineLength':str(secondLength),'proposedCounts':{'logicalPens':12,'displayMasks':16,'sourceOriginalPolygons':30,'displayPartitionFragments':31}}
print(json.dumps(out,separators=(',',':')))
