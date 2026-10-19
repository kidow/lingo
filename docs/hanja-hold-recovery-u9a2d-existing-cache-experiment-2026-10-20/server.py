#!/usr/bin/env python3
"""騭 고정 원 캐시만 표시한다. 원887 서버·compiler·engine은 실행하지 않는다."""
import sys
sys.dont_write_bytecode=True
import argparse,hashlib,html,json,re,threading,urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
REPO=HERE.parent.parent
CONFIG_SHA='586ae42aabe6feb614adde27f4a0d58fc9fa9a81b7ff0625091b4b424bee7e84'
CONFIG=None
PROOFS={}
FULL_PROOF=None
ENTRIES={}
CACHE={}
NS='{http://www.w3.org/2000/svg}'
LOCK=threading.Lock()
COLORS=['#245ad5','#168554','#df8800','#b42336']
def sha(raw):return hashlib.sha256(raw).hexdigest()
def guards():
    if sha((HERE/'config.json').read_bytes())!=CONFIG_SHA:raise ValueError('config changed')
    if sha((HERE/'browser.mjs').read_bytes())!=CONFIG['browserSHA256']:raise ValueError('browser changed')
    for file,expected in CONFIG['inputSHA256'].items():
        if sha((REPO/file).read_bytes())!=expected:raise ValueError('original input changed')
def validate_proof(proof,spec):
    if sorted(proof)!=spec['keys']:raise ValueError('original proof keys changed')
    if len(proof['groups'])!=spec['raw']or len(proof['trace'])!=spec['raw']:raise ValueError('original raw count changed')
    if sum(len(g['polygons'])for g in proof['groups'])!=spec['polygons']:raise ValueError('original polygon count changed')
    for index,row in enumerate(proof['trace']):
        if [poly for call in row for poly in call['polygons']]!=proof['groups'][index]['polygons']:raise ValueError('trace/group changed')
def load_originals():
    original=REPO/CONFIG['sourceFolder']
    sources=json.loads((original/'sources.json').read_bytes())
    if sorted(sources['records'])!=sorted(x['name']for x in CONFIG['sourceClosure']):raise ValueError('closure names changed')
    for expected in CONFIG['sourceClosure']:
        record=sources['records'][expected['name']]
        if record['name']!=expected['name']or record['related']!=expected['related']or sha(record['data'].encode())!=expected['sourceSha256']:raise ValueError('closure record changed')
    full_spec=CONFIG['full5']
    full=json.loads((original/full_spec['file']).read_bytes())
    validate_proof(full,full_spec)
    for root,spec in CONFIG['roots'].items():
        raw=(original/spec['file']).read_bytes()
        if sha(raw)!=spec['SHA256']:raise ValueError('selected whole SHA changed')
        proof=json.loads(raw);validate_proof(proof,spec)
        PROOFS[root]=proof
    if any(PROOFS['u9a2d'][key]!=full[key]for key in ['groups','trace','defaults']):raise ValueError('base body differs from original full5')
    return full

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

def original_svg(root,raw=None):
    if root not in CONFIG['roots']:raise ValueError('unsupported exact root')
    if raw is not None and raw not in CONFIG['roots'][root]['rawSelectors']:raise ValueError('unsupported original raw')
    proof=PROOFS[root]
    groups=proof['groups']if raw is None else [proof['groups'][raw]]
    polygons=[]
    for group in groups:
        for poly in group['polygons']:
            if not all(v['off']==0 for v in poly):raise ValueError('unsupported original polygon')
            polygons.append('<polygon points="'+' '.join(str(v['x'])+','+str(v['y'])for v in poly)+'"/>')
    return '<svg viewBox="0 0 200 200">'+''.join(polygons)+'</svg>'
def domestic_whole():
    data=source('騭')
    if len(data['strokes'])!=20:raise ValueError('dictionary count changed')
    paths=''.join('<path d="'+html.escape(s['outline'].get('d'))+'"/>'for s in data['strokes'])
    return '<svg viewBox="0 0 1024 1024"><g transform="'+data['transform']+'">'+paths+'</g></svg>'
