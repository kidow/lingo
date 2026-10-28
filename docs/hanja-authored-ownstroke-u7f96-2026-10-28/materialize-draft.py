"""Load one unapproved authored polygon overlay; never edit original source files."""
import copy
import hashlib
import json
from fractions import Fraction
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent


def load_candidate():
    fixture = json.loads((HERE / 'fixtures-draft.json').read_text())
    hypothesis = (HERE / 'hypothesis.json').read_bytes()
    assert hashlib.sha256(hypothesis).hexdigest() == fixture['hypothesisSHA256']
    pinned = {}
    for label in ('sourceProof', 'sourceTrace'):
        data = (ROOT / fixture[label + 'Path']).read_bytes()
        assert hashlib.sha256(data).hexdigest() == fixture[label + 'SHA256']
        pinned[label] = json.loads(data)
    proof = pinned['sourceProof']
    donor = fixture['donorRawIndexZeroBased']
    replaced = fixture['replacedRawIndexZeroBased']
    assert (donor, replaced) == (3, 5)
    assert proof['groups'][donor]['polygons'] == fixture['donorPolygons']
    assert [p for call in pinned['sourceTrace'][donor] for p in call['polygons']] == fixture['donorPolygons']
    a, b, c, d, tx, ty = map(Fraction, fixture['authorMatrixRational'])
    assert (a, b, c, d, tx, ty) == tuple(map(Fraction, ['91/73', '0', '0', '1', '-21314/1825', '14443/400']))
    computed = []
    assert len(fixture['donorPolygons']) == len(fixture['replacementPolygonsExact']) == 2
    for source, exact in zip(fixture['donorPolygons'], fixture['replacementPolygonsExact']):
        transformed = []
        assert len(source) == len(exact)
        for point, expected in zip(source, exact):
            x, y = Fraction(str(point['x'])), Fraction(str(point['y']))
            nx, ny = a * x + c * y + tx, b * x + d * y + ty
            assert (nx, ny, point['off']) == (Fraction(expected[0]), Fraction(expected[1]), expected[2])
            transformed.append({'x': float(nx), 'y': float(ny), 'off': point['off']})
        computed.append(transformed)
    assert computed == fixture['replacementPolygons']
    assert all(value is False for value in fixture['approval'].values())
    assert not proof['groups'][6]['polygons']
    groups = copy.deepcopy(proof['groups'])
    groups[replaced] = {
        'polygons': computed,
        'authorGuide': fixture['replacementAuthorGuide'],
        'authored': True,
        'originalRawReplaced': proof['groups'][replaced]['raw'],
    }
    assert all(group == proof['groups'][i] for i, group in enumerate(groups) if i != replaced)
    assert len(groups) == len(proof['groups']) == 13
    return {
        'schema': 'hanja-authored-filled-groups-draft-v1',
        'glyph': '羖',
        'groups': groups,
        'logicalRawGroupsZeroBased': fixture['logicalRawGroupsZeroBased'],
        'originalRoot': False,
        'sameSourceDerived': True,
        'locallyAuthored': True,
        'mixed': True,
        'isOriginalEngineCapture': False,
        'sourceTraceDescribesReplacement': False,
        'approval': fixture['approval'],
    }


if __name__ == '__main__':
    import sys
    assert sys.argv[1:] == ['--check-only'], 'Only --check-only is supported; import load_candidate for an explicit local preview.'
    candidate = load_candidate()
    print(json.dumps({'status': 'PASS', 'glyph': candidate['glyph'], 'rawGroups': len(candidate['groups']), 'changedRawGroups': [5], 'rendered': False, 'approval': candidate['approval']}))
