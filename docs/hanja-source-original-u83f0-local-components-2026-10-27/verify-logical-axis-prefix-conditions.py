from pathlib import Path
from fractions import Fraction as F
import ast, hashlib, json

R=Path(__file__).resolve().parents[2]
FIXTURE='docs/hanja-source-original-u83f0-local-components-2026-10-27/fixtures-draft.json'
HELPER='docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py'
PINS={FIXTURE:'80df51355acb56c1b1d69fe5c67e866fb1d484f325e361d91a0b582e3ea11485',HELPER:'35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf'}
for path,digest in PINS.items():assert hashlib.sha256((R/path).read_bytes()).hexdigest()==digest
fixture=json.loads((R/FIXTURE).read_text())['u83f0']
helper=(R/HELPER).read_text()
namespace={'F':F,'re':__import__('re')}
for function in ast.parse(helper).body:
    if isinstance(function,ast.FunctionDef) and function.name in ('polygons','cross','state'):
        exec(compile(ast.get_source_segment(helper,function),HELPER+'::pure-path-helper-only','exec'),namespace)
polygons,cross,state=[namespace[k] for k in ('polygons','cross','state')]

def section(poly,axis,value):
    other=1-axis
    cuts=set()
    for a,b in zip(poly,poly[1:]+poly[:1]):
        if a[axis]==b[axis]:
            if a[axis]==value:cuts.update((a[other],b[other]))
        elif min(a[axis],b[axis])<=value<=max(a[axis],b[axis]):
            t=(value-a[axis])/(b[axis]-a[axis]);cuts.add(a[other]+t*(b[other]-a[other]))
    cuts=sorted(cuts)
    result=[(v,v) for v in cuts]
    for a,b in zip(cuts,cuts[1:]):
        point=[F(0),F(0)];point[axis]=value;point[other]=(a+b)/2
        if state(tuple(point),poly)>=0:result.append((a,b))
    return result

def merge(intervals):
    result=[]
    for a,b in sorted(intervals):
        if result and a<=result[-1][1]:result[-1]=(result[-1][0],max(result[-1][1],b))
        else:result.append((a,b))
    return result

def intersection(a,b,c,d):
    v=(b[0]-a[0],b[1]-a[1]);u=(d[0]-c[0],d[1]-c[1]);den=v[0]*u[1]-v[1]*u[0]
    if not den:return None
    w=(c[0]-a[0],c[1]-a[1]);t=(w[0]*u[1]-w[1]*u[0])/den;s=(w[0]*v[1]-w[1]*v[0])/den
    return (a[0]+t*v[0],a[1]+t*v[1]) if 0<=t<=1 and 0<=s<=1 else None

def audit(pen,axis,direction):
    source=fixture['strokes'][pen-1]
    pp=[p for mask in source for p in polygons(mask['outline'])]
    edges=[(a,b) for p in pp for a,b in zip(p,p[1:]+p[:1]) if a!=b]
    events={p[axis] for poly in pp for p in poly}
    for i,(a,b) in enumerate(edges):
        for c,d in edges[i+1:]:
            point=intersection(a,b,c,d)
            if point is not None:events.add(point[axis])
    events=sorted(events)
    at=[];between=[]
    for value in events:
        intervals=merge([v for p in pp for v in section(p,axis,value)])
        at.append({'value':value,'intervals':intervals})
    for low,high in zip(events,events[1:]):
        value=(low+high)/2
        intervals=merge([v for p in pp for v in section(p,axis,value)])
        between.append({'low':low,'high':high,'sample':value,'intervals':intervals})
    failures=[{'kind':'event',**v} for v in at if len(v['intervals'])!=1]+[{'kind':'open-slab',**v} for v in between if len(v['intervals'])!=1]
    # Each intersection/order-change is an event. Between events endpoint
    # order is constant, so one exact midpoint certifies that open slab.
    passed=not failures
    start=events[0] if direction=='increasing' else events[-1]
    finish=events[-1] if direction=='increasing' else events[0]
    return {'pen':pen,'axis':'x' if axis==0 else 'y','directionHypothesis':direction,'logicalMasks':len(source),'sourcePolygons':len(pp),'eventCount':len(events),'openSlabCount':len(between),'allEventSectionsSingleInterval':all(len(v['intervals'])==1 for v in at),'allOpenSlabSectionsSingleInterval':all(len(v['intervals'])==1 for v in between),'wholeLogicalAxisMonotone':passed,'nonemptyProjectionInterval':[events[0],events[-1]],'startCoordinate':start,'completionCoordinate':finish,'failureCount':len(failures),'firstFailures':failures[:3],'halfPlanePrefixGeometryEligible':passed,'initialCutMustExplicitlyBeEmptyAtProgressZero':True,'cutForPositiveProgress':'start+(finish-start)*p','sourceDirectionApproved':False,'sourceMicroClockApproved':False,'nativeApproval':False,'runtimeApplied':False}

def encode(value):
    if isinstance(value,F):return str(value)
    if isinstance(value,dict):return {k:encode(v) for k,v in value.items()}
    if isinstance(value,(tuple,list)):return [encode(v) for v in value]
    return value

out={'schema':'hanja-local-whole-logical-axis-prefix-conditions/v1','glyph':'菰','inputs':PINS,'coordinateFrame':'Exact decimal tokens of all compiled P for each entire logical stroke; no P/Q regeneration or mask rearrangement.','results':[audit(8,0,'decreasing'),audit(9,1,'increasing'),audit(11,0,'increasing'),audit(11,1,'increasing'),audit(12,1,'increasing')],'method':['Every original P vertex and proper edge intersection is an axis event.','At every event and exact midpoint of every open event slab, compute all closed original-P line sections by winding classification, then merge their union.','Between events every edge endpoint is affine and no boundary order changes; interval connectivity is constant.','A PASS certifies one connected interval at every nonempty axis section, hence the nested half-plane prefix family geometry; it does not prove publisher direction or microtime.'],'completedOnsetMathReexecuted':False,'pen10MathReexecuted':False,'sourcePOrQOrWidthOrWeightChanged':False,'engine':0,'server':0,'native':0,'runtimeApplied':False,'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
print(json.dumps(encode(out),indent=2))
