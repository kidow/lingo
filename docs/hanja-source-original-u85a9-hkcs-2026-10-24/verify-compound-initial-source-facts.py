"""Check stored exact witnesses only; no search, engine, or source projection."""
from pathlib import Path
from fractions import Fraction as F
from math import comb
import hashlib
import json
import re

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
facts = json.loads((HERE / 'compound-initial-source-facts.json').read_text())
source = ROOT / facts['fixture']
assert hashlib.sha256(source.read_bytes()).hexdigest() == facts['fixtureSHA256']
strokes = json.loads(source.read_text())['hkcs_m85a9']['strokes']
assert hashlib.sha256(json.dumps(strokes, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest() == facts['geometrySHA256']

def numbers(d):
    return list(map(F, re.findall(r'[-+]?(?:\d*\.)?\d+(?:[eE][-+]?\d+)?', d)))

def polygons(d):
    return [[tuple(map(F, xy)) for xy in re.findall(r'(?:M|L)\s*([-\d.eE+]+)\s+([-\d.eE+]+)', part)] for part in d.split('Z') if part.strip()]

def edges(poly):
    return zip(poly, poly[1:] + poly[:1])

def inside(q, poly):
    winding = 0
    for a, b in edges(poly):
        c = (b[0]-a[0])*(q[1]-a[1])-(b[1]-a[1])*(q[0]-a[0])
        if c == 0 and min(a[0], b[0]) <= q[0] <= max(a[0], b[0]) and min(a[1], b[1]) <= q[1] <= max(a[1], b[1]):
            return 0
        if a[1] <= q[1] < b[1] and c > 0:
            winding += 1
        if b[1] <= q[1] < a[1] and c < 0:
            winding -= 1
    return 1 if winding else -1

def edge_distance_squared(q, a, b):
    vx, vy = b[0]-a[0], b[1]-a[1]
    norm = vx*vx + vy*vy
    t = max(F(0), min(F(1), ((q[0]-a[0])*vx+(q[1]-a[1])*vy)/norm)) if norm else F(0)
    return (q[0]-a[0]-t*vx)**2+(q[1]-a[1]-t*vy)**2

for item in facts['initialWitnesses']:
    p, m = item['target']
    current = strokes[p-1][m-1]
    new = polygons(current['outline'])
    prior = [poly for pen in strokes[:p-1] for seg in pen for poly in polygons(seg['outline'])] + [poly for seg in strokes[p-1][:m-1] for poly in polygons(seg['outline'])]
    q = tuple(map(F, item['point']))
    start = numbers(current['revealPath'])[:2]
    assert current['direction'] == 'curve' and current['revealWidth'] == 14
    assert len(prior) == item['priorPolygons']
    assert any(inside(q, poly) == 1 for poly in new)
    assert all(inside(q, poly) == -1 for poly in prior)
    disk = sum((q[i]-start[i])**2 for i in range(2))
    assert disk == F(item['diskDistanceSquared']) < 49
    for polys, key in [(new, 'newEdgeDistanceSquared'), (prior, 'priorEdgeDistanceSquared')]:
        distance = min(edge_distance_squared(q, a, b) for poly in polys for a, b in edges(poly))
        assert distance == F(item[key]) > 0

for name, mask in [('firstMask', 1), ('secondMask', 2)]:
    item = facts['compound6'][name]
    seg = strokes[5][mask-1]
    previous = strokes[4][-1] if mask == 1 else strokes[5][0]
    n, before = numbers(seg['revealPath']), numbers(previous['revealPath'])
    assert [n[i]-before[-2+i] for i in range(2)] == list(map(F, item['guideStartMinusPriorEnd']))
    overlap = tuple(map(F, item['strictPriorFilledPOverlapWitness']))
    assert any(inside(overlap, p) == 1 for p in polygons(seg['outline']))
    assert any(inside(overlap, p) == 1 for p in polygons(previous['outline']))

item = facts['compound6']['firstMask']
seg = strokes[5][0]
q = tuple(map(F, item['outsideFullOriginalQtubeVertex']))
triangle = polygons(seg['outline'])[item['outsideVertexOriginalSubpath']-1]
assert q in triangle and len(triangle) == 3
assert (triangle[1][0]-triangle[0][0])*(triangle[2][1]-triangle[0][1]) != (triangle[1][1]-triangle[0][1])*(triangle[2][0]-triangle[0][0])
n = numbers(seg['revealPath'])
coeff = [F(-49), F(0), F(0), F(0), F(0)]
for axis in [0, 1]:
    values = [n[axis]-q[axis], 2*(n[axis+2]-n[axis]), n[axis]-2*n[axis+2]+n[axis+4]]
    for i, a in enumerate(values):
        for j, b in enumerate(values):
            coeff[i+j] += a*b
bernstein = [sum(coeff[i]*F(comb(k, i), comb(4, i)) for i in range(k+1)) for k in range(5)]
assert bernstein == list(map(F, item['distanceSquaredMinus49BernsteinDegree4']))
assert min(bernstein) > 0
assert facts['nativeApproval'] is False and facts['runtimeApplied'] is False and facts['productionImportAllowed'] is False
print('PASS: seven fixed strict net-area witnesses, two prior overlaps/gaps, one fixed full-Q-tube counterexample; no witness search')
