#!/usr/bin/env python3
"""RAM-only 晟 and official 成 component evidence viewer. Never writes source assets."""
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
spec = importlib.util.spec_from_file_location('sheng_renderer', HERE.parent / 'hanja-g2-batch10-2026-09-16/serve.py')
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)
renderer.HERE = HERE
renderer.DATA = json.loads((HERE / 'originals.json').read_text())
renderer.ENTRIES = {e['glyph']: e for e in renderer.DATA['entries']}
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
    gif = zlib.decompress(document.stream('BIN002A.gif'), -15)
    im = Image.open(io.BytesIO(gif))
    row = 19
    bounds = (0, round((row-1)*im.height/25), im.width, round(row*im.height/25))
    crop = im.crop(bounds)
    out = io.BytesIO()
    crop.save(out, format='PNG')
    OFFICIAL = {'metadata': {'url':page_url, **pin['officialSource'], 'bytes':len(raw),
        'sourceImage':'BIN002A.gif','sourceRow':row,'imageBytes':len(gif),
        'imageSha256':hashlib.sha256(gif).hexdigest(),'imageSize':list(im.size),'cropBounds':list(bounds)},
        'png':out.getvalue(), 'entry':next(e for e in pin['characters'] if e['glyph']=='成')}
    return OFFICIAL

class Handler(renderer.Handler):
    def do_GET(self):
        if urllib.parse.urlparse(self.path).path == '/proposal':
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            start, end = int(q.get('start', ['1'])[0]), int(q.get('end', ['11'])[0])
            mapping = [1,2,3,4,5,6,7,7,8,9,10]
            paths = renderer.candidate_paths('晟', True)
            body = '<h1>晟 · proposed 11 strokes</h1><p>Left: 10-stage dictionary; right: proposed licensed 11-stage paths. Rows 7 and 8 share dictionary stage 7; their boundary is checked separately against official 成 stages 3 and 4.</p><div class="grid">'
            for n in range(start, min(end,11)+1):
                body += '<section><b>Runtime '+str(n)+' / dictionary '+str(mapping[n-1])+'</b><div class="pair">'
                body += renderer.dictionary_svg('晟', mapping[n-1], True, 's'+str(n))
                body += renderer.candidate_svg(paths,n)+'</div></section>'
            body += '</div>'
            body = ('<!doctype html><meta charset="utf-8"><style>body{font:14px system-ui;color:#111;background:white;margin:10px;width:1100px}.grid{display:grid;grid-template-columns:repeat(2,550px)}section{border:1px solid #ddd}.pair{display:flex}svg{width:270px;height:270px}</style>'+body).encode()
            self.send_response(200)
            self.send_header('Content-Type','text/html; charset=utf-8')
            self.send_header('Cache-Control','no-store')
            self.send_header('Content-Length',str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if urllib.parse.urlparse(self.path).path not in ['/official', '/official-metadata']:
            return super().do_GET()
        try:
            o = official()
            if self.path.startswith('/official-metadata'):
                body = json.dumps(o['metadata'],ensure_ascii=False).encode()
                mime = 'application/json'
            else:
                image = base64.b64encode(o['png']).decode()
                body = '<h1>Official 成 — BIN002A.gif / row 19</h1><p>Component evidence only; this row does not depict 晟.</p>'
                body += '<img style="width:1100px;image-rendering:pixelated" src="data:image/png;base64,'+image+'">'
                body += '<h2>Existing approved seven-stroke component</h2><div style="display:flex">'
                for n in range(1,8):
                    body += '<section><b>'+str(n)+'</b>'+renderer.candidate_svg(o['entry']['paths'],n)+'</section>'
                body += '</div>'
                body = ('<!doctype html><meta charset="utf-8"><style>body{font:14px system-ui;color:#111;background:white;margin:10px;width:1120px}section{width:155px}svg{width:150px;height:150px}</style>'+body).encode()
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
    print('晟 review http://127.0.0.1:51746',flush=True)
    ThreadingHTTPServer(('127.0.0.1',51746),Handler).serve_forever()
