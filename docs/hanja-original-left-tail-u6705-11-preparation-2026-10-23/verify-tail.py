# New 朅11 original LEFT partition proof only; original masks stay14pens/15masks.
from pathlib import Path
from fractions import Fraction as F
import json,re,hashlib,gzip,base64
r=Path(__file__).resolve().parents[2]
fixture='docs/hanja-source-independent-qq-u6705-source-experiment-2026-10-23/fixtures.json'
fullfile='docs/hanja-source-raw-compare-u6705-2026-10-23/engine-whole-u6705.json'
f=json.loads((r/fixture).read_text())['u6705'];proof=json.loads((r/fullfile).read_text());seg=f['strokes'][10][0]
assert hashlib.sha256((r/fixture).read_bytes()).hexdigest()=='a4414ed12632efcd34934856579a5c45941631bf27d16e5069101e1f443b327f'
assert hashlib.sha256((r/fullfile).read_bytes()).hexdigest()=='9ed7129b5a50de139bce4fc494c2e216807d54c8f670f24f7a7b3988eb3b4675'
N=r'[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?'
def nums(s): return [F(v) for v in re.findall(N,s)]
def add(a,b): return tuple(x+y for x,y in zip(a,b))
def sub(a,b): return tuple(x-y for x,y in zip(a,b))
def scale(a,s): return tuple(x*s for x in a)
def dot(a,b): return sum(x*y for x,y in zip(a,b))
def cross(a,b): return a[0]*b[1]-a[1]*b[0]
def q(a,b,c,t): return add(add(scale(a,(1-t)**2),scale(b,2*t*(1-t))),scale(c,t*t))
def bez(a,b,c,d,t): return add(add(scale(a,(1-t)**3),scale(b,3*t*(1-t)**2)),add(scale(c,3*t*t*(1-t)),scale(d,t**3)))
def points(poly): return [(F(str(v['x']))/2,F(str(v['y']))/2) for v in poly]
def area2(p): return sum(cross(p[i],p[(i+1)%len(p)])for i in range(len(p)))
def strict_inside_convex(poly,p):
    values=[cross(sub(poly[(i+1)%len(poly)],poly[i]),sub(p,poly[i]))for i in range(len(poly))]
    return all(v>0 for v in values) or all(v<0 for v in values)
def convex(poly):
    vals=[cross(sub(poly[(i+1)%len(poly)],poly[i]),sub(poly[(i+2)%len(poly)],poly[(i+1)%len(poly)]))for i in range(len(poly))]
    return all(v>0 for v in vals) or all(v<0 for v in vals)
def no_interior_overlap(a,b):
    for p in [a,b]:
        for i in range(len(p)):
            e=sub(p[(i+1)%len(p)],p[i]); n=(-e[1],e[0])
            aa=[dot(v,n)for v in a];bb=[dot(v,n)for v in b]
            if max(aa)<=min(bb) or max(bb)<=min(aa):return True
    return False

