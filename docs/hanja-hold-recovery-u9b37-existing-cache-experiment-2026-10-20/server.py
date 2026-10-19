#!/usr/bin/env python3
"""鬷 원 캐시 읽기 전용 비교. 원 polygon 및 국내 SVG는 변경하지 않는다."""
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, html, json, re, threading, urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
CONFIG_SHA = '02d6c204e4adf7169af4df1a4c60f61f8fee094238ecd89348066cf4d7100779'
CONFIG = None
PROOFS = {}
ENTRIES = {}
NS = '{http://www.w3.org/2000/svg}'
CACHE = {}
LOCK = threading.Lock()
COLORS = ['#245ad5', '#168554', '#df8800', '#b42336']

def sha(raw):
    return hashlib.sha256(raw).hexdigest()

def load_contract():
    raw = (HERE / 'config.json').read_bytes()
    if sha(raw) != CONFIG_SHA:
        raise ValueError('config SHA changed')
    config = json.loads(raw)
    for name, expected in config['inputSHA256'].items():
        if sha((REPO / name).read_bytes()) != expected:
            raise ValueError('original input changed: ' + name)
    original = REPO / config['sourceFolder']
    sources = json.loads((original / 'sources.json').read_bytes())
    if sorted(sources['records']) != sorted(x['name'] for x in config['closure']):
        raise ValueError('source closure names changed')
    for record in config['closure']:
        actual = sources['records'][record['name']]
        if actual['related'] != record['related'] or sha(actual['data'].encode()) != record['sourceSha256']:
            raise ValueError('source closure record changed')
    for root in config['roots']:
        proof = json.loads((original / ('engine-whole-' + root + '.json')).read_bytes())
        if sorted(proof) != config['full5Keys'] or len(proof['groups']) != config['rawCount']:
            raise ValueError('full5 shape changed')
        for key in ['engineRevision', 'engineHashes', 'defaults']:
            if proof[key] != config[key]:
                raise ValueError('engine identity changed')
        if sum(len(g['polygons']) for g in proof['groups']) != config['polygons']:
            raise ValueError('polygon count changed')
        for index, row in enumerate(proof['trace']):
            if [poly for call in row for poly in call['polygons']] != proof['groups'][index]['polygons']:
                raise ValueError('original trace/group mismatch')
        PROOFS[root] = proof
    return config

def guards():
    raw = (HERE / 'config.json').read_bytes()
    if sha(raw) != CONFIG_SHA:
        raise ValueError('config SHA changed')
    if sha((HERE / 'browser.mjs').read_bytes()) != CONFIG['browserSHA256']:
        raise ValueError('browser script changed')
    for name, expected in CONFIG['inputSHA256'].items():
        if sha((REPO / name).read_bytes()) != expected:
            raise ValueError('pinned input changed: ' + name)

def source(glyph):
    with LOCK:
        if glyph in CACHE:
            return CACHE[glyph]
        pin = ENTRIES[glyph]['dictionary']
        with urllib.request.urlopen(pin['url'], timeout=20) as response:
            if response.status != 200:
                raise ValueError('Dictionary unavailable')
            raw = response.read(100001)
        if len(raw) != pin['bytes'] or hashlib.sha256(raw).hexdigest() != pin['sha256']:
            raise ValueError('Dictionary pin changed')
        root = ET.fromstring(raw)
        if root.find(NS + 'title').text != glyph:
            raise ValueError('Dictionary title changed')
        groups = list(root.iter(NS + 'g'))
        # Preserve the source's horizontal offset; 潭 uses translate(12, -830).
        if len(groups) != 1 or not re.fullmatch(r'scale\(1,-1\) translate\(-?\d+, -\d+\)', groups[0].get('transform', '')):
            raise ValueError('Unrecognized coordinate transform')
        outlines = {p.get('id'): p for p in root.iter(NS + 'path') if p.get('id')}
        clips = {c.get('id'): next(iter(c)).get('{http://www.w3.org/1999/xlink}href').removeprefix('#') for c in root.iter(NS + 'clipPath')}
        animated = [p for p in root.iter(NS + 'path') if p.get('clip-path')]
        strokes = []
        for index, p in enumerate(animated):
            clip = re.fullmatch(r'url\(#([^)]*)\)', p.get('clip-path')).group(1)
            target = clips[clip]
            delay = int(re.search(r'--d:\s*(\d+)ms', p.get('style')).group(1))
            duration = int(re.search(r'--t:\s*(\d+)ms', p.get('style')).group(1))
            strokes.append({'outline': outlines[target], 'animated': p, 'xmlIndex': index + 1, 'delay': delay, 'duration': duration})
        strokes.sort(key=lambda s: s['delay'])
        if len(strokes) != ENTRIES[glyph]['strokes'] or len({s['outline'].get('id') for s in strokes}) != len(strokes):
            raise ValueError('Incomplete clip mapping')
        if any(i and s['delay'] < strokes[i-1]['delay'] + strokes[i-1]['duration'] for i, s in enumerate(strokes)):
            raise ValueError('Overlapping playback')
        CACHE[glyph] = {'strokes': strokes, 'transform': groups[0].get('transform')}
        return CACHE[glyph]

