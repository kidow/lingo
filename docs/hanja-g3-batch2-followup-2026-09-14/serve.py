#!/usr/bin/env python3
"""Local comparison only: publisher and dictionary assets remain in RAM."""
import base64
import html
import importlib.util
import io
import os
import json
import hashlib
import re
import xml.etree.ElementTree as ET
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from PIL import Image

HERE = Path(__file__).resolve().parent

def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result

BATCH = module('batch2', HERE.parent / 'hanja-g3-batch2-2026-09-14/serve.py')
BASE = BATCH.BASE
DICT = module('dictionary', HERE.parent / 'hanja-g3-boundaries-2026-09-14/serve.py')
DICT.SOURCES = {r['glyph']: r for r in json.loads((HERE / 'sources.json').read_text())['records']}

def dictionary_source(glyph):
    if glyph not in DICT.CACHE:
        pin = DICT.SOURCES[glyph]
        raw = BASE.download(pin['svgUrl'], 100_000)
        if len(raw) != pin['bytes'] or hashlib.sha256(raw).hexdigest() != pin['sha256']:
            raise ValueError('Dictionary SVG changed')
        root = ET.fromstring(raw)
        expected = 'scale(1,-1) translate(0, -871)' if glyph == '邦' else 'scale(1,-1) translate(0, -879)'
        if [g.get('transform') for g in root.iter(DICT.NS + 'g')] != [expected]:
            raise ValueError('Unexpected dictionary coordinate transform')
        outlines = [p for p in root.iter(DICT.NS + 'path') if p.get('id')]
        animated = [p for p in root.iter(DICT.NS + 'path') if p.get('clip-path')]
        timings = [[int(re.search(r'--d:(\d+)ms', p.get('style')).group(1)), int(re.search(r'--t:(\d+)ms', p.get('style')).group(1))] for p in animated]
        if root.find(DICT.NS + 'title').text != glyph or len(outlines) != pin['strokes'] or timings != pin['animation']:
            raise ValueError('Dictionary identity or timing changed')
        for index, p in enumerate(animated):
            target = p.get('clip-path').removeprefix('url(#').removesuffix(')')
            clip = next(c for c in root.iter(DICT.NS + 'clipPath') if c.get('id') == target)
            if next(iter(clip)).get('{http://www.w3.org/1999/xlink}href') != '#' + outlines[index].get('id'):
                raise ValueError('Dictionary clip order changed')
        # XML outline order can differ from playback order (notably 鈍).
        order = sorted(range(len(timings)), key=lambda i: timings[i][0])
        DICT.CACHE[glyph] = [outlines[i] for i in order], [animated[i] for i in order]
    return DICT.CACHE[glyph]

DICT.source = dictionary_source

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def do_GET(self):
        try:
            q = parse_qs(urlparse(self.path).query)
            glyph = q.get('glyph', ['屯'])[0]
            view = q.get('view', ['dictionary'])[0]
            start = int(q.get('start', ['0'])[0])
            count = int(q.get('count', ['24'])[0])
            size = int(q.get('size', ['140'])[0])
            fps = int(q.get('fps', ['2'])[0])
            content = f'<h1>{html.escape(glyph)} · {html.escape(view)}</h1>'
            if view == 'dictionary':
                strokes = [int(s) for s in q['strokes'][0].split(',')] if 'strokes' in q else DICT.SOURCES[glyph]['boundaryStrokes']
                content += '<p>Independent dictionary: frozen reveal 0 / 25 / 50 / 75 / 100%. Source paths stay in RAM.</p><div class="five">'
                for end in strokes:
                    for progress in (0, .25, .5, .75, 1):
                        svg = DICT.dictionary_svg(glyph, end, progress, f'{end}-{progress}')
                        if glyph == '邦':
                            svg = svg.replace('translate(0, -879)', 'translate(0, -871)')
                        content += f'<div>{end}: {progress * 100:g}%' + svg + '</div>'
                content += '</div>'
            else:
                record = BASE.load(glyph)
                pin = BASE.QUEUE[glyph]['sourceVideo']
                if record['sourceVideo'] != pin:
                    raise ValueError('Publisher video pin changed')
                points = record['points']
                if q.get('alternate', ['0'])[0] == '1':
                    alternate = next(r for r in json.loads((HERE / 'alternates.json').read_text())['Ja'] if r['glyph'] == glyph)
                    points = BASE.normalized(alternate['medians'])
                proposals_path = HERE / 'proposals.json'
                if q.get('corrected', ['0'])[0] == '1' and proposals_path.exists():
                    proposals = json.loads(proposals_path.read_text())
                    recipe = proposals[glyph]
                    points = [s.get('points', points[s['sourceStroke'] - 1] if s['sourceStroke'] else []) for s in recipe]
                if view == 'source':
                    encoded, times = BASE.sheet(record, fps, start, count, size)
                    content += f'<p>{fps}fps: {times[0]}–{times[-1]}s</p><img src="data:image/png;base64,{encoded}">'
                elif view == 'candidate':
                    content += '<p>Every cumulative stroke; green start / red end.</p>' + BASE.candidate_html(points)
                else:
                    raw, stride = BASE.frames(record, 2, 420)
                    final = Image.frombytes('RGB', (420, 420), raw[-stride:])
                    buf = io.BytesIO()
                    final.save(buf, format='PNG')
                    content += '<div class="two"><img src="data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode() + '">'
                    paths = ['M' + ' L'.join(f'{x} {y}' for x, y in s) for s in points]
                    content += '<svg width="420" height="420" viewBox="0 0 100 100">' + ''.join(f'<path d="{path}" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' for path in paths) + '</svg></div>'
            body = ('<!doctype html><meta charset="utf-8"><style>body{margin:8px;width:1080px;font:15px system-ui;background:white;color:#111}h1{font-size:22px;margin:8px 0}.five{display:grid;grid-template-columns:repeat(5,200px)}.two{display:flex}svg{max-width:100%}p{margin:6px 0}</style>' + content).encode()
            self.send_response(200)
        except Exception as error:
            body = str(error).encode()
            self.send_response(500)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', int(os.environ.get('PORT', '0'))), Handler)
    print(f'G3 followup: http://127.0.0.1:{server.server_port}', flush=True)
    server.serve_forever()
