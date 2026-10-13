# Source-only blocked whole comparison. Private dictionary is RAM-only; no candidate animation is constructed.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"u6303":"37bcba1d9a61def4d1628bae9474605484d73cc3e336965a2d604e2d9c91065f","u6303-ue0100":"37bcba1d9a61def4d1628bae9474605484d73cc3e336965a2d604e2d9c91065f"}
metadata=json.loads((HERE/'metadata.json').read_text())
assert not (HERE/'progressive.mjs').exists()
spec=importlib.util.spec_from_file_location('a901_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['挃']={'strokes':9,'dictionary':metadata['dictionary']}
def source(name):
    b=(HERE/('engine-whole-'+name+'.json')).read_bytes()
    assert hashlib.sha256(b).hexdigest()==PINS[name]
    p=json.loads(b);assert len(p['trace'])==10
    calls=[row for row in p['trace']]
    def end(c):return c['args'][2:4] if c['kind']=='cdDrawLine' else c['args'][4:6] if c['kind']=='cdDrawCurve' else c['args'][6:8]
    joins=[[i,j] for i in range(10) for j in range(10) if i!=j and end(calls[i][-1])==calls[j][0]['args'][:2]]
    assert joins==[]
    return p,joins
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            q=parse_qs(urlparse(self.path).query);name=q.get('id',['u6303'])[0];assert name in PINS
            p,joins=source(name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'挃','root':name,'raw':10,'exactJoins':joins,'minimumPens':10,'domesticCount':9,'blocked':True,'compilerAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for group in p['groups'] for poly in group['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>挃 source blocked comparison</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>挃 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in PINS)+'<p>원본10 raw · exactjoin0 · 최소10펜 &gt; 국내9획. 후보 애니메이션 없음, native 미승인.</p><div class="pair">'+r.base.full_dictionary('挃')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
print(json.dumps({'port':64731,'pid':os.getpid(),'wholeVariants':2,'blocked':True,'nativeApproval':False}),flush=True)
ThreadingHTTPServer(('127.0.0.1',64731),Handler).serve_forever()
