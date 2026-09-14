#!/usr/bin/env python3
"""Read-only acquisition of exact manifest rows and complete video hashes. No media writes."""
import hashlib
import io
import json
import sys
import zipfile
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[2]
SCOPE = json.loads(Path(__file__).with_name('scope.json').read_text())
inventory = json.loads((ROOT / 'docs/hanja-g3-inventory-2026-09-14/inventory.json').read_text())
pub = SCOPE['publisher']
raw = urlopen(pub['manifestUrl'], timeout=30).read()
assert len(raw) == pub['manifestBytes']
assert hashlib.sha256(raw).hexdigest() == pub['manifestSha256']
ns = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
with zipfile.ZipFile(io.BytesIO(raw)) as archive:
    strings = [''.join(s.itertext()) for s in ET.fromstring(archive.read('xl/sharedStrings.xml')).findall('m:si', ns)]
    manifest = {}
    for row in ET.fromstring(archive.read('xl/worksheets/sheet1.xml')).findall('.//m:row', ns):
        values = []
        for cell in row.findall('m:c', ns):
            value = cell.find('m:v', ns)
            value = value.text if value is not None else ''
            values.append(strings[int(value)] if cell.get('t') == 's' and value else value)
        if len(values) == 7 and values[0].isdigit():
            manifest[values[0]] = values
assert len(manifest) == pub['manifestRows']
rows = {r[0]: dict(zip(inventory['fields'], r)) for r in inventory['rows']}
glyphs = sys.argv[1:] or SCOPE['glyphs']
assert set(glyphs) <= set(SCOPE['glyphs'])

def collect(glyph):
    row = rows[glyph]
    m = manifest[row['publisherRow']]
    assert m[4] == glyph
    counts = {k: row[k + 'Strokes'] for k in ('MM', 'Ja', 'Ko')}
    selected = next((k for k, n in counts.items() if n == row['catalogStrokes']), None)
    selected = selected or next(k for k, n in counts.items() if n is not None)
    url = urljoin(pub['manifestUrl'], '../media/video/' + row['publisherRow'] + '.mp4')
    with urlopen(url, timeout=30) as response:
        video = response.read(20_000_001)
    assert len(video) == row['videoBytes'] and len(video) < 20_000_000
    return {'glyph': glyph, 'strokes': row['catalogStrokes'], 'publisherRow': row['publisherRow'],
            'candidate': selected, 'candidateCounts': counts,
            'manifest': {'glyph': glyph, 'manifestRow': m[0], 'videoFilename': m[6]},
            'sourceVideo': {'url': url, 'sha256': hashlib.sha256(video).hexdigest(), 'bytes': len(video)}}

with ThreadPoolExecutor(max_workers=5) as pool:
    print(json.dumps(list(pool.map(collect, glyphs)), ensure_ascii=False, separators=(',', ':')))
