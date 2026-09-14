#!/usr/bin/env python3
"""Read-only, loopback review surface. Publisher media and decoded frames stay in RAM."""
import base64
import hashlib
import html
import importlib.util
import io
import json
import math
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
from urllib.parse import parse_qs, urljoin, urlparse
from urllib.request import urlopen
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
INVENTORY = json.loads((ROOT / 'docs/hanja-g3-inventory-2026-09-14/inventory.json').read_text())
QUEUE = {e['glyph']: e for e in INVENTORY['first50']['entries']}
REVIEW = {r['glyph']: r for r in json.loads(Path(__file__).with_name('review.json').read_text())['records']}
SPEC = importlib.util.spec_from_file_location('memory_review', ROOT / 'scripts/hanja-stroke-memory-review.py')
MEMORY = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MEMORY)
CACHE, CORPORA, LOCK = {}, {}, threading.RLock()


def download(url, maximum):
    with urlopen(url, timeout=30) as response:
        data = response.read(maximum + 1)
    if len(data) > maximum:
        raise ValueError('Source exceeds size limit')
    return data


def candidate(glyph):
    key = QUEUE[glyph]['candidate']
    if key not in CORPORA:
        pin = INVENTORY['geometry'][key]
        data = download(pin['url'], 40_000_000)
        if hashlib.sha256(data).hexdigest() != pin['sha256']:
            raise ValueError('Candidate source hash changed')
        CORPORA[key] = {r['character']: r for line in data.splitlines() if (r := json.loads(line))['character'] in QUEUE}
    return CORPORA[key][glyph]


def normalized(medians):
    points = [p for stroke in medians for p in stroke]
    xs, ys = [p[0] for p in points], [-p[1] for p in points]
    left, right, top, bottom = min(xs), max(xs), min(ys), max(ys)
    scale = 80 / max(right - left, bottom - top)
    rounded = lambda x: math.floor(x * 10 + .5) / 10
    return [[(rounded(50 + (x - (left + right) / 2) * scale), rounded(50 + (-y - (top + bottom) / 2) * scale)) for x, y in stroke] for stroke in medians]


def load(glyph):
    with LOCK:
        if glyph not in CACHE:
            row = QUEUE[glyph]['publisherRow']
            url = urljoin(INVENTORY['publisher']['manifestUrl'], '../media/video/' + row + '.mp4')
            original = download(url, 20_000_000)
            evidence = {'url': url, 'sha256': hashlib.sha256(original).hexdigest(), 'bytes': len(original)}
            if evidence != REVIEW[glyph]['sourceVideo']:
                raise ValueError('Publisher video differs from the reviewed source')
            data = MEMORY.faststart(original)
            probe = json.loads(MEMORY.run(['ffprobe', '-v', 'error', '-i', 'pipe:0', '-show_entries', 'format=duration:stream=codec_type,width,height', '-of', 'json'], data))
            stream = next(s for s in probe['streams'] if s['codec_type'] == 'video')
            if (stream['width'], stream['height']) != (1920, 1080):
                raise ValueError('Publisher layout changed')
            c = candidate(glyph)
            CACHE[glyph] = {'data': data, 'originalMedians': c['medians'], 'points': normalized(c['medians']), 'sourceVideo': evidence, 'durationSeconds': float(probe['format']['duration'])}
        return CACHE[glyph]


def frames(record, fps, size):
    filters = f'fps={fps},crop=850:740:120:220,scale={size}:{size}'
    raw = MEMORY.run(['ffmpeg', '-v', 'error', '-i', 'pipe:0', '-an', '-vf', filters, '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1'], record['data'])
    stride = size * size * 3
    if len(raw) % stride:
        raise ValueError('Partial decoded frame')
    return raw, stride


