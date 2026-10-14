# Strict original-only blocked comparison; private dictionary SVG stays in RAM.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"progressive.mjs":"202782f96ba4b155743f6459d8b202e930d4e1e947915bea1a1bb0ba01421feb","engine-proof.json":"ca57bdf4e2bde1cb6ed97d9e880324d06de13040287ee3f12afab287cee1f1c4","metadata.json":"0b2907fd07e6bd0228a327f774132546bb124bca4f7be84a586fde54fbe8b20c","sources.json":"00c8bf9fbeaad04fdeb63481808352a8613f1a30d73bc202cc619550055d1038","engine-whole-u6621.json":"129fe1e6b53f88b552a50c346f2fa22c379cc268a7e658972e405aea00072016","engine-whole-u6621-ue0100.json":"1be4ccf6402164428b790a5418ff27214a9a54ab2decd2fe74c1173512ea1c48","engine-whole-u6621-ue0101.json":"1be4ccf6402164428b790a5418ff27214a9a54ab2decd2fe74c1173512ea1c48","engine-whole-u6621-ue0102.json":"67b59b9e874156b76639b8f648c1cff10c966816bdd6558d96782023d1c3ed08"}
FACTS=[{"root":"u6621","raw":12,"nonEmptyRaw":12,"exactDirectedJoins":[[0,4],[1,2]],"maximumMatching":2,"minimumPensLowerBound":10,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u6621-ue0100","raw":12,"nonEmptyRaw":12,"exactDirectedJoins":[[0,4],[1,2]],"maximumMatching":2,"minimumPensLowerBound":10,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u6621-ue0101","raw":12,"nonEmptyRaw":12,"exactDirectedJoins":[[0,4],[1,2]],"maximumMatching":2,"minimumPensLowerBound":10,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u6621-ue0102","raw":11,"nonEmptyRaw":11,"exactDirectedJoins":[[0,4],[1,2]],"maximumMatching":2,"minimumPensLowerBound":9,"nonDrawingRaw":[],"nativeBoundariesApproved":False}]
NAMES=["u6621","u6621-ue0100","u6621-ue0101","u6621-ue0102"]
def check_pins():
    for name,pin in PINS.items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin
check_pins()
metadata=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('a1015_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['昡']={'strokes':9,'dictionary':metadata['dictionary']}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            check_pins()
            q=parse_qs(urlparse(self.path).query);name=q.get('id',["u6621-ue0102"])[0];assert name in NAMES
            p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
            facts=next(x for x in FACTS if x['root']==name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'昡','root':name,'facts':facts,'domesticCount':9,'reason':"excluding-incidental-day-outer-closure-leaves-10-pens-above-catalogue9",'blocked':True,'candidateGeometryAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for g in p['groups'] for poly in g['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>昡 source blocked</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>昡 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in NAMES)+'<p>日 부품의 비연속 폐합을 제외하면 원본10펜으로 국내9획을 충족하지 못합니다. 후보 animation/native 승인 없음.</p><div class="pair">'+r.base.full_dictionary('昡')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(NAMES),'blocked':True,'nativeApproval':False}),flush=True)
server.serve_forever()
