#!/usr/bin/env python3
"""Read-only 飼 review viewer; copyrighted source artwork remains in RAM."""
import sys
sys.dont_write_bytecode = True
import importlib.util
import json
import urllib.parse
from pathlib import Path
from http.server import ThreadingHTTPServer
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('si_renderer', HERE.parent / 'hanja-g2-batch10-2026-09-16/serve.py')
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)
renderer.HERE = HERE
renderer.DATA = json.loads((HERE / 'originals.json').read_text())
renderer.ENTRIES = {e['glyph']:{**e,'strokes':e['dictionaryStrokes']} for e in renderer.DATA['entries']}
MOE = None
def moe_source():
    global MOE
    if MOE is not None:
        return MOE
    import urllib.request
    import re
    import hashlib
    import xml.etree.ElementTree as ET
    url = 'https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID=39164&la=0'
    raw = urllib.request.urlopen(url, timeout=30).read()
    literal = re.search(r'xml\[39164\]=("(?:[^"\\]|\\.)*")',raw.decode()).group(1)
    xml = json.loads(literal).encode()
    assert hashlib.sha256(xml).hexdigest() == 'ab2c347fe331ad593210a71d56713575de10f01cc4869d54358f36e4282a48c3'
    root = ET.fromstring(xml)
    assert root.get('unicode') == '飼'
    rows = []
    for stroke in root.findall('Stroke'):
        outline = []
        for p in stroke.find('Outline'):
            a = p.attrib
            if p.tag == 'MoveTo':
                outline.append('M'+a['x']+' '+a['y'])
            elif p.tag == 'LineTo':
                outline.append('L'+a['x']+' '+a['y'])
            elif p.tag == 'QuadTo':
                outline.append('Q'+a['x1']+' '+a['y1']+' '+a['x2']+' '+a['y2'])
            else:
                raise ValueError('Unknown MOE outline command')
        outline.append('Z')
        points = list(stroke.find('Track'))
        track = ' '.join(('M' if n == 0 else 'L')+p.get('x')+' '+p.get('y') for n,p in enumerate(points))
        rows.append({'outline':' '.join(outline),'track':track})
    assert len(rows) == 13
    MOE = {'rows':rows,'metadata':{'url':url,'status':200,'pageBytes':len(raw),'pageSha256':hashlib.sha256(raw).hexdigest(),
        'embeddedXmlBytes':len(xml),'embeddedXmlSha256':hashlib.sha256(xml).hexdigest(),'strokes':13,'unicode':root.get('unicode'),
        'sourceScope':'Taiwan MOE whole-glyph reference, not Korean examination certification'}}
    return MOE
def moe_svg(end):
    rows = moe_source()['rows']
    pieces = ['<path fill="#bbb" d="'+s['outline']+'"/>' for s in rows[:end-1]]
    s = rows[end-1]
    pieces.append('<path fill="#b42336" d="'+s['outline']+'"/>')
    pieces.append('<defs><clipPath id="m'+str(end)+'"><path d="'+s['outline']+'"/></clipPath></defs>')
    for progress,color in [(.75,'#df8800'),(.5,'#168554'),(.25,'#245ad5')]:
        pieces.append('<path d="'+s['track']+'" fill="none" clip-path="url(#m'+str(end)+')" pathLength="1" stroke="'+color+'" stroke-width="300" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="'+str(1-progress)+'"/>')
    return '<svg viewBox="0 0 2048 2048">'+''.join(pieces)+'</svg>'
FORMS = None
def form_sources():
    global FORMS
    if FORMS is not None:
        return FORMS
    import urllib.request
    import hashlib
    import base64
    assets = []
    for label, url, local in [
        ('App 飼 outline', 'public/hanja/u98fc.svg', True),
        ('CNS 𩙿 kai', 'https://www.cns11643.gov.tw/char/kai/64/2967f.png', False),
        ('CNS 𩙿 sung', 'https://www.cns11643.gov.tw/char/sung/64/2967f.png', False),
    ]:
        raw = (HERE.parents[1] / url).read_bytes() if local else urllib.request.urlopen(url, timeout=30).read()
        expected = next(a for a in json.loads((HERE / 'source-checks.json').read_text())['staticForms'] if a['url'] == url)
        assert hashlib.sha256(raw).hexdigest() == expected['sha256']
        mime = 'image/svg+xml' if local else 'image/png'
        assets.append({'label':label,'url':url,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),
            'data':'data:'+mime+';base64,'+base64.b64encode(raw).decode()})
    FORMS = assets
    return FORMS