def dictionary_svg(glyph, end, colored=True, key=''):
    data = source(glyph)
    strokes = data['strokes']
    pieces = [f'<path d="{html.escape(s["outline"].get("d"))}" fill="#bbb"/>' for s in strokes[:end-1]]
    current = strokes[end-1]
    outline, animated = current['outline'], current['animated']
    pieces.append(f'<path d="{html.escape(outline.get("d"))}" fill="{COLORS[-1] if colored else "#222"}"/>')
    if colored:
        style = animated.get('style')
        dash = float(re.search(r'stroke-dasharray:\s*([\d.]+)', style).group(1))
        offset = float(re.search(r'stroke-dashoffset:\s*([\d.]+)', style).group(1))
        ident = 'clip-' + key
        pieces.append(f'<defs><clipPath id="{ident}"><path d="{html.escape(outline.get("d"))}"/></clipPath></defs>')
        for p, color in [(0.75, COLORS[2]), (0.5, COLORS[1]), (0.25, COLORS[0])]:
            pieces.append(f'<path d="{html.escape(animated.get("d"))}" clip-path="url(#{ident})" pathLength="{animated.get("pathLength")}" fill="none" stroke="{color}" stroke-width="128" stroke-linecap="round" stroke-dasharray="{dash}" stroke-dashoffset="{offset*(1-p)}"/>')
    return '<svg viewBox="0 0 1024 1024"><g transform="' + data['transform'] + '">' + ''.join(pieces) + '</g></svg>'


def original_svg(root, raw=None):
    if root not in CONFIG['roots']:
        raise ValueError('unsupported exact root')
    proof = PROOFS[root]
    if raw is not None and raw not in CONFIG['originalRawIndices']:
        raise ValueError('unsupported original raw')
    groups = proof['groups'] if raw is None else [proof['groups'][raw]]
    polygons = []
    for group in groups:
        for poly in group['polygons']:
            if not all(v['off'] == 0 for v in poly):
                raise ValueError('unsupported original polygon')
            polygons.append('<polygon points="' + ' '.join(str(v['x']) + ',' + str(v['y']) for v in poly) + '"/>')
    return '<svg viewBox="0 0 200 200">' + ''.join(polygons) + '</svg>'

def page():
    return '''<!doctype html><html lang="ko"><meta charset="utf-8"><title>鬷 원 캐시 비교</title>
<style>body{font:16px system-ui;margin:24px;background:#faf8f4;color:#222}button,select{font:inherit;padding:8px;margin:4px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}svg{display:block;width:min(100%,520px);height:auto;background:white;border:1px solid #ddd}h2{font-size:17px}.notice{max-width:1000px;line-height:1.6}output{display:block;margin:14px 0}</style>
<h1>鬷 · 원 캐시 재대조</h1><p class="notice">필순 승인 화면이 아닙니다. 국내 SVG의 고정 순서와 원 polygon을 나란히 확인합니다. raw 번호는 0부터입니다. 기존 논리11=[12,14], 12=[13], 13=[15], 14=[16]은 보류된 대응입니다. 두 raw를 새 한 획으로 합치지 않습니다.</p>
<div><button id="domestic-11">국내 11획</button><button id="domestic-12">국내 12획</button><button id="domestic-13">국내 13획</button><button id="domestic-14">국내 14획</button></div>
<label>원본 <select id="root"><option>u9b37</option><option>u9b37-ue0100</option></select></label>
<label>원 raw <select id="raw"><option>12</option><option>14</option><option>13</option><option>15</option><option>16</option></select></label>
<div><button id="raw-12">raw 12만</button><button id="raw-14">raw 14만</button><button id="raw-13">raw 13만</button><button id="raw-15">raw 15만</button><button id="raw-16">raw 16만</button></div><output id="status"></output>
<div class="grid"><section><h2 id="domestic-label">국내 원 SVG</h2><div id="domestic"></div></section><section><h2 id="raw-label">선택 원 raw</h2><div id="selected-raw"></div></section></div>
<div class="grid"><section><h2>원 raw 12 · 독립 패널</h2><div id="raw12"></div></section><section><h2>원 raw 14 · 독립 패널</h2><div id="raw14"></div></section></div>
<div class="grid"><section><h2>전체 base · 원 23 raw</h2><div id="whole-base"></div></section><section><h2>전체 VS0 · 원 23 raw</h2><div id="whole-vs0"></div></section></div>
<script type="module" src="/browser.mjs"></script></html>'''

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass
    def do_GET(self):
        try:
            guards()
            parsed = urlparse(self.path)
            query = {} if not parsed.query else parse_qs(parsed.query, strict_parsing=True)
            if parsed.path == '/' and not query:
                body, kind = page(), 'text/html; charset=utf-8'
            elif parsed.path == '/browser.mjs' and not query:
                body, kind = (HERE / 'browser.mjs').read_text(), 'text/javascript; charset=utf-8'
            elif parsed.path == '/api/whole' and set(query) == {'root'} and len(query['root']) == 1:
                body, kind = original_svg(query['root'][0]), 'image/svg+xml'
            elif parsed.path == '/api/raw' and set(query) == {'root', 'raw'} and all(len(v) == 1 for v in query.values()):
                body, kind = original_svg(query['root'][0], int(query['raw'][0])), 'image/svg+xml'
            elif parsed.path == '/api/domestic' and set(query) == {'stroke'} and len(query['stroke']) == 1:
                pen = int(query['stroke'][0])
                if pen not in CONFIG['domesticPens']:
                    raise ValueError('unsupported domestic pen')
                body, kind = dictionary_svg('鬷', pen, True, 'domestic-' + str(pen)), 'image/svg+xml'
            else:
                raise ValueError('unsupported exact route')
            data = body.encode()
            self.send_response(200)
            self.send_header('Content-Type', kind)
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except Exception:
            self.send_error(409, 'Pinned resource or request contract mismatch')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=0)
    args = parser.parse_args()
    CONFIG = load_contract()
    ENTRIES = {'鬷': {'strokes': 19, 'dictionary': CONFIG['dictionary']}}
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    print(json.dumps({'glyph': '鬷', 'port': server.server_address[1], 'pid': __import__('os').getpid(), 'compilerExecuted': False, 'engineExecuted': False, 'nativeApproval': False}), flush=True)
    server.serve_forever()
