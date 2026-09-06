"""Read-only official/candidate comparison viewer. Requires Pillow and xlrd.

Run with --port 5865, then open /BIN0009.gif/13/國 (image/row/glyph).
Nothing is saved, approved, or changed by this viewer.
"""
import argparse
import base64
import hashlib
import html
import http.cookiejar
import http.server
import io
import json
from pathlib import Path
import re
import runpy
import urllib.parse
import urllib.request
import zlib
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OFFICIAL_SHA = '4e191bbee54edd6db595f16fc83a15b9929eba0e3e01095da1e828c70e10760c'
CANDIDATE_SHA = '7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e'
CANDIDATE_URL = 'https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsKo.txt'
PAGES = '0001 0002 0003 0004 0008 0009 000A 000B 000C 000D 000E 000F 0016 0018 0028 0029 002A 002B 002C 002D'.split()

def page_index(document):
    body = '<h1>Official glyph index</h1><div style="display:flex;flex-wrap:wrap;gap:20px">'
    for suffix in PAGES:
        name = f'BIN{suffix}.gif'
        image = Image.open(io.BytesIO(zlib.decompress(document.stream(name), -15)))
        output = io.BytesIO()
        image.crop((0, 0, 145, image.height)).save(output, format='PNG')
        body += f'<div><h2>{name}</h2><img src="data:image/png;base64,{base64.b64encode(output.getvalue()).decode()}"></div>'
    return body + '</div>'

def load():
    client = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
    page = client.open('https://www.hanja.re.kr/kccpt/exam/otherData.do', timeout=30).read().decode()
    token = re.search(r'<meta name="_csrf" content="([^"]+)"', page).group(1)
    request = urllib.request.Request('https://www.hanja.re.kr/kccpt/exam/download.do',
        data=urllib.parse.urlencode({'file_seq': '12751', 'target_id': '115', '_csrf': token}).encode(),
        headers={'X-CSRF-TOKEN': token})
    raw = client.open(request, timeout=30).read()
    if hashlib.sha256(raw).hexdigest() != OFFICIAL_SHA:
        raise ValueError('Official document changed')
    document = runpy.run_path(str(ROOT / 'scripts/hanja-source.py'))['CompoundFile'](raw)
    raw = client.open(CANDIDATE_URL, timeout=30).read()
    if hashlib.sha256(raw).hexdigest() != CANDIDATE_SHA:
        raise ValueError('Candidate document changed')
    candidates = {item['character']: item for item in map(json.loads, raw.decode().splitlines())}
    return document, candidates

def compare(document, candidates, name, row, glyph):
    if not re.fullmatch(r'BIN[0-9A-F]{4}\.gif', name) or not 1 <= row <= 25 or glyph not in candidates:
        raise ValueError('Expected image/row/candidate glyph')
    image = Image.open(io.BytesIO(zlib.decompress(document.stream(name), -15)))
    image = image.crop((0, round((row - 1) * image.height / 25), image.width, round(row * image.height / 25)))
    output = io.BytesIO()
    image.save(output, format='PNG')
    body = f'<h2>{html.escape(glyph)} — {name} / row {row}</h2><p>Official cumulative diagram</p><img style="max-width:100%" src="data:image/png;base64,{base64.b64encode(output.getvalue()).decode()}"><p>Candidate cumulative centerlines (blue=current stroke; red=start)</p><div style="display:flex;flex-wrap:wrap">'
    medians = candidates[glyph]['medians']
    for index in range(len(medians)):
        paths = ''
        for i, points in enumerate(medians[:index + 1]):
            coords = ' '.join(f'{x},{900-y}' for x, y in points)
            paths += f'<polyline points="{coords}" fill="none" stroke="{"#245fe5" if i == index else "#333"}" stroke-width="35" stroke-linecap="round" stroke-linejoin="round"/>'
        x, y = medians[index][0]
        body += f'<div style="text-align:center"><svg width="90" height="100" viewBox="-40 -40 1100 1100">{paths}<circle cx="{x}" cy="{900-y}" r="22" fill="red"/></svg><div>{index+1}</div></div>'
    return body + '</div><hr>'

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=5865)
    args = parser.parse_args()
    document, candidates = load()
    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            try:
                specs = urllib.parse.unquote(self.path).strip('/').split(',')
                body = page_index(document) if specs == ['index'] else ''.join(compare(document, candidates, name, int(row), glyph) for name, row, glyph in (s.split('/') for s in specs))
                payload = ('<!doctype html><meta charset="utf-8"><title>Hanja stroke review</title><body style="margin:20px;font-family:system-ui;background:white;color:#111">' + body).encode()
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.end_headers()
                self.wfile.write(payload)
            except (ValueError, KeyError):
                self.send_error(400, 'Use /BIN0009.gif/13/國; separate multiple rows with commas')
        def log_message(self, *_args):
            pass
    server = http.server.ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    print(f'Hash-verified, read-only review: http://127.0.0.1:{server.server_port}/BIN0009.gif/13/國', flush=True)
    server.serve_forever()

if __name__ == '__main__':
    main()
