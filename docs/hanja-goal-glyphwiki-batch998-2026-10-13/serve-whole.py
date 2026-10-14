# Strict original-only blocked comparison; private dictionary SVG stays in RAM.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"progressive.mjs":"f55c5034854579bb5f460c9701397aec7e6e2245523f0b5728dbbf6e0e2cd218","engine-proof.json":"0104286a70b78c53d37ef8580af6ba74de29e401054177f6192a1b884aa52521","metadata.json":"a47e681720fe5ffbf81d700d7a7181ed9b7ad114a20b5f54f6762fbfbe763d57","sources.json":"d877e420449e19ae215790b2bfe1ab689e8d6150eb91c0776203dd70448d2584","engine-whole-u83cf.json":"4eda361c905045c27caafd5174ea22bf4b314a8836fc48f9e146cbc093a1d5f5","engine-whole-u83cf-ue0100.json":"97c3d94e44bbcfab7c99f32393ef08fa4a22fca4501701c04117fc37986aa9c6","engine-whole-u83cf-ue0101.json":"97c3d94e44bbcfab7c99f32393ef08fa4a22fca4501701c04117fc37986aa9c6","engine-whole-u83cf-ue0102.json":"d7dddbbf0d5c78541e7af0416b2a2b075deeda33d6e15668357adf639441c73e"}
FACTS=[{"root":"u83cf","raw":13,"nonEmptyRaw":13,"exactDirectedJoins":[[8,11],[9,10]],"maximumMatching":2,"minimumPensLowerBound":11,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u83cf-ue0100","raw":13,"nonEmptyRaw":13,"exactDirectedJoins":[[8,11],[9,10]],"maximumMatching":2,"minimumPensLowerBound":11,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u83cf-ue0101","raw":13,"nonEmptyRaw":13,"exactDirectedJoins":[[8,11],[9,10]],"maximumMatching":2,"minimumPensLowerBound":11,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u83cf-ue0102","raw":14,"nonEmptyRaw":14,"exactDirectedJoins":[[9,12],[10,11]],"maximumMatching":2,"minimumPensLowerBound":12,"nonDrawingRaw":[],"nativeBoundariesApproved":False}]
NAMES=["u83cf","u83cf-ue0100","u83cf-ue0101","u83cf-ue0102"]
def check_pins():
    for name,pin in PINS.items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin
check_pins()
metadata=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('a998_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['菏']={'strokes':12,'dictionary':metadata['dictionary']}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            check_pins()
            q=parse_qs(urlparse(self.path).query);name=q.get('id',["u83cf-ue0102"])[0];assert name in NAMES
            p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
            facts=next(x for x in FACTS if x['root']==name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'菏','root':name,'facts':facts,'domesticCount':12,'reason':"grass4-water-trajectory-gap-and-excluding-incidental-closure-leaves-13-pens",'blocked':True,'candidateGeometryAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for g in p['groups'] for poly in g['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>菏 source blocked</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>菏 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in NAMES)+'<p>VS2 물부 raw6→7 원본 경로 간격25.21925098. 非연속 구획 폐합을 제외하면13펜으로 국내12획을 충족하지 못합니다. 후보 animation/native 승인 없음.</p><div class="pair">'+r.base.full_dictionary('菏')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(NAMES),'blocked':True,'nativeApproval':False}),flush=True)
server.serve_forever()