def parse_route(path):
    u=urlparse(path);q={}if not u.query else parse_qs(u.query,strict_parsing=True)
    if u.path=='/'and not q:return ('page',)
    if u.path=='/browser.mjs'and not q:return ('browser',)
    if u.path=='/api/domestic-whole'and not q:return ('domestic-whole',)
    if u.path=='/api/whole'and set(q)=={'root'}and len(q['root'])==1:
        root=q['root'][0]
        if root not in CONFIG['roots']:raise ValueError('unsupported root')
        return ('whole',root)
    if u.path=='/api/raw'and set(q)=={'root','raw'}and all(len(v)==1 for v in q.values()):
        root=q['root'][0];raw=int(q['raw'][0])
        if root not in CONFIG['roots']or raw not in CONFIG['roots'][root]['rawSelectors']:raise ValueError('unsupported root/raw')
        return ('raw',root,raw)
    if u.path=='/api/domestic'and set(q)=={'stroke'}and len(q['stroke'])==1:
        pen=int(q['stroke'][0])
        if pen not in CONFIG['domesticPens']:raise ValueError('unsupported domestic pen')
        return ('domestic',pen)
    raise ValueError('unsupported exact request')
def page():
    return '''<!doctype html><html lang="ko"><meta charset="utf-8"><title>騭 원 캐시 비교</title>
<style>body{width:1680px;margin:20px;font:16px system-ui;background:#faf8f4;color:#222}.wholes{display:grid;grid-template-columns:repeat(3,540px);gap:16px}.pair{display:grid;grid-template-columns:repeat(2,540px);gap:16px}svg{display:block;width:520px;height:520px;background:white;border:1px solid #ddd}h2{font-size:17px}button,select{font:inherit;margin:5px;padding:6px}output{display:block;margin:12px 0}.notice{max-width:1500px;line-height:1.6}</style>
<h1>騭 U+9A2D · 원 캐시 비교</h1><p class="notice">호환 자형·필순 승인이 아닙니다. base와VS2 원 whole 및 각각의 raw를 독립적으로 확인합니다. base full5와원 whole3키는 별도로 보존하며 VS2에 다른 header를 덧붙이지 않습니다. raw 번호는0부터이고, raw들을 합치거나 새 순서를 정하지 않습니다. 기존887 서버의10획 계약은 사용하지 않습니다.</p>
<div><button id="domestic-8">국내8획</button><button id="domestic-11">국내11획</button><button id="domestic-12">국내12획</button><button id="domestic-13">국내13획</button><button id="domestic-14">국내14획</button><button id="domestic-15">국내15획</button><button id="domestic-16">국내16획</button><button id="domestic-17">국내17획</button><button id="domestic-whole">국내 전체 자형</button></div>
<label>원본<select id="root"><option>u9a2d</option><option>u9a2d-ue0102</option></select></label><label>원 raw<select id="raw"></select></label><div id="raw-buttons"></div><output id="status"></output>
<div class="pair"><section><h2 id="domestic-label">국내 원 방향</h2><div id="domestic"></div></section><section><h2 id="raw-label">선택 원 raw</h2><div id="original-raw"></div></section></div>
<div class="wholes"><section><h2>국내 전체 · 원20 outline</h2><div id="whole-domestic"></div></section><section><h2>base · 원22raw48polygon</h2><div id="whole-base"></div></section><section><h2>VS2 · 원23raw50polygon</h2><div id="whole-vs2"></div></section></div><script type="module" src="/browser.mjs"></script></html>'''
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            guards();route=parse_route(self.path)
            if route[0]=='page':body,kind=page(),'text/html; charset=utf-8'
            elif route[0]=='browser':body,kind=(HERE/'browser.mjs').read_text(),'text/javascript; charset=utf-8'
            elif route[0]=='whole':body,kind=original_svg(route[1]),'image/svg+xml'
            elif route[0]=='raw':body,kind=original_svg(route[1],route[2]),'image/svg+xml'
            elif route[0]=='domestic-whole':body,kind=domestic_whole(),'image/svg+xml'
            else:body,kind=dictionary_svg('騭',route[1],True,'domestic-'+str(route[1])),'image/svg+xml'
            data=body.encode();self.send_response(200);self.send_header('Content-Type',kind);self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
        except Exception:self.send_error(409,'Pinned source or exact request contract mismatch')
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=0);args=parser.parse_args()
    CONFIG=json.loads((HERE/'config.json').read_bytes());guards();FULL_PROOF=load_originals()
    ENTRIES={'騭':{'strokes':20,'dictionary':CONFIG['dictionary']}}
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(json.dumps({'glyph':'騭','codepoint':'U+9A2D','port':server.server_address[1],'pid':__import__('os').getpid(),'compilerExecuted':False,'engineExecuted':False,'nativeApproval':False}),flush=True);server.serve_forever()
