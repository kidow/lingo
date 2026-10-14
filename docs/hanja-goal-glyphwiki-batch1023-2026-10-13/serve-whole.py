# Strict original-only blocked comparison; private dictionary SVG stays in RAM.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"engine-proof.json":"0092d199029b6b8a54336de1a02bacccdea6197f55c425fd3fe0d1954381e603","metadata.json":"95a206c04e8aefa8dd116f363167ee43b9fc6d64281adfe411e5f6bdd39cef8d","sources.json":"61fd44c9c114c7227a361fd88202cb4bd4f6425d51feae2effefb9b5cced28b1","engine-whole-u9436.json":"ec19e3e858d95535af58486f5e28e1436902c78072a5d3fe57bf632e95468aea","engine-whole-u9436-ue0100.json":"ec19e3e858d95535af58486f5e28e1436902c78072a5d3fe57bf632e95468aea","progressive.mjs":"11862875b2a3a7c6846b2f740e88bd42bfd25f4765513dc87dfdc08905c7495a"}
FACTS=[{"root":"u9436","raw":24,"nonEmptyRaw":24,"exactDirectedJoins":[[8,13],[9,10],[15,18],[16,17]],"maximumMatching":4,"minimumPensLowerBound":20,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u9436-ue0100","raw":24,"nonEmptyRaw":24,"exactDirectedJoins":[[8,13],[9,10],[15,18],[16,17]],"maximumMatching":4,"minimumPensLowerBound":20,"nonDrawingRaw":[],"nativeBoundariesApproved":False}]
NAMES=["u9436","u9436-ue0100"]
def check_pins():
    for name,pin in PINS.items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin
check_pins()
metadata=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('a1023_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['鐶']={'strokes':21,'dictionary':metadata['dictionary']}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            check_pins()
            q=parse_qs(urlparse(self.path).query);name=q.get('id',["u9436"])[0];assert name in NAMES
            p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
            facts=next(x for x in FACTS if x['root']==name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'鐶','root':name,'facts':facts,'domesticCount':21,'reason':"excluding-incidental-outer-closures-leaves22-pens-above-catalogue21",'blocked':True,'candidateGeometryAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for g in p['groups'] for poly in g['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>鐶 source blocked</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>鐶 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in NAMES)+'<p>非연속 폐곡선 합침을 제외하면 원본22펜, 국내21획을 충족하지 못합니다. 후보 animation/native 승인 없음.</p><div class="pair">'+r.base.full_dictionary('鐶')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(NAMES),'blocked':True,'nativeApproval':False}),flush=True)
server.serve_forever()