c0,c1=proof['trace'][13];h=proof['trace'][12][0]
assert h['kind']=='cdDrawLine' and c0['kind']==c1['kind']=='cdDrawCurve'
assert c1['args'][-2:]==[2,14]
assert h['args'][2:4]==c0['args'][:2] and c0['args'][4:6]==c1['args'][:2]
opt1=int(c1['args'][-2]//1000);opt2=int(c1['args'][-1]%1000//100);defaults=proof['defaults'];width=F(defaults['kMinWidthT'])-F(opt1,2);jump=F(defaults['kWidth'])*4*min(1-F(opt2,10),(width/F(defaults['kMinWidthT']))**3)*(F(6)/width if width>6 else 1)
x2,y2=map(lambda x:F(str(x)),c1['args'][4:6]);floor10=lambda x:F((x*10).__floor__(),10);pt=lambda x,y:[floor10(x),floor10(y)]
expected=[pt(x2,y2),pt(x2,y2-width),pt(x2-jump,y2-width),pt(x2-jump,y2-width/2)]
actual=[[F(str(p['x'])),F(str(p['y']))]for p in c1['polygons'][-1]]
assert actual==expected and jump/2==10
H=points(h['polygons'][0]);Q0=[points(p)for p in c0['polygons']];Q1=[points(p)for p in c1['polygons']];tail=Q1[-1]
assert len(Q0)==2 and len(Q1)==2 and len(Q0[0])==len(Q1[0])==22 and len(tail)==4
assert convex(tail)
q0=tuple(F(str(v))/2 for v in c0['args'][:2]);c0c=tuple(F(str(v))/2 for v in c0['args'][2:4]);e0=tuple(F(str(v))/2 for v in c0['args'][4:6]);q1=tuple(F(str(v))/2 for v in c1['args'][:2]);c1c=tuple(F(str(v))/2 for v in c1['args'][2:4]);e1=tuple(F(str(v))/2 for v in c1['args'][4:6]);assert e0==q1
h0=tuple(F(str(v))/2 for v in h['args'][:2]);h1=tuple(F(str(v))/2 for v in h['args'][2:4]);assert h1==q0
def segdist2(p,a,b):
 v=sub(b,a);t=max(F(0),min(F(1),dot(sub(p,a),v)/dot(v,v)));return dot(sub(p,add(a,scale(v,t))),sub(p,add(a,scale(v,t))))
assert convex(H) and all(segdist2(v,h0,h1)<49 for v in H)
assert convex(Q0[1]) and all(dot(sub(v,q0),sub(v,q0))<49 for v in Q0[1])
cells=[];bounds=[]
for raw,a,c,b,body in [(13,q0,c0c,e0,Q0[0]),(13,q1,c1c,e1,Q1[0])]:
 local=[]
 for i in range(10):
  cell=[body[i],body[i+1],body[-2-i],body[-1-i]];assert convex(cell)
  anchor=q(a,c,b,F(2*i+1,20));d2=max(dot(sub(v,anchor),sub(v,anchor))for v in cell);assert d2<49,(len(cells),str(d2));local.append(cell);bounds.append(str(d2))
 assert sum(abs(area2(p))for p in local)==abs(area2(body))
 assert all(no_interior_overlap(local[i],local[j])for i in range(10)for j in range(i+1,10))
 cells+=local
assert len(cells)==20
assert all(no_interior_overlap(tail,p)for p in [H,Q0[1]]+cells)
right=max(x for x,y in tail);left=min(x for x,y in tail);top=min(y for x,y in tail);bottom=max(y for x,y in tail);assert [right,left,top,bottom]==[F('75.8'),F('65.8'),F('88.5'),F('91.5')]
assert [Q1[0][10],Q1[0][11]]==[(F('75.8'),F('94.5')),(F('75.8'),F('88.5'))]
assert (right,top)in tail and (right,bottom)in tail and bottom-top==3
# For every p>0, tail clip x>=right-10p preserves the same positive3-long right edge, shared with completed body.
assert right-left==10
witness=(F('66.3'),F(89));assert strict_inside_convex(tail,witness)
assert witness[1]-h0[1]>7 and min(q0[0],c0c[0],e0[0])-witness[0]>7 and min(q1[0],c1c[0],e1[0])-witness[0]>7
parts=seg['outline'].split(' M');assert len(parts)==5
def normalized_outline(poly):
 a=poly;sgn=area2(a);a=a if sgn>0 else [a[0]]+list(reversed(a[1:]));return'M'+' L'.join(str(float(x))+' '+str(float(y))for x,y in a)+' Z'
def outline_vertices(text):
 v=nums(text);return [(v[i],v[i+1])for i in range(0,len(v),2)]
def same_cycle(a,b):
 return any(a==x[i:]+x[:i]for x in [b,list(reversed(b))]for i in range(len(b)))
original_polys=[H,Q0[0],Q0[1],Q1[0],tail];source_parts=[outline_vertices(p if i==0 else'M'+p)for i,p in enumerate(parts)]
assert all(same_cycle(a,b)for a,b in zip(original_polys,source_parts))
weight=F(str(seg['weight']));share=weight/(weight+10)
result={'schema':'hanja-original-left-composite-feasibility/v1','glyph':'朅','root':'u6705','pen':11,'mask':1,'fixture':fixture,'fixtureSHA256':hashlib.sha256((r/fixture).read_bytes()).hexdigest(),'full5File':fullfile,'full5SHA256':hashlib.sha256((r/fullfile).read_bytes()).hexdigest(),'sourceFlag14':True,'sourceRawZeroBased':[12,13],'sourceCallIndexForTail':1,'originalSegment':seg,'originalBodyPolygons':4,'originalTailPolygons':1,'bodyQCells':20,'bodyCellsStrictRadius7Disks':True,'bodyCellRadiusSquaredBounds':bounds,'bodyCellsExactAreaAndNonOverlap':True,'HAndStartCornerCapsuleCovered':True,'tailOriginalVertices':[[str(x),str(y)]for x,y in tail],'tailFormulaExact':True,'tailInteriorOutsideOriginalWholeGuideWitness':[str(v)for v in witness],'bodyOutline':parts[0]+' '+ ' '.join('M'+p for p in parts[1:4]),'tailOutline':'M'+parts[4],'tailBounds':[str(left),str(top),str(right),str(bottom)],'tailDirection':'left','positiveTailPrefix':{'clip':'x>=right-10p, y88.5..91.5','everyPPositiveSharedVerticalEdge':['75.8','88.5','91.5'],'sharedEdgeLength':'3','newCoordinates':False},'displayClock':{'bodyWeight':str(weight),'leftClock':'10','bodyShare':[str(share.numerator),str(share.denominator)],'explicitNewMicroclock':True},'counts':{'sourcePens':14,'sourceMasks':15,'sourcePolygons':37,'newSourceMasks':0,'internalRevealPhases':2},'scope':{'sourcePGuideWidthWeightUnchanged':True,'originalInkPaintedOnce':True,'initialArcCertificatesSeparate':True,'notEveryBodyPartialPrefixProof':True,'notNativeRasterApproval':True,'sourceCompiler':0,'engine':0,'oldMathReexecuted':False,'nativeApproval':False,'runtimeApplied':False}}
print(json.dumps({'bodyCells':20,'tailFormulaExact':True,'sourceMasksPreserved':15,'proofGzipBase64':base64.b64encode(gzip.compress(json.dumps(result,ensure_ascii=False,separators=(',',':')).encode())).decode()},separators=(',',':')))
