#!/usr/bin/env python3
"""Pinned batch5 comparison. Source videos and decoded frames stay in RAM."""
import base64
import hashlib
import html
import importlib.util
import io
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from PIL import Image

HERE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location('batch1', HERE.parent / 'hanja-g3-batch1-2026-09-14/serve.py')
BASE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(BASE)
QUEUE = json.loads((HERE.parent / 'hanja-g3-batch5-2026-09-15/queue.json').read_text())
SCOPE = json.loads((HERE / 'sources.json').read_text())
BASE.QUEUE = {r['glyph']: r for r in QUEUE['entries'] if r['glyph'] in SCOPE['glyphs']}
BASE.REVIEW = BASE.QUEUE
BASE.INVENTORY['geometry'] = QUEUE['geometry']
BASE.INVENTORY['publisher'] = QUEUE['publisher']
# This glyph has no upstream geometry. Keep the video loader and never substitute another glyph.
BASE.candidate = lambda glyph: {'medians': []}
BASE.normalized = lambda medians: []


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def do_GET(self):
        try:
            q = parse_qs(urlparse(self.path).query)
            glyph = q.get('glyph', [next(iter(BASE.QUEUE))])[0]
            if glyph not in BASE.QUEUE:
                raise ValueError('Glyph outside the fixed scope')
            r = BASE.load(glyph)
            item = BASE.QUEUE[glyph]
            if self.path.startswith('/metadata'):
                out = {k: v for k, v in r.items() if k != 'data'}
                out.update(item)
                out['geometrySource'] = {'kind': 'local-authored', 'glyph': glyph}
                body, mime = json.dumps(out, ensure_ascii=False).encode(), 'application/json'
            else:
                fps = int(q.get('fps', ['2'])[0])
                start = int(q.get('start', ['0'])[0])
                count = int(q.get('count', ['120'])[0])
                size = int(q.get('size', ['180'])[0])
                view = q.get('view', ['source'])[0]
                if fps not in (2, 5, 10) or start < 0 or not 1 <= count <= 240 or not 80 <= size <= 240 or view not in ('source', 'candidate', 'final'):
                    raise ValueError('Invalid review request')
                points = r['points']
                proposals_file = HERE / 'proposals.json'
                if proposals_file.exists():
                    points = json.loads(proposals_file.read_text()).get(glyph, [])
                title = f"{glyph} · {item['strokes']} catalog strokes / {len(points)} candidate · local authored draft · {r['durationSeconds']}s"
                content = '<h1>' + html.escape(title) + '</h1>'
                if view == 'source':
                    encoded, times = BASE.sheet(r, fps, start, count, size)
                    content += f'<p>{fps}fps: {times[0]}–{times[-1]}s / {len(times)} frames. No approval implied.</p><img src="data:image/png;base64,{encoded}">'
                elif view == 'candidate':
                    content += '<p>Every cumulative path · green start / red end · width 5</p>' + BASE.candidate_html(points)
                else:
                    raw, stride = BASE.frames(r, 2, 420)
                    final = Image.frombytes('RGB', (420, 420), raw[-stride:])
                    buf = io.BytesIO()
                    final.save(buf, format='PNG')
                    content += '<div style="display:flex"><img src="data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode() + '">'
                    paths = ['M' + ' L'.join(f'{x} {y}' for x, y in s) for s in points]
                    content += '<svg width="420" height="420" viewBox="0 0 100 100">' + ''.join(f'<path d="{path}" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' for path in paths) + '</svg></div>'
                body = ('<!doctype html><meta charset="utf-8"><title>' + html.escape(title) + '</title><style>body{margin:8px;width:1080px;background:#fff;color:#111;font:15px system-ui}h1{font-size:22px;margin:8px 0}p{margin:6px 0}img{display:block}</style>' + content).encode()
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
    server = ThreadingHTTPServer(('127.0.0.1', 51731), Handler)
    print(f'G3 batch5 follow-up: http://127.0.0.1:{server.server_port}', flush=True)
    server.serve_forever()
