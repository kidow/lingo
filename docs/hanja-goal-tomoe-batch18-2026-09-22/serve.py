#!/usr/bin/env python3
"""Read-only Tomoe + domestic comparison. All source graphics stay in RAM."""
import sys
sys.dont_write_bytecode = True
import os, json, hashlib, urllib.request, xml.etree.ElementTree as ET, importlib.util, subprocess
from pathlib import Path
HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
METADATA = json.loads((HERE / 'metadata.json').read_text())
SOURCES = json.loads((HERE / 'sources.json').read_text())
def fetch_public():
    source = SOURCES['sources'][0]['materials']['data/handwriting-ja.xml']
    raw = urllib.request.urlopen(source['url'], timeout=45).read()
    assert len(raw) == source['bytes'] and hashlib.sha256(raw).hexdigest() == source['sha256']
    xml = ET.fromstring(raw)
    selected = {e['glyph']: e for e in METADATA}
    data = {}
    for c in xml.findall('character'):
        g = c.findtext('utf8')
        if g not in selected: continue
        points = [[[float(p.attrib['x']), float(p.attrib['y'])] for p in s.findall('point')] for s in c.findall('./strokes/stroke')]
        expected = selected[g]
        assert hashlib.sha256(json.dumps(points, separators=(',', ':')).encode()).hexdigest() == expected['pointHash']
        medians = [[[x, -y] for x, y in stroke] for stroke in points]
        code = "import {normalizeMedians} from './lib/hanja-stroke-geometry.ts';console.log(JSON.stringify(normalizeMedians(" + json.dumps(medians) + ")))"
        paths = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', code], cwd=ROOT))
        path_hash = hashlib.sha256(json.dumps(paths, separators=(',', ':')).encode()).hexdigest()
        assert path_hash == expected['normalizedPathHash']
        data[g] = {**expected, 'viewBox': '0 0 100 100', 'strokes': [{'path': p} for p in paths]}
    assert set(data) == set(selected)
    return list(data.values())
def main():
    spec = importlib.util.spec_from_file_location('review', ROOT / 'docs/hanja-special2-alternatives-2026-09-21/serve.py')
    r = importlib.util.module_from_spec(spec); spec.loader.exec_module(r)
    r.ENTRIES = fetch_public()
    for e in r.ENTRIES:
        r.base.renderer.ENTRIES[e['glyph']] = {'strokes': e['dictionaryStrokes'], 'dictionary': e['dictionary']}
    # Reuse the established RAM renderer with correct candidate attribution.
    code = (ROOT / 'docs/hanja-special2-alternatives-2026-09-21/serve.py').read_text()
    handler = code[code.index('class Handler('):code.index("\nif __name__")]
    handler = handler.replace('Right KanjiVG', 'Right Tomoe').replace('KanjiVG © Ulrich Apel, CC BY-SA 3.0.', 'Tomoe Handwriting Dictionary, LGPL-2.1; archived l4u/tomoe 9d054a1.')
    exec(handler, r.__dict__)
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 51846
    print(json.dumps({'pid': os.getpid(), 'port': port}), flush=True)
    r.ThreadingHTTPServer(('127.0.0.1', port), r.Handler).serve_forever()
if __name__ == '__main__': main()
