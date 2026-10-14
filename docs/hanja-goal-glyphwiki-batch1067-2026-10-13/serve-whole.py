# Strict original-only blocked comparison; private dictionary SVG stays in RAM.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"engine-proof.json":"655ccee1ebef3e043e7e2b3d1fdf4f6a8fd299cd2e84fb6c0650d158b1bfb936","metadata.json":"bf69ba44796dd145c227e8b44e14a2156ef43eef37cb54f2ed5e4df374f081c9","sources.json":"b19ddfdd57ce69e70a8167d85db9d2e88437f3143d284b2afa28a1b9f879049a","progressive.mjs":"cf88c0ef1bfc0e8f78e2167c8a143c8928fb17c986e0f7274fd428b6591a5dd9","engine-whole-u4fd3.json":"a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4","engine-whole-u4fd3-k.json":"a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4","engine-whole-u4fd3-ue0100.json":"a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4"}
FACTS=[{"root":"u4fd3","raw":12,"nonEmptyRaw":12,"exactDirectedJoins":[],"maximumMatching":0,"minimumPensLowerBound":12,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u4fd3-k","raw":12,"nonEmptyRaw":12,"exactDirectedJoins":[],"maximumMatching":0,"minimumPensLowerBound":12,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u4fd3-ue0100","raw":12,"nonEmptyRaw":12,"exactDirectedJoins":[],"maximumMatching":0,"minimumPensLowerBound":12,"nonDrawingRaw":[],"nativeBoundariesApproved":False}]
NAMES=["u4fd3","u4fd3-k","u4fd3-ue0100"]
def check_pins():
    for name,pin in PINS.items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin
check_pins()
metadata=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('a1067_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['俓']={'strokes':9,'dictionary':metadata['dictionary']}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            check_pins()
            q=parse_qs(urlparse(self.path).query);name=q.get('id',["u4fd3"])[0];assert name in NAMES
            p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
            if p.get('groups') is None:
                body=json.dumps({'root':name,'originalWholeGeometryNull':True,'latestSubstitution':False,'candidateGeometryAbsent':True,'nativeApproval':False}).encode()
                self.send_response(200);self.send_header('Content-Type','application/json');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body);return
            facts=next(x for x in FACTS if x['root']==name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'俓','root':name,'facts':facts,'domesticCount':9,'reason':"complete-whole-minimum12-exceeds-catalogue9-no-exact-joins",'blocked':True,'candidateGeometryAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for g in p['groups'] for poly in g['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>俓 source blocked</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>俓 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in NAMES)+'<p>전체 원본 최소12펜으로 국내9획을 충족하지 못합니다. 정확한 raw끝접합도없습니다. 후보 animation/native 승인 없음.</p><div class="pair">'+r.base.full_dictionary('俓')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(NAMES),'blocked':True,'nativeApproval':False}),flush=True)
server.serve_forever()
