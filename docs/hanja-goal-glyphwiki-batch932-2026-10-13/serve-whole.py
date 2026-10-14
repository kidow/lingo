# Source-only blocked whole comparison. Private dictionary is RAM-only; no candidate animation is constructed.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"u7dc5":"20f74da0d4ffb1bacaf85e998959a854afb8a956ad356e124abda4c84657c984","u7dc5-ue0100":"20f74da0d4ffb1bacaf85e998959a854afb8a956ad356e124abda4c84657c984"}
FACTS={"u7dc5":{"raw":17,"exactJoins":[[10,14],[14,15]],"minimum":15},"u7dc5-ue0100":{"raw":17,"exactJoins":[[10,14],[14,15]],"minimum":15}}
metadata=json.loads((HERE/'metadata.json').read_text())
assert not (HERE/'progressive.mjs').exists()
spec=importlib.util.spec_from_file_location('a932_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['緅']={'strokes':14,'dictionary':metadata['dictionary']}
def source(name):
    b=(HERE/('engine-whole-'+name+'.json')).read_bytes()
    assert hashlib.sha256(b).hexdigest()==PINS[name]
    p=json.loads(b);assert len(p['trace'])==FACTS[name]['raw']
    calls=[row for row in p['trace']]
    def end(c):return c['args'][2:4] if c['kind']=='cdDrawLine' else c['args'][4:6] if c['kind']=='cdDrawCurve' else c['args'][6:8]
    joins=[[i,j] for i in range(len(calls)) for j in range(len(calls)) if i!=j and end(calls[i][-1])==calls[j][0]['args'][:2]]
    assert joins==FACTS[name]['exactJoins']
    return p,joins
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            q=parse_qs(urlparse(self.path).query);name=q.get('id',['u7dc5'])[0];assert name in PINS
            p,joins=source(name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'緅','root':name,'raw':len(p['trace']),'exactJoins':joins,'minimumPens':FACTS[name]['minimum'],'domesticCount':14,'blocked':True,'compilerAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for group in p['groups'] for poly in group['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>緅 source blocked comparison</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>緅 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in PINS)+'<p>원본 최소15펜 &gt; 국내14획. 비연속접점은 승인하지 않으며 count 보정 없이 보류. 후보 애니메이션 없음, native 미승인.</p><div class="pair">'+r.base.full_dictionary('緅')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':2,'blocked':True,'nativeApproval':False}),flush=True)
server.serve_forever()
