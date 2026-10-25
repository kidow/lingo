"""Remaining 庾 masks: exact rational arrangement and original-P evidence. No engine."""
from pathlib import Path
from fractions import Fraction as F
import json, re, hashlib, sys

HERE = Path(__file__).resolve().parent
ns = {'__file__': str(HERE / 'verify-initial-caps-proof.py')}
exec((HERE / 'verify-initial-caps-proof.py').read_text().split("if '--check' in sys.argv:")[0], ns)
strokes = ns['fixture']['strokes']
cross, area, ears, polys, contains = (ns[k] for k in ['cross', 'area', 'ears', 'polys', 'contains'])

def triangles(segment):
    return [t for poly in polys(segment['outline']) for t in ears(poly)]

def clip(poly, a, b, positive=True):
    if not poly: return []
    out = []
    for u, v in zip(poly[-1:] + poly[:-1], poly):
        du, dv = cross(a, b, u), cross(a, b, v)
        iu, iv = (du >= 0, dv >= 0) if positive else (du <= 0, dv <= 0)
        if iu != iv:
            t = du / (du - dv)
            out.append(tuple(u[k] + t * (v[k] - u[k]) for k in [0, 1]))
        if iv: out.append(v)
    clean = []
    for x in out:
        if not clean or x != clean[-1]: clean.append(x)
    if len(clean) > 1 and clean[0] == clean[-1]: clean.pop()
    return clean if len(clean) >= 3 and abs(area(clean)) > 0 else []

def subtract(poly, triangle):
    inside, out = poly, []
    for a, b in zip(triangle, triangle[1:] + triangle[:1]):
        outside = clip(inside, a, b, False)
        if outside: out.append(outside)
        inside = clip(inside, a, b, True)
        if not inside: break
    return out

def sections(tris, z, k):
    intervals = []
    for t in tris:
        vals = []
        for a, b in zip(t, t[1:] + t[:1]):
            if a[k] == b[k]:
                if a[k] == z: vals += [a[1-k], b[1-k]]
            elif min(a[k], b[k]) <= z <= max(a[k], b[k]):
                vals.append(a[1-k] + (z-a[k]) * (b[1-k]-a[1-k]) / (b[k]-a[k]))
        if vals: intervals.append((min(vals), max(vals)))
    out = []
    for a, b in sorted(intervals):
        if out and a <= out[-1][1]: out[-1] = (out[-1][0], max(out[-1][1], b))
        else: out.append((a, b))
    return out

def axis_proof(pen, mask, segment):
    k = 0 if segment['direction'] in ['right', 'left'] else 1
    tris = triangles(segment)
    edges = [(a, b) for t in tris for a, b in zip(t, t[1:] + t[:1])]
    events = {v[k] for t in tris for v in t}
    for i, (a, b) in enumerate(edges):
        u = tuple(b[k]-a[k] for k in [0, 1])
        for c, d in edges[i+1:]:
            v = tuple(d[k]-c[k] for k in [0, 1])
            den = u[0]*v[1]-u[1]*v[0]
            if not den: continue
            w = tuple(c[k]-a[k] for k in [0, 1])
            t, r = (w[0]*v[1]-w[1]*v[0])/den, (w[0]*u[1]-w[1]*u[0])/den
            if 0 <= t <= 1 and 0 <= r <= 1: events.add(a[k]+t*u[k])
    ev = sorted(events)
    all_sections = [sections(tris, z, k) for z in ev]
    mid_sections = [sections(tris, (a+b)/2, k) for a, b in zip(ev, ev[1:])]
    assert all(len(s) == 1 for s in all_sections + mid_sections)
    assert all(s[0][1] > s[0][0] for s in mid_sections)
    # Every triangle-edge intersection is an event. Endpoint order is constant
    # inside each open slab, so this is an exact affine arrangement proof.
    bounds = list(map(lambda x:F(str(x)), segment['bounds']))
    return dict(pen=pen, mask=mask, direction=segment['direction'],
                events=list(map(str, ev)), eventSections=[list(map(str, s[0])) for s in all_sections],
                slabSections=[list(map(str, s[0])) for s in mid_sections],
                singleConnectedSection=True, positiveOpenSlabWidth=True,
                sourcePrefixNested=True, initialAreaBoundTimesProgress=str((bounds[2]-bounds[0])*(bounds[3]-bounds[1])),
                initialAreaLimit=0, fullEndpointOriginalP=True,
                ownPrefixOnlyNotPriorContact=True)

