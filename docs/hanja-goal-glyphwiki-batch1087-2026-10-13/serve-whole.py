# Strict original-only blocked comparison; private dictionary SVG stays in RAM.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"engine-proof.json":"ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9","metadata.json":"5600b9136e80e1e921420fa2dabfb5599a770b00965ca166e2ae64666bbc5fb6","sources.json":"729ff27e78cfbc9ed772c8d5fad69b72afdfb80043d8e4484be6a9ac0d3a5bfe","progressive.mjs":"e303fa435547fe55c8f6b0a22a2fc53805a46428fb4bf429c2b6f9a025661802","engine-whole-u6e7a.json":"9885f0959ffeab9f19945f5d6e3627800f558ce6b854f9ad1f328eaa7825736c","engine-whole-u6e7a-k.json":"2b1c443b0104a3ac6259fbba259f8ae4e1f83ef23c767a609ff3a2dab72d4048"}
FACTS=[{"root":"u6e7a","raw":15,"nonEmptyRaw":14,"exactDirectedJoins":[[7,10],[8,9]],"maximumMatching":2,"minimumPensLowerBound":12,"nonDrawingRaw":[4],"nativeBoundariesApproved":False},{"root":"u6e7a-k","raw":15,"nonEmptyRaw":14,"exactDirectedJoins":[[7,10],[8,9]],"maximumMatching":2,"minimumPensLowerBound":12,"nonDrawingRaw":[4],"nativeBoundariesApproved":False}]
NAMES=["u6e7a","u6e7a-k"]
def check_pins():
    for name,pin in PINS.items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin
check_pins()
metadata=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('a1087_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['湺']={'strokes':12,'dictionary':metadata['dictionary']}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            check_pins()
            q=parse_qs(urlparse(self.path).query);name=q.get('id',["u6e7a"])[0];assert name in NAMES
            p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
            if p.get('groups') is None:
                body=json.dumps({'root':name,'originalWholeGeometryNull':True,'latestSubstitution':False,'candidateGeometryAbsent':True,'nativeApproval':False}).encode()
                self.send_response(200);self.send_header('Content-Type','application/json');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body);return
            facts=next(x for x in FACTS if x['root']==name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'湺','root':name,'facts':facts,'domesticCount':12,'catalogCount':12,'reason':"original-water-gap-and-excluding-incidental-mouth-closure-leaves13-pens-above12",'blocked':True,'candidateGeometryAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for g in p['groups'] for poly in g['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>湺 source blocked</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>湺 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in NAMES)+'<p>물부 raw2→3 원본 간격34.19005703. 非연속입구폐합을제외하면13펜>국내12획. 후보 animation/native 승인 없음.</p><div class="pair">'+r.base.full_dictionary('湺')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(NAMES),'blocked':True,'nativeApproval':False}),flush=True)
server.serve_forever()
