# Strict original-only blocked comparison; private dictionary SVG stays in RAM.
import sys
sys.dont_write_bytecode=True
import json,hashlib,html,importlib.util,os
from pathlib import Path
from urllib.parse import parse_qs,urlparse
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
PINS={"engine-proof.json":"5923d4bf3cb3fefba109a1a8889bd4384fb6b79ff26838dc406f820c764b1294","metadata.json":"66d6f90264725f8c0dc58d264f2f0cd539420cc08b32f3471c7247085be9b91a","sources.json":"d344246806561064897e12549e39ca175777e1d17d51a95beb1a2e5e27e8f774","progressive.mjs":"189edf55352dbaebb94cd9e22a6c64f47259e7d7ecdbd812ef4305fc4ccf79f9","engine-whole-u5ac2.json":"a367869062d12affb1f3adb456749f484c804b1247b5928a722ca8c062fe4be3","engine-whole-u5ac2-g.json":"0f75529f8ce0f96d4479498b42b87713c6ec4ceb6af2a148392636cd77708aa7","engine-whole-u5ac2-itaiji-001.json":"711481ea2e5edab29a36e346a83ccee0129d7f8cffec49b6e6b4f702c6844de4","engine-whole-u5ac2-k.json":"a367869062d12affb1f3adb456749f484c804b1247b5928a722ca8c062fe4be3","engine-whole-u5ac2-ue0100.json":"a367869062d12affb1f3adb456749f484c804b1247b5928a722ca8c062fe4be3","engine-whole-u5ac2-ue0101.json":"fa64f80828c5b874b775d513a6c5fd17c521e9446c9add889ec2b1fe8088a186","engine-whole-u5ac2-ue0102.json":"a367869062d12affb1f3adb456749f484c804b1247b5928a722ca8c062fe4be3","engine-whole-u5ac2-ue0103.json":"fa64f80828c5b874b775d513a6c5fd17c521e9446c9add889ec2b1fe8088a186","engine-whole-u5ac2-ue0104.json":"589f9a880076c11e1eb156645ce53cf83d5ec244b96df0ef09956b0c340a2acc"}
FACTS=[{"root":"u5ac2","raw":15,"nonEmptyRaw":15,"exactDirectedJoins":[[3,2],[4,5],[5,10],[7,8],[12,13]],"maximumMatching":5,"minimumPensLowerBound":10,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u5ac2-g","raw":15,"nonEmptyRaw":15,"exactDirectedJoins":[[0,1],[4,5],[5,10],[7,8],[12,13]],"maximumMatching":5,"minimumPensLowerBound":10,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u5ac2-itaiji-001","raw":13,"nonEmptyRaw":13,"exactDirectedJoins":[[0,1],[4,8],[6,7],[10,11]],"maximumMatching":4,"minimumPensLowerBound":9,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u5ac2-k","raw":15,"nonEmptyRaw":15,"exactDirectedJoins":[[3,2],[4,5],[5,10],[7,8],[12,13]],"maximumMatching":5,"minimumPensLowerBound":10,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u5ac2-ue0100","raw":15,"nonEmptyRaw":15,"exactDirectedJoins":[[3,2],[4,5],[5,10],[7,8],[12,13]],"maximumMatching":5,"minimumPensLowerBound":10,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u5ac2-ue0101","raw":16,"nonEmptyRaw":16,"exactDirectedJoins":[[3,2],[4,5],[5,7],[8,9],[13,14]],"maximumMatching":5,"minimumPensLowerBound":11,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u5ac2-ue0102","raw":15,"nonEmptyRaw":15,"exactDirectedJoins":[[3,2],[4,5],[5,10],[7,8],[12,13]],"maximumMatching":5,"minimumPensLowerBound":10,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u5ac2-ue0103","raw":16,"nonEmptyRaw":16,"exactDirectedJoins":[[3,2],[4,5],[5,7],[8,9],[13,14]],"maximumMatching":5,"minimumPensLowerBound":11,"nonDrawingRaw":[],"nativeBoundariesApproved":False},{"root":"u5ac2-ue0104","raw":13,"nonEmptyRaw":13,"exactDirectedJoins":[[3,2],[4,9],[5,6],[10,11]],"maximumMatching":4,"minimumPensLowerBound":9,"nonDrawingRaw":[],"nativeBoundariesApproved":False}]
NAMES=["u5ac2","u5ac2-g","u5ac2-itaiji-001","u5ac2-k","u5ac2-ue0100","u5ac2-ue0101","u5ac2-ue0102","u5ac2-ue0103","u5ac2-ue0104"]
def check_pins():
    for name,pin in PINS.items():assert hashlib.sha256((HERE/name).read_bytes()).hexdigest()==pin
check_pins()
metadata=json.loads((HERE/'metadata.json').read_text())
spec=importlib.util.spec_from_file_location('a1091_blocked',ROOT/'docs/hanja-special2-alternatives-2026-09-21/serve.py')
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
r.base.renderer.ENTRIES['嫂']={'strokes':13,'dictionary':metadata['dictionary']}
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        try:
            check_pins()
            q=parse_qs(urlparse(self.path).query);name=q.get('id',["u5ac2"])[0];assert name in NAMES
            p=json.loads((HERE/('engine-whole-'+name+'.json')).read_text())
            if p.get('groups') is None:
                body=json.dumps({'root':name,'originalWholeGeometryNull':True,'latestSubstitution':False,'candidateGeometryAbsent':True,'nativeApproval':False}).encode()
                self.send_response(200);self.send_header('Content-Type','application/json');self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body);return
            facts=next(x for x in FACTS if x['root']==name)
            if q.get('view')==['checks']:
                body=json.dumps({'glyph':'嫂','root':name,'facts':facts,'domesticCount':13,'catalogCount':12,'reason':"catalogue12-versus-domestic13-count-conflict",'blocked':True,'candidateGeometryAbsent':True,'nativeApproval':False}).encode();mime='application/json'
            else:
                polygons=[poly for g in p['groups'] for poly in g['polygons']]
                svg='<svg viewBox="0 0 200 200"><g fill="#222">'+''.join('<polygon points="'+' '.join(str(v['x'])+','+str(v['y']) for v in poly)+'"/>' for poly in polygons)+'</g></svg>'
                body=('<!doctype html><meta charset="utf-8"><title>嫂 source blocked</title><style>body{font:16px system-ui;margin:20px;width:960px}.pair{display:flex;gap:24px}svg{width:420px;height:420px}</style><h1>嫂 · '+html.escape(name)+'</h1>'+''.join('<a href="?id='+n+'"> '+n+' </a>' for n in NAMES)+'<p>카탈로그12획과 국내사전13획이 다르므로 보류합니다. 원본이나 카탈로그 획수를 변경하지 않습니다. 후보 animation/native 승인 없음.</p><div class="pair">'+r.base.full_dictionary('嫂')+svg+'</div>').encode();mime='text/html; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(body)
        except Exception as exc:self.send_error(500,str(exc))
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
print(json.dumps({'port':server.server_address[1],'pid':os.getpid(),'wholeVariants':len(NAMES),'blocked':True,'nativeApproval':False}),flush=True)
server.serve_forever()
