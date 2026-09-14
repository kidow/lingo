#!/usr/bin/env python3
"""Read-only loopback review. Pinned publisher media stays in RAM."""
import base64
import html
import importlib.util
import io
import json
import math
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location('batch1', HERE.parent / 'hanja-g3-batch1-2026-09-14/serve.py')
BASE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(BASE)
REVIEW = {r['glyph']: r for r in json.loads((HERE / 'prior-review.json').read_text())['records']}

def points(glyph, prior=False):
    name = 'prior-candidate-paths.json' if prior else 'candidate-paths.json'
    row = next(r for r in json.loads((HERE / name).read_text()) if r['glyph'] == glyph)
    return [[[float(v) for v in part.split()] for part in p.replace('M', '').split('L')] for p in row['paths']]

def image_tag(image, identity):
    buf = io.BytesIO()
    image.save(buf, format='PNG')
    return f'<img id="{identity}" src="data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}">'

def final_candidate(strokes):
    image = Image.new('RGB', (420, 420), 'white')
    draw = ImageDraw.Draw(image)
    for p in strokes:
        coords = [(x * 4.2, y * 4.2) for x, y in p]
        draw.line(coords, fill='#222222', width=21, joint='curve')
        for x, y in coords:
            draw.ellipse((x - 10.5, y - 10.5, x + 10.5, y + 10.5), fill='#222222')
    return image

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def do_GET(self):
        try:
            q = parse_qs(urlparse(self.path).query)
            glyph = q.get('glyph', [next(iter(REVIEW))])[0]
            if glyph not in REVIEW:
                raise ValueError('Glyph outside this review')
            record = BASE.load(glyph)
            if self.path.startswith('/metadata'):
                body = json.dumps({k: v for k, v in record.items() if k != 'data'}, ensure_ascii=False).encode()
                mime = 'application/json'
            else:
                fps = int(q.get('fps', ['2'])[0])
                start = int(q.get('start', ['0'])[0])
                count = int(q.get('count', ['120'])[0])
                size = int(q.get('size', ['180'])[0])
                if fps not in (2, 5, 10) or start < 0 or not 1 <= count <= 240 or not 80 <= size <= 240:
                    raise ValueError('Invalid frame request')
                encoded, times = BASE.sheet(record, fps, start, count, size)
                p = points(glyph)
                content = f'<h1>{html.escape(glyph)} · {len(p)} strokes</h1><p>Source {fps}fps: {times[0]}–{times[-1]}s</p><img id="source" src="data:image/png;base64,{encoded}">'
                content += '<h2>Current cumulative paths</h2>' + BASE.candidate_html(p)
                if q.get('final', ['0'])[0] == '1':
                    final_size = 840 if q.get('native', ['0'])[0] == '1' else 420
                    raw, stride = BASE.frames(record, 2, final_size)
                    source = Image.frombytes('RGB', (final_size, final_size), raw[-stride:])
                    content += '<h2>Source final</h2>' + image_tag(source, 'source-final')
                    content += '<h2>Current final</h2>' + image_tag(final_candidate(p), 'current-final')
                    content += '<h2>Prior final</h2>' + image_tag(final_candidate(points(glyph, True)), 'prior-final')
                body = ('<!doctype html><meta charset="utf-8"><title>' + html.escape(glyph) + ' correction review</title><style>body{font:16px system-ui;margin:16px;background:white;color:#111}img{display:block}h1{font-size:22px}</style>' + content).encode()
                mime = 'text/html; charset=utf-8'
            self.send_response(200)
            self.send_header('Content-Type', mime)
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except Exception as error:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(error).encode())

if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    print(f'Eight-character review: http://127.0.0.1:{server.server_port}', flush=True)
    server.serve_forever()
