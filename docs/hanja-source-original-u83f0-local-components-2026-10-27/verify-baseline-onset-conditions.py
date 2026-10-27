from pathlib import Path
from fractions import Fraction as F
import ast, hashlib, json, re

R = Path(__file__).resolve().parents[2]
FIXTURE = 'docs/hanja-source-original-u83f0-local-components-2026-10-27/fixtures-draft.json'
METHOD = 'docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py'
PINS = {FIXTURE: '80df51355acb56c1b1d69fe5c67e866fb1d484f325e361d91a0b582e3ea11485', METHOD: '95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396'}
for path, digest in PINS.items():
    assert hashlib.sha256((R/path).read_bytes()).hexdigest() == digest
fixture = json.loads((R/FIXTURE).read_text())['u83f0']
strokes = fixture['strokes']
targets = [(5, 2), (6, 2), (7, 1), (8, 1), (9, 2), (10, 2), (11, 1), (12, 1)]

def polygons(outline):
    assert set(re.findall('[A-Za-z]', outline)) <= {'M', 'L', 'Z'}
    result = []
    for section in outline.split('M')[1:]:
        section = section.strip()
        assert section.endswith('Z')
        values = [F(v) for v in re.findall(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?', section)]
        assert len(values) % 2 == 0
        result.append(list(zip(values[::2], values[1::2])))
    return result

def cross(a, b, p):
    return (b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])

def state(v, poly):
    winding = 0
    for a, b in zip(poly, poly[1:]+poly[:1]):
        c = cross(a, b, v)
        if c == 0 and min(a[0], b[0]) <= v[0] <= max(a[0], b[0]) and min(a[1], b[1]) <= v[1] <= max(a[1], b[1]):
            return 0
        if a[1] <= v[1] < b[1] and c > 0:
            winding += 1
        if b[1] <= v[1] < a[1] and c < 0:
            winding -= 1
    return 1 if winding else -1

def area(poly):
    return abs(sum(a[0]*b[1]-a[1]*b[0] for a, b in zip(poly, poly[1:]+poly[:1])))/2 if poly else F(0)

def margin(v, poly):
    return min(abs(cross(a,b,v))/(abs(b[0]-a[0])+abs(b[1]-a[1])) for a,b in zip(poly,poly[1:]+poly[:1]) if a != b)

method = (R/METHOD).read_text()
function = next(n for n in ast.parse(method).body if isinstance(n, ast.FunctionDef) and n.name == 'audit')
prefix = ast.get_source_segment(method, function).split('\n anchor=tuple', 1)[0] + '\n return P,boundary,kernel'
assert 'startAnchor' not in prefix and 'nearest=' not in prefix

def witness(q0, current, prior):
    # Finite rational existence witnesses only; none becomes a reveal anchor.
    for poly in current:
        center = tuple(sum(p[k] for p in poly)/len(poly) for k in (0,1))
        destinations = [center] + poly + [tuple((a[k]+b[k])/2 for k in (0,1)) for a,b in zip(poly,poly[1:]+poly[:1])]
        for destination in destinations:
            for t in (F(1,2), F(1,4), F(1,8), F(1,16), F(1,32)):
                v = tuple(q0[k]+t*(destination[k]-q0[k]) for k in (0,1))
                if state(v,poly) != 1 or any(state(v,p) != -1 for p in prior):
                    continue
                d = min([F(1,4096), margin(v,poly)/2] + [margin(v,p)/2 for p in prior])
                if d <= 0:
                    continue
                corners = [(v[0]+sx*d,v[1]+sy*d) for sx in (-1,1) for sy in (-1,1)]
                if all(sum((p[k]-q0[k])**2 for k in (0,1)) < 49 for p in corners):
                    assert all(state(p,poly)==1 and all(state(p,old)==-1 for old in prior) for p in corners)
                    return {'center':v,'halfWidth':d,'targetPolygon':current.index(poly)+1,'strictDisk7':True,'outsideAllPriorInk':True,'positiveArea':4*d*d}
    return None

results=[]
for pen,mask in targets:
    if (pen,mask)==(10,2):
        results.append({'pen':pen,'mask':mask,'reusedOnly':True,'binding':fixture['dyadicInputBinding'],'newMathExecuted':False})
        continue
    segment=strokes[pen-1][mask-1]
    current=polygons(segment['outline'])
    prior=[poly for oldpen in strokes[:pen-1] for oldmask in oldpen for poly in polygons(oldmask['outline'])]
    prior += [poly for oldmask in strokes[pen-1][:mask-1] for poly in polygons(oldmask['outline'])]
    previousMask=polygons(strokes[pen-1][mask-2]['outline']) if mask>1 else []
    numbers=[F(v) for v in re.findall(r'[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',segment['revealPath'])]
    assert len(numbers)==6 and segment['revealWidth']==14
    q0,control,q1=list(zip(numbers[::2],numbers[1::2]))
    public={'groups':[{'polygons':[[{'x':2*x,'y':2*y} for x,y in p] for p in current]}]}
    namespace={'F':F,'f':public}
    exec(compile(prefix,METHOD+'::boundary-kernel-prefix-only','exec'),namespace)
    pp,boundary,kernel=namespace['audit'](1)
    checks=[]
    for t in (F(0),F(1,16),F(1,8),F(1,4)):
        v=tuple((1-t)**2*q0[k]+2*t*(1-t)*control[k]+t*t*q1[k] for k in (0,1))
        margins=[cross(a,b,v)/(abs(b[0]-a[0])+abs(b[1]-a[1])) for a,b in boundary if a!=b]
        checks.append({'t':t,'point':v,'strictKernel':bool(kernel) and min(margins)>0,'kernelMinimumMargin':min(margins) if margins else None,'insidePreviousMask':any(state(v,p)==1 for p in previousMask),'insideAllPriorInk':any(state(v,p)==1 for p in prior),'onPriorBoundary':any(state(v,p)==0 for p in prior)})
    monotone={axis:('increasing' if q0[k]<=control[k]<=q1[k] and q0[k]!=q1[k] else 'decreasing' if q0[k]>=control[k]>=q1[k] and q0[k]!=q1[k] else 'not-strict-direction') for k,axis in enumerate(('x','y'))}
    results.append({'pen':pen,'mask':mask,'polygons':len(current),'kernelArea':area(kernel),'kernelPositiveArea':area(kernel)>0,'sourceQ0':q0,'testedDyadics':checks,'sourceQAxisOrderOnly':monotone,'wholeLogicalMonotonePrefixProved':False,'initialRoundDiskNewInkBox':witness(q0,current,prior),'POrQOrWidthOrWeightChanged':False})

def encode(v):
    if isinstance(v,F): return str(v)
    if isinstance(v,dict): return {k:encode(x) for k,x in v.items()}
    if isinstance(v,(list,tuple)): return [encode(x) for x in v]
    return v

print(json.dumps(encode({'schema':'hanja-local-compiled-baseline-onset-conditions/v1','glyph':'菰','inputs':PINS,'coordinateFrame':'Exact decimal tokens of compiled100-frame P and original compiled Q; no coordinates regenerated.','results':results,'method':'Existing exact union-boundary/kernel prefix, finite four source-Q parameters, finite rational new-ink box witnesses.','limits':['Kernel tests are sufficient-family conditions, not approval of a renderer or publisher clock.','Failed witness search does not prove no positive-area new ink.','Axis order of Q alone does not prove a whole-logical monotone prefix.','Pen10 existing exact-bound t1/8 joint proof is reused without recomputation.'],'sourceClockApproved':False,'nativeApproval':False,'runtimeApplied':False,'engine':0,'verifierSHA256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}),separators=(',',':')))
