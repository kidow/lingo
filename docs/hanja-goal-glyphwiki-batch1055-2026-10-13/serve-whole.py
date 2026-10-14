# Strict original-only blocked comparison; private dictionary SVG stays in RAM.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"engine-proof.json":"b56d6a71c7835c50f2dba80ea1f66a9b61d076ec166128476da75d4cc5cef8d1","metadata.json":"f8b95555ea8c624884ef8b613447118192d0b1169599d0c2396a7f65f60eb20d","sources.json":"df0f33ef60ec805f5508c8fc2d51b49e368307bc4341181974d3b41d1b887293","engine-whole-u8a29.json":"b56d6a71c7835c50f2dba80ea1f66a9b61d076ec166128476da75d4cc5cef8d1"}
FACTS=[{"root":"u8a29","raw":13,"originalDrawingCalls":13,"polygons":23,"sourceGeometryPreserved":True}]
NAMES=["u8a29"]
def check_pins():
    for name,pin in PINS.items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin
check_pins()
metadata=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('a1055_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['訩']={'strokes':11,'dictionary':metadata['dictionary']}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            check_pins()
            q=parse_qs(urlparse(self.path).query);name=q.get('id',["u8a29"])[0];assert name in NAMES
            p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
            facts=next(x for x in FACTS if x['root']==name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'訩','root':name,'facts':facts,'domesticCount':11,'reason':"Original adjacent grouping yields12 rather than catalog/domestic11. Exact nonadjacent raw10->12 contact and raw4->7 enclosing contact are not evidence for a count-driven merged pen.",'blocked':True,'candidateGeometryAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for g in p['groups'] for poly in g['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>訩 source blocked</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>訩 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in NAMES)+'<p>原본 인접 그룹은12펜, 국내11획. 비연속raw10→12와4→7 외곽폐합 접점은 획수를 맞추는 승인근거가 아닙니다. 후보 animation/native 승인 없음.</p><div class="pair">'+r.base.full_dictionary('訩')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(NAMES),'blocked':True,'nativeApproval':False}),flush=True)
server.serve_forever()
