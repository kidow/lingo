#!/usr/bin/env python3
"""Local review sheets. Proprietary SVGs and renderings stay in RAM."""
import hashlib
import html
import json
import re
import threading
import urllib.request
import xml.etree.ElementTree as ET
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
DATA = json.loads((HERE / 'originals.json').read_text())
ENTRIES = {e['glyph']: e for e in DATA['entries']}
NS = '{http://www.w3.org/2000/svg}'
CACHE = {}
LOCK = threading.Lock()
COLORS = ['#245ad5', '#168554', '#df8800', '#b42336']

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
        if len(groups) != 1 or not re.fullmatch(r'scale\(1,-1\) translate\(0, -\d+\)', groups[0].get('transform', '')):
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

def candidate_paths(glyph, corrected=False):
    original = ENTRIES[glyph]['paths']
    proposals = HERE / 'proposals.json'
    if corrected and proposals.exists():
        entry = json.loads(proposals.read_text()).get(glyph)
        if entry:
            return [s['path'] if s.get('path') else original[s['sourceStroke']-1] for s in entry]
    return original

def candidate_svg(paths, end, colored=True):
    pieces = [f'<path d="{p}" stroke="#bbb"/>' for p in paths[:end-1]]
    if colored:
        for progress, color in [(1, COLORS[3]), (.75, COLORS[2]), (.5, COLORS[1]), (.25, COLORS[0])]:
            pieces.append(f'<path d="{paths[end-1]}" pathLength="1" stroke="{color}" stroke-dasharray="1" stroke-dashoffset="{1-progress}"/>')
    else:
        pieces.append(f'<path d="{paths[end-1]}" stroke="#222"/>')
    return '<svg viewBox="0 0 100 100"><g fill="none" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round">' + ''.join(pieces) + '</g></svg>'

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass
    def do_GET(self):
        try:
            q = parse_qs(urlparse(self.path).query)
            index = int(q.get('i', ['0'])[0])
            entry = DATA['entries'][index]
            glyph = entry['glyph']
            data = source(glyph)
            if self.path.startswith('/metadata'):
                body = json.dumps({'glyph': glyph, 'dictionary': entry['dictionary'], 'transform': data['transform'],
                    'strokes': [{k:v for k,v in s.items() if k not in ('outline','animated')} for s in data['strokes']]}, ensure_ascii=False).encode()
                mime = 'application/json'
            else:
                paths = candidate_paths(glyph, q.get('corrected', ['0'])[0] == '1')
                content = f'<h1>{index+1}/50 · {glyph} · {len(paths)} strokes · {entry["corpus"]}</h1>'
                content += '<p>Left: Korean dictionary / Right: licensed candidate. Current stroke reveal: <b style="color:#245ad5">0–25%</b> → <b style="color:#168554">25–50%</b> → <b style="color:#df8800">50–75%</b> → <b style="color:#b42336">75–100%</b>. Previous strokes grey.</p>'
                content += '<div class="grid">'
                start = int(q.get('start', ['1'])[0])
                finish = min(len(paths), int(q.get('end', [str(len(paths))])[0]))
                for end in range(start, finish+1):
                    content += f'<section><strong>{end}</strong><div class="pair">' + dictionary_svg(glyph, end, True, f'{index}-{end}') + candidate_svg(paths, end) + '</div></section>'
                content += '</div><div class="final">'
                content += dictionary_svg(glyph, len(paths), False, 'final') + candidate_svg(paths, len(paths), False)
                content += '</div><p>©2020 e-hanja. Review only; no source artwork saved. Colored layers show frozen mask reveal, not equal elapsed time.</p>'
                body = ('<!doctype html><meta charset="utf-8"><style>body{zoom:2;width:1100px;margin:10px;background:white;color:#111;font:14px system-ui}h1{font-size:22px;margin:4px 0}p{margin:8px 0}.grid{display:grid;grid-template-columns:repeat(5,220px)}section{border:1px solid #ddd;padding:4px}strong{font-size:13px}.pair{display:flex}.pair svg{width:102px;height:110px}.final{display:flex;justify-content:center}.final svg{width:210px;height:210px}</style>' + content).encode()
                mime = 'text/html; charset=utf-8'
            self.send_response(200)
        except Exception as error:
            body, mime = str(error).encode(), 'text/plain; charset=utf-8'
            self.send_response(500)
        self.send_header('Content-Type', mime)
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 51743), Handler)
    print('G2 review http://127.0.0.1:51743', flush=True)
    server.serve_forever()
