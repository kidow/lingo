#!/usr/bin/env python3
"""RAM-only 藍·蘆 and official 草 component evidence viewer. Never writes source assets."""
import sys
sys.dont_write_bytecode = True
import base64
import hashlib
import html
import http.cookiejar
import importlib.util
import io
import json
import re
import runpy
import types
import urllib.parse
import urllib.request
import zlib
from http.server import ThreadingHTTPServer
from pathlib import Path
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
spec = importlib.util.spec_from_file_location('grass_renderer', HERE.parent / 'hanja-g2-batch10-2026-09-16/serve.py')
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)
renderer.HERE = HERE
renderer.DATA = json.loads((HERE / 'originals.json').read_text())
renderer.ENTRIES = {e['glyph']: {**e, 'strokes':e['dictionaryStrokes']} for e in renderer.DATA['entries']}
OFFICIAL = None

def official():
    global OFFICIAL
    if OFFICIAL is not None:
        return OFFICIAL
    pin = json.loads((ROOT / 'public/hanja-strokes/splits-reviewed.json').read_text())
    client = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
    page_url = 'https://www.hanja.re.kr/kccpt/exam/otherData.do'
    page = client.open(page_url, timeout=30).read().decode()
    token = re.search(r'<meta name="_csrf" content="([^"]+)"', page).group(1)
    req = urllib.request.Request('https://www.hanja.re.kr/kccpt/exam/download.do',
        data=urllib.parse.urlencode({'file_seq':'12751','target_id':'115','_csrf':token}).encode(),
        headers={'X-CSRF-TOKEN':token})
    raw = client.open(req, timeout=30).read()
    if hashlib.sha256(raw).hexdigest() != pin['officialSource']['sha256']:
        raise ValueError('Official document changed')
    # CompoundFile does not use xlrd; do not install an unrelated XLS parser.
    sys.modules.setdefault('xlrd', types.ModuleType('xlrd'))
    document = runpy.run_path(str(ROOT / 'scripts/hanja-source.py'))['CompoundFile'](raw)
    gif = zlib.decompress(document.stream('BIN000D.gif'), -15)
    im = Image.open(io.BytesIO(gif))
    row = 7
    bounds = (0, round((row-1)*im.height/25), im.width, round(row*im.height/25))
    crop = im.crop(bounds)
    out = io.BytesIO()
    crop.save(out, format='PNG')
    paragraphs = []
    for name in document.entries:
        if not name.startswith('Section'):
            continue
        data = zlib.decompress(document.stream(name), -15)
        offset = 0
        while offset + 4 <= len(data):
            header = int.from_bytes(data[offset:offset+4], 'little')
            offset += 4
            tag, size = header & 1023, header >> 20
            if size == 4095:
                size = int.from_bytes(data[offset:offset+4], 'little')
                offset += 4
            payload = data[offset:offset+size]
            offset += size
            if tag == 67:
                text = payload.decode('utf-16le','replace')
                if '초두' in text:
                    paragraphs.append(text)
    OFFICIAL = {'paragraphs':paragraphs, 'metadata': {'url':page_url, **pin['officialSource'], 'bytes':len(raw),
        'sourceImage':'BIN000D.gif','sourceRow':row,'imageBytes':len(gif),
        'imageSha256':hashlib.sha256(gif).hexdigest(),'imageSize':list(im.size),'cropBounds':list(bounds)},
        'png':out.getvalue(), 'entry':next(e for e in pin['characters'] if e['glyph']=='草')}
    return OFFICIAL


class Handler(renderer.Handler):
    def do_GET(self):
        try:
            parsed = urllib.parse.urlparse(self.path)
            q = urllib.parse.parse_qs(parsed.query)
            i = int(q.get('i',['0'])[0])
            entry = renderer.DATA['entries'][i]
            glyph = entry['glyph']
            if parsed.path == '/official-metadata':
                o = official()
                body = json.dumps({'metadata':o['metadata'],'paragraphs':o['paragraphs']},ensure_ascii=False).encode()
                mime = 'application/json'
            elif parsed.path == '/metadata':
                data = renderer.source(glyph)
                body = json.dumps({'glyph':glyph,'dictionary':entry['dictionary'],'transform':data['transform'],
                    'strokes':[{k:v for k,v in s.items() if k not in ('outline','animated')} for s in data['strokes']]},ensure_ascii=False).encode()
                mime = 'application/json'
            else:
                if parsed.path == '/official':
                    o = official()
                    body = '<h1>Official 草 — BIN000D.gif / row 7</h1><p>Component evidence: the original row does not depict 藍 or 蘆.</p>'
                    body += '<img style="width:1100px;image-rendering:pixelated" src="data:image/png;base64,'+base64.b64encode(o['png']).decode()+'">'
                    body += '<h2>Official document text</h2><pre>'+html.escape('\n'.join(o['paragraphs']))+'</pre>'
                    body += '<h2>Existing approved 草 first four strokes</h2><div class="pair">'
                    for n in range(1,5):
                        body += renderer.candidate_svg(o['entry']['paths'],n)
                    body += '</div>'
                else:
                    paths = renderer.candidate_paths(glyph,q.get('corrected',['0'])[0]=='1')
                    mapping = [1,2,1,3] + list(range(4,entry['dictionaryStrokes']+1))
                    start,end = int(q.get('start',['1'])[0]),int(q.get('end',[str(len(paths))])[0])
                    body = '<h1>'+glyph+' · '+str(len(paths))+' candidate strokes / '+str(entry['dictionaryStrokes'])+' dictionary stages</h1>'
                    body += '<p>Left: dictionary; right: licensed candidate. First four: dictionary 1-left / 2 / 1-right / 3; official four-stroke grass is checked separately. Colors: blue → green → orange → red.</p><div class="grid">'
                    for n in range(start,min(end,len(paths))+1):
                        body += '<section><b>Candidate '+str(n)+' / dictionary '+str(mapping[n-1])+'</b><div class="pair">'
                        body += renderer.dictionary_svg(glyph,mapping[n-1],True,'g'+str(i)+'s'+str(n))
                        body += renderer.candidate_svg(paths,n)+'</div></section>'
                    body += '</div>'
                body = ('<!doctype html><meta charset="utf-8"><style>body{zoom:2;font:14px system-ui;color:#111;background:white;margin:10px;width:1100px}h1{font-size:22px}pre{white-space:pre-wrap}.grid{display:grid;grid-template-columns:repeat(2,550px)}section{border:1px solid #ddd}.pair{display:flex}svg{width:270px;height:270px}</style>'+body).encode()
                mime = 'text/html; charset=utf-8'
            self.send_response(200)
        except Exception as error:
            body,mime=str(error).encode(),'text/plain; charset=utf-8'
            self.send_response(500)
        self.send_header('Content-Type',mime)
        self.send_header('Cache-Control','no-store')
        self.send_header('Content-Length',str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == '__main__':
    print('Grass review http://127.0.0.1:51746',flush=True)
    ThreadingHTTPServer(('127.0.0.1',51746),Handler).serve_forever()
