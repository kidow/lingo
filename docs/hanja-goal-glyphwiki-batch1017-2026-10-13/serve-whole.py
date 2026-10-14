# Strict original-only blocked comparison; private dictionary SVG stays in RAM.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"progressive.mjs":"db139a1645413965da58ff002d5ba10088b15db8dfcab4b2abf91c57762fab77","engine-proof.json":"f8bb397b969b2d0df140586790f7372c622d4286c09c30aa6e2e442c9ec4eeec","metadata.json":"f97df5aa508f9244ec2af7ef319a39c9f62654da7a90f808ab1d8c84456f01e5","sources.json":"302abc84cb13e3caaa625480c7c805d35eb96eb0ba6e7f12a9059eb6110df24b","engine-whole-u7050.json":"48c62ed4fbebc6fd0bb1103b93c578054532103f253d97e08949f84ed62a5e30","engine-whole-u7050-k.json":"c076cf488b8949b8387e8cb349aec1717af0f639468d4d2977d2d10de7e0fa1a"}
FACTS=[{"root":"u7050","raw":24,"nonEmptyRaw":23,"exactDirectedJoins":[[14,15]],"maximumMatching":1,"minimumPensLowerBound":22,"nonDrawingRaw":[4],"nativeBoundariesApproved":False},{"root":"u7050-k","raw":24,"nonEmptyRaw":23,"exactDirectedJoins":[[14,15]],"maximumMatching":1,"minimumPensLowerBound":22,"nonDrawingRaw":[4],"nativeBoundariesApproved":False}]
NAMES=["u7050","u7050-k"]
def check_pins():
    for name,pin in PINS.items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin
check_pins()
metadata=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('a1017_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['灐']={'strokes':21,'dictionary':metadata['dictionary']}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            check_pins()
            q=parse_qs(urlparse(self.path).query);name=q.get('id',["u7050"])[0];assert name in NAMES
            p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
            facts=next(x for x in FACTS if x['root']==name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'灐','root':name,'facts':facts,'domesticCount':21,'reason':"original-water-trajectory-gap-and-minimum-pens22-exceeds-catalogue21",'blocked':True,'candidateGeometryAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for g in p['groups'] for poly in g['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>灐 source blocked</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>灐 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in NAMES)+'<p>물 부수 raw2→3 원본 경로 간격34.17207376. 전체 원본 최소22펜으로 국내21획을 충족하지 못합니다. 후보 animation/native 승인 없음.</p><div class="pair">'+r.base.full_dictionary('灐')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(NAMES),'blocked':True,'nativeApproval':False}),flush=True)
server.serve_forever()
