# Source-only blocked whole comparison. Private dictionary is RAM-only; no candidate animation is constructed.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"u9714":"8f9ffe3236eac802842b8446cfb773ce94fa4e8b41c8215489408bb36ada6ceb","u9714-ue0100":"63467de72245ab7b6b6d50ff0887102a60ed9e96138d124782e18218f449cff1"}
metadata=json.loads((HERE/'metadata.json').read_text())
assert not (HERE/'progressive.mjs').exists()
spec=importlib.util.spec_from_file_location('a885_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['霔']={'strokes':16,'dictionary':metadata['dictionary']}
def source(name):
    b=(HERE/('engine-whole-'+name+'.json')).read_bytes()
    assert hashlib.sha256(b).hexdigest()==PINS[name]
    p=json.loads(b);assert len(p['trace'])==18
    calls=[row for row in p['trace']]
    assert all(len(row)==1 for row in calls)
    def end(c):return c['args'][2:4] if c['kind']=='cdDrawLine' else c['args'][4:6] if c['kind']=='cdDrawCurve' else c['args'][6:8]
    joins=[[i,j] for i in range(18) for j in range(18) if i!=j and end(calls[i][0])==calls[j][0]['args'][:2]]
    assert joins==[[2,3]]
    return p,joins
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            q=parse_qs(urlparse(self.path).query);name=q.get('id',['u9714'])[0];assert name in PINS
            p,joins=source(name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'霔','root':name,'raw':18,'exactJoins':joins,'minimumPens':17,'domesticCount':16,'blocked':True,'compilerAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for group in p['groups'] for poly in group['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>霔 source blocked comparison</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>霔 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in PINS)+'<p>원본18 raw · exact2→3 하나 · 연속 최소17펜 &gt; 국내16획. 후보 애니메이션 없음, native 미승인.</p><div class="pair">'+r.base.full_dictionary('霔')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
print(json.dumps({'port':64689,'pid':os.getpid(),'wholeVariants':2,'blocked':True,'nativeApproval':False}),flush=True)
ThreadingHTTPServer(('127.0.0.1',64689),Handler).serve_forever()