class Handler(renderer.Handler):
    def do_GET(self):
        try:
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            glyph = '飼'
            if self.path.startswith('/forms-metadata'):
                body = json.dumps([{k:v for k,v in a.items() if k != 'data'} for a in form_sources()],ensure_ascii=False).encode()
                mime = 'application/json'
            elif self.path.startswith('/forms'):
                pieces = ['<!doctype html><meta charset="utf-8"><style>body{zoom:2;background:white;color:black;font:18px system-ui}.row{display:flex;gap:12px}figure{margin:10px}img{width:300px;height:300px;object-fit:contain}</style><h1>飼 14 target / 𩙿 nine-stroke component</h1><p>Static form only: this does not establish whole-glyph stroke order.</p><div class="row">']
                for a in form_sources():
                    pieces.append('<figure><img src="'+a['data']+'"><figcaption>'+a['label']+'</figcaption></figure>')
                body = (''.join(pieces)+'</div>').encode()
                mime = 'text/html; charset=utf-8'
            elif self.path.startswith('/moe-metadata'):
                body = json.dumps(moe_source()['metadata'],ensure_ascii=False).encode()
                mime = 'application/json'
            elif self.path.startswith('/metadata'):
                data = renderer.source(glyph)
                body = json.dumps({'glyph':glyph,'dictionary':renderer.ENTRIES[glyph]['dictionary'],'transform':data['transform'],
                    'strokes':[{k:v for k,v in s.items() if k not in ('outline','animated')} for s in data['strokes']]},ensure_ascii=False).encode()
                mime = 'application/json'
            else:
                paths = renderer.candidate_paths(glyph,False)
                start,end = int(q.get('start',['1'])[0]),int(q.get('end',['13'])[0])
                # Both references are thirteen-stroke forms; the fourteen-stroke runtime target remains unapproved.
                mapping = list(range(1,14))
                is_moe = q.get('source',['dictionary'])[0] == 'moe'
                body = '<h1>飼 · 13 candidate strokes / '+('MOE 13' if is_moe else 'dictionary 13')+' source stages</h1><p>Left source; right licensed candidate. Review the thirteen-stroke variant; catalog target is fourteen and remains unapproved. Reveal blue → green → orange → red.</p><div class="grid">'
                for n in range(start,min(end,len(paths))+1):
                    body += '<section><b>Candidate '+str(n)+' / '+('MOE '+str(n) if is_moe else 'dictionary '+str(mapping[n-1]))+'</b><div class="pair">'
                    body += (moe_svg(n) if is_moe else renderer.dictionary_svg(glyph,mapping[n-1],True,'s'+str(n)))+renderer.candidate_svg(paths,n)+'</div></section>'
                body += '</div>'
                body = ('<!doctype html><meta charset="utf-8"><style>body{zoom:2;font:14px system-ui;color:#111;background:white;margin:10px;width:1100px}h1{font-size:22px}.grid{display:grid;grid-template-columns:repeat(2,550px)}section{border:1px solid #ddd}.pair{display:flex}svg{width:270px;height:270px}</style>'+body).encode()
                mime = 'text/html; charset=utf-8'
            self.send_response(200)
        except Exception as error:
            body,mime=str(error).encode(),'text/plain'
            self.send_response(500)
        self.send_header('Content-Type',mime)
        self.send_header('Cache-Control','no-store')
        self.send_header('Content-Length',str(len(body)))
        self.end_headers()
        self.wfile.write(body)
if __name__ == '__main__':
    print('Si review http://127.0.0.1:51746',flush=True)
    ThreadingHTTPServer(('127.0.0.1',51746),Handler).serve_forever()
