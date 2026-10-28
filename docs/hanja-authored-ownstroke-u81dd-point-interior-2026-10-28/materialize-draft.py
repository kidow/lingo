"""Move the two old point trials only; exact public pillar-gap anchor, no approval."""
import sys
sys.dont_write_bytecode = True
import copy
import hashlib
import importlib.util
import json
from fractions import Fraction as F
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent


def load_candidate(variant_id):
    fixture = json.loads((HERE / 'fixtures-draft.json').read_text())
    old_pins = fixture['derivedFrom']
    for label in ('fixture', 'materializer'):
        raw = (ROOT / old_pins[label+'Path']).read_bytes()
        assert hashlib.sha256(raw).hexdigest() == old_pins[label+'SHA256']
    spec = importlib.util.spec_from_file_location('fixed_old_u81dd_point_trials', ROOT / old_pins['materializerPath'])
    old_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(old_module)
    variants = [v for v in fixture['variants'] if v['id'] == variant_id]
    assert len(variants) == 1
    variant = variants[0]
    prior = old_module.load_candidate(variant['priorVariantId'])
    raw = (ROOT / fixture['sourceProofPath']).read_bytes()
    assert hashlib.sha256(raw).hexdigest() == fixture['sourceProofSHA256']
    proof = json.loads(raw)
    y = F(133)

    def cross_sections(poly):
        events = {}
        for p, q in zip(poly, poly[1:]+poly[:1]):
            assert p['off'] == q['off'] == 0
            x1, y1, x2, y2 = (F(str(v)) for v in (p['x'], p['y'], q['x'], q['y']))
            if y1 <= y < y2 or y2 <= y < y1:
                x = x1+(y-y1)*(x2-x1)/(y2-y1)
                events[x] = events.get(x, 0)+(1 if y2 > y1 else -1)
        winding, start, spans = 0, None, []
        for x, delta in sorted(events.items()):
            previous = winding
            winding += delta
            if previous == 0 and winding != 0:
                start = x
            if previous != 0 and winding == 0:
                spans.append((start, x))
        assert winding == 0
        return spans

    left_spans = [s for p in proof['groups'][21]['polygons'] for s in cross_sections(p)]
    right_spans = [s for p in proof['groups'][23]['polygons'] for s in cross_sections(p)]
    left_edge, right_edge = max(b for a, b in left_spans), min(a for a, b in right_spans)
    assert left_edge == 160 and right_edge == F('6731/40')
    target_x = (left_edge+right_edge)/2
    assert target_x == F('13131/80') and right_edge-left_edge == F('331/40')
    shift = F('851/80')
    assert target_x-F('307/2') == shift
    a, b, c, d, tx, ty = map(F, variant['matrixRational'])
    scale = F(variant['scaleRational'])
    donor_center = tuple(map(F, fixture['donor']['guideEndpointCenterExact']))
    assert scale in (F('1/2'), F('3/4')) and a == d == scale and b == c == 0
    assert tx == target_x-scale*donor_center[0] and ty == y-scale*donor_center[1]

    def transform(x, y):
        x, y = F(str(x)), F(str(y))
        nx, ny = scale*x+tx, scale*y+ty
        assert ((nx-tx)/scale, (ny-ty)/scale) == (x, y)
        return nx, ny

    donor = proof['groups'][20]
    polygons, exact = [], []
    for poly, old_exact in zip(donor['polygons'], prior['authoredRaw24ExactPolygons']):
        assert len(poly) == len(old_exact)
        out, rational = [], []
        for point, old in zip(poly, old_exact):
            x, yy = transform(point['x'], point['y'])
            assert (x, yy) == (F(old[0])+shift, F(old[1]))
            out.append({'x': float(x), 'y': float(yy), 'off': point['off']})
            rational.append([str(x), str(yy), point['off']])
        polygons.append(out)
        exact.append(rational)
    guide = [transform(donor['raw'][i], donor['raw'][i+1]) for i in (3, 5, 7)]
    groups = copy.deepcopy(prior['groups'])
    groups[24]['polygons'] = polygons
    groups[24]['authorGuide'] = {'kind': 'quadratic', 'points': [list(map(float, p)) for p in guide]}
    assert all(g == proof['groups'][i] for i, g in enumerate(groups) if i != 24)
    assert all(v is False for v in fixture['approval'].values())
    return {**prior, 'variantId': variant_id, 'groups': groups, 'authoredRaw24ExactPolygons': exact, 'publicInnerGap': fixture['publicInnerGap'], 'approval': fixture['approval']}


if __name__ == '__main__':
    assert sys.argv[1:] == ['--check-only'], 'Import load_candidate for a static trial; CLI only checks.'
    variants = ['own-DR-point-interior-scale-0.5', 'own-DR-point-interior-scale-0.75']
    checked = [load_candidate(v) for v in variants]
    print(json.dumps({'status': 'PASS', 'variants': variants, 'publicInnerCenterX': '13131/80', 'shiftX': '851/80', 'sameSizesAndShapes': True, 'changedRawGroups': [24], 'unchangedRawGroups': 24, 'raw24MappingApproved': False, 'nativeApproval': False, 'rendered': False}))
