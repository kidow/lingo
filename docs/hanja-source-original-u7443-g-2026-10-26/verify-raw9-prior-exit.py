"""Exact source-coordinate prior-H7 exit, not a raster or DOM approval."""
from fractions import Fraction as F
from pathlib import Path
import hashlib
import json

ROOT = Path(__file__).resolve().parents[2]
SOURCE = 'docs/hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json'
SOURCE_SHA = '709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2'


def cross(a, b, p):
    return (b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])


def winding(poly, p):
    w = 0
    boundary = False
    for a, b in zip(poly, poly[1:]+poly[:1]):
        z = cross(a, b, p)
        if z == 0 and min(a[0], b[0]) <= p[0] <= max(a[0], b[0]) and min(a[1], b[1]) <= p[1] <= max(a[1], b[1]):
            boundary = True
        if a[1] <= p[1] < b[1] and z > 0:
            w += 1
        elif b[1] <= p[1] < a[1] and z < 0:
            w -= 1
    return w, boundary


def verify():
    raw = (ROOT/SOURCE).read_bytes()
    assert hashlib.sha256(raw).hexdigest() == SOURCE_SHA
    source = json.loads(raw)
    def points(index):
        assert all(v['off'] == 0 for p in source['groups'][index]['polygons'] for v in p)
        return [[(F(str(v['x']/2)), F(str(v['y']/2))) for v in p] for p in source['groups'][index]['polygons']]
    body, tail = points(8)
    bar, serif = points(6)
    assert len(body) == 22 and len(tail) == 3
    assert set(bar) == {(F(36), F('43.1')), (F('92.95'), F('43.1')), (F('92.95'), F('45.1')), (F(36), F('45.1'))}
    assert min(v[0] for v in serif) == F('80.95')
    a = (F(73), F('44.75'))
    ext = (F('.65'), F('21.75'), F('.4'), F('24.2'))
    t = (F('45.1')-a[1])/ext[3]
    assert t == F(7, 484)
    rect = (a[0]-ext[0]*t, a[0]+ext[1]*t, a[1]-ext[2]*t, a[1]+ext[3]*t)
    assert F(36) <= rect[0] < rect[1] <= F('92.95')
    assert F('43.1') <= rect[2] < rect[3] == F('45.1')
    witness = (F('73.2'), F('45.1'))
    delta = F(1, 10000)
    margin = min(abs(cross(x, y, witness))/(abs(y[0]-x[0])+abs(y[1]-x[1])) for x, y in zip(body, body[1:]+body[:1]) if x != y)
    assert margin == F(11, 320) and delta < margin
    assert winding(body, witness) == (1, False)
    assert rect[0]+delta < witness[0] < rect[1]-delta
    assert rect[2] < witness[1]-delta
    assert witness[0]+delta < min(v[0] for v in serif)
    assert winding(tail, witness) == (0, False)
    tail_margin = min(abs(cross(x, y, witness))/(abs(y[0]-x[0])+abs(y[1]-x[1])) for x, y in zip(tail, tail[1:]+tail[:1]) if x != y)
    assert delta < tail_margin
    for dx in (-delta, delta):
        for dy in (-delta, delta):
            assert winding(body, (witness[0]+dx, witness[1]+dy)) == (1, False)
    # R(p) is nested. R(t) lies in the actual original H7 rectangle.
    # For every p>t, the open rectangle around W above H7's bottom,
    # width 2*delta and height min(delta, ext[3]*(p-t)/2), is inside
    # body and R(p), outside both H7 polygons, and has positive area.
    return {
        'sourceSHA256': SOURCE_SHA,
        'priorExit': str(t),
        'anchor': list(map(str, a)),
        'extents': list(map(str, ext)),
        'rectAtExit': list(map(str, rect)),
        'witness': list(map(str, witness)),
        'witnessHalfWidth': str(delta),
        'bodyBoundaryLineMargin': str(margin),
        'priorH7MainBounds': ['36', '431/10', '1859/20', '451/10'],
        'extraH7SerifMinX': '1619/20',
        'beforeAndAtNoPaintOutsideH7': True,
        'afterPositiveAreaFormula': '2*delta*min(delta,(121/5)*(p-7/484)/2)',
        'nativeOrDOMApproval': False,
    }


if __name__ == '__main__':
    print(json.dumps(verify(), ensure_ascii=False, sort_keys=True))