def sheet(record, fps, start, count, size=140):
    raw, stride = frames(record, fps, size)
    indices = list(range(start, min(len(raw) // stride, start + count)))
    if not indices:
        raise ValueError('No frames in range')
    cols, height = 6, size + 20
    image = Image.new('RGB', (cols * size, math.ceil(len(indices) / cols) * height), 'white')
    draw = ImageDraw.Draw(image)
    for pos, index in enumerate(indices):
        x, y = pos % cols * size, pos // cols * height
        frame = Image.frombytes('RGB', (size, size), raw[index * stride:(index + 1) * stride])
        image.paste(frame, (x, y))
        draw.text((x + 4, y + size), f'{index / fps:.2f}s', fill='black')
    buf = io.BytesIO()
    image.save(buf, format='PNG')
    return base64.b64encode(buf.getvalue()).decode(), [i / fps for i in indices]


def candidate_html(points):
    size, cols, cell_height = 180, 6, 202
    image = Image.new('RGB', (cols * size, math.ceil(len(points) / cols) * cell_height), 'white')
    draw = ImageDraw.Draw(image)
    for end, stroke in enumerate(points):
        ox, oy = end % cols * size, end // cols * cell_height
        draw.text((ox + 4, oy + 2), str(end + 1), fill='black')
        for index, p in enumerate(points[:end + 1]):
            coords = [(ox + x * size / 100, oy + 22 + y * size / 100) for x, y in p]
            color = '#235bca' if index == end else '#222222'
            draw.line(coords, fill=color, width=9, joint='curve')
            for x, y in coords:
                draw.ellipse((x - 4.5, y - 4.5, x + 4.5, y + 4.5), fill=color)
        for p, color in [(stroke[0], 'green'), (stroke[-1], 'red')]:
            x, y = ox + p[0] * size / 100, oy + 22 + p[1] * size / 100
            draw.ellipse((x - 3, y - 3, x + 3, y + 3), fill=color)
    buf = io.BytesIO()
    image.save(buf, format='PNG')
    encoded = base64.b64encode(buf.getvalue()).decode()
    return f'<img id="candidate" src="data:image/png;base64,{encoded}">'


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def do_GET(self):
        try:
            query = parse_qs(urlparse(self.path).query)
            glyph = query.get('glyph', [next(iter(QUEUE))])[0]
            if glyph not in QUEUE:
                raise ValueError('Glyph outside the fixed batch')
            record = load(glyph)
            if self.path.startswith('/metadata'):
                result = {k: v for k, v in record.items() if k != 'data'}
                result.update(QUEUE[glyph])
                result['geometrySource'] = INVENTORY['geometry'][QUEUE[glyph]['candidate']]
                body, mime = json.dumps(result, ensure_ascii=False).encode(), 'application/json'
            else:
                fps = int(query.get('fps', ['2'])[0])
                start = int(query.get('start', ['0'])[0])
                count = int(query.get('count', ['120'])[0])
                size = int(query.get('size', ['140'])[0])
                if fps not in (2, 5, 10) or start < 0 or not 1 <= count <= 240 or not 80 <= size <= 240:
                    raise ValueError('Invalid sample request')
                encoded, times = sheet(record, fps, start, count, size)
                points = record['points']
                corrected = query.get('corrected', ['0'])[0] == '1'
                if corrected:
                    orders = json.loads(Path(__file__).with_name('orders.json').read_text())
                    order = orders.get(glyph, list(range(1, len(points) + 1)))
                    if sorted(order) != list(range(1, len(points) + 1)):
                        raise ValueError('Invalid stroke permutation')
                    points = [points[index - 1] for index in order]
                body = ('<!doctype html><meta charset="utf-8"><title>' + html.escape(glyph) + ' review</title><style>body{margin:12px;font:15px system-ui;width:840px;background:#fff;color:#111}h1{font-size:22px}.grid{display:grid;grid-template-columns:repeat(6,140px)}svg{width:140px;height:140px}img{display:block}</style>'
                        + f'<h1>{html.escape(glyph)} — {QUEUE[glyph]["strokes"]} strokes · row {QUEUE[glyph]["publisherRow"]} · {record["durationSeconds"]}s</h1>'
                        + f'<p>Source {fps} fps · {times[0]}–{times[-1]}s · not an approval</p><img src="data:image/png;base64,{encoded}">'
                        + f'<h2>{"Corrected" if corrected else "Candidate"} cumulative paths · green start / red end</h2>' + candidate_html(points)).encode()
                mime = 'text/html; charset=utf-8'
            self.send_response(200)
            self.send_header('Content-Type', mime)
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except Exception as exc:
            body = str(exc).encode()
            self.send_response(500)
            self.end_headers()
            self.wfile.write(body)


if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    print(f'G3 review server: http://127.0.0.1:{server.server_port}', flush=True)
    server.serve_forever()
