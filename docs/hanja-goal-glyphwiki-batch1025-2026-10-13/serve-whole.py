# Strict original-only blocked comparison; private dictionary SVG stays in RAM.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"engine-proof.json":"dd468c4035833980ccb6de7795ebb1efc663aef16384646dc4085595a6b322c6","metadata.json":"97455ac0e0e112bdf7ccec0fdaba166b7a6b9d646cd40cf29059e7a4220c56c6","sources.json":"e26b9747176ad7e20aca20d479caba86ff5cd8359f67887fd742755e01f57208","engine-whole-u705d.json":"dd468c4035833980ccb6de7795ebb1efc663aef16384646dc4085595a6b322c6","engine-whole-u705d-k.json":"53a4ef61ebb41c265e2e7ed4ff40c79bba9002d9fec93aa4c743e10ab3916f18","engine-whole-u705d-ue0100.json":"53a4ef61ebb41c265e2e7ed4ff40c79bba9002d9fec93aa4c743e10ab3916f18"}
FACTS=[{"root":"u705d","raw":28,"min":22,"contiguousCandidateCount":25,"sourceProofFile":"engine-whole-u705d.json","sourceProofFileSHA256":"dd468c4035833980ccb6de7795ebb1efc663aef16384646dc4085595a6b322c6","joins":[[4,8],[5,6],[11,14],[12,13],[20,25],[21,22]]},{"root":"u705d-k","raw":28,"min":22,"contiguousCandidateCount":25,"sourceProofFile":"engine-whole-u705d-k.json","sourceProofFileSHA256":"53a4ef61ebb41c265e2e7ed4ff40c79bba9002d9fec93aa4c743e10ab3916f18","joins":[[4,8],[5,6],[11,14],[12,13],[20,25],[21,22]]},{"root":"u705d-ue0100","raw":28,"min":22,"contiguousCandidateCount":25,"sourceProofFile":"engine-whole-u705d-ue0100.json","sourceProofFileSHA256":"53a4ef61ebb41c265e2e7ed4ff40c79bba9002d9fec93aa4c743e10ab3916f18","joins":[[4,8],[5,6],[11,14],[12,13],[20,25],[21,22]]}]
NAMES=["u705d","u705d-k","u705d-ue0100"]
def check_pins():
    for name,pin in PINS.items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin
check_pins()
metadata=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('a1025_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['灝']={'strokes':24,'dictionary':metadata['dictionary']}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            check_pins()
            q=parse_qs(urlparse(self.path).query);name=q.get('id',["u705d"])[0];assert name in NAMES
            p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
            facts=next(x for x in FACTS if x['root']==name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'灝','root':name,'facts':facts,'domesticCount':24,'reason':"previously_native_reviewed_water_pen3_discontinuity_unchanged",'blocked':True,'candidateGeometryAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for g in p['groups'] for poly in g['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>灝 source blocked</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>灝 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in NAMES)+'<p>모든3종 원본에서 물부3획 raw2→3 간격34.62340393. 기존 실제 필순 검토의 단절 보류를 유지합니다. 후보 animation/native 승인 없음.</p><div class="pair">'+r.base.full_dictionary('灝')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(NAMES),'blocked':True,'nativeApproval':False}),flush=True)
server.serve_forever()
