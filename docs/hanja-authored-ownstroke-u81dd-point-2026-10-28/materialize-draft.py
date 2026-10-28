"""Static public own-dot size trials; raw24-to-domestic21 remains a hypothesis."""
import copy
import hashlib
import json
from fractions import Fraction as F
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent


def load_candidate(variant_id):
    fixture = json.loads((HERE / 'fixtures-draft.json').read_text())
    data = {}
    for label in ('sourceProof', 'sourceTrace'):
        raw = (ROOT / fixture[label + 'Path']).read_bytes()
        assert hashlib.sha256(raw).hexdigest() == fixture[label + 'SHA256']
        data[label] = json.loads(raw)
    proof, trace = data['sourceProof'], data['sourceTrace']
    assert len(proof['groups']) == 25
    donor = proof['groups'][20]
    assert donor['raw'] == fixture['donor']['raw']
    assert donor['polygons'] == [p for call in trace[20] for p in call['polygons']]
    assert len(trace[20]) == 1 and trace[20][0]['kind'] == 'cdDrawCurve'
    assert [len(p) for p in donor['polygons']] == [22, 5]
    assert all(p['off'] == 0 for poly in donor['polygons'] for p in poly)
    original = proof['groups'][24]
    assert original['raw'][3:7] == fixture['slotCorrespondence']['publicOriginalGuide']
    source_center = tuple(map(F, fixture['donor']['guideEndpointCenterExact']))
    assert source_center == ((F(str(donor['raw'][3]))+F(str(donor['raw'][7])))/2, (F(str(donor['raw'][4]))+F(str(donor['raw'][8])))/2)
    target_center = tuple(map(F, fixture['slotCorrespondence']['targetCenterExact']))
    assert target_center == ((F(str(original['raw'][3]))+F(str(original['raw'][5])))/2, (F(str(original['raw'][4]))+F(str(original['raw'][6])))/2)
    variants = [v for v in fixture['variants'] if v['id'] == variant_id]
    assert len(variants) == 1
    variant = variants[0]
    a, b, c, d, tx, ty = map(F, variant['matrixRational'])
    scale = F(variant['scaleRational'])
    assert scale in (F('1/2'), F('3/4')) and a == d == scale and b == c == 0
    assert tx == target_center[0]-scale*source_center[0]
    assert ty == target_center[1]-scale*source_center[1]
    assert a*d-b*c > 0

    def transform(x, y):
        x, y = F(str(x)), F(str(y))
        nx, ny = scale*x+tx, scale*y+ty
        assert ((nx-tx)/scale, (ny-ty)/scale) == (x, y)
        return nx, ny

    assert transform(*source_center) == target_center
    polygons, exact = [], []
    for poly in donor['polygons']:
        out, rational = [], []
        for point in poly:
            x, y = transform(point['x'], point['y'])
            out.append({'x': float(x), 'y': float(y), 'off': point['off']})
            rational.append([str(x), str(y), point['off']])
        polygons.append(out)
        exact.append(rational)
    guide = [transform(donor['raw'][i], donor['raw'][i+1]) for i in (3, 5, 7)]
    assert guide[2][0] > guide[0][0] and guide[2][1] > guide[0][1]
    groups = copy.deepcopy(proof['groups'])
    groups[24] = {'polygons': polygons, 'authorGuide': {'kind': 'quadratic', 'points': [list(map(float, p)) for p in guide]}, 'authored': True, 'originalRawReplaced': original['raw'], 'donorOriginalRaw': donor['raw']}
    assert all(g == proof['groups'][i] for i, g in enumerate(groups) if i != 24)
    assert groups[20] == donor and all(v is False for v in fixture['approval'].values())
    return {'schema': 'hanja-authored-filled-groups-draft-v1', 'glyph': '臝', 'variantId': variant_id, 'groups': groups, 'authoredRaw24ExactPolygons': exact, 'logicalRawGroupsZeroBased': None, 'selectedApprovedWholeRoot': None, 'locallyAuthored': True, 'mixed': True, 'originalRoot': False, 'isOriginalEngineCapture': False, 'sourceTraceDescribesAuthoredRaw24': False, 'approval': fixture['approval']}


if __name__ == '__main__':
    import sys
    assert sys.argv[1:] == ['--check-only'], 'Import load_candidate(variant_id) for a static preview; CLI only checks.'
    variants = ['own-DR-point-scale-0.5', 'own-DR-point-scale-0.75']
    checked = [load_candidate(v) for v in variants]
    print(json.dumps({'status': 'PASS', 'variants': variants, 'changedRawGroups': [24], 'unchangedRawGroupsPerVariant': 24, 'donorRetainedInOriginalSlot': True, 'affineInverseExact': True, 'raw24MappingApproved': False, 'rendered': False, 'nativeApproval': False}))
