"""Two public-source-only authored raw19 shear trials; no original capture claim."""
import copy
import hashlib
import json
from fractions import Fraction as F
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent


def load_candidate(variant_id):
    fixture = json.loads((HERE / 'fixtures-draft.json').read_text())
    inputs = {}
    for label in ('sourceProof', 'sourceTrace'):
        data = (ROOT / fixture[label + 'Path']).read_bytes()
        assert hashlib.sha256(data).hexdigest() == fixture[label + 'SHA256']
        inputs[label] = json.loads(data)
    proof = inputs['sourceProof']
    raw_index = fixture['changedRawIndexZeroBased']
    assert raw_index == 19 and len(proof['groups']) == 24
    original = proof['groups'][raw_index]
    assert original['raw'] == fixture['sourceRaw19']
    assert original['polygons'] == fixture['sourcePolygons']
    assert original['polygons'] == [p for call in inputs['sourceTrace'][raw_index] for p in call['polygons']]
    assert len(original['polygons']) == 2
    variants = [v for v in fixture['variants'] if v['id'] == variant_id]
    assert len(variants) == 1
    variant = variants[0]
    a, b, c, d, tx, ty = map(F, variant['matrixRational'])
    center_x = F(fixture['fixedAuthorAnchor']['xRational'])
    center_y = F(fixture['fixedAuthorAnchor']['yRational'])
    assert center_x == F(str((original['raw'][3] + original['raw'][5]) / 2))
    assert center_y == F(str(original['raw'][4]))
    assert (a, c, d, tx) == (1, 0, 1, 0)
    assert b == F(variant['slopeRational']) and b in (F('-1/10'), F('-1/5'))
    assert ty == -b * center_x and a * d - b * c == 1

    def point(x, y):
        x, y = F(str(x)), F(str(y))
        return a*x + c*y + tx, b*x + d*y + ty

    assert point(center_x, center_y) == (center_x, center_y)
    polygons, exact = [], []
    for poly in original['polygons']:
        out, rational = [], []
        for p in poly:
            x, y = point(p['x'], p['y'])
            out.append({'x': float(x), 'y': float(y), 'off': p['off']})
            rational.append([str(x), str(y), p['off']])
        polygons.append(out)
        exact.append(rational)
    guide = [point(original['raw'][i], original['raw'][i+1]) for i in (3, 5)]
    assert guide[1][0] > guide[0][0] and guide[1][1] < guide[0][1]
    groups = copy.deepcopy(proof['groups'])
    groups[raw_index] = {
        'polygons': polygons,
        'authorGuide': {'start': list(map(float, guide[0])), 'end': list(map(float, guide[1]))},
        'authored': True,
        'originalRawReplaced': original['raw'],
    }
    assert all(g == proof['groups'][i] for i, g in enumerate(groups) if i != raw_index)
    assert all(v is False for v in fixture['approval'].values())
    return {
        'schema': 'hanja-authored-filled-groups-draft-v1',
        'glyph': '鞹', 'variantId': variant_id,
        'groups': groups,
        'authoredRaw19ExactPolygons': exact,
        'logicalRawGroupsZeroBased': fixture['logicalRawGroupsZeroBased'],
        'originalRoot': False, 'locallyAuthored': True, 'mixed': True,
        'isOriginalEngineCapture': False, 'sourceTraceDescribesAuthoredRaw19': False,
        'approval': fixture['approval'],
    }


if __name__ == '__main__':
    import sys
    assert sys.argv[1:] == ['--check-only'], 'Import load_candidate(variant_id) for a local preview; CLI only checks.'
    variants = ['author-shear-minus-0.1', 'author-shear-minus-0.2']
    checked = [load_candidate(v) for v in variants]
    print(json.dumps({'status': 'PASS', 'variants': variants, 'changedRawGroups': [19], 'unchangedRawGroupsPerVariant': 23, 'rendered': False, 'nativeApproval': False}))
