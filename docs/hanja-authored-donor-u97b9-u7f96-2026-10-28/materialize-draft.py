"""Public 羖 upward-curve donor placed at an existing authored 鞹 target."""
import copy
import hashlib
import json
from fractions import Fraction as F
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent


def load_candidate():
    fixture = json.loads((HERE / 'fixtures-draft.json').read_text())
    data = {}
    for label in ('recipient', 'donor'):
        pins = fixture[label]
        for kind in ('proof', 'trace'):
            raw = (ROOT / pins[kind + 'Path']).read_bytes()
            assert hashlib.sha256(raw).hexdigest() == pins[kind + 'SHA256']
            data[label + kind] = json.loads(raw)
    target = fixture['authorTarget']
    prior_bytes = (ROOT / target['previousFixturePath']).read_bytes()
    assert hashlib.sha256(prior_bytes).hexdigest() == target['previousFixtureSHA256']
    prior = json.loads(prior_bytes)
    assert target['previousVariantId'] == 'author-shear-minus-0.2'
    assert fixture['recipient']['changedRawIndexZeroBased'] == 19
    assert fixture['donor']['rawIndexZeroBased'] == 5
    recipient = data['recipientproof']
    donor = data['donorproof']['groups'][5]
    assert donor['raw'] == fixture['donor']['raw']
    assert donor['polygons'] == [p for call in data['donortrace'][5] for p in call['polygons']]
    assert [len(p) for p in donor['polygons']] == [22, 3, 3]
    assert all(p['off'] == 0 for poly in donor['polygons'] for p in poly)
    old_raw = recipient['groups'][19]['raw']
    center = F(prior['fixedAuthorAnchor']['xRational'])
    expected_target = [[F(str(old_raw[i])), F(str(old_raw[i+1])) - (F(str(old_raw[i]))-center)/5] for i in (3, 5)]
    assert expected_target == [[F(v) for v in p] for p in target['endpointsExact']]
    a, b, c, d, e, f = map(F, fixture['matrixRational'])
    assert c == 0 and d == 1 and a*d-b*c > 0

    def transform(x, y):
        x, y = F(str(x)), F(str(y))
        return a*x+c*y+e, b*x+d*y+f

    guide = [transform(donor['raw'][i], donor['raw'][i+1]) for i in (3, 5, 7)]
    assert [list(guide[0]), list(guide[2])] == expected_target
    assert guide[2][0] > guide[0][0] and guide[2][1] < guide[0][1]
    polygons, exact = [], []
    for poly in donor['polygons']:
        out, rational = [], []
        for point in poly:
            x, y = transform(point['x'], point['y'])
            out.append({'x': float(x), 'y': float(y), 'off': point['off']})
            rational.append([str(x), str(y), point['off']])
        polygons.append(out)
        exact.append(rational)
    groups = copy.deepcopy(recipient['groups'])
    groups[19] = {
        'polygons': polygons,
        'authorGuide': {'kind': 'quadratic', 'points': [list(map(float, p)) for p in guide]},
        'authored': True,
        'originalRawReplaced': old_raw,
        'donorOriginalRaw': donor['raw'],
    }
    assert len(groups) == 24 and all(g == recipient['groups'][i] for i, g in enumerate(groups) if i != 19)
    assert all(v is False for v in fixture['approval'].values())
    return {
        'schema': 'hanja-authored-filled-groups-draft-v1',
        'glyph': '鞹', 'variantId': fixture['variantId'],
        'groups': groups, 'authoredRaw19ExactPolygons': exact,
        'logicalRawGroupsZeroBased': prior['logicalRawGroupsZeroBased'],
        'locallyAuthored': True, 'mixed': True, 'originalRoot': False,
        'isOriginalEngineCapture': False, 'sourceTraceDescribesAuthoredRecipient': False,
        'approval': fixture['approval'],
    }


if __name__ == '__main__':
    import sys
    assert sys.argv[1:] == ['--check-only'], 'Import load_candidate for a local static preview; CLI only checks.'
    result = load_candidate()
    print(json.dumps({'status': 'PASS', 'changedRawGroups': [19], 'unchangedRawGroups': 23, 'donorPolygons': 3, 'guidePoints': 3, 'positiveDeterminant': True, 'authorTargetEndpointsExact': True, 'nativeApproval': False, 'rendered': False}))
