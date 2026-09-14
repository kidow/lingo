#!/usr/bin/env python3
"""Loopback source comparison; proprietary SVGs and movie frames stay in RAM."""
import hashlib
import html
import importlib.util
import json
import re
import xml.etree.ElementTree as ET
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location('batch1', HERE.parent / 'hanja-g3-batch1-2026-09-14/serve.py')
BASE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(BASE)
SOURCES = {r['glyph']: r for r in json.loads((HERE / 'sources.json').read_text())['records']}
CACHE = {}
NS = '{http://www.w3.org/2000/svg}'


def source(glyph):
    if glyph not in CACHE:
        pin = SOURCES[glyph]
        raw = BASE.download(pin['svgUrl'], 100_000)
        if len(raw) != pin['bytes'] or hashlib.sha256(raw).hexdigest() != pin['sha256']:
            raise ValueError('Dictionary SVG changed')
        root = ET.fromstring(raw)
        if [g.get('transform') for g in root.iter(NS + 'g')] != ['scale(1,-1) translate(0, -879)']:
            raise ValueError('Unexpected dictionary coordinate transform')
        outlines = [p for p in root.iter(NS + 'path') if p.get('id')]
        animated = [p for p in root.iter(NS + 'path') if p.get('clip-path')]
        timings = [[int(re.search(r'--d:(\d+)ms', p.get('style')).group(1)), int(re.search(r'--t:(\d+)ms', p.get('style')).group(1))] for p in animated]
        if root.find(NS + 'title').text != glyph or len(outlines) != pin['strokes'] or timings != pin['animation']:
            raise ValueError('Dictionary identity or animation schedule changed')
        for index, p in enumerate(animated):
            target = p.get('clip-path').removeprefix('url(#').removesuffix(')')
            clip = next(c for c in root.iter(NS + 'clipPath') if c.get('id') == target)
            href = next(iter(clip)).get('{http://www.w3.org/1999/xlink}href')
            if href != '#' + outlines[index].get('id'):
                raise ValueError('Animation order differs from outline order')
        CACHE[glyph] = (outlines, animated)
    return CACHE[glyph]


def dictionary_svg(glyph, end, progress=None, key=''):
    outlines, animated = source(glyph)
    body = []
    for i, p in enumerate(outlines[:end]):
        color = '#235bca' if i == end - 1 else '#222'
        if progress is not None and i == end - 1:
            color = '#ddd'
        body.append(f'<path d="{html.escape(p.get("d"))}" fill="{color}"/>')
    if progress is not None:
        outline, p = outlines[end - 1], animated[end - 1]
        ident = 'clip-' + key
        style = p.get('style')
        dash = float(re.search(r'stroke-dasharray:([\d.]+)', style).group(1))
        offset = float(re.search(r'stroke-dashoffset:([\d.]+)', style).group(1)) * (1 - progress)
        body.append(f'<defs><clipPath id="{ident}"><path d="{html.escape(outline.get("d"))}"/></clipPath></defs>')
        body.append(f'<path d="{html.escape(p.get("d"))}" clip-path="url(#{ident})" pathLength="{p.get("pathLength")}" fill="none" stroke="#235bca" stroke-width="128" stroke-linecap="round" stroke-dasharray="{dash}" stroke-dashoffset="{offset}"/>')
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><g transform="scale(1,-1) translate(0, -879)">' + ''.join(body) + '</g></svg>'


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def do_GET(self):
        try:
            q = parse_qs(urlparse(self.path).query)
            glyph = q.get('glyph', ['郭'])[0]
            if glyph not in SOURCES:
                raise ValueError('Glyph outside this review')
            record, pin = BASE.load(glyph), SOURCES[glyph]
            source(glyph)
            if self.path.startswith('/metadata'):
                payload = {k: v for k, v in record.items() if k != 'data'}
                payload['dictionary'] = pin
                body, mime = json.dumps(payload, ensure_ascii=False).encode(), 'application/json'
            else:
                content = f'<h1>{glyph}: independent dictionary boundaries / publisher / licensed candidate</h1>'
                content += '<p>Recoloured cumulative outlines and frozen mask progress for inspection; source order follows explicit clip references and timings. No source paths saved.</p>'
                content += '<h2>Dictionary cumulative strokes</h2><div id="dictionary" class="grid">'
                for end in range(1, pin['strokes'] + 1):
                    content += f'<div>{end}' + dictionary_svg(glyph, end) + '</div>'
                content += '</div><h2>Separate boundary strokes: 0 / 25 / 50 / 75 / 100% reveal</h2><div id="boundary" class="five">'
                for end in pin['boundaryStrokes']:
                    for progress in (0, .25, .5, .75, 1):
                        content += f'<div>{end}: {progress * 100:g}%' + dictionary_svg(glyph, end, progress, f'{end}-{progress}') + '</div>'
                content += '</div>'
                encoded, times = BASE.sheet(record, 2, 0, 120, 180)
                content += f'<h2>Publisher full sequence: {times[0]}–{times[-1]}s / 2fps</h2><img id="publisher" src="data:image/png;base64,{encoded}">'
                content += '<h2>Licensed JA candidate cumulative paths / green start / red end</h2>' + BASE.candidate_html(record['points'])
                content += '<p>©2020 e-hanja; source material is shown only for review.</p>'
                body = ('<!doctype html><meta charset="utf-8"><style>body{font:16px system-ui;width:1080px;background:white;color:#111;margin:12px}h1{font-size:22px}.grid{display:grid;grid-template-columns:repeat(6,180px)}.five{display:grid;grid-template-columns:repeat(5,216px)}svg{display:block;width:100%;height:auto}img{display:block}</style>' + content).encode()
                mime = 'text/html; charset=utf-8'
            self.send_response(200)
        except Exception as exc:
            body, mime = str(exc).encode(), 'text/plain; charset=utf-8'
            self.send_response(500)
        self.send_header('Content-Type', mime)
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    print(f'G3 boundary review: http://127.0.0.1:{server.server_port}', flush=True)
    server.serve_forever()