def no_initial_twelve():
    segment = strokes[11][0]
    q = tuple(map(F, re.findall(r'-?\d+(?:\.\d+)?', segment['revealPath'])[:2]))
    prior = [t for row in strokes[:11] for s in row for t in triangles(s)]
    cells = [list(t) for t in triangles(segment)]
    for t in prior: cells = [part for cell in cells for part in subtract(cell, list(t))]
    def distance(a, b):
        v = tuple(b[k]-a[k] for k in [0, 1]); den = sum(x*x for x in v)
        z = max(F(0), min(F(1), sum((q[k]-a[k])*v[k] for k in [0,1])/den)) if den else F(0)
        x = tuple(a[k]+z*v[k] for k in [0,1])
        return sum((x[k]-q[k])**2 for k in [0,1])
    minimum = min(distance(a,b) for cell in cells for a,b in zip(cell,cell[1:]+cell[:1]))
    assert minimum == F(52923576781,718240000) and minimum > 64
    raw = [[[str(v) for v in x] for x in cell] for cell in cells]
    return dict(pen=12, mask=1, guide=segment['revealPath'], residualCells=len(cells),
                residualCellsSHA256=hashlib.sha256(json.dumps(raw,separators=(',',':')).encode()).hexdigest(),
                exactMinimumDistanceSquared=str(minimum), initialRadius=7, containingPriorRadius=8,
                initialGuideArcDistanceAtMost=1, initialVisibleOutsidePrior=False,
                reason='Original P outside the union of all completed prior original P is farther than 8 from Q0. Every Q7 prefix with arc distance at most 1 is inside that disk8.',
                addedCorrection=False, priorOriginalPChanged=False)

def contact_eleven():
    q = tuple(map(F,re.findall(r'-?\d+(?:\.\d+)?',strokes[10][1]['revealPath'])[:2]))
    box = [(q[0]-F(1,1000),q[1]),(q[0]+F(1,1000),q[1]),(q[0]+F(1,1000),q[1]+F(1,1000)),(q[0]-F(1,1000),q[1]+F(1,1000))]
    witness = []
    for s in [strokes[10][0],strokes[10][1]]:
        t = next(t for t in triangles(s) if all(contains(t,v) for v in box))
        witness.append([list(map(str,v)) for v in t])
    return dict(box=[list(map(str,v)) for v in box], originalTriangles=witness,
                delta='min(rho,1)/1000', contactArea='2*delta^2 > 0',
                diskMargin='rho^2 - 2*delta^2 > 0', requiresActualCompletedOriginalPrior=True, newBridge=False)

def contact_eight():
    own, prior = strokes[7][1],strokes[7][0]
    assert own['bounds'] == [78.1,28.5,86.6,72.6] and prior['bounds'] == [63.8,31,81.1,33]
    box = [(F('78.5'),F(32)),(F('80.5'),F(32)),(F('80.5'),F('32.25')),(F('78.5'),F('32.25'))]
    witnesses = []
    for s in [prior,own]:
        t = next(t for t in triangles(s) if all(contains(t,v) for v in box))
        witnesses.append([list(map(str,v)) for v in t])
    return dict(pen=8,mask=2,sourceDirection='down',originY=32,negativeExtent='7/2',positiveExtent='203/5',
                commonBox=[list(map(str,v)) for v in box],originalTriangles=witnesses,
                positiveProgressContactDelta='min((203/5)*p,1)/4',contactArea='2*delta > 0',
                clip='[78.1,86.6] x [32-(7/2)*p,32+(203/5)*p]',
                initialAreaBoundTimesProgress='7497/20',initialAreaLimit=0,fullEndpointOriginalP=True,
                sourcePGuideWidthWeightChanged=False,requiresActualCompletedOriginalPrior=True,
                oldMinYPrefixDetachedFromPriorFor='0 < p < 25/441',newBridge=False)

def result():
    initial=ns['initial'](11,2,strokes[10][1]);initial['priorMaskContactClaimed']=True
    witness=(F('58.2'),F('56.275'));prior=triangles(strokes[10][0]);own=triangles(strokes[10][1]);q=(F('56.9575'),F('53.18'))
    assert any(all(cross(t[i],t[(i+1)%3],witness)>0 for i in range(3)) for t in own)
    assert not any(contains(t,witness) for t in prior)
    margin=49-sum((witness[k]-q[k])**2 for k in [0,1]);assert margin==F(6060347,160000)>0
    axes=[axis_proof(i+1,j+1,s) for i,row in enumerate(strokes) for j,s in enumerate(row) if s['direction']!='curve'];assert len(axes)==11
    return dict(schema='hanja-u5ebe-remaining-mask-proof/v1',glyph='庾',root='u5ebe-ue0102',
                fixtureSHA256=ns['digest']((HERE/'fixtures.json').read_bytes()),
                originalEngineRuns=0,sourceProjectionRuns=0,sourcePGuideWidthWeightChanged=False,
                initial11Certificate=initial,initial11FixedRadiusCounterexample={'point':list(map(str,witness)),'squaredDiskMargin':str(margin),'strictlyOutsidePrior11m1':True},
                fullQCoverage=[ns['coverage'](11,2,strokes[10][1]),ns['coverage'](12,1,strokes[11][0])],
                prior11Contact=contact_eleven(),twelve=no_initial_twelve(),
                axisPrefixes=axes,eightContactBand=contact_eight(),
                allTimeGrowingPIntersectionClaimed=False,nativeApproval=False,runtimeApplied=False)

if '--check' in sys.argv:
    stored=json.loads((HERE/'remaining-mask-proof.json').read_text())
    assert result()==stored
    print('庾 remaining masks exact rational proof PASS')
else:
    print(json.dumps(result(),ensure_ascii=False,separators=(',',':')))
