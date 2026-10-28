"""Three unapproved dot placements with exact fixed-public-polygon clearance."""
import copy
import hashlib
import json
from fractions import Fraction as F
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent


def clipped_x_bounds(poly, lower_y, upper_y):
    points = []
    for p, q in zip(poly, poly[1:]+poly[:1]):
        assert p['off'] == q['off'] == 0
        x1, y1, x2, y2 = (F(str(v)) for v in (p['x'], p['y'], q['x'], q['y']))
        if lower_y <= y1 <= upper_y:
            points.append((x1, y1))
        if y1 != y2:
            for y in (lower_y, upper_y):
                if min(y1, y2) <= y <= max(y1, y2):
                    points.append((x1+(y-y1)*(x2-x1)/(y2-y1), y))
    return (min(x for x, y in points), max(x for x, y in points)) if points else None


def group_bounds(group, lower_y, upper_y):
    bounds = [b for p in group['polygons'] for b in [clipped_x_bounds(p, lower_y, upper_y)] if b]
    assert bounds
    return min(a for a, b in bounds), max(b for a, b in bounds)


def load_candidate(variant_id):
    fixture = json.loads((HERE / 'fixtures-draft.json').read_text())
    inputs = {}
    for label in ('sourceProof', 'sourceTrace'):
        raw = (ROOT / fixture[label+'Path']).read_bytes()
        assert hashlib.sha256(raw).hexdigest() == fixture[label+'SHA256']
        inputs[label] = json.loads(raw)
    proof = inputs['sourceProof']
    assert len(proof['groups']) == 25
    donor = proof['groups'][20]
    assert donor['polygons'] == [p for call in inputs['sourceTrace'][20] for p in call['polygons']]
    assert [len(p) for p in donor['polygons']] == [22, 5]
    xs = [F(str(p['x'])) for poly in donor['polygons'] for p in poly]
    ys = [F(str(p['y'])) for poly in donor['polygons'] for p in poly]
    donor_center = ((min(xs)+max(xs))/2, (min(ys)+max(ys))/2)
    assert donor_center == tuple(map(F, fixture['donorFilledBBoxCenterExact']))
    variants = [v for v in fixture['variants'] if v['id'] == variant_id]
    assert len(variants) == 1
    variant = variants[0]
    center_x, center_y = map(F, variant['centerExact'])
    left_at_center = group_bounds(proof['groups'][21], center_y, center_y)[1]
    right_at_center = group_bounds(proof['groups'][23], center_y, center_y)[0]
    assert center_x == (left_at_center+right_at_center)/2
    a, b, c, d, tx, ty = map(F, variant['matrixRational'])
    scale = F(variant['scaleRational'])
    assert F('1/4') < scale < F('1/2') and a == d == scale and b == c == 0
    assert tx == center_x-scale*donor_center[0] and ty == center_y-scale*donor_center[1]

    def transform(x, y):
        x, y = F(str(x)), F(str(y))
        nx, ny = scale*x+tx, scale*y+ty
        assert ((nx-tx)/scale, (ny-ty)/scale) == (x, y)
        return nx, ny

    exact = [[[str(x), str(y), point['off']] for point in poly for x, y in [transform(point['x'], point['y'])]] for poly in donor['polygons']]
    polygons = [[{'x': float(F(x)), 'y': float(F(y)), 'off': off} for x, y, off in poly] for poly in exact]
    bbox = [scale*min(xs)+tx, scale*min(ys)+ty, scale*max(xs)+tx, scale*max(ys)+ty]
    left_bound = group_bounds(proof['groups'][21], bbox[1], bbox[3])[1]
    right_bound = group_bounds(proof['groups'][23], bbox[1], bbox[3])[0]
    top_bound = max(F(str(p['y'])) for poly in proof['groups'][22]['polygons'] for p in poly)
    assert top_bound == 100
    clearance = [bbox[0]-left_bound, right_bound-bbox[2], bbox[1]-top_bound, F(136)-bbox[3]]
    assert min(clearance) == F(variant['minimumClearanceExact']) and all(v > 0 for v in clearance)
    for i, group in enumerate(proof['groups']):
        if i == 24:
            continue
        for poly in group['polygons']:
            clipped = clipped_x_bounds(poly, bbox[1], bbox[3])
            assert clipped is None or clipped[1] < bbox[0] or clipped[0] > bbox[2], ('not strictly disjoint', i)
    guide = [transform(donor['raw'][i], donor['raw'][i+1]) for i in (3, 5, 7)]
    assert guide[2][0] > guide[0][0] and guide[2][1] > guide[0][1]
    groups = copy.deepcopy(proof['groups'])
    groups[24] = {'polygons': polygons, 'authorGuide': {'kind': 'quadratic', 'points': [list(map(float, p)) for p in guide]}, 'authored': True, 'originalRawReplaced': proof['groups'][24]['raw'], 'donorOriginalRaw': donor['raw']}
    assert all(g == proof['groups'][i] for i, g in enumerate(groups) if i != 24)
    assert all(v is False for v in fixture['approval'].values())
    return {'schema': 'hanja-authored-filled-groups-draft-v1', 'glyph': '臝', 'variantId': variant_id, 'groups': groups, 'authoredRaw24ExactPolygons': exact, 'logicalRawGroupsZeroBased': None, 'selectedApprovedWholeRoot': None, 'locallyAuthored': True, 'mixed': True, 'originalRoot': False, 'isOriginalEngineCapture': False, 'sourceTraceDescribesAuthoredRaw24': False, 'approval': fixture['approval'], 'clearanceProof': {'filledBBoxExact': list(map(str, bbox)), 'leftBound': str(left_bound), 'rightBound': str(right_bound), 'topBound': str(top_bound), 'bottomAuthorCutoff': '136', 'strictClearancesExact': list(map(str, clearance)), 'allRetainedPolygonsStrictlyDisjoint': True}}


if __name__ == '__main__':
    import sys
    assert sys.argv[1:] == ['--check-only'], 'Import load_candidate for a static trial; CLI only checks.'
    variants = ['fit-upper110-scale-0.275', 'fit-middle120-scale-0.265', 'fit-lower130-scale-0.26']
    results = [load_candidate(v) for v in variants]
    print(json.dumps({'status': 'PASS', 'trials': [{'id': r['variantId'], 'proof': r['clearanceProof']} for r in results], 'changedRawGroups': [24], 'otherRawGroupsUnchanged': 24, 'nativeApproval': False, 'rendered': False}))
