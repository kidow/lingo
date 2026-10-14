# Strict original-only blocked comparison; private dictionary SVG stays in RAM.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"engine-proof.json":"4df5262150a106350598ea1e99134d87c2a21bd62a171bde1110ff94d3a1f13d","metadata.json":"4ec77f7885b57dae6f8ab75bc1c2efb2dcd9c379971801863260d1a1c2d24a58","sources.json":"bc8a9c0a7a599055a68ab28da1459ab39243e90b3871290a0d46642ac35c6e7f","engine-whole-u5092.json":"6846a697199379906c05af93ae7d8b90341a0a36447b048bc9b6582422a3812e","engine-whole-u5092-ue0100.json":"6846a697199379906c05af93ae7d8b90341a0a36447b048bc9b6582422a3812e","progressive.mjs":"232772a691582a65e117d53dfcfe79fa0a091c0a1628ad481c185ceaa62196b7"}
FACTS=[{"root":"u5092","raw":14,"nonEmptyRaw":14,"exactDirectedJoins":[],"maximumMatching":0,"minimumPensLowerBound":14,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u5092-ue0100","raw":14,"nonEmptyRaw":14,"exactDirectedJoins":[],"maximumMatching":0,"minimumPensLowerBound":14,"nonDrawingRaw":[],"nativeBoundariesApproved":False}]
NAMES=["u5092","u5092-ue0100"]
def check_pins():
    for name,pin in PINS.items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin
check_pins()
metadata=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('a1021_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['傒']={'strokes':12,'dictionary':metadata['dictionary']}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            check_pins()
            q=parse_qs(urlparse(self.path).query);name=q.get('id',["u5092"])[0];assert name in NAMES
            p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
            facts=next(x for x in FACTS if x['root']==name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'傒','root':name,'facts':facts,'domesticCount':12,'reason':"complete-whole-original-minimum14-exceeds-catalogue12-no-exact-joins",'blocked':True,'candidateGeometryAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for g in p['groups'] for poly in g['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>傒 source blocked</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>傒 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in NAMES)+'<p>원본 최소14펜, 국내12획. 정확하게 연결되는 원본 raw가 없습니다. 후보 animation/native 승인 없음.</p><div class="pair">'+r.base.full_dictionary('傒')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(NAMES),'blocked':True,'nativeApproval':False}),flush=True)
server.serve_forever()
